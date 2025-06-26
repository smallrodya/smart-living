import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query.trim()) {
      return NextResponse.json({ products: [] });
    }

    const { db } = await connectToDatabase();
    const products = db.collection('products');

    const queryLower = query.trim().toLowerCase();

    // 1. Точное совпадение по названию, категории или подкатегории
    let exactMatchFilter = {
      $or: [
        { title: { $regex: `^${queryLower}$`, $options: 'i' } },
        { category: { $regex: `^${queryLower}$`, $options: 'i' } },
        { subcategory: { $regex: `^${queryLower}$`, $options: 'i' } }
      ]
    };

    let searchResults = await products.find(exactMatchFilter).toArray();

    // 2. Если ничего не найдено, ищем по подстроке (начинается с... или содержит)
    if (searchResults.length === 0) {
      let broadMatchFilter = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { subcategory: { $regex: query, $options: 'i' } }
        ]
      };
      searchResults = await products.find(broadMatchFilter).toArray();
    }

    // 3. Сортируем: сначала точные совпадения, потом частичные
    const scoredResults = searchResults.map(product => {
      let score = 0;
      const titleLower = product.title?.toLowerCase() || '';
      const categoryLower = product.category?.toLowerCase() || '';
      const subcategoryLower = product.subcategory?.toLowerCase() || '';

      if (titleLower === queryLower) score += 100;
      if (categoryLower === queryLower) score += 90;
      if (subcategoryLower === queryLower) score += 80;
      if (titleLower.startsWith(queryLower)) score += 50;
      if (categoryLower.startsWith(queryLower)) score += 40;
      if (subcategoryLower.startsWith(queryLower)) score += 30;
      if (titleLower.includes(queryLower)) score += 20;
      if (categoryLower.includes(queryLower)) score += 10;
      if (subcategoryLower.includes(queryLower)) score += 5;
      return { ...product, relevanceScore: score };
    });
    scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    const finalResults = scoredResults.map(({ relevanceScore, ...product }) => product);

    return NextResponse.json({ 
      products: finalResults,
      total: finalResults.length,
      query: query
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}

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
    'synthetic': ['artificial', 'man-made', 'durable'],
    'large': ['big', 'oversized', 'spacious'],
    'small': ['tiny', 'compact', 'mini'],
    'medium': ['average', 'standard', 'regular'],
    'king': ['large', 'big', 'oversized'],
    'queen': ['medium', 'standard', 'regular'],
    'single': ['small', 'twin', 'narrow'],
    'double': ['full', 'standard', 'regular'],
    'super': ['extra', 'large', 'big'],
    'hot': ['popular', 'trending', 'best'],
    'clearance': ['sale', 'discount', 'reduced'],
    'new': ['fresh', 'latest', 'recent'],
    'vintage': ['retro', 'classic', 'old'],
    'modern': ['contemporary', 'current', 'trendy'],
    'traditional': ['classic', 'conventional', 'standard'],
    'printed': ['patterned', 'designed', 'decorated'],
    'plain': ['solid', 'simple', 'basic'],
    'colorful': ['bright', 'vibrant', 'colorful'],
    'neutral': ['natural', 'subtle', 'soft'],
    'dark': ['black', 'navy', 'brown'],
    'light': ['white', 'cream', 'beige'],
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