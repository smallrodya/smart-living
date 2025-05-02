'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './CategoriesSection.module.css';
import MobileCategoriesSection from './MobileCategoriesSection';

interface SubCategory {
  name: string;
  links: string[];
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

const DesktopCategoriesSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenIdx(null);
      }
    }
    if (openIdx !== null) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openIdx]);

  const currentCat = openIdx !== null ? categories[openIdx] : null;

  const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.categoriesList}>
          {categories.map((cat, index) => (
            <button
              key={cat.name}
              className={`${styles.categoryButton} ${openIdx === index ? styles.active : ''}`}
              onClick={(e) => handleCategoryClick(e, index)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {openIdx !== null && currentCat && (
        <div className={styles.modalOverlay}>
          <div ref={modalRef} className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setOpenIdx(null)}
              aria-label="Close"
            >
              ×
            </button>

            <Image
              src={currentCat.img}
              alt={currentCat.name}
              width={800}
              height={200}
              className={styles.categoryImage}
            />

            <div className={styles.subcategoriesGrid}>
              {currentCat.sub.map((sub) => (
                <div key={sub.name} className={styles.subcategoryCard}>
                  <h3 className={styles.subcategoryTitle}>{sub.name}</h3>
                  <div className={styles.subcategoryLinks}>
                    {sub.links.map((link) => (
                      <div key={link} className={styles.subcategoryLink}>
                        {link}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.navigation}>
              <button
                onClick={() => setOpenIdx(openIdx > 0 ? openIdx - 1 : 0)}
                disabled={openIdx === 0}
                className={styles.navButton}
                aria-label="Previous category"
              >
                ←
              </button>
              <button
                onClick={() => setOpenIdx(openIdx < categories.length - 1 ? openIdx + 1 : openIdx)}
                disabled={openIdx === categories.length - 1}
                className={styles.navButton}
                aria-label="Next category"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const CategoriesSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileCategoriesSection /> : <DesktopCategoriesSection />;
};

export default CategoriesSection; 