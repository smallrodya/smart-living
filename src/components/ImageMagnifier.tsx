'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  magnifierSize?: number;
  zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  width = 600,
  height = 600,
  magnifierSize = 400,
  zoomLevel = 2.5
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setImageSize({ width, height });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !showMagnifier) return;

    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - left, imageSize.width));
    const y = Math.max(0, Math.min(e.clientY - top, imageSize.height));

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
    setIsDragging(false);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: showMagnifier ? 'none' : 'default'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.2s ease-out',
          transform: showMagnifier ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            minWidth: `${magnifierSize}px`,
            minHeight: `${magnifierSize}px`,
            pointerEvents: 'none',
            left: position.x - magnifierSize / 2,
            top: position.y - magnifierSize / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imageSize.width * zoomLevel}px ${imageSize.height * zoomLevel}px`,
            backgroundPositionX: `${-position.x * zoomLevel + magnifierSize / 2}px`,
            backgroundPositionY: `${-position.y * zoomLevel + magnifierSize / 2}px`,
            borderRadius: '50%',
            boxShadow: '0 0 0 7px rgba(255, 255, 255, 0.85), 0 0 7px 7px rgba(0, 0, 0, 0.25), inset 0 0 40px 2px rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
            opacity: isDragging ? 0.8 : 1,
            transition: 'opacity 0.2s ease-out',
            transform: 'scale(1)',
            transformOrigin: 'center'
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier; 