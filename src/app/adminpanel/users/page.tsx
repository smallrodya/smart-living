'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getCookie, setCookie } from 'cookies-next';
import * as XLSX from 'xlsx';

interface User {
  _id: string;
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [editingSmartCoins, setEditingSmartCoins] = useState<string | null>(null);
  const [newSmartCoinsValue, setNewSmartCoinsValue] = useState<number>(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  const handleUpdateSmartCoins = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smartCoins: newSmartCoinsValue }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Smart Coins updated successfully');
        setEditingSmartCoins(null);
        
        // Обновляем куки, если это текущий пользователь
        const userCookie = getCookie('user');
        if (userCookie) {
          const userData = JSON.parse(userCookie as string);
          if (userData.userId === userId) {
            setCookie('user', JSON.stringify(data.userData), {
              maxAge: 30 * 24 * 60 * 60, // 30 дней
              path: '/'
            });
          }
        }
        
        fetchUsers(); // Обновляем список пользователей
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to update Smart Coins');
      }
    } catch (error) {
      toast.error('Error updating Smart Coins');
    }
  };

  const startEditingSmartCoins = (user: User) => {
    setEditingSmartCoins(user._id);
    setNewSmartCoinsValue(user.smartCoins || 0);
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (user.firstName?.toLowerCase() || '').includes(searchLower) ||
      (user.lastName?.toLowerCase() || '').includes(searchLower) ||
      (user.email?.toLowerCase() || '').includes(searchLower)
    );
  });

  const toggleUserExpand = (userId: string) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const exportToExcel = () => {
    try {
      // Подготавливаем данные для экспорта
      const exportData = users.map(user => ({
        'First Name': user.firstName,
        'Last Name': user.lastName,
        'Email': user.email,
        'Phone': user.phone || 'Not provided',
        'Company': user.company || 'Not provided',
        'Country': user.country || 'Not provided',
        'Address': user.address || 'Not provided',
        'Address 2': user.address2 || 'Not provided',
        'City': user.city || 'Not provided',
        'County': user.county || 'Not provided',
        'Postcode': user.postcode || 'Not provided',
        'Smart Coins': user.smartCoins.toFixed(2),
        'Member Since': new Date(user.createdAt).toLocaleDateString()
      }));

      // Создаем рабочую книгу
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Устанавливаем ширину столбцов
      const colWidths = [
        { wch: 15 }, // First Name
        { wch: 15 }, // Last Name
        { wch: 25 }, // Email
        { wch: 15 }, // Phone
        { wch: 20 }, // Company
        { wch: 20 }, // Country
        { wch: 30 }, // Address
        { wch: 20 }, // Address 2
        { wch: 15 }, // City
        { wch: 15 }, // County
        { wch: 10 }, // Postcode
        { wch: 12 }, // Smart Coins
        { wch: 15 }  // Member Since
      ];
      ws['!cols'] = colWidths;

      // Добавляем лист в книгу
      XLSX.utils.book_append_sheet(wb, ws, 'Users');

      // Генерируем файл и скачиваем его
      const fileName = `users_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);

      toast.success('Users exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export users');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            Export to Excel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600 mx-auto" />
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <div key={user._id} className="p-6">
                <div 
                  className="flex flex-col md:flex-row gap-6 cursor-pointer"
                  onClick={() => toggleUserExpand(user._id)}
                >
                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 text-xs border border-red-600 text-red-600 hover:bg-red-50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div 
                      className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedUsers.has(user._id) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">User Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">First Name:</span>
                              <span className="text-sm font-medium">{user.firstName}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Last Name:</span>
                              <span className="text-sm font-medium">{user.lastName}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Email:</span>
                              <span className="text-sm font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Phone:</span>
                              <span className="text-sm font-medium">{user.phone || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Company:</span>
                              <span className="text-sm font-medium">{user.company || 'Not provided'}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Country:</span>
                              <span className="text-sm font-medium">{user.country || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Address:</span>
                              <span className="text-sm font-medium">{user.address || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Address 2:</span>
                              <span className="text-sm font-medium">{user.address2 || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">City:</span>
                              <span className="text-sm font-medium">{user.city || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">County:</span>
                              <span className="text-sm font-medium">{user.county || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Postcode:</span>
                              <span className="text-sm font-medium">{user.postcode || 'Not provided'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Member Since:</span>
                            <span className="text-sm font-medium">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Smart Coins:</span>
                            {editingSmartCoins === user._id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={isNaN(newSmartCoinsValue) ? '' : newSmartCoinsValue}
                                  onChange={(e) => {
                                    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                    setNewSmartCoinsValue(isNaN(value) ? 0 : value);
                                  }}
                                  className="w-24 px-2 py-1 text-sm border rounded"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateSmartCoins(user._id);
                                  }}
                                  className="text-xs text-green-600 hover:text-green-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingSmartCoins(null);
                                  }}
                                  className="text-xs text-gray-600 hover:text-gray-700"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{user.smartCoins.toFixed(2)}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditingSmartCoins(user);
                                  }}
                                  className="text-xs text-indigo-600 hover:text-indigo-700"
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Open User Button */}
                    <div className="mt-4 flex justify-center">
                      <button
                        className="text-sm text-gray-900 hover:text-gray-700 transition-colors border border-gray-900 px-3 py-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleUserExpand(user._id);
                        }}
                      >
                        {expandedUsers.has(user._id) ? 'Close Details' : 'View Details'}
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