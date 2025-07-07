import React, { useState, useRef, useEffect } from 'react';
import { FaTruck, FaUndo, FaCreditCard, FaHeadset } from 'react-icons/fa';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobileFeaturesSection from './MobileFeaturesSection';

const FeaturesSection = () => {
  const isMobile = useIsMobile();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      icon: <FaUndo className="w-8 h-8" />,
      title: 'FREE RETURNS',
      description: '30-days full free return policy',
      gradient: 'from-purple-500 to-purple-600',
      details: [
        'No questions asked returns',
        'Free return shipping',
        'Quick refund processing'
      ]
    },
    {
      icon: <FaCreditCard className="w-8 h-8" />,
      title: 'SECURED PAYMENTS',
      description: 'We accept all payment methods',
      gradient: 'from-emerald-500 to-emerald-600',
      details: [
        'SSL encrypted payments',
        'Multiple payment options',
        'Secure checkout process'
      ]
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: 'HELP CENTER',
      description: 'Dedicated 10:30 - 18:00 support',
      gradient: 'from-rose-500 to-rose-600',
      details: [
        'Live chat support',
        'Email assistance',
        'Phone support available'
      ]
    }
  ];

  if (isMobile) return <MobileFeaturesSection />;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 48 }}>
          <h2
            ref={titleRef}
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#1a1a1a',
              marginBottom: 18,
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
              100% { width: 30%; opacity: 1; }
            }
          `}</style>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})`,
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                }} 
              />
              <div 
                className="relative p-8 transition-all duration-500 border border-gray-100"
                style={{
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: hoveredIndex === index ? '0 12px 40px 0 rgba(31,38,135,0.13)' : '0 4px 24px rgba(160,132,232,0.07)',
                  transform: hoveredIndex === index ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                }}
              >
                <div 
                  className={`inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 transition-transform duration-500`}
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div 
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: hoveredIndex === index ? '200px' : '0',
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                >
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection; 