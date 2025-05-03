'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const MobileSubscribeSection = () => {
  const [hovered, setHovered] = useState(false);
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