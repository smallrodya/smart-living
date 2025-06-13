'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminAuthGuard from '@/components/AdminAuthGuard';

const menuItems = [
  { name: 'Dashboard', path: '/adminpanel', icon: '📊' },
  { name: 'Products', path: '/adminpanel/products', icon: '📦' },
  { name: 'Orders', path: '/adminpanel/orders', icon: '🛒' },
  { name: 'Users', path: '/adminpanel/users', icon: '👥' },
  { name: 'Support', path: '/adminpanel/support', icon: '⚙️' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Если мы на странице входа, не показываем layout админ-панели
  if (pathname === '/adminpanel/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/adminpanel/login';
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              {isSidebarOpen && (
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? '←' : '→'}
              </button>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <span className="text-xl">🚪</span>
                {isSidebarOpen && <span className="ml-3">Logout</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          <main className="p-8">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
} 