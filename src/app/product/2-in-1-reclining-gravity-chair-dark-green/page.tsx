'use client';
import React from 'react';
import ProductPage from '@/components/ProductPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const Page = () => {
  const product = {
    title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green',
    price: '£32.99',
    oldPrice: '£99.99',
    discount: '-65%',
    images: [
      '/reduce1.jpg',
      '/reduce1-hover.jpg',
    ],
    description: {
      main: 'Experience ultimate comfort with our 2-in-1 Reclining Gravity Chair and Lay Flat Sun Lounger in elegant dark green. This versatile piece of outdoor furniture combines the best of both worlds - a comfortable reclining chair and a flat sun lounger.',
      features: [
        'Foldable for easy transportation',
        'Durable steel frame with comfortable plastic arms',
        'Reclines through many positions',
        'Three Level Adjustment',
        'Features an open weave elastic lacing for breathability',
        'Padded, adjustable and removable headrest',
        'It is ideal for those lazy days of summer',
        'The durable design makes the chair great for poolside lounging, patios, backyards and more.',
        'Suitable for all year round'
      ]
    },
    additional: {
      material: 'Waterproof textline Fabric',
      dimensions: {
        open: '178cm ( L ) x 60cm ( W ) x 78cm ( H )',
        folded: '97cm x 61cm x 12cm for easy storage'
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