import React, { useState } from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { RiMenu3Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.3
      }}
      className='w-full h-[10vh] px-4 md:px-12 mt-3 z-50'
    >
      <div className='w-full h-full flex justify-between items-center'>
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='text-4xl font-bold font-sans select-none Poppins text-shadow-xs text-shadow-gray-700'
        >
          Sumit<span className='text-red-400'>.</span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className='hidden md:flex gap-10 text-xl font-medium Lora border py-3 md:py-2 px-[9vw] md:px-[5vw] rounded-full select-none backdrop-blur-xl'
        >
          <a href="#Home" className='hover:text-red-500 transition'>Home</a>
          <a href="#About" className='hover:text-red-500 transition'>About</a>
          <a href="#Services" className='hover:text-red-500 transition'>Services</a>
          <a href="#Hackathon" className='hover:text-red-500 transition'>Hackathons</a>
          <a href="#Contacts" className='hover:text-red-500 transition'>Contact</a>
        </motion.div>

        {/* Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className='flex items-center gap-5'
        >
          <BsFillMoonStarsFill className='text-2xl cursor-pointer' />
          <div className='md:hidden'>
            <RiMenu3Fill className='text-3xl cursor-pointer' onClick={toggleMenu} />
          </div>
          <div className='hidden md:block border py-1 px-4 rounded-full text-lg font-medium Lora bg-gray-200 select-none shadow-md hover:bg-black hover:text-white transition duration-300'>
            Contact
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='md:hidden mt-4 bg-white shadow-md rounded-lg px-6 py-4 space-y-3 text-center Lora z-10 select-none'
          >
            <a href="#Home" onClick={toggleMenu} className='block text-lg font-medium hover:text-red-500'>Home</a>
            <a href="#About" onClick={toggleMenu} className='block text-lg font-medium hover:text-red-500'>About</a>
            <a href="#Services" onClick={toggleMenu} className='block text-lg font-medium hover:text-red-500'>Services</a>
            <a href="#Contacts" onClick={toggleMenu} className='block text-lg font-medium hover:text-red-500'>Contact</a>
            <div className='py-1 px-4 rounded-full text-lg font-medium Lora bg-red-500 text-white border-none select-none shadow-md hover:bg-black hover:text-white transition duration-300 w-[30%] mx-auto mt-[5vh]'>
              Contact
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Nav;
