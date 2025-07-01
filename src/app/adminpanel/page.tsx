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

interface Stats {
  products: number;
  orders: number;
  users: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
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
      const res = await fetch('/api/stats', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        next: { revalidate: 0 }
      });
      
      if (!res.ok) throw new Error('Failed to fetch stats');
      
      const data = await res.json();
      console.log('Fetched stats:', data);
      
      setStats({
        products: data.products || 0,
        orders: data.orders || 0,
        users: data.users || 0,
        revenue: data.revenue || 0,
      });
      setRecentOrders(data.recentOrders || []);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'from-emerald-400 to-emerald-600';
      case 'PROCESSING':
        return 'from-blue-400 to-blue-600';
      case 'SHIPPED':
        return 'from-purple-400 to-purple-600';
      case 'DELIVERED':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-red-400 to-red-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'PROCESSING':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'SHIPPED':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'DELIVERED':
        return 'bg-gray-50 border-gray-200 text-gray-700';
      default:
        return 'bg-red-50 border-red-200 text-red-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <button 
          onClick={fetchStats}
          className="group px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 font-semibold"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl shadow-lg">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-gray-300 h-10 w-20 rounded"></div>
              ) : (
                stats.products.toLocaleString()
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium">Active products in store</p>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
              <div className="p-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl shadow-lg">
                <span className="text-2xl">🛒</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-gray-300 h-10 w-20 rounded"></div>
              ) : (
                stats.orders.toLocaleString()
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium">Orders processed</p>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
              <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl shadow-lg">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-gray-300 h-10 w-20 rounded"></div>
              ) : (
                stats.users.toLocaleString()
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium">Registered customers</p>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 border border-orange-200/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
              <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl shadow-lg">
                <span className="text-2xl">💸</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-gray-300 h-10 w-20 rounded"></div>
              ) : (
                `£${Number(stats.revenue).toFixed(2)}`
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium">Total sales amount</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Recent Orders
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
            Live updates
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here once customers start shopping</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div 
                key={order._id} 
                className="group relative overflow-hidden bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {order.customerDetails.firstName.charAt(0)}{order.customerDetails.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {order.customerDetails.firstName} {order.customerDetails.lastName}
                      </p>
                      <p className="text-gray-500 font-medium">{order.customerDetails.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      £{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">{formatDate(order.createdAt)}</span>
                  <div className={`px-4 py-2 rounded-xl border font-semibold text-sm ${getStatusBg(order.status)}`}>
                    {order.status}
                  </div>
                </div>
                
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 