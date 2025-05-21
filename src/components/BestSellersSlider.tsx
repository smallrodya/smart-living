'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileBestSellersSlider from './MobileBestSellersSlider';
import MobileBottomMenu from './MobileBottomMenu';
import { useRouter } from 'next/navigation';

interface WishlistItem {
  id: string;
  src: string;
  hoverSrc: string;
  title: string;
  price: string;
  discount: string;
  sizes?: {
    single: boolean;
    double: boolean;
    king: boolean;
  };
}

const products = [
  { 
    id: 1, 
    name: '3D Duvet Cover and Pillowcase Set – Black Panther', 
    price: '£14.99 - £17.72', 
    image: '/best1.jpg', 
    hoverImage: '/best1.jpg', 
    discount: '-71%',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 2, 
    name: 'Reversible Polycotton Elephant Mandala Duvet Cover', 
    price: '£10.37 - £12.97', 
    image: '/best2.jpg', 
    hoverImage: '/best2-hover.jpg', 
    discount: '-71%',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 3, 
    name: 'Diamante 5pc Bed in a Bag – Chocolate', 
    price: '£17.99 – £19.99', 
    image: '/best3.jpg', 
    hoverImage: '/best3.jpg', 
    discount: '-56%',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 4, 
    name: 'Hug N Snug Duvet Cover and Pillowcase Set – Blush Pink', 
    price: '£26.49 – £33.99', 
    image: '/best4.jpg', 
    hoverImage: '/best4.jpg', 
    discount: '-51%',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 5, 
    name: 'Hug N Snug Duvet Cover and Pillowcase Set – Charcoal', 
    price: '£26.49 – £33.99', 
    image: '/best5.jpg', 
    hoverImage: '/best5-hover.jpg', 
    discount: '-51%',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 6, 
    name: 'Reversible Polycotton Fern Rouched Duvet Cover', 
    price: '£10.37 – £12.97', 
    image: '/best6.jpg', 
    hoverImage: '/best6-hover.jpg', 
    discount: '-81%',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
];

const DesktopBestSellersSlider = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist) as WishlistItem[];
      setWishlist(items.map(item => item.id));
    }
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const prefixedId = `best_${id}`;
      const newWishlist = prev.includes(prefixedId) 
        ? prev.filter(i => i !== prefixedId)
        : [...prev, prefixedId];
      
      // Получаем существующие товары из localStorage
      const existingItems = JSON.parse(localStorage.getItem('wishlist') || '[]') as WishlistItem[];
      
      // Фильтруем существующие товары, удаляя текущий товар если он есть
      const filteredItems = existingItems.filter(item => !item.id.startsWith('best_'));
      
      // Добавляем новые товары из текущей секции
      const newItems = products
        .filter((_, index) => newWishlist.includes(`best_${index + 1}`))
        .map((item) => ({
          id: `best_${item.id}`,
          src: item.image,
          hoverSrc: item.hoverImage,
          title: item.name,
          price: item.price,
          discount: item.discount,
          sizes: item.sizes
        }));
      
      // Объединяем существующие и новые товары
      const wishlistItems = [...filteredItems, ...newItems];
      
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      return newWishlist;
    });
  };

  const handleProductClick = (id: number) => {
    router.push(`/product/bestseller/${id}`);
  };

  return (
    <section style={{
      width: '100%',
      padding: '60px 0',
      backgroundColor: '#f8f8f8',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px',
      }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 12,
          textAlign: 'center',
          letterSpacing: 0.5,
          color: '#222',
        }}>BESTSELLERS</h2>
        <p style={{
          fontSize: 17,
          color: '#666',
          marginBottom: 40,
          textAlign: 'center',
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.5,
        }}>
          Discover our most popular bedding sets, chosen by thousands of happy customers. Quality, comfort, and style in every piece.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 30,
          padding: '0 10px',
        }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: hoveredCard === product.id ? '0 12px 32px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === product.id ? 'translateY(-8px)' : 'none',
                position: 'relative',
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                overflow: 'hidden',
              }}>
                <Image
                  src={hoveredCard === product.id ? product.hoverImage : product.image}
                  alt={product.name}
                  width={280}
                  height={280}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredCard === product.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: wishlist.includes(`best_${product.id}`) ? 'scale(1.1)' : 'scale(1)',
                    backdropFilter: 'blur(4px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = wishlist.includes(`best_${product.id}`) 
                      ? 'scale(1.15)' 
                      : 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = wishlist.includes(`best_${product.id}`) 
                      ? 'scale(1.1)' 
                      : 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
                  }}
                >
                  <div style={{
                    color: wishlist.includes(`best_${product.id}`) ? '#e53935' : '#e53935',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: wishlist.includes(`best_${product.id}`) ? 'scale(1.1)' : 'scale(1)',
                  }}>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill={wishlist.includes(`best_${product.id}`) ? '#e53935' : 'none'} 
                      stroke="#e53935" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                </button>
                <div style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: '#e53935',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: '50%',
                  padding: '8px 10px',
                  letterSpacing: 0.1,
                  boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  HOT
                </div>
                <div style={{
                  position: 'absolute',
                  top: 74,
                  left: 16,
                  background: '#000',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: '50%',
                  padding: '8px 10px',
                  letterSpacing: 0.1,
                  boxShadow: '0 1px 6px 0 rgba(0,0,0,0.10)',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {product.discount}
                </div>
              </div>
              
              <div style={{
                padding: '20px',
                textAlign: 'center',
              }}>
                <h3 
                  onClick={() => handleProductClick(product.id)}
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: '#222',
                    letterSpacing: 0.2,
                    cursor: 'pointer',
                  }}
                >{product.name}</h3>
                
                <p style={{
                  fontSize: 20,
                  color: '#e53935',
                  marginBottom: 16,
                }}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BestSellersSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile ? <MobileBestSellersSlider /> : <DesktopBestSellersSlider />}
      {isMobile && <MobileBottomMenu />}
    </>
  );
};

export default BestSellersSlider; 