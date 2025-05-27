'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface WishlistItem {
  id: string;
  name?: string;
  title?: string;
  price: string;
  image?: string;
  hoverImage?: string;
  src?: string;
  hoverSrc?: string;
  discount: string;
  color?: string;
  sizes?: {
    single: boolean;
    double: boolean;
    king: boolean;
    superKing?: boolean;
  };
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        setWishlistItems(items);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlistItems([]);
      }
    }
  }, []);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => {
      const newItems = prev.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return newItems;
    });
  };

  const getImageSrc = (item: WishlistItem, isHovered: boolean): string => {
    if (isHovered) {
      return item.hoverImage || item.hoverSrc || item.image || item.src || '/placeholder.jpg';
    }
    return item.image || item.src || '/placeholder.jpg';
  };

  const getItemName = (item: WishlistItem) => {
    return item.name || item.title || '';
  };

  return (
    <>
      <Header />
      <main>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
          minHeight: '100vh',
          marginTop: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <button
              onClick={() => router.back()}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#666',
                fontSize: '16px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#222',
              margin: 0
            }}>Wishlist</h1>
          </div>

          {wishlistItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f8f9fa',
              borderRadius: '20px'
            }}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
                style={{ marginBottom: '20px' }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#444',
                marginBottom: '12px'
              }}>Your wishlist is empty</h2>
              <p style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '24px'
              }}>Add items to your wishlist to save them for later</p>
              <button
                onClick={() => router.push('/')}
                style={{
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
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
                      src={getImageSrc(item, hoveredItem === item.id)}
                      alt={getItemName(item)}
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
                        backdropFilter: 'blur(4px)'
                      }}
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
                    <button
                      onClick={() => {/* Add to cart functionality */}}
                      style={{
                        position: 'absolute',
                        top: '64px',
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
                        backdropFilter: 'blur(4px)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
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
                      width: '47px',
                      height: '47px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                    }}>{getItemName(item)}</h3>
                    <div style={{
                      color: '#e53935',
                      fontWeight: 700,
                      fontSize: '20px',
                      marginBottom: '12px'
                    }}>{item.price}</div>
                    {item.sizes && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        {Object.entries(item.sizes).map(([size, available]) => (
                          <div
                            key={size}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '14px',
                              color: available ? '#444' : '#999'
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={available ? '#222' : '#999'}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {available ? (
                                <path d="M20 6L9 17l-5-5"/>
                              ) : (
                                <path d="M18 6L6 18M6 6l12 12"/>
                              )}
                            </svg>
                            {size === 'single' && 'Single (135cm x 200cm)'}
                            {size === 'double' && 'Double (200cm x 200cm)'}
                            {size === 'king' && 'King (220cm x 235cm)'}
                            {size === 'superKing' && 'Super King (220cm x 260cm)'}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default WishlistPage; 