"use client";
import { Suspense } from "react";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBasket } from '@/context/BasketContext';

function OrderStatusPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams ? searchParams.get('orderId') : null;
  const { clearBasket } = useBasket();
  const [status, setStatus] = useState<'pending'|'done'|'error'>('pending');
  const [error, setError] = useState('');
  const [waited, setWaited] = useState(0);

  useEffect(() => {
    if (!orderId) {
      setStatus('error');
      setError('Order ID not found');
      return;
    }
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    const poll = async () => {
      try {
        const res = await fetch(`/api/orders?orderId=${orderId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'DONE') {
            setStatus('done');
            clearBasket();
            setTimeout(() => {
              router.replace(`/ordercomplete?orderId=${orderId}`);
            }, 1000);
            return;
          }
        }
      } catch (e) {
        // ignore
      }
      setWaited(w => w + 3);
    };
    poll();
    interval = setInterval(poll, 3000);
    timeout = setTimeout(() => {
      setStatus('error');
      setError('Платёж ещё не подтверждён. Если деньги списались — мы пришлём подтверждение на email.');
      clearInterval(interval);
    }, 120000); // 2 минуты
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [orderId, clearBasket, router]);

  if (status === 'done') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold mb-4">Платёж подтверждён!</div>
        <div className="text-gray-600 mb-2">Перенаправляем на страницу заказа...</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-red-600 mb-4">{error}</div>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded" onClick={() => router.push('/')}>На главную</button>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-2xl font-semibold mb-4">Платёж обрабатывается...</div>
      <div className="text-gray-600 mb-2">Пожалуйста, не закрывайте страницу.</div>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <div className="mt-6 text-gray-400 text-sm">Ожидание подтверждения: {waited} сек.</div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderStatusPageContent />
    </Suspense>
  );
} 