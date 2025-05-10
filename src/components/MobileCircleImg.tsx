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
          <div key={index} style={{
            width: 'calc(50% - 10px)',
            position: 'relative',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <Image
                  src={`/${product.image}`}
                  alt={product.name}
                  fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                />
            </div>
            {product.link ? (
              <Link href={product.link} style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '12px',
                color: '#222',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {product.name}
              </Link>
            ) : (
              <div style={{
                textAlign: 'center',
                marginTop: '12px',
                color: '#222',
              fontSize: '14px', 
                fontWeight: 500
              }}>
                {product.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MobileCircleImg; 