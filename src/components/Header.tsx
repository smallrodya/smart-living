'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileHeader from './MobileHeader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
      setIsAuthenticated(!!userCookie);
    };

    checkAuth();
  }, []);

  if (isMobile) {
    return <MobileHeader />;
  }

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push('/user/Myaccount');
    } else {
      router.push('/user/login');
    }
  };

  return (
    <header style={{ 
      padding: '0', 
      borderBottom: '1px solid #eee', 
      background: '#fff', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: 80, 
        padding: '0 24px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
          <Link 
            href="/"
            style={{
              display: 'block',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <Image 
              src="/SmartLivingLogo.png" 
              alt="Smart Living" 
              width={250}
              height={50}
              style={{ maxWidth: '250px' }}
            />
          </Link>
          <form 
            role="search" 
            method="get" 
            className="searchform" 
            action="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              flex: 1,
              maxWidth: '400px',
              position: 'relative'
            }}
          >
            <input 
              type="text" 
              className="s" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              name="s" 
              aria-label="Search" 
              title="Search for products" 
              required 
              style={{ 
                padding: '8px 16px',
                width: '100%',
                border: '1px solid #eee',
                borderRadius: '20px',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease',
                outline: 'none',
                background: '#f8f8f8',
                height: '36px'
              }}
              onFocus={(e) => {
                e.target.style.background = '#fff';
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                e.target.style.borderColor = '#ddd';
              }}
              onBlur={(e) => {
                e.target.style.background = '#f8f8f8';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.03)';
                e.target.style.borderColor = '#eee';
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e53935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
            <input type="hidden" name="post_type" value="product" />
          </form>
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          alignItems: 'center'
        }}>
          <Link 
            href={isAuthenticated ? "/user/Myaccount" : "/user/login"}
            onClick={handleProfileClick}
            style={{ 
              color: '#000',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              width: 44,
              height: 44
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
          <Link 
            href="/basket" 
            style={{ 
              color: '#000',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              width: 44,
              height: 44
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </Link>
          <Link 
            href="/wishlist" 
            style={{ 
              color: '#000',
              textDecoration: 'none',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              width: 44,
              height: 44
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </Link>
          <a 
            href="/track-order" 
            style={{ 
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '160px',
              width: '100%',
              '--button-bg': '#000',
              '--button-hover-bg': '#333',
              '--animation-duration': '1.5s',
              '--car-size': '24px',
              '--car-start': '-30px',
              '--car-end': 'calc(100% + 30px)',
              '--car-center': '50%',
              '--car-scale': '1',
              '--car-scale-large': '1.2',
              transition: 'background-color 0.3s ease',
              backgroundColor: 'var(--button-bg)'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              const button = e.currentTarget;
              if (!button.dataset.animating) {
                button.dataset.animating = 'true';
                button.style.background = 'var(--button-hover-bg)';
                
                // Сбрасываем анимацию при каждом наведении
                const car = button.querySelector('img');
                const text = button.querySelector('span');
                
                if (car && text) {
                  // Сбрасываем стили
                  car.style.animation = 'none';
                  text.style.animation = 'none';
                  
                  // Принудительный reflow
                  void car.offsetWidth;
                  void text.offsetWidth;
                  
                  // Запускаем анимации
                  car.style.animation = 'carAnimation var(--animation-duration) ease-in-out forwards';
                  text.style.animation = 'textAnimation var(--animation-duration) ease-in-out forwards';
                  
                  // Сбрасываем флаг анимации после её завершения
                  setTimeout(() => {
                    delete button.dataset.animating;
                    button.style.background = 'var(--button-bg)';
                  }, 1500);
                }
              }
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget;
              if (!button.dataset.animating) {
                const car = button.querySelector('img');
                const text = button.querySelector('span');
                
                if (car && text) {
                  car.style.animation = 'none';
                  text.style.animation = 'none';
                  button.style.background = 'var(--button-bg)';
                }
              }
            }}
          >
            <span style={{
              display: 'inline-block',
              position: 'relative',
              zIndex: 1,
              width: '100%',
              textAlign: 'center',
              opacity: 1,
              transform: 'translateX(0)'
            }}>
              Track Order
            </span>
            <Image 
              src="/car-svgrepo-com.svg"
              alt="Car"
              width={24}
              height={24}
              style={{
                position: 'absolute',
                left: 'var(--car-start)',
                opacity: 1,
                transform: 'scale(var(--car-scale))',
                filter: 'invert(1)',
                zIndex: 2,
                pointerEvents: 'none',
                width: 'var(--car-size)',
                height: 'var(--car-size)'
              }}
            />
            <style jsx>{`
              @keyframes carAnimation {
                0% {
                  left: var(--car-start);
                  transform: scale(0.8);
                }
                10% {
                  transform: scale(1);
                }
                40% {
                  left: var(--car-center);
                  transform: translateX(-50%) scale(1);
                }
                50% {
                  transform: translateX(-50%) scale(1.2);
                }
                60% {
                  transform: translateX(-50%) scale(1);
                }
                100% {
                  left: var(--car-end);
                  transform: translateX(-50%) scale(1);
                }
              }

              @keyframes textAnimation {
                0% {
                  opacity: 1;
                  transform: translateX(0);
                }
                10% {
                  opacity: 0;
                  transform: translateX(100px);
                }
                90% {
                  opacity: 0;
                  transform: translateX(100px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
            `}</style>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 