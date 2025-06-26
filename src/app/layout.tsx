import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PopupBanner from '@/components/PopupBanner';
import MobileLayout from '@/components/MobileLayout';
import { Toaster } from 'react-hot-toast';
import { BasketProvider } from '@/context/BasketContext';
import TechSupport from '@/components/TechSupport';
import MobileTechSupport from '@/components/mobileTechSupport';
import Providers from './providers';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Smart Living",
  description: "Smart Living - Quality products at smart prices",
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
        <Providers>
          <BasketProvider>
            <MobileLayout>
              {children}
              <PopupBanner />
            </MobileLayout>
          </BasketProvider>
          {/* Desktop support only on md+ */}
          <div className="hidden md:block">
            <TechSupport />
          </div>
          {/* Mobile support only on mobile */}
          <div className="md:hidden block">
            <MobileTechSupport />
          </div>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}