'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const MobileSubscribeSection = () => {
  const [hovered, setHovered] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = titleRef.current;
    if (!node) return;
    // Fallback: если элемент уже видим
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setTitleVisible(true);
      return;
    }
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
    // Таймер-фолбэк
    const timeout = setTimeout(() => {
      setTitleVisible(true);
      observer.disconnect();
    }, 800);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="subscribe" style={{
      width: '100%',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: 24
      }}>
        <h2 
          ref={titleRef}
          style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: 0.2,
            color: '#222',
            position: 'relative',
          }}
        >
          {Array.from('Stay Connected').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(50px) scale(0.5)',
                animation: titleVisible
                  ? `mobileSubscribeCharIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards ${i * 0.08 + 0.2}s`
                  : 'none',
                backgroundImage: titleVisible 
                  ? 'linear-gradient(135deg, #222 0%, #444 50%, #222 100%)'
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
                animation: 'mobileSubscribeUnderline 1.2s ease-out 1.5s forwards',
              }}
            />
          )}
        </h2>
        <style>{`
          @keyframes mobileSubscribeCharIn {
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
          
          @keyframes mobileSubscribeUnderline {
            0% {
              width: 0;
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              width: 70%;
              opacity: 1;
            }
          }
        `}</style>
        <p style={{
          fontSize: 17,
          color: '#666',
          maxWidth: 800,
          margin: '0 auto',
          lineHeight: 1.5
        }}>
          Join our community to receive exclusive offers, new product updates, and home decor inspiration
        </p>
      </div>
      <div style={{
        width: '100%',
        background: '#fff',
        borderRadius: 14,
        padding: '24px 16px',
        textAlign: 'left',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
      }}>
        <h2 style={{fontSize: 20, fontWeight: 700, marginBottom: 12}}>Subscribe to News and Offers</h2>
        <p style={{marginBottom: 20, color: '#444', fontSize: 14}}>Be the first to know about discounts and new products!</p>
        <form style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <input 
            type="email" 
            placeholder="Your email" 
            required 
            style={{
              padding: '12px 16px',
              borderRadius: 7,
              border: '1.5px solid #ccc',
              fontSize: 16,
              width: '100%'
            }} 
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: 7,
              background: hovered ? '#222' : '#111',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.18s',
              width: '100%'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >Subscribe</button>
        </form>
      </div>

      <div style={{
        width: '100%',
        background: '#fff',
        borderRadius: 14,
        padding: '24px 16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
      }}>
        <h2 style={{fontSize: 20, fontWeight: 700, marginBottom: 20}}>Payment Methods</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Apple_Pay_logo.svg.png"
              alt="Apple Pay"
              width={60}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Google_Pay_Logo.svg.png"
              alt="Google Pay"
              width={60}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Mastercard-logo.svg.png"
              alt="Mastercard"
              width={60}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Visa_2021.svg.png"
              alt="Visa"
              width={60}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/PayPal_logo.svg.png"
              alt="PayPal"
              width={60}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Amazon_Pay_logo.svg.png"
              alt="Amazon Pay"
              width={60}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileSubscribeSection; 