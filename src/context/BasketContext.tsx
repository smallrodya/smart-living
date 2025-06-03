'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface BasketItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  sku?: string;
  stock?: number;
  clearanceDiscount?: number;
}

interface BasketContextType {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearBasket: () => void;
  total: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    try {
      const savedBasket = localStorage.getItem('basket');
      if (savedBasket) {
        setItems(JSON.parse(savedBasket));
      }
    } catch (error) {
      console.error('Error loading basket from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('basket', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving basket to localStorage:', error);
      }
    }
  }, [items, isInitialized]);

  const addItem = (item: BasketItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id && i.size === item.size);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id && i.size === item.size 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string, size: string) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id && item.size === size 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    const price = item.clearanceDiscount 
      ? item.price * (1 - item.clearanceDiscount / 100) 
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearBasket, total }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
} 