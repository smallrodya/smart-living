import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    console.log('Connecting to database...');
    const { db } = await connectToDatabase();
    console.log('Connected to database successfully');

    // Для каждого товара в заказе
    for (const item of items) {
      console.log('Searching for product with title:', item.title);
      
      // Находим товар по названию
      const product = await db.collection('products').findOne({
        title: { $regex: new RegExp(item.title, 'i') }
      });

      if (!product) {
        // Проверим все товары в базе для отладки
        const allProducts = await db.collection('products').find({}).toArray();
        console.log('Available products:', allProducts.map(p => p.title));
        
        console.error(`Product not found: ${item.title}`);
        return NextResponse.json(
          { error: `Product not found: ${item.title}` },
          { status: 404 }
        );
      }

      // Обновляем количество в зависимости от категории товара
      let updateQuery: any = {};

      switch (product.category) {
        case 'BEDDING':
          updateQuery = {
            $inc: {
              'beddingSizes.$[elem].stock': -item.quantity
            }
          };
          break;
        case 'RUGS & MATS':
          updateQuery = {
            $inc: {
              'rugsMatsSizes.$[elem].stock': -item.quantity
            }
          };
          break;
        case 'THROWS & TOWELS':
          updateQuery = {
            $inc: {
              'throwsTowelsStylePrices.$[elem].stock': -item.quantity
            }
          };
          break;
        case 'OUTDOOR':
          updateQuery = {
            $inc: {
              'outdoorPrice.stock': -item.quantity
            }
          };
          break;
        case 'CURTAINS':
          updateQuery = {
            $inc: {
              'curtainsSizes.$[elem].stock': -item.quantity
            }
          };
          break;
        case 'CLOTHING':
          updateQuery = {
            $inc: {
              'clothingStylePrices.$[elem].stock': -item.quantity
            }
          };
          break;
        case 'FOOTWEAR':
          updateQuery = {
            $inc: {
              'footwearSizes.$[elem].stock': -item.quantity
            }
          };
          break;
      }

      // Если это не OUTDOOR категория, добавляем условие для обновления конкретного размера/стиля
      if (product.category !== 'OUTDOOR') {
        const arrayFilters = [{
          'elem.size': item.size
        }];
        
        await db.collection('products').updateOne(
          { title: item.title },
          updateQuery,
          { arrayFilters }
        );
      } else {
        await db.collection('products').updateOne(
          { title: item.title },
          updateQuery
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating stock:', error);
    return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 });
  }
} 