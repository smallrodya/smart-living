'use client';
import React, { useState } from 'react';
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

const MobileReduceSpaceCarousel = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  return (
    <section style={{width: '100%', height: 'auto', margin: '0 auto 24px', padding: 0, textAlign: 'center'}}>
      <h2 style={{fontSize: 20, fontWeight: 700, marginBottom: 16, letterSpacing: 0.2}}>REDUCE SPACE</h2>
      <div style={{
        display: 'flex',
        gap: 16,
        overflowX: 'auto',
        justifyContent: 'flex-start',
        padding: '8px 0',
        width: '100%',
        boxSizing: 'border-box',
        paddingLeft: 12,
        paddingRight: 12,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {images.map((item, i) => (
          <div
            key={i}
            style={{
              minWidth: 240,
              maxWidth: 260,
              background: '#fff',
              borderRadius: 12,
              boxShadow: hoveredCard === i ? '0 8px 32px rgba(34,34,34,0.13)' : '0 2px 16px rgba(34,34,34,0.07)',
              padding: 0,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
              transform: hoveredCard === i ? 'translateY(-4px) scale(1.02)' : 'none',
              flex: '0 0 auto',
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderTopLeftRadius: 12, borderTopRightRadius: 12}}>
              <Image
                src={hoveredCard === i ? item.hoverSrc : item.src}
                alt={item.title}
                width={260}
                height={195}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'filter 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
                  filter: hoveredCard === i ? 'brightness(0.97) saturate(1.08)' : 'none',
                  transform: hoveredCard === i ? 'scale(1.03)' : 'none',
                  display: 'block',
                }}
              />
            </div>
            <div style={{padding: '10px 8px 8px 8px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontWeight: 600, fontSize: 13, marginBottom: 4, textAlign: 'center', letterSpacing: 0.1, lineHeight: 1.3}}>{item.title}</div>
              <div style={{color: '#e53935', fontWeight: 700, fontSize: 14, marginBottom: 6}}>{item.price}</div>
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
                  boxShadow: hoveredBtn === i ? '0 2px 12px 0 rgba(34,34,34,0.10)' : 'none',
                }}
                onMouseEnter={() => setHoveredBtn(i)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                {hoveredBtn === i ? basketIcon : 'Add to basket'}
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
            }}>{item.discount}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MobileReduceSpaceCarousel; 