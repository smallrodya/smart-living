import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { ObjectId, MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

// Глобальная переменная для хранения всех активных SSE соединений
let clients: Set<ReadableStreamDefaultController> = new Set();

// Функция для отправки уведомлений всем клиентам
function notifyClients(type: string) {
  const message = `data: ${JSON.stringify({ type })}\n\n`;
  clients.forEach(client => {
    client.enqueue(new TextEncoder().encode(message));
  });
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const products = db.collection('products');
    
    const allProducts = await products.find({}).toArray();
    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    const products = db.collection('products');
    
    const productData = {
      ...body,
      isSoldOut: body.isSoldOut || false,
      isHot: body.isHot || false,
      discount: body.discount || null,
      additionalCategories: body.additionalCategories || [],
      isSummerCollection: body.isSummerCollection || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await products.insertOne(productData);
    
    // Уведомляем всех клиентов об обновлении
    notifyClients('products-updated');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    const body = await request.json();
    const { db } = await connectToDatabase();
    const products = db.collection('products');
    
    // Удаляем _id из данных обновления
    const { _id, ...updateData } = body;
    
    const finalUpdateData = {
      ...updateData,
      additionalCategories: updateData.additionalCategories || [],
      isSummerCollection: updateData.isSummerCollection || false,
      updatedAt: new Date()
    };
    
    const updateResult = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: finalUpdateData }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'No changes were made' }, { status: 400 });
    }
    
    // Получаем обновленный товар
    const updatedProduct = await products.findOne({ _id: new ObjectId(id) });
    
    // Уведомляем всех клиентов об обновлении
    notifyClients('products-updated');
    
    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const products = db.collection('products');
    
    await products.deleteOne({ _id: new ObjectId(id) });
    
    // Уведомляем всех клиентов об обновлении
    notifyClients('products-updated');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
} 