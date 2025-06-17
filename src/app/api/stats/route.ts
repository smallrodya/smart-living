import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Получаем общее количество продуктов
    const products = await db.collection('products').countDocuments();

    // Получаем общее количество заказов
    const orders = await db.collection('orders').countDocuments();

    // Получаем общее количество пользователей
    const users = await db.collection('users').countDocuments();

    // Получаем общую выручку
    const revenueResult = await db.collection('orders').aggregate([
      {
        $match: {
          status: { $in: ['DONE', 'DELIVERED'] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]).toArray();

    const revenue = revenueResult[0]?.total || 0;

    // Получаем последние заказы
    const recentOrders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    return NextResponse.json({
      products,
      orders,
      users,
      revenue,
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