'use client';
import React, { useState } from 'react';
import { FaHeadset, FaTimes, FaPaperPlane, FaShoppingBag, FaTruck, FaTools, FaEllipsisH } from 'react-icons/fa';

const TechSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'order', label: 'Order', icon: <FaShoppingBag className="w-5 h-5" /> },
    { id: 'delivery', label: 'Delivery', icon: <FaTruck className="w-5 h-5" /> },
    { id: 'tech', label: 'Tech Support', icon: <FaTools className="w-5 h-5" /> },
    { id: 'other', label: 'Other', icon: <FaEllipsisH className="w-5 h-5" /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Кнопка поддержки */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'scale-90' : 'scale-100'
        }`}
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
        }}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <div className="relative">
            <FaHeadset className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Окно чата */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300">
          {/* Заголовок чата */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FaHeadset className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Technical Support</h3>
                <p className="text-sm opacity-90">We're here to help!</p>
              </div>
            </div>
          </div>

          {/* Категории обращений */}
          <div className="p-4 bg-white border-b">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gray-800 text-white shadow-lg scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.icon}
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Тело чата */}
          <div className="h-80 overflow-y-auto p-5 bg-gray-50">
            <div className="space-y-4">
              {/* Приветственное сообщение */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <FaHeadset className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-3 max-w-[80%]">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-base text-gray-800">
                      {selectedCategory 
                        ? `How can we help you with your ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}?`
                        : "Please select a category to continue"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Форма отправки сообщения */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={selectedCategory ? "Type your message..." : "Please select a category first"}
                disabled={!selectedCategory}
                className={`flex-1 border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:border-gray-800 text-base ${
                  !selectedCategory ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
              />
              <button
                type="submit"
                disabled={!selectedCategory}
                className={`bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-full transition-all duration-300 ${
                  selectedCategory 
                    ? 'hover:shadow-lg hover:scale-105' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TechSupport; 