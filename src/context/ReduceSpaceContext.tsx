'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  src: string;
  hoverSrc: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  isHot?: boolean;
  isSoldOut?: boolean;
  stock?: number;
  description: string;
  features: string[];
}

interface ReduceSpaceContextType {
  sectionTitle: string;
  sectionDescription: string;
  products: Product[];
  isLoading: boolean;
  updateSectionTitle: (title: string) => Promise<void>;
  updateSectionDescription: (description: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
}

const defaultProducts: Product[] = [
  {
    id: '1',
    src: '/images/reduce-space/chair1.jpg',
    hoverSrc: '/images/reduce-space/chair1-hover.jpg',
    title: '2-in-1 Reclining Gravity Chair - Dark Green',
    price: '£199.99',
    oldPrice: '£299.99',
    discount: '-33%',
    isHot: true,
    stock: 10,
    description: '',
    features: []
  },
  {
    id: '2',
    src: '/images/reduce-space/chair2.jpg',
    hoverSrc: '/images/reduce-space/chair2-hover.jpg',
    title: '2-in-1 Reclining Gravity Chair - Grey',
    price: '£199.99',
    oldPrice: '£299.99',
    discount: '-33%',
    stock: 5,
    description: '',
    features: []
  },
  {
    id: '3',
    src: '/images/reduce-space/chair3.jpg',
    hoverSrc: '/images/reduce-space/chair3-hover.jpg',
    title: 'Zero Gravity Chair - Black',
    price: '£149.99',
    oldPrice: '£249.99',
    discount: '-40%',
    isHot: true,
    stock: 15,
    description: '',
    features: []
  },
  {
    id: '4',
    src: '/images/reduce-space/chair4.jpg',
    hoverSrc: '/images/reduce-space/chair4-hover.jpg',
    title: 'Zero Gravity Chair - Grey',
    price: '£149.99',
    oldPrice: '£249.99',
    discount: '-40%',
    stock: 8,
    description: '',
    features: []
  }
];

const defaultTitle = 'Reduce Space, Increase Comfort';
const defaultDescription = 'Transform your outdoor space with our premium collection of gravity chairs. Experience ultimate relaxation with our innovative designs that combine style, comfort, and functionality.';

const ReduceSpaceContext = createContext<ReduceSpaceContextType | undefined>(undefined);

export function ReduceSpaceProvider({ children }: { children: React.ReactNode }) {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/reduce-space');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setSectionTitle(data.sectionTitle);
        setSectionDescription(data.sectionDescription);
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateSectionTitle = async (title: string) => {
    try {
      const response = await fetch('/api/reduce-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionTitle: title })
      });
      if (!response.ok) throw new Error('Failed to update title');
      setSectionTitle(title);
    } catch (error) {
      console.error('Error updating title:', error);
      throw error;
    }
  };

  const updateSectionDescription = async (description: string) => {
    try {
      const response = await fetch('/api/reduce-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionDescription: description })
      });
      if (!response.ok) throw new Error('Failed to update description');
      setSectionDescription(description);
    } catch (error) {
      console.error('Error updating description:', error);
      throw error;
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const updatedProducts = products.map(p => p.id === product.id ? product : p);
      const response = await fetch('/api/reduce-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      });
      if (!response.ok) throw new Error('Failed to update product');
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const updatedProducts = products.filter(p => p.id !== productId);
      const response = await fetch('/api/reduce-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const updatedProducts = [...products, product];
      const response = await fetch('/api/reduce-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      });
      if (!response.ok) throw new Error('Failed to add product');
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  return (
    <ReduceSpaceContext.Provider value={{
      sectionTitle,
      sectionDescription,
      products,
      isLoading,
      updateSectionTitle,
      updateSectionDescription,
      updateProduct,
      deleteProduct,
      addProduct
    }}>
      {children}
    </ReduceSpaceContext.Provider>
  );
}

export function useReduceSpace() {
  const context = useContext(ReduceSpaceContext);
  if (context === undefined) {
    throw new Error('useReduceSpace must be used within a ReduceSpaceProvider');
  }
  return context;
} 