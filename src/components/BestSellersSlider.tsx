'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const products = [
  { id: 1, name: '3D Duvet Cover and Pillowcase Set – Black Panther', price: '£14.99 – £17.72', image: '/best1.jpg', hoverImage: '/best1.jpg' },
  { id: 2, name: 'Reversible Polycotton Elephant Mandala Duvet Cover', price: '£10.49 – £12.97', image: '/best2.jpg', hoverImage: '/best2-hover.jpg' },
  { id: 3, name: 'Diamante 5pc Bed in a Bag – Chocolate', price: '£17.99 – £19.99', image: '/best3.jpg', hoverImage: '/best3.jpg' },
  { id: 4, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Blush Pink', price: '£26.49 – £33.99', image: '/best4.jpg', hoverImage: '/best4.jpg' },
  { id: 5, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Charcoal', price: '£26.49 – £33.99', image: '/best5.jpg', hoverImage: '/best5-hover.jpg' },
  { id: 6, name: 'Reversible Polycotton Fern Rouched Duvet Cover and Pillowcase Set', price: '£10.37 – £12.97', image: '/best6.jpg', hoverImage: '/best6-hover.jpg' },
];

const BestSellersSlider = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  return (
    <section style={{
      width: '100%',
      padding: '60px 0',
      backgroundColor: '#f8f8f8',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px',
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 40,
          textAlign: 'center',
          letterSpacing: 0.5,
          color: '#222',
        }}>BESTSELLERS</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 30,
          padding: '0 10px',
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: hoveredCard === product.id ? '0 12px 32px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === product.id ? 'translateY(-8px)' : 'none',
                position: 'relative',
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
                  width={280}
                  height={280}
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
                padding: '20px',
                textAlign: 'center',
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: '#222',
                  letterSpacing: 0.2,
                }}>{product.name}</h3>
                
                <p style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#e53935',
                  marginBottom: 16,
                }}>{product.price}</p>
                
                <button
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    background: hoveredBtn === product.id ? '#222' : '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: hoveredBtn === product.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
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
    </section>
  );
};

export default BestSellersSlider; 