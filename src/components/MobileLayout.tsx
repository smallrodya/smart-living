'use client';
import React, { useState, useEffect } from 'react';
import MobileBottomMenu from './MobileBottomMenu';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
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
    <>
      {children}
      {isMobile && <MobileBottomMenu />}
    </>
  );
};

export default MobileLayout; 