'use client';
import React, { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
          <img src="/SmartLivingLogo.png" alt="Smart Living" style={{ height: '50px', maxWidth: '250px' }} />
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
              fontSize: '16px',
              fontWeight: '600',
              padding: '12px 16px',
              transition: 'all 0.3s ease'
            }}
          >
            Login / Register
          </a>
          <a 
            href="/basket" 
            style={{ 
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '12px 16px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🛒</span>
            Basket
          </a>
          <a 
            href="/wishlist" 
            style={{ 
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '12px 16px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>❤️</span>
            Wishlist
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
            <span>🚛</span>
            Track Order
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 