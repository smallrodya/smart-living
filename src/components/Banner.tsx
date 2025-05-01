'use client';

import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bannerStyles: React.CSSProperties = {
    width: '100%',
    height: isMobile ? '500px' : '800px',
    background: 'url("/banner.jpg") center/cover no-repeat',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isMobile ? '20px' : '40px',
    marginTop: isMobile ? '-10px' : '-20px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: isMobile ? '28px' : '44px',
    fontWeight: 700,
    marginBottom: isMobile ? '12px' : '18px',
    letterSpacing: 1,
    padding: isMobile ? '0 20px' : '0'
  };

  const textStyles: React.CSSProperties = {
    fontSize: isMobile ? '16px' : '22px',
    fontWeight: 400,
    marginBottom: isMobile ? '20px' : '28px',
    padding: isMobile ? '0 20px' : '0'
  };

  const buttonStyles: React.CSSProperties = {
    background: hovered ? '#222' : '#111',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: isMobile ? '12px 28px' : '14px 38px',
    fontWeight: 700,
    fontSize: isMobile ? '16px' : '18px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.18s',
    cursor: 'pointer'
  };

  return (
    <section style={bannerStyles}>
      <div style={{position: 'absolute' as const, inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1}} />
      <div style={{position: 'relative' as const, zIndex: 2, color: '#fff', textAlign: 'center' as const}}>
        <h1 style={titleStyles}>Free Shipping Ends Soon</h1>
        <p style={textStyles}>No Minimum Spend — Shop Now & Save Big!</p>
        <button
          style={buttonStyles}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >Go to Catalog</button>
      </div>
    </section>
  );
};

export default Banner; 