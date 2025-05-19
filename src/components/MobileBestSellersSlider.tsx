'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
    price: '£14.99 - £17.72', 
    image: '/best2.jpg', 
    hoverImage: '/best2.jpg', 
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

const arrowIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const MobileBestSellersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

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
      
      try {
        const existingItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
        // Ensure we have an array and filter out invalid items
        const validItems = Array.isArray(existingItems) 
          ? existingItems.filter(item => 
              item && 
              typeof item === 'object' && 
              'id' in item && 
              typeof item.id === 'string' && 
              !item.id.startsWith('best_')
            )
          : [];
        
        // Create new items array only for items that are in the new wishlist
        const newItems = products
          .filter((_, i) => newWishlist.includes(`best_${i + 1}`))
          .map((item) => ({
            id: `best_${item.id}`,
            src: item.image,
            hoverSrc: item.hoverImage,
            title: item.name,
            price: item.price,
            discount: item.discount,
            sizes: item.sizes
          }));
        
        const wishlistItems = [...validItems, ...newItems];
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        return newWishlist;
      } catch (error) {
        console.error('Error handling wishlist:', error);
        return newWishlist;
      }
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    setTouchEnd(null);
    setTouchStart(null);
  };

  const handleProductClick = (id: number) => {
    router.push(`/product/bestseller/${id}`);
  };

  const currentProduct = products[currentIndex];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 600,
      margin: '0 auto',
      padding: '20px 0',
    }}>
      <h2 style={{
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: 0.5,
        color: '#222',
      }}>BESTSELLERS</h2>
      <p style={{
        fontSize: 17,
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
        maxWidth: 320,
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 1.4,
      }}>
        Discover our most popular bedding sets, chosen by thousands of happy customers
      </p>

      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          padding: '0 40px',
          marginBottom: 40,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            zIndex: 2,
            color: '#222',
            opacity: 0.7,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          {arrowIcon}
        </button>

        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 16px rgba(34,34,34,0.07)',
          padding: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-4px)' : 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleProductClick(currentProduct.id)}
        >
          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            position: 'relative'
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(currentProduct.id);
              }}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: wishlist.includes(`best_${currentProduct.id}`) ? 'scale(1.1)' : 'scale(1)',
                backdropFilter: 'blur(4px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = wishlist.includes(`best_${currentProduct.id}`) 
                  ? 'scale(1.15)' 
                  : 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = wishlist.includes(`best_${currentProduct.id}`) 
                  ? 'scale(1.1)' 
                  : 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
              }}
            >
              <div style={{
                color: wishlist.includes(`best_${currentProduct.id}`) ? '#e53935' : '#e53935',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: wishlist.includes(`best_${currentProduct.id}`) ? 'scale(1.1)' : 'scale(1)',
              }}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill={wishlist.includes(`best_${currentProduct.id}`) ? '#e53935' : 'none'} 
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
              top: 8,
              left: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              zIndex: 2
            }}>
              <span style={{
                background: '#e53935',
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
              }}>HOT</span>
              <span style={{
                background: '#000',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 6px 0 rgba(0,0,0,0.10)',
              }}>{currentProduct.discount}</span>
            </div>
            <Image
              src={isHovered ? currentProduct.hoverImage : currentProduct.image}
              alt={currentProduct.name}
              width={300}
              height={225}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </div>
          
          <div style={{
            padding: '10px 8px 8px 8px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 4,
              textAlign: 'center',
              letterSpacing: 0.1,
              lineHeight: 1.3,
              color: '#222'
            }}>{currentProduct.name}</div>
            
            <div style={{
              color: '#e53935',
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 6
            }}>{currentProduct.price}</div>
          </div>
        </div>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            zIndex: 2,
            color: '#222',
            opacity: 0.7,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileBestSellersSlider; 