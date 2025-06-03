"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

export default function PrivacyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Who we are
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Welcome to Smart Living – We believe in offering top quality products to suit everyone tastes and budgets. 
                Our trading experience over the years allow us to offer you unbeatable prices across our range in Home Decor, 
                Household Linens, Bedding to Curtains.
              </p>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Our Promise
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We promise that we will collect, use, process and store your data properly and securely. We will:
              </p>
              <ul className="list-none space-y-3 mb-6">
                {[
                  "Use and maintain your personal data in accordance with all applicable legal requirements",
                  "Inform you about what data we collect about you and how we use it",
                  "Ensure that the privacy of your data is maintained",
                  "Honour your legal rights in respect of personal data which we hold"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <p className="text-gray-600 mb-2">
                  We will not sell your data or transfer it outside to anyone to use for their own marketing purposes.
                </p>
                <p className="text-gray-600">
                  This Privacy Policy explains what personal data we collect about you, how and why we use it, 
                  who we disclose it to, and how we protect your privacy.
                </p>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Who is responsible for your data?
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Our Privacy Policy applies to the personal data that Smart-Living collects and uses. This policy applies to all data 
                  that we acquire about you when you visit our websites using any device, or contact us by telephone or email.
                </p>
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <p className="text-gray-600 leading-relaxed">
                    References in this Privacy Policy to "Smart-living", "we", "us" or "our" mean Smart-Living Wholesale Ltd. 
                    We are the "data controller" for the purposes of the Data Protection Act 2018, the General Data Protection 
                    Regulation 2016 as incorporated into the law of England, Wales, Scotland and Northern Ireland by s.3 of the 
                    European (Withdrawal) Act 2018, and other applicable data protection legislation.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Cookies
              </h2>
              <div className="space-y-4">
                {[
                  "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.",
                  "If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.",
                  "When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select \"Remember Me\", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.",
                  "If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day."
                ].map((text, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-yellow-100">
                    <p className="text-gray-600 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Our Security Policy
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-red-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our site uses high level SSL (Secure Socket Layer) encryption technology which is the most advanced security 
                    software currently available for online transactions. We have a server certificate known as Thawte Security Certificate. 
                    We use a secure transaction system from Thawte to encrypt and thus protect your credit card details so it is virtually 
                    impossible for unauthorised parties to read any information that you send us. This is a powerful tool which secures 
                    your transaction details with us.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 leading-relaxed">
                      In addition we are enrolled in Trustwave's Trusted Commerce™ program to validate compliance with the Payment Card 
                      Industry Data Security Standard (PCI DSS) mandated by all the major credit card associations including MasterCard and Visa.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-indigo-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What rights you have over your data</h2>
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-gray-600 leading-relaxed">
                    If you have an account on this site, or have left comments, you can request to receive an exported file of the 
                    personal data we hold about you, including any data you have provided to us. You can also request that we erase 
                    any personal data we hold about you. This does not include any data we are obliged to keep for administrative, 
                    legal, or security purposes.
                  </p>
                </div>
              </section>

              <section className="bg-pink-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Where we send your data</h2>
                <div className="bg-white rounded-xl p-4 border border-pink-100">
                  <p className="text-gray-600 leading-relaxed">
                    Visitor comments may be checked through an automated spam detection service.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 