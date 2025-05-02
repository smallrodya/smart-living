'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';

const images = [
  { src: '/reduce1.jpg', hoverSrc: '/reduce1-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green', price: '£34.99', discount: '-65%' },
  { src: '/reduce2.jpg', hoverSrc: '/reduce2-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Grey', price: '£34.90', discount: '-65%' },
  { src: '/reduce3.jpg', hoverSrc: '/reduce3-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Black', price: '£60.99', discount: '-49%' },
  { src: '/reduce4.jpg', hoverSrc: '/reduce4-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Grey', price: '£60.99', discount: '-49%' },
];

const basketIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);

const arrowIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const MobileReduceSpaceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentItem = images[currentIndex];

  return (
    <section style={{
      width: '100%',
      height: 'auto',
      margin: '0 auto 24px',
      padding: 0,
      textAlign: 'center',
      position: 'relative',
    }}>
      <h2 style={{
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 16,
        letterSpacing: 0.2,
        color: '#222'
      }}>REDUCE SPACE</h2>
      
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          padding: '0 40px',
          boxSizing: 'border-box'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 2,
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
        >
          {arrowIcon}
        </button>

        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 16px rgba(34,34,34,0.07)',
          padding: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-4px)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12
          }}>
            <Image
              src={isHovered ? currentItem.hoverSrc : currentItem.src}
              alt={currentItem.title}
              width={300}
              height={225}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </div>
          
          <div style={{
            padding: '10px 8px 8px 8px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 4,
              textAlign: 'center',
              letterSpacing: 0.1,
              lineHeight: 1.3,
              color: '#222'
            }}>{currentItem.title}</div>
            
            <div style={{
              color: '#e53935',
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 6
            }}>{currentItem.price}</div>
            
            <button
              style={{
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '7px 0',
                fontWeight: 600,
                fontSize: 12,
                width: '100%',
                marginTop: 4,
                transition: 'background 0.18s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                letterSpacing: 0.1,
                boxShadow: hoveredBtn === currentIndex ? '0 2px 12px 0 rgba(34,34,34,0.10)' : 'none',
              }}
              onMouseEnter={() => setHoveredBtn(currentIndex)}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              {hoveredBtn === currentIndex ? basketIcon : 'Add to basket'}
            </button>
          </div>

          <span style={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: '#e53935',
            color: '#fff',
            fontWeight: 700,
            fontSize: 12,
            borderRadius: '50%',
            padding: '6px 8px',
            letterSpacing: 0.1,
            boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>{currentItem.discount}</span>
        </div>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 2,
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
        >
          <div style={{ transform: 'rotate(180deg)' }}>{arrowIcon}</div>
        </button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        marginTop: 16
      }}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: index === currentIndex ? '#222' : '#ddd',
              transition: 'background 0.3s ease'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MobileReduceSpaceCarousel; 