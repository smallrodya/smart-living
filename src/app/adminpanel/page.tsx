'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setStats(prev => ({
        ...prev,
        products: data.products?.length || 0
      }));
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Подписываемся на обновления через EventSource
  useEffect(() => {
    const eventSource = new EventSource('/api/stats-updates');
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'products-updated') {
        fetchStats();
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Total Products</span>
          <span className="text-4xl font-bold mb-2">{stats.products}</span>
          <span className="text-3xl">📦</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Orders</span>
          <span className="text-4xl font-bold mb-2">{stats.orders}</span>
          <span className="text-3xl">🛒</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Users</span>
          <span className="text-4xl font-bold mb-2">{stats.users}</span>
          <span className="text-3xl">👥</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold mb-2">Revenue</span>
          <span className="text-4xl font-bold mb-2">£{stats.revenue}</span>
          <span className="text-3xl">💸</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="text-gray-500">No orders yet.</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Popular Products</h2>
          <div className="text-gray-500">No products yet.</div>
        </div>
      </div>
    </div>
  );
} 