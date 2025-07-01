import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const clothingOptions = [
  {
    label: "Men's Clothing",
    href: "/shop/clothing-men",
    image: "/mens-clothing.jpg", // Используй свои реальные фото
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v2"/></svg>
    )
  },
  {
    label: "Women's Clothing",
    href: "/shop/clothing-women",
    image: "/womens-clothing.jpg", // Используй свои реальные фото
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M17 21v-2a5 5 0 0 0-10 0v2"/><path d="M12 11v10"/></svg>
    )
  }
];

export default function ClothingSection() {
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
      padding: '0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f6 100%)',
      margin: 0,
      minHeight: 420,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h2
        ref={titleRef}
        className="clothing-title"
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#222',
          margin: '48px 0 12px 0',
          letterSpacing: 0.2,
          textAlign: 'center',
          lineHeight: 1.2,
          position: 'relative',
        }}
      >
        {Array.from('Shop Clothing').map((char, i) => (
          <span
            key={i}
            className={titleVisible ? 'char-animate' : ''}
            style={{
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(50px) scale(0.5)',
              animation: titleVisible
                ? `charIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards ${i * 0.08 + 0.2}s`
                : 'none',
              backgroundImage: titleVisible 
                ? 'linear-gradient(135deg, #222 0%, #4a4a4a 50%, #222 100%)'
                : 'none',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: titleVisible ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {titleVisible && (
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 3,
              background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
              animation: 'clothingUnderline 1.2s ease-out 1.5s forwards',
            }}
          />
        )}
      </h2>
      <style>{`
        @keyframes charIn {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.5) rotateX(-90deg);
            filter: blur(10px);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-10px) scale(1.1) rotateX(10deg);
            filter: blur(2px);
          }
          80% {
            opacity: 1;
            transform: translateY(5px) scale(1.05) rotateX(-2deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes clothingUnderline {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 300%;
            opacity: 1;
          }
        }
      `}</style>
      <p style={{
        fontSize: 18,
        color: '#5a5a5a',
        marginBottom: 36,
        maxWidth: 600,
        textAlign: 'center',
        fontFamily: 'inherit',
        fontWeight: 400,
        lineHeight: 1.6,
      }}>
        Choose men's or women's clothing — stylish collections for every season and look.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 40,
        width: '100%',
        maxWidth: 1400,
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '0 auto 64px auto',
      }}>
        {clothingOptions.map(option => (
          <Link
            key={option.label}
            href={option.href}
            style={{
              flex: '1 1 480px',
              minWidth: 340,
              maxWidth: 600,
              height: 340,
              borderRadius: 32,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              boxShadow: '0 8px 32px rgba(34,34,34,0.13)',
              background: '#222',
              textDecoration: 'none',
              margin: '0 0 0 0',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.025)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(34,34,34,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,34,34,0.13)';
            }}
          >
            <img
              src={option.image}
              alt={option.label}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1,
                transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
                filter: 'brightness(0.72) saturate(1.1)',
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(0deg, rgba(34,34,34,0.55) 60%, rgba(34,34,34,0.18) 100%)',
              zIndex: 2,
            }} />
            <div style={{
              position: 'relative',
              zIndex: 3,
              padding: '38px 38px 38px 38px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              height: '100%',
              width: '100%',
            }}>
              <div style={{ marginBottom: 18 }}>{option.icon}</div>
              <span style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: 0.2,
                marginBottom: 12,
                textShadow: '0 2px 12px rgba(0,0,0,0.18)',
                lineHeight: 1.2,
              }}>{option.label}</span>
              <span style={{
                marginTop: 8,
                background: 'rgba(255,255,255,0.13)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 12,
                padding: '10px 28px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                textShadow: '0 1px 4px rgba(0,0,0,0.10)',
                transition: 'background 0.2s',
                display: 'inline-block',
                letterSpacing: 0.2,
                lineHeight: 1.2,
              }}>
                Shop now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 