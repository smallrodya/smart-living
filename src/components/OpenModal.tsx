'use client';
import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Product } from '@/context/ReduceSpaceContext';

interface OpenModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const OpenModal: React.FC<OpenModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

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
              {/* Статусы */}
              <div className="flex gap-2">
                {product.isHot && (
                  <span className="bg-red-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">
                    Hot
                  </span>
                )}
                {product.isSoldOut && (
                  <span className="bg-gray-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">
                    Sold Out
                  </span>
                )}
                {product.stock && product.stock <= 5 && !product.isSoldOut && (
                  <span className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">
                    Low Stock
                  </span>
                )}
              </div>

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
                <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-gray-600">
                  Transform your outdoor space with this premium furniture piece. Perfect for creating a comfortable and stylish retreat in your garden or patio.
                </p>
              </div>

              {/* Характеристики */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Premium quality materials</li>
                  <li>Weather-resistant construction</li>
                  <li>Easy to assemble</li>
                  <li>Comfortable design</li>
                  <li>Stylish appearance</li>
                </ul>
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
              className="px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.isSoldOut}
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