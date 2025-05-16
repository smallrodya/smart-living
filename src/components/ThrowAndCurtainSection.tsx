'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const ThrowAndCurtainSection = () => {
  const [hovered, setHovered] = useState<'throws' | 'curtains' | null>(null);

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
        Transform Your Home with Style
      </h2>
      <p style={{
        fontSize: 17,
        color: '#444',
        marginBottom: 40,
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Add a touch of comfort and style to every room with our throws and curtains.
      </p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 32,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Throws */}
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
          onMouseEnter={() => setHovered('throws')}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            transition: 'transform 0.35s cubic-bezier(.4,2,.6,1)',
            transform: hovered === 'throws' ? 'scale(1.06)' : 'scale(1)',
          }}>
            <Image
              src="/cat-throws-main.jpg"
              alt="Throws"
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
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(34,34,34,0.08)',
            padding: '32px 24px 24px 24px',
            maxWidth: 320,
            zIndex: 2,
            marginBottom: 32,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Throws</h3>
            <p style={{ fontSize: 15, color: '#444', marginBottom: 18 }}>Soft, stylish, and perfect for warmth or décor.</p>
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
            onClick={() => window.location.href = '/category/throws-blankets'}
            >SHOP NOW</button>
          </div>
        </div>
        {/* Curtains */}
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
          onMouseEnter={() => setHovered('curtains')}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            transition: 'transform 0.35s cubic-bezier(.4,2,.6,1)',
            transform: hovered === 'curtains' ? 'scale(1.06)' : 'scale(1)',
          }}>
            <Image
              src="/cat-curtains-main.jpg"
              alt="Curtains"
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
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(34,34,34,0.08)',
            padding: '32px 24px 24px 24px',
            maxWidth: 320,
            zIndex: 2,
            marginBottom: 32,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Curtains</h3>
            <p style={{ fontSize: 15, color: '#444', marginBottom: 18 }}>Elegant curtains that balance light and privacy.</p>
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
            onClick={() => window.location.href = '/category/curtains'}
            >SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThrowAndCurtainSection;
