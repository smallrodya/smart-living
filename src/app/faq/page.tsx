"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

export default function FAQPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                General Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">What is Smart Living?</span>
                        <p className="text-gray-600 mt-1">Smart Living is an online store offering quality home essentials at affordable prices. We provide a wide range of products for every room in your home.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">What product categories do you offer?</span>
                        <p className="text-gray-600 mt-1">We offer the following main categories: bedding, rugs & mats, throws & towels, outdoor items, clothing, footwear, and clearance items.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Account & Smart Coins
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">What are Smart Coins?</span>
                        <p className="text-gray-600 mt-1">Smart Coins is our loyalty program. You earn Smart Coins with every purchase, which can be used to pay for future orders.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">How can I check my Smart Coins balance?</span>
                        <p className="text-gray-600 mt-1">You can check your Smart Coins balance in your account dashboard under "My Account".</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">How can I update my personal information?</span>
                        <p className="text-gray-600 mt-1">You can update your personal information in the "My Account" section. There you'll find options to update your name, address, and contact details.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Orders & Delivery
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">How can I track my order?</span>
                        <p className="text-gray-600 mt-1">You can track your order in the "Track Order" section on our website. Simply enter your order number and email address.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">What payment methods do you accept?</span>
                        <p className="text-gray-600 mt-1">We accept all major credit and debit cards, as well as PayPal. You can also use Smart Coins to pay for your order.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">How much is delivery?</span>
                        <p className="text-gray-600 mt-1">Delivery costs depend on the size and weight of your order, as well as the chosen delivery method. You'll see the exact cost during checkout.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Returns & Exchanges
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">How can I return an item?</span>
                        <p className="text-gray-600 mt-1">You can return items within 30 days of receipt. Use the "Return Item" button in the "Returns" section or contact our customer service.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">What condition should items be in for return?</span>
                        <p className="text-gray-600 mt-1">Items should be in their original packaging, unused, and in perfect condition. All tags and labels must be intact.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Contact & Support
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">How can I contact customer support?</span>
                        <p className="text-gray-600 mt-1">You can reach us through the contact form on our "Contact" page, by phone, or email. Our customer service is available Monday to Friday, 10:30 AM to 6:00 PM.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">Q:</span>
                      <div>
                        <span className="font-semibold text-gray-900">Where is your store located?</span>
                        <p className="text-gray-600 mt-1">Our address: Smart Living Wholesale Ltd, Unit-2, Block-5, Grazebrook Industrial Park, Peartree Lane, Dudley, DY2 0XW.</p>
                      </div>
                    </li>
                  </ul>
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