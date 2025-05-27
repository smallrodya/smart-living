import ProductPage from '@/components/ProductPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function Page() {
  const product = {
    title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green',
    price: '£34.99',
    oldPrice: '£99.99',
    discount: '-65%',
    images: [
      '/reduce1.jpg',
      '/reduce1-hover.jpg',
      '/reduce1-detail1.jpg',
      '/reduce1-detail2.jpg'
    ],
    description: {
      main: 'Experience ultimate comfort with our 2-in-1 Reclining Gravity Chair. This versatile chair transforms from a comfortable recliner to a fully flat sun lounger, perfect for both indoor and outdoor use.',
      features: [
        '2-in-1 design: Reclining chair and sun lounger in one',
        'Durable steel frame construction',
        'Comfortable reclining function',
        'Easy to fold and store',
        'Perfect for indoor and outdoor use'
      ]
    },
    additional: {
      material: 'Durable waterproof textline Fabric',
      dimensions: {
        open: '120 x 65 x 45 cm',
        folded: '120 x 65 x 15 cm'
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
} 