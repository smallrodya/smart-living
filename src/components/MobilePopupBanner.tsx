import React from 'react';

interface MobilePopupBannerProps {
  onClose: () => void;
  isClosing: boolean;
}

const MobilePopupBanner: React.FC<MobilePopupBannerProps> = ({ onClose, isClosing }) => {
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
      backdropFilter: 'blur(6px)'
    }}>
      <div style={{
        position: 'relative',
        width: '96vw',
        maxWidth: 420,
        minHeight: 210,
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 10px 32px rgba(0,0,0,0.18)',
        border: '1px solid rgba(255,255,255,0.18)',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }}>
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
            filter: 'brightness(0.6)'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)',
          zIndex: 2
        }} />
        <div style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          padding: '28px 16px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(0,0,0,0.12)',
              border: 'none',
              cursor: 'pointer',
              padding: 7,
              borderRadius: '50%',
              zIndex: 4,
              color: '#fff',
              fontSize: 18,
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <h2 style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#fff',
            marginBottom: 10,
            letterSpacing: '-0.5px',
            textShadow: '0 2px 12px rgba(0,0,0,0.18)',
            lineHeight: 1.15,
            maxWidth: 320
          }}>
            Free Shipping
          </h2>
          <p style={{
            fontSize: 14,
            color: '#fff',
            marginBottom: 18,
            fontWeight: 500,
            textShadow: '0 1px 4px rgba(0,0,0,0.13)',
            maxWidth: 260
          }}>
            No minimum. Limited time!
          </p>
          <button
            onClick={onClose}
            style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '12px 32px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.13)',
              transition: 'background 0.2s, transform 0.2s',
              marginTop: 4
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#222';
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)';
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
    </div>
  );
};

export default MobilePopupBanner; 