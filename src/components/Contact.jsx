import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, Calendar, ExternalLink } from "lucide-react";

// Animation Variants
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
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  },
};

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-80px 0px -80px 0px" 
  });
  
  return [ref, isInView];
};

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [headerRef, headerInView] = useScrollAnimation();
  const [formRef, formInView] = useScrollAnimation();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const footerSocialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:srathore132005@gmail.com",
      color: "text-blue-500 hover:text-blue-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sumit-rathore-48b2a9278?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B6y%2BXtKTtQveIbxrUdDhTlA%3D%3D",
      color: "text-blue-600 hover:text-blue-500"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/Sumitrathore10",
      color: "text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/sumit.rth/",
      color: "text-pink-500 hover:text-pink-400"
    },
    {
      name: "Location",
      icon: MapPin,
      href: "https://maps.app.goo.gl/fARN2VECSWUjTRr5A",
      color: "text-red-500 hover:text-red-400"
    }
  ];

  return (
    <motion.div
      id="Contacts"
      className={`min-h-screen w-full select-none border-none py-20 px-6 transition-all duration-500 ${
        darkMode ? "bg-black/80" : "bg-white"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-16" 
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 mb-4"
          >
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className={`text-sm Poppins font-medium ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-5xl Lora font-medium mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Let's <span className="text-red-500">Connect</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-lg max-w-3xl Poppins mx-auto font-light ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Ready to bring your ideas to life? I'd love to hear about your project and explore how we can work together.
          </motion.p>
        </motion.div>





        {/* Contact Form */}
        <motion.div
          ref={formRef}
          variants={formVariants}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          className="max-w-2xl Poppins mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-semibold mb-8 text-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Send a Message
          </motion.h2>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className={`space-y-8 p-10 rounded-3xl shadow-2xl backdrop-blur-lg border ${
              darkMode 
                ? "bg-white/5 border-white/10 shadow-white/5" 
                : "bg-white/80 border-gray-100 shadow-gray-200/50"
            }`}
          >
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`block text-sm font-semibold tracking-wide ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 ${
                      darkMode
                        ? "bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/15"
                        : "bg-gray-50/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-400 focus:bg-white"
                    } backdrop-blur-sm`}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`block text-sm font-semibold tracking-wide ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 ${
                      darkMode
                        ? "bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/15"
                        : "bg-gray-50/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-400 focus:bg-white"
                    } backdrop-blur-sm`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold tracking-wide ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}>
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 ${
                    darkMode
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/15"
                      : "bg-gray-50/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-400 focus:bg-white"
                  } backdrop-blur-sm`}
                  placeholder="What would you like to discuss?"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold tracking-wide ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}>
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 resize-none ${
                    darkMode
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/15"
                      : "bg-gray-50/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-400 focus:bg-white"
                  } backdrop-blur-sm`}
                  placeholder="Tell me about your project, ideas, or how I can help you..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500"
              } shadow-lg hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]`}
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending your message...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="w-6 h-6" />
                  <span>Send Message</span>
                </div>
              )}
            </motion.button>

            {/* Status Message */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-4 rounded-xl ${
                  submitStatus === 'success'
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}
              >
                {submitStatus === 'success' 
                  ? "✅ Message sent successfully! I'll get back to you soon."
                  : "❌ Something went wrong. Please try again."
                }
              </motion.div>
            )}
          </motion.form>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center Poppins mt-20"
          variants={itemVariants}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
        >
          <p className={`text-lg mb-8 font-light ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}>
            Prefer a quick chat? Schedule a free consultation call!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <motion.a 
              href="https://calendly.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className={`flex items-center space-x-2 px-8 py-4 rounded-full font-medium  transition-all duration-300 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-red-700"
                  : "bg-blue-500 text-white hover:bg-red-600"
              }`}>
                <Calendar className="w-5 h-5" />
                <span>Schedule Call</span>
              </button>
            </motion.a>
            <motion.a 
              href="Hackathons"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className={`flex items-center space-x-2 px-8 py-4 rounded-full font-medium border-2 transition-all duration-300 ${
                darkMode
                  ? "border-white text-white hover:bg-white hover:text-gray-900"
                  : "border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white"
              }`}>
                <ExternalLink className="w-5 h-5" />
                <span>View My Journey</span>
              </button>
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className={`mt-20 pt-8 Poppins border-t ${
            darkMode ? "border-white/10" : "border-gray-200"
          }`}
          variants={itemVariants}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {footerSocialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`p-3 rounded-full transition-all border-1 duration-300 ${
                    darkMode 
                      ? "bg-white" 
                      : ""
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <social.icon className={`w-5 h-5 ${social.color} transition-colors duration-300`} />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className={`text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              <p>© 2025 Sumit Rathore. All rights reserved.</p>
              <p className="mt-1">📍 Najafgarh, New Delhi | Made with ❤️ and lots of ☕</p>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default ContactPage;