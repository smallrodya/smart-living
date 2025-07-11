'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBasket } from '@/context/BasketContext';

const MobileBottomMenu = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useBasket();

  useEffect(() => {
    const checkAuth = () => {
      const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
      setIsAuthenticated(!!userCookie);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isModalOpen) return;

      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      
      if (Math.abs(scrollDifference) > 5) {
        if (scrollDifference > 0) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isModalOpen]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          const modalOpen = document.body.style.position === 'fixed';
          setIsModalOpen(modalOpen);
          if (modalOpen) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push('/user/Myaccount');
    } else {
      router.push('/user/login');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderTop: '1px solid #eee',
      padding: '12px 0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease-in-out',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
    }}>
      <Link href="/track-order" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: pathname === '/track-order' ? '#e53935' : '#222',
        fontSize: 10,
        gap: 4,
        padding: '4px 8px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span>Track Order</span>
      </Link>

      <Link href="/wishlist" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: pathname === '/wishlist' ? '#e53935' : '#222',
        fontSize: 10,
        gap: 4,
        padding: '4px 8px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span>Wishlist</span>
      </Link>

      <Link href="/basket" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: pathname === '/basket' ? '#e53935' : '#222',
        fontSize: 10,
        gap: 4,
        padding: '4px 8px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        {items.length > 0 && (
          <span style={{
            position: 'absolute',
            top: 0,
            right: 2,
            minWidth: 16,
            height: 16,
            background: '#e53935',
            color: '#fff',
            borderRadius: '50%',
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            boxShadow: '0 2px 6px rgba(229,57,53,0.15)',
            zIndex: 2,
            lineHeight: 1,
          }}>{items.length}</span>
        )}
        <span>Basket</span>
      </Link>

      <Link 
        href={isAuthenticated ? "/user/Myaccount" : "/user/login"}
        onClick={handleAccountClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: pathname === '/user/login' || pathname === '/user/Myaccount' ? '#e53935' : '#222',
          fontSize: 10,
          gap: 4,
          padding: '4px 8px',
          borderRadius: '8px',
          transition: 'all 0.2s ease',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>My Account</span>
      </Link>
    </div>
  );
};

export default MobileBottomMenu; 