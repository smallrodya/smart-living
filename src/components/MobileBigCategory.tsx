'use client';

import React, { useState } from "react";
import Image from 'next/image';
import styles from './MobileBigCategory.module.css';

const categories = [
  { name: "KIDS COLLECTION", image: "Kids.jpg", productCount: 86 },
  { name: "SHOP KIDS COLLECTION BY TYPE", image: "Kids2.jpg", productCount: 76 },
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

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const nextCategory = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCategory = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const currentCategory = categories[currentIndex];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>All CATEGORIES</h2>
        <div className={styles.navigation}>
          <button 
            onClick={prevCategory}
            className={styles.navButton}
            aria-label="Previous category"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextCategory}
            className={styles.navButton}
            aria-label="Next category"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
        <div className={styles.categoryCard}>
          <div className={styles.imageContainer}>
            <Image
              src={`/${currentCategory.image}`}
              alt={currentCategory.name}
              fill
              className={styles.image}
              priority
            />
          </div>
          <div className={styles.categoryInfo}>
            <h3 className={styles.categoryName}>{currentCategory.name}</h3>
            <p className={styles.productCount}>{currentCategory.productCount} products</p>
          </div>
        </div>
        <div className={styles.pagination}>
          {categories.map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileBigCategory; 