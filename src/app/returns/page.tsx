"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'at-last': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        merchant?: string;
        icon?: string;
        color?: string;
        shape?: string;
        width?: string | number;
        height?: string | number;
      };
    }
  }
}

export default function ReturnsPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Проверяем, не загружен ли уже скрипт
    if (document.querySelector('script[src="https://button.atlast.co/at-last.js"]')) {
      setScriptLoaded(true);
      return;
    }

    // Создаем и загружаем скрипт
    const script = document.createElement('script');
    script.src = 'https://button.atlast.co/at-last.js';
    script.type = 'module';
    script.onload = () => {
      setScriptLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load at-last script');
    };
    
    document.head.appendChild(script);

    // Очистка при размонтировании
    return () => {
      const existingScript = document.querySelector('script[src="https://button.atlast.co/at-last.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Returns & Refund Policy</h1>
            <p className="text-gray-500 text-sm">
              Last updated: {formatDate(new Date())}
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <section className="mb-12 bg-blue-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Our Commitment
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We aim to provide a hassle-free returns experience. Whether you purchased from our website or a third-party platform, we strive to ensure your concerns are resolved promptly and fairly. Our policy complies with all applicable UK consumer protection laws, including the Consumer Contracts Regulations 2013 and the Consumer Rights Act 2015.
              </p>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Scope & Eligibility
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This policy applies to items sold and fulfilled directly by Smart Living Wholesale Ltd, including those purchased on:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                    <li>Our official website: www.smart-living.co.uk</li>
                    <li>Authorised third-party platforms such as Amazon, eBay, Debenhams and others.</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Important distinctions:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                    <li>If the product was sold and fulfilled by Smart Living Wholesale Ltd, this policy applies fully.</li>
                    <li>If the product was sold by Smart Living Wholesale Ltd but fulfilled by a third party (e.g., via Amazon FBA), you must follow the returns process of that platform.</li>
                    <li>If the product was not sold by Smart Living Wholesale Ltd, please contact the seller you purchased from directly.</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Any items mistakenly returned to us that are not eligible under this policy are held at the sender's own risk. We are not responsible for their safekeeping and may dispose of them if unclaimed after 7 days of receipt.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Your Rights Under UK Law
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Your legal rights are protected under the following:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                    <li>Consumer Contracts Regulations 2013: You can cancel your order for most goods bought online within 14 days of delivery.</li>
                    <li>Consumer Rights Act 2015: Goods must be of satisfactory quality, fit for purpose, and as described. If not, you are entitled to a refund, repair, or replacement.</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Nothing in this policy affects your statutory rights.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Cancellation Rights (Distance Selling)
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You may cancel your online order of standard (non-personalized) items:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                    <li>Notify us within 14 days of receiving the item.</li>
                    <li>Return the item within 14 days of cancellation notice.</li>
                    <li>Goods must be unused, undamaged, with all labels/tags, and in original, saleable packaging.</li>
                    <li>Return shipping is at your expense unless otherwise agreed.</li>
                    <li>Refunds are issued within 14 days of receiving the returned item.</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-600 text-sm">
                    Initial delivery charges (if applicable) will only be refunded if the order is cancelled prior to dispatch.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Damaged, Faulty or Incorrect Items
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If your order arrives faulty, damaged, or incorrect:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                    <li>Contact us within 30 days of receipt.</li>
                    <li>We will offer a free return or collection service, depending on item size and location.</li>
                    <li>You may choose a replacement, exchange, or full refund.</li>
                    <li>Refunds are processed within 14 days of receiving the item or confirming the fault.</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This complies with the Consumer Rights Act 2015.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                Change of Mind (Unwanted Items)
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-pink-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you no longer want your item:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                    <li>Notify us within 14 days of delivery.</li>
                    <li>Return the item within 30 days of receipt.</li>
                    <li>Items must be unused, undamaged, with all labels/tags, and with original, saleable packaging.</li>
                    <li>Return postage is at your expense unless otherwise agreed.</li>
                    <li>We recommend using a tracked or signed-for delivery service.</li>
                  </ul>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-600 text-sm">
                    Refunds will be processed within 14 days of receiving the return or proof of postage.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-indigo-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">7</span>
                How to Return an Item
              </h2>
              <div className="bg-white rounded-xl p-4 border border-indigo-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  To initiate a return:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                  <li>Contact us via email (support@smart-living.co.uk) or phone with your order number and reason for return.</li>
                  <li>Wait for confirmation and instructions before sending anything.</li>
                  <li>Pack the item securely with original packaging and accessories.</li>
                  <li>If eligible, use the prepaid return label provided, or arrange your own return.</li>
                  <li>Return Address:<br/>
                    <div className="ml-4">
                      Smart Living Wholesale Ltd<br/>
                      Unit 2, Block 5<br/>
                      Grazebrook Industrial Park<br/>
                      Peartree Lane<br/>
                      Dudley<br/>
                      DY2 0XW<br/>
                      United Kingdom
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">8</span>
                Non-Returnable Items
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  We are unable to accept returns of:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                  <li>Personalized or custom-made items.</li>
                  <li>Items returned outside the eligible return period.</li>
                  <li>Items not purchased directly from Smart Living Wholesale Ltd.</li>
                </ul>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">9</span>
                Unclaimed or Ineligible Returns
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Items returned to us in error (e.g. not purchased from us):
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                  <li>Must be collected within 7 days of our receiving them.</li>
                  <li>Are returned at your own risk; we are not responsible for condition or storage.</li>
                  <li>May be disposed of after 7 days without further notice.</li>
                </ul>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">10</span>
                Contact Us
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  For questions or to initiate a return, contact us:
                </p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    Phone: 01384 521170 (Mon–Fri, 10:30–18:00)<br/>
                    Email: support@smart-living.co.uk<br/>
                    Website: www.smart-living.co.uk
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">11</span>
                Please Note – Seller Rights:
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  In accordance with UK consumer law, we reserve the right to inspect returned items before processing a refund. If the item is not returned in a resaleable (sellable) condition, or if it has been used, damaged, or altered in any way, we may reject the return or apply a partial refund. This is to ensure fairness and compliance with legal standards.
                </p>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">12</span>
                Legal Rights
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nothing in this policy affects your statutory rights under UK law, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                  <li>Consumer Rights Act 2015</li>
                  <li>Consumer Contracts Regulations 2013</li>
                </ul>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">13</span>
                Policy Updates
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may update this policy from time to time. Changes will not affect your statutory rights.
                </p>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">14</span>
                Refund Timeline:
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Returned parcels usually take 3–7 working days to reach us. They are first sent to a central depot, then forwarded to our warehouse for inspection.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  All refunds will be issued within 14 days of either the cancellation of your order or the receipt of the returned goods, whichever is later.
                </p>
              </div>
            </section>

            <section className="mb-12 bg-pink-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">15</span>
                Summary Table
              </h2>
              <div className="bg-white rounded-xl p-4 border border-pink-100">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-pink-50">
                      <th className="border border-pink-100 px-4 py-2">Situation</th>
                      <th className="border border-pink-100 px-4 py-2">Notify Us By</th>
                      <th className="border border-pink-100 px-4 py-2">Return Window</th>
                      <th className="border border-pink-100 px-4 py-2">Cost of Return / Refund Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-pink-100 px-4 py-2">Change of mind</td>
                      <td className="border border-pink-100 px-4 py-2">Within 14 days of delivery</td>
                      <td className="border border-pink-100 px-4 py-2">Return within 30 days</td>
                      <td className="border border-pink-100 px-4 py-2">Customers pay return; Refund within 14 days of return</td>
                    </tr>
                    <tr>
                      <td className="border border-pink-100 px-4 py-2">Faulty/damaged/wrong item</td>
                      <td className="border border-pink-100 px-4 py-2">Within 30 days</td>
                      <td className="border border-pink-100 px-4 py-2">As agreed,</td>
                      <td className="border border-pink-100 px-4 py-2">Free return; Refund or replacement within 14 days</td>
                    </tr>
                    <tr>
                      <td className="border border-pink-100 px-4 py-2">Pre-dispatch cancellation</td>
                      <td className="border border-pink-100 px-4 py-2">Before dispatch</td>
                      <td className="border border-pink-100 px-4 py-2">n/a</td>
                      <td className="border border-pink-100 px-4 py-2">Full refund (no dispatch)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-indigo-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Returns Address</h2>
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Whether you return the goods yourself or use our collection service, please affix a label, showing the return address below, 
                    together with your invoice number.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-600">
                      Smart Living Wholesale Ltd<br />
                      Unit-2, Block-5<br />
                      Grazebrook Industrial Park<br />
                      Peartree Lane<br />
                      Dudley<br />
                      DY2 0XW
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <p className="text-gray-600 font-medium">
                      In order to start the Automatic Returns, Please click the button below
                    </p>
                    <div className="flex justify-center">
                      {scriptLoaded ? (
                        <at-last 
                          merchant="smart-living" 
                          icon="https://cdn.atlast.co/merchants/164c2a50-77e9-47f6-b2dd-12c277ed43ff/square-1711553919907.jpg" 
                          color="#4F46E5" 
                          shape="pill" 
                          width="200" 
                          height="50"
                        ></at-last>
                      ) : (
                        <div className="w-[200px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center">
                          <div className="animate-pulse text-gray-500 text-sm">Loading...</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-pink-50 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Refunds</h2>
                <div className="bg-white rounded-xl p-4 border border-pink-100">
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      All refunds will be processed within 14 days of cancellation of your order or receipt of your returned goods.
                    </p>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Please Note – Seller Rights:</h3>
                      <p className="text-gray-600 text-sm">
                        In accordance with UK consumer law, we reserve the right to inspect returned items before processing a refund. 
                        If the item is not returned in a resaleable (sellable) condition, or if it has been used, damaged, or altered 
                        in any way, we may reject the return or apply a partial refund. This is to ensure fairness and compliance with 
                        legal standards.
                      </p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Refund Timeline:</h3>
                      <p className="text-gray-600 text-sm">
                        Returned parcels usually take 3–7 working days to reach us. They are first sent to a central depot, 
                        then forwarded to our warehouse for inspection.
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        All refunds will be issued within 14 days of either the cancellation of your order or the receipt of 
                        the returned goods—whichever is later.
                      </p>
                    </div>
                  </div>
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