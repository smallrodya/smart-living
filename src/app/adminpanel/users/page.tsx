'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

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
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Email:</span>
                              <span className="text-sm font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Member Since:</span>
                              <span className="text-sm font-medium">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </span>
                            </div>
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