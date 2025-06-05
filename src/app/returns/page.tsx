"use client";
import React from "react";
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Customer Satisfaction Complaints & Returns</h1>
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
                We hope that you will be delighted with the products and service you receive from Smart Living Wholesale Ltd. 
                We understand however that sometimes things can go wrong. Should this happen, we would like the opportunity to 
                make amends as soon as possible.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you are ever less than 100% satisfied with any aspect of the Smart Living service or any product you receive 
                from us, please contact us right away or call us on the above number.
              </p>
            </section>

            <section className="mb-12 bg-green-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Returns Guide
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Damaged or faulty goods</span>
                        <p className="text-gray-600 mt-1">We will pick them up, no cost to you, and we will replace, provide an alternative or refund.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Cancelation prior to us sending</span>
                        <p className="text-gray-600 mt-1">No problem, just call or email us to stop it going out.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Unwanted Items</span>
                        <p className="text-gray-600 mt-1">30 days with no questions as to why you want to send it back. Please note that you will be responsible for the postal costs of returning the item.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">Return Conditions</span>
                        <p className="text-gray-600 mt-1">The item must be returned in a sellable condition, which means:</p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                          <li>Unused, undamaged, and unworn</li>
                          <li>In its original packaging, with all tags, labels, and any included accessories or documentation intact</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-purple-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Damaged or Faulty Goods
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-purple-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    In the unlikely event your order reaches you in less than perfect condition please call or email us right away.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    If the product is damaged or faulty, we will collect your order at no cost to you and replace it or provide 
                    an agreed alternative or offer a full refund.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Order Cancellation / Unwanted Goods
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-yellow-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You have the right to cancel your order unconditionally, and to request a full refund, for any standard item* 
                    purchased on this web-site but not yet despatched. Or to return your order after it arrives within 30 days of that arrival.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p className="text-gray-600 text-sm">
                      * Standard items are items which have not been produced to your specific measurements.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      We are unable to accept cancellation or return of items made or cut to your specification.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 bg-red-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                How to Return Goods Yourself
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-red-100">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    For unwanted goods, please contact us by phone, email or via the post, within 14 days of receipt (starting the day after delivery), 
                    to let us know that you will be returning goods and the reason for the return.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You must take reasonable care of the goods and return them, at your own expense, securely packaged and in saleable condition, 
                    to the Returns Address shown below.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We recommend that you use a recorded delivery service and that you adequately insure the goods for the return journey 
                    so that the full value is covered in event of loss or damage.
                  </p>
                </div>
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
                      <script type="module" src="https://button.atlast.co/at-last.js"></script>
                      <at-last 
                        merchant="smart-living" 
                        icon="https://cdn.atlast.co/merchants/164c2a50-77e9-47f6-b2dd-12c277ed43ff/square-1711553919907.jpg" 
                        color="#4F46E5" 
                        shape="pill" 
                        width="200" 
                        height="50"
                      ></at-last>
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