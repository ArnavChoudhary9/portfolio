'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from "next/link";

// Three.js
import { Canvas, useLoader } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import MouseLight from '@/components/mouseLight';

const BGModel = () => {
  const planeRef = useRef<THREE.Mesh>(null);
  const nameRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.geometry.center(); // Centers the geometry
    }
  }, []);

  const plane = useLoader(GLTFLoader, '/models/background.glb');

  return (
    <>
      <mesh receiveShadow ref={planeRef} scale={[5, 5, 5]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={plane.scene} />
      </mesh>

      <Text3D ref={nameRef} castShadow size={0.5} height={0.2} position={[0, 0, -0.65]} font='/fonts/Roboto_Regular.json'>
        Arnav Choudhary
        <meshStandardMaterial color='white' metalness={0} />
      </Text3D>
    </>
  );
}

const Background = () => {
  const [blurIntensity, setBlurIntensity] = useState(0);

  const [isIndex, setIsIndex] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const maxBlur = 12;
  const scrollThreshold = 600;

  const pathname = usePathname();

  useEffect(() => {
    const isHomePage = pathname === '/';
    setIsIndex(isHomePage);

    setIsMobile(window.innerWidth <= 768);

    if (!isHomePage) {
      setBlurIntensity(maxBlur);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      const calculatedBlur = Math.min((scrollY / scrollThreshold) * maxBlur, maxBlur);

      setBlurIntensity(calculatedBlur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <div id="home" className='flex items-center justify-center'>
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
        <div className='fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]'>
          <Canvas shadows dpr={isMobile ? [1, 1.5] : [1, 2]} camera={{ position:[0,0,7], fov: 60 }}>
            <ambientLight intensity={0.1} />
            <MouseLight isMobile={isMobile} />
            <BGModel />
          </Canvas>
        </div>
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
