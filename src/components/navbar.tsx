'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-900 bg-opacity-100 text-white p-5 fixed top-0 w-full z-[1000] shadow-md">
      <div className="container mx-auto flex justify-between items-center">

        <div className="text-2xl font-bold mx-2">
          <Link href="#home" className="hover:text-gray-400">Portfolio</Link>
        </div>

        <div className="hidden font-extralight md:flex space-x-8 mx-4"> {/* Hidden on mobile */}
          <Link href="#home" className="hover:text-gray-400">Home</Link>
          <Link href="#about" className="hover:text-gray-400">About</Link>
          <Link href="#qualifications" className="hover:text-gray-400">Qualifications</Link>
          <Link href="#skills" className="hover:text-gray-400">Skills</Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

      </div>

      {isOpen && (
        <div className="md:hidden">
          <Link href="#home" className="block font-extralight px-4 py-2 hover:text-gray-400">Home</Link>
          <Link href="#about" className="block font-extralight px-4 py-2 hover:text-gray-400">About</Link>
          <Link href="#qualifications" className="block font-extralight px-4 py-2 hover:text-gray-400">Qualifications</Link>
          <Link href="#skills" className="block font-extralight px-4 py-2 hover:text-gray-400">Skills</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
