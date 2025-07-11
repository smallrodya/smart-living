import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AddToBagModalProps {
  open: boolean;
  onClose: () => void;
  onGoToBasket: () => void;
  product: {
    title: string;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
    price: number;
    category?: string;
  };
  productId?: string;
}

interface Product {
  _id: string;
  title: string;
  images?: string[];
  price?: number;
  salePrice?: number;
  discount?: number;
  clearanceDiscount?: number;
  category?: string;
  sku?: string;
}

const AddToBagModal: React.FC<AddToBagModalProps> = ({ open, onClose, onGoToBasket, product, productId }) => {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product?.category) return;
    setLoading(true);
    fetch(`/api/products?category=${encodeURIComponent(product.category)}&limit=8`)
      .then(res => res.json())
      .then(data => {
        setRelated((data.products || []).filter((p: Product) => p._id !== productId));
      })
      .finally(() => setLoading(false));
  }, [product?.category, product?.title, product?.image, productId]);

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.32)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        maxWidth: 600,
        width: '100%',
        padding: 32,
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            color: '#222',
          }}
          aria-label="Close"
        >
          ×
        </button>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>Added to Bag</h2>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 18 }}>
          <div style={{ width: 90, height: 90, position: 'relative', flexShrink: 0 }}>
            <Image src={product.image} alt={product.title} fill style={{ objectFit: 'cover', borderRadius: 12 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{product.title}</div>
            {product.size && <div style={{ fontSize: 14, color: '#666' }}>Size: {product.size}</div>}
            {product.color && <div style={{ fontSize: 14, color: '#666' }}>Colour: {product.color}</div>}
            <div style={{ fontSize: 14, color: '#666' }}>Qty: {product.quantity}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>£{product.price.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 18, marginBottom: 24 }}>
          <button
            onClick={onGoToBasket}
            style={{
              flex: 1,
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 0',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Go to Basket
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: '#f8bfc9',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 0',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Continue Shopping
          </button>
        </div>
        {/* Others Also Bought */}
        <div style={{ marginTop: 18 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>Others Also Bought</h3>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#888', padding: 24 }}>Loading...</div>
          ) : (
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
              {related.map(item => (
                <div key={item._id} style={{
                  minWidth: 140,
                  maxWidth: 160,
                  background: '#fafafa',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  {item.discount && (
                    <span style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      background: '#e53935',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 12,
                      borderRadius: 8,
                      padding: '2px 8px',
                      zIndex: 2
                    }}>
                      Save {item.discount}%
                    </span>
                  )}
                  <div style={{ width: 90, height: 90, position: 'relative', marginBottom: 8 }}>
                    <Image src={item.images?.[0] || '/placeholder.jpg'} alt={item.title} fill style={{ objectFit: 'cover', borderRadius: 8 }} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, textAlign: 'center', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#e53935', fontWeight: 700 }}>
                    £{item.salePrice?.toFixed(2) || item.price?.toFixed(2) || '0.00'}
                  </div>
                  {item.price && item.salePrice && item.salePrice < item.price && (
                    <div style={{ fontSize: 12, color: '#888', textDecoration: 'line-through' }}>
                      £{item.price.toFixed(2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToBagModal;
