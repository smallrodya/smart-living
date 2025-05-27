'use client';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Здесь будет загрузка реальных данных
    setStats({
      totalProducts: 150,
      totalOrders: 45,
      totalUsers: 1200,
      totalRevenue: 25000,
    });
  }, []);

  const statCards = [
    {
      title: 'Всего товаров',
      value: stats.totalProducts,
      icon: '📦',
      color: 'bg-blue-500',
    },
    {
      title: 'Заказов',
      value: stats.totalOrders,
      icon: '🛒',
      color: 'bg-green-500',
    },
    {
      title: 'Пользователей',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-purple-500',
    },
    {
      title: 'Доход',
      value: `£${stats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.color} p-3 rounded-lg text-white text-2xl`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Последние заказы */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Последние заказы
          </h2>
          <div className="space-y-4">
            {/* Здесь будет список последних заказов */}
            <p className="text-gray-500">Загрузка данных...</p>
          </div>
        </div>

        {/* Популярные товары */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Популярные товары
          </h2>
          <div className="space-y-4">
            {/* Здесь будет список популярных товаров */}
            <p className="text-gray-500">Загрузка данных...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 