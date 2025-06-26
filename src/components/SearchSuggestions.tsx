'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom';

interface SearchSuggestionsProps {
  query: string;
  onSelectSuggestion: (suggestion: string) => void;
  isVisible: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ 
  query, 
  onSelectSuggestion, 
  isVisible,
  inputRef
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const router = useRouter();

  // Популярные поисковые запросы
  const popularSearches = [
    'bedding',
    'duvet',
    'pillow',
    'towel',
    'rug',
    'curtain',
    'cushion',
    'throw',
    'blanket',
    'sheet',
    'fleece',
    'cotton',
    'silk',
    'wool',
    'king size',
    'queen size',
    'single bed',
    'double bed',
    'super king',
    'bathroom',
    'kitchen',
    'bedroom',
    'living room',
    'outdoor',
    'garden',
    'patio',
    'footwear',
    'slippers',
    'boots',
    'clothing',
    'hoodie',
    'jeans',
    'joggers',
    'clearance',
    'sale',
    'hot deals',
    'new arrivals'
  ];

  // Категории товаров
  const categories = [
    'BEDDING',
    'THROWS & TOWELS',
    'RUGS & MATS',
    'CURTAINS',
    'FOOTWEAR',
    'CLOTHING',
    'OUTDOOR',
    'FLEECE BEDDING',
    'WEIGHTED BLANKETS',
    'ELECTRIC UNDERBLANKETS',
    'BEDSPREADS',
    'CUSHIONS',
    'PILLOWCASES',
    'FITTED SHEETS',
    'TEA TOWELS',
    'DOOR MATS',
    'KITCHEN MATS',
    'HALLWAY RUNNERS',
    'TABLE RUNNERS',
    'TABLE PLACEMATS'
  ];

  useEffect(() => {
    if (isVisible && inputRef?.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 2001,
        background: '#fff',
        border: '1px solid #eee',
        borderTop: 'none',
        borderRadius: '0 0 20px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxHeight: '300px',
        overflow: 'auto',
      });
    }
  }, [isVisible, inputRef?.current]);

  useEffect(() => {
    if (!isVisible || !query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    
    // Имитация задержки для лучшего UX
    const timeoutId = setTimeout(() => {
      const queryLower = query.toLowerCase();
      
      // Фильтруем популярные запросы
      const popularMatches = popularSearches.filter(
        search => search.toLowerCase().includes(queryLower)
      );

      // Фильтруем категории
      const categoryMatches = categories.filter(
        category => category.toLowerCase().includes(queryLower)
      );

      // Создаем похожие слова
      const similarWords = getSimilarWords(queryLower);
      
      // Объединяем и ограничиваем результаты
      const allSuggestions = [
        ...popularMatches.slice(0, 5),
        ...categoryMatches.slice(0, 3),
        ...similarWords.slice(0, 3)
      ];

      // Убираем дубликаты и ограничиваем общее количество
      const uniqueSuggestions = [...new Set(allSuggestions)].slice(0, 8);
      
      setSuggestions(uniqueSuggestions);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query, isVisible]);

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  if (!isVisible || (!loading && suggestions.length === 0)) {
    return null;
  }

  const dropdownContent = (
    <div style={inputRef?.current ? dropdownStyle : {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: '#fff',
      border: '1px solid #eee',
      borderTop: 'none',
      borderRadius: '0 0 20px 20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 2001,
      maxHeight: '300px',
      overflow: 'auto'
    }}>
      {loading ? (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#666'
        }}>
          <div style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '2px solid #eee',
            borderTop: '2px solid #222',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ marginLeft: '10px' }}>Searching...</span>
        </div>
      ) : (
        <div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                width: '100%',
                padding: '12px 20px',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#333',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f8f8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#999' }}
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              {suggestion}
            </button>
          ))}
          
          {suggestions.length > 0 && (
            <div style={{
              padding: '10px 20px',
              borderTop: '1px solid #eee',
              fontSize: '12px',
              color: '#999',
              textAlign: 'center'
            }}>
              Press Enter to search for "{query}"
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (typeof window !== 'undefined' && inputRef?.current && document.body) {
    return ReactDOM.createPortal(dropdownContent, document.body);
  }
  return dropdownContent;
};

// Функция для получения похожих слов
function getSimilarWords(query: string): string[] {
  const similarWords: { [key: string]: string[] } = {
    'bed': ['bedding', 'bedroom', 'duvet', 'sheet', 'pillow'],
    'bedding': ['bed', 'duvet', 'sheet', 'pillow', 'blanket'],
    'duvet': ['bedding', 'bed', 'comforter', 'quilt'],
    'sheet': ['bedding', 'bed', 'duvet', 'pillowcase'],
    'pillow': ['bedding', 'bed', 'cushion', 'pillowcase'],
    'cushion': ['pillow', 'cushions', 'throw'],
    'throw': ['blanket', 'cushion', 'pillow'],
    'blanket': ['throw', 'duvet', 'bedding'],
    'towel': ['towels', 'bath', 'kitchen'],
    'rug': ['carpet', 'mat', 'floor'],
    'mat': ['rug', 'carpet', 'floor'],
    'curtain': ['drapes', 'window', 'blind'],
    'shoe': ['footwear', 'boot', 'slipper'],
    'boot': ['footwear', 'shoe', 'slipper'],
    'slipper': ['footwear', 'shoe', 'boot'],
    'clothing': ['clothes', 'apparel', 'garment'],
    'outdoor': ['garden', 'patio', 'terrace'],
    'kitchen': ['cooking', 'food', 'dining'],
    'bathroom': ['bath', 'shower', 'toilet'],
    'bedroom': ['bed', 'sleep', 'rest'],
    'living': ['lounge', 'sitting', 'family'],
    'dining': ['kitchen', 'table', 'eating'],
    'fleece': ['warm', 'soft', 'comfortable'],
    'cotton': ['natural', 'soft', 'breathable'],
    'silk': ['luxury', 'smooth', 'elegant'],
    'wool': ['warm', 'natural', 'cozy'],
    'king': ['large', 'big', 'oversized'],
    'queen': ['medium', 'standard', 'regular'],
    'single': ['small', 'twin', 'narrow'],
    'double': ['full', 'standard', 'regular'],
    'super': ['extra', 'large', 'big'],
    'hot': ['popular', 'trending', 'best'],
    'clearance': ['sale', 'discount', 'reduced'],
    'new': ['fresh', 'latest', 'recent'],
    'printed': ['patterned', 'designed', 'decorated'],
    'plain': ['solid', 'simple', 'basic'],
    'red': ['crimson', 'scarlet', 'ruby'],
    'blue': ['navy', 'azure', 'cobalt'],
    'green': ['emerald', 'forest', 'sage'],
    'yellow': ['gold', 'amber', 'lemon'],
    'purple': ['violet', 'lavender', 'plum'],
    'pink': ['rose', 'blush', 'magenta'],
    'orange': ['amber', 'peach', 'coral'],
    'brown': ['tan', 'beige', 'chocolate'],
    'gray': ['grey', 'silver', 'charcoal'],
    'black': ['dark', 'ebony', 'onyx'],
    'white': ['light', 'ivory', 'cream']
  };

  const queryLower = query.toLowerCase();
  const similar = similarWords[queryLower] || [];
  
  // Также ищем похожие слова для каждого слова в запросе
  const queryWords = queryLower.split(' ');
  queryWords.forEach(word => {
    if (similarWords[word]) {
      similarWords[word].forEach(similarWord => {
        if (!similar.includes(similarWord)) {
          similar.push(similarWord);
        }
      });
    }
  });

  return [...new Set(similar)]; // Убираем дубликаты
}

export default SearchSuggestions; 