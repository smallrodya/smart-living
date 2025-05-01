'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  { src: '/reduce1.jpg', hoverSrc: '/reduce1-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green', price: '£34.99', discount: '-65%' },
  { src: '/reduce2.jpg', hoverSrc: '/reduce2-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Grey', price: '£34.90', discount: '-65%' },
  { src: '/reduce3.jpg', hoverSrc: '/reduce3-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Black', price: '£60.99', discount: '-49%' },
  { src: '/reduce4.jpg', hoverSrc: '/reduce4-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Grey', price: '£60.99', discount: '-49%' },
];

const basketIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);

const ReduceSpaceCarousel = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardStyles: React.CSSProperties = {
    minWidth: isMobile ? '280px' : '300px',
    maxWidth: isMobile ? '300px' : '320px',
    background: '#fff',
    borderRadius: isMobile ? '12px' : '16px',
    boxShadow: hoveredCard !== null ? '0 8px 32px rgba(34,34,34,0.13)' : '0 2px 16px rgba(34,34,34,0.07)',
    padding: 0,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
    transform: hoveredCard !== null ? 'translateY(-6px) scale(1.03)' : 'none',
    flex: '0 0 auto',
  };

  const imageContainerStyles: React.CSSProperties = {
    width: '100%',
    aspectRatio: '4/3',
    overflow: 'hidden',
    borderTopLeftRadius: isMobile ? '12px' : '16px',
    borderTopRightRadius: isMobile ? '12px' : '16px'
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'filter 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
    filter: hoveredCard !== null ? 'brightness(0.97) saturate(1.08)' : 'none',
    transform: hoveredCard !== null ? 'scale(1.03)' : 'none',
    display: 'block',
  };

  const contentStyles: React.CSSProperties = {
    padding: isMobile ? '10px 8px 8px 8px' : '14px 10px 10px 10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const titleStyles: React.CSSProperties = {
    fontWeight: 600,
    fontSize: isMobile ? '13px' : '15px',
    marginBottom: isMobile ? '4px' : '6px',
    textAlign: 'center',
    letterSpacing: 0.1
  };

  const priceStyles: React.CSSProperties = {
    color: '#e53935',
    fontWeight: 700,
    fontSize: isMobile ? '14px' : '16px',
    marginBottom: isMobile ? '6px' : '8px'
  };

  const buttonStyles: React.CSSProperties = {
    background: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: isMobile ? '7px' : '9px',
    padding: isMobile ? '7px 0' : '9px 0',
    fontWeight: 600,
    fontSize: isMobile ? '12px' : '14px',
    width: '100%',
    marginTop: isMobile ? '5px' : '7px',
    transition: 'background 0.18s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    letterSpacing: 0.1,
    boxShadow: hoveredBtn !== null ? '0 2px 12px 0 rgba(34,34,34,0.10)' : 'none',
  };

  const discountStyles: React.CSSProperties = {
    position: 'absolute',
    top: isMobile ? '8px' : '10px',
    left: isMobile ? '8px' : '10px',
    background: '#e53935',
    color: '#fff',
    fontWeight: 700,
    fontSize: isMobile ? '12px' : '14px',
    borderRadius: '50%',
    padding: isMobile ? '6px 8px' : '8px 10px',
    letterSpacing: 0.1,
    boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
    width: isMobile ? '40px' : '47px',
    height: isMobile ? '40px' : '47px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <section style={{width: '100%', height: 'auto', margin: '0 auto 40px', padding: 0, textAlign: 'center'}}>
      <h2 style={{fontSize: isMobile ? '22px' : '26px', fontWeight: 700, marginBottom: isMobile ? '16px' : '20px', letterSpacing: 0.2}}>REDUCE SPACE</h2>
      <div style={{
        display: 'flex',
        gap: isMobile ? '16px' : '32px',
        overflowX: 'auto',
        justifyContent: 'flex-start',
        padding: isMobile ? '8px 12px' : '10px 0',
        width: '100%',
        boxSizing: 'border-box',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {images.map((item, i) => (
          <div
            key={i}
            style={cardStyles}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={imageContainerStyles}>
              <Image
                src={hoveredCard === i ? item.hoverSrc : item.src}
                alt={item.title}
                width={isMobile ? 280 : 320}
                height={isMobile ? 210 : 240}
                style={imageStyles}
              />
            </div>
            <div style={contentStyles}>
              <div style={titleStyles}>{item.title}</div>
              <div style={priceStyles}>{item.price}</div>
              <button
                style={buttonStyles}
                onMouseEnter={() => setHoveredBtn(i)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                {hoveredBtn === i ? basketIcon : 'Add to basket'}
              </button>
            </div>
            <span style={discountStyles}>{item.discount}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReduceSpaceCarousel; 