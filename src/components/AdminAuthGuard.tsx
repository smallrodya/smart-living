'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Если мы на странице входа, не проверяем авторизацию
      if (pathname === '/adminpanel/login') {
        setIsAuthorized(true);
        return;
      }

      const auth = localStorage.getItem('adminAuth');
      if (!auth) {
        router.push('/adminpanel/login');
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
} 