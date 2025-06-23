'use client';
import React from 'react';
import ProductPage from '@/components/ProductPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const Page = () => {
  const product = {
    title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Grey',
    price: '£32.99',
    oldPrice: '£99.99',
    discount: '-65%',
    images: [
      '/reduce2.jpg',
      '/reduce2-hover.jpg',
      '/reduce2-detail1.jpg',
    ],
    description: {
      main: 'Experience ultimate comfort with our 2-in-1 Reclining Gravity Chair and Lay Flat Sun Lounger in elegant grey. This versatile piece of outdoor furniture combines the best of both worlds - a comfortable reclining chair and a flat sun lounger.',
      features: [
        'Adjustable reclining positions',
        'Durable steel frame construction',
        'Comfortable padded fabric',
        'Easy to clean and maintain',
        'Perfect for outdoor relaxation'
      ]
    },
    additional: {
      material: 'Steel frame with polyester fabric',
      dimensions: {
        open: '200 x 65 x 45 cm',
        folded: '100 x 65 x 15 cm'
      }
    }
  };

  return (
    <>
      <Header />
      <ProductPage product={product} />
      <Footer />
    </>
  );
};

export default Page; 