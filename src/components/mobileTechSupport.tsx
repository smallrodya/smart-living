'use client';
import React, { useState, useEffect } from 'react';
import { FaHeadset, FaTimes, FaPaperPlane, FaShoppingBag, FaTruck, FaTools, FaEllipsisH } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

// Мобильная версия компонента технической поддержки
// Отличия: меньшая ширина, позиционирование над MobileBottomMenu, скрытие на десктопе

interface Message {
  _id: string;
  userId: string;
  text: string;
  createdAt: string;
  isAdmin: boolean;
}

interface Ticket {
  _id: string;
  userId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  subject: string;
  status: 'open' | 'in-progress' | 'closed';
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

function MobileTechSupport() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showUserForm, setShowUserForm] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const savedUserData = localStorage.getItem('supportUserData');
    const savedCategory = localStorage.getItem('supportCategory');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setShowUserForm(false);
    }
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('supportUserData', JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('supportCategory', selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && userData) {
      fetchTicketHistory();
    }
  }, [selectedCategory, userData]);

  useEffect(() => {
    if (currentTicket?._id) {
      const interval = setInterval(fetchTicketHistory, 5000);
      return () => clearInterval(interval);
    }
  }, [currentTicket?._id]);

  if (!isMobile) return null;

  const categories = [
    { id: 'order', label: 'Order', icon: <FaShoppingBag className="w-5 h-5" /> },
    { id: 'delivery', label: 'Delivery', icon: <FaTruck className="w-5 h-5" /> },
    { id: 'tech', label: 'Tech Support', icon: <FaTools className="w-5 h-5" /> },
    { id: 'other', label: 'Other', icon: <FaEllipsisH className="w-5 h-5" /> }
  ];

  const fetchTicketHistory = async () => {
    try {
      const response = await fetch('/api/support/tickets');
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const tickets = await response.json();
      const userTicket = tickets.find((ticket: Ticket) => 
        ticket.userEmail === userData?.email && 
        ticket.subject.toLowerCase().includes(selectedCategory?.toLowerCase() || '')
      );
      setCurrentTicket(userTicket || null);
    } catch (error) {
      setError('Failed to load messages');
    }
  };

  const handleUserDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
    };
    setUserData(data);
    setShowUserForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedCategory || !userData) return;
    setIsLoading(true);
    setError(null);
    try {
      if (!currentTicket) {
        const response = await fetch('/api/support/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            subject: `${selectedCategory} Support Request`,
            message: message,
          }),
        });
        if (!response.ok) throw new Error('Failed to create ticket');
        const newTicket = await response.json();
        setCurrentTicket(newTicket);
      } else {
        const response = await fetch('/api/support/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticketId: currentTicket._id,
            text: message,
            userEmail: userData.email,
          }),
        });
        if (!response.ok) throw new Error('Failed to send message');
      }
      setMessage('');
      fetchTicketHistory();
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[75px] right-4 z-[1100] w-80 max-w-[95vw] md:hidden block flex flex-col items-end">
      {/* Support Button */}
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

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-[60px] right-0 w-80 max-w-[95vw] bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 md:hidden block">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FaHeadset className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Tech Support</h3>
                <p className="text-xs opacity-90">We're here to help!</p>
              </div>
            </div>
          </div>

          {/* User Data Form */}
          {showUserForm && (
            <div className="p-3 bg-white">
              <form onSubmit={handleUserDataSubmit} className="space-y-3">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-800 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-800 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-800 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 px-4 rounded-md hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {/* Categories */}
          {!showUserForm && (
            <div className="p-3 bg-white border-b">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center justify-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gray-800 text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.icon}
                    <span className="font-medium text-xs">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Body */}
          {!showUserForm && (
            <div className="h-64 overflow-y-auto p-3 bg-gray-50">
              <div className="space-y-3">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mb-3 text-xs">
                    {error}
                  </div>
                )}
                {currentTicket?.messages?.map((msg) => (
                  <div 
                    key={msg._id} 
                    className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'} mb-3`}
                  >
                    <div className="flex flex-col max-w-[80%]">
                      <span className={`text-[10px] mb-1 ${msg.isAdmin ? 'text-gray-600' : 'text-indigo-600'}`}>{msg.isAdmin ? 'Manager' : 'User'}</span>
                      <div 
                        className={`$${
                          msg.isAdmin 
                            ? 'bg-gray-800 text-white rounded-lg rounded-bl-none' 
                            : 'bg-indigo-600 text-white rounded-lg rounded-br-none'
                        } p-3 shadow-sm`}
                      >
                        <p className="text-xs">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.isAdmin ? 'text-gray-300' : 'text-indigo-100'}`}>{new Date(msg.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {!currentTicket && selectedCategory && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <FaHeadset className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-2 max-w-[80%]">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-gray-800">
                          How can we help you with your {categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}?
                        </p>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message Form */}
          {!showUserForm && (
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={selectedCategory ? "Type your message..." : "Please select a category first"}
                  disabled={!selectedCategory || isLoading}
                  className={`flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-gray-800 text-xs ${
                    !selectedCategory || isLoading ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                />
                <button
                  type="submit"
                  disabled={!selectedCategory || isLoading}
                  className={`bg-gradient-to-r from-gray-800 to-gray-900 text-white p-2 rounded-full transition-all duration-300 ${
                    selectedCategory && !isLoading
                      ? 'hover:shadow-lg hover:scale-105' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileTechSupport; 