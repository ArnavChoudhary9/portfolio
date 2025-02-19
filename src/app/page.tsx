'use client'

import { useState, useEffect } from 'react';
import Card from "@/components/card";
import About from '@/components/about';
import Qualifications from '@/components/qualifications';
import interpolate from 'color-interpolate';

export default function Home() {
  const [blurIntensity, setBlurIntensity] = useState(0);
  const [textColor, setTextColor] = useState(255);
  const [backgroundColor, setBackgroundColor] = useState('rgb(30,58,138)');

  // Color configuration
  const colorMap = interpolate(['rgb(30,58,138)', 'rgb(34,78,62)', 'rgb(100,10,10)']);
  const maxBlur = 8;
  const scrollThreshold = 400;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate blur and text color
      const calculatedBlur = Math.min((scrollY / scrollThreshold) * maxBlur, maxBlur);
      const calculatedTextColor = Math.max((scrollThreshold / scrollY) * 255, 128);
      const bgColorRatio = Math.min(scrollY / (scrollThreshold * 4), 1);

      // Update background color
      setBackgroundColor(colorMap(bgColorRatio));
      setTextColor(calculatedTextColor);
      setBlurIntensity(calculatedBlur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="
          fixed top-0 left-0 flex items-center justify-center w-full h-screen
          transition-all duration-0
        "
        id='home'
        style={{
          filter: `blur(${blurIntensity}px)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px)`,
          pointerEvents: 'none'
        }}
      >
        <div
          className={`absolute inset-0 z-[-10] rounded-full bg-gradient-radial from-white blur-3xl`}
          style={{
            '--tw-gradient-from': backgroundColor,
            '--tw-gradient-to': 'transparent'
          }}
        />
        <h1
          className="text-4xl font-bold text-center sm:text-5xl md:text-6xl"
          style={{
            color: `rgb(${textColor},${textColor},${textColor})`
          }}
        >
          Arnav Choudhary
        </h1>
      </div>

      <div className="h-screen" />

      <main className="relative z-[10] flex min-h-screen flex-col items-center justify-between px-4 py-16 md:px-12 lg:px-24">

        <About />

        <Qualifications />

        <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-3">

          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://picsum.photos/300/200"
            link="#about"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://picsum.photos/300/200"
            link="#about"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://picsum.photos/300/200"
            link="#about"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://picsum.photos/300/200"
            link="#about"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://picsum.photos/300/200"
            link="#about"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://picsum.photos/300/200"
            link="#about"
          />
          <Card
            title="About Me"
            description="I am a software engineer with a passion for technology and design. I have been working remotely for the last few years, focusing primarily on frontend development and design."
            image="https://picsum.photos/300/200"
            link="#about"
          />

        </div>

      </main >
    </>
  );
}
