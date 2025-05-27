'use client';
import React, { useState } from 'react';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: () => void;
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

export default function AddProductModal({ open, onClose, onProductAdded }: AddProductModalProps) {
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
    rugsMatsType: '' as 'RUGS' | 'MATS' | '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
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
                  {beddingSizes.map(size => (
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Styles</label>
                <div className="mt-2 space-y-2">
                  {beddingStyles.map(style => (
                    <label key={style} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.beddingStyles.includes(style)}
                        onChange={(e) => {
                          const newStyles = e.target.checked
                            ? [...formData.beddingStyles, style]
                            : formData.beddingStyles.filter(s => s !== style);
                          setFormData(prev => ({ ...prev, beddingStyles: newStyles }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Colors</label>
                <div className="mt-2 space-y-2">
                  {beddingColors.map(color => (
                    <label key={color} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.beddingColors.includes(color)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...formData.beddingColors, color]
                            : formData.beddingColors.filter(c => c !== color);
                          setFormData(prev => ({ ...prev, beddingColors: newColors }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'RUGS & MATS' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.rugsMatsType}
                  onChange={(e) => setFormData(prev => ({ ...prev, rugsMatsType: e.target.value as 'RUGS' | 'MATS' | '' }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="RUGS">Rugs</option>
                  <option value="MATS">Mats</option>
                </select>
              </div>
              {formData.rugsMatsType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a subcategory</option>
                    {rugsMatsSubcategories[formData.rugsMatsType as 'RUGS' | 'MATS'].map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                <div className="mt-2 space-y-2">
                  {rugsMatsSizes.map(size => (
                    <label key={size} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.rugsMatsSizes.includes(size)}
                        onChange={(e) => {
                          const newSizes = e.target.checked
                            ? [...formData.rugsMatsSizes, size]
                            : formData.rugsMatsSizes.filter(s => s !== size);
                          setFormData(prev => ({ ...prev, rugsMatsSizes: newSizes }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Colors</label>
                <div className="mt-2 space-y-2">
                  {rugsMatsColors.map(color => (
                    <label key={color} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.rugsMatsColors.includes(color)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...formData.rugsMatsColors, color]
                            : formData.rugsMatsColors.filter(c => c !== color);
                          setFormData(prev => ({ ...prev, rugsMatsColors: newColors }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'THROWS & TOWELS' && (
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
                  {throwsTowelsSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Styles</label>
                <div className="mt-2 space-y-2">
                  {throwsTowelsStyles.map(style => (
                    <label key={style} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.throwsTowelsStyles.includes(style)}
                        onChange={(e) => {
                          const newStyles = e.target.checked
                            ? [...formData.throwsTowelsStyles, style]
                            : formData.throwsTowelsStyles.filter(s => s !== style);
                          setFormData(prev => ({ ...prev, throwsTowelsStyles: newStyles }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Colors</label>
                <div className="mt-2 space-y-2">
                  {throwsTowelsColors.map(color => (
                    <label key={color} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.throwsTowelsColors.includes(color)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...formData.throwsTowelsColors, color]
                            : formData.throwsTowelsColors.filter(c => c !== color);
                          setFormData(prev => ({ ...prev, throwsTowelsColors: newColors }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'OUTDOOR' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a subcategory</option>
                {outdoorSubcategories.map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
              </select>
            </div>
          )}

          {formData.category === 'CURTAINS' && (
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
                  {curtainsSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                <div className="mt-2 space-y-2">
                  {curtainsSizes.map(size => (
                    <label key={size} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.curtainsSizes.includes(size)}
                        onChange={(e) => {
                          const newSizes = e.target.checked
                            ? [...formData.curtainsSizes, size]
                            : formData.curtainsSizes.filter(s => s !== size);
                          setFormData(prev => ({ ...prev, curtainsSizes: newSizes }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Colors</label>
                <div className="mt-2 space-y-2">
                  {curtainsColors.map(color => (
                    <label key={color} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.curtainsColors.includes(color)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...formData.curtainsColors, color]
                            : formData.curtainsColors.filter(c => c !== color);
                          setFormData(prev => ({ ...prev, curtainsColors: newColors }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'CLOTHING' && (
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
                  {clothingSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Styles</label>
                <div className="mt-2 space-y-2">
                  {clothingStyles.map(style => (
                    <label key={style} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.clothingStyles.includes(style)}
                        onChange={(e) => {
                          const newStyles = e.target.checked
                            ? [...formData.clothingStyles, style]
                            : formData.clothingStyles.filter(s => s !== style);
                          setFormData(prev => ({ ...prev, clothingStyles: newStyles }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Colors</label>
                <div className="mt-2 space-y-2">
                  {clothingColors.map(color => (
                    <label key={color} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.clothingColors.includes(color)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...formData.clothingColors, color]
                            : formData.clothingColors.filter(c => c !== color);
                          setFormData(prev => ({ ...prev, clothingColors: newColors }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.category === 'FOOTWEAR' && (
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
                  {footwearSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                <div className="mt-2 space-y-2">
                  {footwearSizes.map(size => (
                    <label key={size} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.footwearSizes.includes(size)}
                        onChange={(e) => {
                          const newSizes = e.target.checked
                            ? [...formData.footwearSizes, size]
                            : formData.footwearSizes.filter(s => s !== size);
                          setFormData(prev => ({ ...prev, footwearSizes: newSizes }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Colors</label>
                <div className="mt-2 space-y-2">
                  {footwearColors.map(color => (
                    <label key={color} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.footwearColors.includes(color)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...formData.footwearColors, color]
                            : formData.footwearColors.filter(c => c !== color);
                          setFormData(prev => ({ ...prev, footwearColors: newColors }));
                        }}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">{color}</span>
                    </label>
                  ))}
                </div>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 