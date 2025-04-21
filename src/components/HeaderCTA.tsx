import React from "react";
import { motion } from "framer-motion";
import TrustedBy from "./TrustedBy";

const HeaderCTA: React.FC = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#6C3BF5] text-white overflow-hidden">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-bold"
          >
            IndieLaunch
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 sm:gap-8 flex-wrap justify-center"
          >
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:text-gray-200 transition-colors"
            >
              Features
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:text-gray-200 transition-colors"
            >
              Pricing
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#"
              className="hover:text-gray-200 transition-colors"
            >
              About
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#6C3BF5] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.nav>

        {/* Hero Section */}
        <div className="relative">
          <div className="container mx-auto">
            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-center px-4 py-8 sm:py-16">
              {/* Left Content */}
              <div className="text-center lg:text-left z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
                >
                  Payments, tax & subscriptions for software companies
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="text-xl mb-8 text-[#ffffff99] max-w-xl mx-auto lg:mx-0"
                >
                  As your merchant of record, we handle the tax compliance
                  burden so you can focus on more revenue and less headache.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#6C3BF5] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors text-lg group flex items-center gap-2 mx-auto lg:mx-0"
                >
                  Get started for free
                  <motion.svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      d="M1 8H15M15 8L8 1M15 8L8 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.button>
              </div>

              {/* Right Content - Image */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  type: "spring",
                  damping: 20,
                }}
                className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-[-10%] w-full lg:w-[80vw] xl:w-[70vw] mt-16 lg:mt-0"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 6 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="relative w-full h-0 pb-[75%]"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <TrustedBy />
      </div>
    </>
  );
};

export default HeaderCTA;
