'use client';
import { useState } from 'react';
import { Search, Loader2, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import React from 'react';
import Header from '@/components/Header';
import CategoriesSection from '@/components/CategoriesSection';
import Footer from '@/components/Footer';


interface OrderItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  shipping: string;
  paymentMethod: string;
  customerDetails: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postcode: string;
    phone: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

const orderStatuses = {
  'DONE': { 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle,
    description: 'Your order has been received and will be shipped soon',
    details: [
      'Order confirmed',
      'Payment received',
      'Preparing for shipping'
    ]
  },
  'PROCESSING': { 
    color: 'bg-blue-100 text-blue-800', 
    icon: Package,
    description: 'Your order is being processed and will be shipped soon',
    details: [
      'Order is being prepared',
      'Items are being packed',
      'Quality check in progress'
    ]
  },
  'SHIPPED': { 
    color: 'bg-purple-100 text-purple-800', 
    icon: Truck,
    description: 'Your order has been shipped and will be delivered soon',
    details: [
      'Package is in transit',
      'On the way to your address',
      'Estimated delivery soon'
    ]
  },
  'DELIVERED': { 
    color: 'bg-gray-100 text-gray-800', 
    icon: CheckCircle,
    description: 'Your order has been delivered',
    details: [
      'Package has been delivered',
      'Thank you for your purchase',
      'Enjoy your items!'
    ]
  },
  'CANCELLED': { 
    color: 'bg-red-100 text-red-800', 
    icon: XCircle,
    description: 'Your order has been cancelled',
    details: [
      'Order was cancelled',
      'No further action required',
      'Contact support if needed'
    ]
  }
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedOrderNumber = orderNumber.trim();
    const trimmedEmail = email.trim();
    
    if (!trimmedOrderNumber || !trimmedEmail) {
      toast.error('Please enter both order number and email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(trimmedOrderNumber)}&email=${encodeURIComponent(trimmedEmail)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch order');
      }

      if (!data.order) {
        throw new Error('Order not found');
      }

      setOrder(data.order);
      toast.success('Order found!');
    } catch (error) {
      console.error('Error tracking order:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to track order. Please try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      <Header />
      <CategoriesSection />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 mt-[200px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-600">Enter your order number and email to track your order status</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Order Number
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter order number (e.g. #a128d0)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">Enter your order number, you can find it in the "Myaccount" section "Orders"</p>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Track Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Details */}
          {order && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order Status */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order #{order.orderNumber || order._id.slice(-6)}
                  </h2>
                  <div className="flex items-center gap-2">
                    {React.createElement(orderStatuses[order.status as keyof typeof orderStatuses].icon, {
                      className: `h-5 w-5 ${orderStatuses[order.status as keyof typeof orderStatuses].color.split(' ')[1]}`
                    })}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      orderStatuses[order.status as keyof typeof orderStatuses].color
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Placed on {formatDate(order.createdAt)}
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {orderStatuses[order.status as keyof typeof orderStatuses].description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {orderStatuses[order.status as keyof typeof orderStatuses].details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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

              {/* Shipping Information */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Name:</span> {order.customerDetails.firstName} {order.customerDetails.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {order.customerDetails.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {order.customerDetails.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Address:</span> {order.customerDetails.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">City:</span> {order.customerDetails.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Postcode:</span> {order.customerDetails.postcode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
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
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 