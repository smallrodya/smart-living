'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Product } from '@/context/ReduceSpaceContext';
import { useBasket } from '@/context/BasketContext';
import toast from 'react-hot-toast';

interface OpenModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const OpenModal: React.FC<OpenModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { addItem } = useBasket();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (product.isSoldOut) {
      toast.error('Product is out of stock');
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: parseFloat(product.price.replace('£', '')),
      image: product.src,
      category: 'OUTDOOR',
      sku: product.id,
      quantity: 1,
      stock: product.stock || 0,
      size: 'One Size'
    });
    toast.success('Product added to cart');
    onClose();
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок и кнопка закрытия */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Основной контент */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Изображения */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.src}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.isHot && (
                  <span className="absolute top-4 left-4 bg-black text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">
                    Hot
                  </span>
                )}
                {product.isSoldOut && (
                  <span className="absolute top-4 left-4 bg-gray-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">
                    Sold Out
                  </span>
                )}
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.hoverSrc}
                  alt={`${product.title} - hover view`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Информация о товаре */}
            <div className="space-y-6">
              {/* Название и цены */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-red-600">{product.price}</span>
                  <span className="text-lg text-gray-500 line-through">{product.oldPrice}</span>
                  <span className="text-lg font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    {product.discount}
                  </span>
                </div>
              </div>

              {/* Наличие */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">Availability</h4>
                <p className="text-gray-600">
                  {product.isSoldOut 
                    ? 'This product is currently out of stock'
                    : product.stock && product.stock <= 5
                    ? `Only ${product.stock} items left in stock`
                    : 'In stock'
                  }
                </p>
              </div>

              {/* Описание */}
              <div>
                <button
                  onClick={() => toggleSection('description')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-semibold text-gray-800">Description</h4>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${openSection === 'description' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSection === 'description' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-600">
                      {product.description || 'No description available'}
                    </p>
                  </div>
                )}
              </div>

              {/* Характеристики */}
              <div>
                <button
                  onClick={() => toggleSection('features')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-semibold text-gray-800">Features</h4>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${openSection === 'features' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSection === 'features' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {product.features && product.features.length > 0 ? (
                        product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))
                      ) : (
                        <li>No features available</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Доставка */}
              <div>
                <button
                  onClick={() => toggleSection('shipping')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-semibold text-gray-800">Shipping</h4>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${openSection === 'shipping' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSection === 'shipping' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Free Mainland UK Delivery</h5>
                      <p className="text-gray-600">We offer complimentary delivery on all orders within mainland UK — no minimum spend required.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Same-Day Dispatch</h5>
                      <p className="text-gray-600">Orders placed by 8:00 AM (Monday to Friday) are dispatched the same day. Orders placed after this time, or during weekends and bank holidays, will be dispatched on the next working day.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Delivery Timeframes</h5>
                      <p className="text-gray-600">Standard Delivery (Free): Estimated delivery within 2 to 5 working days.<br />
                      Express Delivery (Paid): Delivered on the next working day.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Packaging Information</h5>
                      <p className="text-gray-600">Please note: Due to courier requirements, larger rugs may be shipped folded rather than rolled. This does not impact the quality or performance of the product.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Order Tracking</h5>
                      <p className="text-gray-600">A tracking link will be emailed to you once your order has been dispatched, so you can monitor your delivery status in real time.</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Need Help?</h5>
                      <p className="text-gray-600">If you experience any issues with your delivery, our customer service team is happy to assist.</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-600">📧 Email: support@smart-living.co.uk</p>
                        <p className="text-gray-600">📞 Phone: 01384 521170</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="p-6 border-t">
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.isSoldOut}
              className="px-6 py-3 text-white bg-black rounded-xl hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenModal; 