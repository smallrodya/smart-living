'use client';

import React from 'react';
import { useEffect, useState } from 'react';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      paddingTop: isMobile ? '60px' : '0',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      backgroundColor: '#fff'
    }}>
      {children}
    </div>
  );
} 