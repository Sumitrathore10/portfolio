import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Unified Background Component
const UnifiedBackground = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode effect - syncs with document class
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setDarkMode(isDarkMode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          setDarkMode(isDark);
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
    <div
      className={`min-h-screen w-full transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]"
          : "bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#a1c4fd]"
      }`}
    >
      {children}
    </div>
  );
};

// Updated Hero Component (without background)
const Hero = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode effect - syncs with document class
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setDarkMode(isDarkMode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          setDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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

  return (
    <motion.div
      id="Home"
      className="sm:h-fit w-full md:h-fit lg:h-screen flex flex-col items-center pb-7 pt-[20vh] px-6 text-center gap-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Image with Status Dot */}
      <motion.div
        className={`relative w-[40vw] sm:w-[28vw] md:w-[18vw] lg:w-[12vw] aspect-square rounded-full select-none overflow-hidden transition-all duration-500 z-10 ease-in-out bg-white cursor-pointer ${
          darkMode
            ? "shadow-2xl shadow-white/20 hover:shadow-white/40 border-2 border-white/10"
            : "shadow-xl shadow-gray-400/30 hover:shadow-gray-500/40 border-2 border-gray-200/50"
        }`}
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        whileHover={{
          scale: 1.08,
          rotate: 1,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 👤 Profile Image */}
        <motion.img
          src="/Untitled design.png"
          alt="Sumit Rathore"
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* 🟢 Online Status Dot (Animated + Static) */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white z-50 animate-ping" />
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white z-50" />
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
            darkMode ? "text-gray-400" : "text-gray-600"
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
              className={`px-6 py-3 select-none cursor-pointer rounded-full font-medium shadow-lg transition-all duration-300 Poppins ${
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
              className={`px-6 py-3 select-none cursor-pointer rounded-full font-medium shadow-lg transition-all duration-300 Poppins ${
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
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
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

// Sample About Component (without background)
const About = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setDarkMode(isDarkMode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          setDarkMode(isDark);
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
      id="About"
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 transition-colors duration-500 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          About <span className="text-red-500">Me</span>
        </motion.h2>

        <motion.p
          className={`text-lg sm:text-xl leading-relaxed mb-8 transition-colors duration-500 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          I'm a passionate full-stack developer with expertise in modern web technologies. 
          I love creating beautiful, functional, and user-friendly applications that solve 
          real-world problems. With a strong foundation in both frontend and backend development, 
          I bring ideas to life through code.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { title: "Frontend", skills: "React, Next.js, TypeScript, Tailwind CSS" },
            { title: "Backend", skills: "Node.js, Express.js, MongoDB, PostgreSQL" },
            { title: "Tools", skills: "Git, Docker, AWS, Figma, VS Code" }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className={`p-6 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? "bg-white/10 border border-white/20 hover:bg-white/20" 
                  : "bg-white/50 border border-white/30 hover:bg-white/70"
              } backdrop-blur-sm`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {item.title}
              </h3>
              <p className={`${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                {item.skills}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main App Component showing usage
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="relative">
      {/* Dark Mode Toggle Button (for demo) */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Unified Background with all sections */}
      <UnifiedBackground>
        <Hero />
        <About />
        {/* Add more sections here as needed */}
      </UnifiedBackground>
    </div>
  );
};

export default App;