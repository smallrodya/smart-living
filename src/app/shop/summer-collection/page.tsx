"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { useRouter } from 'next/navigation';
import CategoriesSection from '@/components/CategoriesSection';
import QuickViewModal from '@/components/QuickViewModal';

interface BeddingSize {
  size: string;
  price: number;
  salePrice: number;
  sku?: string;
  stock?: number;
  regularPrice: number;
}
interface RugsMatsSize {
  size: string;
  price: number;
  salePrice: number;
  sku?: string;
  stock?: number;
  regularPrice: number;
}
interface ThrowsTowelsStylePrice {
  size: string;
  price: number;
  salePrice: number;
  sku: string;
  stock: number;
  regularPrice: number;
}
interface ClothingStylePrice {
  size: string;
  price: number;
  salePrice: number;
  sku: string;
  stock: number;
  regularPrice: number;
}
interface FootwearSize {
  size: string;
  price: number;
  salePrice: number;
  sku: string;
  stock: number;
  regularPrice: number;
}
interface OutdoorPrice {
  sku: string;
  regularPrice: number;
  salePrice: number;
  stock: number;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  features: string;
  price: string;
  category: string;
  subcategory: string;
  sku: string;
  throwsTowelsStylePrices: ThrowsTowelsStylePrice[];
  throwsTowelsColors: string[];
  throwsTowelsStyles: string[];
  images?: string[];
  discount?: number;
  isSoldOut?: boolean;
  isHot?: boolean;
  isSummerCollection: boolean;
  outdoorPrice?: OutdoorPrice;
  footwearSizes?: FootwearSize[];
  beddingSizes?: BeddingSize[];
  rugsMatsSizes?: RugsMatsSize[];
  clothingStylePrices?: ClothingStylePrice[];
}

export default function SummerCollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
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
      const filteredProducts = data.products
        .filter((product: Product) => product.isSummerCollection === true)
        .map((product: Product) => ({
          ...product,
          beddingSizes: product.beddingSizes?.map((s: any) => ({ ...s, price: s.price ?? s.salePrice, regularPrice: s.regularPrice ?? s.salePrice })),
          rugsMatsSizes: product.rugsMatsSizes?.map((s: any) => ({ ...s, price: s.price ?? s.salePrice, regularPrice: s.regularPrice ?? s.salePrice })),
          throwsTowelsStylePrices: product.throwsTowelsStylePrices?.map((s: any) => ({ ...s, price: s.price ?? s.salePrice, regularPrice: s.regularPrice ?? s.salePrice })),
          clothingStylePrices: product.clothingStylePrices?.map((s: any) => ({ ...s, price: s.price ?? s.salePrice, regularPrice: s.regularPrice ?? s.salePrice })),
          footwearSizes: product.footwearSizes?.map((s: any) => ({ ...s, price: s.price ?? s.salePrice, regularPrice: s.regularPrice ?? s.salePrice })),
          outdoorPrice: product.outdoorPrice && typeof product.outdoorPrice === 'object'
            ? {
                sku: product.outdoorPrice.sku ?? '',
                regularPrice: product.outdoorPrice.regularPrice ?? product.outdoorPrice.salePrice ?? 0,
                salePrice: product.outdoorPrice.salePrice ?? 0,
                stock: product.outdoorPrice.stock ?? 0
              }
            : undefined,
        }));
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const allStyles = Array.from(new Set(products.flatMap(p => p.throwsTowelsStyles || [])));
  const allColors = Array.from(new Set(products.flatMap(p => p.throwsTowelsColors || [])));

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const getMinPrices = (product: Product) => {
    // OUTDOOR
    if (product.category === 'OUTDOOR' && product.outdoorPrice) {
      const sale = product.discount ? product.outdoorPrice.salePrice * (1 - product.discount / 100) : product.outdoorPrice.salePrice;
      const regular = product.outdoorPrice.regularPrice;
      return { minSale: sale, minRegular: regular };
    }
    // FOOTWEAR
    if (product.category === 'FOOTWEAR' && product.footwearSizes?.length) {
      const salePrices = product.footwearSizes.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const regularPrices = product.footwearSizes.map(s => s.regularPrice);
      return { minSale: Math.min(...salePrices), minRegular: Math.min(...regularPrices) };
    }
    // THROWS & TOWELS
    if (product.category === 'THROWS & TOWELS' && product.throwsTowelsStylePrices?.length) {
      const salePrices = product.throwsTowelsStylePrices.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const regularPrices = product.throwsTowelsStylePrices.map(s => s.regularPrice);
      return { minSale: Math.min(...salePrices), minRegular: Math.min(...regularPrices) };
    }
    // BEDDING
    if (product.category === 'BEDDING' && product.beddingSizes?.length) {
      const salePrices = product.beddingSizes.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const regularPrices = product.beddingSizes.map(s => s.regularPrice);
      return { minSale: Math.min(...salePrices), minRegular: Math.min(...regularPrices) };
    }
    // RUGS & MATS
    if (product.category === 'RUGS & MATS' && product.rugsMatsSizes?.length) {
      const salePrices = product.rugsMatsSizes.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const regularPrices = product.rugsMatsSizes.map(s => s.regularPrice);
      return { minSale: Math.min(...salePrices), minRegular: Math.min(...regularPrices) };
    }
    // CLOTHING
    if (product.category === 'CLOTHING' && product.clothingStylePrices?.length) {
      const salePrices = product.clothingStylePrices.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const regularPrices = product.clothingStylePrices.map(s => s.regularPrice);
      return { minSale: Math.min(...salePrices), minRegular: Math.min(...regularPrices) };
    }
    // Fallback
    if (product.price && !isNaN(Number(product.price))) {
      return { minSale: Number(product.price), minRegular: Number(product.price) };
    }
    return { minSale: 0, minRegular: 0 };
  };

  const formatPriceRange = (product: Product) => {
    // OUTDOOR
    if (product.category === 'OUTDOOR' && product.outdoorPrice) {
      const price = product.discount
        ? product.outdoorPrice.salePrice * (1 - product.discount / 100)
        : product.outdoorPrice.salePrice;
      return formatPrice(price);
    }
    // FOOTWEAR
    if (product.category === 'FOOTWEAR' && product.footwearSizes?.length) {
      const prices = product.footwearSizes.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }
    // THROWS & TOWELS
    if (product.category === 'THROWS & TOWELS' && product.throwsTowelsStylePrices?.length) {
      const prices = product.throwsTowelsStylePrices.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }
    // BEDDING
    if (product.category === 'BEDDING' && product.beddingSizes?.length) {
      const prices = product.beddingSizes.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }
    // RUGS & MATS
    if (product.category === 'RUGS & MATS' && product.rugsMatsSizes?.length) {
      const prices = product.rugsMatsSizes.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }
    // CLOTHING
    if (product.category === 'CLOTHING' && product.clothingStylePrices?.length) {
      const prices = product.clothingStylePrices.map(s => product.discount ? s.salePrice * (1 - product.discount / 100) : s.salePrice);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
    }
    // Fallback
    if (product.price && !isNaN(Number(product.price))) {
      return formatPrice(Number(product.price));
    }
    return '£0.00';
  };

  const filteredProducts = products.filter(product => {
    const matchesStyle = !selectedStyle || product.throwsTowelsStyles?.includes(selectedStyle);
    const matchesColor = !selectedColor || product.throwsTowelsColors?.includes(selectedColor);
    const [minPrice, maxPrice] = priceRange;
    const productPrices = product.throwsTowelsStylePrices?.map(s => s.salePrice) || [];
    const productMinPrice = Math.min(...productPrices);
    const productMaxPrice = Math.max(...productPrices);
    return matchesStyle && matchesColor && productMinPrice >= minPrice && productMaxPrice <= maxPrice;
  });

  // Alphabetical sort for filteredProducts
  const sortedProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  const [showCount, setShowCount] = useState(30);

  const clearFilters = () => {
    setSelectedStyle('');
    setSelectedColor('');
    setPriceRange([0, 1000]);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const prefixedId = `summer_${id}`;
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
              !item.id.startsWith('summer_')
            )
          : [];
        const newItems = products
          .filter((p) => newWishlist.includes(`summer_${p._id}`))
          .map((item) => ({
            id: `summer_${item._id}`,
            src: item.images?.[0] || '',
            hoverSrc: item.images?.[1] || item.images?.[0] || '',
            title: item.title,
            price: formatPriceRange(item),
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
            src="/bannermain.png"
            alt="Summer Collection"
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
                fontSize: '72px',
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.15)',
                lineHeight: '1.2',
                marginBottom: '20px',
                background: 'linear-gradient(270deg, #FFEE70, #FF6B6B, #4BE1EC, #70FFB8, #FFEE70)',
                backgroundSize: '1000% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'summerGradientMove 6s linear infinite',
              }}>
                Summer Collection
              </h1>
              <style>{`
                @keyframes summerGradientMove {
                  0% { background-position: 0% 50%; }
                  100% { background-position: 100% 50%; }
                }
              `}</style>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Discover our exclusive summer collection of throws, towels, and more!
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
                      min={0}
                      value={priceRange[0]}
                      onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                      style={{ width: 80, marginRight: 8 }}
                    />
                    <span> - </span>
                    <input
                      type="number"
                      min={0}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                      style={{ width: 80, marginLeft: 8 }}
                    />
                  </div>
                </div>

                {/* Style Filter */}
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
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    </svg>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#444'
                    }}>Styles</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {allStyles.map(style => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(style === selectedStyle ? '' : style)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: selectedStyle === style ? '#222' : '#eee',
                          background: selectedStyle === style ? '#222' : 'transparent',
                          color: selectedStyle === style ? '#fff' : '#444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedStyle !== style) {
                            e.currentTarget.style.borderColor = '#222';
                            e.currentTarget.style.color = '#222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedStyle !== style) {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.color = '#444';
                          }
                        }}
                      >
                        {selectedStyle === style && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                        {style}
                      </button>
                    ))}
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
              {filteredProducts.length} products
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
                      transform: wishlist.includes(`summer_${product._id}`) ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={wishlist.includes(`summer_${product._id}`) ? '#e53935' : 'none'}
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
                    {(() => {
                      const { minSale, minRegular } = getMinPrices(product);
                      if (minSale < minRegular) {
                        return <><span style={{ color: '#e53935' }}>{formatPrice(minSale)}</span> <span style={{ color: '#999', textDecoration: 'line-through', marginLeft: 8, fontSize: 16 }}>{formatPrice(minRegular)}</span></>;
                      } else {
                        return <span style={{ color: '#222' }}>{formatPrice(minRegular)}</span>;
                      }
                    })()}
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

          {filteredProducts.length === 0 && (
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