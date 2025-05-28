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
          { label: 'Duvet Cover Sets', href: '/shop/duvet-set-by-type' },
          { label: 'Complete Bedding Sets', href: '/shop/complete-bedding-set' },
          { label: 'Fitted Sheets', href: '/shop/fitted-sheets' },
          { label: 'Pillowcases', href: '/shop/pillowcases' },
          { label: 'Fleece Bedding', href: '/shop/fleece-bedding' },
          { label: 'Weighted Blankets', href: '/shop/weighted-blankets' },
          { label: 'Kids Beding', href: '/shop/kids-bedding' },
          { label: 'Bedspreads', href: '/shop/bedspreads' },
          { label: 'Electric Underblankets', href: '/shop/electric-underblankets' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Printed', href: '/shop/printed' },
          { label: 'Plain', href: '/shop/plain' },
          { label: '3D', href: '/shop/3d' },
          { label: 'Teddy', href: '/shop/teddy' },
          { label: 'Hotel Quality', href: '/shop/hotel-quality' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'Single', href: '/shop/single' },
          { label: 'Double', href: '/shop/double' },
          { label: 'King', href: '/shop/king' },
          { label: 'Super King', href: '/shop/super-king' },
          { label: 'Crib', href: '/shop/crib' },
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
        title: 'RUG TYPES',
        items: [
          { label: 'Shaggy Rugs', href: '/shop/rugs/shaggy-rugs' },
          { label: 'Carved Rugs', href: '/shop/rugs/carved-rugs' },
          { label: 'Reversible Rugs', href: '/shop/rugs/reversible-rugs' },
          { label: 'Hallway Runner', href: '/shop/rugs/hallway-runner' },
          { label: 'Table Runner', href: '/shop/rugs/table-runner' },
        ],
      },
      {
        title: 'MAT TYPES',
        items: [
          { label: 'Door Mat', href: '/shop/rugs-mats/mats/door-mat' },
          { label: 'Kitchen Mat', href: '/shop/rugs-mats/mats/kitchen-mat' },
          { label: 'Hallway Runner', href: '/shop/rugs-mats/mats/hallway-runner' },
          { label: 'Table Placemat', href: '/shop/rugs-mats/mats/table-placemat' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'Small', href: '/shop/rugs-mats/small' },
          { label: 'Medium', href: '/shop/rugs-mats/medium' },
          { label: 'Large', href: '/shop/rugs-mats/large' },
          { label: 'Xlarge', href: '/shop/rugs-mats/xlarge' },
          { label: 'Runner', href: '/shop/rugs-mats/runner' },
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
        title: 'CATEGORY',
        items: [
          { label: 'Tea Towels', href: '/shop/throws-towels/tea-towels' },
          { label: '8Pc Towel Bale Set', href: '/shop/throws-towels/8pc-towel-bale-set' },
          { label: '10Pc Towel Bale Set', href: '/shop/throws-towels/10pc-towel-bale-set' },
          { label: 'Weighted Blankets', href: '/shop/throws-towels/weighted-blankets' },
          { label: 'Throws', href: '/shop/throws-towels/throws' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Fleece', href: '/shop/throws-towels/fleece' },
          { label: 'Plain', href: '/shop/throws-towels/plain' },
          { label: '3D', href: '/shop/throws-towels/3d' },
          { label: 'Chunky Hand Knitted', href: '/shop/throws-towels/chunky-hand-knitted' },
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
    name: 'OUTDOOR',
    img: '/cat-outdoor-main.jpg',
    color: '#89f591',
    columns: [
      {
        title: 'CATEGORY',
        items: [
          { label: 'Shop all', href: '/shop/outdoor' },
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
        title: 'CATEGORY',
        items: [
          { label: 'In the near future.', href: '/shop/curtains/living-room' },
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
        title: 'CATEGORY',
        items: [
          { label: "Men's", href: '/shop/clothing/men' },
          { label: "Women's", href: '/shop/clothing/women' },
          { label: "Kid's", href: '/shop/clothing/kids' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Jeans', href: '/shop/clothing/jeans' },
          { label: 'Joggers', href: '/shop/clothing/joggers' },
          { label: 'Hoodies', href: '/shop/clothing/hoodies' },
          { label: 'Polo Shirts', href: '/shop/clothing/polo-shirts' },
          { label: 'Loungewear', href: '/shop/clothing/loungewear' },
          { label: 'Bathrobes', href: '/shop/clothing/bathrobes' },
        ],
      },
      {
        title: 'TRENDING COLOURS',
        items: [
          { label: 'Black', color: '#222' },
          { label: 'Grey', color: '#888' },
          { label: 'White', color: '#fff' },
          { label: 'Navy', color: '#1a237e' },
          { label: 'Red', color: '#e53935' },
          { label: 'Green', color: '#4caf50' },
          { label: 'Blue', color: '#2196f3' },
          { label: 'Purple', color: '#9c27b0' },
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
        title: 'CATEGORY',
        items: [
          { label: 'Booties', href: '/shop/footwear/booties' },
          { label: 'Slippers', href: '/shop/footwear/slippers' },
          { label: 'Socks', href: '/shop/footwear/socks' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'UK 3-4', href: '/shop/footwear/uk-3-4' },
          { label: 'UK 5-6', href: '/shop/footwear/uk-5-6' },
          { label: 'UK 7-8', href: '/shop/footwear/uk-7-8' },
          { label: 'UK 9-10', href: '/shop/footwear/uk-9-10' },
          { label: 'UK 11-12', href: '/shop/footwear/uk-11-12' },
          { label: 'Small', href: '/shop/footwear/small' },
          { label: 'Medium', href: '/shop/footwear/medium' },
          { label: 'Large', href: '/shop/footwear/large' },
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