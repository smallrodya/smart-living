'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MobileCategoriesSection.module.css';

const categories = [
  {
    name: 'BEDDING',
    sub: [
      {
        name: 'DUVET SET',
        links: [
          { label: 'Shop Duvet Set by Type', href: '/shop-duvet-set-by-type' },
          { label: 'Shop Duvet Set by Colour', href: '/categories/bedding/duvet-colour' },
          { label: 'Shop Duvet Set under £10', href: '/categories/bedding/under-10' },
          { label: 'Clearance', href: '/categories/bedding/clearance' },
        ],
      },
      {
        name: 'BED SHEETS',
        links: [
          { label: 'Shop by Sheet Type', href: '/categories/bedding/sheet-type' },
          { label: 'Shop by Sheet Colour', href: '/categories/bedding/sheet-colour' },
          { label: 'Shop from £4.49', href: '/categories/bedding/from-4.49' },
        ],
      },
    ],
  },
  {
    name: 'RUGS & MATS',
    sub: [
      {
        name: 'MATS',
        links: [
          { label: 'Shop Mats by Colour', href: '/categories/rugs-mats/mats-colour' },
          { label: 'Shop Mats by Design', href: '/categories/rugs-mats/mats-design' },
        ],
      },
      {
        name: 'RUGS',
        links: [
          { label: 'Shop Rugs by Type', href: '/categories/rugs-mats/rugs-type' },
          { label: 'Shop Rugs by Colour', href: '/categories/rugs-mats/rugs-colour' },
        ],
      },
    ],
  },
];

const MobileCategoriesSection = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <div key={category.name} className={styles.category}>
          <button
            className={`${styles.categoryButton} ${expandedCategory === category.name ? styles.expanded : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.arrow}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          {expandedCategory === category.name && (
            <div className={styles.subcategories}>
              {category.sub.map((sub) => (
                <div key={sub.name} className={styles.subcategory}>
                  <h3 className={styles.subcategoryTitle}>{sub.name}</h3>
                  <div className={styles.links}>
                    {sub.links.map((link) => (
                      <button
                        key={link.label}
                        className={styles.link}
                        onClick={() => handleLinkClick(link.href)}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileCategoriesSection; 