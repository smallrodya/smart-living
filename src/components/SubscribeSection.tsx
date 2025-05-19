'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './SubscribeSection.module.css';
import MobileSubscribeSection from './MobileSubscribeSection';

const SubscribeSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileSubscribeSection />;
  }

  return (
    <section id="subscribe" className={styles.subscribeSection}>
      <div style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: 40
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 12,
          letterSpacing: 0.2,
          color: '#222'
        }}>
          Stay Connected
        </h2>
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
        maxWidth: 500,
        background: '#fff',
        borderRadius: 14,
        padding: '40px 32px',
        textAlign: 'left',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        marginRight: 'auto'
      }}>
      <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 14}}>Subscribe to News and Offers</h2>
      <p style={{marginBottom: 22, color: '#444'}}>Be the first to know about discounts and new products!</p>
        <form style={{display: 'flex', gap: 12}}>
          <input 
            type="email" 
            placeholder="Your email" 
            required 
            style={{
              padding: '12px 18px',
              borderRadius: 7,
              border: '1.5px solid #ccc',
              fontSize: 16,
              flex: 1
            }} 
          />
        <button
          type="submit"
          style={{
            padding: '12px 28px',
            borderRadius: 7,
            background: hovered ? '#222' : '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.18s',
              whiteSpace: 'nowrap'
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >Subscribe</button>
      </form>
      </div>

      <div style={{
        flex: 1,
        background: '#fff',
        borderRadius: 14,
        padding: 40,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        marginLeft: 'auto'
      }}>
        <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 24}}>Payment Methods</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Apple_Pay_logo.svg.png"
              alt="Apple Pay"
              width={80}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Google_Pay_Logo.svg.png"
              alt="Google Pay"
              width={80}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Mastercard-logo.svg.png"
              alt="Mastercard"
              width={80}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Visa_2021.svg.png"
              alt="Visa"
              width={80}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/PayPal_logo.svg.png"
              alt="PayPal"
              width={80}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src="/Amazon_Pay_logo.svg.png"
              alt="Amazon Pay"
              width={80}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection; 