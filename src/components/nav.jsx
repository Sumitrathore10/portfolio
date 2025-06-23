import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Transform values for scroll effects
  const navOpacity = useTransform(scrollY, [0, 50], [0.95, 0.85]);
  const navBlur = useTransform(scrollY, [0, 50], [8, 20]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Navigation items with icons and descriptions
  const navItems = [
    { name: "Home", href: "#Home", description: "Welcome" },
    { name: "About", href: "#About", description: "My Story" },
    { name: "Services", href: "#Services", description: "What I Do" },
    { name: "Projects", href: "#Projects", description: "My Work" },
    { name: "Hackathon", href: "#Hackathons", description: "Competitions" },
    { name: "Contact", href: "#Contacts", description: "Let's Talk" }
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body overflow control
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Animation variants
  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        style={{
          backdropFilter: `blur(${navBlur}px)`,
          opacity: navOpacity
        }}
      >
        <div className={`mx-4 lg:mx-8 rounded-2xl transition-all duration-500 ${
          darkMode 
            ? 'bg-gray-900/90 border-gray-700/50' 
            : 'bg-white/90 border-white/20'
        } backdrop-blur-xl border shadow-2xl ${
          isScrolled ? 'shadow-xl' : 'shadow-2xl'
        }`}>
          <div className="flex items-center justify-between px-6 py-4">
            
            {/* Enhanced Logo */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className={`text-3xl lg:text-4xl font-bold Poppins font-sans select-none transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Sumit
                <motion.span 
                  className="text-red-500"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  .
                </motion.span>
              </div>
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:flex items-center space-x-1"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    activeSection === item.name
                      ? darkMode 
                        ? 'text-red-400 bg-red-400/10' 
                        : 'text-red-600 bg-red-50'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(item.name)}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300"
                    layoutId="activeTab"
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.description}
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-3 rounded-full transition-all duration-300 ${
                  darkMode
                    ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'
                    : 'bg-gray-900/10 text-gray-700 hover:bg-gray-900/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: 180 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Resume Button */}
              <motion.a
                href="resume.pdf"
                download
                className={`hidden lg:flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/25'
                    : 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/25'
                } shadow-lg hover:shadow-xl`}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                <span>Resume</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMenu}
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-900/10 text-gray-700 hover:bg-gray-900/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={24} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 lg:hidden"
              onClick={toggleMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-2xl lg:hidden ${
                darkMode 
                  ? 'bg-gray-900/95 border-gray-700/50' 
                  : 'bg-white/95 border-white/20'
              } backdrop-blur-xl border`}
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`text-2xl font-bold font-sans ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sumit<span className="text-red-500">.</span>
                  </div>
                  <motion.button
                    onClick={toggleMenu}
                    className={`p-2 rounded-xl transition-colors duration-200 ${
                      darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2 mb-8">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      variants={mobileItemVariants}
                      onClick={() => {
                        setActiveSection(item.name);
                        toggleMenu();
                      }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        activeSection === item.name
                          ? darkMode
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-red-50 text-red-600'
                          : darkMode
                            ? 'text-gray-300 hover:text-white hover:bg-white/10'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <div className="font-medium text-lg">{item.name}</div>
                        <div className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className="transform -rotate-90 opacity-50"
                      />
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="space-y-4">
                  <motion.a
                    href="resume.pdf"
                    download
                    variants={mobileItemVariants}
                    className="flex items-center justify-center space-x-2 w-full py-4 bg-red-500 text-white rounded-xl font-medium shadow-lg hover:bg-red-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={20} />
                    <span>Download Resume</span>
                  </motion.a>

                  <motion.div
                    variants={mobileItemVariants}
                    className="flex items-center justify-center space-x-4"
                  >
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {darkMode ? 'Dark' : 'Light'} Mode
                    </span>
                    <motion.button
                      onClick={toggleDarkMode}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        darkMode
                          ? 'bg-yellow-400/20 text-yellow-400'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9, rotate: 180 }}
                    >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;