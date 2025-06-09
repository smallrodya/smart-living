'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: string;
  src: string;
  hoverSrc: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
}

interface BestSellersContextType {
  sectionTitle: string;
  sectionDescription: string;
  products: Product[];
  updateSectionTitle: (title: string) => void;
  updateSectionDescription: (description: string) => void;
  updateProducts: (products: Product[]) => void;
}

const defaultProducts: Product[] = [
  { 
    id: '1',
    src: '/reduce1.jpg', 
    hoverSrc: '/reduce1-hover.jpg', 
    title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Dark Green', 
    price: '£34.99', 
    oldPrice: '£99.99', 
    discount: '-65%' 
  },
  { 
    id: '2',
    src: '/reduce2.jpg', 
    hoverSrc: '/reduce2-hover.jpg', 
    title: '2 in 1 Reclining Gravity Chair and Lay Flat Sun lounger- Grey', 
    price: '£34.90', 
    oldPrice: '£99.99', 
    discount: '-65%' 
  },
  { 
    id: '3',
    src: '/reduce3.jpg', 
    hoverSrc: '/reduce3-hover.jpg', 
    title: 'Zero Gravity Chair with Cushion & Pillow – Black', 
    price: '£60.99', 
    oldPrice: '£119.99', 
    discount: '-49%' 
  },
  { 
    id: '4',
    src: '/reduce4.jpg', 
    hoverSrc: '/reduce4-hover.jpg', 
    title: 'Zero Gravity Chair with Cushion & Pillow – Grey', 
    price: '£60.99', 
    oldPrice: '£119.99', 
    discount: '-49%' 
  },
];

const BestSellersContext = createContext<BestSellersContextType>({
  sectionTitle: 'BEST SELLERS',
  sectionDescription: 'Discover our most popular products that customers love.',
  products: defaultProducts,
  updateSectionTitle: () => {},
  updateSectionDescription: () => {},
  updateProducts: () => {},
});

export const BestSellersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sectionTitle, setSectionTitle] = useState('BEST SELLERS');
  const [sectionDescription, setSectionDescription] = useState('Discover our most popular products that customers love.');
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const savedData = localStorage.getItem('bestSellersData');
    if (savedData) {
      const { title, description, products } = JSON.parse(savedData);
      setSectionTitle(title);
      setSectionDescription(description);
      setProducts(products);
    }
  }, []);

  const updateSectionTitle = (title: string) => {
    setSectionTitle(title);
    const savedData = localStorage.getItem('bestSellersData');
    const data = savedData ? JSON.parse(savedData) : { products: defaultProducts };
    localStorage.setItem('bestSellersData', JSON.stringify({ ...data, title }));
  };

  const updateSectionDescription = (description: string) => {
    setSectionDescription(description);
    const savedData = localStorage.getItem('bestSellersData');
    const data = savedData ? JSON.parse(savedData) : { products: defaultProducts };
    localStorage.setItem('bestSellersData', JSON.stringify({ ...data, description }));
  };

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    const savedData = localStorage.getItem('bestSellersData');
    const data = savedData ? JSON.parse(savedData) : {};
    localStorage.setItem('bestSellersData', JSON.stringify({ ...data, products: newProducts }));
  };

  return (
    <BestSellersContext.Provider value={{
      sectionTitle,
      sectionDescription,
      products,
      updateSectionTitle,
      updateSectionDescription,
      updateProducts,
    }}>
      {children}
    </BestSellersContext.Provider>
  );
};

export const useBestSellers = () => useContext(BestSellersContext); 