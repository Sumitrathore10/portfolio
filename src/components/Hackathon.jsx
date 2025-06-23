import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const timelineVariants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1, 
    transition: { 
      duration: 1.5, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
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

const HackathonJourney = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [headerRef, headerInView] = useScrollAnimation();
  const [timelineRef, timelineInView] = useScrollAnimation();

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

  const hackathons = [
    {
      id: 1,
      title: "Hack&Chill Hackathon",
      subtitle: "Finished in Top 10 Teams",
      date: "April 2024",
      icon: "🏆",
      iconBg: "bg-yellow-500",
      category: "Healthcare Innovation",
      details: [
        "Participated in the Hack&Chill hackathon organized by GDSC ADGIPS on April 30 and led my team to the final round.",
        "Collaboratively developed a healthcare website named ZenZone with my teammates to provide mental health support and raise awareness by creating a community.",
        "Gained valuable experience in leadership, effectively managing and guiding the team throughout the event.",
        "Enhanced my presentation skills by showcasing our project to judges and peers, emphasizing the importance of mental health."
      ],
      technologies: ["React", "Node.js", "MongoDB", "CSS3", "JWT"],
      achievement: "Top 10 Finalist",
      teamSize: 4,
      featured: true
    },
    {
      id: 2,
      title: "Code Cubicle 1.0",
      subtitle: "Ranked 7th among 500+ teams",
      date: "March 2024",
      icon: "⚡",
      iconBg: "bg-blue-500",
      category: "Competitive Programming",
      details: [
        "Participated in Code Cubicle 1.0, a premier coding competition with over 300 participating teams.",
        "Achieved 7th position through strategic problem-solving and efficient algorithm implementation.",
        "Collaborated with team members to tackle complex algorithmic challenges under time constraints.",
        "Demonstrated proficiency in data structures, algorithms, and competitive programming techniques."
      ],
      technologies: ["EJS", "Node.js", "MongoDB", "Express.js"],
      achievement: "7th Place",
      teamSize: 4,
      featured: true
    },
    {
      id: 3,
      title: "Smart India Hackathon",
      subtitle: "National Level Participant",
      date: "February 2024",
      icon: "🇮🇳",
      iconBg: "bg-green-500",
      category: "Smart City Solutions",
      details: [
        "Participated in Smart India Hackathon, India's biggest hackathon initiative.",
        "Developed an innovative solution for smart city infrastructure management.",
        "Focused on IoT integration and real-time data analytics for urban planning.",
        "Collaborated with industry experts and received valuable feedback on our prototype."
      ],
      technologies: ["IoT", "Python", "React", "Firebase", "Arduino"],
      achievement: "National Participant",
      teamSize: 6,
      featured: false
    },
    {
      id: 4,
      title: "HackInnovate 2023",
      subtitle: "Winner - Best UI/UX Design",
      date: "December 2023",
      icon: "🎨",
      iconBg: "bg-purple-500",
      category: "Design & Development",
      details: [
        "Won the Best UI/UX Design award at HackInnovate 2023 for exceptional user experience design.",
        "Created a fintech application with intuitive design and seamless user interactions.",
        "Implemented modern design principles including accessibility and responsive design.",
        "Received recognition for innovative approach to solving complex user interface challenges."
      ],
      technologies: ["Figma", "React", "Tailwind CSS", "Framer Motion"],
      achievement: "Best UI/UX Winner",
      teamSize: 4,
      featured: true
    },
    {
      id: 5,
      title: "CodeForGood Hackathon",
      subtitle: "Social Impact Champion",
      date: "November 2023",
      icon: "❤️",
      iconBg: "bg-red-500",
      category: "Social Impact",
      details: [
        "Developed a platform connecting underprivileged students with educational resources.",
        "Created a solution that bridges the digital divide in rural education.",
        "Implemented features for offline content access and multilingual support.",
        "Received recognition for creating meaningful social impact through technology."
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "PWA"],
      achievement: "Social Impact Award",
      teamSize: 5,
      featured: false
    },
    {
      id: 6,
      title: "TechCrunch Disrupt",
      subtitle: "Startup Pitch Finalist",
      date: "September 2023",
      icon: "🚀",
      iconBg: "bg-orange-500",
      category: "Startup Pitch",
      details: [
        "Pitched an innovative EdTech startup idea to industry leaders and investors.",
        "Presented a comprehensive business model with market analysis and revenue projections.",
        "Received valuable feedback from experienced entrepreneurs and venture capitalists.",
        "Networked with industry professionals and potential co-founders."
      ],
      technologies: ["Business Model", "Market Research", "Pitch Deck"],
      achievement: "Pitch Finalist",
      teamSize: 3,
      featured: true
    }
  ];

  const stats = [
    { label: "Hackathons", value: "15+", icon: "🏆" },
    { label: "Awards", value: "8", icon: "🥇" },
    { label: "Teams Led", value: "6", icon: "👥" },
    { label: "Projects", value: "12", icon: "💻" }
  ];

  return (
    <motion.div
      id="Hackathons"
      className={`min-h-screen w-full py-20 px-6 transition-all duration-500 ${
        darkMode ? "bg-black/80" : "bg-white"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
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
              className={`text-sm font-medium ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              My Journey
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-5xl font-medium Lora mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Hackathon <span className="text-red-500">Journey</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-lg max-w-3xl mx-auto Poppins font-light ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            From coding marathons to winning solutions - exploring my journey through competitive programming and innovation challenges.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`text-center p-4 rounded-2xl transition-all duration-300 ${
                darkMode 
                  ? "bg-white/5 border border-white/10 hover:bg-white/10" 
                  : "bg-gray-50 border border-gray-100 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-xl font-bold mb-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {stat.value}
              </div>
              <div className={`text-xs Poppins ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Timeline Line - Increased width from w-0.5 to w-1 */}
          <motion.div
            ref={timelineRef}
            className={`absolute left-6 top-0 w-1 bg-gradient-to-b from-red-500 to-red-300 origin-top ${ darkMode ? "from-white to-white" : "from-red-500 to-red-300"}`}
            style={{ height: "100%" }}
            variants={timelineVariants}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
          />

          {/* Hackathon Cards */}
          <div className="space-y-12">
            {hackathons.map((hackathon,) => {
              const [cardRef, cardInView] = useScrollAnimation();

              return (
                <motion.div
                  key={hackathon.id}
                  ref={cardRef}
                  className="relative"
                  variants={cardVariants}
                  initial="hidden"
                  animate={cardInView ? "visible" : "hidden"}
                >
                  {/* Timeline Icon */}
                  <motion.div
                    className={`absolute -left-8 w-12 h-12 rounded-full ${hackathon.iconBg} border-4 ${
                      darkMode ? "border-white" : "border-gray-100"
                    } flex items-center justify-center text-white font-bold shadow-lg z-10`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-lg">{hackathon.icon}</span>
                  </motion.div>

                  {/* Card Content */}
                  <motion.div
                    className={`ml-8 rounded-2xl Poppins overflow-hidden transition-all duration-500 ${
                      darkMode
                        ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30"
                        : "bg-gray-50 border border-gray-100 hover:bg-white hover:border-red-300/40"
                    } shadow-lg hover:shadow-2xl`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {hackathon.title}
                          </h3>
                          <p className={`text-sm font-medium ${
                            darkMode ? "text-red-400" : "text-red-600"
                          }`}>
                            {hackathon.subtitle}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm ml-3 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}>
                            {hackathon.date}
                          </span>
                        </div>
                      </div>

                      {/* Category & Achievement */}
                      <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium text-center ${
                          darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-700"
                        }`}>
                          {hackathon.category}
                        </span>
                        <span className="text-sm font-medium text-green-500 text-center">
                          {hackathon.achievement}
                        </span>
                        <span className={`text-xs text-center ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          Team of {hackathon.teamSize}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        {hackathon.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-3">
                            <div className={`w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0`} />
                            <p className={`text-sm leading-relaxed ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {hackathon.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`text-xs px-2 py-1 rounded-md font-medium ${
                              darkMode
                                ? "bg-gray-800 text-gray-300 border border-slate-700"
                                : "bg-white text-gray-700 border border-gray-200"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center Poppins mt-20"
          variants={itemVariants}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
        >
          <p className={`text-lg mb-8 font-light ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}>
            Ready to collaborate on the next big innovation?
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className={`px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-white hover:text-red-600"
                  : "bg-blue-500 text-white hover:bg-gray-900 hover:text-white"
              }`}>
                Let's Connect
              </button>
            </motion.a>
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className={`px-8 py-4 rounded-full font-medium border-2 transition-all duration-300 ${
                darkMode
                  ? "border-white text-white hover:bg-white hover:text-gray-900"
                  : "border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white"
              }`}>
                View Projects
              </button>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HackathonJourney;