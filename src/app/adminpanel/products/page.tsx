"use client";
import { useState, useEffect } from "react";

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
const beddingColors = ['White', 'Black', 'Grey', 'Blue', 'Pink', 'Green', 'Yellow', 'Red', 'Purple', 'Beige'];

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

function AddProductModal({ open, onClose, onProductAdded }: { open: boolean; onClose: () => void; onProductAdded: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedRugsMatsType, setSelectedRugsMatsType] = useState<'RUGS' | 'MATS'>('RUGS');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState("");
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isHot, setIsHot] = useState(false);

  // Состояния для BEDDING
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Состояния для RUGS & MATS
  const [selectedRugsMatsSizes, setSelectedRugsMatsSizes] = useState<string[]>([]);
  const [selectedRugsMatsColors, setSelectedRugsMatsColors] = useState<string[]>([]);

  // Состояния для THROWS & TOWELS
  const [selectedThrowsTowelsStyles, setSelectedThrowsTowelsStyles] = useState<string[]>([]);
  const [selectedThrowsTowelsColors, setSelectedThrowsTowelsColors] = useState<string[]>([]);

  // Состояния для CURTAINS
  const [selectedCurtainsSizes, setSelectedCurtainsSizes] = useState<string[]>([]);
  const [selectedCurtainsColors, setSelectedCurtainsColors] = useState<string[]>([]);

  // Состояния для CLOTHING
  const [selectedClothingStyles, setSelectedClothingStyles] = useState<string[]>([]);
  const [selectedClothingColors, setSelectedClothingColors] = useState<string[]>([]);

  // Состояния для FOOTWEAR
  const [selectedFootwearSizes, setSelectedFootwearSizes] = useState<string[]>([]);
  const [selectedFootwearColors, setSelectedFootwearColors] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setFeatures("");
      setPrice("");
      setPhotos(null);
      setSelectedCategory(categories[0]);
      if (categories[0] === 'BEDDING') {
        setSelectedSubcategory(beddingSubcategories[0]);
      } else if (categories[0] === 'RUGS & MATS') {
        setSelectedSubcategory(rugsMatsSubcategories.RUGS[0]);
      } else if (categories[0] === 'THROWS & TOWELS') {
        setSelectedSubcategory(throwsTowelsSubcategories[0]);
      } else if (categories[0] === 'OUTDOOR') {
        setSelectedSubcategory(outdoorSubcategories[0]);
      } else if (categories[0] === 'CURTAINS') {
        setSelectedSubcategory(curtainsSubcategories[0]);
      } else if (categories[0] === 'CLOTHING') {
        setSelectedSubcategory(clothingSubcategories[0]);
      } else if (categories[0] === 'FOOTWEAR') {
        setSelectedSubcategory(footwearSubcategories[0]);
      }
      setSelectedRugsMatsType('RUGS');
      setError("");
      setSelectedSizes([]);
      setSelectedStyles([]);
      setSelectedColors([]);
      setSelectedRugsMatsSizes([]);
      setSelectedRugsMatsColors([]);
      setSelectedThrowsTowelsStyles([]);
      setSelectedThrowsTowelsColors([]);
      setSelectedCurtainsSizes([]);
      setSelectedCurtainsColors([]);
      setSelectedClothingStyles([]);
      setSelectedClothingColors([]);
      setSelectedFootwearSizes([]);
      setSelectedFootwearColors([]);
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategory === 'BEDDING') {
      setSelectedSubcategory(beddingSubcategories[0]);
    } else if (selectedCategory === 'RUGS & MATS') {
      const type = selectedRugsMatsType as 'RUGS' | 'MATS';
      setSelectedSubcategory(rugsMatsSubcategories[type][0]);
    } else if (selectedCategory === 'THROWS & TOWELS') {
      setSelectedSubcategory(throwsTowelsSubcategories[0]);
    } else if (selectedCategory === 'OUTDOOR') {
      setSelectedSubcategory(outdoorSubcategories[0]);
    } else if (selectedCategory === 'CURTAINS') {
      setSelectedSubcategory(curtainsSubcategories[0]);
    } else if (selectedCategory === 'CLOTHING') {
      setSelectedSubcategory(clothingSubcategories[0]);
    } else if (selectedCategory === 'FOOTWEAR') {
      setSelectedSubcategory(footwearSubcategories[0]);
    }
  }, [selectedCategory, selectedRugsMatsType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Сначала загружаем изображения, если они есть
      let imageUrls = [];
      if (photos && photos.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < photos.length; i++) {
          formData.append('photos', photos[i]);
        }
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadRes.ok) {
          throw new Error('Failed to upload images');
        }
        
        const uploadData = await uploadRes.json();
        imageUrls = uploadData.urls;
      }

      const productData = {
        title: name,
        description,
        features,
        price: parseFloat(price),
        category: selectedCategory,
        images: imageUrls,
        discount: discount ? parseFloat(discount) : null,
        isSoldOut,
        isHot,
      };

      // Добавляем дополнительные поля для BEDDING
      if (selectedCategory === 'BEDDING') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          beddingSizes: selectedSizes,
          beddingStyles: selectedStyles,
          beddingColors: selectedColors,
        });
      }

      // Добавляем дополнительные поля для RUGS & MATS
      if (selectedCategory === 'RUGS & MATS') {
        Object.assign(productData, {
          rugsMatsType: selectedRugsMatsType,
          subcategory: selectedSubcategory,
          rugsMatsSizes: selectedRugsMatsSizes,
          rugsMatsColors: selectedRugsMatsColors,
        });
      }

      // Добавляем дополнительные поля для THROWS & TOWELS
      if (selectedCategory === 'THROWS & TOWELS') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          throwsTowelsStyles: selectedThrowsTowelsStyles,
          throwsTowelsColors: selectedThrowsTowelsColors,
        });
      }

      // Добавляем дополнительные поля для OUTDOOR
      if (selectedCategory === 'OUTDOOR') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
        });
      }

      // Добавляем дополнительные поля для CURTAINS
      if (selectedCategory === 'CURTAINS') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          curtainsSizes: selectedCurtainsSizes,
          curtainsColors: selectedCurtainsColors,
        });
      }

      // Добавляем дополнительные поля для CLOTHING
      if (selectedCategory === 'CLOTHING') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          clothingStyles: selectedClothingStyles,
          clothingColors: selectedClothingColors,
        });
      }

      // Добавляем дополнительные поля для FOOTWEAR
      if (selectedCategory === 'FOOTWEAR') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          footwearSizes: selectedFootwearSizes,
          footwearColors: selectedFootwearColors,
        });
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      onProductAdded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add Product</h2>
            <button
              className="text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input type="text" className="w-full border rounded p-2" placeholder="Enter product name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded p-2"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Подкатегория для BEDDING */}
            {selectedCategory === 'BEDDING' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {beddingSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для RUGS & MATS */}
            {selectedCategory === 'RUGS & MATS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    className="w-full border rounded p-2"
                    value={selectedRugsMatsType}
                    onChange={e => {
                      setSelectedRugsMatsType(e.target.value as 'RUGS' | 'MATS');
                      setSelectedSubcategory(rugsMatsSubcategories[e.target.value as 'RUGS' | 'MATS'][0]);
                    }}
                  >
                    <option value="RUGS">Rugs</option>
                    <option value="MATS">Mats</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subcategory</label>
                  <select
                    className="w-full border rounded p-2"
                    value={selectedSubcategory}
                    onChange={e => setSelectedSubcategory(e.target.value)}
                  >
                    {rugsMatsSubcategories[selectedRugsMatsType].map(subcat => (
                      <option key={subcat} value={subcat}>{subcat}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Подкатегория для THROWS & TOWELS */}
            {selectedCategory === 'THROWS & TOWELS' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {throwsTowelsSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для OUTDOOR */}
            {selectedCategory === 'OUTDOOR' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {outdoorSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для CURTAINS */}
            {selectedCategory === 'CURTAINS' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {curtainsSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для CLOTHING */}
            {selectedCategory === 'CLOTHING' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {clothingSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для FOOTWEAR */}
            {selectedCategory === 'FOOTWEAR' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {footwearSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="w-full border rounded p-2" rows={3} placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Features</label>
              <input type="text" className="w-full border rounded p-2" placeholder="Enter features" value={features} onChange={e => setFeatures(e.target.value)} />
            </div>

            {/* Дополнительные поля для BEDDING */}
            {selectedCategory === 'BEDDING' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {beddingSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSizes([...selectedSizes, size]);
                            } else {
                              setSelectedSizes(selectedSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Styles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {beddingStyles.map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedStyles.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStyles([...selectedStyles, style]);
                            } else {
                              setSelectedStyles(selectedStyles.filter(s => s !== style));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {beddingColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для RUGS & MATS */}
            {selectedCategory === 'RUGS & MATS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {rugsMatsSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedRugsMatsSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRugsMatsSizes([...selectedRugsMatsSizes, size]);
                            } else {
                              setSelectedRugsMatsSizes(selectedRugsMatsSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {rugsMatsColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedRugsMatsColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRugsMatsColors([...selectedRugsMatsColors, color]);
                            } else {
                              setSelectedRugsMatsColors(selectedRugsMatsColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для THROWS & TOWELS */}
            {selectedCategory === 'THROWS & TOWELS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Styles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {throwsTowelsStyles.map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedThrowsTowelsStyles.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedThrowsTowelsStyles([...selectedThrowsTowelsStyles, style]);
                            } else {
                              setSelectedThrowsTowelsStyles(selectedThrowsTowelsStyles.filter(s => s !== style));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {throwsTowelsColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedThrowsTowelsColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedThrowsTowelsColors([...selectedThrowsTowelsColors, color]);
                            } else {
                              setSelectedThrowsTowelsColors(selectedThrowsTowelsColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для CURTAINS */}
            {selectedCategory === 'CURTAINS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {curtainsSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCurtainsSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCurtainsSizes([...selectedCurtainsSizes, size]);
                            } else {
                              setSelectedCurtainsSizes(selectedCurtainsSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {curtainsColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCurtainsColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCurtainsColors([...selectedCurtainsColors, color]);
                            } else {
                              setSelectedCurtainsColors(selectedCurtainsColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для CLOTHING */}
            {selectedCategory === 'CLOTHING' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Styles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {clothingStyles.map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedClothingStyles.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedClothingStyles([...selectedClothingStyles, style]);
                            } else {
                              setSelectedClothingStyles(selectedClothingStyles.filter(s => s !== style));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {clothingColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedClothingColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedClothingColors([...selectedClothingColors, color]);
                            } else {
                              setSelectedClothingColors(selectedClothingColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для FOOTWEAR */}
            {selectedCategory === 'FOOTWEAR' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {footwearSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedFootwearSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFootwearSizes([...selectedFootwearSizes, size]);
                            } else {
                              setSelectedFootwearSizes(selectedFootwearSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {footwearColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedFootwearColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFootwearColors([...selectedFootwearColors, color]);
                            } else {
                              setSelectedFootwearColors(selectedFootwearColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <input 
                  type="number" 
                  className="w-full border rounded p-2" 
                  placeholder="Enter discount" 
                  min="0" 
                  max="100"
                  value={discount} 
                  onChange={e => setDiscount(e.target.value)} 
                />
              </div>
              <div className="flex items-end space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isSoldOut}
                    onChange={e => setIsSoldOut(e.target.checked)}
                    className="rounded"
                  />
                  <span>Sold Out</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isHot}
                    onChange={e => setIsHot(e.target.checked)}
                    className="rounded"
                  />
                  <span>Hot</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input type="number" className="w-full border rounded p-2" placeholder="Enter price" min="0" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photos</label>
              <input type="file" className="w-full" multiple accept="image/*" onChange={e => setPhotos(e.target.files)} />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </div>
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditProductModal({ open, onClose, product, onProductEdited }: { open: boolean; onClose: () => void; product: any; onProductEdited: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState(product?.category || categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedRugsMatsType, setSelectedRugsMatsType] = useState<'RUGS' | 'MATS'>(product?.rugsMatsType || 'RUGS');
  const [name, setName] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [features, setFeatures] = useState(product?.features || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState(product?.discount?.toString() || "");
  const [isSoldOut, setIsSoldOut] = useState(product?.isSoldOut || false);
  const [isHot, setIsHot] = useState(product?.isHot || false);

  // Состояния для BEDDING
  const [selectedSizes, setSelectedSizes] = useState<string[]>(product?.beddingSizes || []);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(product?.beddingStyles || []);
  const [selectedColors, setSelectedColors] = useState<string[]>(product?.beddingColors || []);

  // Состояния для RUGS & MATS
  const [selectedRugsMatsSizes, setSelectedRugsMatsSizes] = useState<string[]>(product?.rugsMatsSizes || []);
  const [selectedRugsMatsColors, setSelectedRugsMatsColors] = useState<string[]>(product?.rugsMatsColors || []);

  // Состояния для THROWS & TOWELS
  const [selectedThrowsTowelsStyles, setSelectedThrowsTowelsStyles] = useState<string[]>(product?.throwsTowelsStyles || []);
  const [selectedThrowsTowelsColors, setSelectedThrowsTowelsColors] = useState<string[]>(product?.throwsTowelsColors || []);

  // Состояния для CURTAINS
  const [selectedCurtainsSizes, setSelectedCurtainsSizes] = useState<string[]>(product?.curtainsSizes || []);
  const [selectedCurtainsColors, setSelectedCurtainsColors] = useState<string[]>(product?.curtainsColors || []);

  // Состояния для CLOTHING
  const [selectedClothingStyles, setSelectedClothingStyles] = useState<string[]>(product?.clothingStyles || []);
  const [selectedClothingColors, setSelectedClothingColors] = useState<string[]>(product?.clothingColors || []);

  // Состояния для FOOTWEAR
  const [selectedFootwearSizes, setSelectedFootwearSizes] = useState<string[]>(product?.footwearSizes || []);
  const [selectedFootwearColors, setSelectedFootwearColors] = useState<string[]>(product?.footwearColors || []);

  useEffect(() => {
    if (open && product) {
      setName(product.title || "");
      setDescription(product.description || "");
      setFeatures(product.features || "");
      setPrice(product.price?.toString() || "");
      setPhotos(null);
      setSelectedCategory(product.category || categories[0]);
      if (product.category === 'BEDDING') {
        setSelectedSubcategory(product.subcategory || beddingSubcategories[0]);
      } else if (product.category === 'RUGS & MATS') {
        const type = (product.rugsMatsType || 'RUGS') as 'RUGS' | 'MATS';
        setSelectedSubcategory(product.subcategory || rugsMatsSubcategories[type][0]);
      } else if (product.category === 'THROWS & TOWELS') {
        setSelectedSubcategory(product.subcategory || throwsTowelsSubcategories[0]);
      } else if (product.category === 'OUTDOOR') {
        setSelectedSubcategory(product.subcategory || outdoorSubcategories[0]);
      } else if (product.category === 'CURTAINS') {
        setSelectedSubcategory(product.subcategory || curtainsSubcategories[0]);
      } else if (product.category === 'CLOTHING') {
        setSelectedSubcategory(product.subcategory || clothingSubcategories[0]);
      } else if (product.category === 'FOOTWEAR') {
        setSelectedSubcategory(product.subcategory || footwearSubcategories[0]);
      }
      setSelectedRugsMatsType(product.rugsMatsType || 'RUGS');
      setError("");
      setSelectedSizes(product.beddingSizes || []);
      setSelectedStyles(product.beddingStyles || []);
      setSelectedColors(product.beddingColors || []);
      setSelectedRugsMatsSizes(product.rugsMatsSizes || []);
      setSelectedRugsMatsColors(product.rugsMatsColors || []);
      setSelectedThrowsTowelsStyles(product.throwsTowelsStyles || []);
      setSelectedThrowsTowelsColors(product.throwsTowelsColors || []);
      setSelectedCurtainsSizes(product.curtainsSizes || []);
      setSelectedCurtainsColors(product.curtainsColors || []);
      setSelectedClothingStyles(product.clothingStyles || []);
      setSelectedClothingColors(product.clothingColors || []);
      setSelectedFootwearSizes(product.footwearSizes || []);
      setSelectedFootwearColors(product.footwearColors || []);
    }
  }, [open, product]);

  useEffect(() => {
    if (selectedCategory === 'BEDDING') {
      setSelectedSubcategory(beddingSubcategories[0]);
    } else if (selectedCategory === 'RUGS & MATS') {
      const type = selectedRugsMatsType as 'RUGS' | 'MATS';
      setSelectedSubcategory(rugsMatsSubcategories[type][0]);
    } else if (selectedCategory === 'THROWS & TOWELS') {
      setSelectedSubcategory(throwsTowelsSubcategories[0]);
    } else if (selectedCategory === 'OUTDOOR') {
      setSelectedSubcategory(outdoorSubcategories[0]);
    } else if (selectedCategory === 'CURTAINS') {
      setSelectedSubcategory(curtainsSubcategories[0]);
    } else if (selectedCategory === 'CLOTHING') {
      setSelectedSubcategory(clothingSubcategories[0]);
    } else if (selectedCategory === 'FOOTWEAR') {
      setSelectedSubcategory(footwearSubcategories[0]);
    }
  }, [selectedCategory, selectedRugsMatsType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Сначала загружаем новые изображения, если они есть
      let imageUrls = product.images || [];
      if (photos && photos.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < photos.length; i++) {
          formData.append('photos', photos[i]);
        }
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadRes.ok) {
          throw new Error('Failed to upload images');
        }
        
        const uploadData = await uploadRes.json();
        imageUrls = [...imageUrls, ...uploadData.urls];
      }

      const productData = {
        _id: product._id,
        title: name,
        description,
        features,
        price: parseFloat(price),
        category: selectedCategory,
        images: imageUrls,
        discount: discount ? parseFloat(discount) : null,
        isSoldOut,
        isHot,
      };

      // Добавляем дополнительные поля для BEDDING
      if (selectedCategory === 'BEDDING') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          beddingSizes: selectedSizes,
          beddingStyles: selectedStyles,
          beddingColors: selectedColors,
        });
      }

      // Добавляем дополнительные поля для RUGS & MATS
      if (selectedCategory === 'RUGS & MATS') {
        Object.assign(productData, {
          rugsMatsType: selectedRugsMatsType,
          subcategory: selectedSubcategory,
          rugsMatsSizes: selectedRugsMatsSizes,
          rugsMatsColors: selectedRugsMatsColors,
        });
      }

      // Добавляем дополнительные поля для THROWS & TOWELS
      if (selectedCategory === 'THROWS & TOWELS') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          throwsTowelsStyles: selectedThrowsTowelsStyles,
          throwsTowelsColors: selectedThrowsTowelsColors,
        });
      }

      // Добавляем дополнительные поля для OUTDOOR
      if (selectedCategory === 'OUTDOOR') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
        });
      }

      // Добавляем дополнительные поля для CURTAINS
      if (selectedCategory === 'CURTAINS') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          curtainsSizes: selectedCurtainsSizes,
          curtainsColors: selectedCurtainsColors,
        });
      }

      // Добавляем дополнительные поля для CLOTHING
      if (selectedCategory === 'CLOTHING') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          clothingStyles: selectedClothingStyles,
          clothingColors: selectedClothingColors,
        });
      }

      // Добавляем дополнительные поля для FOOTWEAR
      if (selectedCategory === 'FOOTWEAR') {
        Object.assign(productData, {
          subcategory: selectedSubcategory,
          footwearSizes: selectedFootwearSizes,
          footwearColors: selectedFootwearColors,
        });
      }

      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to edit product");
      onProductEdited();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to edit product");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Product</h2>
            <button
              className="text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input type="text" className="w-full border rounded p-2" placeholder="Enter product name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded p-2"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Подкатегория для BEDDING */}
            {selectedCategory === 'BEDDING' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {beddingSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для RUGS & MATS */}
            {selectedCategory === 'RUGS & MATS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    className="w-full border rounded p-2"
                    value={selectedRugsMatsType}
                    onChange={e => {
                      setSelectedRugsMatsType(e.target.value as 'RUGS' | 'MATS');
                      setSelectedSubcategory(rugsMatsSubcategories[e.target.value as 'RUGS' | 'MATS'][0]);
                    }}
                  >
                    <option value="RUGS">Rugs</option>
                    <option value="MATS">Mats</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subcategory</label>
                  <select
                    className="w-full border rounded p-2"
                    value={selectedSubcategory}
                    onChange={e => setSelectedSubcategory(e.target.value)}
                  >
                    {rugsMatsSubcategories[selectedRugsMatsType].map(subcat => (
                      <option key={subcat} value={subcat}>{subcat}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Подкатегория для THROWS & TOWELS */}
            {selectedCategory === 'THROWS & TOWELS' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {throwsTowelsSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для OUTDOOR */}
            {selectedCategory === 'OUTDOOR' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {outdoorSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для CURTAINS */}
            {selectedCategory === 'CURTAINS' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {curtainsSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для CLOTHING */}
            {selectedCategory === 'CLOTHING' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {clothingSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Подкатегория для FOOTWEAR */}
            {selectedCategory === 'FOOTWEAR' && (
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedSubcategory}
                  onChange={e => setSelectedSubcategory(e.target.value)}
                >
                  {footwearSubcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="w-full border rounded p-2" rows={3} placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Features</label>
              <input type="text" className="w-full border rounded p-2" placeholder="Enter features" value={features} onChange={e => setFeatures(e.target.value)} />
            </div>

            {/* Дополнительные поля для BEDDING */}
            {selectedCategory === 'BEDDING' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {beddingSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSizes([...selectedSizes, size]);
                            } else {
                              setSelectedSizes(selectedSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Styles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {beddingStyles.map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedStyles.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStyles([...selectedStyles, style]);
                            } else {
                              setSelectedStyles(selectedStyles.filter(s => s !== style));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {beddingColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для RUGS & MATS */}
            {selectedCategory === 'RUGS & MATS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {rugsMatsSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedRugsMatsSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRugsMatsSizes([...selectedRugsMatsSizes, size]);
                            } else {
                              setSelectedRugsMatsSizes(selectedRugsMatsSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {rugsMatsColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedRugsMatsColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRugsMatsColors([...selectedRugsMatsColors, color]);
                            } else {
                              setSelectedRugsMatsColors(selectedRugsMatsColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для THROWS & TOWELS */}
            {selectedCategory === 'THROWS & TOWELS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Styles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {throwsTowelsStyles.map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedThrowsTowelsStyles.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedThrowsTowelsStyles([...selectedThrowsTowelsStyles, style]);
                            } else {
                              setSelectedThrowsTowelsStyles(selectedThrowsTowelsStyles.filter(s => s !== style));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {throwsTowelsColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedThrowsTowelsColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedThrowsTowelsColors([...selectedThrowsTowelsColors, color]);
                            } else {
                              setSelectedThrowsTowelsColors(selectedThrowsTowelsColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для CURTAINS */}
            {selectedCategory === 'CURTAINS' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {curtainsSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCurtainsSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCurtainsSizes([...selectedCurtainsSizes, size]);
                            } else {
                              setSelectedCurtainsSizes(selectedCurtainsSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {curtainsColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCurtainsColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCurtainsColors([...selectedCurtainsColors, color]);
                            } else {
                              setSelectedCurtainsColors(selectedCurtainsColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для CLOTHING */}
            {selectedCategory === 'CLOTHING' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Styles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {clothingStyles.map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedClothingStyles.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedClothingStyles([...selectedClothingStyles, style]);
                            } else {
                              setSelectedClothingStyles(selectedClothingStyles.filter(s => s !== style));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {clothingColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedClothingColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedClothingColors([...selectedClothingColors, color]);
                            } else {
                              setSelectedClothingColors(selectedClothingColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Дополнительные поля для FOOTWEAR */}
            {selectedCategory === 'FOOTWEAR' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Sizes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {footwearSizes.map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedFootwearSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFootwearSizes([...selectedFootwearSizes, size]);
                            } else {
                              setSelectedFootwearSizes(selectedFootwearSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Colors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {footwearColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedFootwearColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFootwearColors([...selectedFootwearColors, color]);
                            } else {
                              setSelectedFootwearColors(selectedFootwearColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <input 
                  type="number" 
                  className="w-full border rounded p-2" 
                  placeholder="Enter discount" 
                  min="0" 
                  max="100"
                  value={discount} 
                  onChange={e => setDiscount(e.target.value)} 
                />
              </div>
              <div className="flex items-end space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isSoldOut}
                    onChange={e => setIsSoldOut(e.target.checked)}
                    className="rounded"
                  />
                  <span>Sold Out</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isHot}
                    onChange={e => setIsHot(e.target.checked)}
                    className="rounded"
                  />
                  <span>Hot</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input type="number" className="w-full border rounded p-2" placeholder="Enter price" min="0" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photos</label>
              <input type="file" className="w-full" multiple accept="image/*" onChange={e => setPhotos(e.target.files)} />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </div>
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  const renderBeddingDetails = (product: any) => {
    if (product.category === 'BEDDING') {
      return (
        <div className="text-sm text-gray-600">
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {product.beddingSizes?.join(', ') || 'N/A'}</div>
          <div><strong>Styles:</strong> {product.beddingStyles?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.beddingColors?.join(', ') || 'N/A'}</div>
        </div>
      );
    }
    
    if (product.category === 'RUGS & MATS') {
      return (
        <div className="text-sm text-gray-600">
          <div><strong>Type:</strong> {product.rugsMatsType || 'N/A'}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {product.rugsMatsSizes?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.rugsMatsColors?.join(', ') || 'N/A'}</div>
        </div>
      );
    }

    if (product.category === 'THROWS & TOWELS') {
      return (
        <div className="text-sm text-gray-600">
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Styles:</strong> {product.throwsTowelsStyles?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.throwsTowelsColors?.join(', ') || 'N/A'}</div>
        </div>
      );
    }

    if (product.category === 'OUTDOOR') {
      return (
        <div className="text-sm text-gray-600">
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
        </div>
      );
    }

    if (product.category === 'CURTAINS') {
      return (
        <div className="text-sm text-gray-600">
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {product.curtainsSizes?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.curtainsColors?.join(', ') || 'N/A'}</div>
        </div>
      );
    }

    if (product.category === 'CLOTHING') {
      return (
        <div className="text-sm text-gray-600">
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Styles:</strong> {product.clothingStyles?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.clothingColors?.join(', ') || 'N/A'}</div>
        </div>
      );
    }

    if (product.category === 'FOOTWEAR') {
      return (
        <div className="text-sm text-gray-600">
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {product.footwearSizes?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.footwearColors?.join(', ') || 'N/A'}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} onProductAdded={fetchProducts} />
      <EditProductModal open={editModalOpen} onClose={() => setEditModalOpen(false)} product={editingProduct} onProductEdited={fetchProducts} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          Add Product
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-gray-500 text-center py-8">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No products yet.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Details</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-2 px-4">{product.title}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">£{product.price}</td>
                  <td className="py-2 px-4">
                    {renderBeddingDetails(product)}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 