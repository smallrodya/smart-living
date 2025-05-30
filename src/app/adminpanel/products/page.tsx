"use client";
import { useState, useEffect } from "react";
import AddProductModal from '../../../components/AddProductModal';
import EditProductModal from '../../../components/EditProductModal';

export const dynamic = 'force-dynamic';

// Категории из CategoriesSection.tsx
const categories = [
  'BEDDING',
  'RUGS & MATS',
  'THROWS & TOWELS',
  'OUTDOOR',
  'CURTAINS',
  'CLOTHING',
  'FOOTWEAR',
  'CLEARANCE',
];

// Подкатегории для BEDDING
const beddingSubcategories = [
  'Duvet Cover Sets',
  'Complete Bedding Sets',
  'Fitted Sheets',
  'Pillowcases',
  'Fleece Bedding',
  'Weighted Blankets',
  'Kids Beding',
  'Bedspreads',
  'Electric Underblankets',
];

// Подкатегории для RUGS & MATS
const rugsMatsSubcategories = {
  RUGS: [
    'Shaggy Rugs',
    'Carved Rugs',
    'Reversible Rugs',
    'Hallway Runner',
    'Table Runner'
  ],
  MATS: [
    'Door Mat',
    'Kitchen Mat',
    'Hallway Runner',
    'Table Placemat'
  ]
};

// Подкатегории для THROWS & TOWELS
const throwsTowelsSubcategories = [
  'Tea Towels',
  '8Pc Towel Bale Set',
  '10Pc Towel Bale Set',
  'Weighted Blankets',
  'Throws'
];

// Стили для THROWS & TOWELS
const throwsTowelsStyles = [
  'Fleece',
  'Plain',
  '3D',
  'Chunky Hand Knitted'
];

// Цвета для THROWS & TOWELS
const throwsTowelsColors = [
  'White',
  'Black',
  'Grey',
  'Blue',
  'Pink',
  'Green',
  'Yellow',
  'Red',
  'Purple',
  'Beige',
  'Brown',
  'Multi'
];

// Дополнительные опции для категории BEDDING
const beddingSizes = ['Single', 'Double', 'King', 'Super King', 'Crib'];
const beddingStyles = ['Printed', 'Plain', '3D', 'Teddy', 'Hotel Quality'];
const beddingColors = [
  'White',
  'Black',
  'Grey',
  'Blue',
  'Pink',
  'Green',
  'Yellow',
  'Red',
  'Purple',
  'Beige',
  'Teal',
  'Emerald',
  'Ochre',
  'Gold',
  'Champagne',
  'Oyster',
  'Orange',
  'Other Colours',
  'Multi Colours',
  'Brown'
];

// Дополнительные опции для категории RUGS & MATS
const rugsMatsSizes = ['Small', 'Medium', 'Large', 'Xlarge', 'Runner'];
const rugsMatsColors = ['White', 'Black', 'Grey', 'Blue', 'Pink', 'Green', 'Yellow', 'Red', 'Purple', 'Beige', 'Brown', 'Multi'];

// Подкатегории для OUTDOOR
const outdoorSubcategories = [
  'Shop all'
];

// Подкатегории для CURTAINS (заглушка)
const curtainsSubcategories = [
  'Coming Soon'
];

// Размеры для CURTAINS
const curtainsSizes = [
  'Small',
  'Medium',
  'Large',
  'Extra Large',
  'Custom'
];

// Цвета для CURTAINS
const curtainsColors = [
  'White',
  'Black',
  'Grey',
  'Blue',
  'Pink',
  'Green',
  'Yellow',
  'Red',
  'Purple',
  'Beige',
  'Brown',
  'Multi'
];

// Подкатегории для CLOTHING
const clothingSubcategories = [
  "Men's",
  "Women's",
  "Kid's"
];

// Стили для CLOTHING
const clothingStyles = [
  'Jeans',
  'Joggers',
  'Hoodies',
  'Polo Shirts',
  'Loungewear',
  'Bathrobes'
];

// Цвета для CLOTHING
const clothingColors = [
  'White',
  'Black',
  'Grey',
  'Blue',
  'Pink',
  'Green',
  'Yellow',
  'Red',
  'Purple',
  'Beige',
  'Brown',
  'Multi'
];

// Подкатегории для FOOTWEAR
const footwearSubcategories = [
  'Booties',
  'Slippers',
  'Socks'
];

// Размеры для FOOTWEAR
const footwearSizes = [
  'UK 3-4',
  'UK 5-6',
  'UK 7-8',
  'UK 9-10',
  'UK 11-12',
  'Small',
  'Medium',
  'Large'
];

// Цвета для FOOTWEAR
const footwearColors = [
  'White',
  'Black',
  'Grey',
  'Blue',
  'Pink',
  'Green',
  'Yellow',
  'Red',
  'Purple',
  'Beige',
  'Brown',
  'Multi'
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setEditModalOpen(true);
  };

  const getSubcategories = (category: string) => {
    switch (category) {
      case 'BEDDING':
        return beddingSubcategories;
      case 'RUGS & MATS':
        return [...rugsMatsSubcategories.RUGS, ...rugsMatsSubcategories.MATS];
      case 'THROWS & TOWELS':
        return throwsTowelsSubcategories;
      case 'OUTDOOR':
        return outdoorSubcategories;
      case 'CURTAINS':
        return curtainsSubcategories;
      case 'CLOTHING':
        return clothingSubcategories;
      case 'FOOTWEAR':
        return footwearSubcategories;
      default:
        return [];
    }
  };

  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      product.title.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.subcategory?.toLowerCase().includes(searchLower) ||
      product.sku?.toLowerCase().includes(searchLower);
    
    // Если выбрана категория Clearance, показываем все товары с isClearance: true
    if (selectedCategory === 'CLEARANCE') {
      return matchesSearch && product.isClearance;
    }

    // Если выбрана категория Hot, показываем все товары с isHot: true
    if (selectedCategory === 'HOT') {
      return matchesSearch && product.isHot;
    }
    
    // Для остальных категорий
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const toggleProductExpand = (productId: string) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const renderProductSizes = (sizes: any[]) => {
    if (!sizes || sizes.length === 0) return null;
    return (
      <div className="mt-2">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Available Sizes:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sizes.map((size, index) => {
            const discountedPrice = size.salePrice;
            return (
              <div key={index} className="bg-gray-50 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{size.size}</span>
                  <span className="text-sm text-gray-500">SKU: {size.sku || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Stock: {size.stock || 0}</span>
                  <div className="text-sm">
                    <span className="text-gray-500 line-through mr-2">£{size.regularPrice}</span>
                    <span className="text-green-600 font-medium">£{discountedPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} onProductAdded={fetchProducts} />
      <EditProductModal open={editModalOpen} onClose={() => setEditModalOpen(false)} product={editingProduct} onProductEdited={fetchProducts} />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setModalOpen(true)}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!selectedCategory || selectedCategory === 'CLEARANCE'}
            >
              <option value="">All Subcategories</option>
              {getSubcategories(selectedCategory).map(subcategory => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategory === 'CLEARANCE'}
                  onChange={(e) => {
                    setSelectedCategory(e.target.checked ? 'CLEARANCE' : '');
                    setSelectedSubcategory('');
                  }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Clearance</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategory === 'HOT'}
                  onChange={(e) => {
                    setSelectedCategory(e.target.checked ? 'HOT' : '');
                    setSelectedSubcategory('');
                  }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Hot</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <div key={product._id} className="p-6 bg-white">
                <div 
                  className="flex flex-col md:flex-row gap-6 cursor-pointer"
                  onClick={() => toggleProductExpand(product._id)}
                >
                  {/* Product Image */}
                  {product.images && product.images.length > 0 && (
                    <div className="w-full md:w-48 h-48 relative rounded-lg overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Product Header */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">{product.category}</span>
                          {product.subcategory && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{product.subcategory}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 text-xs border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(product);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-xs border border-red-600 text-red-600 hover:bg-red-50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(product._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Product Status */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isSoldOut ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.isSoldOut ? 'Sold Out' : 'In Stock'}
                      </span>
                      {product.isHot && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Hot
                        </span>
                      )}
                      {product.isClearance && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Clearance {product.clearanceDiscount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Expandable Content */}
                    <div 
                      className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedProducts.has(product._id) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {/* Clearance Information */}
                      {product.isClearance && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-purple-900 mb-2">Clearance Details</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-purple-700">Discount: {product.clearanceDiscount}%</span>
                            {product.beddingSizes && product.beddingSizes.length > 0 && (
                              <div className="ml-4">
                                <span className="text-sm text-purple-700">Original Price: £{product.beddingSizes[0].regularPrice}</span>
                                <span className="text-sm text-purple-700 ml-2">Sale Price: £{product.beddingSizes[0].salePrice}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Sizes */}
                      {product.beddingSizes && renderProductSizes(product.beddingSizes)}
                      {product.rugsMatsSizes && renderProductSizes(product.rugsMatsSizes)}

                      {/* Styles */}
                      {product.beddingStyles && product.beddingStyles.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Styles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.beddingStyles.map((style: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                              >
                                {style}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Colors */}
                      {product.beddingColors && product.beddingColors.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Colors:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.beddingColors.map((color: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rugs & Mats Colors */}
                      {product.rugsMatsColors && product.rugsMatsColors.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Colors:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.rugsMatsColors.map((color: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Type for Rugs & Mats */}
                      {product.rugsMatsType && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Type:</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {product.rugsMatsType}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Open Product Button */}
                    <div className="mt-[60px] flex justify-center">
                      <button
                        className="text-sm text-gray-900 hover:text-gray-700 transition-colors -ml-[200px] border border-gray-900 px-3 py-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProductExpand(product._id);
                        }}
                      >
                        Open Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 