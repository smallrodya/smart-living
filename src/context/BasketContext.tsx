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
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
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

  const addItem = (newItem: BasketItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    const itemPrice = item.clearanceDiscount 
      ? item.price * (1 - item.clearanceDiscount / 100)
      : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <BasketContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearBasket,
      total
    }}>
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