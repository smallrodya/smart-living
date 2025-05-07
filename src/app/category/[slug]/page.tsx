import React from 'react';
import styles from './page.module.css';
import CategoryContent from './CategoryContent';
import { PageProps } from '@/types/next';

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

export default function CategoryDetailPage({ params }: PageProps) {
  const categoryName = params.slug?.toString().split('-').map(word => word.toUpperCase()).join(' ');
  const category = categories.find(cat => cat.name === categoryName);

  if (!category) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Category not found</h1>
        </div>
      </div>
    );
  }

  return <CategoryContent category={category} slug={params.slug?.toString() || ''} />;
} 