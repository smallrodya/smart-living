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
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      opacity: isClosing ? 0 : 1,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        padding: '50px 40px',
        borderRadius: '32px',
        maxWidth: '520px',
        width: '90%',
        position: 'relative',
        transform: isClosing ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 25px 70px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.3)',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(69,160,73,0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(20px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '160px',
          height: '160px',
          background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(69,160,73,0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(20px)'
        }} />

        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.03)',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 2
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.08)';
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div style={{
          textAlign: 'center',
          padding: '20px 0',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 30px',
            background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
            position: 'relative',
            transform: 'translateY(0)',
            animation: 'float 3s ease-in-out infinite',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <span style={{
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'line-through',
              opacity: 0.8
            }}>
              Shipping £5
            </span>
            <span style={{
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700
            }}>
              FREE
            </span>
          </div>

          <h2 style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#1a1a1a',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #e53935 0%, #c62828 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}>
            Free Shipping Ends Soon
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#666',
            lineHeight: '1.6',
            maxWidth: '400px',
            margin: '0 auto 40px',
            fontWeight: 500
          }}>
            No Minimum Spend — Shop Now & Save Big!
          </p>
          <button
            onClick={handleClose}
            style={{
              background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              padding: '18px 48px',
              fontSize: '20px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            }}
          >
            Shop Now
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default PopupBanner; 