"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

export default function CareersPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Our Team</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Why Join Smart Living?
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <p className="text-gray-600 leading-relaxed">
                    At Smart Living, we're more than just a company - we're a family. We believe in creating an environment 
                    where our employees can grow, innovate, and make a real difference in people's lives through quality 
                    home essentials.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Join us in our mission to make beautiful, comfortable homes accessible to everyone while building 
                    your career in a dynamic and supportive environment.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Benefits & Perks
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Competitive Compensation</span>
                        <p className="text-gray-600 mt-1">We offer competitive salaries and regular performance reviews to ensure your growth is recognized and rewarded.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Professional Development</span>
                        <p className="text-gray-600 mt-1">Access to training programs and opportunities for career advancement within our growing company.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Work-Life Balance</span>
                        <p className="text-gray-600 mt-1">Flexible working hours and a supportive environment that values your personal time and well-being.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Employee Discounts</span>
                        <p className="text-gray-600 mt-1">Enjoy special discounts on our products and exclusive access to new collections.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Current Openings
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Warehouse Associate</h3>
                      <p className="text-gray-600 mb-3">Full-time • Dudley, UK</p>
                      <p className="text-gray-600">Join our warehouse team to help process and ship orders efficiently. Experience in logistics is a plus.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Service Representative</h3>
                      <p className="text-gray-600 mb-3">Full-time • Remote</p>
                      <p className="text-gray-600">Provide exceptional customer support and help our customers with their inquiries and orders.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Marketing Specialist</h3>
                      <p className="text-gray-600 mb-3">Full-time • Dudley, UK</p>
                      <p className="text-gray-600">Help grow our online presence and manage our digital marketing campaigns across various platforms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                How to Apply
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Ready to join our team? Here's how to apply:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 text-gray-600">
                    <li>Review our current openings above</li>
                    <li>Prepare your CV and a cover letter explaining why you'd be a great fit</li>
                    <li>Send your application to careers@smart-living.co.uk</li>
                    <li>Include the position you're applying for in the subject line</li>
                  </ol>
                  <p className="text-gray-600 mt-4">
                    We review all applications and will contact you if your experience matches our requirements.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Internship Program
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <p className="text-gray-600 leading-relaxed">
                    We offer internship opportunities for students and recent graduates looking to gain hands-on experience 
                    in the retail and e-commerce industry. Our internships typically last 3-6 months and can lead to 
                    full-time positions.
                  </p>
                  <p className="text-gray-600 mt-4">
                    To apply for an internship, please send your CV and a brief introduction to internships@smart-living.co.uk
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-indigo-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                Contact HR
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Have questions about working at Smart Living? Our HR team is here to help:
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-indigo-600">📧</span>
                      <span className="text-gray-900">Email: hr@smart-living.co.uk</span>
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