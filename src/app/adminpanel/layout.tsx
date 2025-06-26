'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminAuthGuard from '@/components/AdminAuthGuard';

interface Counters {
  products: number;
  orders: number;
  users: number;
  support: number;
}

const menuItems = [
  { name: 'Dashboard', path: '/adminpanel', icon: '📊' },
  { name: 'Products', path: '/adminpanel/products', icon: '📦', key: 'products' },
  { name: 'Orders', path: '/adminpanel/orders', icon: '🛒', key: 'orders' },
  { name: 'Users', path: '/adminpanel/users', icon: '👥', key: 'users' },
  { name: 'Support', path: '/adminpanel/support', icon: '💬', key: 'support' },
  { name: 'Reduce Space Section', path: '/adminpanel/reduce-space-section', icon: '⚙️'},
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [counters, setCounters] = useState<Counters>({
    products: 0,
    orders: 0,
    users: 0,
    support: 0,
  });
  const pathname = usePathname();

  // Функция для получения количества продуктов
  const fetchProductsCount = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      return data.products?.length || 0;
    } catch (error) {
      console.error('Error fetching products count:', error);
      return 0;
    }
  };

  // Функция для получения количества заказов
  const fetchOrdersCount = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      return data.orders?.length || 0;
    } catch (error) {
      console.error('Error fetching orders count:', error);
      return 0;
    }
  };

  // Функция для получения количества пользователей
  const fetchUsersCount = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      return data.users?.length || 0;
    } catch (error) {
      console.error('Error fetching users count:', error);
      return 0;
    }
  };

  // Функция для получения количества обращений в поддержке
  const fetchSupportCount = async () => {
    try {
      const response = await fetch('/api/support/tickets');
      const data = await response.json();
      return data?.length || 0;
    } catch (error) {
      console.error('Error fetching support count:', error);
      return 0;
    }
  };

  // Функция для обновления всех счетчиков
  const updateCounters = async () => {
    const [productsCount, ordersCount, usersCount, supportCount] = await Promise.all([
      fetchProductsCount(),
      fetchOrdersCount(),
      fetchUsersCount(),
      fetchSupportCount(),
    ]);

    setCounters({
      products: productsCount,
      orders: ordersCount,
      users: usersCount,
      support: supportCount,
    });
  };

  // Обновляем счетчики при загрузке и каждые 5 секунд
  useEffect(() => {
    updateCounters();
    const interval = setInterval(updateCounters, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/adminpanel/login';
  };

  // Функция для получения стилей счетчика в зависимости от типа
  const getCounterStyles = (key: string) => {
    switch (key) {
      case 'products':
        return {
          bg: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600',
          shadow: 'shadow-emerald-500/25',
          glow: 'shadow-emerald-500/50',
          border: 'border-emerald-300/30'
        };
      case 'orders':
        return {
          bg: 'bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600',
          shadow: 'shadow-blue-500/25',
          glow: 'shadow-blue-500/50',
          border: 'border-blue-300/30'
        };
      case 'users':
        return {
          bg: 'bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600',
          shadow: 'shadow-purple-500/25',
          glow: 'shadow-purple-500/50',
          border: 'border-purple-300/30'
        };
      case 'support':
        return {
          bg: 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-600',
          shadow: 'shadow-orange-500/25',
          glow: 'shadow-orange-500/50',
          border: 'border-orange-300/30'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600',
          shadow: 'shadow-gray-500/25',
          glow: 'shadow-gray-500/50',
          border: 'border-gray-300/30'
        };
    }
  };

  // Если мы на странице входа, не показываем layout админ-панели
  if (pathname === '/adminpanel/login') {
    return <>{children}</>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full w-80">
          <div className="h-full bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">A</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Smart Living</p>
                </div>
              </div>

              <nav className="space-y-3">
                {menuItems.map((item) => {
                  const count = item.key ? counters[item.key as keyof Counters] : null;
                  const counterStyles = item.key ? getCounterStyles(item.key) : null;
                  const isActive = pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 shadow-lg'
                          : 'hover:bg-white/60 hover:shadow-lg border border-transparent'
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full"></div>
                      )}
                      
                      <div className="flex items-center">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg' 
                            : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-gray-200 group-hover:to-gray-300'
                        }`}>
                          <span className={`text-xl ${isActive ? 'text-white' : 'text-gray-600'}`}>
                            {item.icon}
                          </span>
                        </div>
                        <span className={`ml-4 font-semibold transition-all duration-300 ${
                          isActive 
                            ? 'text-indigo-700' 
                            : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {item.name}
                        </span>
                      </div>
                      
                      {count !== null && counterStyles && (
                        <div className="relative">
                          {/* Background glow */}
                          <div className={`absolute inset-0 ${counterStyles.bg} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                          
                          {/* Main counter */}
                          <div 
                            className={`
                              relative flex items-center justify-center 
                              w-10 h-10 
                              ${counterStyles.bg}
                              text-white 
                              text-sm font-bold 
                              rounded-2xl
                              shadow-lg ${counterStyles.shadow}
                              group-hover:shadow-xl ${counterStyles.glow}
                              transform transition-all duration-300
                              group-hover:scale-110
                              border ${counterStyles.border}
                              overflow-hidden
                            `}
                            style={{
                              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                              letterSpacing: '-0.025em'
                            }}
                          >
                            {/* Animated gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-2xl animate-pulse"></div>
                            
                            {/* Sparkle effect */}
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                            
                            <span className="relative z-10 drop-shadow-sm">
                              {count > 99 ? '99+' : count}
                            </span>
                          </div>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center p-4 rounded-2xl text-blue-600 hover:bg-blue-50/80 transition-all duration-300 border border-blue-200/50 hover:border-blue-300/50 hover:shadow-lg group"
                >
                  <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                    <span className="text-lg">🏠</span>
                  </div>
                  <span className="ml-4 font-semibold">Go to Home Page</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-4 rounded-2xl text-red-600 hover:bg-red-50/80 transition-all duration-300 border border-red-200/50 hover:border-red-300/50 hover:shadow-lg group"
                >
                  <div className="p-3 rounded-xl bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
                    <span className="text-lg">🚪</span>
                  </div>
                  <span className="ml-4 font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-80">
          <main className="p-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
} 