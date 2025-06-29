'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const ThrowAndCurtainSection = () => {
  const [hovered, setHovered] = useState<'bedding' | 'rugs' | null>(null);

  return (
    <section style={{
      width: '100%',
      padding: '60px 0 40px 0',
      background: '#fff',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 12,
        letterSpacing: 0.2,
      }}>
        Elevate Your Living Space with Elegance
      </h2>
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
