'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, X, Loader2 } from 'lucide-react';

interface SizePrice {
  size: string;
  regularPrice: number;
  salePrice: number;
  sku: string;
  stock: number;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  validateUniqueSku: (product: any) => { isValid: boolean; error?: string };
}

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
  rugsMatsStyles: string[];
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
  'Brown',
  'Multi'
];

const beddingSizes = [
  'Single',
  'Double',
  'King',
  'Super King',
  'One Size'
];
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

const rugsMatsSizes = [
  '40 x 60 cm',
  '50 x 80 cm',
  '57 x 90 cm',
  '60 x 110 cm',
  '67 x 120 cm',
  '60 x 220 cm',
  '67 x 220 cm',
  '80 x 150 cm',
  '80 x 200 cm',
  '80 x 300 cm',
  '120 x 170 cm',
  '120 x 180 cm',
  '160 x 230 cm',
  '200 x 290 cm',
  '200 x 300 cm'
];

const rugsMatsStyles = [
  'Small',
  'Medium',
  'Large',
  'Xlarge',
  'Runner'
];

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

const outdoorColors = [
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

const clothingSubcategories = [
  "Men's",
  "Women's",
  "Kid's"
];

const clothingSizes = [
  // Jeans & Joggers sizes
  '6', '7', '8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '27', '28', '29', '30', '32', '33', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56',
  // Other clothing sizes
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '2XL', '3XL', 'S/M', 'M/L', 'L/XL', 'One Size',
  // Kids year-based sizes
  '3 – 4 Year',
  '4 – 5 Year',
  '5 – 6 Year',
  '6 – 7 Year',
  '7 – 8 Year',
  '9 -10 Year',
  '10 – 11 Year',
  '11 – 12 Year',
  '12 – 13 Year',
  '13 – 14 Year',
  '14 – 15 Year',
  '15 – 16 Year'
];

const clothingStyles = [
  'Jeans', 'Joggers', 'Hoodies', 'Polo Shirts', 'Loungewear', 'Bathrobes'
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
  'Brown',
  'TOFFEE',
  'Stone',
  'Acid Blue',
  'Acid Black',
  'Bromo Blue',
  'Indigo',
  'Berry',
  'Mid Wash',
  'Dark Wash',
  'Vintage',
  'Chocolate'
];

const footwearSubcategories = [
  'Booties',
  'Slippers',
  'Socks'
];

const footwearSizes = [
  'UK 3-4',
  'UK 4-5',
  'UK 5-6',
  'UK 6-7',
  'UK 7-8',
  'UK 8-9',
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

const throwsTowelsSizes = ['Small', 'Medium', 'Large', 'XLarge', 'Custom'];

export default function AddProductModal({ open, onClose, onProductAdded, validateUniqueSku }: AddProductModalProps) {
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
    // Bedding specific
    beddingSizes: [],
    beddingStyles: [],
    beddingColors: [],
    // Rugs & Mats specific
    rugsMatsType: '',
    rugsMatsSizes: [],
    rugsMatsColors: [],
    rugsMatsStyles: [],
    // Throws & Towels specific
    throwsTowelsStylePrices: [],
    throwsTowelsStyles: [],
    throwsTowelsColors: [],
    // Curtains specific
    curtainsSizes: [],
    curtainsColors: [],
    // Clothing specific
    clothingStylePrices: [],
    clothingStyles: [],
    clothingColors: [],
    // Footwear specific
    footwearSizes: [],
    footwearColors: [],
    // Clearance specific
    isClearance: false,
    clearanceDiscount: 0,
    // Outdoor specific
    outdoorPrice: {
      sku: '',
      regularPrice: 0,
      salePrice: 0,
      stock: 0
    },
    outdoorColors: [],
    // Additional categories
    additionalCategories: []
  });

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [skuError, setSkuError] = useState<string | null>(null);

  const handleSizePriceChange = (category: string, size: string, regularPrice: number, salePrice: number, sku: string, stock: number) => {
    setFormData(prev => {
      if (category === 'clothing') {
        const existingSizes = prev.clothingStylePrices || [];
        const sizeIndex = existingSizes.findIndex(s => s.size === size);
        
        if (sizeIndex >= 0) {
          const updatedSizes = [...existingSizes];
          updatedSizes[sizeIndex] = {
            size,
            regularPrice,
            salePrice,
            sku,
            stock
          };
          return { ...prev, clothingStylePrices: updatedSizes };
        } else {
          return {
            ...prev,
            clothingStylePrices: [...existingSizes, { size, regularPrice, salePrice, sku, stock }]
          };
        }
      }
      const sizePrice: SizePrice = { size, regularPrice, salePrice, sku, stock };
      
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
      } else if (category === 'throwsTowels') {
        const existingSizeIndex = prev.throwsTowelsStylePrices.findIndex(s => s.size === size);
        if (existingSizeIndex >= 0) {
          const newSizes = [...prev.throwsTowelsStylePrices];
          newSizes[existingSizeIndex] = sizePrice;
          return { ...prev, throwsTowelsStylePrices: newSizes };
        }
        return { ...prev, throwsTowelsStylePrices: [...prev.throwsTowelsStylePrices, sizePrice] };
      } else if (category === 'footwear') {
        const existingSizeIndex = prev.footwearSizes.findIndex(s => s.size === size);
        if (existingSizeIndex >= 0) {
          const newSizes = [...prev.footwearSizes];
          newSizes[existingSizeIndex] = sizePrice;
          return { ...prev, footwearSizes: newSizes };
        }
        return { ...prev, footwearSizes: [...prev.footwearSizes, sizePrice] };
      } else if (category === 'clothing') {
        const existingSizeIndex = prev.clothingStylePrices.findIndex(s => s.size === size);
        if (existingSizeIndex >= 0) {
          const newSizes = [...prev.clothingStylePrices];
          newSizes[existingSizeIndex] = sizePrice;
          return { ...prev, clothingStylePrices: newSizes };
        }
        return { ...prev, clothingStylePrices: [...prev.clothingStylePrices, sizePrice] };
      }
      return prev;
    });
  };

  const handleStylePriceChange = (category: string, style: string, regularPrice: number, salePrice: number, sku: string, stock: number) => {
    const stylePrice: SizePrice = { size: style, regularPrice, salePrice, sku, stock };
    
    setFormData(prev => {
      if (category === 'throwsTowels') {
        const existingStyleIndex = prev.throwsTowelsStylePrices.findIndex(s => s.size === style);
        let newStyles = [...prev.throwsTowelsStylePrices];
        
        if (existingStyleIndex >= 0) {
          newStyles[existingStyleIndex] = stylePrice;
        } else {
          newStyles = [...newStyles, stylePrice];
        }
        
        // Обновляем массив throwsTowelsStyles на основе throwsTowelsStylePrices
        const styles = newStyles.map(s => s.size);
        
        return { 
          ...prev, 
          throwsTowelsStylePrices: newStyles,
          throwsTowelsStyles: styles
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
    
    // Проверяем уникальность SKU перед отправкой
    const validationResult = validateUniqueSku(formData);
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

      console.log('Отправка данных для добавления:', formDataToSubmit);
      console.log('Категория:', formDataToSubmit.category);
      console.log('Подкатегория:', formDataToSubmit.subcategory);
      console.log('Стили:', formDataToSubmit.throwsTowelsStyles);
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      onProductAdded();
      onClose();

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
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
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeSize = (category: string, size: string) => {
    setFormData(prev => {
      if (category === 'clothing') {
        return {
          ...prev,
          clothingStylePrices: prev.clothingStylePrices.filter(s => s.size !== size)
        };
      }
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
      }
      return prev;
    });
  };

  const removeStyle = (category: string, style: string) => {
    setFormData(prev => {
      if (category === 'throwsTowels') {
        const newStylePrices = prev.throwsTowelsStylePrices.filter(s => s.size !== style);
        // Обновляем массив throwsTowelsStyles на основе оставшихся throwsTowelsStylePrices
        const styles = newStylePrices.map(s => s.size);
        
        return {
          ...prev,
          throwsTowelsStylePrices: newStylePrices,
          throwsTowelsStyles: styles
        };
      }
      return prev;
    });
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Add New Product</h2>
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            >
              <option value="">Select Category</option>
              <option value="BEDDING">BEDDING</option>
              <option value="THROWS & TOWELS">THROWS & TOWELS</option>
              <option value="RUGS & MATS">RUGS & MATS</option>
              <option value="CURTAINS">CURTAINS</option>
              <option value="CLOTHING">CLOTHING</option>
              <option value="FOOTWEAR">FOOTWEAR</option>
              <option value="OUTDOOR">OUTDOOR</option>
            </select>
          </div>

          {formData.category === 'CLOTHING' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              >
                <option value="">Select Subcategory</option>
                <option value="Men's">Men's</option>
                <option value="Women's">Women's</option>
                <option value="Kid's">Kid's</option>
              </select>
            </div>
          )}

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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {beddingColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          if (formData.beddingColors.includes(color)) {
                            setFormData({
                              ...formData,
                              beddingColors: formData.beddingColors.filter((c) => c !== color),
                            });
                          } else {
                            setFormData({
                              ...formData,
                              beddingColors: [...formData.beddingColors, color],
                            });
                          }
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: formData.beddingColors.includes(color) ? '#222' : '#eee',
                          background: formData.beddingColors.includes(color) ? '#f8f9fa' : 'transparent',
                          color: '#444',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {color}
                      </button>
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Styles</label>
                  <div className="flex flex-wrap gap-3">
                    {rugsMatsStyles.map(style => (
                      <label key={style} className={`inline-flex items-center px-4 py-2 rounded-full bg-white border transition-all cursor-pointer ${
                        formData.rugsMatsStyles.includes(style) 
                          ? 'border-red-500 text-red-500' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.rugsMatsStyles.includes(style)}
                          onChange={(e) => {
                            const newStyles = e.target.checked
                              ? [...formData.rugsMatsStyles, style]
                              : formData.rugsMatsStyles.filter(s => s !== style);
                            setFormData(prev => ({ ...prev, rugsMatsStyles: newStyles }));
                          }}
                          className="hidden"
                        />
                        <span>{style}</span>
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
                    {outdoorColors.map(color => (
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

          {formData.category === 'CURTAINS' && (
            <>
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
                      <span className={`${formData.curtainsColors.includes(color) ? 'text-indigo-600' : 'text-gray-700'}`}>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'CLOTHING' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Styles</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {clothingStyles.map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          clothingStyles: prev.clothingStyles.includes(style)
                            ? prev.clothingStyles.filter(s => s !== style)
                            : [...prev.clothingStyles, style]
                        }));
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: formData.clothingStyles.includes(style) ? '#222' : '#eee',
                        background: formData.clothingStyles.includes(style) ? '#222' : 'transparent',
                        color: formData.clothingStyles.includes(style) ? '#fff' : '#444',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '14px',
                        fontWeight: 500
                      }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Sizes and Prices</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {clothingSizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        const existingSize = formData.clothingStylePrices.find(s => s.size === size);
                        if (existingSize) {
                          removeSize('clothing', size);
                        } else {
                          handleSizePriceChange('clothing', size, 0, 0, '', 0);
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: formData.clothingStylePrices.some(s => s.size === size) ? '#222' : '#eee',
                        background: formData.clothingStylePrices.some(s => s.size === size) ? '#222' : 'transparent',
                        color: formData.clothingStylePrices.some(s => s.size === size) ? '#fff' : '#444',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '14px',
                        fontWeight: 500
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {formData.clothingStylePrices.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 500 }}>Size Details</h4>
                    {formData.clothingStylePrices.map((sizePrice, index) => (
                      <div key={index} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #eee', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h5 style={{ fontSize: '16px', fontWeight: 600 }}>Size {sizePrice.size}</h5>
                          <button
                            type="button"
                            onClick={() => removeSize('clothing', sizePrice.size)}
                            style={{
                              padding: '6px 12px',
                              background: '#f5f5f5',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              color: '#666'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>SKU</label>
                            <input
                              type="text"
                              value={sizePrice.sku}
                              onChange={(e) => handleSizePriceChange('clothing', sizePrice.size, sizePrice.regularPrice, sizePrice.salePrice, e.target.value, sizePrice.stock)}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Regular Price</label>
                            <input
                              type="number"
                              value={sizePrice.regularPrice}
                              onChange={(e) => handleSizePriceChange('clothing', sizePrice.size, Number(e.target.value), sizePrice.salePrice, sizePrice.sku, sizePrice.stock)}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Sale Price</label>
                            <input
                              type="number"
                              value={sizePrice.salePrice}
                              onChange={(e) => handleSizePriceChange('clothing', sizePrice.size, sizePrice.regularPrice, Number(e.target.value), sizePrice.sku, sizePrice.stock)}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Stock</label>
                            <input
                              type="number"
                              value={sizePrice.stock}
                              onChange={(e) => handleSizePriceChange('clothing', sizePrice.size, sizePrice.regularPrice, sizePrice.salePrice, sizePrice.sku, Number(e.target.value))}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Colors</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {clothingColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        if (formData.clothingColors.includes(color)) {
                          setFormData({
                            ...formData,
                            clothingColors: formData.clothingColors.filter((c) => c !== color),
                          });
                        } else {
                          setFormData({
                            ...formData,
                            clothingColors: [...formData.clothingColors, color],
                          });
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: formData.clothingColors.includes(color) ? '#222' : '#eee',
                        background: formData.clothingColors.includes(color) ? '#f8f9fa' : 'transparent',
                        color: '#444',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'FOOTWEAR' && (
            <>
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
                      <span className={`${formData.footwearColors.includes(color) ? 'text-indigo-600' : 'text-gray-700'}`}>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="bg-gray-50 p-6 rounded-xl">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Images</label>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 