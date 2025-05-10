'use client';

import React, { useState, useEffect } from 'react';
import MobileBanner from './MobileBanner';

const Banner = () => {
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
    return <MobileBanner />;
  }

  const bannerStyles: React.CSSProperties = {
    width: '100%',
    height: '800px',
    background: 'url("/banner.jpg") center/cover no-repeat',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px',
    marginTop: '-100px'
  };

  return (
    <section style={bannerStyles} />
  );
};

export default Banner; 