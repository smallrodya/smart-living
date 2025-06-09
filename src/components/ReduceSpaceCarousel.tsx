'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileReduceSpaceCarousel from './MobileReduceSpaceCarousel';
import { useRouter } from 'next/navigation';
import { useReduceSpace } from '@/context/ReduceSpaceContext';
import OpenModal from './OpenModal';
import { ExternalLink } from 'lucide-react';

const DesktopReduceSpaceCarousel = () => {
  const router = useRouter();
  const { sectionTitle, sectionDescription, products } = useReduceSpace();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{sectionTitle}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Статусы товара */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {product.isHot && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                    Hot
                  </span>
                )}
                {product.isSoldOut && (
                  <span className="bg-gray-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                    Sold Out
                  </span>
                )}
                {product.stock && product.stock <= 5 && !product.isSoldOut && (
                  <span className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                    Low Stock
                  </span>
                )}
              </div>

              {/* Изображение */}
              <div 
                className="relative aspect-square overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product.id)}
              >
                <Image
                  src={hoveredProduct === product.id ? product.hoverSrc : product.src}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Информация о товаре */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-gray-800 group-hover:text-black transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-red-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>
                  <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    {product.discount}
                  </span>
                </div>
                <button
                  onClick={() => handleProductClick(product.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Product
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно */}
        {selectedProduct && (
          <OpenModal
            product={products.find(p => p.id === selectedProduct)!}
            isOpen={!!selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </section>
  );
};

const ReduceSpaceCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileReduceSpaceCarousel /> : <DesktopReduceSpaceCarousel />;
};

export default ReduceSpaceCarousel; 