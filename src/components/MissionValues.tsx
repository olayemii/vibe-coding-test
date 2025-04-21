import React from "react";
import { motion } from "framer-motion";

const MissionValues: React.FC = () => {
  const values = [
    {
      title: "Our Mission",
      description:
        "To empower indie developers and creators with the tools they need to succeed in the digital marketplace.",
      icon: "🎯",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Our Vision",
      description:
        "A world where every creator has equal opportunity to build, grow, and monetize their digital products.",
      icon: "✨",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Our Values",
      description:
        "We believe in transparency, community, and continuous innovation to serve our users better.",
      icon: "❤️",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Our Promise",
      description:
        "To provide reliable, user-friendly solutions that help creators focus on what they do best.",
      icon: "🤝",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FAFAFA] to-white py-32 sm:py-40 overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,59,245,0.05),transparent_50%)]" />
      <div
        className="absolute inset-0 bg-[linear-gradient(45deg,rgba(108,59,245,0.02)_25%,transparent_25%,transparent_75%,rgba(108,59,245,0.02)_75%,rgba(108,59,245,0.02))]"
        style={{ backgroundSize: "60px 60px" }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[#6C3BF5] font-medium mb-4 block">
            Our Purpose
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#6C3BF5] via-[#8B5CF6] to-[#A78BFA] mb-6">
            Mission & Vision
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            We're building the future of indie development, one step at a time.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden border border-gray-100/20 h-full">
                <div className="relative h-56 sm:h-64">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{value.icon}</span>
                      <div className="h-6 w-[1px] bg-white/30" />
                      <span className="text-sm font-medium text-white/70">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{value.title}</h3>
                  </div>
                </div>

                <div className="p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-50" />
                  <p className="text-gray-700 relative z-10 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MissionValues;
