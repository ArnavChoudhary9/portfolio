'use client';

import { useRef, useEffect, useState } from 'react';

const Home = () => {
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const slideRightRef = useRef<HTMLDivElement | null>(null);
  const slideLeftRef = useRef<HTMLDivElement | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slidesLength = 4; // Number of slides

  useEffect(() => {
    if (slideLeftRef.current && sliderContainerRef.current) {
      slideLeftRef.current.style.top = `-${(slidesLength - 1) * sliderContainerRef.current.clientHeight}px`;
    }
  }, []);

  const changeSlide = (direction: 'up' | 'down') => {
    setActiveSlideIndex(prev => {
      if (direction === 'up') return (prev + 1) % slidesLength;
      if (direction === 'down') return (prev - 1 + slidesLength) % slidesLength;
      return prev;
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      changeSlide('down');
    }, 100); // Slide after 1 second

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sliderHeight = sliderContainerRef.current?.clientHeight || 0;
    if (slideRightRef.current && slideLeftRef.current) {
      slideRightRef.current.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
      slideLeftRef.current.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    }
  }, [activeSlideIndex]);

  return (
    <div
      className="slider-container"
      ref={sliderContainerRef}
      style={{
        flexDirection: typeof window !== 'undefined' && window.innerWidth <= 768 ? 'column' : 'row',
      }}
    >
      <div
        className="left-slide"
        ref={slideLeftRef}
        style={{
          order: typeof window !== 'undefined' && window.innerWidth <= 768 ? 2 : 1,
        }}
      >
        <div style={{ backgroundColor: "#FD3555" }}>
          <h1>Nature flower</h1>
          <p>all in pink</p>
        </div>
        <div style={{ backgroundColor: "#2A86BA" }}>
          <h1>Blue Sky</h1>
          <p>with it&apos;s mountains</p>
        </div>
        <div style={{ backgroundColor: "#252E33" }}>
          <h1>Lonely castle</h1>
          <p>in the wilderness</p>
        </div>
        <div style={{ backgroundColor: "#FFB866" }}>
          <h1>Flying eagle</h1>
          <p>in the sunset</p>
        </div>
      </div>
      <div
        className="right-slide"
        ref={slideRightRef}
        style={{
          order: typeof window !== 'undefined' && window.innerWidth <= 768 ? 1 : 2,
        }}
      >
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80')" }}></div>
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80')" }}></div>
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80')" }}></div>
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80')" }}></div>
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

export default Home;
