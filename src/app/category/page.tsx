'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './category.module.css';

interface SubCategory {
  name: string;
  links: Array<{
    label: string;
    href: string;
  }>;
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
          { label: 'Shop Duvet Set by Type', href: '/shop-duvet-set-by-type' },
          { label: 'Shop Duvet Set by Colour', href: '/category/bedding/duvet-colour' },
          { label: 'Shop Duvet Set under £10', href: '/category/bedding/duvet-under-10' },
          { label: 'Clearance', href: '/category/bedding/clearance' },
          { label: 'Shop All', href: '/category/bedding/all' },
          { label: 'Duvet Covers from £9.99', href: '/category/bedding/duvet-covers' },
        ],
      },
      {
        name: 'BED SHEETS',
        links: [
          { label: 'Shop by Sheet Type', href: '/category/bedding/sheets-type' },
          { label: 'Shop by Sheet Colour', href: '/category/bedding/sheets-colour' },
          { label: 'Shop from £4.49', href: '/category/bedding/sheets-sale' },
          { label: 'Shop All', href: '/category/bedding/sheets-all' },
        ],
      },
      {
        name: 'KIDS COLLECTION',
        links: [
          { label: 'Kids collection by type', href: '/category/bedding/kids-type' },
          { label: 'Shop by Colour', href: '/category/bedding/kids-colour' },
          { label: 'Shop by Material', href: '/category/bedding/kids-material' },
          { label: 'Shop All', href: '/category/bedding/kids-all' },
        ],
      },
      {
        name: 'BED LINEN',
        links: [
          { label: 'Bed Linen from £4.49', href: '/category/bedding/bed-linen-sale' },
        ],
      },
      {
        name: 'TEDDY SETS',
        links: [
          { label: 'Teddy Sets from £11.99', href: '/category/bedding/teddy-sets' },
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
          { label: 'Shop Mats by Colour', href: '/category/rugs/mats-colour' },
          { label: 'Shop Mats by Design', href: '/category/rugs/mats-design' },
          { label: 'Shop Mats from £5.49', href: '/category/rugs/mats-sale' },
          { label: 'Shop All', href: '/category/rugs/mats-all' },
        ],
      },
      {
        name: 'RUGS',
        links: [
          { label: 'Shop Rugs by Type', href: '/category/rugs/rugtype' },
          { label: 'Shop Rugs by Colour', href: '/category/rugs/rugs-colour' },
          { label: 'Shop Rugs from £10.99', href: '/category/rugs/rugs-sale' },
          { label: 'Shop All', href: '/category/rugs/rugs-all' },
          { label: 'Carved Rugs from £12.99', href: '/category/rugs/rugtype/carved-rugs' },
          { label: 'Shaggy Rugs from £11.98', href: '/category/rugs/rugtype/shaggy-rugs' },
          { label: 'Non Slip Mats from £5.49', href: '/category/rugs/non-slip-mats' },
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
          { label: 'Shop Towels by Design', href: '/category/throws/towels-design' },
          { label: 'Shop Towel by Colour', href: '/category/throws/towels-colour' },
          { label: 'Shop All', href: '/category/throws/towels-all' },
          { label: 'Towel Bales From £8.99', href: '/category/throws/towels-sale' },
        ],
      },
      {
        name: 'THROWS',
        links: [
          { label: 'Shop Throw by Type', href: '/category/throws/throw-type' },
          { label: 'Shop Throw by Colour', href: '/category/throws/throw-colour' },
          { label: 'Shop All', href: '/category/throws/throw-all' },
          { label: 'Throws from £11.99', href: '/category/throws/throw-sale' },
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
          { label: 'Shop all', href: '/category/outdoor/chairs-all' },
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
          { label: 'Shop by Curtain Type', href: '/category/curtains/curtain-type' },
          { label: 'Shop by Curtain Colour', href: '/category/curtains/curtain-colour' },
          { label: 'Shop All', href: '/category/curtains/curtain-all' },
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
          { label: 'Hoodie', href: '/category/clothing/men/hoodie' },
          { label: 'Sweatshirt', href: '/category/clothing/men/sweatshirt' },
        ],
      },
      {
        name: 'WOMEN',
        links: [
          { label: 'Denim', href: '/category/clothing/women/denim' },
          { label: 'Jersey', href: '/category/clothing/women/jersey' },
          { label: 'Jogger', href: '/category/clothing/women/jogger' },
          { label: 'Lounge & Nightwear', href: '/category/clothing/women/lounge-nightwear' },
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
          { label: 'Shop All', href: '/category/footwear/booties-all' },
        ],
      },
      {
        name: 'SLIPPERS',
        links: [
          { label: 'Shop All', href: '/category/footwear/slippers-all' },
        ],
      },
      {
        name: 'SOCKS',
        links: [
          { label: 'Shop all', href: '/category/footwear/socks-all' },
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
                          key={link.label} 
                          href={link.href}
                          className={styles.link}
                        >
                          {link.label}
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