"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { useRouter } from 'next/navigation';
import QuickViewModal from '@/components/QuickViewModal';

interface Product {
  _id: string;
  title: string;
  description: string;
  features: string;
  price: string;
  category: string;
  subcategory: string;
  sku: string;
  beddingSizes?: Array<{ size: string; price: number; salePrice: number; sku?: string; stock?: number }>;
  beddingColors?: string[];
  beddingStyles?: string[];
  rugsMatsSizes?: Array<{ size: string; price: number; salePrice: number; sku?: string; stock?: number }>;
  rugsMatsColors?: string[];
  rugsMatsStyles?: string[];
  throwsTowelsStylePrices?: Array<{ size: string; regularPrice: number; salePrice: number; sku: string; stock: number }>;
  throwsTowelsColors?: string[];
  throwsTowelsStyles?: string[];
  curtainsSizes?: Array<{ size: string; price: number; salePrice: number; sku?: string; stock?: number }>;
  curtainsColors?: string[];
  curtainsStyles?: string[];
  footwearSizes?: Array<{ size: string; regularPrice: number; salePrice: number; sku: string; stock: number }>;
  footwearColors?: string[];
  footwearStyles?: string[];
  clothingStylePrices?: Array<{ size: string; regularPrice: number; salePrice: number; sku: string; stock: number }>;
  clothingColors?: string[];
  clothingStyles?: string[];
  outdoorPrice?: { sku: string; regularPrice: number; salePrice: number; stock: number };
  images?: string[];
  discount?: number;
  clearanceDiscount?: number;
  isSoldOut?: boolean;
  isHot?: boolean;
  isClearance?: boolean;
  additionalCategories?: Array<{ category: string; subcategory: string }>;
}

function SearchPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query.trim()) {
      fetchSearchResults(query);
    } else {
      setProducts([]);
      setLoading(false);
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      setWishlist(items.map((item: any) => item.id));
    }
  }, [searchParams]);

  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalResults(data.total || 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setProducts([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const prefixedId = `search_${id}`;
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
              !item.id.startsWith('search_')
            )
          : [];
        
        const newItems = products
          .filter((p) => newWishlist.includes(`search_${p._id}`))
          .map((item) => ({
            id: `search_${item._id}`,
            src: item.images?.[0] || '',
            hoverSrc: item.images?.[1] || item.images?.[0] || '',
            title: item.title,
            price: formatPrice(getProductPrice(item)),
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

  const getProductPrice = (product: Product) => {
    if (product.beddingSizes && product.beddingSizes.length > 0) {
      return product.beddingSizes[0].salePrice;
    }
    if (product.rugsMatsSizes && product.rugsMatsSizes.length > 0) {
      return product.rugsMatsSizes[0].salePrice;
    }
    if (product.throwsTowelsStylePrices && product.throwsTowelsStylePrices.length > 0) {
      return product.throwsTowelsStylePrices[0].salePrice;
    }
    if (product.curtainsSizes && product.curtainsSizes.length > 0) {
      return product.curtainsSizes[0].salePrice;
    }
    if (product.footwearSizes && product.footwearSizes.length > 0) {
      return product.footwearSizes[0].salePrice;
    }
    if (product.clothingStylePrices && product.clothingStylePrices.length > 0) {
      return product.clothingStylePrices[0].salePrice;
    }
    if (product.outdoorPrice) {
      return product.outdoorPrice.salePrice;
    }
    return 0;
  };

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const formatPriceRange = (product: Product) => {
    let prices: number[] = [];
    
    if (product.beddingSizes && product.beddingSizes.length > 0) {
      prices = product.beddingSizes.map(size => size.salePrice);
    } else if (product.rugsMatsSizes && product.rugsMatsSizes.length > 0) {
      prices = product.rugsMatsSizes.map(size => size.salePrice);
    } else if (product.throwsTowelsStylePrices && product.throwsTowelsStylePrices.length > 0) {
      prices = product.throwsTowelsStylePrices.map(style => style.salePrice);
    } else if (product.curtainsSizes && product.curtainsSizes.length > 0) {
      prices = product.curtainsSizes.map(size => size.salePrice);
    } else if (product.footwearSizes && product.footwearSizes.length > 0) {
      prices = product.footwearSizes.map(size => size.salePrice);
    } else if (product.clothingStylePrices && product.clothingStylePrices.length > 0) {
      prices = product.clothingStylePrices.map(style => style.salePrice);
    } else if (product.outdoorPrice) {
      prices = [product.outdoorPrice.salePrice];
    }

    if (prices.length === 0) return '£0.00';
    
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          minHeight: '100vh'
        }}>
          {/* Search Results Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#222',
              marginBottom: '20px'
            }}>
              Search Results
            </h1>
            {searchQuery && (
              <p style={{
                fontSize: '20px',
                color: '#666',
                marginBottom: '30px'
              }}>
                Found {totalResults} results for "{searchQuery}"
              </p>
            )}
            {totalResults === 0 && searchQuery && (
              <div style={{
                background: '#fff',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#222',
                  marginBottom: '15px'
                }}>
                  No products found
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '25px'
                }}>
                  Try searching with different keywords or browse our categories
                </p>
                <button
                  onClick={() => router.push('/')}
                  style={{
                    background: '#222',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#333';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Browse All Products
                </button>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {products.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px'
            }}>
              {products.map((product) => (
                <div 
                  key={product._id} 
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    boxShadow: hoveredProduct === product._id 
                      ? '0 8px 32px rgba(34,34,34,0.12)' 
                      : '0 2px 16px rgba(34,34,34,0.07)',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredProduct === product._id ? 'translateY(-4px)' : 'none',
                    opacity: product.isSoldOut ? 0.75 : 1
                  }}
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div style={{
                    width: '100%',
                    aspectRatio: '4/3',
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
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
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
                        transform: wishlist.includes(`search_${product._id}`) ? 'scale(1.1)' : 'scale(1)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={wishlist.includes(`search_${product._id}`) ? '#e53935' : 'none'}
                        stroke="#e53935"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
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
                    padding: '20px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#999',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      fontWeight: 500
                    }}>
                      {product.category} {product.subcategory && `• ${product.subcategory}`}
                    </div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#222',
                      lineHeight: '1.4'
                    }}>{product.title}</h3>
                    <div style={{
                      color: '#e53935',
                      fontWeight: 700,
                      fontSize: '20px',
                      marginBottom: '20px'
                    }}>
                      {product.discount ? (
                        <>
                          {formatPriceRange(product)}
                          <span style={{
                            color: '#999',
                            textDecoration: 'line-through',
                            marginLeft: '8px',
                            fontSize: '16px'
                          }}>
                            {formatPriceRange({ ...product, discount: undefined })}
                          </span>
                        </>
                      ) : (
                        formatPriceRange(product)
                      )}
                    </div>
                    {!product.isSoldOut && (
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginTop: '16px'
                      }}>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          style={{
                            flex: 1,
                            padding: '12px 24px',
                            background: '#222',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#333';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#222';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                          View
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </>
    }>
      <SearchPageContent />
    </Suspense>
  );
} 