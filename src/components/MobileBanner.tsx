'use client';

import React, { useState } from 'react';

const MobileBanner = () => {
  const [hovered, setHovered] = useState(false);

  const bannerStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    background: 'url("/banner.jpg") center/cover no-repeat',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    marginTop: '-10px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '10px',
    letterSpacing: 1,
    padding: '0 16px',
    textAlign: 'center' as const
  };

  const textStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 400,
    marginBottom: '16px',
    padding: '0 16px',
    textAlign: 'center' as const
  };

  const buttonStyles: React.CSSProperties = {
    background: hovered ? '#222' : '#111',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    fontWeight: 700,
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.18s',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  };

  return (
    <section style={bannerStyles}>
      <div style={{
        position: 'absolute' as const,
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 1
      }} />
      <div style={{
        position: 'relative' as const,
        zIndex: 2,
        color: '#fff',
        textAlign: 'center' as const,
        width: '100%',
        maxWidth: '100%',
        padding: '0 16px',
        boxSizing: 'border-box'
      }}>
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

export default MobileBanner; 