"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { useRouter } from 'next/navigation';
import CategoriesSection from '@/components/CategoriesSection';
import QuickViewModal from '@/components/QuickViewModal';

export const dynamic = 'force-dynamic';

interface Product {
  _id: string;
  title: string;
  description: string;
  features: string;
  price: string;
  category: string;
  subcategory: string;
  sku: string;
  rugsMatsSizes: Array<{ size: string; price: number; salePrice: number }>;
  rugsMatsColors: string[];
  images?: string[];
  discount?: number;
  isSoldOut?: boolean;
  isHot?: boolean;
  additionalCategories?: Array<{ category: string; subcategory: string }>;
}

export default function ShaggyRugsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showCount, setShowCount] = useState(30);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      setWishlist(items.map((item: any) => item.id));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      console.log('All products:', data.products); // Для отладки
      const shaggyRugs = data.products.filter(
        (product: Product) => 
          (product.category === 'RUGS & MATS' && 
          product.subcategory === 'Shaggy Rugs') ||
          (product.additionalCategories && 
           product.additionalCategories.some(
             (ac: { category: string; subcategory: string }) => 
               ac.category === 'RUGS & MATS' && 
               ac.subcategory === 'Shaggy Rugs'
           ))
      );
      console.log('Filtered shaggy rugs:', shaggyRugs); // Для отладки
      setProducts(shaggyRugs);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const allSizes = Array.from(new Set(products.flatMap(p => p.rugsMatsSizes?.map(s => s.size) || [])));
  const allColors = Array.from(new Set(products.flatMap(p => p.rugsMatsColors || [])));

  const getProductPrice = (product: Product) => {
    if (!product.rugsMatsSizes || product.rugsMatsSizes.length === 0) return 0;
    return product.rugsMatsSizes[0].salePrice;
  };

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const formatPriceRange = (product: Product) => {
    if (!product.rugsMatsSizes || product.rugsMatsSizes.length === 0) return '£0.00';
    const prices = product.rugsMatsSizes.map(size => size.salePrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  const filteredProducts = products.filter(product => {
    const matchesSize = !selectedSize || product.rugsMatsSizes?.some(s => s.size === selectedSize);
    const matchesColor = !selectedColor || product.rugsMatsColors?.includes(selectedColor);
    const [minPrice, maxPrice] = priceRange;
    const productPrices = product.rugsMatsSizes?.map(s => s.salePrice) || [];
    const productMinPrice = Math.min(...productPrices);
    const productMaxPrice = Math.max(...productPrices);
    return matchesSize && matchesColor && productMinPrice >= minPrice && productMaxPrice <= maxPrice;
  });

  // Alphabetical sort for filteredProducts
  const sortedProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));

  const clearFilters = () => {
    setSelectedSize('');
    setSelectedColor('');
    setPriceRange([0, 200]);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const prefixedId = `shaggy_${id}`;
      const newWishlist = prev.includes(prefixedId) 
        ? prev.filter(i => i !== prefixedId)
        : [...prev, prefixedId];
      
      try {
        const existingItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const validItems = Array.isArray(existingItems) 
          ? existingItems.filter(item => 
              item && 
              typeof item === 'object' && 
              'id' in item && 
              typeof item.id === 'string' && 
              !item.id.startsWith('shaggy_')
            )
          : [];
        
        const newItems = products
          .filter((p) => newWishlist.includes(`shaggy_${p._id}`))
          .map((item) => ({
            id: `shaggy_${item._id}`,
            src: item.images?.[0] || '',
            hoverSrc: item.images?.[1] || item.images?.[0] || '',
            title: item.title,
            price: `£${item.price}`,
            discount: item.discount ? `-${item.discount}%` : ''
          }));
        
        const wishlistItems = [...validItems, ...newItems];
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        return newWishlist;
      } catch (error) {
        console.error('Error handling wishlist:', error);
        return newWishlist;
      }
    });
  };

  const getMinPrices = (product: Product) => {
    if (!product.rugsMatsSizes || product.rugsMatsSizes.length === 0) return { sale: 0, regular: 0 };
    const salePrices = product.rugsMatsSizes.map(s => typeof s.salePrice === 'number' ? s.salePrice : (typeof s.price === 'number' ? s.price : 0));
    const regularPrices = product.rugsMatsSizes.map(s => typeof (s as any).regularPrice === 'number' ? (s as any).regularPrice : (typeof s.price === 'number' ? s.price : 0));
    return {
      sale: Math.min(...salePrices),
      regular: Math.min(...regularPrices),
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <CategoriesSection />
        {/* Category Image Section */}
        <div style={{
          width: '100%',
          height: '700px',
          position: 'relative',
          marginBottom: '60px'
        }}>
          <Image
            src="/category-banner.jpg"
            alt="Shaggy Rugs Category"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              zIndex: 10
            }}>
              <button
                onClick={() => router.push('/')}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#222" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            </div>
            <div style={{
              textAlign: 'center',
              maxWidth: '1000px',
              padding: '0 20px'
            }}>
              <h1 style={{
                color: '#fff',
                fontSize: '72px',
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                lineHeight: '1.2',
                marginBottom: '20px'
              }}>Shaggy Rugs</h1>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Discover our collection of luxurious shaggy rugs, perfect for adding warmth and texture to any space
              </p>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          minHeight: '100vh'
        }}>
          {/* Filters Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '50px',
            maxWidth: '800px',
            margin: '0 auto 50px'
          }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                padding: '0 10px',
                cursor: 'pointer'
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#222',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                Filters
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{
                    transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </h2>
              <div style={{
                height: '1px',
                flex: 1,
                background: 'linear-gradient(to right, #eee, transparent)'
              }} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilters();
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #eee',
                  background: 'transparent',
                  color: '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                  fontWeight: 500
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#222';
                  e.currentTarget.style.color = '#222';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#eee';
                  e.currentTarget.style.color = '#666';
                }}
              >
                Clear Filters
              </button>
            </div>

            {showFilters && (
              <div style={{
                display: 'flex',
                gap: '30px',
                flexWrap: 'wrap',
                padding: '0 10px',
                animation: 'slideDown 0.3s ease'
              }}>
                {/* Price Range Filter */}
                <div style={{
                  flex: '1',
                  minWidth: '300px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#444'
                    }}>Price Range</span>
                  </div>
                  <div style={{
                    padding: '0 10px'
                  }}>
                    <input
                      type="number"
                      value={priceRange[0]}
                      min={0}
                      max={priceRange[1]}
                      onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                      style={{ width: 70, marginRight: 8 }}
                    />
                    <span> - </span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      min={priceRange[0]}
                      max={1000}
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                      style={{ width: 70, marginLeft: 8 }}
                    />
                  </div>
                </div>

                {/* Color Filter */}
                <div style={{
                  flex: '1',
                  minWidth: '300px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                    </svg>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#444'
                    }}>Colors</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {allColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color === selectedColor ? '' : color)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: selectedColor === color ? '#222' : '#eee',
                          background: selectedColor === color ? '#222' : 'transparent',
                          color: selectedColor === color ? '#fff' : '#444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedColor !== color) {
                            e.currentTarget.style.borderColor = '#222';
                            e.currentTarget.style.color = '#222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedColor !== color) {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.color = '#444';
                          }
                        }}
                      >
                        {selectedColor === color && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div style={{
                  flex: '1',
                  minWidth: '300px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#444'
                    }}>Sizes</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {allSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: selectedSize === size ? '#222' : '#eee',
                          background: selectedSize === size ? '#222' : 'transparent',
                          color: selectedSize === size ? '#fff' : '#444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedSize !== size) {
                            e.currentTarget.style.borderColor = '#222';
                            e.currentTarget.style.color = '#222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedSize !== size) {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.color = '#444';
                          }
                        }}
                      >
                        {selectedSize === size && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Count */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            padding: '0 10px',
            maxWidth: '800px',
            margin: '0 auto 40px'
          }}>
            <div style={{
              fontSize: '16px',
              color: '#666',
              fontWeight: 500
            }}>
              {sortedProducts.length} products
            </div>
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {sortedProducts.slice(0, showCount).map((product) => (
              <div 
                key={product._id} 
                style={{
                  background: 'rgba(255,255,255,0.13)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  borderRadius: '20px',
                  boxShadow: hoveredProduct === product._id 
                    ? '0 8px 32px 0 rgba(31, 38, 135, 0.10)' 
                    : '0 2px 16px rgba(34,34,34,0.07)',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredProduct === product._id ? 'translateY(-4px)' : 'none',
                  opacity: product.isSoldOut ? 0.75 : 1,
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => setQuickViewProduct(product)}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={hoveredProduct === product._id && product.images.length > 1 
                        ? product.images[1] 
                        : product.images[0]}
                      alt={product.title}
                      fill
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hoveredProduct === product._id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999'
                    }}>
                      No image
                    </div>
                  )}
                  
                  {/* Overlay with actions */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: hoveredProduct === product._id ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                      padding: '16px'
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product._id);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: wishlist.includes(`shaggy_${product._id}`) ? 'scale(1.1)' : 'scale(1)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={wishlist.includes(`shaggy_${product._id}`) ? '#e53935' : 'none'}
                        stroke="#e53935"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>
                  
                  {product.discount && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#e53935',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: '50%',
                      width: '47px',
                      height: '47px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(229,57,53,0.2)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      -{product.discount}%
                    </span>
                  )}
                  {product.isHot && (
                    <span style={{
                      position: 'absolute',
                      top: product.discount ? '67px' : '12px',
                      left: '12px',
                      background: '#000',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: '50%',
                      width: '47px',
                      height: '47px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      HOT
                    </span>
                  )}
                  {product.isSoldOut && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '18px',
                      fontWeight: 600,
                      backdropFilter: 'blur(2px)'
                    }}>
                      Sold Out
                    </div>
                  )}
                </div>
                <div style={{
                  padding: '24px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: '#000',
                    lineHeight: '1.4'
                  }}>{product.title}</h3>
                  <div style={{
                    color: '#e53935',
                    fontWeight: 700,
                    fontSize: '20px'
                  }}>
                    {(() => {
                      const { sale, regular } = getMinPrices(product);
                      if (sale < regular) {
                        return (
                          <>
                            <span style={{ color: '#000', fontWeight: 400 }}>From: </span>
                            <span style={{ color: '#e53935', fontWeight: 700 }}>
                              £{sale.toFixed(2)}
                            </span>
                            <span style={{
                              color: '#999',
                              textDecoration: 'line-through',
                              marginLeft: '8px',
                              fontSize: '16px',
                              fontWeight: 500
                            }}>
                              £{regular.toFixed(2)}
                            </span>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <span style={{ color: '#000', fontWeight: 400 }}>From: </span>
                            <span style={{ color: '#000', fontWeight: 700 }}>
                              £{regular.toFixed(2)}
                            </span>
                          </>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px 0',
              color: '#666'
            }}>
              No products found
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CookieBanner />
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
} 