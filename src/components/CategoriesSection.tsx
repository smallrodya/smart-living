'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoriesSection.module.css';

interface MenuColumn {
  title?: string;
  items: Array<{ label: string; href?: string; color?: string; img?: string; description?: string; labelColor?: string }>;
}

interface MegaMenu {
  name: string;
  columns: MenuColumn[];
}

const megaMenus: MegaMenu[] = [
  {
    name: 'BEDDING',
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
      {
        items: [
          { img: '/printed-duvet68.jpg', label: 'New in summer collection', labelColor: 'red', description: 'Shop Now', href: '/shop/printed-duvet-set' },
          { img: '/premium-duvet139.jpg', label: 'Summer sale upto 70% off', labelColor: 'red', description: 'Shop Now', href: '/shop-duvet-set-by-type/premium-duvet-set' },
        ],
      },
    ],
  },
  {
    name: 'RUGS & MATS',
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
          { label: 'Door Mat', href: '/shop/mats/door-mat' },
          { label: 'Kitchen Mat', href: '/shop/mats/kitchen-mat' },
          { label: 'Hallway Runner', href: '/shop/mats/hallway-runner' },
          { label: 'Table Placemat', href: '/shop/mats/table-placemat' },
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
      {
        items: [
          { img: '/carved15.jpg', label: 'Explore our range of stylish rugs for every room!', labelColor: 'red', description: 'Shop Now', href: '/category/rugs-mats/rugs' },
          { img: '/carved16.jpg', label: 'Find the perfect mat for your hallway or bathroom.', labelColor: 'red', description: 'Shop Now', href: '/category/rugs-mats/mats' },
        ],
      },
    ],
  },
  {
    name: 'THROWS & TOWELS',
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
          { label: 'Fleece', href: '/category/throws-towels/fleece' },
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
      {
        items: [
          { img: '/throws-main.jpg', label: 'New in summer collection', labelColor: 'red', description: 'Shop Now', href: '/shop/throws-collection' },
          { img: '/towels-main.jpg', label: 'Summer sale upto 70% off', labelColor: 'red', description: 'Shop Now', href: '/shop-towels' },
        ],
      },
    ],
  },
  {
    name: 'OUTDOOR',
    columns: [
      {
        title: 'CATEGORY',
        items: [
          { label: 'Shop all', href: '/category/outdoor/shop-all' },
        ],
      },
      {
        items: [
          { img: '/outdoor-main.jpg', label: 'New summer collection', labelColor: 'red', description: 'Shop Now', href: '/shop/outdoor-collection' },
          { img: '/garden-main.jpg', label: 'Summer sale upto 70% off', labelColor: 'red', description: 'Shop Now', href: '/shop-garden' },
        ],
      },
    ],
  },
  {
    name: 'CURTAINS',
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
      {
        items: [
          { img: '/clothing-main.jpg', label: 'New season collection', labelColor: 'red', description: 'Shop Now', href: '/shop/clothing-collection' },
          { img: '/clothing-sale.jpg', label: 'Sale upto 70% off', labelColor: 'red', description: 'Shop Now', href: '/shop-clothing' },
        ],
      },
    ],
  },
  {
    name: 'FOOTWEAR',
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
      {
        items: [
          { img: '/footwear-main.jpg', label: 'New collection', labelColor: 'red', description: 'Shop Now', href: '/shop/footwear-collection' },
          { img: '/footwear-sale.jpg', label: 'Sale upto 70% off', labelColor: 'red', description: 'Shop Now', href: '/shop-footwear' },
        ],
      },
    ],
  },
  {
    name: 'CLEARANCE',
    columns: [
      {
        items: [
          { label: 'Clearance', href: '/shop/clearance', labelColor: 'red' },
        ],
      },
    ],
  },
];

const CategoriesSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (idx: number) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setHoveredIdx(idx);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
      setHoveredIdx(null);
    }, 180);
  };

  return (
    <nav className={styles.menuBar} aria-label="Main categories">
      <ul className={styles.menuList} role="menubar">
        {megaMenus.map((cat, idx) => (
          <li
            key={cat.name}
            className={styles.menuItem + (hoveredIdx === idx && dropdownOpen ? ' ' + styles.active : '')}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={hoveredIdx === idx && dropdownOpen}
            role="menuitem"
          >
            <span
              className={styles.menuTitle}
              style={cat.name === 'CLEARANCE' ? { color: 'red' } : undefined}
            >
              {cat.name}
            </span>
            {hoveredIdx === idx && dropdownOpen && (
              <div className={styles.dropdown} role="menu">
                <div className={styles.dropdownContent}>
                  {cat.columns.map((col, colIdx) => (
                    <div key={colIdx} className={styles.dropdownCol}>
                      {col.title && <div className={styles.dropdownColTitle}>{col.title}</div>}
                      {col.title === 'TRENDING COLOURS' ? (
                        <div className={styles.colorDotsGrid}>
                          {col.items.map((item, itemIdx) => (
                            <span key={itemIdx} className={styles.colorDot} title={item.label} style={{ background: item.color }}></span>
                          ))}
                        </div>
                      ) : (
                        col.items[0]?.img ? (
                          <div className={styles.promoRow}>
                            {col.items.map((item, itemIdx) => (
                              <div key={itemIdx} className={styles.promoBlock}>
                                <Link href={item.href || '#'}>
                                  <Image src={item.img ?? '/placeholder.jpg'} alt={item.label} width={180} height={120} className={styles.promoImg} />
                                  <div className={styles.promoText} style={item.labelColor ? { color: item.labelColor } : undefined}>{item.label}</div>
                                  <div className={styles.promoDesc}>{item.description}</div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className={styles.dropdownLinks}>
                            {col.items.map((item, itemIdx) => (
                              <li key={itemIdx} className={styles.dropdownLink}>
                                <Link href={item.href || '#'} tabIndex={0}>{item.label}</Link>
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesSection; 