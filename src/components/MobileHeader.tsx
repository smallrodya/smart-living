'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './MobileHeader.module.css';
import MobileCategoriesMenu from './MobileCategoriesMenu';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        const searchInput = document.getElementById('mobile-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative'
        }}>
          <button 
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Open menu"
            style={{
              position: 'absolute',
              left: '10px',
              zIndex: 1
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <Link 
            href="/"
            className={styles.logo}
            style={{
              display: 'block',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease',
              margin: '0 auto',
              position: 'relative',
              zIndex: 0
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
              width={200}
              height={40}
              style={{ maxWidth: '200px' }}
              priority
            />
          </Link>

          <button
            onClick={toggleSearch}
            aria-label="Search"
            style={{
              position: 'absolute',
              right: '10px',
              zIndex: 1,
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div style={{
            padding: '10px 20px',
            background: '#f8f8f8',
            borderTop: '1px solid #eee',
            animation: 'slideDown 0.3s ease'
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  fontSize: '16px',
                  outline: 'none',
                  background: '#fff'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '12px 20px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#222';
                }}
              >
                Search
              </button>
            </form>
          </div>
        )}
      </header>

      {isMenuOpen && (
        <div className={styles.menuOverlay} style={{ 
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          zIndex: 1000,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100vh - 60px)',
          overscrollBehavior: 'contain',
          paddingBottom: '80px'
        }}>
          <MobileCategoriesMenu />
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default MobileHeader; 