'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileHeader from './MobileHeader';

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
          <Image 
            src="/SmartLivingLogo.png" 
            alt="Smart Living" 
            width={250}
            height={50}
            style={{ maxWidth: '250px' }}
          />
          <form 
            role="search" 
            method="get" 
            className="searchform" 
            action="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              flex: 1,
              maxWidth: '600px'
            }}
          >
            <input 
              type="text" 
              className="s" 
              placeholder="Search for products" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              name="s" 
              aria-label="Search" 
              title="Search for products" 
              required 
              style={{ 
                padding: '12px 20px',
                width: '100%',
                border: '1px solid #eee',
                borderRadius: '4px',
                fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            />
            <input type="hidden" name="post_type" value="product" />
          </form>
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          alignItems: 'center'
        }}>
          <a 
            href="/my-account" 
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
          </a>
          <a 
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
          </a>
          <a 
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
          </a>
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
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            Track Order
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 