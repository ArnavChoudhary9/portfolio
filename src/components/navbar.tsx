'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMenu, MdClose } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: {
      height: "auto",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        // Isolate animation from scroll layout
        onUpdate: () => window.dispatchEvent(new Event('resize'))
      }
    },
    closed: {
      height: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 200,
        // Prevent layout shift during animation
        onUpdate: () => window.dispatchEvent(new Event('resize'))
      }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      x: 0 
    },
    closed: { 
      opacity: 0,
      x: -20 
    }
  };
   
  const iconVariants = {
    open: {
      rotate: 90,
      scale: 1.1
    },
    closed: {
      rotate: 0,
      scale: 1
    }
  };

  return (
    <nav className="bg-neutral-900 backdrop-blur-sm bg-opacity-0 text-white p-5 fixed top-0 w-full z-[1000] shadow-md">
      <div className="container mx-auto flex justify-between items-center">

        <div className="text-2xl font-bold mx-2">
          <Link href="\#home" className="hover:text-gray-400">Portfolio</Link>
        </div>

        <div className="hidden font-extralight md:flex space-x-8 mx-4"> {/* Hidden on mobile */}
          <Link href="\#home" className="hover:text-gray-400">Home</Link>
          <Link href="\#about" className="hover:text-gray-400">About</Link>
          <Link href="\#qualifications" className="hover:text-gray-400">Qualifications</Link>
          <Link href="\#skills" className="hover:text-gray-400">Skills</Link>
          <Link href="\#projects" className="hover:text-gray-400">Projects</Link>
        </div>

        <div className="md:hidden">
          <motion.button
            whileHover="hover"
            variants={iconVariants}
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl p-2 hover:text-gray-400"
          >
            <AnimatePresence mode='wait' initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MdClose />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MdMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              className="px-4 pt-2 pb-4 space-y-2"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              <motion.div variants={itemVariants}>
                <Link href="\#home" onClick={() => setIsOpen(!isOpen)} className="block font-extralight py-2 hover:text-gray-400">Home</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="\#about" onClick={() => setIsOpen(!isOpen)} className="block font-extralight py-2 hover:text-gray-400">About</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="\#qualifications" onClick={() => setIsOpen(!isOpen)} className="block font-extralight py-2 hover:text-gray-400">Qualifications</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="\#skills" onClick={() => setIsOpen(!isOpen)} className="block font-extralight py-2 hover:text-gray-400">Skills</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="\#projects" onClick={() => setIsOpen(!isOpen)} className="block font-extralight py-2 hover:text-gray-400">Projects</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
