'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const categories = [
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
        ],
      },
      {
        name: 'THROWS',
        links: [
          'Shop Throw by Type',
          'Shop Throw by Colour',
          'Shop All',
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
        links: ['Shop all'],
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
        links: ['Hoodie', 'Sweatshirt'],
      },
      {
        name: 'WOMEN',
        links: ['Denim', 'Jersey', 'Jogger', 'Lounge & Nightwear'],
      },
    ],
  },
  {
    name: 'FOOTWEAR',
    img: '/cat-footwear-main.jpg',
    sub: [
      {
        name: 'BOOTIES',
        links: ['Shop All'],
      },
      {
        name: 'SLIPPERS',
        links: ['Shop All'],
      },
      {
        name: 'SOCKS',
        links: ['Shop all'],
      },
    ],
  },
];

export default function CategoryPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Categories</h1>
      </div>
      
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={category.name} className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={category.img}
                alt={category.name}
                width={300}
                height={200}
                className={styles.categoryImage}
              />
            </div>
            <div className={styles.categoryInfo}>
              <h2 className={styles.categoryName}>{category.name}</h2>
              <div className={styles.subcategories}>
                {category.sub.map((sub) => (
                  <div key={sub.name} className={styles.subcategory}>
                    <span className={styles.subcategoryName}>{sub.name}</span>
                    <span className={styles.arrow}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 