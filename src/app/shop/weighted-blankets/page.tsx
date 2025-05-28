"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import CategoriesSection from '@/components/CategoriesSection';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Product {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  subcategory: string;
  sku: string;
  beddingSizes: Array<{ size: string; regularPrice: number; salePrice: number }>;
  beddingColors: string[];
  beddingStyles: string[];
  features: string;
  isSoldOut: boolean;
  isHot: boolean;
  discount?: number;
}

export default function WeightedBlanketsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      setWishlist(items.map((item: any) => item.id));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      console.log('All products:', data.products); // Для отладки
      const weightedBlankets = data.products.filter(
        (product: Product) => {
          console.log('Product category:', product.category); // Для отладки
          console.log('Product subcategory:', product.subcategory); // Для отладки
          return product.category === 'BEDDING' && 
                 product.subcategory === 'Weighted Blankets';
        }
      );
      console.log('Filtered weighted blankets:', weightedBlankets); // Для отладки
      setProducts(weightedBlankets);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const allSizes = Array.from(new Set(products.flatMap(p => p.beddingSizes.map(s => s.size))));
  const allColors = Array.from(new Set(products.flatMap(p => p.beddingColors || [])));

  const filteredProducts = products.filter(product => {
    const matchesSize = !selectedSize || product.beddingSizes.some(s => s.size === selectedSize);
    const matchesColor = !selectedColor || product.beddingColors.includes(selectedColor);
    const [minPrice, maxPrice] = priceRange;
    const productPrices = product.beddingSizes.map(s => s.salePrice);
    const productMinPrice = Math.min(...productPrices);
    const productMaxPrice = Math.max(...productPrices);
    const matchesPrice = productMinPrice >= minPrice && productMaxPrice <= maxPrice;
    return matchesSize && matchesColor && matchesPrice;
  });

  const clearFilters = () => {
    setSelectedSize('');
    setSelectedColor('');
    setPriceRange([0, 1000]);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const prefixedId = `weighted_${id}`;
      const newWishlist = prev.includes(prefixedId) 
        ? prev.filter(i => i !== prefixedId)
        : [...prev, prefixedId];
      
      try {
        const existingItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const validItems = Array.isArray(existingItems) 
          ? existingItems.filter(item => 
              item && 
              typeof item === 'object' && 
              'id' in item && 
              typeof item.id === 'string' && 
              !item.id.startsWith('weighted_')
            )
          : [];
        
        const newItems = products
          .filter((p) => newWishlist.includes(`weighted_${p._id}`))
          .map((item) => ({
            id: `weighted_${item._id}`,
            src: item.images?.[0] || '',
            hoverSrc: item.images?.[1] || item.images?.[0] || '',
            title: item.title,
            price: formatPriceRange(item),
            discount: item.discount ? `-${item.discount}%` : ''
          }));
        
        const wishlistItems = [...validItems, ...newItems];
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        return newWishlist;
      } catch (error) {
        console.error('Error handling wishlist:', error);
        return newWishlist;
      }
    });
  };

  const getProductPrice = (product: Product) => {
    if (!product.beddingSizes || product.beddingSizes.length === 0) return 0;
    return product.beddingSizes[0].salePrice;
  };

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const formatPriceRange = (product: Product) => {
    if (!product.beddingSizes || product.beddingSizes.length === 0) return '£0.00';
    const prices = product.beddingSizes.map(size => size.salePrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <CategoriesSection />
        {/* Category Image Section */}
        <div className="relative h-[300px] w-full">
          <Image
            src="/images/weighted-blankets-banner.jpg"
            alt="Weighted Blankets"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Weighted Blankets</h1>
          </div>
        </div>

        {/* Filters Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #eee',
                background: 'transparent',
                color: '#444',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                fontWeight: 500,
                width: '100%'
              }}
            >
              <option value="">All Sizes</option>
              {allSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">All Colors</option>
              {allColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <span>Price Range:</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-24 px-2 py-1 border rounded"
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-24 px-2 py-1 border rounded"
                min="0"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="w-full h-[300px] object-cover"
                  />
                  {product.isSoldOut && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600">{formatPriceRange(product)}</span>
                    {product.beddingSizes && product.beddingSizes.length > 0 && (
                      <span className="text-sm text-gray-500">
                        ({product.beddingSizes.map(size => size.size).join(', ')})
                      </span>
                    )}
                  </div>
                  {!product.isSoldOut && (
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Quick View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
} 