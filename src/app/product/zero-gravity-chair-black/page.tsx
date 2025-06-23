'use client';
import React from 'react';
import ProductPage from '@/components/ProductPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const Page = () => {
  const product = {
    title: 'Zero Gravity Chair with Cushion & Pillow – Black',
    price: '£56.99',
    oldPrice: '£119.99',
    discount: '-49%',
    images: [
      '/reduce3.jpg',
      '/reduce3-hover.jpg',
      '/reduce3-detail1.jpg',
      '/reduce3-detail2.jpg',
    ],
    description: {
      main: 'Zero Gravity Foldable Reclining Chair / Sun Lounger with Cushion & Pillow',
      features: [
        'Foldable for easy transportation',
        'Durable steel frame with comfortable plastic arms',
        'Reclines through many positions',
        'Includes adjustable headrest and padded cushion',
        'Features an open weave elastic lacing for breathability',
        'Reclining function : 90-166 Degree',
        'It is ideal for those lazy days of summer',
        'The durable design makes the chair great for poolside lounging, patios, backyards and more.',
        'Suitable for all year round'
      ]
    },
    additional: {
      material: 'Durable waterproof textline Fabric',
      dimensions: {
        open: '180cm ( L ) x 40cm ( W ) x 65cm ( H )',
        folded: '95cm x 68cm x 15cm for easy storage'
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