'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileReduceSpaceCarousel from './MobileReduceSpaceCarousel';

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

const arrowIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const DesktopReduceSpaceCarousel = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist) as WishlistItem[];
      setWishlist(items.map(item => item.id));
    }
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const prefixedId = `reduce_${id}`;
      const newWishlist = prev.includes(prefixedId) 
        ? prev.filter(i => i !== prefixedId)
        : [...prev, prefixedId];
      
      // Получаем существующие товары из localStorage
      // Сохраняем в localStorage
      const wishlistItems = images
        .filter((_, i) => newWishlist.includes(`reduce_${i + 1}`))
        .map((item, i) => ({
          id: `reduce_${i + 1}`,
          src: item.src,
          hoverSrc: item.hoverSrc,
          title: item.title,
          price: item.price,
          discount: item.discount
        }));
      
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      return newWishlist;
    });
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
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16, position: 'relative'}}>
              <button
                onClick={() => toggleWishlist(i)}
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
              <button
                style={{
                  background: '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 9,
                  padding: '9px 0',
                  fontWeight: 600,
                  fontSize: 14,
                  width: '100%',
                  marginTop: 7,
                  transition: 'background 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  letterSpacing: 0.1,
                  boxShadow: hoveredBtn === i ? '0 2px 12px 0 rgba(34,34,34,0.10)' : 'none',
                }}
                onMouseEnter={() => setHoveredBtn(i)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                {hoveredBtn === i ? basketIcon : 'Add to basket'}
              </button>
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
              padding: '8px 10px',
              letterSpacing: 0.1,
              boxShadow: '0 1px 6px 0 rgba(229,57,53,0.10)',
              width: '47px',
              height: '47px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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