'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import confetti from 'canvas-confetti';
import { FiCheckCircle, FiGift, FiShoppingBag, FiClock } from 'react-icons/fi';

export default function OrderCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем ID заказа из URL
    const orderId = searchParams.get('orderId');
    if (!orderId) {
      router.push('/');
      return;
    }

    // Загружаем детали заказа
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Order details from API:', data);
          console.log('Order ID:', data._id);
          console.log('Order Total:', data.total);
          console.log('Payment Method:', data.paymentMethod);
          console.log('Customer Details:', data.customerDetails);
          setOrderDetails(data);
        } else {
          console.error('Failed to fetch order details:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();

    // Запускаем анимацию салюта
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Создаем салют
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header с градиентом */}
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-white overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 p-3 rounded-full">
                  <FiCheckCircle className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-center mb-4">Order Confirmed!</h1>
              <p className="text-xl text-center text-blue-100">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>
          </div>

          {/* Основной контент */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Информация о заказе */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiShoppingBag className="mr-2" />
                    Order Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">#{orderDetails?.orderId?.slice(-6) || orderDetails?._id?.slice(-6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {orderDetails?.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">£{orderDetails?.total?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium capitalize">{orderDetails?.paymentMethod || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                {/* Информация о доставке */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiClock className="mr-2" />
                    Shipping Information
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      {orderDetails?.customerDetails?.firstName} {orderDetails?.customerDetails?.lastName}
                    </p>
                    <p className="text-gray-600">{orderDetails?.customerDetails?.address}</p>
                    {orderDetails?.customerDetails?.address2 && (
                      <p className="text-gray-600">{orderDetails.customerDetails.address2}</p>
                    )}
                    <p className="text-gray-600">
                      {orderDetails?.customerDetails?.city}, {orderDetails?.customerDetails?.postcode}
                    </p>
                    <p className="text-gray-600">{orderDetails?.customerDetails?.country}</p>
                  </div>
                </div>
              </div>

              {/* Информация о наградах */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiGift className="mr-2" />
                    Smart Coin Rewards
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Earned Smart Coins</p>
                        <p className="text-sm text-gray-500">5% of your purchase</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          +{(orderDetails?.total ? (orderDetails.total * 0.05).toFixed(2) : '0.00')}
                        </p>
                        <p className="text-sm text-gray-500">Smart Coins</p>
                      </div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
                      <p className="text-sm text-gray-600">
                        Your Smart Coins have been added to your account. Use them for future purchases!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Следующие шаги */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      You will receive an email confirmation with your order details.
                    </p>
                    <p className="text-gray-600">
                      We'll notify you when your order ships.
                    </p>
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => router.push('/')}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Continue Shopping
                      </button>
                      <button
                        onClick={() => router.push('/user/Myaccount')}
                        className="flex-1 bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 