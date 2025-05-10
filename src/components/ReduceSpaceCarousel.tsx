'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileReduceSpaceCarousel from './MobileReduceSpaceCarousel';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

const basketIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);

const DesktopReduceSpaceCarousel = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist) as WishlistItem[];
      setWishlist(items.map(item => item.id));
    }
  }, []);

  const handleProductClick = (index: number) => {
    if (index === 0) { // Index 0 corresponds to the Dark Green chair
      router.push('/product/2-in-1-reclining-gravity-chair-dark-green');
    } else if (index === 1) { // Index 1 corresponds to the Grey chair
      router.push('/product/2-in-1-reclining-gravity-chair-grey');
    } else if (index === 2) { // Index 2 corresponds to the Black chair
      router.push('/product/zero-gravity-chair-black');
    } else if (index === 3) { // Index 3 corresponds to the Grey Zero Gravity chair
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

  const handleImageChange = (productId: number, index: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  return (
    <section style={{width: '100%', height: 'auto', margin: '0 auto 40px', padding: 0, textAlign: 'center'}}>
      <h2 style={{fontSize: 26, fontWeight: 700, marginBottom: 20, letterSpacing: 0.2}}>REDUCE SPACE</h2>
      <div style={{
        display: 'flex',
        gap: 32,
        overflowX: 'auto',
        justifyContent: 'center',
        padding: '10px 0',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {images.map((item, i) => (
          <div
            key={i}
            style={{
              minWidth: 300,
              maxWidth: 320,
              background: '#fff',
              borderRadius: 16,
              boxShadow: hoveredCard === i ? '0 8px 32px rgba(34,34,34,0.13)' : '0 2px 16px rgba(34,34,34,0.07)',
              padding: 0,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
              transform: hoveredCard === i ? 'translateY(-6px) scale(1.03)' : 'none',
              flex: '0 0 auto',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleProductClick(i)}
          >
            <div style={{width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16, position: 'relative'}}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(i);
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: wishlist.includes(`reduce_${i}`) ? 'scale(1.1)' : 'scale(1)',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = wishlist.includes(`reduce_${i}`) 
                    ? 'scale(1.15)' 
                    : 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = wishlist.includes(`reduce_${i}`) 
                    ? 'scale(1.1)' 
                    : 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
                }}
              >
                <div style={{
                  color: wishlist.includes(`reduce_${i}`) ? '#e53935' : '#e53935',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: wishlist.includes(`reduce_${i}`) ? 'scale(1.1)' : 'scale(1)',
                }}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill={wishlist.includes(`reduce_${i}`) ? '#e53935' : 'none'} 
                    stroke="#e53935" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
              </button>
              <Image
                src={hoveredCard === i ? images[i].hoverSrc : images[i].src}
                alt={images[i].title}
                width={320}
                height={240}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'filter 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
                  filter: hoveredCard === i ? 'brightness(0.97) saturate(1.08)' : 'none',
                  transform: hoveredCard === i ? 'scale(1.03)' : 'none',
                  display: 'block',
                }}
              />
            </div>
            <div style={{padding: '14px 10px 10px 10px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontWeight: 600, fontSize: 15, marginBottom: 6, textAlign: 'center', letterSpacing: 0.1}}>{images[i].title}</div>
              <div style={{color: '#e53935', fontWeight: 700, fontSize: 16, marginBottom: 8}}>{images[i].price}</div>
            </div>
            <span style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: '#e53935',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: '50%',
              width: '47px',
              height: '47px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
            }}>{images[i].discount}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const ReduceSpaceCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileReduceSpaceCarousel /> : <DesktopReduceSpaceCarousel />;
};

export default ReduceSpaceCarousel; 