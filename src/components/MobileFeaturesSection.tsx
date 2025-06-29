import React from 'react';
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
  return (
    <div style={{
      background: 'linear-gradient(120deg, #f8fafc 0%, #e9e4f0 100%)',
      padding: '32px 0',
      width: '100%',
    }}>
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