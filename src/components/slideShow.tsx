'use client';

import { useRef, useEffect, useState } from 'react';
import React from 'react';

export interface Slide {
    title: string;
    description: string;
    backgroundColor: string;
    imageUrl: string;
}

interface SliderProps {
  slides: Slide[];
}

const SlideShow: React.FC<SliderProps> = ({ slides }) => {
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const slideRightRef = useRef<HTMLDivElement | null>(null);
  const slideLeftRef = useRef<HTMLDivElement | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slidesLength = slides.length;

  useEffect(() => {
    if (slideLeftRef.current && sliderContainerRef.current) {
      slideLeftRef.current.style.top = `-${(slidesLength - 1) * sliderContainerRef.current.clientHeight}px`;
    }
  }, [slidesLength]);

  const changeSlide = (direction: 'up' | 'down') => {
    setActiveSlideIndex(prev => {
      if (direction === 'up') return (prev + 1) % slidesLength;
      if (direction === 'down') return (prev - 1 + slidesLength) % slidesLength;
      return prev;
    });
  };

  useEffect(() => {
    const sliderHeight = sliderContainerRef.current?.clientHeight || 0;
    if (slideRightRef.current && slideLeftRef.current) {
      slideRightRef.current.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
      slideLeftRef.current.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    }
  }, [activeSlideIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      changeSlide('down');
    }, 100); // Slide after 100ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="slider-container" ref={sliderContainerRef}>
      <div className="left-slide" ref={slideLeftRef}>
        {slides.map((slide, index) => (
          <div key={index} style={{ backgroundColor: slide.backgroundColor }}>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>
      <div className="right-slide" ref={slideRightRef}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
          ></div>
        ))}
      </div>
      <div className="action-buttons">
        <button className="down-button" onClick={() => changeSlide('down')}>
          ↓
        </button>
        <button className="up-button" onClick={() => changeSlide('up')}>
          ↑
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
