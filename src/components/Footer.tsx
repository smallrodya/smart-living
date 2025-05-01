import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer style={{
    padding: '64px 0 32px',
    background: '#181818',
    color: '#fff',
    marginTop: 60,
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      padding: '0 24px',
      borderBottom: '1px solid #333',
      paddingBottom: 40
    }}>
      <div>
        <div style={{fontWeight: 700, fontSize: 24, marginBottom: 20}}>Smart Living</div>
        <div style={{color: '#aaa', fontSize: 15, lineHeight: 1.6}}>
          Your one-stop destination for stylish and affordable home essentials. Quality products for every room in your home.
        </div>
      </div>

      <div>
        <div style={{fontWeight: 600, fontSize: 16, marginBottom: 20}}>Shop</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Link href="/categories/bedding" style={{color: '#fff', textDecoration: 'none'}}>Bedding</Link>
          <Link href="/categories/rugs" style={{color: '#fff', textDecoration: 'none'}}>Rugs & Mats</Link>
          <Link href="/categories/throws" style={{color: '#fff', textDecoration: 'none'}}>Throws & Towels</Link>
          <Link href="/categories/outdoor" style={{color: '#fff', textDecoration: 'none'}}>Outdoor</Link>
          <Link href="/categories/curtains" style={{color: '#fff', textDecoration: 'none'}}>Curtains</Link>
        </div>
      </div>

      <div>
        <div style={{fontWeight: 600, fontSize: 16, marginBottom: 20}}>Customer Service</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Link href="/contact" style={{color: '#fff', textDecoration: 'none'}}>Contact Us</Link>
          <Link href="/track-order" style={{color: '#fff', textDecoration: 'none'}}>Track Order</Link>
          <Link href="/returns" style={{color: '#fff', textDecoration: 'none'}}>Returns & Exchanges</Link>
          <Link href="/faq" style={{color: '#fff', textDecoration: 'none'}}>FAQ</Link>
          <Link href="/shipping" style={{color: '#fff', textDecoration: 'none'}}>Shipping Info</Link>
        </div>
      </div>

      <div>
        <div style={{fontWeight: 600, fontSize: 16, marginBottom: 20}}>About Us</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Link href="/about" style={{color: '#fff', textDecoration: 'none'}}>Our Story</Link>
          <Link href="/careers" style={{color: '#fff', textDecoration: 'none'}}>Careers</Link>
          <Link href="/privacy" style={{color: '#fff', textDecoration: 'none'}}>Privacy Policy</Link>
          <Link href="/terms" style={{color: '#fff', textDecoration: 'none'}}>Terms & Conditions</Link>
        </div>
      </div>

      <div>
        <div style={{fontWeight: 600, fontSize: 16, marginBottom: 20}}>Connect With Us</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Link href="https://facebook.com" style={{color: '#fff', textDecoration: 'none'}}>Facebook</Link>
          <Link href="https://instagram.com" style={{color: '#fff', textDecoration: 'none'}}>Instagram</Link>
          <Link href="https://pinterest.com" style={{color: '#fff', textDecoration: 'none'}}>Pinterest</Link>
          <Link href="https://twitter.com" style={{color: '#fff', textDecoration: 'none'}}>Twitter</Link>
        </div>
      </div>
    </div>

    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      textAlign: 'center',
      color: '#aaa',
      fontSize: 14,
      marginTop: 32,
      padding: '0 24px'
    }}>
      © {new Date().getFullYear()} Smart Living. All rights reserved.
    </div>
  </footer>
);

export default Footer; 