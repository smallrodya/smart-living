import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Получаем базовую статистику
    const products = await db.collection('products').countDocuments();
    const orders = await db.collection('orders').countDocuments();
    const users = await db.collection('users').countDocuments();
    
    // Получаем общую выручку
    const revenueResult = await db.collection('orders').aggregate([
      { $match: { status: 'DONE' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]).toArray();
    const revenue = revenueResult[0]?.total || 0;

    // Получаем последние заказы
    const recentOrders = await db.collection('orders')
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Получаем статистику посещений
    const pageViews = await db.collection('pageViews').findOne({ page: '/' });
    
    // Получаем ежедневную статистику за последние 7 дней
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const dailyViews = await db.collection('pageViews')
      .aggregate([
        { $match: { page: '/' } },
        { $unwind: '$dailyViews' },
        { $match: { 'dailyViews.date': { $gte: sevenDaysAgo.toISOString().split('T')[0] } } },
        { $group: {
          _id: '$dailyViews.date',
          count: { $sum: '$dailyViews.count' }
        }},
        { $sort: { _id: 1 } }
      ])
      .toArray();

    // Заполняем пропущенные дни нулями
    const filledDailyViews = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      const dayData = dailyViews.find(d => d._id === dateStr);
      filledDailyViews.push({
        date: dateStr,
        count: dayData ? dayData.count : 0
      });
    }

    // Получаем статистику по времени суток
    const hourlyStats = await db.collection('pageViews')
      .aggregate([
        { $match: { page: '/' } },
        { $unwind: '$hourlyViews' },
        { $group: {
          _id: '$hourlyViews.hour',
          count: { $sum: '$hourlyViews.count' }
        }},
        { $sort: { _id: 1 } }
      ])
      .toArray();

    // Заполняем пропущенные часы нулями
    const filledHourlyStats = Array.from({ length: 24 }, (_, i) => {
      const hourData = hourlyStats.find(h => h._id === i);
      return {
        hour: i,
        count: hourData ? hourData.count : 0
      };
    });

    // Получаем статистику по устройствам
    const deviceStats = await db.collection('pageViews')
      .aggregate([
        { $match: { page: '/' } },
        { $unwind: '$deviceStats' },
        { $group: {
          _id: '$deviceStats.type',
          count: { $sum: '$deviceStats.count' }
        }},
        { $sort: { count: -1 } }
      ])
      .toArray();

    // Получаем статистику по браузерам
    const browserStats = await db.collection('pageViews')
      .aggregate([
        { $match: { page: '/' } },
        { $unwind: '$browserStats' },
        { $group: {
          _id: '$browserStats.name',
          count: { $sum: '$browserStats.count' }
        }},
        { $sort: { count: -1 } }
      ])
      .toArray();

    // Получаем статистику по странам (если есть)
    const countryStats = await db.collection('pageViews')
      .aggregate([
        { $match: { page: '/' } },
        { $unwind: '$countryStats' },
        { $group: {
          _id: '$countryStats.country',
          count: { $sum: '$countryStats.count' }
        }},
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
      .toArray();

    return NextResponse.json({
      products,
      orders,
      users,
      revenue,
      recentOrders,
      pageViews: {
        total: pageViews?.total || 0,
        dailyViews: filledDailyViews,
        hourlyStats: filledHourlyStats,
        deviceStats: deviceStats.map(stat => ({
          type: stat._id,
          count: stat.count
        })),
        browserStats: browserStats.map(stat => ({
          name: stat._id,
          count: stat.count
        })),
        countryStats: countryStats.map(stat => ({
          country: stat._id,
          count: stat.count
        }))
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { page, userAgent } = await request.json();
    const { db } = await connectToDatabase();
    
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    
    // Определяем тип устройства
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    // Определяем браузер
    const browser = /Chrome/i.test(userAgent) ? 'Chrome' :
                   /Firefox/i.test(userAgent) ? 'Firefox' :
                   /Safari/i.test(userAgent) ? 'Safari' :
                   /Edge/i.test(userAgent) ? 'Edge' : 'Other';
    
    // Обновляем статистику
    await db.collection('pageViews').updateOne(
      { page },
      {
        $inc: { total: 1 },
        $push: {
          dailyViews: {
            date: today,
            count: 1
          },
          hourlyViews: {
            hour,
            count: 1
          }
        },
        $inc: {
          [`deviceStats.${deviceType}`]: 1,
          [`browserStats.${browser}`]: 1
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating page views:', error);
    return NextResponse.json({ error: 'Failed to update page views' }, { status: 500 });
  }
} 