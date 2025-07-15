"use client";
import { useState, useEffect } from "react";
import { Search, Loader2, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

// Статусы заказов
const orderStatuses = [
  'DONE',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED'
];

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
  trackNumber?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [editingTrack, setEditingTrack] = useState<{ [orderId: string]: boolean }>({});
  const [trackInputs, setTrackInputs] = useState<{ [orderId: string]: string }>({});

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      toast.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const handleDownloadOrder = (order: Order) => {
    // Создаем данные для Excel
    const orderData = order.items.map(item => ({
      'Order Number': order._id.slice(-6),
      'Order Date': formatDate(order.createdAt),
      'Customer Name': `${order.customerDetails.firstName} ${order.customerDetails.lastName}`,
      'Address Line 1': order.customerDetails.address,
      'Address Line 2': order.customerDetails.address2 || '',
      'Address Line 3 (City)': order.customerDetails.city,
      'Address Line 4': order.customerDetails.county || '',
      'Postcode': order.customerDetails.postcode,
      'Phone Number': order.customerDetails.phone,
      'Email Address': order.customerDetails.email,
      'Item SKU': item.sku || 'N/A',
      'Item Cost': `£${item.price.toFixed(2)}`,
      'Internal Name': item.title,
      'Quantity': item.quantity,
      'Customer Note': order.customerDetails.orderNotes || '',
      'Tracking': order.status,
      'Total': `£${(item.price * item.quantity).toFixed(2)}`,
      'Shipping Method': order.shipping,
      'Payment Method': order.paymentMethod
    }));

    // Создаем рабочую книгу Excel
    const ws = XLSX.utils.json_to_sheet(orderData);
    
    // Настраиваем ширину колонок
    const colWidths = [
      { wch: 15 },  // Order Number
      { wch: 20 },  // Order Date
      { wch: 25 },  // Customer Name
      { wch: 30 },  // Address Line 1
      { wch: 30 },  // Address Line 2
      { wch: 20 },  // Address Line 3 (City)
      { wch: 20 },  // Address Line 4
      { wch: 15 },  // Postcode
      { wch: 20 },  // Phone Number
      { wch: 30 },  // Email Address
      { wch: 15 },  // Item SKU
      { wch: 15 },  // Item Cost
      { wch: 40 },  // Internal Name
      { wch: 10 },  // Quantity
      { wch: 50 },  // Customer Note
      { wch: 15 },  // Tracking
      { wch: 15 },  // Total
      { wch: 20 },  // Shipping Method
      { wch: 20 },  // Payment Method
    ];
    
    ws['!cols'] = colWidths;

    // Добавляем стили для заголовков
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cell]) continue;
      
      // Устанавливаем стиль для заголовков
      ws[cell].s = {
        font: { bold: true },
        alignment: { wrapText: true, vertical: 'center' }
      };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Order Details");

    // Генерируем файл и скачиваем его
    XLSX.writeFile(wb, `order_${order._id.slice(-6)}.xlsx`);
  };

  const handleTrackEdit = (orderId: string, currentTrack: string) => {
    setEditingTrack(prev => ({ ...prev, [orderId]: true }));
    setTrackInputs(prev => ({ ...prev, [orderId]: currentTrack || '' }));
  };

  const handleTrackSave = async (orderId: string) => {
    try {
      const trackNumber = trackInputs[orderId] || '';
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackNumber }),
      });
      if (!response.ok) throw new Error('Failed to update track number');
      toast.success('Track number updated');
      setEditingTrack(prev => ({ ...prev, [orderId]: false }));
      fetchOrders();
    } catch (e) {
      toast.error('Failed to update track number');
    }
  };

  const filteredOrders = orders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      order.customerDetails.email.toLowerCase().includes(searchLower) ||
      order.customerDetails.firstName.toLowerCase().includes(searchLower) ||
      order.customerDetails.lastName.toLowerCase().includes(searchLower) ||
      order._id.toLowerCase().includes(searchLower);
    
    const matchesStatus = !selectedStatus || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Statuses</option>
              {orderStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600 mx-auto" />
            <p className="mt-2 text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <div key={order._id} className="p-6">
                <div 
                  className="flex flex-col md:flex-row gap-6 cursor-pointer"
                  onClick={() => toggleOrderExpand(order._id)}
                >
                  {/* Order Header */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order._id, e.target.value);
                          }}
                          className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {orderStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadOrder(order);
                          }}
                          className="px-3 py-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOrder(order._id);
                          }}
                          className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Order Status */}
                    <div className="flex items-center gap-4 mb-4">
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

                    {/* Track Number */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-600">Track Number:</span>
                      {editingTrack[order._id] ? (
                        <>
                          <input
                            type="text"
                            value={trackInputs[order._id] || ''}
                            onChange={e => setTrackInputs(prev => ({ ...prev, [order._id]: e.target.value }))}
                            className="px-2 py-1 border rounded text-sm"
                            style={{ minWidth: 120 }}
                          />
                          <button
                            onClick={e => { e.stopPropagation(); handleTrackSave(order._id); }}
                            className="ml-1 text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            ✓
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); setEditingTrack(prev => ({ ...prev, [order._id]: false })); }}
                            className="ml-1 text-gray-400 hover:text-gray-600"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-gray-900">{order.trackNumber || <span className="text-gray-400">(not set)</span>}</span>
                          <button
                            onClick={e => { e.stopPropagation(); handleTrackEdit(order._id, order.trackNumber || ''); }}
                            className="ml-2 px-2 py-1 text-blue-600 hover:text-blue-800 border border-blue-200 rounded text-xs"
                          >
                            {order.trackNumber ? 'Edit' : 'Add Track'}
                          </button>
                        </>
                      )}
                    </div>

                    {/* Expandable Content */}
                    <div 
                      className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedOrders.has(order._id) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
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

                    {/* Open Order Button */}
                    <div className="mt-4 flex justify-center">
                      <button
                        className="text-sm text-gray-900 hover:text-gray-700 transition-colors border border-gray-900 px-3 py-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOrderExpand(order._id);
                        }}
                      >
                        {expandedOrders.has(order._id) ? 'Close Order' : 'Open Order'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 