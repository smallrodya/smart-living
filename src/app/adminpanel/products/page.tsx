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

  const formatSizes = (sizes: any[]) => {
    if (!sizes || sizes.length === 0) return 'N/A';
    return sizes.map(size => {
      if (typeof size === 'string') return size;
      return `${size.size} (Regular: £${size.regularPrice}, Sale: £${size.salePrice})`;
    }).join(', ');
  };

  const formatPrice = (price: string) => {
    if (!price) return 'N/A';
    return price.startsWith('£') ? price : `£${price}`;
  };

  const renderBeddingDetails = (product: any) => {
    if (product.category === 'BEDDING') {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>SKU:</strong> {product.sku || 'N/A'}</div>
          <div><strong>Stock:</strong> {product.stock || 0}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {formatSizes(product.beddingSizes)}</div>
          <div><strong>Styles:</strong> {product.beddingStyles?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.beddingColors?.join(', ') || 'N/A'}</div>
          <div><strong>Features:</strong> {product.features || 'N/A'}</div>
          <div><strong>Status:</strong> {product.isSoldOut ? 'Sold Out' : 'In Stock'}</div>
          <div><strong>Hot:</strong> {product.isHot ? 'Yes' : 'No'}</div>
        </div>
      );
    }
    
    if (product.category === 'RUGS & MATS') {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>SKU:</strong> {product.sku || 'N/A'}</div>
          <div><strong>Stock:</strong> {product.stock || 0}</div>
          <div><strong>Type:</strong> {product.rugsMatsType || 'N/A'}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {formatSizes(product.rugsMatsSizes)}</div>
          <div><strong>Colors:</strong> {product.rugsMatsColors?.join(', ') || 'N/A'}</div>
          <div><strong>Features:</strong> {product.features || 'N/A'}</div>
          <div><strong>Status:</strong> {product.isSoldOut ? 'Sold Out' : 'In Stock'}</div>
          <div><strong>Hot:</strong> {product.isHot ? 'Yes' : 'No'}</div>
        </div>
      );
    }

    if (product.category === 'THROWS & TOWELS') {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>SKU:</strong> {product.sku || 'N/A'}</div>
          <div><strong>Stock:</strong> {product.stock || 0}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Styles:</strong> {product.throwsTowelsStyles?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.throwsTowelsColors?.join(', ') || 'N/A'}</div>
          <div><strong>Features:</strong> {product.features || 'N/A'}</div>
          <div><strong>Status:</strong> {product.isSoldOut ? 'Sold Out' : 'In Stock'}</div>
          <div><strong>Hot:</strong> {product.isHot ? 'Yes' : 'No'}</div>
        </div>
      );
    }

    if (product.category === 'OUTDOOR') {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>SKU:</strong> {product.sku || 'N/A'}</div>
          <div><strong>Stock:</strong> {product.stock || 0}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Features:</strong> {product.features || 'N/A'}</div>
          <div><strong>Status:</strong> {product.isSoldOut ? 'Sold Out' : 'In Stock'}</div>
          <div><strong>Hot:</strong> {product.isHot ? 'Yes' : 'No'}</div>
        </div>
      );
    }

    if (product.category === 'CURTAINS') {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>SKU:</strong> {product.sku || 'N/A'}</div>
          <div><strong>Stock:</strong> {product.stock || 0}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {formatSizes(product.curtainsSizes)}</div>
          <div><strong>Colors:</strong> {product.curtainsColors?.join(', ') || 'N/A'}</div>
          <div><strong>Features:</strong> {product.features || 'N/A'}</div>
          <div><strong>Status:</strong> {product.isSoldOut ? 'Sold Out' : 'In Stock'}</div>
          <div><strong>Hot:</strong> {product.isHot ? 'Yes' : 'No'}</div>
        </div>
      );
    }

    if (product.category === 'CLOTHING') {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>SKU:</strong> {product.sku || 'N/A'}</div>
          <div><strong>Stock:</strong> {product.stock || 0}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Styles:</strong> {product.clothingStyles?.join(', ') || 'N/A'}</div>
          <div><strong>Colors:</strong> {product.clothingColors?.join(', ') || 'N/A'}</div>
          <div><strong>Features:</strong> {product.features || 'N/A'}</div>
          <div><strong>Status:</strong> {product.isSoldOut ? 'Sold Out' : 'In Stock'}</div>
          <div><strong>Hot:</strong> {product.isHot ? 'Yes' : 'No'}</div>
        </div>
      );
    }

    if (product.category === 'FOOTWEAR') {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>SKU:</strong> {product.sku || 'N/A'}</div>
          <div><strong>Stock:</strong> {product.stock || 0}</div>
          <div><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</div>
          <div><strong>Sizes:</strong> {formatSizes(product.footwearSizes)}</div>
          <div><strong>Colors:</strong> {product.footwearColors?.join(', ') || 'N/A'}</div>
          <div><strong>Features:</strong> {product.features || 'N/A'}</div>
          <div><strong>Status:</strong> {product.isSoldOut ? 'Sold Out' : 'In Stock'}</div>
          <div><strong>Hot:</strong> {product.isHot ? 'Yes' : 'No'}</div>
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
                  <td className="py-2 px-4">{formatPrice(product.price)}</td>
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