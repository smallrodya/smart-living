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
    title: 'Reversible Polycotton Elephant Mandala Duvet Cover',
    price: '£10.37 - £12.97',
    oldPrice: '',
    discount: '-71%',
    images: [
      '/best2.jpg',
      '/best2-hover.jpg',
      '/best2-hover2.jpg',
      '/best2-hover3.jpg',
      '/best2-hover4.jpg',
      '/best2-hover5.jpg',
      '/best2-hover6.jpg',
      '/best2-hover7.jpg'
    ],
    currentImageIndex,
    onImageChange: setCurrentImageIndex,
    description: {
      main: 'Elephant Mandala Bedding Reversible Quilt Duvet Cover Set Easy Care Anti-Allergic Soft & Smooth with Pillow Cases.\n\nThis British designed duvet set is made from an easy care hotel quality material which is soft to the touch.\n\nThis on trend duvet set includes a reversible duvet cover and matching pillowcase(s), and is made from a high quality polycotton blend.\n\nThe duvet cover set is machine washable at 40℃, can be tumble dried and requires minimal ironing.',
      features: [
        'Elephant Mandala Bedding Reversible Quilt Duvet Cover Set',
        'Easy Care Anti-Allergic Soft & Smooth with Pillow Cases',
        'British designed duvet set with hotel quality material',
        'High quality polycotton blend',
        'Machine washable at 40℃, can be tumble dried'
      ]
    },
    additional: {
      material: '48% Cotton, 52% Polyester',
      dimensions: {
        single: `1 x Duvet Cover (135cm x 200cm)\n1 x Pillowcase (50cm x 75cm)`,
        double: `1 x Duvet Cover (200cm x 200cm)\n2 x Pillowcases (50cm x 75cm)`,
        king: `1 x Duvet Cover (230cm x 220cm)\n2 x Pillowcases (50cm x 75cm)`,
        superKing: `1 x Duvet Cover (260cm x 220cm)\n2 x Pillowcases (50cm x 75cm)`
      },
      washing: 'Machine washable at 40°C. Iron and tumble dry at low heat.',
      note: 'MADE IN GREEN by OEKO-TEX Ethically produced under International Regulations – Our products are manufactured in socially compliance production facilities.',
      colors: 'Teal, Purple, Pink/Blue'
    },
    sizes: [
      { id: 'single', label: 'Single (135cm X 200cm)' },
      { id: 'double', label: 'Double (200cm X 200cm)' },
      { id: 'king', label: 'King (230cm X 220cm)' },
      { id: 'superKing', label: 'Super King (260cm X 220cm)' }
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