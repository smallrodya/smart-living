'use client';
import React, { useState, useEffect } from 'react';

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
  'FOOTWEAR'
];

const beddingSubcategories = [
  'Duvet Cover Sets',
  'Complete Bedding Sets',
  'Pillowcases',
  'Bed Sheets',
  'Bedspreads',
  'Blankets',
  'Throws'
];

const rugsMatsSubcategories = [
  'Shaggy Rugs',
  'Bathroom Mats',
  'Door Mats',
  'Kitchen Mats',
  'Runner Rugs',
  'Area Rugs'
];

const throwsTowelsSubcategories = [
  'Throws',
  'Bath Towels',
  'Hand Towels',
  'Beach Towels',
  'Kitchen Towels'
];

const outdoorSubcategories = [
  'Garden Furniture',
  'Outdoor Cushions',
  'Outdoor Rugs',
  'Garden Decor'
];

const curtainsSubcategories = [
  'Blackout Curtains',
  'Sheer Curtains',
  'Thermal Curtains',
  'Curtain Accessories'
];

const clothingSubcategories = [
  'Dresses',
  'Tops',
  'Bottoms',
  'Accessories'
];

const footwearSubcategories = [
  'Slippers',
  'Sandals',
  'Shoes',
  'Boots'
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
    discount: '',
    isSoldOut: false,
    isHot: false,
    // Bedding specific
    beddingSizes: [] as string[],
    beddingStyles: [] as string[],
    beddingColors: [] as string[],
    // Rugs & Mats specific
    rugsMatsSizes: [] as string[],
    rugsMatsColors: [] as string[],
    // Throws & Towels specific
    throwsTowelsStyles: [] as string[],
    throwsTowelsColors: [] as string[],
    // Curtains specific
    curtainsSizes: [] as string[],
    curtainsColors: [] as string[],
    // Clothing specific
    clothingStyles: [] as string[],
    clothingColors: [] as string[],
    // Footwear specific
    footwearSizes: [] as string[],
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
        discount: product.discount || '',
        isSoldOut: product.isSoldOut || false,
        isHot: product.isHot || false,
        beddingSizes: product.beddingSizes || [],
        beddingStyles: product.beddingStyles || [],
        beddingColors: product.beddingColors || [],
        rugsMatsSizes: product.rugsMatsSizes || [],
        rugsMatsColors: product.rugsMatsColors || [],
        throwsTowelsStyles: product.throwsTowelsStyles || [],
        throwsTowelsColors: product.throwsTowelsColors || [],
        curtainsSizes: product.curtainsSizes || [],
        curtainsColors: product.curtainsColors || [],
        clothingStyles: product.clothingStyles || [],
        clothingColors: product.clothingColors || [],
        footwearSizes: product.footwearSizes || [],
        footwearColors: product.footwearColors || []
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products?id=${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      onProductEdited();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...formData.images];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        newImages.push(data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }

    setFormData(prev => ({ ...prev, images: newImages }));
  };

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Features</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {formData.category === 'BEDDING' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {beddingSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                <div className="mt-2 space-y-2">
                  {['Single', 'Double', 'King', 'Super King'].map(size => (
                    <label key={size} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.beddingSizes.includes(size)}
                        onChange={(e) => {
                          const newSizes = e.target.checked
                            ? [...formData.beddingSizes, size]
                            : formData.beddingSizes.filter(s => s !== size);
                          setFormData(prev => ({ ...prev, beddingSizes: newSizes }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'RUGS & MATS' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {rugsMatsSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
            />
            {formData.images.length > 0 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              max="100"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.isSoldOut}
                onChange={(e) => setFormData(prev => ({ ...prev, isSoldOut: e.target.checked }))}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2">Sold Out</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.isHot}
                onChange={(e) => setFormData(prev => ({ ...prev, isHot: e.target.checked }))}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2">Hot</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 