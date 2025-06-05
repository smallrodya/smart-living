'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileFooter from './MobileFooter';

const Footer = () => {
  // Определяем, является ли устройство мобильным
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Проверяем при монтировании
    checkMobile();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkMobile);

    // Удаляем слушатель при размонтировании
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Если устройство мобильное, показываем мобильную версию
  if (isMobile) {
    return <MobileFooter />;
  }

  // Десктопная версия футера
  return (
    <footer className="bg-black text-white pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                src="/SmartLivingLogo-2.svg"
                alt="Smart Living"
                width={300}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quality products & Smart prices
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/shop/duvet-set-by-type" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Bedding
                </Link>
              </li>
              <li>
                <Link href="/shop/shaggy-rugs" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Rugs & Mats
                </Link>
              </li>
              <li>
                <Link href="/shop/chunky-hand-knitted-throws-towels" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Throws & Towels
                </Link>
              </li>
              <li>
                <Link href="/shop/outdoorshop-all" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Outdoor
                </Link>
              </li>
              <li>
                <Link href="/shop/clothing-jeans" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/shop/footwear-slippers" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Footwear
                </Link>
              </li>
              <li>
                <Link href="/shop/clearance" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6">About Us</h3>
            <ul className="space-y-4 mb-8">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="bg-transparent p-3 rounded-full hover:bg-red-600 transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="bg-transparent p-3 rounded-full hover:bg-red-600 transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                   className="bg-transparent p-3 rounded-full hover:bg-red-600 transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="bg-transparent p-3 rounded-full hover:bg-red-600 transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Smart Living. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 