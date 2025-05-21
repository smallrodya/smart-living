'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MobileCategoriesMenu.module.css';

interface MenuColumn {
  title?: string;
  items: Array<{ label: string; href?: string; color?: string }>;
}

interface Category {
  name: string;
  img: string;
  color: string;
  columns: MenuColumn[];
}

const categories: Category[] = [
  {
    name: 'BEDDING',
    img: '/cat-bedding-main.jpg',
    color: '#edc5c0',
    columns: [
      {
        title: 'CATEGORY',
        items: [
          { label: 'Duvet Covers', href: '/category/bedding/duvet-covers' },
          { label: 'Fitted Sheets', href: '/category/bedding/fitted-sheets' },
          { label: 'Pillowcases', href: '/category/bedding/pillowcases' },
          { label: 'Duvets & Pillows', href: '/category/bedding/duvets-pillows' },
          { label: 'Coverless Duvets', href: '/category/bedding/coverless-duvets' },
          { label: 'Mattresses & Protector', href: '/category/bedding/mattresses-protector' },
          { label: 'Fleece Bedding', href: '/category/bedding/fleece' },
          { label: 'Plain Dye Bedding', href: '/category/bedding/plain-dye' },
          { label: 'Weighted Blankets', href: '/category/bedding/weighted-blankets' },
          { label: 'Kids Bedding', href: '/category/bedding/kids' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Fleece', href: '/category/bedding/fleece' },
          { label: 'Plain', href: '/category/bedding/plain' },
          { label: 'Reversible', href: '/category/bedding/reversible' },
          { label: 'Striped', href: '/category/bedding/striped' },
          { label: 'Teddy', href: '/category/bedding/teddy' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'Single', href: '/category/bedding/single' },
          { label: 'Double', href: '/category/bedding/double' },
          { label: 'King', href: '/category/bedding/king' },
          { label: 'Super King', href: '/category/bedding/super-king' },
        ],
      },
      {
        title: 'TRENDING COLOURS',
        items: [
          { label: 'Black', color: '#222' },
          { label: 'Grey', color: '#888' },
          { label: 'White', color: '#fff' },
          { label: 'Cream', color: '#f5f5dc' },
          { label: 'Pink', color: '#f7d6e0' },
          { label: 'Red', color: '#e53935' },
          { label: 'Orange', color: '#ff9800' },
          { label: 'Yellow', color: '#ffe066' },
          { label: 'Green', color: '#4caf50' },
          { label: 'Teal', color: '#00bfae' },
          { label: 'Purple', color: '#9c27b0' },
          { label: 'Brown', color: '#795548' },
        ],
      },
    ],
  },
  {
    name: 'RUGS & MATS',
    img: '/cat-rugs-main.jpg',
    color: '#F5DEB3',
    columns: [
      {
        title: 'MATS TYPES',
        items: [
          { label: 'Bath Mats', href: '/category/rugs-mats/mats/bath-mats' },
          { label: 'Door Mats', href: '/category/rugs-mats/mats/door-mats' },
          { label: 'Kitchen Mats', href: '/category/rugs-mats/mats/kitchen-mats' },
          { label: 'Anti-Fatigue Mats', href: '/category/rugs-mats/mats/anti-fatigue-mats' },
          { label: 'Outdoor Mats', href: '/category/rugs-mats/mats/outdoor-mats' },
          { label: 'Hallway Runners', href: '/category/rugs-mats/mats/hallway-runners' },
        ],
      },
      {
        title: 'RUGS TYPES',
        items: [
          { label: 'Shaggy Rugs', href: '/category/rugs/rugtype/shaggy-rugs' },
          { label: 'Carved Rugs', href: '/category/rugs/rugtype/carved-rugs' },
          { label: 'Reversible Rugs', href: '/category/rugs/rugtype/reversible-rugs' },
          { label: 'Polyester shaggy rugs', href: '/category/rugs/rugtype/polyester-shag-rugs' },
          { label: 'Soft Shaggy Rugs', href: '/category/rugs/rugtype/soft-shaggy-rugs' },
        ],
      },
      {
        title: 'SHOP BY SIZE',
        items: [
          { label: 'Small', href: '/category/rugs-mats/small' },
          { label: 'Medium', href: '/category/rugs-mats/medium' },
          { label: 'Large', href: '/category/rugs-mats/large' },
          { label: 'Runner', href: '/category/rugs-mats/runner' },
        ],
      },
      {
        title: 'TRENDING COLOURS',
        items: [
          { label: 'Black', color: '#222' },
          { label: 'Grey', color: '#888' },
          { label: 'White', color: '#fff' },
          { label: 'Cream', color: '#f5f5dc' },
          { label: 'Pink', color: '#f7d6e0' },
          { label: 'Red', color: '#e53935' },
          { label: 'Orange', color: '#ff9800' },
          { label: 'Yellow', color: '#ffe066' },
          { label: 'Green', color: '#4caf50' },
          { label: 'Teal', color: '#00bfae' },
          { label: 'Purple', color: '#9c27b0' },
          { label: 'Brown', color: '#795548' },
        ],
      },
    ],
  },
  {
    name: 'THROWS & TOWELS',
    img: '/cat-throws-main.jpg',
    color: '#d7d7f7',
    columns: [
      {
        title: 'TOWELS',
        items: [
          { label: 'Shop Towels by Design', href: '/category/throws-towels/towels-design' },
          { label: 'Shop Towel by Colour', href: '/category/throws-towels/towel-colour' },
          { label: 'Shop All', href: '/category/throws-towels' },
          { label: 'Towel Bales From £8.99', href: '/category/towels' },
        ],
      },
      {
        title: 'THROWS',
        items: [
          { label: 'Shop Throw by Type', href: '/category/throws-towels/throw-type' },
          { label: 'Shop Throw by Colour', href: '/category/throws-towels/throw-colour' },
          { label: 'Shop All', href: '/category/throws-towels' },
          { label: 'Throws from £11.99', href: '/category/throws' },
        ],
      },
    ],
  },
  {
    name: 'OUTDOOR',
    img: '/cat-outdoor-main.jpg',
    color: '#89f591',
    columns: [
      {
        title: 'CHAIRS',
        items: [
          { label: 'Shop all', href: '/category/outdoor/chairs' },
        ],
      },
    ],
  },
  {
    name: 'CURTAINS',
    img: '/cat-curtains-main.jpg',
    color: '#FFB6C1',
    columns: [
      {
        title: 'CURTAINS',
        items: [
          { label: 'Shop by Curtain Type', href: '/category/curtains/curtain-type' },
          { label: 'Shop by Curtain Colour', href: '/category/curtains/curtain-colour' },
          { label: 'Shop All', href: '/category/curtains' },
        ],
      },
    ],
  },
  {
    name: 'CLOTHING',
    img: '/cat-clothing-main.jpg',
    color: '#D8BFD8',
    columns: [
      {
        title: 'MEN',
        items: [
          { label: 'Hoodie', href: '/category/clothing/men/hoodie' },
          { label: 'Sweatshirt', href: '/category/clothing/men/sweatshirt' },
        ],
      },
      {
        title: 'WOMEN',
        items: [
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
    color: '#6deded',
    columns: [
      {
        title: 'BOOTIES',
        items: [
          { label: 'Shop All', href: '/category/footwear/booties' },
        ],
      },
      {
        title: 'SLIPPERS',
        items: [
          { label: 'Shop All', href: '/category/footwear/slippers' },
        ],
      },
      {
        title: 'SOCKS',
        items: [
          { label: 'Shop all', href: '/category/footwear/socks' },
        ],
      },
    ],
  },
];

const MobileCategoriesMenu = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedColumn, setExpandedColumn] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    setExpandedColumn(null);
  };

  const toggleColumn = (columnTitle: string) => {
    setExpandedColumn(expandedColumn === columnTitle ? null : columnTitle);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Categories</h1>
      </div>
      
      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <div 
            key={category.name} 
            className={styles.categoryItem}
          >
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
                {category.columns.map((column) => (
                  <div key={column.title} className={styles.column}>
                    <div 
                      className={styles.columnHeader}
                      onClick={() => toggleColumn(column.title || '')}
                    >
                      <h3 className={styles.columnTitle}>{column.title}</h3>
                      <span className={`${styles.arrow} ${expandedColumn === column.title ? styles.arrowUp : ''}`}>
                        ›
                      </span>
                    </div>
                    
                    {expandedColumn === column.title && (
                      <div className={styles.columnItems}>
                        {column.title === 'TRENDING COLOURS' ? (
                          <div className={styles.colorDotsGrid}>
                            {column.items.map((item, idx) => (
                              <span 
                                key={idx} 
                                className={styles.colorDot} 
                                title={item.label} 
                                style={{ background: item.color }}
                              />
                            ))}
                          </div>
                        ) : (
                          column.items.map((item, idx) => (
                            <Link 
                              key={idx} 
                              href={item.href || '#'}
                              className={styles.columnItem}
                            >
                              {item.label}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCategoriesMenu; 