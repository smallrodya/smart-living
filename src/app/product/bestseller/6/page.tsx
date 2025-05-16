'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductPageBestSeller from '@/components/ProductPageBestSeller';
import MobileBottomMenu from '@/components/MobileBottomMenu';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [selectedSize, setSelectedSize] = useState('single');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = {
    title: 'Reversible Polycotton Fern Rouched Duvet Cover',
    price: '£10.37 – £12.97',
    oldPrice: '',
    discount: '-81%',
    images: [
      '/best6.jpg',
      '/best6-hover.jpg',
      '/best6-hover2.jpg',
      '/best6-hover3.jpg',
      '/best6-hover4.jpg',
      '/best6-hover5.jpg',
    ],
    currentImageIndex,
    onImageChange: setCurrentImageIndex,
    description: {
      main: 'Fern Leaves Rouched Pleats Green White Reversible Duvet Cover Quilt Bedding Set with Pillowcase Soft Easy Care Bed Linen.\n\nUltimate Comfort, Unique Style and Radiating Charm create an unforgettable sleeping experience!\n\nCrafted from beautiful polyester and cotton material which is incredibly warm and cosy.',
      features: [
        'Fern Leaves Rouched Pleats Green White Reversible Duvet Cover',
        'Ultimate Comfort and Unique Style',
        'Incredibly warm and cosy material',
        'Reversible design',
        'Easy care bed linen'
      ]
    },
    additional: {
      material: '52% Polyester / 48% Cotton (Recycled Polyester / BCI Cotton)',
      dimensions: {
        single: `1 x Duvet Cover (135cm x 200cm)\n1 x Pillow Case (50cm x 75cm)`,
        double: `1 x Duvet Cover (200cm x 200cm)\n2 x Pillow Cases (50cm x 75cm)`,
        king: `1 x Duvet Cover (220cm x 230cm)\n2 x Pillow Cases (50cm x 75cm)`,
        superKing: `1 x Duvet Cover (220cm x 260cm)\n2 x Pillow Cases (50cm x 75cm)`
      },
      washing: 'Machine washable at 40°C, Iron and tumble dry at low heat.',
      note: 'Made to fit standard UK bed sizes. With this great set, you will enjoy snuggling under a super comfortable reversible duvet cover to enjoy a rich night of rest and deep relaxation.',
      colors: 'Green White'
    },
    sizes: [
      { id: 'single', label: 'Single (135cm X 200cm)' },
      { id: 'double', label: 'Double (200cm X 200cm)' },
      { id: 'king', label: 'King (220cm X 235cm)' },
      { id: 'superKing', label: 'Super King (220cm X 260cm)' }
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