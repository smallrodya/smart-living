'use client';

import React, { useState } from "react";
import Image from 'next/image';

const categories = [
  { name: "KIDS COLLECTION", image: "Cids.jpg", productCount: 86 },
  { name: "SHOP CIDS COLLECTION BY TYPE", image: "cids2.jpg", productCount: 76 },
  { name: "5 PC BED IN A BAG", image: "BEDABAG.jpg", productCount: 11 },
  { name: "CLEARANCE SALE", image: "CLEARANCESALE.JPG", productCount: 96 },
  { name: "SHOP DUVET SET BY COLOUR", image: "SHOP.jpg", productCount: 428 },
  { name: "SHOP DUVET SET BY TYPE", image: "SHOPDUVET.jpg", productCount: 415 },
  { name: "3D DUVET SET", image: "SHOP3DUVET.jpg", productCount: 19 },
  { name: "PREMIUM DUVET SET", image: "PREMIUMSHOPUVET.jpg", productCount: 155 },
  { name: "PRINTED DUVET SET", image: "PRINTED.jpg", productCount: 144 },
  { name: "TEDDY DUVET SET", image: "TEDDY.jpg", productCount: 97 },
  { name: "BED SHEETS", image: "BEDSHEETS.jpg", productCount: 77 },
  { name: "SHOP BY SHEET COLOUR", image: "SHEETCOLOUR.jpg", productCount: 75 },
  { name: "SHOP BY SHEET TYPE", image: "SHEETTYPE.jpg", productCount: 70 },
  { name: "SHOP MATS BY COLOUR", image: "MATSBYCOLOUR.jpg", productCount: 77 },
  { name: "SHOP MATS BY DESIGN", image: "MATSBYDESIGN.jpg", productCount: 77 },
  { name: "SHOP RUGS BY TYPE", image: "RUGSTYPE.jpg", productCount: 127 },
  { name: "REVERSIBLE RUGS", image: "REVERSIBLE.jpg", productCount: 10 },
  { name: "POLYESTER SHAGGY RUGS", image: "POLYESTER.jpg", productCount: 12 },
  { name: "CARVED RUGS", image: "CARVED.jpg", productCount: 78 },
  { name: "SHOP RUGS BY COLOUR", image: "RUGSBYCOLOUR.jpg", productCount: 122 },
  { name: "SHOP TOWEL BY COLOUR", image: "TOWELCOLOUR.jpg", productCount: 46 }
];

const MobileBigCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  const nextPage = () => {
    if (currentIndex + itemsPerPage < categories.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const currentCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section style={{ 
      width: '100%', 
      padding: '40px 0', 
      background: '#fafbfc',
      display: 'none'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '16px',
        padding: '0 12px'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          width: '100%',
          justifyContent: 'center'
        }}>
          {currentCategories.map((category, index) => (
            <div key={index} style={{ 
              textAlign: 'center',
              width: 'calc(50% - 6px)'
            }}>
              <div style={{ 
                position: 'relative', 
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Image
                  src={`/${category.image}`}
                  alt={category.name}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
              <p style={{ 
                marginTop: '8px', 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#333',
                lineHeight: '1.2'
              }}>{category.name}</p>
              <p style={{ 
                marginTop: '4px', 
                fontSize: '12px', 
                color: '#666' 
              }}>{category.productCount} products</p>
            </div>
          ))}
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginTop: '16px'
        }}>
          <button 
            onClick={prevPage} 
            disabled={currentIndex === 0} 
            style={{ 
              padding: '8px 16px', 
              background: currentIndex === 0 ? '#e0e0e0' : '#111', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: currentIndex === 0 ? 'default' : 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'background 0.2s ease'
            }}
          >←</button>
          <button 
            onClick={nextPage} 
            disabled={currentIndex + itemsPerPage >= categories.length} 
            style={{ 
              padding: '8px 16px', 
              background: currentIndex + itemsPerPage >= categories.length ? '#e0e0e0' : '#111', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: currentIndex + itemsPerPage >= categories.length ? 'default' : 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'background 0.2s ease'
            }}
          >→</button>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            display: block;
          }
        }
      `}</style>
    </section>
  );
};

export default MobileBigCategory; 