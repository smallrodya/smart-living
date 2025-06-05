"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Introduction
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-gray-600 leading-relaxed">
                    Welcome to Smart Living. These terms and conditions outline the rules and regulations for the use of 
                    our website and services. By accessing this website, we assume you accept these terms and conditions 
                    in full. Do not continue to use Smart Living's website if you do not accept all of the terms and 
                    conditions stated on this page.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Account Registration
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Eligibility</span>
                        <p className="text-gray-600 mt-1">You must be at least 18 years old to create an account and use our services.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Account Information</span>
                        <p className="text-gray-600 mt-1">You must provide accurate and complete information when creating your account.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Account Security</span>
                        <p className="text-gray-600 mt-1">You are responsible for maintaining the confidentiality of your account credentials.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Orders and Payment
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Order Acceptance</span>
                        <p className="text-gray-600 mt-1">All orders are subject to acceptance and availability. We reserve the right to refuse service to anyone.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Pricing</span>
                        <p className="text-gray-600 mt-1">Prices are subject to change without notice. All prices include VAT where applicable.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Payment Methods</span>
                        <p className="text-gray-600 mt-1">We accept various payment methods including credit/debit cards and PayPal.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Smart Coins Program
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Earning Smart Coins</span>
                        <p className="text-gray-600 mt-1">Smart Coins are earned on qualifying purchases and can be redeemed for discounts on future orders.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Redemption</span>
                        <p className="text-gray-600 mt-1">Smart Coins can be redeemed at checkout. The value of Smart Coins may vary based on the promotion.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Expiration</span>
                        <p className="text-gray-600 mt-1">Smart Coins may expire after a certain period. Check your account for specific expiration dates.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Returns and Refunds
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Return Policy</span>
                        <p className="text-gray-600 mt-1">Items can be returned within 30 days of delivery. Items must be unused and in original packaging.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Refund Process</span>
                        <p className="text-gray-600 mt-1">Refunds will be processed within 14 days of receiving the returned item.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <div>
                        <span className="font-semibold text-gray-900">Return Shipping</span>
                        <p className="text-gray-600 mt-1">Customers are responsible for return shipping costs unless the item was damaged or incorrect.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-indigo-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                Privacy and Data Protection
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We are committed to protecting your privacy. Our data collection and usage practices are governed by 
                    our Privacy Policy, which is incorporated into these terms by reference.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      For detailed information about how we collect, use, and protect your personal data, please refer to 
                      our Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-gray-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">7</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-gray-600">📧</span>
                      <span className="text-gray-900">Email: support@smart-living.co.uk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">📞</span>
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