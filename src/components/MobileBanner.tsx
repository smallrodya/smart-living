'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MobileBannerProps {
  isHomePage?: boolean;
}

const MobileBanner: React.FC<MobileBannerProps> = ({ isHomePage = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isShow = (promoName: string): boolean => {
    // Здесь можно будет управлять видимостью акций
    // По умолчанию показываем только Summer Collection
    return promoName === 'Summer Collection';
  };

  const slides = [
    {
      image: '/bannermain.png',
      title: 'Summer Collection',
      subtitle: 'Discover our new arrivals',
      cta: 'Shop Now',
      link: '/shop/summer-collection',
      color: '#FF6B6B'
    }
  ].filter(slide => isShow(slide.title));

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 30000);

      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPaused(true);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPaused(true);
  };

  const bannerStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    position: 'relative' as const,
    overflow: 'hidden',
    marginBottom: '20px',
    marginTop: isHomePage ? '0px' : '60px'
  };

  const slideStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s ease-in-out',
    transform: `translateX(-${currentSlide * 100}%)`
  };

  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: '#fff',
    maxWidth: '90%',
    padding: '0 10px'
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1
  };

  const dotsStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 3
  };

  const dotStyles: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const navButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
    zIndex: 3,
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(4px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  };

  const prevButtonStyles: React.CSSProperties = {
    ...navButtonStyles,
    left: '10px'
  };

  const nextButtonStyles: React.CSSProperties = {
    ...navButtonStyles,
    right: '10px'
  };

  return (
    <section style={bannerStyles}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            ...slideStyles,
            transform: `translateX(${(index - currentSlide) * 100}%)`
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
          <div style={overlayStyles} />
          <div style={contentStyles}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 700,
                marginBottom: '8px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.15)',
                background: 'linear-gradient(270deg, #FFEE70, #FF6B6B, #4BE1EC, #70FFB8, #FFEE70)',
                backgroundSize: '1000% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'summerGradientMove 6s linear infinite',
              }}
            >
              {slide.title}
            </h1>
            {/* Анимация keyframes для градиента */}
            <style>{`
              @keyframes summerGradientMove {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
              }
            `}</style>
            <p style={{ 
              fontSize: '14px', 
              marginBottom: '16px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              {slide.subtitle}
            </p>
            <Link 
              href={slide.link}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: slide.color,
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}
      <button 
        style={prevButtonStyles}
        onClick={handlePrevSlide}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button 
        style={nextButtonStyles}
        onClick={handleNextSlide}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div style={dotsStyles}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={{
              ...dotStyles,
              background: currentSlide === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)'
            }}
            onClick={() => {
              setCurrentSlide(index);
              setIsPaused(true);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MobileBanner; 