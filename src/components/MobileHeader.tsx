'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileHeader.module.css';
import MobileCategoriesMenu from './MobileCategoriesMenu';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        </div>
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
          paddingBottom: '130px'
        }}>
          <MobileCategoriesMenu />
        </div>
      )}
    </>
  );
};

export default MobileHeader; 