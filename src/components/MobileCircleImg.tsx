'use client';

import React from "react";
import Image from 'next/image';

const products = [
  { name: "Carved Rugs from £12.99", image: "Carved-Rug.jpg" },
  { name: "Shaggy Rugs from £11.98", image: "Silver-Grey.jpg" },
  { name: "Non Slip Mats from £5.49", image: "TRELLIS-BROWN.jpg" },
  { name: "Duvet Covers from £9.99", image: "Adrianna.jpg" },
  { name: "Bed Linen from £4.49", image: "Fitted-Sheet.jpg" },
  { name: "Teddy Sets from £11.99", image: "Hug_n_Snug_Blush.jpg" },
  { name: "Towel Bales From £8.99", image: "Boston_BlushPink.jpg" },
  { name: "Throws from £11.99", image: "Shop-by-Colour.jpg" }
];

const MobileCircleImg = () => {
  return (
    <section style={{ 
      width: '100%', 
      padding: '40px 0', 
      background: '#fafbfc' 
    }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {products.map((product, index) => (
          <div 
            key={index} 
            style={{ 
              textAlign: 'center',
              width: 'calc(50% - 20px)',
              animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <div style={{
              width: '100%',
              maxWidth: '180px',
              aspectRatio: '1/1',
              borderRadius: '50%',
              background: '#e0e0e0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              cursor: 'pointer',
              margin: '0 auto'
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%' 
              }}>
                <Image
                  src={`/${product.image}`}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <p style={{ 
              marginTop: '10px', 
              fontSize: '14px', 
              fontWeight: 600, 
              color: '#333',
              lineHeight: '1.3'
            }}>{product.name}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default MobileCircleImg; 