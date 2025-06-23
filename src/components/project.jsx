import React, { useState, useEffect } from "react";
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
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 60 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
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
    margin: "-100px 0px -100px 0px" 
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

const Projects = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const { y1, y2, opacity } = useScrollAnimation();

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

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB featuring secure payments and real-time inventory management...",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      category: "Full Stack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      status: "Completed",
      demoLink: "#",
      codeLink: "#",
      featured: true
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Modern social media analytics dashboard with real-time data visualization and comprehensive reporting tools...",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
      category: "Frontend",
      technologies: ["React", "Chart.js", "Tailwind", "API Integration"],
      status: "Completed",
      demoLink: "#",
      codeLink: "#",
      featured: false
    },
    {
      id: 3,
      title: "Task Management API",
      description: "RESTful API for task management with authentication, real-time notifications, and collaborative features...",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
      category: "Backend",
      technologies: ["Node.js", "Express", "Socket.io", "JWT", "MongoDB"],
      status: "Completed",
      demoLink: "#",
      codeLink: "#",
      featured: false
    },
    {
      id: 4,
      title: "Weather Forecast App",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts...",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop&crop=center",
      category: "Frontend",
      technologies: ["React", "OpenWeather API", "Geolocation", "CSS3"],
      status: "In Progress",
      demoLink: "#",
      codeLink: "#",
      featured: true
    },
    {
      id: 5,
      title: "Blog Content Management",
      description: "Full-featured blog CMS with markdown support, SEO optimization, and advanced content scheduling...",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&crop=center",
      category: "Full Stack",
      technologies: ["React", "Node.js", "MongoDB", "Markdown", "SEO"],
      status: "Completed",
      demoLink: "#",
      codeLink: "#",
      featured: false
    },
    {
      id: 6,
      title: "Real-time Chat Application",
      description: "Instant messaging app with real-time communication, group chat, file sharing, and video calling features...",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop&crop=center",
      category: "Full Stack",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "JWT"],
      status: "In Progress",
      demoLink: "#",
      codeLink: "#",
      featured: true
    }
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <motion.div
      id="Projects"
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
                boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0.7)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className={`text-sm Poppins font-medium ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              My Work
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
            Featured{" "}
            <motion.span 
              className="text-red-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Projects
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
            A showcase of my latest work in web development, featuring modern technologies and innovative solutions that push the boundaries of user experience.
          </motion.p>
        </AnimatedSection>

        {/* Filter Buttons with Scroll Animation */}
        <AnimatedSection variants={slideInRight} className="flex flex-wrap Poppins justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                  : darkMode
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  : "bg-white/70 text-gray-700 hover:bg-white/90 border border-gray-200/50"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </AnimatedSection>

        {/* Projects Grid with Staggered Scroll Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 Poppins lg:grid-cols-3 gap-8" 
          layout
        >
          {filteredProjects.map((project, index) => (
            <AnimatedSection
              key={project.id}
              variants={{
                hidden: { 
                  opacity: 0, 
                  scale: 0.8, 
                  y: 60,
                  rotateX: 15 
                },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotateX: 0,
                  transition: { 
                    duration: 0.7, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  } 
                },
              }}
            >
              <motion.div
                layout
                whileHover={{ 
                  scale: 1.03, 
                  y: -12,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 group ${
                  darkMode
                    ? "bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-red-500/30"
                    : "bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-red-300/40"
                } shadow-2xl hover:shadow-3xl`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Status Badge */}
                {project.featured && (
                  <motion.div
                    className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Featured
                  </motion.div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3 
                    className={`text-xl font-semibold mb-3 group-hover:text-red-500 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-sm mb-4 leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                          darkMode
                            ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Links */}
                  <motion.div 
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.a
                      href={project.demoLink}
                      className="flex-1 py-3 px-4 rounded-xl text-center font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.codeLink}
                      className={`flex-1 py-3 px-4 rounded-xl text-center font-semibold text-sm border-2 transition-all duration-300 ${
                        darkMode
                          ? "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Code
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </motion.div>

        {/* CTA with Scroll Animation */}
        <AnimatedSection 
          variants={fadeInUp} 
          className="text-center Poppins mt-16"
        >
          <motion.p 
            className={`text-lg mb-8 font-light ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Interested in working together?
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.a 
              href="https://www.linkedin.com/in/sumit-rathore-48b2a9278/"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <motion.button 
                className={`px-8 py-4 rounded-full cursor-pointer font-medium shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-white hover:text-blue-600"
                    : "bg-blue-500 text-white hover:bg-gray-900 hover:text-white"
                }`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Collaborate
              </motion.button>
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/sumit.rth?igsh=Mmw1bGpsMnA4bnc2"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <motion.button 
                className={`px-8 py-4 rounded-full cursor-pointer font-medium border-2 transition-all duration-300 ${
                  darkMode
                    ? "border-white text-white hover:bg-white hover:text-gray-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white"
                }`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3 
                }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
              </motion.button>
            </motion.a>
          </motion.div>
        </AnimatedSection>
      </div>
    </motion.div>
  );
};

export default Projects;