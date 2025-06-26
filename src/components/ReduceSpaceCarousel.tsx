// 'use client';
import React, { useEffect, useState } from 'react';
import QuickViewModal from './QuickViewModal';

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

const ReduceSpaceCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [ratings, setRatings] = useState<{ [id: string]: string }>({});

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
        // Генерируем рейтинг для каждого товара
        const newRatings: { [id: string]: string } = {};
        filtered.slice(0, 5).forEach((product: Product) => {
          newRatings[product._id] = getRandomRating();
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

  // Функция для отображения звезд
  const renderStars = (rating: string) => {
    const value = parseFloat(rating);
    const fullStars = Math.floor(value);
    const halfStar = value - fullStars >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#FFD700', fontSize: 18 }}>★</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" style={{ color: '#FFD700', fontSize: 18 }}>☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={stars.length + 'empty'} style={{ color: '#e0e0e0', fontSize: 18 }}>★</span>);
    }
    return stars;
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
      <h2 style={{
        fontSize: 36,
        fontWeight: 800,
        color: '#1a1a1a',
        marginBottom: 18,
        textTransform: 'uppercase',
        letterSpacing: 0.2,
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'center',
      }}>
        Outdoor Chairs Collection
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
          display: 'grid',
          gridTemplateColumns: `repeat(${products.length}, 1fr)` ,
          gap: 32,
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1400,
        }}>
          {products.map((product) => (
            <div key={product._id} style={{
              width: 300,
              height: 360,
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
            }}
            >
              <div style={{width: '100%', height: 140, marginBottom: 16, borderRadius: 16, overflow: 'hidden', background: '#f3f0fa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                ) : (
                  <span style={{fontSize: 48}}>🪑</span>
                )}
              </div>
              <div style={{fontWeight: 700, fontSize: 18, marginBottom: 8, textAlign: 'center', color: '#1a1a1a'}}>{product.title}</div>
              <div style={{fontSize: 16, color: '#a084e8', marginBottom: 8}}>
                {product.outdoorPrice ? `£${product.outdoorPrice.salePrice.toFixed(2)}` : 'No price'}
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
      )}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
};

export default ReduceSpaceCarousel; 