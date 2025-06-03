import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PopupBanner from '@/components/PopupBanner';
import MobileLayout from '@/components/MobileLayout';
import { Toaster } from 'react-hot-toast';
import { BasketProvider } from '@/context/BasketContext';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Smart Living",
  description: "Smart Living - The best place to buy homeware",
  icons: {
    icon: '/site-ico.ico',
    apple: '/site-ico.ico',
    shortcut: '/site-ico.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Smart Living',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/site-ico.ico" />
        <link rel="apple-touch-icon" href="/site-ico.ico" />
        <link rel="shortcut icon" href="/site-ico.ico" />
      </head>
      <body className={inter.className}>
        <BasketProvider>
          <MobileLayout>
            {children}
            <PopupBanner />
          </MobileLayout>
        </BasketProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}