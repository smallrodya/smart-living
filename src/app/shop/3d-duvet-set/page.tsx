'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  hoverImage: string;
  discount: string;
  isHot?: boolean;
  isSoldOut?: boolean;
  color: string;
  sizes: {
    single: boolean;
    double: boolean;
    king: boolean;
  };
}

const products: Product[] = [
  { 
    id: 1, 
    name: '3D Duvet Cover and Pillowcase Set – Bear', 
    price: '£14.99 – £17.72', 
    image: '/3d-bear.jpg', 
    hoverImage: '/3d-bear-hover.jpg', 
    discount: '-71%',
    color: 'Bear',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 2, 
    name: '3D Duvet Cover and Pillowcase Set – Black Panther', 
    price: '£14.99 – £17.72', 
    image: '/SHOP3DUVET.jpg', 
    hoverImage: '/SHOP3DUVET.jpg', 
    discount: '-71%',
    isHot: true,
    color: 'Black Panther',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 3, 
    name: '3D Duvet Cover and Pillowcase Set – Bulldog', 
    price: '£14.99 – £17.72', 
    image: '/3d-bulldog.jpg', 
    hoverImage: '/3d-bulldog.jpg', 
    discount: '-71%',
    isSoldOut: true,
    color: 'Bulldog',
    sizes: {
      single: false,
      double: false,
      king: false
    }
  },
  { 
    id: 4, 
    name: '3D Duvet Cover and Pillowcase Set – Cat', 
    price: '£14.99 – £17.72', 
    image: '/3d-cat.jpg', 
    hoverImage: '/3d-cat.jpg', 
    discount: '-71%',
    color: 'Cat',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 5, 
    name: '3D Duvet Cover and Pillowcase Set – Husky', 
    price: '£14.99 – £17.72', 
    image: '/3d-husky.jpg', 
    hoverImage: '/3d-husky.jpg', 
    discount: '-71%',
    color: 'Husky',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 6, 
    name: '3D Duvet Cover and Pillowcase Set – Leopard', 
    price: '£14.99 – £17.72', 
    image: '/3d-leopard.jpg', 
    hoverImage: '/3d-leopard.jpg', 
    discount: '-71%',
    color: 'Leopard',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 7, 
    name: '3D Duvet Cover and Pillowcase Set – Lion', 
    price: '£14.99 – £17.72', 
    image: '/3d-lion.jpg', 
    hoverImage: '/3d-lion.jpg', 
    discount: '-71%',
    color: 'Lion',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 8, 
    name: '3D Duvet Cover and Pillowcase Set – Penguin', 
    price: '£14.99 – £17.72', 
    image: '/3d-penguin.jpg', 
    hoverImage: '/3d-penguin.jpg', 
    discount: '-71%',
    isSoldOut: true,
    color: 'Penguin',
    sizes: {
      single: false,
      double: false,
      king: false
    }
  },
  { 
    id: 9, 
    name: '3D Duvet Cover and Pillowcase Set – Polar Bear', 
    price: '£14.99 – £17.72', 
    image: '/3d-polar-bear.jpg', 
    hoverImage: '/3d-polar-bear.jpg', 
    discount: '-71%',
    isSoldOut: true,
    color: 'Polar Bear',
    sizes: {
      single: false,
      double: false,
      king: false
    }
  },
  { 
    id: 10, 
    name: '3D Duvet Cover and Pillowcase Set – Pug', 
    price: '£14.99 – £17.72', 
    image: '/3d-pug.jpg', 
    hoverImage: '/3d-pug.jpg', 
    discount: '-71%',
    color: 'Pug',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 11, 
    name: '3D Duvet Cover and Pillowcase Set – Stallion', 
    price: '£14.99 – £17.72', 
    image: '/3d-stallion.jpg', 
    hoverImage: '/3d-stallion.jpg', 
    discount: '-71%',
    color: 'Stallion',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 12, 
    name: '3D Duvet Cover and Pillowcase Set – Sweet Pug', 
    price: '£14.99 – £17.72', 
    image: '/3d-sweet-pug.jpg', 
    hoverImage: '/3d-sweet-pug.jpg', 
    discount: '-71%',
    color: 'Sweet Pug',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 13, 
    name: '3D Duvet Cover and Pillowcase Set – Tiger', 
    price: '£14.99 – £17.72', 
    image: '/3d-tiger.jpg', 
    hoverImage: '/3d-tiger.jpg', 
    discount: '-71%',
    color: 'Tiger',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 14, 
    name: '3D Duvet Cover and Pillowcase Set – Tiger Face Brown', 
    price: '£14.99 – £17.72', 
    image: '/3d-tiger-face-brown.jpg', 
    hoverImage: '/3d-tiger-face-brown.jpg', 
    discount: '-71%',
    isSoldOut: true,
    color: 'Tiger Face Brown',
    sizes: {
      single: false,
      double: false,
      king: false
    }
  },
  { 
    id: 15, 
    name: '3D Duvet Cover and Pillowcase Set – Tiger Face White', 
    price: '£14.99 – £17.72', 
    image: '/3d-tiger-face-white.jpg', 
    hoverImage: '/3d-tiger-face-white.jpg', 
    discount: '-71%',
    isSoldOut: true,
    color: 'Tiger Face White',
    sizes: {
      single: false,
      double: false,
      king: false
    }
  },
  { 
    id: 16, 
    name: '3D Duvet Cover and Pillowcase Set – White Tiger', 
    price: '£14.99 – £17.72', 
    image: '/3d-white-tiger.jpg', 
    hoverImage: '/3d-white-tiger.jpg', 
    discount: '-71%',
    color: 'White Tiger',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 17, 
    name: '3D Duvet Cover and Pillowcase Set – Wolf', 
    price: '£14.99 – £17.72', 
    image: '/3d-wolf.jpg', 
    hoverImage: '/3d-wolf.jpg', 
    discount: '-72%',
    color: 'Wolf',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 18, 
    name: '3D Geo Luxury Lurex Jacquard Cuff Panel Duvet Cover With Pillowcases – Grey', 
    price: '£14.70 – £19.89', 
    image: '/3d-geo-grey.jpg', 
    hoverImage: '/3d-geo-grey.jpg', 
    discount: '-72%',
    color: 'Grey',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  },
  { 
    id: 19, 
    name: '3D Geo Luxury Lurex Jacquard Cuff Panel Duvet Cover With Pillowcases – White', 
    price: '£14.70 – £19.89', 
    image: '/3d-geo-white.jpg', 
    hoverImage: '/3d-geo-white.jpg', 
    discount: '-72%',
    color: 'White',
    sizes: {
      single: true,
      double: true,
      king: true
    }
  }
];

const ThreeDDuvetSetPage = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const router = useRouter();

  // Extract unique colors from products
  const uniqueColors = Array.from(new Set(products.map(p => p.color)));

  // Filter products based on price, color and size
  const filteredProducts = products.filter(product => {
    const [minPrice, maxPrice] = priceRange;
    const price = parseFloat(product.price.split('£')[1].split('–')[0].trim());
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes[size as keyof typeof product.sizes]);
    return price >= minPrice && price <= maxPrice && colorMatch && sizeMatch;
  });

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      setWishlist(items.map((item: any) => item.id));
    }
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const prefixedId = `3d_${id}`;
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
              !item.id.startsWith('3d_')
            )
          : [];
        
        const product = products.find(p => p.id === id);
        if (product) {
          const newItem = {
            id: prefixedId,
            name: product.name,
            price: product.price,
            image: product.image,
            hoverImage: product.hoverImage,
            discount: product.discount,
            color: product.color,
            sizes: product.sizes
          };
          
          const wishlistItems = newWishlist.includes(prefixedId)
            ? [...validItems, newItem]
            : validItems.filter(item => item.id !== prefixedId);
          
          localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        }
        
        return newWishlist;
      } catch (error) {
        console.error('Error handling wishlist:', error);
        return newWishlist;
      }
    });
  };

  return (
    <>
      <Header />
      <main>
        {/* Category Image Section */}
        <div style={{
          width: '100%',
          height: '700px',
          position: 'relative',
          marginBottom: '60px'
        }}>
          <Image
            src="/Cats-Copy.jpg"
            alt="3D Duvet Sets Category"
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
                onClick={() => router.push('/shop-duvet-set-by-type')}
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
              }}>3D Duvet Sets</h1>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Discover our collection of premium 3D duvet sets, perfect for creating a cozy and stylish bedroom
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
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
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
                    transform: isFiltersOpen ? 'rotate(180deg)' : 'rotate(0deg)',
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
            </div>

            {isFiltersOpen && (
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
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      style={{
                        width: '100%',
                        height: '2px',
                        WebkitAppearance: 'none',
                        background: '#ddd',
                        outline: 'none',
                        marginBottom: '15px'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#666',
                      fontSize: '15px'
                    }}>
                      <span>£{priceRange[0]}</span>
                      <span>£{priceRange[1]}</span>
                    </div>
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
                    {uniqueColors.map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColors(prev =>
                            prev.includes(color)
                              ? prev.filter(c => c !== color)
                              : [...prev, color]
                          );
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: selectedColors.includes(color) ? '#222' : '#eee',
                          background: selectedColors.includes(color) ? '#222' : 'transparent',
                          color: selectedColors.includes(color) ? '#fff' : '#444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedColors.includes(color)) {
                            e.currentTarget.style.borderColor = '#222';
                            e.currentTarget.style.color = '#222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedColors.includes(color)) {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.color = '#444';
                          }
                        }}
                      >
                        {selectedColors.includes(color) && (
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
                      <path d="M3 6h18M3 12h18M3 18h18"/>
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
                    {[
                      { id: 'single', label: 'Single (135cm x 200cm)' },
                      { id: 'double', label: 'Double (200cm x 200cm)' },
                      { id: 'king', label: 'King (220cm x 235cm)' }
                    ].map(size => (
                      <button
                        key={size.id}
                        onClick={() => {
                          setSelectedSizes(prev =>
                            prev.includes(size.id)
                              ? prev.filter(s => s !== size.id)
                              : [...prev, size.id]
                          );
                        }}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: selectedSizes.includes(size.id) ? '#222' : '#eee',
                          background: selectedSizes.includes(size.id) ? '#222' : 'transparent',
                          color: selectedSizes.includes(size.id) ? '#fff' : '#444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          textAlign: 'left',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedSizes.includes(size.id)) {
                            e.currentTarget.style.borderColor = '#222';
                            e.currentTarget.style.color = '#222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedSizes.includes(size.id)) {
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.color = '#444';
                          }
                        }}
                      >
                        {selectedSizes.includes(size.id) && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                        {size.label}
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
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  boxShadow: hoveredItem === product.id 
                    ? '0 8px 32px rgba(34,34,34,0.12)' 
                    : '0 2px 16px rgba(34,34,34,0.07)',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredItem === product.id ? 'translateY(-4px)' : 'none'
                }}
                onMouseEnter={() => setHoveredItem(product.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={hoveredItem === product.id ? product.hoverImage : product.image}
                    alt={product.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredItem === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
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
                      transform: wishlist.includes(`3d_${product.id}`) ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={() => setHoveredButton(product.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={wishlist.includes(`3d_${product.id}`) ? '#e53935' : 'none'}
                      stroke="#e53935"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => {/* Add to cart functionality */}}
                    style={{
                      position: 'absolute',
                      top: '64px',
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
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                  </button>
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
                    {product.discount}
                  </span>
                  {product.isHot && (
                    <span style={{
                      position: 'absolute',
                      top: '67px',
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
                  }}>{product.name}</h3>
                  <div style={{
                    color: '#e53935',
                    fontWeight: 700,
                    fontSize: '20px',
                    marginBottom: '12px'
                  }}>{product.price}</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {Object.entries(product.sizes).map(([size, available]) => (
                      <div
                        key={size}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          color: available ? '#444' : '#999'
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={available ? '#222' : '#999'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {available ? (
                            <path d="M20 6L9 17l-5-5"/>
                          ) : (
                            <path d="M18 6L6 18M6 6l12 12"/>
                          )}
                        </svg>
                        {size === 'single' && 'Single (135cm x 200cm)'}
                        {size === 'double' && 'Double (200cm x 200cm)'}
                        {size === 'king' && 'King (220cm x 235cm)'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
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
};

export default ThreeDDuvetSetPage; 