import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
    id="Home"
      className={`sm:h-fit w-full md:h-fit lg:h-screen flex flex-col items-center justify-center pb-7 pt-[20vh] px-6 text-center gap-6 transition-all duration-500 ${
        darkMode
          ? "bg-black/80 text-white"
          : "bg-white text-gray-900"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Image with Online Dot */}
      <motion.div
        className={`relative w-[60vw] sm:w-[28vw] md:w-[18vw] lg:w-[12vw] aspect-square p-0.5 rounded-full select-none transition-all duration-500 ease-in-out bg-white cursor-pointer ${
          darkMode
            ? "shadow-2xl shadow-white/20 hover:shadow-white/40 border-2 border-white/10"
            : "shadow-xl shadow-gray-400/30 hover:shadow-gray-500/40 border-2 border-gray-200/50"
        }`}
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        whileHover={{ scale: 1.08, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src="/Untitled design.png"
          alt="Sumit Rathore"
          className="w-full h-full rounded-full object-cover"
          draggable={false}
        />

        {/* Green Status Dot */}
        <motion.div className="absolute bottom-4 lg:right-5 right-7  md:right-6 " initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}>
          <span className="relative flex h-6 w-6 ">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-85"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 border-4 border-white"></span>
          </span>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div variants={containerVariants} className="max-w-2xl">
        <motion.p
          variants={itemVariants}
          className={`text-lg Poppins font-light select-none transition-colors duration-500 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Hi, I'm{" "}
          <span className="text-red-500 font-medium">Sumit Rathore</span> 👋
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className={`text-2xl sm:text-3xl lg:text-4xl mt-3 Lora select-none font-medium break-words max-w-lg mx-auto leading-snug transition-colors duration-500 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Full Stack Web Developer <br />
          <span className="text-red-500">based in Delhi.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`text-sm sm:text-lg mt-4 select-none font-light leading-relaxed transition-colors duration-500 ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          I'm a passionate MERN stack developer with a strong foundation in
          building modern, responsive web applications using MongoDB,
          Express.js, React.js, and Node.js.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center items-center gap-4"
          variants={itemVariants}
        >
          <motion.a
            href="https://www.linkedin.com/in/sumit-rathore-48b2a9278/"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className={`px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300 Poppins ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-white hover:text-blue-600 shadow-blue-500/25 hover:shadow-white/25"
                  : "bg-blue-500 text-white hover:bg-gray-900 hover:text-white shadow-blue-500/25 hover:shadow-gray-900/25"
              }`}
            >
              Connect with me.
            </button>
          </motion.a>

          <motion.a
            href="https://www.instagram.com/sumit.rth?igsh=Mmw1bGpsMnA4bnc2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className={`px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300 Poppins ${
                darkMode
                  ? "bg-red-600 text-white hover:bg-white hover:text-red-600 shadow-red-500/25 hover:shadow-white/25"
                  : "bg-red-500 text-white hover:bg-gray-900 hover:text-white shadow-red-500/25 hover:shadow-gray-900/25"
              }`}
            >
              Say Hi! 👋🏻
            </button>
          </motion.a>
        </motion.div>

        {/* Availability Status */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center space-x-2"
        >
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            Available for opportunities
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
