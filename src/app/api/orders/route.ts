import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const orderData = await request.json();

    // Добавляем временные метки
    const order = {
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await db.collection('orders').insertOne(order);
    
    return NextResponse.json({
      success: true,
      orderId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 