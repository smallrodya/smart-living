// 'use client';
import React, { useEffect, useState, useRef } from 'react';
import QuickViewModal from './QuickViewModal';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  title: string;
  description: string;
  features: string;
  price: string;
  sku: string;
  images?: string[];
  outdoorPrice?: {
    sku: string;
    regularPrice: number;
    salePrice: number;
    stock: number;
  };
  outdoorColors?: string[];
  category: string;
  subcategory: string;
  showOnReduceSpace: boolean;
}

function getRandomRating() {
  // Возвращает число от 4.6 до 5.0 с шагом 0.1
  return (Math.random() * 0.4 + 4.6).toFixed(1);
}

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 900;

const ReduceSpaceCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [ratings, setRatings] = useState<{ [id: string]: string }>({});
  const [mobile, setMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftHint, setShowLeftHint] = useState(false);
  const [showRightHint, setShowRightHint] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!mobile || !scrollRef.current) return;
    const checkHints = () => {
      const el = scrollRef.current;
      if (!el) return;
      setShowLeftHint(el.scrollLeft > 10);
      setShowRightHint(el.scrollLeft + el.offsetWidth < el.scrollWidth - 10);
    };
    checkHints();
    scrollRef.current.addEventListener('scroll', checkHints);
    return () => scrollRef.current?.removeEventListener('scroll', checkHints);
  }, [mobile, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const filtered = (data.products || []).filter((product: Product) =>
          product.category === 'OUTDOOR' &&
          (product.subcategory === 'Chairs' || product.subcategory === 'CHAIRS' || product.subcategory === 'chairs') &&
          product.showOnReduceSpace === true
        );
        setProducts(filtered.slice(0, 5)); // Only first 5 products
        // Фиксированные рейтинги для каждого товара
        const newRatings: { [id: string]: string } = {};
        const fixedRatings = ['4.8', '4.9', '4.7', '4.8', '4.9'];
        filtered.slice(0, 5).forEach((product: Product, index: number) => {
          newRatings[product._id] = fixedRatings[index] || '4.8';
        });
        setRatings(newRatings);
      } catch (e) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Функция для отображения звезд
  const renderStars = (rating: string) => {
    const value = parseFloat(rating);
    const fullStars = Math.floor(value);
    const halfStar = value - fullStars >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#111', fontSize: 18 }}>★</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" style={{ color: '#111', fontSize: 18 }}>☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={stars.length + 'empty'} style={{ color: '#e0e0e0', fontSize: 18 }}>★</span>);
    }
    return stars;
  };

  const handleGoToBasket = () => {
    setQuickViewProduct(null);
    setTimeout(() => {
      router.push('/basket');
    }, 50);
  };

  return (
    <section style={{
      width: '100%',
      minHeight: 400,
      background: '#fff',
      padding: '80px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h2
        ref={titleRef}
        className={titleVisible ? 'animated-title' : ''}
        style={{
          fontSize: mobile ? 20 : 28,
          fontWeight: 800,
          color: '#1a1a1a',
          marginBottom: 18,
          textTransform: 'uppercase',
          letterSpacing: 0.2,
          fontFamily: 'Montserrat, sans-serif',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {Array.from('OUTDOOR CHAIRS COLLECTION').map((char, i) => (
          <span
            key={i}
            className={titleVisible ? 'char-animate' : ''}
            style={{
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(50px) scale(0.5)',
              animation: titleVisible
                ? `charIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards ${i * 0.08 + 0.2}s`
                : 'none',
              backgroundImage: titleVisible 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)'
                : 'none',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: titleVisible ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
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
              animation: 'reduceSpaceUnderline 1.2s ease-out 1.5s forwards',
            }}
          />
        )}
      </h2>
      <p style={{
        fontSize: 20,
        color: '#5a5a5a',
        marginBottom: 40,
        maxWidth: 600,
        textAlign: 'center',
        fontFamily: 'Montserrat, sans-serif',
      }}>
        Discover the best products for your outdoor relaxation!
      </p>
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 32,
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1400,
        }}>
          {[1,2,3,4,5].map((n) => (
            <div key={n} style={{
              width: 300,
              height: 360,
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(200,200,255,0.13)',
              borderRadius: 24,
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontSize: 18,
              color: '#bdbdbd',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              opacity: 1,
              padding: 20,
              cursor: 'default',
              transition: 'box-shadow 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '100%',
                height: 140,
                marginBottom: 16,
                borderRadius: 16,
                background: 'linear-gradient(90deg, #ece9f6 25%, #e0dff0 50%, #ece9f6 75%)',
                animation: 'skeleton-loading 1.2s infinite linear',
              }} />
              <div style={{
                width: '80%',
                height: 22,
                borderRadius: 8,
                background: 'linear-gradient(90deg, #ece9f6 25%, #e0dff0 50%, #ece9f6 75%)',
                marginBottom: 12,
                animation: 'skeleton-loading 1.2s infinite linear',
              }} />
              <div style={{
                width: '60%',
                height: 18,
                borderRadius: 8,
                background: 'linear-gradient(90deg, #ece9f6 25%, #e0dff0 50%, #ece9f6 75%)',
                marginBottom: 12,
                animation: 'skeleton-loading 1.2s infinite linear',
              }} />
              <div style={{
                width: '70%',
                height: 18,
                borderRadius: 8,
                background: 'linear-gradient(90deg, #ece9f6 25%, #e0dff0 50%, #ece9f6 75%)',
                marginBottom: 18,
                animation: 'skeleton-loading 1.2s infinite linear',
              }} />
              <div style={{
                width: '100%',
                height: 40,
                borderRadius: 8,
                background: 'linear-gradient(90deg, #ece9f6 25%, #e0dff0 50%, #ece9f6 75%)',
                marginTop: 'auto',
                animation: 'skeleton-loading 1.2s infinite linear',
              }} />
              <style>{`
                @keyframes skeleton-loading {
                  0% { background-position: -200px 0; }
                  100% { background-position: calc(200px + 100%) 0; }
                }
              `}</style>
            </div>
          ))}
        </div>
      ) : error ? (
        <div style={{fontSize: 18, color: 'red', margin: 40}}>{error}</div>
      ) : products.length === 0 ? (
        <div style={{fontSize: 18, color: '#bdbdbd', margin: 40}}>No products found in OUTDOOR Chairs category</div>
      ) : (
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
        }}>
          {mobile && (
            <>
              {showLeftHint && <div style={{position:'absolute',left:0,top:0,bottom:0,width:32,pointerEvents:'none',zIndex:2,background:'linear-gradient(to right, #fff 70%, rgba(255,255,255,0))'}} />}
              {showRightHint && <div style={{position:'absolute',right:0,top:0,bottom:0,width:32,pointerEvents:'none',zIndex:2,background:'linear-gradient(to left, #fff 70%, rgba(255,255,255,0))'}} />}
            </>
          )}
          <div
            ref={scrollRef}
            style={mobile ? {
              overflowX: 'auto',
              overflowY: 'hidden',
              WebkitOverflowScrolling: 'touch',
              display: 'flex',
              gap: 16,
              paddingBottom: 8,
              paddingLeft: 'calc(50vw - 150px)',
              paddingRight: 'calc(50vw - 150px)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
            } : {
              display: 'grid',
              gridTemplateColumns: `repeat(${products.length}, 1fr)` ,
              gap: 32,
              justifyContent: 'center',
              width: '100%',
              maxWidth: 1400,
            }}
            className={mobile ? 'mobile-carousel-scroll' : ''}
          >
            {products.map((product) => (
              <div key={product._id} style={{
                width: 340,
                minWidth: 260,
                maxWidth: 300,
                height: 400,
                background: 'rgba(255,255,255,0.35)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(200,200,255,0.18)',
                borderRadius: 24,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                fontSize: 18,
                color: '#a084e8',
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                opacity: 1,
                padding: 20,
                cursor: 'default',
                transition: 'box-shadow 0.2s',
                scrollSnapAlign: mobile ? 'center' : undefined,
                marginRight: mobile ? 8 : undefined,
              }}
              >
                <div style={{width: '100%', height: 200, marginBottom: 16, borderRadius: 16, overflow: 'hidden', background: '#f3f0fa', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                  {/* HOT icon */}
                  <span style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: '#000',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    borderRadius: '50%',
                    width: 47,
                    height: 47,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    zIndex: 2
                  }}>
                    HOT
                  </span>
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <span style={{fontSize: 48}}>🪑</span>
                  )}
                </div>
                <div style={{fontWeight: 700, fontSize: 18, marginBottom: 8, textAlign: 'center', color: '#1a1a1a'}}>{product.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {product.outdoorPrice && (
                    <span style={{ 
                      textDecoration: 'line-through',
                      color: '#999',
                      fontSize: 15
                    }}>
                      £{product.outdoorPrice.regularPrice.toFixed(2)}
                    </span>
                  )}
                  <span style={{
                    fontWeight: '600',
                    fontSize: '17px',
                    color: '#e53935'
                  }}>
                    {product.outdoorPrice ? `£${product.outdoorPrice.salePrice.toFixed(2)}` : 'No price'}
                  </span>
                </div>
                {/* Рейтинг */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  {renderStars(ratings[product._id] || '4.8')}
                  <span style={{ color: '#222', fontWeight: 600, fontSize: 15, marginLeft: 4 }}>{ratings[product._id] || '4.8'}</span>
                </div>
                {/* Кнопка View */}
                <button
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    background: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: 'auto',
                    transition: 'background 0.2s',
                    letterSpacing: 0.5,
                  }}
                  onClick={() => setQuickViewProduct(product)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
          <style>{`
            .mobile-carousel-scroll::-webkit-scrollbar { display: none; }
            .mobile-carousel-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </div>
      )}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onGoToBasket={handleGoToBasket} />
      )}
      <style>{`
        @keyframes charIn {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.5) rotateX(-90deg);
            filter: blur(10px);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-10px) scale(1.1) rotateX(10deg);
            filter: blur(2px);
          }
          80% {
            opacity: 1;
            transform: translateY(5px) scale(1.05) rotateX(-2deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes reduceSpaceUnderline {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 70%;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ReduceSpaceCarousel; 