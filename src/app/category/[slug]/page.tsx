'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// Импортируем те же категории, что и на главной странице категорий
const categories = [
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
  // ... остальные категории
];

export default function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const categoryName = params.slug.split('-').map(word => word.toUpperCase()).join(' ');
  const category = categories.find(cat => cat.name === categoryName);

  if (!category) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => router.back()} className={styles.backButton}>
            ← Back
          </button>
          <h1>Category not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back
        </button>
        <h1>{category.name}</h1>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={category.img}
          alt={category.name}
          width={400}
          height={200}
          className={styles.categoryImage}
        />
      </div>

      <div className={styles.subcategories}>
        {category.sub.map((sub) => (
          <div key={sub.name} className={styles.subcategoryCard}>
            <h2 className={styles.subcategoryTitle}>{sub.name}</h2>
            <div className={styles.links}>
              {sub.links.map((link) => (
                <Link
                  key={link}
                  href={`/category/${params.slug}/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className={styles.link}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 