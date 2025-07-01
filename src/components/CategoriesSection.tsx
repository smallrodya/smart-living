'use client';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoriesSection.module.css';
import ReactDOM from 'react-dom';

interface MenuColumn {
  title?: string;
  items: Array<{ label: string; href?: string; color?: string; img?: string; description?: string; labelColor?: string; style?: React.CSSProperties }>;
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
          { label: 'Cushions', href: '/shop/cushions' },
          { label: 'Fleece Bedding', href: '/shop/fleece-bedding' },
          { label: 'Weighted Blankets', href: '/shop/weighted-blankets' },
          { label: 'Kids Bedding', href: '/shop/kids-bedding' },
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
          { label: 'Housewife Pillowcase', href: '/shop/housewife-pillowcase' },
          { label: 'Oxford Pillowcase', href: '/shop/oxford-pillowcase' },
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
          { img: '/cresf9cbntbcf1lw4pz5.jpg', label: 'New in summer collection', labelColor: 'red' },
          { img: '/jfnaaklhqkb63ewq62wc.jpg', label: 'Summer sale upto 70% off', labelColor: 'red' },
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
          { label: 'Shaggy Rugs', href: '/shop/shaggy-rugs' },
          { label: 'Carved Rugs', href: '/shop/carved-rugs' },
          { label: 'Reversible Rugs', href: '/shop/reversible-rugs' },
          { label: 'Hallway Runner', href: '/shop/hallway-runner' },
          { label: 'Table Runner', href: '/shop/table-runner' },
        ],
      },
      {
        title: 'MAT TYPES',
        items: [
          { label: 'Door Mat', href: '/shop/door-mat' },
          { label: 'Kitchen Mat', href: '/shop/kitchen-mat' },
          { label: 'Hallway Runner', href: '/shop/hallway-runner' },
          { label: 'Table Placemat', href: '/shop/table-placemat' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'Small', href: '/shop/rugs-mats/small' },
          { label: 'Medium', href: '/shop/rugs-mats/medium' },
          { label: 'Large', href: '/shop/rugs-mats/Large' },
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
          { img: '/soft-shaggy-rugs.jpg', label: 'Explore our range of stylish rugs for every room!', labelColor: 'red' },
          { img: '/xlarge-rugs-mats.jpg', label: 'Find the perfect mat for your hallway or bathroom.', labelColor: 'red' },
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
          { label: 'Tea Towels', href: '/shop/tea-towels' },
          { label: '8Pc Towel Bale Set', href: '/shop/8pc-towel-bale-set' },
          { label: '10Pc Towel Bale Set', href: '/shop/10pc-towel-bale-set' },
          { label: 'Weighted Blankets', href: '/shop/weighted-blankets-throws-towels' },
          { label: 'Throws', href: '/shop/all-throws' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Fleece', href: '/shop/fleece-throws-towels' },
          { label: 'Plain', href: '/shop/plain-throws-towels' },
          { label: '3D', href: '/shop/3d-throws-towels' },
          { label: 'Chunky Hand Knitted', href: '/shop/chunky-hand-knitted-throws-towels' },
          { label: 'Large', href: '/shop/large-throws-towels' },
          { label: 'XLarge', href: '/shop/xlarge-throws-towels' },
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
          { img: '/all-throws.jpg', label: 'Throws for every room', labelColor: 'red' },
          { img: '/10pc-towel-bale-set.jpg', label: 'Great towels to keep you cosy', labelColor: 'red' },
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
          { label: 'Shop all', href: '/shop/outdoorshop-all' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Chairs', href: '/shop/outdoors-chairs' },
          { label: 'Cushions', href: '/shop/outdoors-cushions' },
        ],
      },
      {   
        items: [
          { img: '/outdoor-banner1.jpg', label: 'Perfect for your outdoor space', labelColor: 'red' },
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
          { label: "Men's", href: '/shop/clothing-men' },
          { label: "Women's", href: '/shop/clothing-women' },
          { label: "Kid's", href: '/shop/clothing-kids' },
        ],
      },
      {
        title: 'STYLE',
        items: [
          { label: 'Jeans', href: '/shop/clothing-jeans' },
          { label: 'Joggers', href: '/shop/clothing-joggers' },
          { label: 'Hoodies', href: '/shop/clothing-hoodies' },
          { label: 'Polo Shirts', href: '/shop/clothing-polo-shirts' },
          { label: 'Loungewear', href: '/shop/clothing-loungewear' },
          { label: 'Bathrobes', href: '/shop/clothing-bathrobes' },
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
          { img: '/mens-clothing.jpg', label: 'Explore our range of men\'s clothing', labelColor: 'red' },
          { img: '/womens-clothing.jpg', label: 'Favourite clothing for women', labelColor: 'red' },
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
          { label: 'Booties', href: '/shop/footwear-booties' },
          { label: 'Slippers', href: '/shop/footwear-slippers' },
          { label: 'Socks', href: '/shop/footwear-socks' },
        ],
      },
      {
        title: 'SIZE',
        items: [
          { label: 'UK 3-4', href: '/shop/footwear-uk-3-4' },
          { label: 'UK 5-6', href: '/shop/footwear-uk-5-6' },
          { label: 'UK 7-8', href: '/shop/footwear-uk-7-8' },
          { label: 'UK 9-10', href: '/shop/footwear-uk-9-10' },
          { label: 'UK 11-12', href: '/shop/footwear-uk-11-12' },
          { label: 'Small', href: '/shop/footwear-small' },
          { label: 'Medium', href: '/shop/footwear-medium' },
          { label: 'Large', href: '/shop/footwear-large' },
        ],
      },
      {
        items: [
          { img: '/slippers-footwear1.jpg', label: 'Find your perfect footwear', labelColor: 'red' },
        ],
      },
    ],
  },
  {
    name: 'CLEARANCE',
    columns: [
      {
        items: [
          { 
            label: 'Clearance', 
            href: '/shop/clearance', 
            labelColor: 'red',
            style: {
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'red'
            }
          },
        ],
      },
    ],
  },
];

const CategoriesSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState<number>(138); // default fallback
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const menuRefs = useRef<(HTMLLIElement | null)[]>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState(true);

  const updateDropdownTop = () => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setDropdownTop(rect.bottom);
    }
  };

  useLayoutEffect(() => {
    if (dropdownOpen) {
      updateDropdownTop();
      window.addEventListener('scroll', updateDropdownTop, true);
      window.addEventListener('resize', updateDropdownTop);
      return () => {
        window.removeEventListener('scroll', updateDropdownTop, true);
        window.removeEventListener('resize', updateDropdownTop);
      };
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const checkWidth = () => {
      setShow(window.innerWidth > 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

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

  if (!show) return null;

  return (
    <nav className={styles.menuBar} aria-label="Main categories" ref={navRef}>
      <ul className={styles.menuList} role="menubar">
        {megaMenus.map((cat, idx) => (
          <li
            key={cat.name}
            ref={el => menuRefs.current[idx] = el}
            className={styles.menuItem + (hoveredIdx === idx && dropdownOpen ? ' ' + styles.active : '')}
            onMouseEnter={() => cat.name !== 'CLEARANCE' && handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            aria-haspopup={cat.name !== 'CLEARANCE'}
            aria-expanded={hoveredIdx === idx && dropdownOpen}
            role="menuitem"
          >
            {cat.name === 'CLEARANCE' ? (
              <Link href="/shop/clearance" className={styles.menuTitle} style={{ color: 'red' }}>
                {cat.name}
              </Link>
            ) : (
              <span className={styles.menuTitle}>
                {cat.name}
              </span>
            )}
            {hoveredIdx === idx && dropdownOpen && cat.name !== 'CLEARANCE' && (
              typeof window !== 'undefined' && document.body ?
                ReactDOM.createPortal(
                  <div
                    className={styles.dropdown}
                    role="menu"
                    style={{
                      top: dropdownTop,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      position: 'fixed',
                      zIndex: 10
                    }}
                  >
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
                                    <Link href={item.href || '#'} tabIndex={0} style={item.style}>{item.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>,
                  document.body
                ) : null
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesSection; 