import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bottom-0 bg-dark-900 z-[20] text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link 
              href="https://github.com/ArnavChoudhary9/"
              className="hover:text-blue-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6 hover:scale-125 transition-transform" />
            </Link>

            <Link
              href="https://linkedin.com/in/arnav-choudhary-017892322"
              className="hover:text-[#0A66C2] transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6 hover:scale-125 transition-transform" />
            </Link>

            <Link
              href="https://www.instagram.com/arnavchoudhary.69"
              className="hover:text-[#E4405F] transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6 hover:scale-125 transition-transform" />
            </Link>

            <Link
              href="https://www.youtube.com/@photon1310"
              className="hover:text-[#FF0000] transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="h-6 w-6 hover:scale-125 transition-transform" />
            </Link>
          </div>

          {/* Copyright Text */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Arnav Choudhary. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
