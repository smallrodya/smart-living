'use client';
import React, { useState } from 'react';
import { useReduceSpace, Product } from '@/context/ReduceSpaceContext';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Save, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function ReduceSpiceSection() {
  const { sectionTitle, sectionDescription, products, updateSectionTitle, updateSectionDescription, updateProduct, deleteProduct, addProduct } = useReduceSpace();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [tempProduct, setTempProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const onDrop = async (acceptedFiles: File[], productId: string, type: 'main' | 'hover') => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const imageUrl = data.url;

      if (editingProduct === productId && tempProduct) {
        setTempProduct({
          ...tempProduct,
          [type === 'main' ? 'src' : 'hoverSrc']: imageUrl
        });
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          updateProduct({
            ...product,
            [type === 'main' ? 'src' : 'hoverSrc']: imageUrl
          });
        }
      }
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const { getRootProps: getMainImageProps, getInputProps: getMainImageInput } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => editingProduct && onDrop(files, editingProduct, 'main')
  });

  const { getRootProps: getHoverImageProps, getInputProps: getHoverImageInput } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => editingProduct && onDrop(files, editingProduct, 'hover')
  });

  const handleEdit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProduct(productId);
      setTempProduct({ ...product });
    }
  };

  const handleSave = async () => {
    if (editingProduct && tempProduct) {
      await updateProduct(tempProduct);
      setEditingProduct(null);
      setTempProduct(null);
      toast.success('Product updated successfully');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setTempProduct(null);
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully');
      setDeletingProduct(null);
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteImage = (type: 'main' | 'hover') => {
    if (editingProduct && tempProduct) {
      setTempProduct({
        ...tempProduct,
        [type === 'main' ? 'src' : 'hoverSrc']: ''
      });
      toast.success(`${type === 'main' ? 'Main' : 'Hover'} image removed`);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setTempProduct({
      id: `temp-${Date.now()}`,
      title: '',
      price: '',
      oldPrice: '',
      discount: '',
      src: '',
      hoverSrc: '',
      description: '',
      features: [],
      stock: 0,
      isHot: false,
      isSoldOut: false
    });
  };

  const handleSaveNew = async () => {
    if (tempProduct) {
      try {
        await addProduct(tempProduct);
        toast.success('Product added successfully');
        setIsAddingNew(false);
        setTempProduct(null);
      } catch (error) {
        toast.error('Failed to add product');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Reduce Space Section</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

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
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isAddingNew && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="space-y-4">
                {/* Image Upload */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Image
                    </label>
                    <div
                      {...getMainImageProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors relative"
                    >
                      <input {...getMainImageInput()} />
                      {tempProduct?.src ? (
                        <div className="relative aspect-square group">
                          <Image
                            src={tempProduct.src}
                            alt="Main"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage('main');
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Drop image here</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hover Image
                    </label>
                    <div
                      {...getHoverImageProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors relative"
                    >
                      <input {...getHoverImageInput()} />
                      {tempProduct?.hoverSrc ? (
                        <div className="relative aspect-square group">
                          <Image
                            src={tempProduct.hoverSrc}
                            alt="Hover"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage('hover');
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Drop image here</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={tempProduct?.title || ''}
                      onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        value={tempProduct?.price || ''}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Old Price
                      </label>
                      <input
                        type="text"
                        value={tempProduct?.oldPrice || ''}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, oldPrice: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount
                    </label>
                    <input
                      type="text"
                      value={tempProduct?.discount || ''}
                      onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, discount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={tempProduct?.stock || 0}
                      onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, stock: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={tempProduct?.description || ''}
                      onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Features (one per line)
                    </label>
                    <textarea
                      value={tempProduct?.features?.join('\n') || ''}
                      onChange={(e) => tempProduct && setTempProduct({ 
                        ...tempProduct, 
                        features: e.target.value.split('\n').filter(feature => feature.trim() !== '')
                      })}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter each feature on a new line"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={tempProduct?.isHot || false}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, isHot: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Hot Product</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={tempProduct?.isSoldOut || false}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, isSoldOut: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Sold Out</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsAddingNew(false);
                      setTempProduct(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNew}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              {editingProduct === product.id ? (
                // Edit Mode
                <div className="space-y-4">
                  {/* Image Upload */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Main Image
                      </label>
                      <div
                        {...getMainImageProps()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors relative"
                      >
                        <input {...getMainImageInput()} />
                        {tempProduct?.src ? (
                          <div className="relative aspect-square group">
                            <Image
                              src={tempProduct.src}
                              alt="Main"
                              fill
                              className="object-cover rounded-lg"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage('main');
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Drop image here</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hover Image
                      </label>
                      <div
                        {...getHoverImageProps()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors relative"
                      >
                        <input {...getHoverImageInput()} />
                        {tempProduct?.hoverSrc ? (
                          <div className="relative aspect-square group">
                            <Image
                              src={tempProduct.hoverSrc}
                              alt="Hover"
                              fill
                              className="object-cover rounded-lg"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage('hover');
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Drop image here</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={tempProduct?.title || ''}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price
                        </label>
                        <input
                          type="text"
                          value={tempProduct?.price || ''}
                          onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, price: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Old Price
                        </label>
                        <input
                          type="text"
                          value={tempProduct?.oldPrice || ''}
                          onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, oldPrice: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount
                      </label>
                      <input
                        type="text"
                        value={tempProduct?.discount || ''}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, discount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={tempProduct?.stock || 0}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, stock: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={tempProduct?.description || ''}
                        onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Features (one per line)
                      </label>
                      <textarea
                        value={tempProduct?.features?.join('\n') || ''}
                        onChange={(e) => tempProduct && setTempProduct({ 
                          ...tempProduct, 
                          features: e.target.value.split('\n').filter(feature => feature.trim() !== '')
                        })}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter each feature on a new line"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={tempProduct?.isHot || false}
                          onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, isHot: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Hot Product</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={tempProduct?.isSoldOut || false}
                          onChange={(e) => tempProduct && setTempProduct({ ...tempProduct, isSoldOut: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Sold Out</span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={product.src}
                      alt={product.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                    {product.isHot && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Hot
                      </span>
                    )}
                    {product.isSoldOut && (
                      <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-red-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>
                    <span className="text-sm font-semibold text-red-600">{product.discount}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Stock: {product.stock || 0}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={() => setDeletingProduct(product.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingProduct)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 