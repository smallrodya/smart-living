'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductPageBestSeller from '@/components/ProductPageBestSeller';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [selectedSize, setSelectedSize] = useState('single');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = {
    title: '3D Duvet Cover and Pillowcase Set – Black Panther',
    price: '£14.99 - £17.72',
    oldPrice: '',
    discount: '-71%',
    images: [
      '/best1.jpg',
    ],
    currentImageIndex,
    onImageChange: setCurrentImageIndex,
    description: {
      main: 'New 3D Design Duvet Cover Set with Pillowcases\n\nAffordable and Stylish 3D-Bedding Sets.\nHigh Quality Fabric and made under certified regulations.\nLatest Designs.\nCharming Stylish Colour Ways & Patterns.\nDesigner Duvet Cover & Pillowcase set styled to light up any bedroom\nMagnificent appearance and new trendy look to make your bedroom more attractive and eye catching.',
      features: [
        'New 3D Design Duvet Cover Set with Pillowcases',
        'High Quality Fabric and made under certified regulations.',
        'Designer Duvet Cover & Pillowcase set styled to light up any bedroom',
        'Magnificent appearance and new trendy look to make your bedroom more attractive and eye catching.'
      ]
    },
    additional: {
      material: '50% cotton 50% polyester',
      dimensions: {
        single: `1 x Duvet Set Size: 135 x 200cm Approx.\n1 x Pillow Case Size: 50 x 75cm Approx.`,
        double: `1 x Duvet Set Size: 200 x 200cm Approx.\n2 x Pillow Cases Size: 50 x 75cm Approx.`,
        king: `1 x Duvet Set Size: 220 x 235cm Approx.\n2 x Pillow Cases Size: 50 x 75cm Approx.`,
        superKing: `1 x Duvet Set Size: 220 x 260cm Approx.\n2 x Pillow Cases Size: 50 x 75cm Approx.`
      },
      washing: 'Machine washable at 40°C, can be tumble dry.',
      note: 'Please Note: All photos are for illustration purposes only',
      colors: 'Black'
    },
    sizes: [
      { id: 'single', label: 'Single (135cm X 200cm)' },
      { id: 'double', label: 'Double (200cm X 200cm)' },
      { id: 'king', label: 'King (230cm X 220cm)' }
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