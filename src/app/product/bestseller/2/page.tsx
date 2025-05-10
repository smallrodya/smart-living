'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductPageBestSeller from '@/components/ProductPageBestSeller';

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('single');

  const product = {
    title: 'Product Title',
    price: '£14.99',
    oldPrice: '£29.99',
    discount: '-50%',
    images: ['/product1.jpg', '/product1-hover.jpg'],
    description: {
      main: 'Product description',
      features: ['Feature 1', 'Feature 2']
    },
    additional: {
      material: '100% Cotton',
      dimensions: {
        single: '135cm x 200cm',
        double: '200cm x 200cm',
        king: '220cm x 235cm',
        superKing: '220cm x 260cm'
      },
      washing: 'Machine washable',
      note: 'Care instructions',
      colors: 'Available in multiple colors'
    },
    sizes: [
      { id: 'single', label: 'Single' },
      { id: 'double', label: 'Double' },
      { id: 'king', label: 'King' }
    ],
    selectedSize,
    onSizeChange: setSelectedSize
  };

  return (
    <>
      <Header />
      <ProductPageBestSeller product={product} />
      <Footer />
    </>
  );
} 