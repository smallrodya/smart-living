'use client';

import React, { useState, useEffect } from 'react';
import MobilePopupBanner from './MobilePopupBanner';

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 600;
};

const PopupBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if popup was closed in the last 2 hours
    const checkPopupState = () => {
      const lastClosed = localStorage.getItem('popupBannerClosed');
      if (lastClosed) {
        const closedTime = parseInt(lastClosed);
        const currentTime = new Date().getTime();
        const twoHoursInMs = 2 * 60 * 60 * 1000;
        if (currentTime - closedTime < twoHoursInMs) {
          return;
        }
      }
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    };
    checkPopupState();
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    localStorage.setItem('popupBannerClosed', new Date().getTime().toString());
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;
  if (isMobile) return <MobilePopupBanner onClose={handleClose} isClosing={isClosing} />;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)',
      opacity: isClosing ? 0 : 1,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        position: 'relative',
        width: 'calc(100vw - 32px)',
        maxWidth: 950,
        minHeight: 440,
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 25px 70px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.18)',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }}>
        {/* Фоновое изображение */}
        <img
          src="/freeshiping.jpg"
          alt="Free Shipping"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            filter: 'brightness(0.55)'
          }}
        />
        {/* Overlay для затемнения */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 100%)',
          zIndex: 2
        }} />
        {/* Контент */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          padding: '64px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: 'rgba(0,0,0,0.12)',
              border: 'none',
              cursor: 'pointer',
              padding: 10,
              borderRadius: '50%',
              zIndex: 4,
              color: '#fff',
              fontSize: 24,
              transition: 'background 0.2s, transform 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.25)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.12)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <h2 style={{
            fontSize: 54,
            fontWeight: 900,
            color: '#fff',
            marginBottom: 24,
            letterSpacing: '-1px',
            textShadow: '0 4px 24px rgba(0,0,0,0.25)',
            lineHeight: 1.1,
            maxWidth: 700
          }}>
            Free Shipping<br />
          </h2>
          <p style={{
            fontSize: 28,
            color: '#fff',
            marginBottom: 40,
            fontWeight: 500,
            textShadow: '0 2px 8px rgba(0,0,0,0.18)',
            maxWidth: 600
          }}>
            No minimum spend. Limited time only!<br />Shop now and save on delivery.
          </p>
          <button
            onClick={handleClose}
            style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '22px 64px',
              fontSize: 28,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              transition: 'background 0.2s, transform 0.2s',
              marginTop: 8
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#222';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#111';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .popup-banner-content h2 {
            font-size: 32px !important;
          }
          .popup-banner-content p {
            font-size: 18px !important;
          }
          .popup-banner-content button {
            font-size: 18px !important;
            padding: 14px 32px !important;
          }
        }
        @media (max-width: 600px) {
          .popup-banner-content h2 {
            font-size: 22px !important;
          }
          .popup-banner-content p {
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PopupBanner; 