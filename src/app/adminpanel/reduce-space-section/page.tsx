'use client';

import React, { useEffect, useState } from 'react';
import EditProductModal from '@/components/EditProductModal';

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
  showOnReduceSpace?: boolean;
}

const AdminReduceSpaceSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      const filtered = (data.products || []).filter((product: Product) =>
        product.category === 'OUTDOOR' &&
        (product.subcategory === 'Chairs' || product.subcategory === 'CHAIRS' || product.subcategory === 'chairs')
      );
      setProducts(filtered);
    } catch (e) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Проверка уникальности SKU (поиск по всем товарам, кроме редактируемого)
  const validateUniqueSku = (product: any, isEditing: boolean, currentProductId?: string) => {
    let allSkus: string[] = [];
    products.forEach((p) => {
      if (p._id !== currentProductId) {
        if (p.sku) allSkus.push(p.sku);
        if (p.outdoorPrice?.sku) allSkus.push(p.outdoorPrice.sku);
      }
    });
    const isValid = !allSkus.includes(product.sku) && (!product.outdoorPrice || !allSkus.includes(product.outdoorPrice.sku));
    return { isValid, error: isValid ? undefined : 'SKU must be unique' };
  };

  // Обновление видимости товара на главной
  const handleToggleVisible = async (product: Product) => {
    setSavingId(product._id);
    try {
      const res = await fetch(`/api/products?id=${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, showOnReduceSpace: !product.showOnReduceSpace })
      });
      if (!res.ok) throw new Error('Failed to update visibility');
      await fetchProducts();
    } catch (e) {
      alert('Error updating visibility');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Reduce Space Section Admin</h1>
      {loading ? (
        <div style={{ fontSize: 20, color: '#a084e8', margin: 40 }}>Loading...</div>
      ) : error ? (
        <div style={{ fontSize: 18, color: 'red', margin: 40 }}>{error}</div>
      ) : products.length === 0 ? (
        <div style={{ fontSize: 18, color: '#bdbdbd', margin: 40 }}>No products found in OUTDOOR Chairs category</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(160,132,232,0.09)' }}>
          <thead>
            <tr style={{ background: '#f3f0fa', color: '#222', fontWeight: 700 }}>
              <th style={{ padding: 12, textAlign: 'left' }}>Image</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Title</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Price</th>
              <th style={{ padding: 12, textAlign: 'left' }}>SKU</th>
              <th style={{ padding: 12, textAlign: 'center' }}>Visible on Home</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} style={{ borderBottom: '1px solid #eee', background: product.showOnReduceSpace ? '#fff' : '#f8f8f8' }}>
                <td style={{ padding: 12 }}>
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.title} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                  ) : (
                    <span style={{ fontSize: 32 }}>🪑</span>
                  )}
                </td>
                <td style={{ padding: 12 }}>{product.title}</td>
                <td style={{ padding: 12 }}>{product.outdoorPrice ? `£${product.outdoorPrice.salePrice.toFixed(2)}` : 'No price'}</td>
                <td style={{ padding: 12 }}>{product.outdoorPrice?.sku || product.sku}</td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={!!product.showOnReduceSpace}
                    disabled={savingId === product._id}
                    onChange={() => handleToggleVisible(product)}
                    style={{ width: 22, height: 22, accentColor: '#111', cursor: savingId === product._id ? 'not-allowed' : 'pointer' }}
                    title="Show or hide this product on the main page"
                  />
                </td>
                <td style={{ padding: 12 }}>
                  <button
                    style={{
                      background: '#111',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 18px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 15,
                      letterSpacing: 0.5,
                    }}
                    onClick={() => { setEditProduct(product); setModalOpen(true); }}
                    title="Edit product details"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* EditProductModal интеграция */}
      {editProduct && (
        <EditProductModal
          open={modalOpen}
          onClose={() => { setEditProduct(null); setModalOpen(false); }}
          product={editProduct}
          onProductEdited={() => { setEditProduct(null); setModalOpen(false); fetchProducts(); }}
          validateUniqueSku={validateUniqueSku}
        />
      )}
    </div>
  );
};

export default AdminReduceSpaceSection; 