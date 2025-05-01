'use client';

import React, { useState } from 'react';

const Banner = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{width: '100%', height: 800, background: 'url("/banner.jpg") center/cover no-repeat', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, marginTop: -20}}>
      <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1}} />
      <div style={{position: 'relative', zIndex: 2, color: '#fff', textAlign: 'center'}}>
        <h1 style={{fontSize: 44, fontWeight: 700, marginBottom: 18, letterSpacing: 1}}>Free Shipping Ends Soon</h1>
        <p style={{fontSize: 22, fontWeight: 400, marginBottom: 28}}>No Minimum Spend — Shop Now & Save Big!</p>
        <button
          style={{
            background: hovered ? '#222' : '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 38px',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            transition: 'background 0.18s',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >Go to Catalog</button>
      </div>
    </section>
  );
};

export default Banner; 