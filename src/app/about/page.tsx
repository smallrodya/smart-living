"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Smart Living</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Our Story
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-gray-600 leading-relaxed">
                    Smart Living Wholesale Ltd was founded with a simple mission: to provide high-quality home essentials 
                    at affordable prices. We believe that everyone deserves to live in a beautiful, comfortable home without 
                    breaking the bank.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Based in Dudley, UK, we've grown from a small family business to one of the leading suppliers of home 
                    goods in the United Kingdom, serving thousands of satisfied customers nationwide.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Our Values
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Quality First</span>
                        <p className="text-gray-600 mt-1">We carefully select each product to ensure it meets our high standards of quality and durability.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Customer Satisfaction</span>
                        <p className="text-gray-600 mt-1">Your happiness is our priority. We're committed to providing exceptional service and support.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Affordable Luxury</span>
                        <p className="text-gray-600 mt-1">We believe that quality home goods should be accessible to everyone, which is why we offer competitive prices.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Our Products
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We offer a comprehensive range of home essentials, including:
                  </p>
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Bedding</span>
                        <p className="text-gray-600 mt-1">From duvet covers to complete bedding sets, we have everything you need for a comfortable night's sleep.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Rugs & Mats</span>
                        <p className="text-gray-600 mt-1">Add warmth and style to your floors with our selection of high-quality rugs and mats.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Throws & Towels</span>
                        <p className="text-gray-600 mt-1">Luxurious throws and towels to add comfort and elegance to your home.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Smart Coins Loyalty Program
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <p className="text-gray-600 leading-relaxed">
                    Our Smart Coins loyalty program rewards our valued customers with points on every purchase. 
                    These points can be redeemed for discounts on future orders, making your shopping experience 
                    even more rewarding.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Our Location
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Visit our showroom at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      Smart Living Wholesale Ltd<br />
                      Unit-2, Block-5<br />
                      Grazebrook Industrial Park<br />
                      Peartree Lane<br />
                      Dudley<br />
                      DY2 0XW
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-indigo-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                Contact Us
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We're here to help! Get in touch with us through any of the following channels:
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