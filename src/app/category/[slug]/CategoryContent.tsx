'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

interface Category {
  name: string;
  img: string;
  sub: {
    name: string;
    links: string[];
  }[];
}

interface CategoryContentProps {
  category: Category;
  slug: string;
}

export default function CategoryContent({ category, slug }: CategoryContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/category" className={styles.backButton}>
          ← Back
        </Link>
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
                  href={`/category/${slug}/${link.toLowerCase().replace(/\s+/g, '-')}`}
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