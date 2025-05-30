'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useBasket } from '@/context/BasketContext';
import Image from 'next/image';

interface Product {
  _id: string;
  title: string;
  images: string[];
  beddingSizes?: Array<{
    size: string;
    salePrice: number;
    stock: number;
  }>;
  throwsTowelsStylePrices?: Array<{
    size: string;
    salePrice: number;
    stock: number;
  }>;
  rugsMatsSizes?: Array<{
    size: string;
    salePrice: number;
    stock: number;
  }>;
}

export default function BasketPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, total } = useBasket();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productIds = [...new Set(items.map(item => item.id.split('-')[0]))];
        const productsData: Record<string, Product> = {};
        
        for (const id of productIds) {
          try {
            const response = await fetch(`/api/products/${id}`);
            if (response.ok) {
              const product = await response.json();
              productsData[id] = product;
            }
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        }
        
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };

    if (items.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [items]);

  const getStockInfo = (item: any) => {
    if (!item.stock) return 'Out of Stock';
    return `In Stock (${item.stock})`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Shopping Basket</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your basket is empty</p>
            <button
              onClick={() => router.push('/shop')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.image && (
                            <div className="relative w-16 h-16 mr-4">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.stock && item.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getStockInfo(item)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">£{item.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            disabled={item.stock !== undefined && item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">£{(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium">Total: £{total.toFixed(2)}</div>
                <button
                  onClick={() => router.push('/checkout')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 