'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

interface BasketItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
}

export default function BasketPage() {
  const [items, setItems] = useState<BasketItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const basketRaw = window.localStorage.getItem('basket');
        setItems(basketRaw ? JSON.parse(basketRaw) : []);
      } catch {
        setItems([]);
      }
    }
  }, []);

  const handleRemove = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('basket', JSON.stringify(newItems));
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <main style={{ maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.13)', padding: '32px 16px 40px 16px', minHeight: 400, position: 'relative' }}>
        <button
          onClick={() => router.push('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            color: '#444',
            fontWeight: 600,
            fontSize: 17,
            cursor: 'pointer',
            marginBottom: 18,
            padding: '6px 12px',
            borderRadius: 8,
            transition: 'background 0.18s',
            boxShadow: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <span style={{ display: 'inline-block', fontSize: 20, lineHeight: 1, marginRight: 2 }}>←</span>
          Back to shopping
        </button>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32, letterSpacing: 0.5, textAlign: 'center' }}>Your Basket</h1>
        {items.length === 0 ? (
          <div style={{ color: '#888', fontSize: 22, textAlign: 'center', margin: '80px 0', fontWeight: 500 }}>Your basket is empty</div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', background: '#fafbfc', padding: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginBottom: 36, fontSize: 17, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', background: '#f7f7f7' }}>
                  <th style={{ textAlign: 'left', padding: 14, fontWeight: 700 }}>Product</th>
                  <th style={{ textAlign: 'left', padding: 14, fontWeight: 700 }}>Size</th>
                  <th style={{ textAlign: 'right', padding: 14, fontWeight: 700 }}>Price</th>
                  <th style={{ textAlign: 'right', padding: 14, fontWeight: 700 }}>Quantity</th>
                  <th style={{ textAlign: 'right', padding: 14, fontWeight: 700 }}>Subtotal</th>
                  <th style={{ textAlign: 'center', padding: 14, fontWeight: 700 }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0', background: '#fff', transition: 'background 0.2s' }}>
                    <td style={{ padding: 14, fontWeight: 500 }}>{item.title}</td>
                    <td style={{ padding: 14 }}>{item.size}</td>
                    <td style={{ padding: 14, textAlign: 'right' }}>£{item.price.toFixed(2)}</td>
                    <td style={{ padding: 14, textAlign: 'right' }}>{item.quantity}</td>
                    <td style={{ padding: 14, textAlign: 'right', fontWeight: 600 }}>£{(item.price * item.quantity).toFixed(2)}</td>
                    <td style={{ padding: 14, textAlign: 'center' }}>
                      <button onClick={() => handleRemove(item.id)} style={{
                        background: 'none',
                        border: 'none',
                        color: '#e53935',
                        fontSize: 22,
                        cursor: 'pointer',
                        fontWeight: 700,
                        borderRadius: 8,
                        padding: 6,
                        transition: 'background 0.18s',
                      }}
                        title="Remove item"
                        onMouseEnter={e => e.currentTarget.style.background = '#ffeaea'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ borderTop: '1.5px solid #eee', margin: '0 0 32px 0', paddingTop: 24, textAlign: 'right', fontSize: 26, fontWeight: 800, letterSpacing: 0.5 }}>
              Total: <span style={{ color: '#e53935' }}>£{total.toFixed(2)}</span>
            </div>
            <button style={{
              padding: '20px 48px',
              background: 'linear-gradient(90deg, #e53935 60%, #ff7043 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 22,
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'block',
              marginLeft: 'auto',
              boxShadow: '0 4px 16px rgba(229,57,53,0.10)',
              letterSpacing: 0.5
            }}>
              Checkout
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 