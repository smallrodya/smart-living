'use client';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

interface RecentOrder {
  _id: string;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      
      const data = await res.json();
      setStats({
        products: data.products || 0,
        orders: data.orders || 0,
        users: data.users || 0,
        revenue: data.revenue || 0
      });
      setRecentOrders(data.recentOrders || []);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Периодическое обновление каждые 30 секунд
  useEffect(() => {
    fetchStats(); // Первоначальная загрузка

    const interval = setInterval(fetchStats, 30000); // Обновление каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Total Products</span>
          <span className="text-4xl font-bold mb-2">{isLoading ? '...' : stats.products}</span>
          <span className="text-3xl">📦</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Orders</span>
          <span className="text-4xl font-bold mb-2">{isLoading ? '...' : stats.orders}</span>
          <span className="text-3xl">🛒</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Users</span>
          <span className="text-4xl font-bold mb-2">{isLoading ? '...' : stats.users}</span>
          <span className="text-3xl">👥</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Revenue</span>
          <span className="text-4xl font-bold mb-2">£{isLoading ? '...' : stats.revenue}</span>
          <span className="text-3xl">💸</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          {isLoading ? (
            <div className="text-gray-500">Loading...</div>
          ) : recentOrders.length === 0 ? (
            <div className="text-gray-500">No orders yet.</div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">
                        {order.customerDetails.firstName} {order.customerDetails.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{order.customerDetails.email}</p>
                    </div>
                    <span className="text-lg font-semibold">£{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{formatDate(order.createdAt)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'DONE' ? 'bg-green-100 text-green-800' :
                      order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'DELIVERED' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Popular Products</h2>
          <div className="text-gray-500">No products yet.</div>
        </div>
      </div>
    </div>
  );
} 