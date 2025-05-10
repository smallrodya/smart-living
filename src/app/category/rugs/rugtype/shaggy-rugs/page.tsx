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
  price: number;
  image: string;
  hoverImage: string;
  discount: string;
  isHot?: boolean;
  isSoldOut?: boolean;
  color: string;
}

interface WishlistItem {
  id: string;
  src: string;
  hoverSrc: string;
  title: string;
  price: number;
  discount: string;
}

const products: Product[] = [
  { 
    id: 1, 
    name: 'Shaggy Rug – Aubergine', 
    price: 14.43, 
    image: '/shaggy1.jpg', 
    hoverImage: '/shaggy1-hover.jpg', 
    discount: '-60%',
    color: 'Aubergine'
  },
  { 
    id: 2, 
    name: 'Shaggy Rug – Black', 
    price: 14.43, 
    image: '/shaggy2.jpg', 
    hoverImage: '/shaggy2-hover.jpg', 
    discount: '-60%',
    color: 'Black'
  },
  { 
    id: 3, 
    name: 'Shaggy Rug – Brown', 
    price: 14.43, 
    image: '/shaggy3.jpg', 
    hoverImage: '/shaggy3-hover.jpg', 
    discount: '-60%',
    isSoldOut: false,
    color: 'Brown'
  },
  { 
    id: 4, 
    name: 'Shaggy Rug – Cream', 
    price: 14.43, 
    image: '/shaggy4.jpg', 
    hoverImage: '/shaggy4-hover.jpg', 
    discount: '-60%',
    isSoldOut: true,
    color: 'Cream'
  },
  { 
    id: 5, 
    name: 'Shaggy Rug – Dark Beige', 
    price: 14.43, 
    image: '/shaggy5.jpg', 
    hoverImage: '/shaggy5-hover.jpg', 
    discount: '-60%',
    color: 'Dark Beige'
  },
  { 
    id: 6, 
    name: 'Shaggy Rug – Dark Grey', 
    price: 14.43, 
    image: '/shaggy6.jpg', 
    hoverImage: '/shaggy6-hover.jpg', 
    discount: '-60%',
    color: 'Dark Grey'
  },
  { 
    id: 7, 
    name: 'Shaggy Rug – Duck Egg', 
    price: 14.43, 
    image: '/shaggy7.jpg', 
    hoverImage: '/shaggy7-hover.jpg', 
    discount: '-60%',
    color: 'Duck Egg'
  },
  { 
    id: 8, 
    name: 'Shaggy Rug – Dusky Pink', 
    price: 14.43, 
    image: '/shaggy8.jpg', 
    hoverImage: '/shaggy8-hover.jpg', 
    discount: '-60%',
    isHot: false,
    color: 'Dusky Pink'
  },
  { 
    id: 9, 
    name: 'Shaggy Rug – Emerald', 
    price: 14.43, 
    image: '/shaggy9.jpg', 
    hoverImage: '/shaggy9-hover.jpg', 
    discount: '-60%',
    isHot: true,
    color: 'Emerald'
  },
  { 
    id: 10, 
    name: 'Shaggy Rug – Green', 
    price: 14.43, 
    image: '/shaggy10.jpg', 
    hoverImage: '/shaggy10-hover.jpg', 
    discount: '-60%',
    color: 'Green'
  },
  { 
    id: 11, 
    name: 'Shaggy Rug – Ink', 
    price: 14.43, 
    image: '/shaggy11.jpg', 
    hoverImage: '/shaggy11-hover.jpg', 
    discount: '-60%',
    color: 'Ink'
  },
  { 
    id: 12, 
    name: 'Shaggy Rug – Latte', 
    price: 14.43, 
    image: '/shaggy12.jpg', 
    hoverImage: '/shaggy12-hover.jpg', 
    discount: '-60%',
    color: 'Latte'
  },
  { 
    id: 13, 
    name: 'Shaggy Rug – Light Beige', 
    price: 14.43, 
    image: '/shaggy13.jpg', 
    hoverImage: '/shaggy13-hover.jpg', 
    discount: '-60%',
    color: 'Light Beige'
  },
  { 
    id: 14, 
    name: 'Shaggy Rug – Mauve', 
    price: 14.43, 
    image: '/shaggy14.jpg', 
    hoverImage: '/shaggy14-hover.jpg', 
    discount: '-60%',
    color: 'Mauve'
  },
  { 
    id: 15, 
    name: 'Shaggy Rug – Oatmeal', 
    price: 14.43, 
    image: '/shaggy15.jpg', 
    hoverImage: '/shaggy15-hover.jpg', 
    discount: '-60%',
    color: 'Oatmeal'
  },
  { 
    id: 16, 
    name: 'Shaggy Rug – Ochre', 
    price: 14.43, 
    image: '/shaggy16.jpg', 
    hoverImage: '/shaggy16-hover.jpg', 
    discount: '-60%',
    color: 'Ochre'
  },
  { 
    id: 17, 
    name: 'Shaggy Rug – Orange', 
    price: 14.43, 
    image: '/shaggy17.jpg', 
    hoverImage: '/shaggy17-hover.jpg', 
    discount: '-60%',
    color: 'Orange'
  },
  { 
    id: 18, 
    name: 'Shaggy Rug – Red', 
    price: 14.43, 
    image: '/shaggy18.jpg', 
    hoverImage: '/shaggy18-hover.jpg', 
    discount: '-60%',
    color: 'Red'
  },
  { 
    id: 19, 
    name: 'Shaggy Rug – Silver/Grey', 
    price: 14.43, 
    image: '/shaggy19.jpg', 
    hoverImage: '/shaggy19-hover.jpg', 
    discount: '-60%',
    isHot: true,
    color: 'Silver/Grey'
  },
  { 
    id: 20, 
    name: 'Shaggy Rug – Soft Lilac', 
    price: 14.43, 
    image: '/shaggy20.jpg', 
    hoverImage: '/shaggy20-hover.jpg', 
    isSoldOut: true,
    discount: '-60%',
    color: 'Soft Lilac'
  },
  { 
    id: 21, 
    name: 'Shaggy Rug – Teal', 
    price: 14.43, 
    image: '/shaggy21.jpg', 
    hoverImage: '/shaggy21-hover.jpg', 
    discount: '-60%',
    color: 'Teal'
  },
  { 
    id: 22, 
    name: 'Shaggy Rug – Terracotta', 
    price: 14.43, 
    image: '/shaggy22.jpg', 
    hoverImage: '/shaggy22-hover.jpg', 
    discount: '-60%',
    color: 'Terracotta'
  }
];

const ShaggyRugsPage = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const router = useRouter();

  // Extract unique colors from products
  const uniqueColors = Array.from(new Set(products.map(p => p.color)));

  // Filter products based on price and color
  const filteredProducts = products.filter(product => {
    const [minPrice, maxPrice] = priceRange;
    const price = product.price;
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    return price >= minPrice && price <= maxPrice && colorMatch;
  });

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist) as WishlistItem[];
      setWishlist(items.map(item => item.id));
    }
  }, []);

  const toggleWishlist = (id: number) => {
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
          .filter((_, i) => newWishlist.includes(`shaggy_${i + 1}`))
          .map((item) => ({
            id: `shaggy_${item.id}`,
            src: item.image,
            hoverSrc: item.hoverImage,
            title: item.name,
            price: item.price,
            discount: item.discount
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              padding: '0 10px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#222',
                margin: 0
              }}>Filters</h2>
              <div style={{
                height: '1px',
                flex: 1,
                background: 'linear-gradient(to right, #eee, transparent)'
              }} />
            </div>

            <div style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              padding: '0 10px'
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
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
            </div>
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
                      transform: wishlist.includes(`shaggy_${product.id}`) ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={() => setHoveredButton(product.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={wishlist.includes(`shaggy_${product.id}`) ? '#e53935' : 'none'}
                      stroke="#e53935"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
                    marginBottom: '20px'
                  }}>{product.price}</div>
                  <button 
                    style={{
                      background: '#111',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 0',
                      width: '100%',
                      fontWeight: 600,
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                      transform: hoveredButton === product.id ? 'translateY(-2px)' : 'none'
                    }}
                    onMouseEnter={() => setHoveredButton(product.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Add to basket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default ShaggyRugsPage; 