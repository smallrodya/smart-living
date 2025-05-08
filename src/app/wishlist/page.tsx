'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { useRouter } from 'next/navigation';

interface WishlistItem {
  id: number;
  src: string;
  hoverSrc: string;
  title: string;
  price: string;
  discount: string;
}

const backArrow = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <>
      <Header />
      <main>
        {wishlistItems.length === 0 ? (
          <div style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
            background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)'
          }}>
            <div style={{
              background: '#fff',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              maxWidth: '400px',
              width: '100%'
            }}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e53935"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: '24px' }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#222',
                letterSpacing: '-0.5px'
              }}>Your Wishlist is Empty</h1>
              <p style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>Add items to your wishlist to see them here. Browse our collection and save your favorite products.</p>
              <Link href="/" style={{
                background: '#111',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
              }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px',
            background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
            minHeight: '100vh'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
              gap: '24px'
            }}>
              <div style={{padding: '20px 12px 0 12px'}}>
                <button
                  onClick={() => router.push('/')}
                  style={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    marginBottom: 20
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#222" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              </div>
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#222',
                  letterSpacing: '-0.5px'
                }}>My Wishlist</h1>
                <div style={{
                  fontSize: '16px',
                  color: '#666',
                  fontWeight: 500
                }}>
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px'
            }}>
              {wishlistItems.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    boxShadow: hoveredItem === item.id 
                      ? '0 8px 32px rgba(34,34,34,0.12)' 
                      : '0 2px 16px rgba(34,34,34,0.07)',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredItem === item.id ? 'translateY(-4px)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <Image
                      src={hoveredItem === item.id ? item.hoverSrc : item.src}
                      alt={item.title}
                      fill
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hoveredItem === item.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hoveredButton === item.id ? 'scale(1.1)' : 'scale(1)',
                        backdropFilter: 'blur(4px)'
                      }}
                      onMouseEnter={() => setHoveredButton(item.id)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#e53935"
                        stroke="#e53935"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#e53935',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: '50%',
                      padding: '8px 12px',
                      boxShadow: '0 2px 8px rgba(229,57,53,0.2)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {item.discount}
                    </span>
                  </div>
                  <div style={{
                    padding: '20px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#222',
                      lineHeight: '1.4'
                    }}>{item.title}</h3>
                    <div style={{
                      color: '#e53935',
                      fontWeight: 700,
                      fontSize: '20px',
                      marginBottom: '20px'
                    }}>{item.price}</div>
                    <button 
                      style={{
                        background: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '14px 0',
                        width: '100%',
                        fontWeight: 600,
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                        transform: hoveredButton === item.id ? 'translateY(-2px)' : 'none'
                      }}
                      onMouseEnter={() => setHoveredButton(item.id)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Add to basket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default WishlistPage; 