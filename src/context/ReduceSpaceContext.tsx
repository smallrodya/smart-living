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
  const [sectionTitle, setSectionTitle] = useState('Reduce Your Space');
  const [sectionDescription, setSectionDescription] = useState('Transform your outdoor space into a comfortable and stylish retreat with our premium furniture collection.');
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const savedTitle = localStorage.getItem('reduceSpaceTitle');
    const savedDescription = localStorage.getItem('reduceSpaceDescription');
    const savedProducts = localStorage.getItem('reduceSpaceProducts');

    if (savedTitle) setSectionTitle(savedTitle);
    if (savedDescription) setSectionDescription(savedDescription);
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  const updateSectionTitle = async (title: string) => {
    setSectionTitle(title);
    localStorage.setItem('reduceSpaceTitle', title);
  };

  const updateSectionDescription = async (description: string) => {
    setSectionDescription(description);
    localStorage.setItem('reduceSpaceDescription', description);
  };

  const updateProduct = async (product: Product) => {
    setProducts(prevProducts => {
      const newProducts = prevProducts.map(p => 
        p.id === product.id ? product : p
      );
      localStorage.setItem('reduceSpaceProducts', JSON.stringify(newProducts));
      return newProducts;
    });
  };

  const deleteProduct = async (productId: string) => {
    setProducts(prevProducts => {
      const newProducts = prevProducts.filter(p => p.id !== productId);
      localStorage.setItem('reduceSpaceProducts', JSON.stringify(newProducts));
      return newProducts;
    });
  };

  const addProduct = async (product: Product) => {
    setProducts(prevProducts => {
      const newProducts = [...prevProducts, product];
      localStorage.setItem('reduceSpaceProducts', JSON.stringify(newProducts));
      return newProducts;
    });
  };

  return (
    <ReduceSpaceContext.Provider value={{
      sectionTitle,
      sectionDescription,
      products,
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