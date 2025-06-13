import React, { useState } from 'react';
import { FaTruck, FaUndo, FaCreditCard, FaHeadset } from 'react-icons/fa';

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: 'FREE SHIPPING',
      description: 'All over the United Kingdom space',
      gradient: 'from-blue-500 to-blue-600',
      details: [
        'Standard delivery 2-4 business days',
        'Express delivery available',
        'Free delivery over £50'
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

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})`,
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                }} 
              />
              <div 
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                style={{
                  transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)'
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