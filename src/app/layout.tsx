import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PopupBanner from '@/components/PopupBanner';
import MobileLayout from '@/components/MobileLayout';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Living",
  description: "Smart Living - The best place to buy homeware",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <MobileLayout>
          {children}
          <PopupBanner />
        </MobileLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}