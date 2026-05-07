"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import MouseLight from "@/components/mouseLight";

interface BGModelProps {
  scrollProgress: React.MutableRefObject<number>;
  reduced: boolean;
}

const BGModel = ({ scrollProgress, reduced }: BGModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const plane = useLoader(GLTFLoader, "/models/background.glb");

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const s = scrollProgress.current;
    if (reduced) {
      groupRef.current.rotation.set(Math.PI / 2, 0, 0);
      groupRef.current.position.set(0, 0, 0);
      return;
    }
    // Ambient drift — visible within a few seconds, calm enough to ignore.
    groupRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.12;
    groupRef.current.rotation.z = Math.cos(t * 0.35) * 0.15 + s * 0.2;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.18 - s * 0.6;
    groupRef.current.position.x = Math.cos(t * 0.3) * 0.12;
  });

  return (
    <group ref={groupRef} scale={[5, 5, 5]} rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={plane.scene} />
    </group>
  );
};

const Background = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [blur, setBlur] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const scrollProgress = useRef(0);

  const maxBlur = 12;
  const scrollThreshold = 600;

  useEffect(() => {
    if (!isHome) return;
    setIsMobile(window.innerWidth <= 768);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onScroll = () => {
      const y = window.scrollY;
      setBlur(Math.min((y / scrollThreshold) * maxBlur, maxBlur));
      scrollProgress.current = Math.min(y / window.innerHeight, 1.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Skip rendering the entire 3D scene on non-home routes — no flash, no bundle work.
  if (!isHome) return null;

  const lightDisabled = blur >= maxBlur * 0.9 || reduced;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-screen z-[-1] pointer-events-none"
      style={{
        filter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      }}
    >
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 7], fov: 60 }}
      >
        <ambientLight intensity={0.12} />
        <MouseLight isMobile={isMobile} disabled={lightDisabled} />
        <BGModel scrollProgress={scrollProgress} reduced={reduced} />
      </Canvas>
    </div>
  );
};

export default Background;
