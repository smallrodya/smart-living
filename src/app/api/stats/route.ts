import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Получаем статистику
    const [products, orders, users] = await Promise.all([
      db.collection('products').countDocuments(),
      db.collection('orders').countDocuments(),
      db.collection('users').countDocuments(),
    ]);

    // Получаем общую выручку
    const ordersData = await db.collection('orders').find({}).toArray();
    const revenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);

    // Получаем последние заказы
    const recentOrders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    console.log('Stats calculated:', {
      products,
      orders,
      users,
      revenue,
      recentOrdersCount: recentOrders.length
    });

    return NextResponse.json({
      products,
      orders,
      users,
      revenue,
      recentOrders
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 