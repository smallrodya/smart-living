'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileHeader from './MobileHeader';
import Link from 'next/link';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
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

  if (isMobile) {
    return <MobileHeader />;
  }

  return (
    <header style={{ 
      padding: '0', 
      borderBottom: '1px solid #eee', 
      background: '#fff', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: 80, 
        padding: '0 24px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
          <Link 
            href="/"
            style={{
              display: 'block',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <Image 
              src="/SmartLivingLogo.png" 
              alt="Smart Living" 
              width={250}
              height={50}
              style={{ maxWidth: '250px' }}
            />
          </Link>
          <form 
            role="search" 
            method="get" 
            className="searchform" 
            action="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              flex: 1,
              maxWidth: '400px',
              position: 'relative'
            }}
          >
            <input 
              type="text" 
              className="s" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              name="s" 
              aria-label="Search" 
              title="Search for products" 
              required 
              style={{ 
                padding: '8px 16px',
                width: '100%',
                border: '1px solid #eee',
                borderRadius: '20px',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease',
                outline: 'none',
                background: '#f8f8f8',
                height: '36px'
              }}
              onFocus={(e) => {
                e.target.style.background = '#fff';
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                e.target.style.borderColor = '#ddd';
              }}
              onBlur={(e) => {
                e.target.style.background = '#f8f8f8';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.03)';
                e.target.style.borderColor = '#eee';
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e53935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
            <input type="hidden" name="post_type" value="product" />
          </form>
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          alignItems: 'center'
        }}>
          <Link 
            href="/login" 
            style={{ 
              color: '#000',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              width: 44,
              height: 44
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
          <Link 
            href="/basket" 
            style={{ 
              color: '#000',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              width: 44,
              height: 44
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </Link>
          <Link 
            href="/wishlist" 
            style={{ 
              color: '#000',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              width: 44,
              height: 44
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </Link>
          <a 
            href="/track-order" 
            style={{ 
              background: '#000',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '160px',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              const text = e.currentTarget.querySelector('span');
              const car = e.currentTarget.querySelector('img');
              const button = e.currentTarget;
              
              if (text && car && button.dataset.animating !== 'true') {
                button.dataset.animating = 'true';
                button.style.background = '#333';
                
                car.style.left = '-30px';
                car.style.transform = 'scale(0.8)';
                car.style.opacity = '0';
                
                text.style.opacity = '0';
                text.style.transform = 'translateX(100px)';
                
                setTimeout(() => {
                  car.style.opacity = '1';
                  car.style.transform = 'scale(1)';
                  
                  setTimeout(() => {
                    car.style.left = '50%';
                    car.style.transform = 'translateX(-50%) scale(1)';
                    
                    setTimeout(() => {
                      car.style.transform = 'translateX(-50%) scale(1.2)';
                      
                      setTimeout(() => {
                        car.style.transform = 'translateX(-50%) scale(1)';
                        car.style.left = 'calc(100% + 30px)';
                        
                        setTimeout(() => {
                          text.style.opacity = '1';
                          text.style.transform = 'translateX(0)';
                          car.style.opacity = '0';
                          button.style.background = '#000';
                          delete button.dataset.animating;
                        }, 500);
                      }, 500);
                    }, 500);
                  }, 100);
                }, 50);
              }
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget;
              if (button.dataset.animating !== 'true') {
                const text = button.querySelector('span');
                const car = button.querySelector('img');
                if (text && car) {
                  text.style.opacity = '1';
                  text.style.transform = 'translateX(0)';
                  car.style.opacity = '0';
                  car.style.left = '-30px';
                  car.style.transform = 'scale(0.8)';
                  button.style.background = '#000';
                }
              }
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'all 0.5s ease',
              opacity: 1,
              position: 'relative',
              zIndex: 1,
              width: '100%',
              textAlign: 'center'
            }}>
              Track Order
            </span>
            <Image 
              src="/car-svgrepo-com.svg"
              alt="Car"
              width={24}
              height={24}
              style={{
                position: 'absolute',
                left: '-30px',
                opacity: 0,
                transition: 'all 0.5s ease',
                transform: 'scale(0.8)',
                filter: 'invert(1)',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 