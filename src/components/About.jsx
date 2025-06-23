import React, { useState, useEffect } from "react";
import { Code, GraduationCap, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  return { y1, y2, opacity };
};

// Animated section wrapper
const AnimatedSection = ({ children, variants = fadeInUp, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { y1, y2, opacity } = useScrollAnimation();

  // Dark mode effect - syncs with document class
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

  const infoCards = [
    {
      symbol: <Code className="text-2xl" />,
      title: "Programming Languages",
      content: (
        <>
          <ul className="list-disc mt-2 pl-5 space-y-1">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Python</li>
            <li>C</li>
          </ul>
        </>
      ),
    },
    {
      symbol: <GraduationCap className="text-2xl" />,
      title: "Education",
      content: (
        <>
          <ul className="list-disc mt-2 pl-5 space-y-2">
            <li>
              Pursuing B.Tech in Computer Science (2023 - 2027) from M.D
              University Rohtak, Haryana.
            </li>
            <li>
              I completed my senior secondary education from CBSE board (2022).
            </li>
            <li>I completed my secondary education from CBSE board (2020).</li>
          </ul>
        </>
      ),
    },
  ];

  const tools = [
    { name: "VS Code", icon: "/public/vscode.png" },
    { name: "MongoDB", icon: "/public/mongodb.png" },
    { name: "Express", icon: "/public/Express.png" },
    { name: "React", icon: "/public/React.png" },
    { name: "Redux", icon: "/public/redux2.png" },
    { name: "Linux", icon: "/public/Linux.png" },
    { name: "Git", icon: "/public/git.png" },
    { name: "GitHub", icon: "/public/GitHub.png" },
    { name: "Tailwind", icon: "/public/Tailwind CSS.png" },
    { name: "Node.js", icon: "/public/Node.js.png" },
  ];

  return (
    <motion.div
      id="About"
      className={`min-h-screen w-full py-20 px-6 select-none transition-all duration-500 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute top-60 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
          style={{ y: y2 }}
        />

        {/* Header with Scroll Animation */}
        <AnimatedSection variants={slideInLeft} className="text-center mb-16">
          <motion.div className="inline-flex items-center space-x-2 mb-4">
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.7)",
                  "0 0 0 10px rgba(239, 68, 68, 0)",
                  "0 0 0 0 rgba(239, 68, 68, 0.7)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className={`text-sm Poppins font-medium ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              Get to Know Me
            </span>
          </motion.div>

          <motion.h1
            className={`text-4xl sm:text-5xl Lora lg:text-5xl font-medium mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About{" "}
            <motion.span
              className="text-red-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Me
            </motion.span>
          </motion.h1>

          <motion.p
            className={`text-lg max-w-3xl mx-auto font-light ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A passionate frontend developer with a strong foundation in modern web technologies, 
            always eager to learn and create meaningful digital experiences.
          </motion.p>
        </AnimatedSection>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row justify-center gap-12 mt-14">
          {/* Profile Image */}
          

          {/* Content Section */}
          <AnimatedSection
            variants={slideInRight}
            className="w-full lg:w-[60%]"
          >
            <motion.p
              className={`text-base md:text-lg Poppins text-center leading-relaxed mb-8 transition-colors duration-500 ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
              variants={itemVariants}
            >
              I am an enthusiastic and eager-to-learn Frontend Developer, with a
              strong foundation in the MERN stack. As a fresher, I am passionate
              about building scalable web applications and am always looking for
              opportunities to grow my skills and contribute to exciting projects.
              I am eager to collaborate with experienced teams and contribute to
              the success of any organization I work with.
            </motion.p>

            {/* Info Cards */}
            <motion.div 
              className="flex flex-wrap gap-6 Poppins mb-10"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              viewport={{ once: true }}
            >
              {infoCards.map((card, index) => (
                <motion.div
                  key={index}
                  className={`w-full sm:w-[280px] md:w-[320px] lg:w-[360px] p-6 rounded-3xl transition-all duration-500 ease-in-out cursor-pointer ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-800 to-black border border-white/10 hover:border-red-500/30 text-gray-100 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900"
                      : "bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-red-300/40 text-gray-900 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white"
                  } shadow-2xl hover:shadow-3xl`}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 60 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    className="mb-4 text-red-500"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {card.symbol}
                  </motion.div>
                  <h3 className="font-semibold text-xl Lora mb-3">{card.title}</h3>
                  <div className={`text-sm Poppins leading-relaxed transition-colors duration-500 ${
                    darkMode ? "text-gray-100" : "text-gray-600"
                  }`}>
                    {card.content}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tools Section */}
            <motion.div 
              className="mb-10"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <motion.h3
                className={`font-semibold Lora text-2xl md:text-3xl mb-6 transition-colors duration-500 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
                variants={itemVariants}
              >
                Tools and Technologies
              </motion.h3>
              <motion.div
                className="flex gap-4 justify-center lg:justify-start flex-wrap"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    className={`w-20 h-20 p-4 cursor-pointer rounded-2xl flex flex-col items-center justify-center text-2xl transition-all duration-300 ease-in-out ${
                      darkMode
                        ? "bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-red-500/30 text-gray-100 shadow-lg hover:shadow-white/10"
                        : "bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-red-300/40 text-gray-700 shadow-lg hover:shadow-gray-400/30"
                    }`}
                    variants={{
                      hidden: { scale: 0.2, opacity: 0 },
                      visible: { scale: 1, opacity: 1 }
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      rotateY: 15,
                      rotateX: -10,
                      boxShadow: darkMode
                        ? "0px 20px 40px rgba(255, 255, 255, 0.1)"
                        : "0px 20px 40px rgba(0, 0, 0, 0.15)",
                    }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    title={tool.name}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="mb-1 items-center text-2xl"><img className="w-full h-full object-cover" src={tool.icon} alt="" srcset="" /></div>
                    <div className={`text-xs text-nowrap font-bold Poppins text-center transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {tool.name}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Skills Progress Section */}
            <AnimatedSection variants={itemVariants}>
              <h3
                className={`font-semibold Lora text-2xl md:text-3xl mb-6 transition-colors duration-500 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Current Focus Areas
              </h3>
              <motion.div 
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                viewport={{ once: true }}
              >
                {[
                  { skill: "React.js", level: 85 },
                  { skill: "Node.js", level: 80 },
                  { skill: "MongoDB", level: 75 },
                  { skill: "JavaScript", level: 90 },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="space-y-3"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm font-semibold Poppins transition-colors duration-500 ${
                          darkMode ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        {item.skill}
                      </span>
                      <span
                        className={`text-sm font-medium transition-colors duration-500 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {item.level}%
                      </span>
                    </div>
                    <div
                      className={`w-full rounded-full h-3 transition-colors duration-500 ${
                        darkMode ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    >
                      <motion.div
                        className="h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/25"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </motion.div>
  );
};

export default About;