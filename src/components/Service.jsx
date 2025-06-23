import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
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

const Services = () => {
  const [darkMode, setDarkMode] = useState(false);
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

  const services = [
    {
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=center",
      title: "Full Stack Web Development",
      description: "Complete web solutions using MERN stack for scalable applications with modern architecture and best practices...",
      features: ["Custom Web Applications", "RESTful API Development", "Database Design", "Real-time Features"],
      category: "Development"
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
      title: "Frontend Development",
      description: "Interactive user interfaces using React.js, HTML5, and Tailwind CSS with responsive design principles...",
      features: ["Responsive Design", "Component Libraries", "State Management", "Performance Optimization"],
      category: "Frontend"
    },
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&crop=center",
      title: "Backend Development",
      description: "Robust server-side architecture with Express.js, MongoDB & JWT authentication for secure applications...",
      features: ["API Development", "Authentication", "Database Management", "Server Optimization"],
      category: "Backend"
    },
    {
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop&crop=center",
      title: "UI/UX Design",
      description: "Designing user-first experiences with wireframing, prototyping, and visual polish for engaging interfaces...",
      features: ["Wireframes", "Prototypes", "User Flows", "Design Systems"],
      category: "Design"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      title: "Performance Optimization",
      description: "Speed-focused enhancements like lazy loading, code splitting, and SEO best practices for better performance...",
      features: ["Code Splitting", "SEO", "Lighthouse Score Boost", "Image Optimization"],
      category: "Optimization"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center",
      title: "Maintenance & Support",
      description: "Continued assistance for updates, bug fixes, security patches, and feature enhancements to keep your app running smoothly...",
      features: ["Bug Fixes", "Security Patches", "Uptime Monitoring", "Feature Updates"],
      category: "Support"
    },
  ];

  return (
    <motion.div
      id="Services"
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
              What I Offer
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
            Our{" "}
            <motion.span 
              className="text-red-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Services
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
            End-to-end web solutions tailored to your needs. From design to deployment, I deliver full-stack experiences with high performance and modern technologies.
          </motion.p>
        </AnimatedSection>

        {/* Services Grid with Staggered Scroll Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 Poppins lg:grid-cols-3 gap-8" 
          layout
        >
          {services.map((service, index) => (
            <AnimatedSection
              key={index}
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


                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 pt-0">
                  <motion.h3 
                    className={`text-xl font-semibold mb-3 group-hover:text-red-500 mt-2 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-sm mb-4 leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.description}
                  </motion.p>
                  
                  <motion.div 
                    className="space-y-2 mb-6"
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
                    {service.features.map((feature, fIndex) => (
                      <motion.div
                        key={fIndex}
                        className={`flex items-center space-x-2 text-sm ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-red-500 rounded-full"
                          whileHover={{ scale: 1.2 }}
                        />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
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
            Have a project in mind?
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
                Get a Quote
              </motion.button>
            </motion.a>
          </motion.div>
        </AnimatedSection>
      </div>
    </motion.div>
  );
};

export default Services;