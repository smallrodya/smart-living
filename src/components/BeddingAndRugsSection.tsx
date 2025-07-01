'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const ThrowAndCurtainSection = () => {
  const [hovered, setHovered] = useState<'bedding' | 'rugs' | null>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = titleRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      width: '100%',
      padding: '60px 0 40px 0',
      background: '#fff',
      textAlign: 'center',
    }}>
      <h2
        ref={titleRef}
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 12,
          letterSpacing: 0.2,
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
        }}
      >
        {['Elevate', 'Your', 'Living', 'Space', 'with', 'Elegance'].map((word, wi) => (
          <span
            key={wi}
            className="word"
            style={word === 'with' ? { whiteSpace: 'nowrap', display: 'inline-block' } : { display: 'inline-block' }}
          >
            {Array.from(word).map((char, ci) => (
              <span
                key={ci}
                className={titleVisible ? 'glass-animate' : ''}
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  filter: 'blur(8px)',
                  transform: 'scale(1.3) translateY(30px)',
                  animation: titleVisible
                    ? `glassIn 0.7s cubic-bezier(.4,2,.6,1) forwards ${(wi * 7 + ci) * 0.045 + 0.1}s`
                    : 'none',
                }}
              >
                {char}
              </span>
            ))}
            {wi !== 5 && <span style={{ display: 'inline-block', width: 8 }}></span>}
          </span>
        ))}
      </h2>
      <style>{`
        @keyframes glassIn {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: scale(1.3) translateY(30px) rotate(-8deg);
          }
          60% {
            opacity: 0.7;
            filter: blur(2px);
            transform: scale(1.05) translateY(-6px) rotate(2deg);
          }
          80% {
            opacity: 1;
            filter: blur(0.5px);
            transform: scale(1.02) translateY(2px) rotate(-1deg);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }
      `}</style>
      <p style={{
        fontSize: 17,
        color: '#444',
        marginBottom: 40,
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Create a cozy and stylish atmosphere in every room with our bedding sets and rugs.
      </p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 32,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* DUVET SET */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 380px',
            minWidth: 320,
            maxWidth: 500,
            height: 420,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(34,34,34,0.10)',
            background: '#f7f7f7',
            display: 'flex',
            alignItems: 'flex-end',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHovered('bedding')}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            transition: 'transform 0.35s cubic-bezier(.4,2,.6,1)',
            transform: hovered === 'bedding' ? 'scale(1.06)' : 'scale(1)',
          }}>
            <Image
              src="/best4.jpg"
              alt="BEDDING"
              fill
              style={{ objectFit: 'cover', borderRadius: 12 }}
              sizes="(max-width: 900px) 100vw, 500px"
            />
          </div>
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            margin: '0 auto',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(34,34,34,0.08)',
            padding: '32px 24px 24px 24px',
            maxWidth: 320,
            zIndex: 2,
            marginBottom: 32,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>BEDDING</h3>
            <p style={{ fontSize: 15, color: '#111', marginBottom: 18 }}>Soft, stylish, and perfect for warmth or décor.</p>
            <button style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '12px 28px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(34,34,34,0.10)',
              transition: 'background 0.2s',
            }}
            onClick={() => window.location.href = '/shop/duvet-set-by-type'}
            >SHOP NOW</button>
          </div>
        </div>
        {/* RUGS */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 380px',
            minWidth: 320,
            maxWidth: 500,
            height: 420,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(34,34,34,0.10)',
            background: '#f7f7f7',
            display: 'flex',
            alignItems: 'flex-end',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHovered('rugs')}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            transition: 'transform 0.35s cubic-bezier(.4,2,.6,1)',
            transform: hovered === 'rugs' ? 'scale(1.06)' : 'scale(1)',
          }}>
            <Image
              src="/carved_banner.jpg"
              alt="RUGS"
              fill
              style={{ objectFit: 'cover', borderRadius: 12 }}
              sizes="(max-width: 900px) 100vw, 500px"
            />
          </div>
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            margin: '0 auto',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(34,34,34,0.08)',
            padding: '32px 24px 24px 24px',
            maxWidth: 320,
            zIndex: 2,
            marginBottom: 32,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>RUGS</h3>
            <p style={{ fontSize: 15, color: '#111', marginBottom: 18 }}>Elegant rugs that balance light and privacy.</p>
            <button style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '12px 28px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(34,34,34,0.10)',
              transition: 'background 0.2s',
            }}
            onClick={() => window.location.href = '/shop/all_rugs'}
            >SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThrowAndCurtainSection;
