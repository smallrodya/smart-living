import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PopupBanner from '@/components/PopupBanner';
import MobileLayout from '@/components/MobileLayout';
import { Toaster } from 'react-hot-toast';
import { BasketProvider } from '@/context/BasketContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Living",
  description: "Smart Living - The best place to buy homeware",
  icons: '/site-ico.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
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