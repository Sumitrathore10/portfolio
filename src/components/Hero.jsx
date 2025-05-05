import React from "react";
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
  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center pt-[10vh] px-6 text-center gap-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Image with Smooth Fade-In and Scale */}
      <motion.div
        className="w-[40vw] sm:w-[28vw] md:w-[18vw] lg:w-[12vw] aspect-square rounded-full select-none overflow-hidden shadow-lg hover:shadow-gray-400 transition-all duration-300 ease-in-out cursor-pointer"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        whileHover={{ scale: 1.08, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src="/Untitled design.png"
          alt="Sumit Rathore"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Text Content with Smooth Staggered Animation */}
      <motion.div variants={containerVariants} className="max-w-2xl">
        <motion.p
          variants={itemVariants}
          className="text-lg Poppins font-light select-none"
        >
          Hi, I'm <span className="text-red-500">Sumit Rathore</span> 👋
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl lg:text-4xl mt-3 Lora select-none font-medium break-words max-w-lg mx-auto leading-snug"
        >
          Full Stack Web Developer <br /> based in Delhi.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg mt-4 select-none text-gray-600 font-light leading-relaxed"
        >
          I’m a passionate MERN stack developer with a strong foundation in
          building modern, responsive web applications using MongoDB,
          Express.js, React.js, and Node.js.
        </motion.p>

        {/* Animated Button */}
        <motion.div
  className="mt-6 flex flex-wrap justify-center items-center gap-4"
  variants={itemVariants}
>
  <motion.a
    href="https://www.linkedin.com/in/sumit-rathore-48b2a9278/"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <button className="px-6 py-3 select-none cursor-pointer bg-blue-500 text-white Poppins rounded-full hover:bg-black transition-all duration-300 font-medium shadow-md">
      Connect with me.
    </button>
  </motion.a>

  <motion.a
    href="https://www.instagram.com/sumit.rth?igsh=Mmw1bGpsMnA4bnc2"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <button className="px-6 py-3 select-none cursor-pointer bg-red-500 text-white Poppins rounded-full hover:bg-black transition-all duration-300 font-medium shadow-md">
      Say Hi! 👋🏻
    </button>
  </motion.a>
</motion.div>

      </motion.div>
    </motion.div>
  );
};

export default Hero;
