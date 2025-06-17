import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber')?.trim();
    const email = searchParams.get('email')?.trim();

    if (!orderNumber || !email) {
      return NextResponse.json(
        { message: 'Order number and email are required' },
        { status: 400 }
      );
    }

    // Проверяем формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Убираем # из номера заказа, если он есть
    const cleanOrderNumber = orderNumber.startsWith('#') ? orderNumber.slice(1) : orderNumber;

    const { db } = await connectToDatabase();
    
    // Сначала попробуем найти заказ по email
    const orders = await db.collection('orders')
      .find({ 'customerDetails.email': email.toLowerCase() })
      .toArray();

    console.log('Found orders:', orders);

    // Ищем заказ с подходящим номером
    const order = orders.find(order => {
      // Проверяем разные возможные форматы номера заказа
      const orderId = order._id.toString();
      const orderNumber = order.orderNumber || '';
      const shortId = orderId.slice(-6);
      
      return orderId === cleanOrderNumber || 
             orderNumber === cleanOrderNumber || 
             shortId === cleanOrderNumber;
    });

    if (!order) {
      return NextResponse.json(
        { message: 'Order not found. Please check your order number and email.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { message: 'Failed to track order. Please try again.' },
      { status: 500 }
    );
  }
} 