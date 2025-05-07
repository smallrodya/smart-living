'use client';
import React, { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setIsVisible(true);
      }
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'true');
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner} role="alert">
      <div className={styles.content}>
        <div className={styles.text}>
          <h3>Cookie Notice</h3>
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, 
            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className={styles.buttons}>
          <button 
            onClick={acceptCookies} 
            className={styles.acceptButton}
            aria-label="Accept cookies"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner; 