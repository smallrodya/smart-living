'use client';
import React, { useState, useEffect } from 'react';

interface SizePrice {
  size: string;
  regularPrice: number;
  salePrice: number;
}

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: any;
  onProductEdited: () => void;
}

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

const throwsTowelsSubcategories = [
  'Tea Towels',
  '8Pc Towel Bale Set',
  '10Pc Towel Bale Set',
  'Weighted Blankets',
  'Throws'
];

const throwsTowelsStyles = [
  'Fleece',
  'Plain',
  '3D',
  'Chunky Hand Knitted'
];

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

const beddingSizes = ['Single', 'Double', 'King', 'Super King', 'Crib'];
const beddingStyles = ['Printed', 'Plain', '3D', 'Teddy', 'Hotel Quality'];
const beddingColors = ['White', 'Black', 'Grey', 'Blue', 'Pink', 'Green', 'Yellow', 'Red', 'Purple', 'Beige'];

const rugsMatsSizes = ['Small', 'Medium', 'Large', 'Xlarge', 'Runner'];
const rugsMatsColors = ['White', 'Black', 'Grey', 'Blue', 'Pink', 'Green', 'Yellow', 'Red', 'Purple', 'Beige', 'Brown', 'Multi'];

const outdoorSubcategories = [
  'Shop all'
];

const curtainsSubcategories = [
  'Coming Soon'
];

const curtainsSizes = [
  'Small',
  'Medium',
  'Large',
  'Extra Large',
  'Custom'
];

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

const clothingSubcategories = [
  "Men's",
  "Women's",
  "Kid's"
];

const clothingStyles = [
  'Jeans',
  'Joggers',
  'Hoodies',
  'Polo Shirts',
  'Loungewear',
  'Bathrobes'
];

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

const footwearSubcategories = [
  'Booties',
  'Slippers',
  'Socks'
];

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

export default function EditProductModal({ open, onClose, product, onProductEdited }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: '',
    price: '',
    category: '',
    subcategory: '',
    images: [] as string[],
    isSoldOut: false,
    isHot: false,
    sku: '',
    stock: 0,
    // Bedding specific
    beddingSizes: [] as SizePrice[],
    beddingStyles: [] as string[],
    beddingColors: [] as string[],
    // Rugs & Mats specific
    rugsMatsType: '' as 'RUGS' | 'MATS' | '',
    rugsMatsSizes: [] as SizePrice[],
    rugsMatsColors: [] as string[],
    // Throws & Towels specific
    throwsTowelsStyles: [] as string[],
    throwsTowelsColors: [] as string[],
    // Curtains specific
    curtainsSizes: [] as SizePrice[],
    curtainsColors: [] as string[],
    // Clothing specific
    clothingStyles: [] as string[],
    clothingColors: [] as string[],
    // Footwear specific
    footwearSizes: [] as SizePrice[],
    footwearColors: [] as string[]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        features: product.features || '',
        price: product.price || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        images: product.images || [],
        isSoldOut: product.isSoldOut || false,
        isHot: product.isHot || false,
        sku: product.sku || '',
        stock: product.stock || 0,
        beddingSizes: product.beddingSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0
        })) || [],
        beddingStyles: product.beddingStyles || [],
        beddingColors: product.beddingColors || [],
        rugsMatsType: product.rugsMatsType || '',
        rugsMatsSizes: product.rugsMatsSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0
        })) || [],
        rugsMatsColors: product.rugsMatsColors || [],
        throwsTowelsStyles: product.throwsTowelsStyles || [],
        throwsTowelsColors: product.throwsTowelsColors || [],
        curtainsSizes: product.curtainsSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0
        })) || [],
        curtainsColors: product.curtainsColors || [],
        clothingStyles: product.clothingStyles || [],
        clothingColors: product.clothingColors || [],
        footwearSizes: product.footwearSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0
        })) || [],
        footwearColors: product.footwearColors || []
      });
    }
  }, [product]);

  const handleSizePriceChange = (category: string, size: string, regularPrice: number, salePrice: number) => {
    const sizePrice: SizePrice = { size, regularPrice, salePrice };
    const sizesField = `${category.toLowerCase()}Sizes`;
    
    setFormData(prev => {
      const currentSizes = prev[sizesField as keyof typeof prev] as SizePrice[];
      const existingSizeIndex = currentSizes.findIndex(s => s.size === size);
      
      if (existingSizeIndex >= 0) {
        const newSizes = [...currentSizes];
        newSizes[existingSizeIndex] = sizePrice;
        return { ...prev, [sizesField]: newSizes };
      } else {
        return { ...prev, [sizesField]: [...currentSizes, sizePrice] };
      }
    });
  };

  const getPriceRange = (sizes: SizePrice[]) => {
    if (sizes.length === 0) return '';
    if (sizes.length === 1) return `£${sizes[0].salePrice}`;
    
    const prices = sizes.map(s => s.salePrice);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return minPrice === maxPrice ? `£${minPrice}` : `£${minPrice} - £${maxPrice}`;
  };

  const removeSize = (category: string, size: string) => {
    const sizesField = `${category.toLowerCase()}Sizes`;
    setFormData(prev => {
      const currentSizes = prev[sizesField as keyof typeof prev] as SizePrice[];
      return {
        ...prev,
        [sizesField]: currentSizes.filter(s => s.size !== size)
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSubmit = {
        ...formData,
        price: getPriceRange(formData.beddingSizes) || 
               getPriceRange(formData.rugsMatsSizes) || 
               getPriceRange(formData.curtainsSizes) || 
               getPriceRange(formData.footwearSizes) || 
               formData.price
      };

      console.log('Отправка данных для обновления:', formDataToSubmit);
      
      const response = await fetch(`/api/products?id=${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formDataToSubmit,
          _id: product._id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const updatedProduct = await response.json();
      console.log('Товар успешно обновлен:', updatedProduct);

      onProductEdited();
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
      alert('Не удалось обновить товар. Пожалуйста, попробуйте снова.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...formData.images];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Проверка размера файла
      if (file.size > maxFileSize) {
        alert(`Файл ${file.name} слишком большой. Максимальный размер: 5MB`);
        continue;
      }

      // Проверка типа файла
      if (!allowedTypes.includes(file.type)) {
        alert(`Файл ${file.name} имеет недопустимый формат. Разрешены только: JPEG, PNG, WebP`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Ошибка при загрузке изображения');
        }

        const data = await response.json();
        if (!data.url) {
          throw new Error('URL изображения не получен от сервера');
        }

        newImages.push(data.url);
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        alert(`Ошибка при загрузке ${file.name}: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
      }
    }

    setFormData(prev => ({ ...prev, images: newImages }));
  };

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category-specific fields */}
          {formData.category === 'BEDDING' && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Bedding Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  >
                    <option value="">Select a subcategory</option>
                    {beddingSubcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sizes and Prices</label>
                  <div className="space-y-3">
                    {beddingSizes.map(size => {
                      const sizePrice = formData.beddingSizes.find(s => s.size === size);
                      return (
                        <div key={size} className="flex items-center gap-3">
                          <label className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                            sizePrice ? 'border-red-500 text-red-500' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}>
                            <input
                              type="checkbox"
                              checked={!!sizePrice}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleSizePriceChange('bedding', size, 0, 0);
                                } else {
                                  removeSize('bedding', size);
                                }
                              }}
                              className="hidden"
                            />
                            <span>{size}</span>
                          </label>
                          {sizePrice && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.regularPrice}
                                  onChange={(e) => handleSizePriceChange('bedding', size, parseFloat(e.target.value), sizePrice.salePrice)}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Regular"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.salePrice}
                                  onChange={(e) => handleSizePriceChange('bedding', size, sizePrice.regularPrice, parseFloat(e.target.value))}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Sale"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Styles</label>
                  <div className="flex flex-wrap gap-3">
                    {beddingStyles.map(style => (
                      <label key={style} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.beddingStyles.includes(style) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.beddingStyles.includes(style)}
                          onChange={(e) => {
                            const newStyles = e.target.checked
                              ? [...formData.beddingStyles, style]
                              : formData.beddingStyles.filter(s => s !== style);
                            setFormData(prev => ({ ...prev, beddingStyles: newStyles }));
                          }}
                          className="hidden"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {beddingColors.map(color => (
                      <label key={color} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.beddingColors.includes(color) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.beddingColors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.beddingColors, color]
                              : formData.beddingColors.filter(c => c !== color);
                            setFormData(prev => ({ ...prev, beddingColors: newColors }));
                          }}
                          className="hidden"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.category === 'RUGS & MATS' && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Rugs & Mats Details</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={formData.rugsMatsType}
                  onChange={(e) => setFormData(prev => ({ ...prev, rugsMatsType: e.target.value as 'RUGS' | 'MATS' | '' }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="RUGS">Rugs</option>
                  <option value="MATS">Mats</option>
                </select>
              </div>
              {formData.rugsMatsType && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  >
                    <option value="">Select a subcategory</option>
                    {rugsMatsSubcategories[formData.rugsMatsType as 'RUGS' | 'MATS'].map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sizes and Prices</label>
                  <div className="space-y-3">
                    {rugsMatsSizes.map(size => {
                      const sizePrice = formData.rugsMatsSizes.find(s => s.size === size);
                      return (
                        <div key={size} className="flex items-center gap-3">
                          <label className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                            sizePrice ? 'border-red-500 text-red-500' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}>
                            <input
                              type="checkbox"
                              checked={!!sizePrice}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleSizePriceChange('rugsMats', size, 0, 0);
                                } else {
                                  removeSize('rugsMats', size);
                                }
                              }}
                              className="hidden"
                            />
                            <span>{size}</span>
                          </label>
                          {sizePrice && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.regularPrice}
                                  onChange={(e) => handleSizePriceChange('rugsMats', size, parseFloat(e.target.value), sizePrice.salePrice)}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Regular"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.salePrice}
                                  onChange={(e) => handleSizePriceChange('rugsMats', size, sizePrice.regularPrice, parseFloat(e.target.value))}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Sale"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {rugsMatsColors.map(color => (
                      <label key={color} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.rugsMatsColors.includes(color) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.rugsMatsColors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.rugsMatsColors, color]
                              : formData.rugsMatsColors.filter(c => c !== color);
                            setFormData(prev => ({ ...prev, rugsMatsColors: newColors }));
                          }}
                          className="hidden"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.category === 'THROWS & TOWELS' && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Throws & Towels Details</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {throwsTowelsSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Styles</label>
                  <div className="flex flex-wrap gap-3">
                    {throwsTowelsStyles.map(style => (
                      <label key={style} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.throwsTowelsStyles.includes(style) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.throwsTowelsStyles.includes(style)}
                          onChange={(e) => {
                            const newStyles = e.target.checked
                              ? [...formData.throwsTowelsStyles, style]
                              : formData.throwsTowelsStyles.filter(s => s !== style);
                            setFormData(prev => ({ ...prev, throwsTowelsStyles: newStyles }));
                          }}
                          className="hidden"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {throwsTowelsColors.map(color => (
                      <label key={color} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.throwsTowelsColors.includes(color) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.throwsTowelsColors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.throwsTowelsColors, color]
                              : formData.throwsTowelsColors.filter(c => c !== color);
                            setFormData(prev => ({ ...prev, throwsTowelsColors: newColors }));
                          }}
                          className="hidden"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.category === 'CURTAINS' && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Curtains Details</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {curtainsSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sizes and Prices</label>
                  <div className="space-y-3">
                    {curtainsSizes.map(size => {
                      const sizePrice = formData.curtainsSizes.find(s => s.size === size);
                      return (
                        <div key={size} className="flex items-center gap-3">
                          <label className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                            sizePrice ? 'border-red-500 text-red-500' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}>
                            <input
                              type="checkbox"
                              checked={!!sizePrice}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleSizePriceChange('curtains', size, 0, 0);
                                } else {
                                  removeSize('curtains', size);
                                }
                              }}
                              className="hidden"
                            />
                            <span>{size}</span>
                          </label>
                          {sizePrice && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.regularPrice}
                                  onChange={(e) => handleSizePriceChange('curtains', size, parseFloat(e.target.value), sizePrice.salePrice)}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Regular"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.salePrice}
                                  onChange={(e) => handleSizePriceChange('curtains', size, sizePrice.regularPrice, parseFloat(e.target.value))}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Sale"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {curtainsColors.map(color => (
                      <label key={color} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.curtainsColors.includes(color) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.curtainsColors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.curtainsColors, color]
                              : formData.curtainsColors.filter(c => c !== color);
                            setFormData(prev => ({ ...prev, curtainsColors: newColors }));
                          }}
                          className="hidden"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.category === 'CLOTHING' && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Clothing Details</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {clothingSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Styles</label>
                  <div className="flex flex-wrap gap-3">
                    {clothingStyles.map(style => (
                      <label key={style} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.clothingStyles.includes(style) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.clothingStyles.includes(style)}
                          onChange={(e) => {
                            const newStyles = e.target.checked
                              ? [...formData.clothingStyles, style]
                              : formData.clothingStyles.filter(s => s !== style);
                            setFormData(prev => ({ ...prev, clothingStyles: newStyles }));
                          }}
                          className="hidden"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {clothingColors.map(color => (
                      <label key={color} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.clothingColors.includes(color) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.clothingColors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.clothingColors, color]
                              : formData.clothingColors.filter(c => c !== color);
                            setFormData(prev => ({ ...prev, clothingColors: newColors }));
                          }}
                          className="hidden"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.category === 'FOOTWEAR' && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Footwear Details</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {footwearSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sizes and Prices</label>
                  <div className="space-y-3">
                    {footwearSizes.map(size => {
                      const sizePrice = formData.footwearSizes.find(s => s.size === size);
                      return (
                        <div key={size} className="flex items-center gap-3">
                          <label className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                            sizePrice ? 'border-red-500 text-red-500' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}>
                            <input
                              type="checkbox"
                              checked={!!sizePrice}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleSizePriceChange('footwear', size, 0, 0);
                                } else {
                                  removeSize('footwear', size);
                                }
                              }}
                              className="hidden"
                            />
                            <span>{size}</span>
                          </label>
                          {sizePrice && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.regularPrice}
                                  onChange={(e) => handleSizePriceChange('footwear', size, parseFloat(e.target.value), sizePrice.salePrice)}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Regular"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={sizePrice.salePrice}
                                  onChange={(e) => handleSizePriceChange('footwear', size, sizePrice.regularPrice, parseFloat(e.target.value))}
                                  className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Sale"
                                  min="0"
                                  step="0.01"
                                />
                                <span className="text-gray-500">£</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {footwearColors.map(color => (
                      <label key={color} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.footwearColors.includes(color) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.footwearColors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.footwearColors, color]
                              : formData.footwearColors.filter(c => c !== color);
                            setFormData(prev => ({ ...prev, footwearColors: newColors }));
                          }}
                          className="hidden"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-xl">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Images
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.isSoldOut}
                onChange={(e) => setFormData(prev => ({ ...prev, isSoldOut: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Sold Out</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.isHot}
                onChange={(e) => setFormData(prev => ({ ...prev, isHot: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Hot</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 