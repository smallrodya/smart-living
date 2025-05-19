'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './CategoriesSection.module.css';

interface SubCategory {
  name: string;
  links: { label: string; href: string }[];
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
          { label: 'Shop Duvet Set by Colour', href: '/categories/bedding/duvet-colour' },
          { label: 'Shop Duvet Set under £10', href: '/categories/bedding/under-10' },
          { label: 'Clearance', href: '/categories/bedding/clearance' },
          { label: 'Shop All', href: '/categories/bedding' },
          { label: 'Duvet Covers from £9.99', href: '/category/duvet-covers' },
        ],
      },
      {
        name: 'BED SHEETS',
        links: [
          { label: 'Shop by Sheet Type', href: '/categories/bedding/sheet-type' },
          { label: 'Shop by Sheet Colour', href: '/categories/bedding/sheet-colour' },
          { label: 'Shop from £4.49', href: '/categories/bedding/from-4.49' },
          { label: 'Shop All', href: '/categories/bedding' },
        ],
      },
      {
        name: 'KIDS COLLECTION',
        links: [
          { label: 'Kids collection by type', href: '/categories/bedding/kids-collection' },
          { label: 'Shop by Colour', href: '/categories/bedding/kids-colour' },
          { label: 'Shop by Material', href: '/categories/bedding/kids-material' },
          { label: 'Shop All', href: '/categories/bedding' },
        ],
      },
      {
        name: 'BED LINEN',
        links: [
          { label: 'Bed Linen from £4.49', href: '/category/bed-linen' },
        ],
      },
      {
        name: 'TEDDY SETS',
        links: [
          { label: 'Teddy Sets from £11.99', href: '/category/teddy-sets' },
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
          { label: 'Shop Mats by Colour', href: '/categories/rugs-mats/mats-colour' },
          { label: 'Shop Mats by Design', href: '/categories/rugs-mats/mats-design' },
          { label: 'Shop Mats from £5.49', href: '/categories/rugs-mats/mats-from-5.49' },
          { label: 'Shop All', href: '/categories/rugs-mats' },
        ],
      },
      {
        name: 'RUGS',
        links: [
          { label: 'Shop Rugs by Type', href: '/category/rugs/rugtype' },
          { label: 'Shop Rugs by Colour', href: '/categories/rugs-mats/rugs-colour' },
          { label: 'Shop Rugs from £10.99', href: '/categories/rugs-mats/rugs-from-10.99' },
          { label: 'Shop All', href: '/categories/rugs-mats' },
          { label: 'Carved Rugs from £12.99', href: '/category/rugs/rugtype/carved-rugs' },
          { label: 'Shaggy Rugs from £11.98', href: '/category/rugs/rugtype/shaggy-rugs' },
          { label: 'Non Slip Mats from £5.49', href: '/category/rugs/rugtype/non-slip-mats' },
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
          { label: 'Shop Towels by Design', href: '/categories/throws-towels/towels-design' },
          { label: 'Shop Towel by Colour', href: '/categories/throws-towels/towel-colour' },
          { label: 'Shop All', href: '/categories/throws-towels' },
          { label: 'Towel Bales From £8.99', href: '/category/towels' },
        ],
      },
      {
        name: 'THROWS',
        links: [
          { label: 'Shop Throw by Type', href: '/categories/throws-towels/throw-type' },
          { label: 'Shop Throw by Colour', href: '/categories/throws-towels/throw-colour' },
          { label: 'Shop All', href: '/categories/throws-towels' },
          { label: 'Throws from £11.99', href: '/category/throws' },
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
          { label: 'Shop all', href: '/categories/outdoor/chairs' },
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
          { label: 'Shop by Curtain Type', href: '/categories/curtains/curtain-type' },
          { label: 'Shop by Curtain Colour', href: '/categories/curtains/curtain-colour' },
          { label: 'Shop All', href: '/categories/curtains' },
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
          { label: 'Hoodie', href: '/categories/clothing/men/hoodie' },
          { label: 'Sweatshirt', href: '/categories/clothing/men/sweatshirt' },
        ],
      },
      {
        name: 'WOMEN',
        links: [
          { label: 'Denim', href: '/categories/clothing/women/denim' },
          { label: 'Jersey', href: '/categories/clothing/women/jersey' },
          { label: 'Jogger', href: '/categories/clothing/women/jogger' },
          { label: 'Lounge & Nightwear', href: '/categories/clothing/women/lounge-nightwear' },
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
          { label: 'Shop All', href: '/categories/footwear/booties' },
        ],
      },
      {
        name: 'SLIPPERS',
        links: [
          { label: 'Shop All', href: '/categories/footwear/slippers' },
        ],
      },
      {
        name: 'SOCKS',
        links: [
          { label: 'Shop all', href: '/categories/footwear/socks' },
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
    }, 180); // задержка закрытия
  };

  return (
    <nav className={styles.menuBar} aria-label="Main categories">
      <ul className={styles.menuList} role="menubar">
        {categories.map((cat, idx) => (
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
            <span className={styles.menuTitle}>{cat.name}</span>
            {hoveredIdx === idx && dropdownOpen && (
              <div className={styles.dropdown} role="menu">
                {/* <div className={styles.dropdownImageWrap}>
                  <Image src={cat.img} alt={cat.name} width={180} height={80} className={styles.dropdownImage} />
                </div> */}
                <div className={styles.dropdownContent}>
                  {cat.sub.map((sub) => (
                    <div key={sub.name} className={styles.dropdownCol}>
                      <div className={styles.dropdownColTitle}>{sub.name}</div>
                      <ul className={styles.dropdownLinks}>
                      {sub.links.map((link) => (
                          <li key={link.label} className={styles.dropdownLink}>
                            <a href={link.href} tabIndex={0}>{link.label}</a>
                          </li>
                        ))}
                      </ul>
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