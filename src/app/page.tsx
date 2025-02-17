'use client'

import { useState, useEffect } from 'react';
import Card from "@/components/card";

export default function Home() {
  const [blurIntensity, setBlurIntensity] = useState(0);
  const maxBlur = 8; // Maximum blur value in pixels
  const scrollThreshold = 500; // Scroll distance for full blur

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Calculate blur proportion up to threshold
      const calculatedBlur = Math.min((scrollY / scrollThreshold) * maxBlur, maxBlur);
      setBlurIntensity(calculatedBlur);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="
          fixed top-0 left-0 flex items-center justify-center w-full h-screen
          transition-all duration-10
        "
        style={{
          filter: `blur(${blurIntensity}px)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px)` 
        }}
      >
        <div className="absolute inset-0 z-[-10] rounded-full bg-gradient-radial from-blue-900 to-transparent blur-3xl"></div>
        <h1 className="text-4xl font-bold text-center sm:text-5xl md:text-6xl">
          Arnav Choudhary
        </h1>
      </div>

      <div className="h-screen" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-between px-4 py-16 md:px-12 lg:px-24">
        <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-3">

          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://images.pexels.com/photos/30146008/pexels-photo-30146008/free-photo-of-traditional-turkish-coffee-brewing-on-hot-coals.jpeg"
            link="/"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://images.pexels.com/photos/30146008/pexels-photo-30146008/free-photo-of-traditional-turkish-coffee-brewing-on-hot-coals.jpeg"
            link="/"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://images.pexels.com/photos/30146008/pexels-photo-30146008/free-photo-of-traditional-turkish-coffee-brewing-on-hot-coals.jpeg"
            link="/"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://images.pexels.com/photos/30146008/pexels-photo-30146008/free-photo-of-traditional-turkish-coffee-brewing-on-hot-coals.jpeg"
            link="/"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://images.pexels.com/photos/30146008/pexels-photo-30146008/free-photo-of-traditional-turkish-coffee-brewing-on-hot-coals.jpeg"
            link="/"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://images.pexels.com/photos/30146008/pexels-photo-30146008/free-photo-of-traditional-turkish-coffee-brewing-on-hot-coals.jpeg"
            link="/"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://images.pexels.com/photos/30146008/pexels-photo-30146008/free-photo-of-traditional-turkish-coffee-brewing-on-hot-coals.jpeg"
            link="/"
          />

        </div>
      </main>
    </>
  );
}
