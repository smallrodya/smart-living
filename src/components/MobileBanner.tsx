'use client';

import React from 'react';

const MobileBanner = () => {
  const bannerStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    background: 'url("/banner.jpg") center/cover no-repeat',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    marginTop: '-10px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <section style={bannerStyles} />
  );
};

export default MobileBanner; 