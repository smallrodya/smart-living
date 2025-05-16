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
  const [selectedSize, setSelectedSize] = useState('double');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = {
    title: 'Diamante 5pc Bed in a Bag – Chocolate',
    price: '£17.99 – £19.99',
    oldPrice: '',
    discount: '-56%',
    images: [
      '/best3.jpg',
    ],
    currentImageIndex,
    onImageChange: setCurrentImageIndex,
    description: {
      main: '5pcs Bed in a Bag Duvet/Quilt Cover Set\n\nThe BIB contains Striking duvet covers and bed runner set, with matching cushion covers and pillow case\n\nAll pieces of set conveniently complement each other to produce a complete and stylish bedding design\n\nA delightful range of fresh vibrant prints. Easy care bed linen.\n\nBrand new Printed duvet cover set in Double, King and Super King size',
      features: [
        '5pcs Bed in a Bag Duvet/Quilt Cover Set',
        'Striking duvet covers and bed runner set',
        'Matching cushion covers and pillow case',
        'Complete and stylish bedding design',
        'Easy care bed linen'
      ]
    },
    additional: {
      material: '100% Polyester',
      dimensions: {
        single: `1 x Single Duvet Cover (135 x 200cm)\n1 x Pillow Case (50 x 75cm)\n1 x Cushion Cover (45 x 45cm)\n1 x Bed Runner (45 x 210cm)`,
        double: `1 x Double Duvet Cover (200 x 200cm)\n2 x Pillow Cases (50 x 75cm)\n1 x Cushion Cover (45 x 45cm)\n1 x Bed Runner (45 x 210cm)`,
        king: `1 x King Duvet Cover (220 x 220cm)\n2 x Pillow Cases (50 x 75cm)\n1 x Cushion Cover (45 x 45cm)\n1 x Bed Runner (45 x 210cm)`,
        superKing: `1 x Super King Duvet Cover (220 x 260cm)\n2 x Pillow Cases (50 x 75cm)\n1 x Cushion Cover (45 x 45cm)\n1 x Bed Runner (45 x 210cm)`
      },
      washing: 'Machine washable at 30°C, Can be tumble dried, Wash with similar colour',
      note: 'Please note that all sizes are approximate.',
      colors: 'Chocolate'
    },
    sizes: [
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