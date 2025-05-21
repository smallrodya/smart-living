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
          { label: 'Bath Towels', href: '/category/throws-towels/bath-towels' },
          { label: 'Hand Towels', href: '/category/throws-towels/hand-towels' },
          { label: 'Beach Towels', href: '/category/throws-towels/beach-towels' },
          { label: 'Kitchen Towels', href: '/category/throws-towels/kitchen-towels' },
          { label: 'Throws & Blankets', href: '/category/throws-towels/throws-blankets' },
          { label: 'Weighted Blankets', href: '/category/throws-towels/weighted-blankets' },
          { label: 'Kids Towels', href: '/category/throws-towels/kids-towels' },
          { label: 'Towel Sets', href: '/category/throws-towels/towel-sets' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Plain', href: '/category/throws-towels/plain' },
          { label: 'Patterned', href: '/category/throws-towels/patterned' },
          { label: 'Striped', href: '/category/throws-towels/striped' },
          { label: 'Embroidered', href: '/category/throws-towels/embroidered' },
          { label: 'Luxury', href: '/category/throws-towels/luxury' },
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
          { label: 'Living Room Curtains', href: '/category/curtains/living-room' },
          { label: 'Bedroom Curtains', href: '/category/curtains/bedroom' },
          { label: 'Kitchen Curtains', href: '/category/curtains/kitchen' },
          { label: 'Blackout Curtains', href: '/category/curtains/blackout' },
          { label: 'Sheer Curtains', href: '/category/curtains/sheer' },
          { label: 'Curtain Sets', href: '/category/curtains/sets' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Modern', href: '/category/curtains/modern' },
          { label: 'Classic', href: '/category/curtains/classic' },
          { label: 'Patterned', href: '/category/curtains/patterned' },
          { label: 'Plain', href: '/category/curtains/plain' },
          { label: 'Luxury', href: '/category/curtains/luxury' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'Small', href: '/category/curtains/small' },
          { label: 'Medium', href: '/category/curtains/medium' },
          { label: 'Large', href: '/category/curtains/large' },
          { label: 'Extra Large', href: '/category/curtains/extra-large' },
        ],
      },
      {
        title: 'TRENDING COLOURS',
        items: [
          { label: 'Black', color: '#222' },
          { label: 'Grey', color: '#888' },
          { label: 'White', color: '#fff' },
          { label: 'Cream', color: '#f5f5dc' },
          { label: 'Blue', color: '#2196f3' },
          { label: 'Green', color: '#4caf50' },
          { label: 'Pink', color: '#f7d6e0' },
          { label: 'Purple', color: '#9c27b0' },
        ],
      },
      {
        items: [
          { img: '/curtains-main.jpg', label: 'New collection', labelColor: 'red', description: 'Shop Now', href: '/shop/curtains-collection' },
          { img: '/curtains-sale.jpg', label: 'Sale upto 70% off', labelColor: 'red', description: 'Shop Now', href: '/shop-curtains' },
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
          { label: 'Men\'s Collection', href: '/category/clothing/men' },
          { label: 'Women\'s Collection', href: '/category/clothing/women' },
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
          { label: 'Clearance', href: '/category/clearance', labelColor: 'red' },
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