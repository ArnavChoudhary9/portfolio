'use client'

import { useState, useEffect } from 'react';
import Card from "@/components/card";
import interpolate from 'color-interpolate';

export default function Home() {
  const [blurIntensity, setBlurIntensity] = useState(0);
  const [textColor, setTextColor] = useState(255);
  const [backgroundColor, setBackgroundColor] = useState('rgb(30,58,138)');

  // Color configuration
  const colorMap = interpolate(['rgb(30,58,138)', 'rgb(34,78,62)']);
  const maxBlur = 8;
  const scrollThreshold = 400;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate blur and text color
      const calculatedBlur = Math.min((scrollY / scrollThreshold) * maxBlur, maxBlur);
      const calculatedTextColor = Math.max((scrollThreshold / scrollY) * 255, 128);
      const bgColorRatio = Math.min(scrollY / scrollThreshold, 1);

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

        <div id="about" className="flex items-center py-16 px-4 text-center h-screen">
          <div className="max-w-2xl mx-auto">
            <div className="relative py-8 before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gray-300 after:to-transparent">
              <h1 className="text-4xl font-bold text-white mb-6">
                About Me
              </h1>
              <p className="text-lg text-white opacity-80 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, nam dicta minima molestias laborum rerum vel. Unde minus nisi reiciendis ipsum sint est ea, omnis alias neque delectus necessitatibus quas.
              </p>
            </div>
          </div>
        </div>

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
