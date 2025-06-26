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
  clearanceDiscount?: number;
  sku: string;
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
        <h1 className="text-3xl font-bold mb-8 mt-10 text-center">Shopping Basket</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your basket is empty</p>
            <button
              onClick={() => router.push('/')}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
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
                      <td className="px-6 py-4 text-sm text-gray-500">{item.sku}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          item.stock && item.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getStockInfo(item)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        £{item.price ? item.price.toFixed(2) : '0.00'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            disabled={item.stock !== undefined && item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        £{((item.clearanceDiscount ? item.price * (1 - item.clearanceDiscount / 100) : item.price) * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => removeItem(item.id, item.size)}
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

            {/* Mobile View */}
            <div className="md:hidden">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-200">
                  <div className="flex items-start space-x-4">
                    {item.image && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                          <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          item.stock && item.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getStockInfo(item)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            disabled={item.stock !== undefined && item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Price: £{item.price ? item.price.toFixed(2) : '0.00'}</p>
                          <p className="font-medium text-gray-900">Total: £{((item.clearanceDiscount ? item.price * (1 - item.clearanceDiscount / 100) : item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-4 md:px-6 py-4 bg-gray-50 border-t">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-lg font-medium">Total: £{total.toFixed(2)}</div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto md:items-center">
                  <button
                    onClick={() => router.push('/')}
                    className="w-full md:w-auto bg-white text-black border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => router.push('/basket/checkout')}
                    className="w-full md:w-auto bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 