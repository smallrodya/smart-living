"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

export default function ShippingPage() {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <CategoriesSection />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shipping Information</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Free Mainland UK Delivery
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-gray-600 leading-relaxed">
                    We offer complimentary delivery on all orders within mainland UK — no minimum spend required.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Same-Day Dispatch
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-gray-600 leading-relaxed">
                    Orders placed by 8:00 AM (Monday to Friday) are dispatched the same day. Orders placed after this time, 
                    or during weekends and bank holidays, will be dispatched on the next working day.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Delivery Timeframes
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Standard Delivery (Free)</span>
                        <p className="text-gray-600 mt-1">Estimated delivery within 2 to 5 working days.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Express Delivery (Paid)</span>
                        <p className="text-gray-600 mt-1">Delivered on the next working day.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Packaging Information
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <p className="text-gray-600 leading-relaxed">
                    Please note: Due to courier requirements, larger rugs may be shipped folded rather than rolled. 
                    This does not impact the quality or performance of the product.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Order Tracking
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <p className="text-gray-600 leading-relaxed">
                    A tracking link will be emailed to you once your order has been dispatched, 
                    so you can monitor your delivery status in real time.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-indigo-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                Need Help?
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you experience any issues with your delivery, our customer service team is happy to assist.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-indigo-600">📧</span>
                      <span className="text-gray-900">Email: support@smart-living.co.uk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-600">📞</span>
                      <span className="text-gray-900">Phone: 01384 521170</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 