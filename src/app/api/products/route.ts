import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { Product } from '@/models/Product';
import { ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri!);

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
    await client.connect();
    const database = client.db('smartliving');
    const products = database.collection('products');
    
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
    await client.connect();
    const database = client.db('smartliving');
    const products = database.collection('products');
    
    const productData = {
      ...body,
      isSoldOut: body.isSoldOut || false,
      isHot: body.isHot || false,
      discount: body.discount || null,
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
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    await client.connect();
    const database = client.db('smartliving');
    const products = database.collection('products');
    
    await products.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    // Уведомляем всех клиентов об обновлении
    notifyClients('products-updated');
    
    return NextResponse.json({ success: true });
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
    
    await client.connect();
    const database = client.db('smartliving');
    const products = database.collection('products');
    
    await products.deleteOne({ _id: new ObjectId(id) });
    
    // Уведомляем всех клиентов об обновлении
    notifyClients('products-updated');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
} 