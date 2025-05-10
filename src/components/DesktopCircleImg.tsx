'use client';

import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const products = [
  { name: "Carved Rugs from £12.99", image: "Carved-Rug.jpg" },
  { name: "Shaggy Rugs from £11.98", image: "Silver-Grey.jpg", link: "/category/rugs/rugtype/shaggy-rugs" },
  { name: "Non Slip Mats from £5.49", image: "TRELLIS-BROWN.jpg" },
  { name: "Duvet Covers from £9.99", image: "Adrianna.jpg" },
  { name: "Bed Linen from £4.49", image: "Fitted-Sheet.jpg" },
  { name: "Teddy Sets from £11.99", image: "Hug_n_Snug_Blush.jpg" },
  { name: "Towel Bales From £8.99", image: "Boston_BlushPink.jpg" },
  { name: "Throws from £11.99", image: "Shop-by-Colour.jpg" }
];

const DesktopCircleImg = () => {
  return (
    <section style={{ 
      width: '100%', 
      padding: '60px 0', 
      background: '#fafbfc',
      overflowX: 'auto'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px',
        minWidth: 'fit-content',
        padding: '0 20px'
      }}>
        {products.map((product, index) => (
          <div 
            key={index} 
            style={{ 
              textAlign: 'center',
              flex: '0 0 auto',
              animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: '#e0e0e0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              cursor: 'pointer'
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
            {product.link ? (
              <Link href={product.link} style={{ 
                display: 'block',
                marginTop: '10px', 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#333',
                whiteSpace: 'nowrap',
                textDecoration: 'none'
              }}>
                {product.name}
              </Link>
            ) : (
            <p style={{ 
              marginTop: '10px', 
              fontSize: '16px', 
              fontWeight: 600, 
              color: '#333',
              whiteSpace: 'nowrap'
              }}>
                {product.name}
              </p>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default DesktopCircleImg; 