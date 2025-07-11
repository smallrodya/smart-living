import React from 'react';
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
  };
}

const AddToBagModal: React.FC<AddToBagModalProps> = ({ open, onClose, onGoToBasket, product }) => {
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
        maxWidth: 480,
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
        <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>
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
      </div>
    </div>
  );
};

export default AddToBagModal;
