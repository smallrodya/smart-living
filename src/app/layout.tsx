import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PopupBanner from '@/components/PopupBanner';
import MobileLayout from '@/components/MobileLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Living",
  description: "Smart Living - ваш умный дом",
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
      </body>
    </html>
  );
}