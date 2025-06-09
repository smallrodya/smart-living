'use client';
import React, { useState } from 'react';
import { useBestSellers } from '@/context/BestSellersContext';
import { toast } from 'react-hot-toast';

const BestSellersPage = () => {
  const { sectionTitle, sectionDescription, products, updateSectionTitle, updateSectionDescription, updateProducts } = useBestSellers();
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<any>(null);

  const handleProductEdit = (index: number) => {
    setEditingProduct(index);
    setEditedProduct(products[index]);
  };

  const handleProductSave = (index: number) => {
    const newProducts = [...products];
    newProducts[index] = editedProduct;
    updateProducts(newProducts);
    setEditingProduct(null);
    toast.success('Product updated successfully');
  };

  const handleProductCancel = () => {
    setEditingProduct(null);
    setEditedProduct(null);
  };

  const handleProductChange = (field: string, value: string) => {
    setEditedProduct((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Best Sellers Section</h1>

      {/* Section Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Section Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => updateSectionTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              value={sectionDescription}
              onChange={(e) => updateSectionDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="space-y-6">
          {products.map((product, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              {editingProduct === index ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editedProduct.title}
                      onChange={(e) => handleProductChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      value={editedProduct.price}
                      onChange={(e) => handleProductChange('price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Old Price
                    </label>
                    <input
                      type="text"
                      value={editedProduct.oldPrice}
                      onChange={(e) => handleProductChange('oldPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount
                    </label>
                    <input
                      type="text"
                      value={editedProduct.discount}
                      onChange={(e) => handleProductChange('discount', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleProductCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleProductSave(index)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{product.title}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <span className="line-through mr-2">{product.oldPrice}</span>
                        <span className="text-red-600 font-medium">{product.price}</span>
                        <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                          {product.discount}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleProductEdit(index)}
                      className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellersPage; 