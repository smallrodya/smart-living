"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export default function SearchDemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = [
    'bedding',
    'duvet',
    'pillow',
    'towel',
    'rug',
    'curtain',
    'cushion',
    'throw',
    'blanket',
    'sheet',
    'fleece',
    'cotton',
    'silk',
    'wool',
    'king size',
    'queen size',
    'single bed',
    'double bed',
    'super king',
    'bathroom',
    'kitchen',
    'bedroom',
    'living room',
    'outdoor',
    'garden',
    'patio',
    'footwear',
    'slippers',
    'boots',
    'clothing',
    'hoodie',
    'jeans',
    'joggers',
    'clearance',
    'sale',
    'hot deals',
    'new arrivals'
  ];

  const categories = [
    'BEDDING',
    'THROWS & TOWELS',
    'RUGS & MATS',
    'CURTAINS',
    'FOOTWEAR',
    'CLOTHING',
    'OUTDOOR',
    'FLEECE BEDDING',
    'WEIGHTED BLANKETS',
    'ELECTRIC UNDERBLANKETS',
    'BEDSPREADS',
    'CUSHIONS',
    'PILLOWCASES',
    'FITTED SHEETS',
    'TEA TOWELS',
    'DOOR MATS',
    'KITCHEN MATS',
    'HALLWAY RUNNERS',
    'TABLE RUNNERS',
    'TABLE PLACEMATS'
  ];

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
          {/* Search Demo Header */}
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
              Search Demo
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#666',
              marginBottom: '30px'
            }}>
              Test our powerful search functionality
            </p>
          </div>

          {/* Search Form */}
          <div style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto 50px'
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div>
                <label htmlFor="search-input" style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#222',
                  marginBottom: '8px'
                }}>
                  Search Products
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Enter your search query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #eee',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#222';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34,34,34,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#eee';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                style={{
                  background: searchQuery.trim() ? '#222' : '#ccc',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: searchQuery.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (searchQuery.trim()) {
                    e.currentTarget.style.background = '#333';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (searchQuery.trim()) {
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                Search Products
              </button>
            </form>
          </div>

          {/* Popular Searches */}
          <div style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Popular Searches
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }}>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    router.push(`/search?q=${encodeURIComponent(search)}`);
                  }}
                  style={{
                    background: '#f8f8f8',
                    color: '#222',
                    border: '1px solid #eee',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f8f8';
                    e.currentTarget.style.color = '#222';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Product Categories
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(category);
                    router.push(`/search?q=${encodeURIComponent(category)}`);
                  }}
                  style={{
                    background: '#f8f8f8',
                    color: '#222',
                    border: '1px solid #eee',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f8f8';
                    e.currentTarget.style.color = '#222';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{
            marginTop: '50px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '30px'
            }}>
              Search Features
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginTop: '30px'
            }}>
              <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#e53935',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#222',
                  marginBottom: '10px'
                }}>
                  Smart Search
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Find products by name, category, color, style, and more with intelligent matching
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#222',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#222',
                  marginBottom: '10px'
                }}>
                  Relevance Ranking
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Results are sorted by relevance, with exact matches and popular items prioritized
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#4CAF50',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#222',
                  marginBottom: '10px'
                }}>
                  Auto Suggestions
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Get helpful suggestions as you type, including popular searches and categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
} 