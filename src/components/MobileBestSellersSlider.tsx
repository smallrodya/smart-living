'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';

const products = [
  { id: 1, name: '3D Duvet Cover and Pillowcase Set – Black Panther', price: '£14.99 – £17.72', image: '/best1.jpg', hoverImage: '/best1.jpg' },
  { id: 2, name: 'Reversible Polycotton Elephant Mandala Duvet Cover', price: '£10.49 – £12.97', image: '/best2.jpg', hoverImage: '/best2-hover.jpg' },
  { id: 3, name: 'Diamante 5pc Bed in a Bag – Chocolate', price: '£17.99 – £19.99', image: '/best3.jpg', hoverImage: '/best3.jpg' },
  { id: 4, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Blush Pink', price: '£26.49 – £33.99', image: '/best4.jpg', hoverImage: '/best4.jpg' },
  { id: 5, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Charcoal', price: '£26.49 – £33.99', image: '/best5.jpg', hoverImage: '/best5-hover.jpg' },
  { id: 6, name: 'Reversible Polycotton Fern Rouched Duvet Cover', price: '£10.37 – £12.97', image: '/best6.jpg', hoverImage: '/best6-hover.jpg' },
];

const arrowIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const MobileBestSellersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
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

  const currentProduct = products[currentIndex];

  return (
    <section style={{
      width: '100%',
      padding: '40px 0',
      backgroundColor: '#f8f8f8',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative',
      }}>
        <h2 style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 24,
          textAlign: 'center',
          letterSpacing: 0.5,
          color: '#222',
        }}>BESTSELLERS</h2>
        
        <div 
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

          <div
            style={{
              minWidth: 280,
              maxWidth: 240,
              background: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              margin: '0 auto',
              transform: isHovered ? 'translateY(-4px)' : 'none',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '100%',
              overflow: 'hidden',
            }}>
              <Image
                src={isHovered ? currentProduct.hoverImage : currentProduct.image}
                alt={currentProduct.name}
                width={300}
                height={300}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            </div>
            
            <div style={{
              padding: '16px 12px',
              textAlign: 'center',
            }}>
              <h3 style={{
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 8,
                color: '#222',
                letterSpacing: 0.2,
                lineHeight: 1.4,
              }}>{currentProduct.name}</h3>
              
              <p style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#e53935',
                marginBottom: 16,
              }}>{currentProduct.price}</p>
              
              <button
                style={{
                  width: '100%',
                  padding: '10px 0',
                  background: hoveredBtn === currentProduct.id ? '#222' : '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: hoveredBtn === currentProduct.id ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
                onMouseEnter={() => setHoveredBtn(currentProduct.id)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                Add to Cart
              </button>
            </div>
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
          marginTop: 20
        }}>
          {products.map((_, index) => (
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
      </div>
    </section>
  );
};

export default MobileBestSellersSlider; 