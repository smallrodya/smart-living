'use client';
import React from 'react';
import Image from 'next/image';

const MobileHeader = () => {
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
        justifyContent: 'center', 
        height: 60, 
        padding: '0 24px' 
      }}>
        <Image 
          src="/SmartLivingLogo.png" 
          alt="Smart Living" 
          width={200}
          height={40}
          style={{ maxWidth: '200px' }}
        />
      </div>
    </header>
  );
};

export default MobileHeader; 