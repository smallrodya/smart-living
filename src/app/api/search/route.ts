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

    // Создаем массив поисковых терминов
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    // Базовый фильтр для поиска
    const searchFilter: any = {
      $or: [
        // Поиск по названию товара
        { title: { $regex: query, $options: 'i' } },
        // Поиск по описанию
        { description: { $regex: query, $options: 'i' } },
        // Поиск по категории
        { category: { $regex: query, $options: 'i' } },
        // Поиск по подкатегории
        { subcategory: { $regex: query, $options: 'i' } },
        // Поиск по SKU
        { 'beddingSizes.sku': { $regex: query, $options: 'i' } },
        { 'rugsMatsSizes.sku': { $regex: query, $options: 'i' } },
        { 'throwsTowelsStylePrices.sku': { $regex: query, $options: 'i' } },
        { 'curtainsSizes.sku': { $regex: query, $options: 'i' } },
        { 'footwearSizes.sku': { $regex: query, $options: 'i' } },
        { 'clothingStylePrices.sku': { $regex: query, $options: 'i' } },
        { 'outdoorPrice.sku': { $regex: query, $options: 'i' } },
        // Поиск по цветам
        { beddingColors: { $regex: query, $options: 'i' } },
        { rugsMatsColors: { $regex: query, $options: 'i' } },
        { throwsTowelsColors: { $regex: query, $options: 'i' } },
        { curtainsColors: { $regex: query, $options: 'i' } },
        { footwearColors: { $regex: query, $options: 'i' } },
        { clothingColors: { $regex: query, $options: 'i' } },
        // Поиск по стилям
        { beddingStyles: { $regex: query, $options: 'i' } },
        { rugsMatsStyles: { $regex: query, $options: 'i' } },
        { throwsTowelsStyles: { $regex: query, $options: 'i' } },
        { curtainsStyles: { $regex: query, $options: 'i' } },
        { footwearStyles: { $regex: query, $options: 'i' } },
        { clothingStyles: { $regex: query, $options: 'i' } },
        // Поиск по дополнительным категориям
        { 'additionalCategories.category': { $regex: query, $options: 'i' } },
        { 'additionalCategories.subcategory': { $regex: query, $options: 'i' } }
      ]
    };

    // Если есть несколько поисковых терминов, добавляем поиск по каждому термину отдельно
    if (searchTerms.length > 1) {
      const multiTermFilter = {
        $and: searchTerms.map(term => ({
          $or: [
            { title: { $regex: term, $options: 'i' } },
            { description: { $regex: term, $options: 'i' } },
            { category: { $regex: term, $options: 'i' } },
            { subcategory: { $regex: term, $options: 'i' } },
            { beddingColors: { $regex: term, $options: 'i' } },
            { rugsMatsColors: { $regex: term, $options: 'i' } },
            { throwsTowelsColors: { $regex: term, $options: 'i' } },
            { curtainsColors: { $regex: term, $options: 'i' } },
            { footwearColors: { $regex: term, $options: 'i' } },
            { clothingColors: { $regex: term, $options: 'i' } },
            { beddingStyles: { $regex: term, $options: 'i' } },
            { rugsMatsStyles: { $regex: term, $options: 'i' } },
            { throwsTowelsStyles: { $regex: term, $options: 'i' } },
            { curtainsStyles: { $regex: term, $options: 'i' } },
            { footwearStyles: { $regex: term, $options: 'i' } },
            { clothingStyles: { $regex: term, $options: 'i' } }
          ]
        }))
      };

      // Объединяем фильтры
      searchFilter.$or.push(multiTermFilter);
    }

    // Добавляем поиск по похожим словам
    const similarWords = getSimilarWords(query);
    if (similarWords.length > 0) {
      const similarFilters = similarWords.map(word => ({
        $or: [
          { title: { $regex: word, $options: 'i' } },
          { description: { $regex: word, $options: 'i' } },
          { category: { $regex: word, $options: 'i' } },
          { subcategory: { $regex: word, $options: 'i' } }
        ]
      }));
      
      // Добавляем каждый фильтр отдельно
      similarFilters.forEach(filter => {
        searchFilter.$or.push(filter);
      });
    }

    const searchResults = await products.find(searchFilter).toArray();

    // Сортируем результаты по релевантности
    const scoredResults = searchResults.map(product => {
      let score = 0;
      const queryLower = query.toLowerCase();
      const titleLower = product.title.toLowerCase();
      const descriptionLower = product.description.toLowerCase();
      const categoryLower = product.category.toLowerCase();
      const subcategoryLower = product.subcategory?.toLowerCase() || '';

      // Высший приоритет - точное совпадение в названии
      if (titleLower.includes(queryLower)) {
        score += 100;
        if (titleLower.startsWith(queryLower)) score += 50;
      }

      // Приоритет по категории
      if (categoryLower.includes(queryLower)) score += 30;
      if (subcategoryLower.includes(queryLower)) score += 25;

      // Приоритет по описанию
      if (descriptionLower.includes(queryLower)) score += 10;

      // Бонус за горячие товары и товары со скидкой
      if (product.isHot) score += 5;
      if (product.discount) score += 3;

      return { ...product, relevanceScore: score };
    });

    // Сортируем по релевантности
    scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Удаляем score из результатов
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