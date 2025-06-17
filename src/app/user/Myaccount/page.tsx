'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import CategoriesSection from '@/components/CategoriesSection';
import { getCookie } from 'cookies-next';
import { FiUser, FiShoppingBag, FiMapPin, FiLogOut, FiEdit2, FiCalendar, FiMail, FiHeart, FiCreditCard, FiSettings, FiBell, FiGift } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  smartCoins: number;
  company?: string;
  country?: string;
  address?: string;
  address2?: string;
  city?: string;
  county?: string;
  postcode?: string;
  phone?: string;
}

interface OrderItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  sku?: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  shipping: string;
  paymentMethod: string;
  customerDetails: {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    country: string;
    address: string;
    address2?: string;
    city: string;
    county?: string;
    postcode: string;
    phone: string;
    orderNotes?: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyAccountPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United Kingdom (UK)',
    address: '',
    address2: '',
    city: '',
    county: '',
    postcode: '',
    phone: '',
  });

  useEffect(() => {
    const checkAuth = () => {
      const userCookie = getCookie('user');
      if (!userCookie) {
        router.push('/user/login');
        return false;
      }
      return true;
    };

    const fetchUserData = async () => {
      if (!checkAuth()) return;

      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);

          // Получаем заказы пользователя
          const ordersResponse = await fetch('/api/orders');
          if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json();
            setOrders(ordersData.orders || []);
          }

          // Получаем избранные товары
          const savedWishlist = localStorage.getItem('wishlist');
          if (savedWishlist) {
            const items = JSON.parse(savedWishlist);
            setWishlistItems(items);
          }
        } else {
          if (response.status === 401 || response.status === 404) {
            // Удаляем куки пользователя
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            router.push('/user/login');
          } else {
            setError('Failed to load user data');
          }
        }
      } catch (err) {
        setError('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    if (userData) {
      setEditForm({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        company: userData.company || '',
        country: userData.country || 'United Kingdom (UK)',
        address: userData.address || '',
        address2: userData.address2 || '',
        city: userData.city || '',
        county: userData.county || '',
        postcode: userData.postcode || '',
        phone: userData.phone || '',
      });
    }
  }, [userData]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending update data:', editForm);
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Update failed:', data);
        throw new Error(data.message || 'Failed to update profile');
      }

      setUserData(prev => prev ? { ...prev, ...data } : null);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/user/login');
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <CategoriesSection />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <CategoriesSection />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm">
              {error}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <CategoriesSection />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with gradient and pattern */}
            <div className="relative bg-gradient-to-r from-black to-gray-900 px-8 py-12 text-white overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
              <div className="relative">
                <h1 className="text-4xl font-bold">My Account</h1>
                <p className="mt-2 text-blue-100 text-lg">Welcome back, {userData?.firstName}!</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8" aria-label="Tabs">
                {['overview', 'orders', 'wishlist'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <>
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600">Total Orders</p>
                          <p className="text-2xl font-bold text-blue-900 mt-1">{orders.length}</p>
                        </div>
                        <FiShoppingBag className="text-blue-500 text-2xl" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600">Wishlist Items</p>
                          <p className="text-2xl font-bold text-purple-900 mt-1">{wishlistItems.length}</p>
                        </div>
                        <FiHeart className="text-purple-500 text-2xl" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-500/20 p-3 rounded-lg">
                            <FiGift className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">Smart Coins</h3>
                            <p className="text-sm text-gray-600">Your rewards balance</p>
                          </div>
                </div>
                </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {userData?.smartCoins?.toFixed(2) || '0.00'}
                </div>
                </div>
              </div>

                  {/* Personal Information */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <FiUser className="mr-2" />
                        Personal Information
                      </div>
                <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                        <FiEdit2 className="w-4 h-4" />
                        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </button>
                    </h2>

                    {isEditing ? (
                      <form onSubmit={handleEditSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={editForm.firstName}
                              onChange={handleEditChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={editForm.lastName}
                              onChange={handleEditChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company name (optional)
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={editForm.company}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country/Region *
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={editForm.country}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            required
                            disabled
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street address *
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={editForm.address}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Flat, suite, unit, etc. (optional)
                          </label>
                          <input
                            type="text"
                            name="address2"
                            value={editForm.address2}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Town / City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={editForm.city}
                              onChange={handleEditChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Postcode *
                            </label>
                            <input
                              type="text"
                              name="postcode"
                              value={editForm.postcode}
                              onChange={handleEditChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div className="flex justify-end gap-4">
                <button 
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                            Cancel
                </button>
                <button 
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                            Save Changes
                </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-200">
                          <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <FiUser className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 ml-3">Name</h3>
                          </div>
                          <p className="text-gray-600">{userData?.firstName} {userData?.lastName}</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-200">
                          <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <FiMail className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 ml-3">Email</h3>
                          </div>
                          <p className="text-gray-600">{userData?.email}</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-200">
                          <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <FiMapPin className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 ml-3">Address</h3>
                          </div>
                          <p className="text-gray-600">
                            {userData?.address}
                            {userData?.address2 && <>, {userData.address2}</>}
                            {userData?.city && <>, {userData.city}</>}
                            {userData?.postcode && <>, {userData.postcode}</>}
                            {userData?.country && <>, {userData.country}</>}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-200">
                          <div className="flex items-center mb-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <FiCalendar className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 ml-3">Member Since</h3>
                          </div>
                          <p className="text-gray-600">{new Date(userData?.createdAt || '').toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Account Actions */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Actions</h2>
                    <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={handleLogout}
                        className="group flex items-center justify-center gap-3 bg-white border border-red-200 rounded-xl p-6 hover:border-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                          <FiLogOut className="text-red-600 text-xl" />
                        </div>
                        <span className="font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <FiBell className="mr-2" />
                      Recent Activity
                    </h2>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="divide-y divide-gray-200">
                        {orders.length === 0 ? (
                          <div className="p-4 text-center">
                            <p className="text-gray-500">No recent activity</p>
                          </div>
                        ) : (
                          orders.slice(0, 5).map((order) => (
                            <div key={order._id} className="p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-lg font-semibold">£{order.total.toFixed(2)}</span>
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
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <FiShoppingBag className="mr-2" />
                    My Orders
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    {orders.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="mb-4">
                          <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                        <button
                          onClick={() => router.push('/')}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {orders.map((order) => (
                          <div key={order._id} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    Order #{order._id.slice(-6)}
                                  </h3>
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
                                <p className="text-sm text-gray-500">
                                  Placed on {formatDate(order.createdAt)}
                                </p>
                                <div className="mt-4">
                                  <p className="text-sm text-gray-600">
                                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <p className="text-lg font-semibold text-gray-900">
                                  £{order.total.toFixed(2)}
                                </p>
                                <button
                                  onClick={() => toggleOrderExpand(order._id)}
                                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  {expandedOrders.has(order._id) ? 'Hide Details' : 'View Details'}
                                </button>
                              </div>
                            </div>

                            {/* Expandable Order Details */}
                            <div 
                              className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedOrders.has(order._id) ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                              }`}
                            >
                              {/* Customer Details */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Name: {order.customerDetails.firstName} {order.customerDetails.lastName}</p>
                                    <p className="text-sm text-gray-600">Email: {order.customerDetails.email}</p>
                                    <p className="text-sm text-gray-600">Phone: {order.customerDetails.phone}</p>
                                    {order.customerDetails.company && (
                                      <p className="text-sm text-gray-600">Company: {order.customerDetails.company}</p>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Address: {order.customerDetails.address}</p>
                                    {order.customerDetails.address2 && (
                                      <p className="text-sm text-gray-600">Address 2: {order.customerDetails.address2}</p>
                                    )}
                                    <p className="text-sm text-gray-600">City: {order.customerDetails.city}</p>
                                    {order.customerDetails.county && (
                                      <p className="text-sm text-gray-600">County: {order.customerDetails.county}</p>
                                    )}
                                    <p className="text-sm text-gray-600">Postcode: {order.customerDetails.postcode}</p>
                                    <p className="text-sm text-gray-600">Country: {order.customerDetails.country}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="bg-white p-4 rounded-lg border">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
                                <div className="space-y-4">
                                  {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                                      {item.image && (
                                        <div className="w-16 h-16 relative rounded overflow-hidden">
                                          <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        <p className="text-sm text-gray-500">Price: £{item.price.toFixed(2)}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                          £{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Order Summary */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Order Summary</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Subtotal:</span>
                                    <span className="text-sm font-medium">£{order.total.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Shipping:</span>
                                    <span className="text-sm font-medium">{order.shipping}</span>
                                  </div>
                                  <div className="flex justify-between border-t pt-2">
                                    <span className="text-sm font-medium">Total:</span>
                                    <span className="text-sm font-medium">£{order.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Payment Information */}
                              <div className="bg-white p-4 rounded-lg border">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
                                <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
                              </div>

                              {/* Order Notes */}
                              {order.customerDetails.orderNotes && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">Order Notes</h4>
                                  <p className="text-sm text-gray-600">{order.customerDetails.orderNotes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <FiHeart className="mr-2" />
                    My Wishlist
                  </h2>
                  
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="max-w-md mx-auto">
                        <div className="relative mb-8">
                          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl">
                            <FiHeart className="w-16 h-16 text-red-500" />
                          </div>
                          {/* Floating hearts animation */}
                          <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                          <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">
                          Your wishlist is empty
                        </h3>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                          Start building your dream collection by adding items you love to your wishlist
                        </p>
                        
                        <button
                          onClick={() => router.push('/shop')}
                          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <span>Start Shopping</span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                        >
                          {/* Product Image */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={item.src || item.image || '/placeholder.jpg'}
                              alt={item.title || item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Discount badge */}
                            {item.discount && (
                              <div className="absolute top-4 left-4">
                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm px-3 py-2 rounded-full shadow-lg transform rotate-12">
                                  {item.discount}
                                </div>
                              </div>
                            )}
                            
                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                              {/* Remove button */}
                              <button
                                onClick={() => {
                                  const updatedItems = wishlistItems.filter(wishlistItem => wishlistItem.id !== item.id);
                                  setWishlistItems(updatedItems);
                                  localStorage.setItem('wishlist', JSON.stringify(updatedItems));
                                }}
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:shadow-xl transition-all duration-300 group/btn"
                              >
                                <FiHeart className="w-5 h-5 text-red-500 group-hover/btn:text-red-600 transition-colors duration-300" />
                              </button>
                              
                              {/* Add to cart button */}
                              <button
                                onClick={() => {/* Add to cart functionality */}}
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-green-50 hover:shadow-xl transition-all duration-300 group/btn"
                              >
                                <FiShoppingBag className="w-5 h-5 text-gray-700 group-hover/btn:text-green-600 transition-colors duration-300" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
                              {item.title || item.name}
                            </h3>
                            
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-2xl font-bold text-red-600">
                                {item.price}
                              </div>
                              <div className="text-sm text-gray-500 font-medium">
                                Free Shipping
                              </div>
                            </div>
                            
                            {/* Quick action button */}
                            <button 
                              onClick={() => router.push('/wishlist')}
                              className="w-full mt-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 