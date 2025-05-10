'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface WishlistItem {
  id: string;
  src: string;
  hoverSrc: string;
  title: string;
  price: string;
  discount: string;
}

const products = [
  { id: 1, name: '3D Duvet Cover and Pillowcase Set – Black Panther', price: '£14.99', image: '/best1.jpg', hoverImage: '/best1.jpg', discount: '-71%' },
  { id: 2, name: 'Reversible Polycotton Elephant Mandala Duvet Cover', price: '£14.99', image: '/best2.jpg', hoverImage: '/best2.jpg', discount: '-71%' },
  { id: 3, name: 'Diamante 5pc Bed in a Bag – Chocolate', price: '£17.99 – £19.99', image: '/best3.jpg', hoverImage: '/best3.jpg', discount: '-56%' },
  { id: 4, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Blush Pink', price: '£26.49 – £33.99', image: '/best4.jpg', hoverImage: '/best4.jpg', discount: '-51%' },
  { id: 5, name: 'Hug N Snug Duvet Cover and Pillowcase Set – Charcoal', price: '£26.49 – £33.99', image: '/best5.jpg', hoverImage: '/best5-hover.jpg', discount: '-51%' },
  { id: 6, name: 'Reversible Polycotton Fern Rouched Duvet Cover', price: '£10.37 – £12.97', image: '/best6.jpg', hoverImage: '/best6-hover.jpg', discount: '-81%' },
];

const arrowIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const MobileBestSellersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const router = useRouter();
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});

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
          discount: item.discount
        }));
      
      // Объединяем существующие и новые товары
      const wishlistItems = [...filteredItems, ...newItems];
      
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      return newWishlist;
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

    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentProduct = products[currentIndex];

  const handleProductClick = (id: number) => {
    router.push(`/product/bestseller/${id}`);
  };

  const handleImageChange = (productId: number, index: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  return (
    <section style={{
      width: '100%',
      padding: '40px 0',
      backgroundColor: '#f8f8f8',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative',
      }}>
        <h2 style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 24,
          textAlign: 'center',
          letterSpacing: 0.5,
          color: '#222',
        }}>BESTSELLERS</h2>
        
        <div 
          style={{
            position: 'relative',
            width: '100%',
            padding: '0 40px',
            boxSizing: 'border-box'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'opacity 0.3s ease',
              opacity: 0.7
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
          >
            {arrowIcon}
          </button>

          <div
            style={{
              minWidth: 280,
              maxWidth: 240,
              background: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              margin: '0 auto',
              transform: isHovered ? 'translateY(-4px)' : 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleProductClick(currentProduct.id)}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '100%',
              overflow: 'hidden',
            }}>
              <Image
                src={isHovered ? currentProduct.hoverImage : currentProduct.image}
                alt={currentProduct.name}
                width={300}
                height={300}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(currentProduct.id);
                }}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
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
                top: 12,
                left: 12,
                background: '#e53935',
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
                borderRadius: '50%',
                padding: '6px 8px',
                letterSpacing: 0.1,
                boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                HOT
              </div>
              <div style={{
                position: 'absolute',
                top: 60,
                left: 12,
                background: '#000',
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
                borderRadius: '50%',
                padding: '6px 8px',
                letterSpacing: 0.1,
                boxShadow: '0 1px 6px 0 rgba(0,0,0,0.10)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {currentProduct.discount}
              </div>
            </div>
            
            <div style={{
              padding: '16px 12px',
              textAlign: 'center',
            }}>
              <h3 
                onClick={() => handleProductClick(currentProduct.id)}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: '#222',
                  letterSpacing: 0.2,
                  lineHeight: 1.4,
                  cursor: 'pointer',
                }}
              >{currentProduct.name}</h3>
              
              <p style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#e53935',
                marginBottom: 16,
              }}>{currentProduct.price}</p>
            </div>
          </div>

          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'opacity 0.3s ease',
              opacity: 0.7
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
          >
            <div style={{ transform: 'rotate(180deg)' }}>{arrowIcon}</div>
          </button>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 20
        }}>
          {products.map((_, index) => (
            <div
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: index === currentIndex ? '#222' : '#ddd',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileBestSellersSlider; 