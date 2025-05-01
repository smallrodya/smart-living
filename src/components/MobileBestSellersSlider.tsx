'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const products = [
  { id: 1, name: '3D Duvet Cover and Pillowcase Set – Black Panther', price: '£14.99 – £17.72', image: '/best1.jpg', hoverImage: '/best1.jpg' },
  { id: 2, name: 'Reversible Polycotton Elephant Mandala Duvet Cover', price: '£10.49 – £12.97', image: '/best2.jpg', hoverImage: '/best2-hover.jpg' },
  { id: 3, name: 'Diamante 5pc Bed in a Bag – Chocolate', price: '£17.99 – £19.99', image: '/best3.jpg', hoverImage: '/best3.jpg' },
  { id: 4, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Blush Pink', price: '£26.49 – £33.99', image: '/best4.jpg', hoverImage: '/best4.jpg' },
  { id: 5, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Charcoal', price: '£26.49 – £33.99', image: '/best5.jpg', hoverImage: '/best5-hover.jpg' },
  { id: 6, name: 'Reversible Polycotton Fern Rouched Duvet Cover', price: '£10.37 – £12.97', image: '/best6.jpg', hoverImage: '/best6-hover.jpg' },
];

const MobileBestSellersSlider = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

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
      }}>
        <h2 style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 24,
          textAlign: 'center',
          letterSpacing: 0.5,
          color: '#222',
        }}>BESTSELLERS</h2>
        
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 16,
          padding: '0 8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                minWidth: 240,
                maxWidth: 260,
                background: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: hoveredCard === product.id ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === product.id ? 'translateY(-4px)' : 'none',
                position: 'relative',
                flex: '0 0 auto',
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                overflow: 'hidden',
              }}>
                <Image
                  src={hoveredCard === product.id ? product.hoverImage : product.image}
                  alt={product.name}
                  width={260}
                  height={260}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredCard === product.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
              </div>
              
              <div style={{
                padding: '12px 8px',
                textAlign: 'center',
              }}>
                <h3 style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: '#222',
                  letterSpacing: 0.2,
                  lineHeight: 1.3,
                }}>{product.name}</h3>
                
                <p style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#e53935',
                  marginBottom: 12,
                }}>{product.price}</p>
                
                <button
                  style={{
                    width: '100%',
                    padding: '8px 0',
                    background: hoveredBtn === product.id ? '#222' : '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: hoveredBtn === product.id ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredBtn(product.id)}
                  onMouseLeave={() => setHoveredBtn(null)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MobileBestSellersSlider; 