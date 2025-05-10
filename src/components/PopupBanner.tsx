'use client';

import React, { useState, useEffect } from 'react';

const PopupBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if popup was closed in the last 2 hours
    const checkPopupState = () => {
      const lastClosed = localStorage.getItem('popupBannerClosed');
      if (lastClosed) {
        const closedTime = parseInt(lastClosed);
        const currentTime = new Date().getTime();
        const twoHoursInMs = 2 * 60 * 60 * 1000;
        
        // Only show if more than 2 hours have passed
        if (currentTime - closedTime < twoHoursInMs) {
          return;
        }
      }
      
      // Show popup after 2 seconds if not recently closed
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    };

    checkPopupState();
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Save current time to localStorage
    localStorage.setItem('popupBannerClosed', new Date().getTime().toString());
    
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      opacity: isClosing ? 0 : 1,
      transition: 'opacity 0.3s ease'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '20px',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        transform: isClosing ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div style={{
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#222',
            marginBottom: '15px'
          }}>
            Free Shipping Ends Soon
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            No Minimum Spend — Shop Now & Save Big!
          </p>
          <button
            onClick={handleClose}
            style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#222';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#111';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBanner; 