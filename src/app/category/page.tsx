'use client';
import React from 'react';
import MobileCategoriesMenu from '@/components/MobileCategoriesMenu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './category.module.css';

export default function CategoryPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <MobileCategoriesMenu />
      <Footer />
    </div>
  );
} 