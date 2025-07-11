'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import QuickViewModal from '@/components/QuickViewModal';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface WishlistItem {
  id: string;
  name?: string;
  title?: string;
  price: string;
  image?: string;
  hoverImage?: string;
  src?: string;
  hoverSrc?: string;
  discount: string;
  color?: string;
  sizes?: {
    single: boolean;
    double: boolean;
    king: boolean;
    superKing?: boolean;
  };
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        setWishlistItems(items);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlistItems([]);
      }
    }
  }, []);

  const removeFromWishlist = async (id: string) => {
    setIsRemoving(id);
    // Add a small delay for animation
    setTimeout(() => {
      setWishlistItems(prev => {
        const newItems = prev.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(newItems));
        return newItems;
      });
      setIsRemoving(null);
    }, 300);
  };

  const getImageSrc = (item: WishlistItem, isHovered: boolean): string => {
    if (isHovered) {
      return item.hoverImage || item.hoverSrc || item.image || item.src || '/placeholder.jpg';
    }
    return item.image || item.src || '/placeholder.jpg';
  };

  const getItemName = (item: WishlistItem) => {
    return item.name || item.title || '';
  };

  // Function to clean price string (remove double £ symbols)
  const cleanPrice = (price: string) => {
    // Remove all £ symbols and add only one at the beginning
    const cleanPrice = price.replace(/£/g, '');
    return `£${cleanPrice}`;
  };

  // Function to open QuickView modal
  const openQuickView = async (item: WishlistItem) => {
    try {
      // Extract the real MongoDB ObjectId from the prefixed wishlist ID
      // Wishlist IDs have format like: "fleece_507f1f77bcf86cd799439011", "uk910_507f1f77bcf86cd799439011", etc.
      const realId = item.id.includes('_') ? item.id.split('_')[1] : item.id;
      
      // Fetch product details from API
      const response = await fetch(`/api/products/${realId}`);
      if (response.ok) {
        const product = await response.json();
        setSelectedProduct(product);
        setIsModalOpen(true);
      } else {
        console.error('Failed to fetch product details');
        // Show user-friendly error message
        alert('Unable to load product details. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Show user-friendly error message
      alert('Unable to load product details. Please try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[300px] flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 mr-8"
            >
              <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm group-hover:bg-white transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </div>
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  My Wishlist
                </h1>
                <p className="text-gray-600 font-medium">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-red-500"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  {/* Floating hearts animation */}
                  <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Start building your dream collection by adding items you love to your wishlist
                </p>
                
                <button
                  onClick={() => router.push('/')}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Start Shopping</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                    isRemoving === item.id ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImageSrc(item, hoveredItem === item.id)}
                      alt={getItemName(item)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Discount badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm px-3 py-2 rounded-full shadow-lg transform rotate-12">
                        {item.discount}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      {/* Remove button */}
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:shadow-xl transition-all duration-300 group/btn"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-red-500 group-hover/btn:text-red-600 transition-colors duration-300"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                      
                      {/* Add to cart button */}
                      <button
                        onClick={() => {/* Add to cart functionality */}}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-green-50 hover:shadow-xl transition-all duration-300 group/btn"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-gray-700 group-hover/btn:text-green-600 transition-colors duration-300"
                        >
                          <circle cx="9" cy="21" r="1"/>
                          <circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
                      {getItemName(item)}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-red-600">
                        {cleanPrice(item.price)}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        Free Shipping
                      </div>
                    </div>
                    
                    {/* Sizes */}
                    {item.sizes && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Sizes:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(item.sizes).map(([size, available]) => (
                            <div
                              key={size}
                              className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-300 ${
                                available 
                                  ? 'bg-green-50 text-green-700 border border-green-200' 
                                  : 'bg-gray-50 text-gray-400 border border-gray-200'
                              }`}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className={available ? 'text-green-600' : 'text-gray-400'}
                              >
                                {available ? (
                                  <path d="M20 6L9 17l-5-5"/>
                                ) : (
                                  <path d="M18 6L6 18M6 6l12 12"/>
                                )}
                              </svg>
                              <span className="font-medium">
                                {size === 'single' && 'Single'}
                                {size === 'double' && 'Double'}
                                {size === 'king' && 'King'}
                                {size === 'superKing' && 'Super King'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Quick action button */}
                    <button 
                      onClick={() => openQuickView(item)}
                      className="w-full mt-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* QuickView Modal */}
      {isModalOpen && selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={closeModal} 
        />
      )}
      
      <Footer />
      <CookieBanner />
    </>
  );
};

export default WishlistPage; 