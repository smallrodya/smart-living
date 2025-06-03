import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    console.log('Received items for stock update:', items);
    
    const client = await clientPromise;
    const db = client.db();

    // Обновляем количество для каждого товара
    for (const item of items) {
      console.log('Processing item:', item);
      
      // Ищем товар по SKU во всех возможных массивах
      const product = await db.collection('products').findOne({
        $or: [
          { 'beddingSizes': { $elemMatch: { sku: item.sku } } },
          { 'rugsMatsSizes': { $elemMatch: { sku: item.sku } } },
          { 'throwsTowelsStylePrices': { $elemMatch: { sku: item.sku } } },
          { 'clothingStylePrices': { $elemMatch: { sku: item.sku } } },
          { 'footwearSizes': { $elemMatch: { sku: item.sku } } },
          { 'outdoorPrice.sku': item.sku }
        ]
      });

      if (!product) {
        console.log('Product not found for SKU:', item.sku);
        continue;
      }

      console.log('Found product:', product._id);

      // Определяем, в каком массиве находится товар
      let updatePath = '';
      let arrayFilters = undefined;
      let currentStock = 0;
      let sizeArray = null;

      if (product.beddingSizes?.some((size: any) => size.sku === item.sku)) {
        updatePath = 'beddingSizes.$[elem].stock';
        arrayFilters = [{ 'elem.sku': item.sku }];
        sizeArray = product.beddingSizes;
      } else if (product.rugsMatsSizes?.some((size: any) => size.sku === item.sku)) {
        updatePath = 'rugsMatsSizes.$[elem].stock';
        arrayFilters = [{ 'elem.sku': item.sku }];
        sizeArray = product.rugsMatsSizes;
      } else if (product.throwsTowelsStylePrices?.some((size: any) => size.sku === item.sku)) {
        updatePath = 'throwsTowelsStylePrices.$[elem].stock';
        arrayFilters = [{ 'elem.sku': item.sku }];
        sizeArray = product.throwsTowelsStylePrices;
      } else if (product.clothingStylePrices?.some((size: any) => size.sku === item.sku)) {
        updatePath = 'clothingStylePrices.$[elem].stock';
        arrayFilters = [{ 'elem.sku': item.sku }];
        sizeArray = product.clothingStylePrices;
      } else if (product.footwearSizes?.some((size: any) => size.sku === item.sku)) {
        updatePath = 'footwearSizes.$[elem].stock';
        arrayFilters = [{ 'elem.sku': item.sku }];
        sizeArray = product.footwearSizes;
      } else if (product.outdoorPrice?.sku === item.sku) {
        updatePath = 'outdoorPrice.stock';
        currentStock = product.outdoorPrice.stock || 0;
      }

      if (sizeArray) {
        const sizeItem = sizeArray.find((size: any) => size.sku === item.sku);
        if (sizeItem) {
          currentStock = sizeItem.stock || 0;
        }
      }

      console.log('Current stock:', currentStock);
      console.log('Update path:', updatePath);
      console.log('Array filters:', arrayFilters);

      if (updatePath) {
        const newStock = currentStock - item.quantity;
        console.log('New stock will be:', newStock);
        
        // Обновляем количество товара и устанавливаем флаг isSoldOut
        const updateResult = await db.collection('products').updateOne(
          { _id: product._id },
          {
            $inc: { [updatePath]: -item.quantity },
            $set: {
              isSoldOut: newStock <= 0
            }
          },
          {
            arrayFilters: arrayFilters
          }
        );

        console.log('Update result:', updateResult);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating stock:', error);
    return NextResponse.json(
      { error: 'Failed to update stock' },
      { status: 500 }
    );
  }
} 