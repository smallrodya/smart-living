"use client";
import React, { useState } from "react";
import { useBasket } from "@/context/BasketContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getCookie } from 'cookies-next';
import { toast } from 'react-hot-toast';

interface BasketItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  sku?: string;
  stock?: number;
  clearanceDiscount?: number;
}

const SHIPPING_OPTIONS = [
  { label: "Free Shipping", value: "free", price: 0 },
  { label: "Express Delivery:", value: "express", price: 5.99 },
];

export default function CheckoutPage() {
  const { items, total, clearBasket } = useBasket();
  const router = useRouter();
  const [authError, setAuthError] = useState('');

  const [form, setForm] = useState({
    email: "",
    newsletter: false,
    firstName: "",
    lastName: "",
    company: "",
    country: "United Kingdom (UK)",
    address: "",
    address2: "",
    city: "",
    county: "",
    postcode: "",
    phone: "",
    subscribe: false,
    deliverDifferent: false,
    orderNotes: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [shipping, setShipping] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveCard, setSaveCard] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.address) newErrors.address = "Street address is required";
    if (!form.city) newErrors.city = "Town / City is required";
    if (!form.postcode) newErrors.postcode = "Postcode is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Проверка авторизации
    const userCookie = getCookie('user');
    if (!userCookie) {
      setAuthError('Please login or register to complete your purchase. This will allow you to track your orders in your account.');
      return;
    }

    setSubmitting(true);
    try {
      // Обновляем количество товара
      const response = await fetch('/api/products/update-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            title: item.title,
            size: item.size,
            quantity: item.quantity
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update stock');
      }

      // Создаем заказ в базе данных
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          total: totalWithShipping,
          shipping,
          paymentMethod,
          customerDetails: form,
          status: 'DONE'
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      // Очищаем корзину
      clearBasket();

      toast.success('Order placed successfully!');
      router.push("/basket");
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error instanceof Error ? error.message : "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.clearanceDiscount ? item.price * (1 - item.clearanceDiscount / 100) : item.price) * item.quantity, 0);
  const shippingPrice = SHIPPING_OPTIONS.find(opt => opt.value === shipping)?.price || 0;
  const totalWithShipping = subtotal + shippingPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Billing Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={form.newsletter}
                  onChange={handleChange}
                  id="newsletter"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  Sign me up for the newsletter!
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country/Region *
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flat, suite, unit, etc. (optional)
                </label>
                <input
                  type="text"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={form.postcode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {errors.postcode && <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="deliverDifferent"
                  checked={form.deliverDifferent}
                  onChange={handleChange}
                  id="deliverDifferent"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="deliverDifferent" className="text-sm text-gray-600">
                  Deliver to a different address?
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order notes (optional)
                </label>
                <textarea
                  name="orderNotes"
                  value={form.orderNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">YOUR ORDER</h2>
            <div className="w-full">
              <div className="grid grid-cols-2 font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-3">
                <span>PRODUCT</span>
                <span className="text-right">SUBTOTAL</span>
              </div>
              {items.map((item: BasketItem) => (
                <div key={item.id} className="grid grid-cols-2 items-center py-2 border-b border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{item.title} <span className="font-normal text-gray-500">× {item.quantity}</span></span>
                    {item.size && <span className="text-xs text-gray-400">Size: {item.size}</span>}
                    {item.sku && <span className="text-xs text-gray-400">SKU: {item.sku}</span>}
                    {item.stock !== undefined && <span className="text-xs text-gray-400">Stock: {item.stock}</span>}
                  </div>
                  <div className="text-right text-gray-900">£{((item.clearanceDiscount ? item.price * (1 - item.clearanceDiscount / 100) : item.price) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="grid grid-cols-2 font-semibold py-3 border-b border-gray-200">
                <span>Subtotal</span>
                <span className="text-right">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 py-3 border-b border-gray-200 items-center">
                <span className="font-semibold">Shipping</span>
                <div className="flex flex-col gap-2 text-right">
                  {SHIPPING_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center justify-end gap-2 text-sm font-normal cursor-pointer">
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.value}
                        checked={shipping === opt.value}
                        onChange={() => setShipping(opt.value)}
                        className="accent-blue-600"
                      />
                      <span className={opt.value === "express" ? "font-bold" : ""}>{opt.label}{opt.price > 0 && <span> <b>£{opt.price.toFixed(2)}</b></span>}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 font-bold text-lg py-3 border-b border-gray-200">
                <span>Total</span>
                <span className="text-right">£{totalWithShipping.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              {/* Payment method selection */}
              <div className="space-y-3 mb-6">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-blue-600 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Credit/Debit Card</span>
                      <div className="flex gap-2">
                        <img src="/Visa_2021.svg.png" alt="Visa" className="h-6 object-contain" />
                        <img src="/Mastercard-logo.svg.png" alt="MasterCard" className="h-6 object-contain" />
                        <img src="/American_Express_logo_(2018).svg.png" alt="Amex" className="h-6 object-contain" />
                        <img src="/UnionPay_logo.svg.png" alt="UnionPay" className="h-6 object-contain" />
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="accent-blue-600 mr-3"
                  />
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-medium">PayPal</span>
                    <img src="/PayPal_logo.svg.png" alt="PayPal" className="h-6 object-contain" />
                  </div>
                </label>

                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "gpay" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="gpay"
                    checked={paymentMethod === "gpay"}
                    onChange={() => setPaymentMethod("gpay")}
                    className="accent-blue-600 mr-3"
                  />
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-medium">Google Pay</span>
                    <img src="/Google_Pay_Logo.svg.png" alt="Google Pay" className="h-6 object-contain" />
                  </div>
                </label>

                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "klarna" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="klarna"
                    checked={paymentMethod === "klarna"}
                    onChange={() => setPaymentMethod("klarna")}
                    className="accent-blue-600 mr-3"
                  />
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-medium">Klarna</span>
                    <img src="/Klarna_Payment_Badge.svg.png" alt="Klarna" className="h-6 object-contain" />
                  </div>
                </label>
              </div>

              {/* Payment method forms */}
              {paymentMethod === "card" && (
                <div className="space-y-4 bg-gray-50 rounded-lg p-6 border mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 1234 1234 1234"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      autoComplete="cc-number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry date</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM / YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Security code</label>
                      <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoComplete="cc-csc"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={() => setSaveCard(!saveCard)}
                      className="accent-blue-600"
                      id="saveCard"
                    />
                    <label htmlFor="saveCard" className="text-sm text-gray-600">Save card for future purchases</label>
                  </div>
                </div>
              )}

              {paymentMethod === "gpay" && (
                <div className="bg-gray-50 rounded-lg p-6 border flex items-center justify-center">
                  <span className="text-gray-600">Google Pay integration will appear here</span>
                </div>
              )}
              
              {paymentMethod === "klarna" && (
                <div className="bg-gray-50 rounded-lg p-6 border flex items-center justify-center">
                  <span className="text-gray-600">Klarna payment options will appear here</span>
                </div>
              )}
              
              {paymentMethod === "paypal" && (
                <div className="bg-gray-50 rounded-lg p-6 border flex items-center justify-center">
                  <span className="text-gray-600">You will be redirected to PayPal to complete your payment</span>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <div className="space-y-4">
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">Authentication Required</p>
                  <p className="text-sm mt-1">{authError}</p>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => router.push('/user/login')}
                      className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push('/user/register')}
                      className="text-sm bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 text-lg"
              >
                {submitting ? "Placing order..." : "Place Order"}
              </button>
            </div>

            {/* Info text */}
            <div className="text-xs text-gray-500 mt-6 border-t pt-4">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="/privacy" className="underline font-medium">privacy policy</a>.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 