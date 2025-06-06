'use client';
import { useEffect, useState } from 'react';
import { Analytics } from "@vercel/analytics/next";

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

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
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
        revenue: data.revenue || 0
      });
      setRecentOrders(data.recentOrders || []);

      // Fetch analytics data
      const analyticsRes = await fetch('/api/analytics');
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Analytics />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button 
            onClick={fetchStats}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-600">Total Products</h3>
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{isLoading ? '...' : stats.products}</p>
            <p className="text-sm text-gray-500 mt-2">Active products in store</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-600">Total Orders</h3>
              <span className="text-3xl">🛒</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{isLoading ? '...' : stats.orders}</p>
            <p className="text-sm text-gray-500 mt-2">Orders processed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{isLoading ? '...' : stats.users}</p>
            <p className="text-sm text-gray-500 mt-2">Registered customers</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-600">Total Revenue</h3>
              <span className="text-3xl">💸</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">£{isLoading ? '...' : stats.revenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Total sales amount</p>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-600">Visitors</h3>
              <span className="text-3xl">👁️</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{isLoading ? '...' : analytics.visitors.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Unique visitors today</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-600">Page Views</h3>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{isLoading ? '...' : analytics.pageViews.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Total page views today</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-600">Bounce Rate</h3>
              <span className="text-3xl">↩️</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{isLoading ? '...' : formatPercentage(analytics.bounceRate)}</p>
            <p className="text-sm text-gray-500 mt-2">Visitors who left immediately</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <span className="text-sm text-gray-500">{recentOrders.length} orders</span>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📦</div>
                <p className="text-gray-500">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div 
                    key={order._id} 
                    className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customerDetails.firstName} {order.customerDetails.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{order.customerDetails.email}</p>
                      </div>
                      <span className="text-lg font-semibold text-indigo-600">£{order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Popular Products</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700">View All</button>
            </div>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-500">No product data available yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 