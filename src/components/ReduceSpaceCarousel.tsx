'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileReduceSpaceCarousel from './MobileReduceSpaceCarousel';
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
  { src: '/reduce1.jpg', hoverSrc: '/reduce1-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green', price: '£34.99', oldPrice: '£99.99', discount: '-65%' },
  { src: '/reduce2.jpg', hoverSrc: '/reduce2-hover.jpg', title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Grey', price: '£34.90', oldPrice: '£99.99', discount: '-65%' },
  { src: '/reduce3.jpg', hoverSrc: '/reduce3-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Black', price: '£60.99', oldPrice: '£119.99', discount: '-49%' },
  { src: '/reduce4.jpg', hoverSrc: '/reduce4-hover.jpg', title: 'Zero Gravity Chair with Cushion & Pillow – Grey', price: '£60.99', oldPrice: '£119.99', discount: '-49%' },
];

const DesktopReduceSpaceCarousel = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist) as WishlistItem[];
      setWishlist(items.map(item => item.id));
    }
  }, []);

  const handleProductClick = (index: number) => {
    if (index === 0) {
      router.push('/product/2-in-1-reclining-gravity-chair-dark-green');
    } else if (index === 1) {
      router.push('/product/2-in-1-reclining-gravity-chair-grey');
    } else if (index === 2) {
      router.push('/product/zero-gravity-chair-black');
    } else if (index === 3) {
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
        const validItems = Array.isArray(existingItems) 
          ? existingItems.filter(item => 
              item && 
              typeof item === 'object' && 
              'id' in item && 
              typeof item.id === 'string' && 
              !item.id.startsWith('reduce_')
            )
          : [];
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
        return newWishlist;
      }
    });
  };

  return (
    <section style={{
      width: '100%',
      minHeight: 600,
      background: 'linear-gradient(120deg, #f8fafc 0%, #e9e4f0 100%)',
      padding: '70px 0 90px 0',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 40px 0 rgba(34,34,34,0.07)',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 70% 10%, #e0c3fc 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        padding: '0 24px',
      }}>
        <h2 style={{
          fontSize: 38,
          fontWeight: 800,
          marginBottom: 18,
          letterSpacing: 0.2,
          color: '#1a1a1a',
          textAlign: 'center',
          textTransform: 'uppercase',
          lineHeight: 1.1,
          fontFamily: 'Montserrat, sans-serif',
        }}>
          Create Your Outdoor Haven
        </h2>
        <p style={{
          fontSize: 20,
          color: '#5a5a5a',
          marginBottom: 54,
          maxWidth: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
          textAlign: 'center',
          fontFamily: 'Montserrat, sans-serif',
        }}>
          Transform your living space with our innovative furniture solutions. Perfect for small apartments and cozy homes.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 48,
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
        }}>
          {images.map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: 0,
                maxWidth: 350,
                background: '#fff',
                borderRadius: 28,
                boxShadow: hoveredCard === i ? '0 12px 48px rgba(34,34,34,0.16)' : '0 2px 24px rgba(34,34,34,0.09)',
                padding: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
                transform: hoveredCard === i ? 'translateY(-10px) scale(1.04)' : 'none',
                cursor: 'pointer',
                border: hoveredCard === i ? '2px solid #a084e8' : '2px solid transparent',
                width: '100%',
                height: '100%',
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleProductClick(i)}
            >
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                overflow: 'hidden',
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                position: 'relative',
                background: '#f3f0fa',
                boxShadow: '0 2px 12px 0 rgba(160,132,232,0.07)',
              }}>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleWishlist(i);
                  }}
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    background: 'rgba(255, 255, 255, 0.98)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: wishlist.includes(`reduce_${i}`) ? 'scale(1.13)' : 'scale(1)',
                    backdropFilter: 'blur(4px)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = wishlist.includes(`reduce_${i}`) 
                      ? 'scale(1.18)' 
                      : 'scale(1.07)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = wishlist.includes(`reduce_${i}`) 
                      ? 'scale(1.13)' 
                      : 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.13)';
                  }}
                >
                  <svg 
                    width="26" 
                    height="26" 
                    viewBox="0 0 24 24" 
                    fill={wishlist.includes(`reduce_${i}`) ? '#a084e8' : 'none'} 
                    stroke="#a084e8" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <Image
                  src={hoveredCard === i ? images[i].hoverSrc : images[i].src}
                  alt={images[i].title}
                  width={350}
                  height={260}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'filter 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)',
                    filter: hoveredCard === i ? 'brightness(0.97) saturate(1.08)' : 'none',
                    transform: hoveredCard === i ? 'scale(1.04)' : 'none',
                    display: 'block',
                  }}
                />
                <span style={{
                  position: 'absolute',
                  top: 18,
                  left: 18,
                  background: 'linear-gradient(90deg, #a084e8 0%, #fcaeae 100%)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 16,
                  borderRadius: '50%',
                  width: 52,
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 8px 0 rgba(160,132,232,0.13)',
                  letterSpacing: 0.1,
                  zIndex: 1,
                  border: '2px solid #fff',
                }}>{images[i].discount}</span>
              </div>
              <div style={{
                padding: '22px 18px 18px 18px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(120deg, #f8fafc 0%, #f3f0fa 100%)',
                borderBottomLeftRadius: 28,
                borderBottomRightRadius: 28,
                minHeight: 170,
              }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 10,
                  textAlign: 'center',
                  letterSpacing: 0.1,
                  color: '#1a1a1a',
                  fontFamily: 'Montserrat, sans-serif',
                }}>{images[i].title}</div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginTop: '8px',
                }}>
                  <span style={{ 
                    textDecoration: 'line-through',
                    color: '#bdbdbd',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}>
                    {images[i].oldPrice}
                  </span>
                  <span style={{ 
                    fontWeight: '800',
                    fontSize: '22px',
                    color: '#a084e8',
                    letterSpacing: 0.2,
                  }}>
                    {images[i].price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
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