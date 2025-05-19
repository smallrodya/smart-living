'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

const categories = [
  {
    id: 1,
    name: 'REVERSIBLE RUGS',
    image: '/reversible-rugs.jpg',
    link: '/category/rugs/reversible-rugs',
    productCount: 10
  },
  {
    id: 2,
    name: 'POLYESTER SHAGGY RUGS',
    image: '/polyester-shaggy-rugs.jpg',
    link: '/categories/rugs-mats/polyester-shaggy-rugs',
    productCount: 12
  },
  {
    id: 3,
    name: 'CARVED RUGS',
    image: '/carved50-hover.jpg',
    link: '/category/rugs/rugtype/carved-rugs',
    productCount: 78
  },
  {
    id: 4,
    name: 'SHAGGY RUGS',
    image: '/shaggy14.jpg',
    link: '/category/rugs/rugtype/shaggy-rugs',
    productCount: 22
  },
  {
    id: 5,
    name: 'SOFT SHAGGY RUGS',
    image: '/soft-shaggy-rugs.jpg',
    link: '/categories/rugs-mats/soft-shaggy-rugs',
    productCount: 4
  }
];

export default function ShopRugsByType() {
  const router = useRouter();

  const handleCategoryClick = (link: string) => {
    router.push(link);
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
            src="/cat-rugs-main.jpg"
            alt="Rugs Category"
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
              }}>Rugs by Type</h1>
              <p style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Explore our diverse collection of rugs, from luxurious shaggy to elegant carved designs
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
              {categories.length} categories
            </div>
          </div>

          {/* Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {categories.map((category) => (
              <div 
                key={category.id} 
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  boxShadow: '0 2px 16px rgba(34,34,34,0.07)',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onClick={() => handleCategoryClick(category.link)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,34,34,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(34,34,34,0.07)';
                }}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>
                <div style={{
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#222',
                    lineHeight: '1.4',
                    textAlign: 'center'
                  }}>{category.name}</h3>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center',
                    fontWeight: 500
                  }}>
                    {category.productCount} products
                  </div>
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
} 