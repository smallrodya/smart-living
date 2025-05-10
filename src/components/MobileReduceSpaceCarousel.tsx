'use client';
import React, { useState, useRef, useEffect } from 'react';
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

const images = [
  { src: '/reduce1.jpg', hoverSrc: '/reduce1-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green', price: '£34.99', discount: '-65%' },
  { src: '/reduce2.jpg', hoverSrc: '/reduce2-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Grey', price: '£34.90', discount: '-65%' },
  { src: '/reduce3.jpg', hoverSrc: '/reduce3-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Black', price: '£60.99', discount: '-49%' },
  { src: '/reduce4.jpg', hoverSrc: '/reduce4-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Grey', price: '£60.99', discount: '-49%' },
];

const arrowIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const MobileReduceSpaceCarousel = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist) as WishlistItem[];
      setWishlist(items.map(item => item.id));
    }
  }, []);

  const handleProductClick = () => {
    if (currentIndex === 0) { // Dark Green chair
      router.push('/product/2-in-1-reclining-gravity-chair-dark-green');
    } else if (currentIndex === 1) { // Grey chair
      router.push('/product/2-in-1-reclining-gravity-chair-grey');
    } else if (currentIndex === 2) { // Black chair
      router.push('/product/zero-gravity-chair-black');
    } else if (currentIndex === 3) { // Grey Zero Gravity chair
      router.push('/product/zero-gravity-chair-grey');
    }
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const prefixedId = `reduce_${id}`;
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
              !item.id.startsWith('reduce_')
            )
          : [];
        
        // Create new items array only for items that are in the new wishlist
        const newItems = images
          .filter((_, i) => newWishlist.includes(`reduce_${i}`))
          .map((item, i) => ({
            id: `reduce_${i}`,
            src: item.src,
            hoverSrc: item.hoverSrc,
            title: item.title,
            price: item.price,
            discount: item.discount
          }));
        
        const wishlistItems = [...validItems, ...newItems];
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        return newWishlist;
      } catch (error) {
        console.error('Error handling wishlist:', error);
        // If there's an error, just update the state without modifying localStorage
        return newWishlist;
      }
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
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

  const currentItem = images[currentIndex];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 600,
      margin: '0 auto',
      padding: '20px 0',
    }}>
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          padding: '0 40px',
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
        onClick={handleProductClick}
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
                toggleWishlist(currentIndex);
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
                transform: wishlist.includes(`reduce_${currentIndex}`) ? 'scale(1.1)' : 'scale(1)',
                backdropFilter: 'blur(4px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = wishlist.includes(`reduce_${currentIndex}`) 
                  ? 'scale(1.15)' 
                  : 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = wishlist.includes(`reduce_${currentIndex}`) 
                  ? 'scale(1.1)' 
                  : 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
              }}
            >
              <div style={{
                color: wishlist.includes(`reduce_${currentIndex}`) ? '#e53935' : '#e53935',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: wishlist.includes(`reduce_${currentIndex}`) ? 'scale(1.1)' : 'scale(1)',
              }}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill={wishlist.includes(`reduce_${currentIndex}`) ? '#e53935' : 'none'} 
                  stroke="#e53935" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
            </button>
            <span style={{
              position: 'absolute',
              top: 8,
              left: 8,
              background: '#e53935',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
              zIndex: 2
            }}>{currentItem.discount}</span>
            <Image
              src={isHovered ? currentItem.hoverSrc : currentItem.src}
              alt={currentItem.title}
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
            }}>{currentItem.title}</div>
            
            <div style={{
              color: '#e53935',
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 6
            }}>{currentItem.price}</div>
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

export default MobileReduceSpaceCarousel; 