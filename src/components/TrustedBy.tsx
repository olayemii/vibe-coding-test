import React from "react";
import { motion } from "framer-motion";

const TrustedBy: React.FC = () => {
  const companies = [
    {
      name: "Iconic",
      logo: "https://framerusercontent.com/images/tgELERqZ0nObn14bTi418qTbg.png",
    },
    {
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    },
    {
      name: "Shopify",
      logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
    },
    {
      name: "GitHub",
      logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png",
    },
    {
      name: "Notion",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full py-8 sm:py-12 lg:py-16 bg-[#6C3BF5]"
    >
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white/60 text-base sm:text-lg mb-8 sm:mb-12"
        >
          Trusted by thousands of companies globally
        </motion.p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto"
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="w-[100px] sm:w-[120px] lg:w-[140px] h-[32px] sm:h-[40px] relative grayscale brightness-0 invert opacity-70 hover:opacity-100 transition-opacity mx-auto"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrustedBy;
