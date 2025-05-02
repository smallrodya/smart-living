'use client';

import React from "react";
import Image from "next/image";

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

const CircleImg = () => {
  return (
    <section style={{ width: '100%', padding: '60px 0', background: '#fafbfc' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        {products.map((product, index) => (
          <div key={index} style={{ textAlign: 'center', animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`, opacity: 0 }}>
            <div style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: '#e0e0e0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              cursor: 'pointer'
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <Image src={product.image} alt={product.name} width={180} height={180} style={{ objectFit: 'cover' }} />
            </div>
            <p style={{ marginTop: '10px', fontSize: '16px', fontWeight: 600, color: '#333' }}>{product.name}</p>
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

export default CircleImg; 