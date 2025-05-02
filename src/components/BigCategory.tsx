'use client';

import React, { useState } from "react";
import Image from 'next/image';
import styles from './BigCategory.module.css';

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

const BigCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.categoriesGrid}>
          {currentCategories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={`/${category.image}`}
                  alt={category.name}
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.productCount}>{category.productCount} products</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.navigation}>
          <button 
            onClick={prevPage} 
            disabled={currentIndex === 0} 
            className={styles.navButton}
          >
            ←
          </button>
          <button 
            onClick={nextPage} 
            disabled={currentIndex + itemsPerPage >= categories.length} 
            className={styles.navButton}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default BigCategory; 