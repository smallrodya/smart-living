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
    title: 'Hug N Snug Duvet Cover and Pillowcase Set – Charcoal',
    price: '£26.49 – £33.99',
    oldPrice: '',
    discount: '-51%',
    images: [
      '/best5.jpg',
      '/best5-hover.jpg',
      '/best5-hover3.jpg',
    ],
    currentImageIndex,
    onImageChange: setCurrentImageIndex,
    description: {
      main: 'Furry Shaggy Hug and Snug Duvet and Pillow Cover Bedding\n\nFluffy Lightweight Comfortable soft and cosy fleece to snuggle up with and keep you warm during the colder nights\n\nCome in a range of gorgeous colours to suit your interior\n\nAdd extra texture to your decor and turns your room into an inviting space\n\nThe finest materials for a sumptuously plush feel',
      features: [
        'Furry Shaggy Hug and Snug Duvet and Pillow Cover Bedding',
        'Fluffy Lightweight Comfortable soft and cosy fleece',
        'Keeps you warm during the colder nights',
        'Adds extra texture to your decor',
        'Sumptuously plush feel'
      ]
    },
    additional: {
      material: '100% Soft Fleece Polyester',
      dimensions: {
        single: `1 x Duvet Set Size: 135 x 200cm Approx.\n1 x Pillow Cases Size: 50 x 75cm Approx.`,
        double: `1 x Duvet Set Size: 200 x 200cm Approx.\n2 x Pillow Cases Size: 50 x 75cm Approx.`,
        king: `1 x Duvet Set Size: 230 x 220cm Approx.\n2 x Pillow Cases Size: 50 x 75cm Approx.`,
        superKing: `1 x Duvet Set Size: 230 x 220cm Approx.\n2 x Pillow Cases Size: 50 x 75cm Approx.`
      },
      washing: 'Machine wash 40°C, Can be tumble dry. Wash Separately.',
      note: 'Please Note: All photos are for illustration purposes only',
      colors: 'Charcoal'
    },
    sizes: [
      { id: 'single', label: 'Single (135cm X 200cm)' },
      { id: 'double', label: 'Double (200cm X 200cm)' },
      { id: 'king', label: 'King (220cm X 235cm)' }
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