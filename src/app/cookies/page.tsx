"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

export default function CookiePolicyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                What Are Cookies
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-gray-600 leading-relaxed">
                    Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                    They help us make your visit to our site better and provide you with a more personalized experience.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                How We Use Cookies
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Essential Cookies</span>
                        <p className="text-gray-600 mt-1">Required for the website to function properly. They enable basic functions like page navigation and access to secure areas.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Preference Cookies</span>
                        <p className="text-gray-600 mt-1">Remember your settings and preferences to provide you with a more personalized experience.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Analytics Cookies</span>
                        <p className="text-gray-600 mt-1">Help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Managing Cookies
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You can control and/or delete cookies as you wish. You can delete all cookies that are already on your 
                    computer and you can set most browsers to prevent them from being placed.
                  </p>
                  <p className="text-gray-600">
                    However, if you do this, you may have to manually adjust some preferences every time you visit our site 
                    and some services and functionalities may not work.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Third-Party Cookies
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <p className="text-gray-600 leading-relaxed">
                    Some cookies are placed by third-party services that appear on our pages. We use these cookies to:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
                    <li>Analyze website traffic</li>
                    <li>Provide social media features</li>
                    <li>Process payments securely</li>
                    <li>Improve our marketing efforts</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-indigo-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Contact Us
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you have any questions about our Cookie Policy, please contact us:
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