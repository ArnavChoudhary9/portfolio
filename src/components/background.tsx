'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import interpolate from 'color-interpolate';

// Three.js
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import MouseLight from '@/components/mouseLight';

const Background = () => {
  const [blurIntensity, setBlurIntensity] = useState(0);
  const [textColor, setTextColor] = useState(255);
  // const [backgroundColor, setBackgroundColor] = useState('rgb(30,58,138)');
  const [isIndex, setIsIndex] = useState(true);

  const planeRef = useRef<THREE.Mesh>(null);

  // Color configuration
  const colorMap = interpolate(['rgb(30,58,138)', 'rgb(34,78,62)', 'rgb(48,59,6)', 'rgb(96,10,62)']);
  const maxBlur = 8;
  const scrollThreshold = 400;

  const pathname = usePathname();

  useEffect(() => {
    const isHomePage = pathname === '/';
    setIsIndex(isHomePage);

    if (!isHomePage) {
      // setBackgroundColor('rgb(30,58,138)');
      setTextColor(128);
      setBlurIntensity(8);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate blur and text color
      const calculatedBlur = Math.min((scrollY / scrollThreshold) * maxBlur, maxBlur);
      const calculatedTextColor = Math.max((scrollThreshold / scrollY) * 255, 128);
      // const bgColorRatio = Math.min(scrollY / (scrollThreshold * 9), 1);

      // Update background color
      // setBackgroundColor(colorMap(bgColorRatio));
      setTextColor(calculatedTextColor);
      setBlurIntensity(calculatedBlur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, colorMap]);

  return (
    <div id="home" className='flex items-center justify-center'>
      <div className='fixed top-0 left-0 w-full h-full pointer-events-none'>
        <Canvas>
          <ambientLight intensity={0.25} />
          <MouseLight />
          <mesh ref={planeRef}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="gray" roughness={0.4} metalness={0.1} />
          </mesh>
        </Canvas>
      </div>

      <div
        className="
          fixed top-0 left-0 flex items-center justify-center w-full h-screen
          transition-all duration-0
          "
        style={{
          filter: `blur(${blurIntensity}px)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px)`,
          pointerEvents: 'none'
        }}
      >
        {/* <div
          className='absolute inset-0 z-[-10] rounded-full bg-gradient-radial from-white blur-3xl'
          style={{
            '--tw-gradient-from': backgroundColor,
            '--tw-gradient-to': 'transparent'
          }}
        /> */}
        <h1
          className="text-4xl font-bold text-center sm:text-5xl md:text-6xl"
          style={{
            color: `rgb(${textColor},${textColor},${textColor})`
          }}
        >
          Arnav Choudhary
        </h1>
      </div>

      {isIndex &&
        <div className='absolute bottom-4 z-20 transition-all'>

          <Link
            type="button"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 hover:scale-125 duration-300 text-white"
            href="#about"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor">

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />

            </svg>
          </Link>

        </div>
      }
    </div>
  );
}

export default Background;
