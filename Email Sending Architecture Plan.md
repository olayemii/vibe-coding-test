# Email Sending Architecture Plan

## Overview

The system has two flows that share one rate limiter, one cache (ElastiCache), SES, and the existing Firehose event pipeline.

- **Campaign flow (stateful):** large scheduled sends. Recipients are stored in S3 as chunks, progress is tracked in DynamoDB, and hot counters and per-recipient bits are kept in the cache.
- **Transactional flow (stateless):** fire-and-forget sends that go out as soon as they are queued. No DynamoDB. Delivery outcomes come from SES events through Firehose.

## Transactional Flow: Two-Step API

### Step 1: Create template

The client sends the email definition: subject, HTML, plain-text version, and fixed CC/BCC lists.

- Canonicalize: fixed field order; email lists lowercased and sorted.
- Hash the canonical content. Template ID = `clientId/hash`.
- Store in S3 under that key with a conditional write (only if the key does not exist), so concurrent uploads never overwrite each other.
- Return the template ID. Same content gives the same ID; any edit gives a new ID.
- Templates are immutable, so no database is needed.
- CC/BCC that vary per recipient belong in step 2, not in the template.

### Step 2: Send to recipients (batch endpoint)

The client sends the template ID plus a list of recipients with their personalization data. Requests are always under 10 MB.

Synchronous validation (before responding):

- Template ID exists in S3.
- Recipient format is valid.
- Client is within its quota.
- Any failure returns 400. The client can fix these.

Then respond 202. The 202 means the request is valid and stored durably.

## Transactional Flow: Processing

1. ECS (API service) writes the validated request to S3 and returns 202.
2. S3 event puts a job on a split queue (SQS).
3. Splitter reads the request and enqueues recipients onto the transactional send queue:
   - Pack several recipients per message (for example 25) to cut SQS calls: 100k recipients is about 400 batch calls.
   - Run batch sends in parallel (50 to 100 in flight).
   - Retry entries that partially fail in a batch.
   - Small payloads go inline; large personalization payloads use the claim-check pattern (S3 object plus pointer in the message).
4. Worker Lambda (SQS trigger, up to 10 messages per invocation, finishes in seconds):
   - Dedupe: set the idempotency key in the cache only if absent (TTL about one day); skip if it exists.
   - Load the template from S3 by ID and cache it in Lambda memory (templates never change).
   - Take tokens from the rate limiter.
   - Render and send via SES.
   - On failure, let SQS retry with backoff; repeated failures go to a dead-letter queue.
5. Outcomes (delivery, bounce, complaint) flow from SES through Firehose to S3. No per-message status is stored.

### Error handling after 202

- **Durable handoff:** if the splitter crashes, SQS redelivers the job to another one.
- **Safe re-runs:** each recipient's idempotency key is fixed (request ID plus position in the list), so a repeated split never sends twice.
- Dead-letter queues on the split and send queues, with alarms.
- **Optional later:** webhook or status endpoint by request ID if clients need failure notifications.

### ECS failure and client retries

If ECS dies while handling a request, a client retry must be safe, so every request carries a client-supplied request ID.

- **ECS dies before writing to S3:** the client gets no 202 and retries; nothing was stored, so the retry is processed normally.
- **ECS dies after writing to S3 but before responding:** the S3 event still starts the split, so the send proceeds. The client retries anyway.
- **Idempotent write:** ECS stores the request at `clientId/requestId` with a conditional write (only if the key does not exist). On a retry the write fails because the key exists, and ECS returns the same 202 without splitting again.
- **Backstop:** per-recipient idempotency keys in the worker still prevent duplicate sends if anything slips through.

### Protection

- Lambda event source maximum concurrency so a burst cannot flood the cache or exceed SES capacity.
- Per-client throttling via API Gateway usage plans.
- Per-tenant daily quota counters in the cache.
- Lifecycle rules delete request and payload objects after a day or two.

## Shared Rate Limiter

Two token buckets in the cache, managed by a single Lua script:

- **Campaign bucket:** refills at a fixed reserved rate.
- **Transactional bucket:** refills at the remainder of the SES quota.
- **Borrowing:** a worker draws from its own bucket first; if short, it borrows only idle tokens from the other bucket.
- **Capacity:** about one second's worth of tokens per bucket, so borrowing only uses capacity that would otherwise be wasted, and the lender recovers its full rate within a second.
- Workers request tokens in batches to save round trips.

## Campaign Flow Summary

- Recipients are written to S3 in chunks; DynamoDB stores only the campaign row and references.
- Campaign states: `STARTED`, `PROCESSING`, `QUEUED`, `SENDING`, `PAUSED`, `FINALIZING`, `COMPLETED`, `COMPLETED_WITH_ERRORS`, `FAILED`, `CANCELLED`. Transitions are conditional writes.
- Chunks of 50 recipients are processed by Lambda workers.
- Completion counters are kept in the cache rather than DynamoDB to avoid a hot campaign item.
- Per-recipient claimed/sent/failed bitmaps live in the cache, are snapshotted to S3, and expire after finalization.
- Pause and cancel are mirrored into the cache and checked before each token request.

## Comparison with Today

| Area | Today | New design |
| --- | --- | --- |
| Transactional path | API Gateway to ECS to SES directly | API Gateway to ECS to S3/SQS to Lambda to SES |
| Rate limiting | None shared | Two-bucket limiter with borrowing |
| Workers | ECS | Lambda (SQS triggered) |
| Templates | Sent with each request | Content-hashed, immutable, stored in S3 |
| Duplicate protection | None | Idempotency keys in cache |
| Status | Firehose events | Firehose events (unchanged) |
