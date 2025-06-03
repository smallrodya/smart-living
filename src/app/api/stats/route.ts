import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Получаем количество заказов
    const ordersCount = await db.collection('orders').countDocuments();

    // Получаем общую сумму всех заказов
    const orders = await db.collection('orders').find({}).toArray();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Получаем последние 5 заказов
    const recentOrders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Получаем количество пользователей
    const usersCount = await db.collection('users').countDocuments();

    // Получаем количество продуктов
    const productsCount = await db.collection('products').countDocuments();

    return NextResponse.json({
      orders: ordersCount,
      revenue: totalRevenue.toFixed(2),
      users: usersCount,
      products: productsCount,
      recentOrders
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 