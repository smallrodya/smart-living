import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Получаем путь запроса
  const path = request.nextUrl.pathname;

  // Проверяем, является ли путь защищенным
  const isProtectedRoute = path.startsWith('/user/Myaccount');

  // Получаем данные пользователя из localStorage
  const user = request.cookies.get('user');

  // Если это защищенный маршрут и пользователь не авторизован
  if (isProtectedRoute && !user) {
    // Перенаправляем на страницу входа
    return NextResponse.redirect(new URL('/user/login', request.url));
  }

  return NextResponse.next();
}

// Указываем, для каких путей применять middleware
export const config = {
  matcher: ['/user/Myaccount/:path*']
}; 