'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, X, Loader2 } from 'lucide-react';

interface SizePrice {
  size: string;
  regularPrice: number;
  salePrice: number;
  sku: string;
  stock: number;
}

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: any;
  onProductEdited: () => void;
  validateUniqueSku: (product: any, isEditing: boolean, currentProductId?: string) => { isValid: boolean; error?: string };
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
  'Cushions'
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
  'Chunky Hand Knitted',
  'Large',
  'XLarge'
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

const beddingSizes = ['Single', 'Double', 'King', 'Super King', 'Crib', 'Pillowcase'];
const beddingStyles = ['Printed', 'Plain', '3D', 'Teddy', 'Hotel Quality', 'Housewife Pillowcase', 'Oxford Pillowcase'];
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

const rugsMatsSizes = ['Small', 'Medium', 'Large', 'Xlarge', 'Runner'];
const rugsMatsColors = [
  'Aubergine',
  'Black',
  'Brown',
  'Cream',
  'Dark Beige',
  'Dark Grey',
  'Duck Egg',
  'Dusky Pink',
  'Emerald',
  'Green',
  'Ink',
  'Latte',
  'Light Beige',
  'Mauve',
  'Oatmeal',
  'Ochre',
  'Orange',
  'Red',
  'Silver/Grey',
  'Soft Lilac',
  'Teal',
  'Terracotta'
];

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

interface FormData {
  title: string;
  description: string;
  features: string;
  price: string;
  category: string;
  subcategory: string;
  images: string[];
  isSoldOut: boolean;
  isHot: boolean;
  // Bedding specific
  beddingSizes: SizePrice[];
  beddingStyles: string[];
  beddingColors: string[];
  // Rugs & Mats specific
  rugsMatsType: 'RUGS' | 'MATS' | '';
  rugsMatsSizes: SizePrice[];
  rugsMatsColors: string[];
  // Throws & Towels specific
  throwsTowelsStylePrices: SizePrice[];
  throwsTowelsStyles: string[];
  throwsTowelsColors: string[];
  // Curtains specific
  curtainsSizes: SizePrice[];
  curtainsColors: string[];
  // Clothing specific
  clothingStylePrices: SizePrice[];
  clothingStyles: string[];
  clothingColors: string[];
  // Footwear specific
  footwearSizes: SizePrice[];
  footwearColors: string[];
  // Clearance specific
  isClearance: boolean;
  clearanceDiscount: number;
  // Outdoor specific
  outdoorPrice: {
    sku: string;
    regularPrice: number;
    salePrice: number;
    stock: number;
  };
  outdoorColors: string[];
  // Additional categories
  additionalCategories: {
    category: string;
    subcategory: string;
  }[];
}

export default function EditProductModal({ open, onClose, product, onProductEdited, validateUniqueSku }: EditProductModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    features: '',
    price: '',
    category: '',
    subcategory: '',
    images: [],
    isSoldOut: false,
    isHot: false,
    beddingSizes: [],
    beddingStyles: [],
    beddingColors: [],
    rugsMatsType: '',
    rugsMatsSizes: [],
    rugsMatsColors: [],
    throwsTowelsStylePrices: [],
    throwsTowelsStyles: [],
    throwsTowelsColors: [],
    curtainsSizes: [],
    curtainsColors: [],
    clothingStylePrices: [],
    clothingStyles: [],
    clothingColors: [],
    footwearSizes: [],
    footwearColors: [],
    isClearance: false,
    clearanceDiscount: 0,
    outdoorPrice: {
      sku: '',
      regularPrice: 0,
      salePrice: 0,
      stock: 0
    },
    outdoorColors: [],
    additionalCategories: []
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [skuError, setSkuError] = useState<string | null>(null);

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
        beddingSizes: product.beddingSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0,
          sku: typeof size === 'string' ? '' : size.sku || '',
          stock: typeof size === 'string' ? 0 : size.stock || 0
        })) || [],
        beddingStyles: product.beddingStyles || [],
        beddingColors: product.beddingColors || [],
        rugsMatsType: product.rugsMatsType || '',
        rugsMatsSizes: product.rugsMatsSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0,
          sku: typeof size === 'string' ? '' : size.sku || '',
          stock: typeof size === 'string' ? 0 : size.stock || 0
        })) || [],
        rugsMatsColors: product.rugsMatsColors || [],
        throwsTowelsStylePrices: product.throwsTowelsStylePrices || [],
        throwsTowelsStyles: product.throwsTowelsStyles || [],
        throwsTowelsColors: product.throwsTowelsColors || [],
        curtainsSizes: product.curtainsSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0,
          sku: typeof size === 'string' ? '' : size.sku || '',
          stock: typeof size === 'string' ? 0 : size.stock || 0
        })) || [],
        curtainsColors: product.curtainsColors || [],
        clothingStylePrices: product.clothingStylePrices || [],
        clothingStyles: product.clothingStyles || [],
        clothingColors: product.clothingColors || [],
        footwearSizes: product.footwearSizes?.map((size: any) => ({
          size: typeof size === 'string' ? size : size.size,
          regularPrice: typeof size === 'string' ? 0 : size.regularPrice || 0,
          salePrice: typeof size === 'string' ? 0 : size.salePrice || 0,
          sku: typeof size === 'string' ? '' : size.sku || '',
          stock: typeof size === 'string' ? 0 : size.stock || 0
        })) || [],
        footwearColors: product.footwearColors || [],
        isClearance: product.isClearance || false,
        clearanceDiscount: product.clearanceDiscount || 0,
        outdoorPrice: {
          sku: product.outdoorPrice?.sku || '',
          regularPrice: product.outdoorPrice?.regularPrice || 0,
          salePrice: product.outdoorPrice?.salePrice || 0,
          stock: product.outdoorPrice?.stock || 0
        },
        outdoorColors: product.outdoorColors || [],
        additionalCategories: product.additionalCategories || []
      });
    }
  }, [product]);

  const handleSizePriceChange = (category: string, size: string, regularPrice: number, salePrice: number, sku: string, stock: number) => {
    const sizePrice: SizePrice = { size, regularPrice, salePrice, sku, stock };
    
    setFormData(prev => {
      if (category === 'bedding') {
        const existingSizeIndex = prev.beddingSizes.findIndex(s => s.size === size);
        if (existingSizeIndex >= 0) {
          const newSizes = [...prev.beddingSizes];
          newSizes[existingSizeIndex] = sizePrice;
          return { ...prev, beddingSizes: newSizes };
        }
        return { ...prev, beddingSizes: [...prev.beddingSizes, sizePrice] };
      } else if (category === 'rugsMats') {
        const existingSizeIndex = prev.rugsMatsSizes.findIndex(s => s.size === size);
        if (existingSizeIndex >= 0) {
          const newSizes = [...prev.rugsMatsSizes];
          newSizes[existingSizeIndex] = sizePrice;
          return { ...prev, rugsMatsSizes: newSizes };
        }
        return { ...prev, rugsMatsSizes: [...prev.rugsMatsSizes, sizePrice] };
      } else if (category === 'curtains') {
        const existingSizeIndex = prev.curtainsSizes.findIndex(s => s.size === size);
        if (existingSizeIndex >= 0) {
          const newSizes = [...prev.curtainsSizes];
          newSizes[existingSizeIndex] = sizePrice;
          return { ...prev, curtainsSizes: newSizes };
        }
        return { ...prev, curtainsSizes: [...prev.curtainsSizes, sizePrice] };
      } else if (category === 'footwear') {
        const existingSizeIndex = prev.footwearSizes.findIndex(s => s.size === size);
        if (existingSizeIndex >= 0) {
          const newSizes = [...prev.footwearSizes];
          newSizes[existingSizeIndex] = sizePrice;
          return { ...prev, footwearSizes: newSizes };
        }
        return { ...prev, footwearSizes: [...prev.footwearSizes, sizePrice] };
      }
      return prev;
    });
  };

  const handleStylePriceChange = (category: string, style: string, regularPrice: number, salePrice: number, sku: string, stock: number) => {
    const stylePrice: SizePrice = { size: style, regularPrice, salePrice, sku, stock };
    
    setFormData(prev => {
      if (category === 'throwsTowels') {
        const existingStyleIndex = prev.throwsTowelsStylePrices.findIndex(s => s.size === style);
        if (existingStyleIndex >= 0) {
          const newStyles = [...prev.throwsTowelsStylePrices];
          newStyles[existingStyleIndex] = stylePrice;
          return { ...prev, throwsTowelsStylePrices: newStyles };
        }
        return { ...prev, throwsTowelsStylePrices: [...prev.throwsTowelsStylePrices, stylePrice] };
      }
      return prev;
    });
  };

  const removeSize = (category: string, size: string) => {
    setFormData(prev => {
      if (category === 'bedding') {
        return {
          ...prev,
          beddingSizes: prev.beddingSizes.filter(s => s.size !== size)
        };
      } else if (category === 'rugsMats') {
        return {
          ...prev,
          rugsMatsSizes: prev.rugsMatsSizes.filter(s => s.size !== size)
        };
      } else if (category === 'throwsTowels') {
        return {
          ...prev,
          throwsTowelsStylePrices: prev.throwsTowelsStylePrices.filter(s => s.size !== size)
        };
      } else if (category === 'footwear') {
        return {
          ...prev,
          footwearSizes: prev.footwearSizes.filter(s => s.size !== size)
        };
      } else if (category === 'clothing') {
        return {
          ...prev,
          clothingStylePrices: prev.clothingStylePrices.filter(s => s.size !== size)
        };
      }
      return prev;
    });
  };

  const removeStyle = (category: string, style: string) => {
    setFormData(prev => {
      if (category === 'throwsTowels') {
        return {
          ...prev,
          throwsTowelsStylePrices: prev.throwsTowelsStylePrices.filter(s => s.size !== style)
        };
      }
      return prev;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем уникальность SKU перед отправкой, передавая ID текущего товара и флаг редактирования
    const validationResult = validateUniqueSku(formData, true, product._id);
    if (!validationResult.isValid) {
      setSkuError(validationResult.error || 'Invalid SKU');
      return; // Прерываем отправку, если есть дубликаты SKU
    }
    setSkuError(null);

    try {
      const formDataToSubmit = {
        ...formData,
        price: getPriceRange(formData.beddingSizes) || 
               getPriceRange(formData.rugsMatsSizes) || 
               getPriceRange(formData.curtainsSizes) || 
               getPriceRange(formData.footwearSizes) ||
               getPriceRange(formData.clothingStylePrices) ||
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

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleClothingStylePriceChange = (style: string, regularPrice: number, salePrice: number, sku: string, stock: number) => {
    const stylePrice: SizePrice = { size: style, regularPrice, salePrice, sku, stock };
    
    setFormData(prev => {
      const existingStyleIndex = prev.clothingStylePrices.findIndex(s => s.size === style);
      let newStyles = [...prev.clothingStylePrices];
      
      if (existingStyleIndex >= 0) {
        newStyles[existingStyleIndex] = stylePrice;
      } else {
        newStyles = [...newStyles, stylePrice];
      }
      
      // Обновляем массив clothingStyles на основе clothingStylePrices
      const styles = newStyles.map(s => s.size);
      
      return { 
        ...prev, 
        clothingStylePrices: newStyles,
        clothingStyles: styles
      };
    });
  };

  const removeClothingStyle = (style: string) => {
    setFormData(prev => {
      const newStylePrices = prev.clothingStylePrices.filter(s => s.size !== style);
      // Обновляем массив clothingStyles на основе оставшихся clothingStylePrices
      const styles = newStylePrices.map(s => s.size);
      
      return {
        ...prev,
        clothingStylePrices: newStylePrices,
        clothingStyles: styles
      };
    });
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
        {skuError && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">{skuError}</p>
            </div>
          </div>
        )}
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
                                  handleSizePriceChange('bedding', size, 0, 0, '', 0);
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
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">SKU</label>
                                <input
                                  type="text"
                                  value={sizePrice.sku}
                                  onChange={(e) => handleSizePriceChange('bedding', size, sizePrice.regularPrice, sizePrice.salePrice, e.target.value, sizePrice.stock)}
                                  className="w-32 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="SKU"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Regular Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.regularPrice}
                                    onChange={(e) => handleSizePriceChange('bedding', size, parseFloat(e.target.value), sizePrice.salePrice, sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Regular"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Sale Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.salePrice}
                                    onChange={(e) => handleSizePriceChange('bedding', size, sizePrice.regularPrice, parseFloat(e.target.value), sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Sale"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Stock</label>
                                <input
                                  type="number"
                                  value={sizePrice.stock}
                                  onChange={(e) => handleSizePriceChange('bedding', size, sizePrice.regularPrice, sizePrice.salePrice, sizePrice.sku, parseInt(e.target.value) || 0)}
                                  className="w-20 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Stock"
                                  min="0"
                                />
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
              <div className="grid grid-cols-2 gap-6">
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
              </div>
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
                                  handleSizePriceChange('rugsMats', size, 0, 0, '', 0);
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
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">SKU</label>
                                <input
                                  type="text"
                                  value={sizePrice.sku}
                                  onChange={(e) => handleSizePriceChange('rugsMats', size, sizePrice.regularPrice, sizePrice.salePrice, e.target.value, sizePrice.stock)}
                                  className="w-32 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="SKU"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Regular Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.regularPrice}
                                    onChange={(e) => handleSizePriceChange('rugsMats', size, parseFloat(e.target.value), sizePrice.salePrice, sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Regular"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Sale Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.salePrice}
                                    onChange={(e) => handleSizePriceChange('rugsMats', size, sizePrice.regularPrice, parseFloat(e.target.value), sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Sale"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Stock</label>
                                <input
                                  type="number"
                                  value={sizePrice.stock}
                                  onChange={(e) => handleSizePriceChange('rugsMats', size, sizePrice.regularPrice, sizePrice.salePrice, sizePrice.sku, parseInt(e.target.value) || 0)}
                                  className="w-20 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Stock"
                                  min="0"
                                />
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
                    {throwsTowelsSubcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Styles and Prices</label>
                  <div className="space-y-3">
                    {throwsTowelsStyles.map(style => {
                      const stylePrice = formData.throwsTowelsStylePrices.find(s => s.size === style);
                      return (
                        <div key={style} className="flex items-center gap-3">
                          <label className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                            stylePrice ? 'border-red-500 text-red-500' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}>
                            <input
                              type="checkbox"
                              checked={!!stylePrice}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleStylePriceChange('throwsTowels', style, 0, 0, '', 0);
                                } else {
                                  removeStyle('throwsTowels', style);
                                }
                              }}
                              className="hidden"
                            />
                            <span>{style}</span>
                          </label>
                          {stylePrice && (
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">SKU</label>
                                <input
                                  type="text"
                                  value={stylePrice.sku}
                                  onChange={(e) => handleStylePriceChange('throwsTowels', style, stylePrice.regularPrice, stylePrice.salePrice, e.target.value, stylePrice.stock)}
                                  className="w-32 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="SKU"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Regular Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={stylePrice.regularPrice}
                                    onChange={(e) => handleStylePriceChange('throwsTowels', style, parseFloat(e.target.value), stylePrice.salePrice, stylePrice.sku, stylePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Regular"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Sale Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={stylePrice.salePrice}
                                    onChange={(e) => handleStylePriceChange('throwsTowels', style, stylePrice.regularPrice, parseFloat(e.target.value), stylePrice.sku, stylePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Sale"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Stock</label>
                                <input
                                  type="number"
                                  value={stylePrice.stock}
                                  onChange={(e) => handleStylePriceChange('throwsTowels', style, stylePrice.regularPrice, stylePrice.salePrice, stylePrice.sku, parseInt(e.target.value) || 0)}
                                  className="w-20 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Stock"
                                  min="0"
                                />
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
                                  handleSizePriceChange('curtains', size, 0, 0, '', 0);
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
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">SKU</label>
                                <input
                                  type="text"
                                  value={sizePrice.sku}
                                  onChange={(e) => handleSizePriceChange('curtains', size, sizePrice.regularPrice, sizePrice.salePrice, e.target.value, sizePrice.stock)}
                                  className="w-32 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="SKU"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Regular Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.regularPrice}
                                    onChange={(e) => handleSizePriceChange('curtains', size, parseFloat(e.target.value), sizePrice.salePrice, sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Regular"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Sale Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.salePrice}
                                    onChange={(e) => handleSizePriceChange('curtains', size, sizePrice.regularPrice, parseFloat(e.target.value), sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Sale"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Stock</label>
                                <input
                                  type="number"
                                  value={sizePrice.stock}
                                  onChange={(e) => handleSizePriceChange('curtains', size, sizePrice.regularPrice, sizePrice.salePrice, sizePrice.sku, parseInt(e.target.value) || 0)}
                                  className="w-20 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Stock"
                                  min="0"
                                />
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
                    {clothingSubcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Styles and Prices</label>
                  <div className="space-y-3">
                    {clothingStyles.map(style => {
                      const stylePrice = formData.clothingStylePrices.find(s => s.size === style);
                      return (
                        <div key={style} className="flex items-center gap-3">
                          <label className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                            stylePrice ? 'border-red-500 text-red-500' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}>
                            <input
                              type="checkbox"
                              checked={!!stylePrice}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleClothingStylePriceChange(style, 0, 0, '', 0);
                                } else {
                                  removeClothingStyle(style);
                                }
                              }}
                              className="hidden"
                            />
                            <span>{style}</span>
                          </label>
                          {stylePrice && (
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">SKU</label>
                                <input
                                  type="text"
                                  value={stylePrice.sku}
                                  onChange={(e) => handleClothingStylePriceChange(style, stylePrice.regularPrice, stylePrice.salePrice, e.target.value, stylePrice.stock)}
                                  className="w-32 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="SKU"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Regular Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={stylePrice.regularPrice}
                                    onChange={(e) => handleClothingStylePriceChange(style, parseFloat(e.target.value), stylePrice.salePrice, stylePrice.sku, stylePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Regular"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Sale Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={stylePrice.salePrice}
                                    onChange={(e) => handleClothingStylePriceChange(style, stylePrice.regularPrice, parseFloat(e.target.value), stylePrice.sku, stylePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Sale"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Stock</label>
                                <input
                                  type="number"
                                  value={stylePrice.stock}
                                  onChange={(e) => handleClothingStylePriceChange(style, stylePrice.regularPrice, stylePrice.salePrice, stylePrice.sku, parseInt(e.target.value) || 0)}
                                  className="w-20 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Stock"
                                  min="0"
                                />
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
                                  handleSizePriceChange('footwear', size, 0, 0, '', 0);
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
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">SKU</label>
                                <input
                                  type="text"
                                  value={sizePrice.sku}
                                  onChange={(e) => handleSizePriceChange('footwear', size, sizePrice.regularPrice, sizePrice.salePrice, e.target.value, sizePrice.stock)}
                                  className="w-32 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="SKU"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Regular Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.regularPrice}
                                    onChange={(e) => handleSizePriceChange('footwear', size, parseFloat(e.target.value), sizePrice.salePrice, sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Regular"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Sale Price</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={sizePrice.salePrice}
                                    onChange={(e) => handleSizePriceChange('footwear', size, sizePrice.regularPrice, parseFloat(e.target.value), sizePrice.sku, sizePrice.stock)}
                                    className="w-24 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Sale"
                                    min="0"
                                    step="0.01"
                                  />
                                  <span className="text-gray-500">£</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-500">Stock</label>
                                <input
                                  type="number"
                                  value={sizePrice.stock}
                                  onChange={(e) => handleSizePriceChange('footwear', size, sizePrice.regularPrice, sizePrice.salePrice, sizePrice.sku, parseInt(e.target.value) || 0)}
                                  className="w-20 px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                  placeholder="Stock"
                                  min="0"
                                />
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

          {formData.category === 'OUTDOOR' && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Outdoor Details</h3>
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
                    {outdoorSubcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Details</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">SKU</label>
                      <input
                        type="text"
                        value={formData.outdoorPrice.sku}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          outdoorPrice: { ...prev.outdoorPrice, sku: e.target.value }
                        }))}
                        className="w-full px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="SKU"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">Regular Price</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={formData.outdoorPrice.regularPrice}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            outdoorPrice: { ...prev.outdoorPrice, regularPrice: parseFloat(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Regular"
                          min="0"
                          step="0.01"
                        />
                        <span className="text-gray-500">£</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">Sale Price</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={formData.outdoorPrice.salePrice}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            outdoorPrice: { ...prev.outdoorPrice, salePrice: parseFloat(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          placeholder="Sale"
                          min="0"
                          step="0.01"
                        />
                        <span className="text-gray-500">£</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-500">Stock</label>
                      <input
                        type="number"
                        value={formData.outdoorPrice.stock}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          outdoorPrice: { ...prev.outdoorPrice, stock: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Stock"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Colors</label>
                  <div className="flex flex-wrap gap-3">
                    {formData.outdoorColors.map(color => (
                      <label key={color} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.outdoorColors.includes(color) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.outdoorColors.includes(color)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.outdoorColors, color]
                              : formData.outdoorColors.filter(c => c !== color);
                            setFormData(prev => ({ ...prev, outdoorColors: newColors }));
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="flex flex-wrap gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Plus className="w-6 h-6 text-gray-400" />
                )}
              </label>
            </div>
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
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.isClearance}
                onChange={(e) => setFormData(prev => ({ ...prev, isClearance: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Add to Clearance</span>
            </label>
          </div>

          {formData.isClearance && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clearance Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Percentage</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.clearanceDiscount}
                      onChange={(e) => setFormData(prev => ({ ...prev, clearanceDiscount: parseInt(e.target.value) || 0 }))}
                      className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      min="0"
                      max="100"
                      placeholder="0"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Categories Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Categories</h3>
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category} className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.additionalCategories.some(ac => ac.category === category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            additionalCategories: [...prev.additionalCategories, { category, subcategory: '' }]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            additionalCategories: prev.additionalCategories.filter(ac => ac.category !== category)
                          }));
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </label>
                  {formData.additionalCategories.some(ac => ac.category === category) && (
                    <div className="ml-6">
                      <select
                        value={formData.additionalCategories.find(ac => ac.category === category)?.subcategory || ''}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            additionalCategories: prev.additionalCategories.map(ac =>
                              ac.category === category
                                ? { ...ac, subcategory: e.target.value }
                                : ac
                            )
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      >
                        <option value="">Select a subcategory</option>
                        {category === 'BEDDING' && beddingSubcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                        {category === 'RUGS & MATS' && Object.values(rugsMatsSubcategories).flat().map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                        {category === 'THROWS & TOWELS' && throwsTowelsSubcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                        {category === 'OUTDOOR' && outdoorSubcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                        {category === 'CURTAINS' && curtainsSubcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                        {category === 'CLOTHING' && clothingSubcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                        {category === 'FOOTWEAR' && footwearSubcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
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