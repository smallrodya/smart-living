import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Устанавливаем максимальную длительность в 30 секунд

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Получаем только необходимые поля и ограничиваем количество записей
    const recentOrders = await db.collection('orders')
      .find({}, {
        projection: {
          _id: 1,
          total: 1,
          status: 1,
          createdAt: 1,
          customerDetails: {
            firstName: 1,
            lastName: 1
          }
        }
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    // Получаем только количество документов вместо полных данных
    const [ordersCount, usersCount, productsCount] = await Promise.all([
      db.collection('orders').countDocuments(),
      db.collection('users').countDocuments(),
      db.collection('products').countDocuments()
    ]);

    // Получаем общую сумму заказов за последние 30 дней
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentOrdersTotal = await db.collection('orders')
      .aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo.toISOString() }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' }
          }
        }
      ])
      .toArray();

    const totalRevenue = recentOrdersTotal[0]?.total || 0;

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