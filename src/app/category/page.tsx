'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './category.module.css';

interface SubCategory {
  name: string;
  links: string[];
}

interface Category {
  name: string;
  img: string;
  sub: SubCategory[];
}

const categories: Category[] = [
  {
    name: 'BEDDING',
    img: '/cat-bedding-main.jpg',
    sub: [
      {
        name: 'DUVET SET',
        links: [
          'Shop Duvet Set by Type',
          'Shop Duvet Set by Colour',
          'Shop Duvet Set under £10',
          'Clearance',
          'Shop All',
          'Duvet Covers from £9.99',
        ],
      },
      {
        name: 'BED SHEETS',
        links: [
          'Shop by Sheet Type',
          'Shop by Sheet Colour',
          'Shop from £4.49',
          'Shop All',
        ],
      },
      {
        name: 'KIDS COLLECTION',
        links: [
          'Kids collection by type',
          'Shop by Colour',
          'Shop by Material',
          'Shop All',
        ],
      },
      {
        name: 'BED LINEN',
        links: [
          'Bed Linen from £4.49',
        ],
      },
      {
        name: 'TEDDY SETS',
        links: [
          'Teddy Sets from £11.99',
        ],
      },
    ],
  },
  {
    name: 'RUGS & MATS',
    img: '/cat-rugs-main.jpg',
    sub: [
      {
        name: 'MATS',
        links: [
          'Shop Mats by Colour',
          'Shop Mats by Design',
          'Shop Mats from £5.49',
          'Shop All',
        ],
      },
      {
        name: 'RUGS',
        links: [
          'Shop Rugs by Type',
          'Shop Rugs by Colour',
          'Shop Rugs from £10.99',
          'Shop All',
          'Carved Rugs from £12.99',
          'Shaggy Rugs from £11.98',
          'Non Slip Mats from £5.49',
        ],
      },
    ],
  },
  {
    name: 'THROWS & TOWELS',
    img: '/cat-throws-main.jpg',
    sub: [
      {
        name: 'TOWELS',
        links: [
          'Shop Towels by Design',
          'Shop Towel by Colour',
          'Shop All',
          'Towel Bales From £8.99',
        ],
      },
      {
        name: 'THROWS',
        links: [
          'Shop Throw by Type',
          'Shop Throw by Colour',
          'Shop All',
          'Throws from £11.99',
        ],
      },
    ],
  },
  {
    name: 'OUTDOOR',
    img: '/cat-outdoor-main.jpg',
    sub: [
      {
        name: 'CHAIRS',
        links: [
          'Shop all',
        ],
      },
    ],
  },
  {
    name: 'CURTAINS',
    img: '/cat-curtains-main.jpg',
    sub: [
      {
        name: 'CURTAINS',
        links: [
          'Shop by Curtain Type',
          'Shop by Curtain Colour',
          'Shop All',
        ],
      },
    ],
  },
  {
    name: 'CLOTHING',
    img: '/cat-clothing-main.jpg',
    sub: [
      {
        name: 'MEN',
        links: [
          'Hoodie',
          'Sweatshirt',
        ],
      },
      {
        name: 'WOMEN',
        links: [
          'Denim',
          'Jersey',
          'Jogger',
          'Lounge & Nightwear',
        ],
      },
    ],
  },
  {
    name: 'FOOTWEAR',
    img: '/cat-footwear-main.jpg',
    sub: [
      {
        name: 'BOOTIES',
        links: [
          'Shop All',
        ],
      },
      {
        name: 'SLIPPERS',
        links: [
          'Shop All',
        ],
      },
      {
        name: 'SOCKS',
        links: [
          'Shop all',
        ],
      },
    ],
  },
];

export default function CategoryPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </Link>
        <h1>Categories</h1>
      </div>
      
      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <div key={category.name} className={styles.categoryItem}>
            <div 
              className={styles.categoryHeader}
              onClick={() => toggleCategory(category.name)}
            >
              <div className={styles.categoryImageWrapper}>
                <Image
                  src={category.img}
                  alt={category.name}
                  width={60}
                  height={60}
                  className={styles.categoryImage}
                />
              </div>
              <span className={styles.categoryName}>{category.name}</span>
              <span className={`${styles.arrow} ${expandedCategory === category.name ? styles.arrowUp : ''}`}>
                ›
              </span>
            </div>
            
            {expandedCategory === category.name && (
              <div className={styles.subcategories}>
                {category.sub.map((sub) => (
                  <div key={sub.name} className={styles.subcategory}>
                    <h3 className={styles.subcategoryTitle}>{sub.name}</h3>
                    <div className={styles.links}>
                      {sub.links.map((link) => (
                        <Link 
                          key={link} 
                          href={`/category/${category.name.toLowerCase()}/${link.toLowerCase().replace(/\s+/g, '-')}`}
                          className={styles.link}
                        >
                          {link}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 