'use client';
import React, { useState } from 'react';

const SubscribeSection = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <section id="subscribe" style={{maxWidth: 600, margin: '40px auto', padding: 40, background: '#fff', borderRadius: 14, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)'}}>
      <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 14}}>Subscribe to News and Offers</h2>
      <p style={{marginBottom: 22, color: '#444'}}>Be the first to know about discounts and new products!</p>
      <form style={{display: 'flex', gap: 12, justifyContent: 'center'}}>
        <input type="email" placeholder="Your email" required style={{padding: '12px 18px', borderRadius: 7, border: '1.5px solid #ccc', fontSize: 16, width: 240}} />
        <button
          type="submit"
          style={{
            padding: '12px 28px',
            borderRadius: 7,
            background: hovered ? '#222' : '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.18s',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >Subscribe</button>
      </form>
    </section>
  );
};

export default SubscribeSection; 