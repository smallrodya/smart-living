import React, { useRef, useEffect, useState } from 'react';
import { FaTruck, FaUndo, FaCreditCard, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaTruck className="w-8 h-8" />,
    title: 'FREE SHIPPING',
    description: 'Free Shipping Across the UK Mainland',
    gradient: 'from-blue-500 to-blue-600',
    details: [
      'Standard Delivery: 2–5 Working Days',
      'Express Delivery: Available at checkout',
    ]
  },
  {
    icon: <FaUndo className="w-7 h-7" />,
    title: 'FREE RETURNS',
    description: '30-days full free return policy',
    details: [
      'No questions asked returns',
      'Free return shipping',
      'Quick refund processing'
    ]
  },
  {
    icon: <FaCreditCard className="w-7 h-7" />,
    title: 'SECURED PAYMENTS',
    description: 'We accept all payment methods',
    details: [
      'SSL encrypted payments',
      'Multiple payment options',
      'Secure checkout process'
    ]
  },
  {
    icon: <FaHeadset className="w-7 h-7" />,
    title: 'HELP CENTER',
    description: 'Dedicated 10:30 - 18:00 support',
    details: [
      'Live chat support',
      'Email assistance',
      'Phone support available'
    ]
  }
];

const MobileFeaturesSection = () => {
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
      { threshold: 0.5 }
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
    <div style={{
      background: 'linear-gradient(120deg, #f8fafc 0%, #e9e4f0 100%)',
      padding: '32px 0',
      width: '100%',
    }}>
      <div style={{ width: '100%', textAlign: 'center', marginBottom: 32 }}>
        <h2
          ref={titleRef}
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#1a1a1a',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 0.2,
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {Array.from('Why Choose Us').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(50px) scale(0.5)',
                animation: titleVisible
                  ? `charIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards ${i * 0.08 + 0.2}s`
                  : 'none',
                backgroundImage: titleVisible 
                  ? 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)'
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
                animation: 'featuresUnderline 1.2s ease-out 1.5s forwards',
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
          @keyframes featuresUnderline {
            0% { width: 0; opacity: 0; }
            50% { opacity: 1; }
            100% { width: 70%; opacity: 1; }
          }
        `}</style>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        maxWidth: 440,
        margin: '0 auto',
        padding: '0 8px',
      }}>
        {features.map((feature, idx) => (
          <div key={idx} style={{
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1.2px solid rgba(200,200,255,0.13)',
            borderRadius: 18,
            boxShadow: '0 2px 12px rgba(160,132,232,0.07)',
            padding: '16px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: 160,
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #a084e8 0%, #fcaeae 100%)',
              borderRadius: 12,
              padding: 10,
              marginBottom: 10,
              color: '#fff',
              fontSize: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, color: '#1a1a1a' }}>{feature.title}</h3>
            <p style={{ fontSize: 12, color: '#444', marginBottom: 6 }}>{feature.description}</p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              color: '#666',
              fontSize: 11,
              lineHeight: 1.5,
            }}>
              {feature.details.map((detail, i) => (
                <li key={i} style={{ marginBottom: 3 }}>
                  <span style={{ display: 'inline-block', width: 5, height: 5, background: '#bdbdbd', borderRadius: '50%', marginRight: 5, verticalAlign: 'middle' }}></span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileFeaturesSection; 