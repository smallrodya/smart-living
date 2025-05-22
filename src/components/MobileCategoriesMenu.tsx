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
          { label: 'Duvet Cover Sets', href: '/' },
          { label: 'Complete Bedding Sets', href: 'shop-duvet-set-by-type' },
          { label: 'Fitted Sheets', href: '/category/bedding/fitted-sheets' },
          { label: 'Pillowcases', href: '/category/bedding/pillowcases' },
          { label: 'Fleece Bedding', href: '/category/bedding/fleece' },
          { label: 'Weighted Blankets', href: '/category/bedding/weighted-blankets' },
          { label: 'Kids Beding', href: '/category/bedding/kids' },
          { label: 'Bedspreads', href: '/category/bedding/bedspreads' },
          { label: 'Electric Underblankets', href: '/category/bedding/electric-underblankets' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Printed', href: '/shop/printed-duvet-set' },
          { label: 'Plain', href: '/category/bedding/plain' },
          { label: '3D', href: '/category/bedding/3d' },
          { label: 'Teddy', href: '/category/bedding/teddy' },
          { label: 'Hotel Quality', href: '/category/bedding/hotel-quality' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'Single', href: '/category/bedding/single' },
          { label: 'Double', href: '/category/bedding/double' },
          { label: 'King', href: '/category/bedding/king' },
          { label: 'Super King', href: '/category/bedding/super-king' },
          { label: 'Crib', href: '/category/bedding/crib' },
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
          { label: 'Shaggy Rugs', href: '/category/rugs/rugtype/shaggy-rugs' },
          { label: 'Carved Rugs', href: '/category/rugs/rugtype/carved-rugs' },
          { label: 'Reversible Rugs', href: '/category/rugs/rugtype/reversible-rugs' },
          { label: 'Hallway Runner', href: '/category/rugs/rugtype/hallway-runner' },
          { label: 'Table Runner', href: '/category/rugs/rugtype/table-runner' },
        ],
      },
      {
        title: 'MAT TYPES',
        items: [
          { label: 'Door Mat', href: '/category/rugs-mats/mats/door-mat' },
          { label: 'Kitchen Mat', href: '/category/rugs-mats/mats/kitchen-mat' },
          { label: 'Hallway Runner', href: '/category/rugs-mats/mats/hallway-runner' },
          { label: 'Table Placemat', href: '/category/rugs-mats/mats/table-placemat' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'Small', href: '/category/rugs-mats/small' },
          { label: 'Medium', href: '/category/rugs-mats/medium' },
          { label: 'Large', href: '/category/rugs-mats/large' },
          { label: 'Xlarge', href: '/category/rugs-mats/xlarge' },
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
        title: 'CATEGORY',
        items: [
          { label: 'Tea Towels', href: '/category/throws-towels/tea-towels' },
          { label: '8Pc Towel Bale Set', href: '/category/throws-towels/8pc-towel-bale-set' },
          { label: '10Pc Towel Bale Set', href: '/category/throws-towels/10pc-towel-bale-set' },
          { label: 'Weighted Blankets', href: '/category/throws-towels/weighted-blankets' },
          { label: 'Throws', href: '/category/throws-towels/throws' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Fleece', href: '/category/throws-towels/fleece' },
          { label: 'Plain', href: '/category/throws-towels/plain' },
          { label: '3D', href: '/category/throws-towels/3d' },
          { label: 'Chunky Hand Knitted', href: '/category/throws-towels/chunky-hand-knitted' },
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
          { label: 'Shop all', href: '/category/outdoor/shop-all' },
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
          { label: 'In the near future.', href: '/category/curtains/living-room' },
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
          { label: "Men's", href: '/category/clothing/men' },
          { label: "Women's", href: '/category/clothing/women' },
          { label: "Kid's", href: '/category/clothing/kids' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Jeans', href: '/category/clothing/jeans' },
          { label: 'Joggers', href: '/category/clothing/joggers' },
          { label: 'Hoodies', href: '/category/clothing/hoodies' },
          { label: 'Polo Shirts', href: '/category/clothing/polo-shirts' },
          { label: 'Loungewear', href: '/category/clothing/loungewear' },
          { label: 'Bathrobes', href: '/category/clothing/bathrobes' },
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
          { label: 'Booties', href: '/category/footwear/booties' },
          { label: 'Slippers', href: '/category/footwear/slippers' },
          { label: 'Socks', href: '/category/footwear/socks' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'UK 3-4', href: '/category/footwear/uk-3-4' },
          { label: 'UK 5-6', href: '/category/footwear/uk-5-6' },
          { label: 'UK 7-8', href: '/category/footwear/uk-7-8' },
          { label: 'UK 9-10', href: '/category/footwear/uk-9-10' },
          { label: 'UK 11-12', href: '/category/footwear/uk-11-12' },
          { label: 'Small', href: '/category/footwear/small' },
          { label: 'Medium', href: '/category/footwear/medium' },
          { label: 'Large', href: '/category/footwear/large' },
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