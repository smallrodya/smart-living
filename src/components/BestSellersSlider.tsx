'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Heart, Star, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickViewModal from './QuickViewModal';
import MobileQuickViewModal from './MobileQuickViewModal';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  images?: string[];
  discount?: number;
  isBestSeller?: boolean;
  category: string;
  subcategory: string;
  features?: string[];
  sku?: string;
  beddingSizes?: Array<{ size: string; price: number; salePrice: number }>;
  rugsMatsSizes?: Array<{ size: string; price: number; salePrice: number }>;
  throwsTowelsStylePrices?: Array<{ size: string; price: number; salePrice: number }>;
  curtainsSizes?: Array<{ size: string; price: number; salePrice: number }>;
  clothingStylePrices?: Array<{ size: string; price: number; salePrice: number }>;
  footwearSizes?: Array<{ size: string; price: number; salePrice: number }>;
  outdoorPrice?: { sku: string; regularPrice: number; salePrice: number; stock: number };
}

interface WishlistItem {
  id: string;
  src: string;
  hoverSrc: string;
  title: string;
  price: string;
  discount: string;
  sizes?: {
    single: boolean;
    double: boolean;
    king: boolean;
  };
}

const BestSellersSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [starParams, setStarParams] = useState<
    { size: number; top: number; left: number; delay: number }[]
  >([]);

  useEffect(() => {
    fetchBestSellers();
    checkMobile();
  }, []);

  useEffect(() => {
    const node = titleRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log('Products state updated:', products);
    console.log('Products with isBestSeller:', products.filter(p => p.isBestSeller));
  }, [products]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        size: 4 + Math.random() * 4,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
      });
    }
    setStarParams(arr);
  }, []);

  // Wishlist: загрузка из localStorage при монтировании (safe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem('wishlist');
        if (stored) {
          const arr = JSON.parse(stored);
          if (Array.isArray(arr)) {
            setWishlist(arr);
          } else {
            setWishlist([]);
          }
        }
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  // Wishlist: сохранять в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const fetchBestSellers = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        // Проверяем структуру ответа и извлекаем массив продуктов
        const allProducts = data.products || data || [];
        console.log('All products:', allProducts);
        console.log('All products length:', allProducts.length);
        
        const bestSellers = allProducts.filter((product: Product) => product.isBestSeller);
        console.log('Best sellers found:', bestSellers);
        console.log('Best sellers length:', bestSellers.length);
        
        setProducts(bestSellers);
      } else {
        console.error('Failed to fetch products:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMinPrices = (product: Product) => {
    let salePrices: number[] = [];
    let regularPrices: number[] = [];
    if (product.beddingSizes && product.beddingSizes.length > 0) {
      salePrices = product.beddingSizes.map(s => typeof s.salePrice === 'number' ? s.salePrice : (typeof s.price === 'number' ? s.price : 0));
      regularPrices = product.beddingSizes.map(s => typeof (s as any).regularPrice === 'number' ? (s as any).regularPrice : (typeof s.price === 'number' ? s.price : 0));
    } else if (product.rugsMatsSizes && product.rugsMatsSizes.length > 0) {
      salePrices = product.rugsMatsSizes.map(s => typeof s.salePrice === 'number' ? s.salePrice : (typeof s.price === 'number' ? s.price : 0));
      regularPrices = product.rugsMatsSizes.map(s => typeof (s as any).regularPrice === 'number' ? (s as any).regularPrice : (typeof s.price === 'number' ? s.price : 0));
    } else if (product.throwsTowelsStylePrices && product.throwsTowelsStylePrices.length > 0) {
      salePrices = product.throwsTowelsStylePrices.map(s => typeof s.salePrice === 'number' ? s.salePrice : (typeof s.price === 'number' ? s.price : 0));
      regularPrices = product.throwsTowelsStylePrices.map(s => typeof (s as any).regularPrice === 'number' ? (s as any).regularPrice : (typeof s.price === 'number' ? s.price : 0));
    } else if (product.curtainsSizes && product.curtainsSizes.length > 0) {
      salePrices = product.curtainsSizes.map(s => typeof s.salePrice === 'number' ? s.salePrice : (typeof s.price === 'number' ? s.price : 0));
      regularPrices = product.curtainsSizes.map(s => typeof (s as any).regularPrice === 'number' ? (s as any).regularPrice : (typeof s.price === 'number' ? s.price : 0));
    } else if (product.clothingStylePrices && product.clothingStylePrices.length > 0) {
      salePrices = product.clothingStylePrices.map(s => typeof s.salePrice === 'number' ? s.salePrice : (typeof s.price === 'number' ? s.price : 0));
      regularPrices = product.clothingStylePrices.map(s => typeof (s as any).regularPrice === 'number' ? (s as any).regularPrice : (typeof s.price === 'number' ? s.price : 0));
    } else if (product.footwearSizes && product.footwearSizes.length > 0) {
      salePrices = product.footwearSizes.map(s => typeof s.salePrice === 'number' ? s.salePrice : (typeof s.price === 'number' ? s.price : 0));
      regularPrices = product.footwearSizes.map(s => typeof (s as any).regularPrice === 'number' ? (s as any).regularPrice : (typeof s.price === 'number' ? s.price : 0));
    } else if (product.outdoorPrice) {
      salePrices = [product.outdoorPrice.salePrice];
      regularPrices = [product.outdoorPrice.regularPrice];
    }
    if (salePrices.length === 0) return { sale: 0, regular: 0 };
    return {
      sale: Math.min(...salePrices),
      regular: Math.min(...regularPrices.length ? regularPrices : salePrices),
    };
  };

  const formatPriceRange = (product: Product) => {
    if (product.price) return product.price;
    
    let prices: number[] = [];
    
    if (product.beddingSizes && product.beddingSizes.length > 0) {
      prices = product.beddingSizes.map(size => size.salePrice || size.price);
    } else if (product.rugsMatsSizes && product.rugsMatsSizes.length > 0) {
      prices = product.rugsMatsSizes.map(size => size.salePrice || size.price);
    } else if (product.throwsTowelsStylePrices && product.throwsTowelsStylePrices.length > 0) {
      prices = product.throwsTowelsStylePrices.map(size => size.salePrice || size.price);
    } else if (product.curtainsSizes && product.curtainsSizes.length > 0) {
      prices = product.curtainsSizes.map(size => size.salePrice || size.price);
    } else if (product.clothingStylePrices && product.clothingStylePrices.length > 0) {
      prices = product.clothingStylePrices.map(size => size.salePrice || size.price);
    } else if (product.footwearSizes && product.footwearSizes.length > 0) {
      prices = product.footwearSizes.map(size => size.salePrice || size.price);
    } else if (product.outdoorPrice) {
      prices = [product.outdoorPrice.salePrice];
    }
    
    if (prices.length === 0) return '£0';
    if (prices.length === 1) return `£${prices[0]}`;
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return minPrice === maxPrice ? `£${minPrice}` : `£${minPrice} - £${maxPrice}`;
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find((item: any) => item.id === product._id);
      let newArr;
      if (exists) {
        newArr = prev.filter((item: any) => item.id !== product._id);
      } else {
        newArr = [
          ...prev,
          {
            id: product._id,
            title: product.title,
            price: formatPriceRange(product),
            image: product.images?.[0] || '',
            discount: product.discount ? `-${product.discount}%` : '',
          }
        ];
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wishlist', JSON.stringify(newArr));
      }
      return newArr;
    });
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleProductClick = (product: Product) => {
    let route = '/shop';
    
    if (product.category === 'BEDDING') {
      if (product.subcategory === 'Duvet Cover Sets') {
        route = '/shop/duvet-set-by-type';
      } else if (product.subcategory === 'Fitted Sheets') {
        route = '/shop/fitted-sheets';
      } else if (product.subcategory === 'Complete Bedding Sets') {
        route = '/shop/complete-bedding-sets';
      }
    } else if (product.category === 'RUGS & MATS') {
      if (product.subcategory === 'Carved Rugs') {
        route = '/shop/carved-rugs';
      } else if (product.subcategory === 'Shaggy Rugs') {
        route = '/shop/shaggy-rugs';
      }
    } else if (product.category === 'THROWS & TOWELS') {
      route = '/shop/throws-towels';
    } else if (product.category === 'OUTDOOR') {
      route = '/shop/outdoor';
    } else if (product.category === 'CURTAINS') {
      route = '/shop/curtains';
    } else if (product.category === 'CLOTHING') {
      route = '/shop/clothing';
    } else if (product.category === 'FOOTWEAR') {
      route = '/shop/footwear';
    }
    
    window.location.href = route;
  };

  const productsPerPage = 8; // 4 products per row, 2 rows
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <>
      <section 
        className="py-16 overflow-hidden"
        style={{
          background: '#090b1a',
          position: 'relative',
        }}
      >
        {/* Звездный фон */}
        <div id="bestseller-stars-bg" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          <div className="stars-container" style={{ position: "relative", height: "100%", width: "100%" }}>
            {starParams.map((star, i) => (
              <div
                key={i}
                className="star"
                style={{
                  width: star.size,
                  height: star.size,
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  animationDelay: `${star.delay}s`,
                  pointerEvents: "none",
                  position: "absolute",
                }}
              />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={titleVisible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -180 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
                className="star-left"
              >
                <Star className="w-12 h-12 text-yellow-400 mr-3" />
              </motion.div>
              <motion.h2 
                className="text-4xl font-bold text-white relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={titleVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                Best Sellers
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
                      animation: 'bestSellersUnderline 1.2s ease-out 1.8s forwards',
                    }}
                  />
                )}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                animate={titleVisible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: 180 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
                className="star-right"
              >
                <Star className="w-12 h-12 text-yellow-400 ml-3" />
              </motion.div>
            </div>
            <motion.p 
              className="text-lg text-white max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
              Discover our most popular products loved by customers worldwide
            </motion.p>
          </motion.div>
          <style>{`
            .star-left, .star-right {
              animation: starGlow 2s ease-in-out infinite alternate;
            }
            .star-left { animation-delay: 0s; }
            .star-right { animation-delay: 1s; }
            @keyframes starGlow {
              0% { filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.3)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.2)); transform: scale(1) rotate(0deg); }
              50% { filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.7)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.3)); transform: scale(1.15) rotate(3deg); }
              100% { filter: drop-shadow(0 0 18px rgba(255, 215, 0, 1)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 45px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.4)); transform: scale(1.25) rotate(-2deg); }
            }
            @keyframes bestSellersUnderline {
              0% { width: 0; opacity: 0; }
              50% { opacity: 1; }
              100% { width: 110%; opacity: 1; }
            }
            #bestseller-stars-bg {
              pointer-events: none;
              z-index: 0;
            }
            #bestseller-stars-bg .star {
              position: absolute;
              border-radius: 50%;
              background: white;
              opacity: 0.85;
              box-shadow: 0 0 12px 4px #fff, 0 0 32px 8px #fff2;
              animation: twinkle 1.6s infinite alternate;
            }
            @keyframes twinkle {
              0% { opacity: 0.45; filter: blur(0.5px); }
              50% { opacity: 1; filter: blur(2.5px); }
              100% { opacity: 0.7; filter: blur(0.5px); }
            }
          `}</style>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                >
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && products.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-lg text-gray-600 mb-4">No best sellers available at the moment.</p>
              <p className="text-sm text-gray-500">Check back soon for our featured products!</p>
            </motion.div>
          )}

          {/* Products Grid */}
          {!isLoading && products.length > 0 && (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.13)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1.5px solid rgba(255,255,255,0.18)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                      }}
                      onMouseEnter={() => setHoveredProduct(product._id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Product Image */}
                      <div
                        className="relative aspect-square overflow-hidden bg-gray-100"
                        onClick={() => handleQuickView(product)}
                        style={{ cursor: 'pointer' }}
                      >
                        {product.images && product.images.length > 0 && (
                          <>
                            <motion.img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-full h-full object-cover"
                              animate={{
                                opacity: hoveredProduct === product._id && product.images && product.images.length > 1 ? 0 : 1
                              }}
                              transition={{ duration: 0.3 }}
                            />
                            {product.images[1] && (
                              <motion.img
                                src={product.images[1]}
                                alt={product.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: hoveredProduct === product._id ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </>
                        )}
                        
                        {/* Overlay with actions */}
                        <motion.div
                          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: hoveredProduct === product._id ? 1 : 0
                          }}
                        >
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(product);
                              }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                wishlist.find((item: any) => item.id === product._id)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                              }`}
                            >
                              <Heart className={`w-5 h-5 ${wishlist.find((item: any) => item.id === product._id) ? 'fill-current' : ''}`} />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickView(product);
                              }}
                              className="w-10 h-10 rounded-full bg-white text-gray-600 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300"
                            >
                              <Eye className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* Discount badge */}
                        {product.discount && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                          >
                            -{product.discount}%
                          </motion.div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <motion.h3
                          className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          onClick={() => handleQuickView(product)}
                          style={{ cursor: 'pointer' }}
                        >
                          {product.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm text-white/90 mb-3 line-clamp-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {product.description}
                        </motion.p>
                        <motion.div
                          className="flex items-center justify-between"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <span className="text-xl font-bold text-white">
                            {(() => {
                              const { sale, regular } = getMinPrices(product);
                              if (sale < regular) {
                                return <>
                                  <span style={{ color: '#e53935', fontWeight: 700 }}>£{sale.toFixed(2)}</span>
                                  <span style={{ color: '#bbb', textDecoration: 'line-through', marginLeft: 8, fontSize: 16, fontWeight: 500 }}>£{regular.toFixed(2)}</span>
                                </>;
                              } else {
                                return <span style={{ color: '#fff', fontWeight: 700 }}>£{regular.toFixed(2)}</span>;
                              }
                            })()}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-white/70 ml-1">(4.8)</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevPage}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentPage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentPage === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextPage}
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* QuickView Modals */}
      {quickViewProduct && (
        isMobile ? (
          <MobileQuickViewModal
            product={quickViewProduct as any}
            onClose={() => setQuickViewProduct(null)}
          />
        ) : (
          <QuickViewModal
            product={quickViewProduct as any}
            onClose={() => setQuickViewProduct(null)}
          />
        )
      )}
    </>
  );
};

export default BestSellersSlider; 