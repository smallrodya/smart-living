"use client";
import React, { useState, useEffect, useRef } from "react";
import { useBasket } from "@/context/BasketContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { toast } from 'react-hot-toast';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import StripeCardForm from '@/components/StripeCardForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const SHIPPING_OPTIONS = [
  { label: "Free Shipping", value: "free", price: 0 },
  { label: "Express Delivery:", value: "express", price: 5.99 },
];

function GuestCheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const { items, clearBasket } = useBasket();
  const router = useRouter();
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
  const [shipping, setShipping] = useState("free");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardComplete, setCardComplete] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [cardElement, setCardElement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [promocode, setPromocode] = useState("");
  const [promocodeChecked, setPromocodeChecked] = useState(false);
  const [promocodeDiscount, setPromocodeDiscount] = useState<number>(0);
  const [promocodeError, setPromocodeError] = useState<string | null>(null);
  const [smartCoinBalance, setSmartCoinBalance] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const orderDraftIdRef = useRef<string | undefined>(undefined);

  const subtotal = items.reduce((sum, item) => sum + (item.clearanceDiscount ? item.price * (1 - item.clearanceDiscount / 100) : item.price) * item.quantity, 0);
  const shippingPrice = SHIPPING_OPTIONS.find(opt => opt.value === shipping)?.price || 0;
  const discountAmount = promocodeDiscount > 0 ? subtotal * (promocodeDiscount / 100) : 0;
  const totalWithShipping = subtotal - discountAmount + shippingPrice;

  useEffect(() => {
    const checkStripe = async () => {
      try {
        const stripeInstance = await stripePromise;
        if (!stripeInstance) {
          setStripeError('Payment processing is temporarily unavailable. Please check your internet connection and try again later.');
        } else {
          setStripeError(null);
        }
      } catch {
        setStripeError('Payment processing is temporarily unavailable. Please try again later or contact support.');
      }
    };
    checkStripe();
  }, []);

  useEffect(() => {
    if (
      items.length === 0 ||
      !form.email ||
      !form.firstName ||
      !form.lastName ||
      !form.address ||
      !form.city ||
      !form.postcode ||
      !form.phone
    ) {
      setClientSecret(null);
      return;
    }
    const createIntent = async () => {
      const draftOrderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total: totalWithShipping,
          shipping,
          paymentMethod,
          paymentIntentId: null,
          customerDetails: { ...form, email: form.email },
          status: 'DRAFT'
        }),
      });
      let orderDraftId = undefined;
      if (draftOrderResponse.ok) {
        const draftData = await draftOrderResponse.json();
        orderDraftId = draftData._id || draftData.orderId;
        orderDraftIdRef.current = orderDraftId;
      }
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalWithShipping, currency: 'gbp', email: form.email, orderDraftId }),
      });
      if (paymentResponse.ok) {
        const { clientSecret } = await paymentResponse.json();
        setClientSecret(clientSecret);
      }
    };
    createIntent();
  }, [items, form.email, form.firstName, form.lastName, form.address, form.city, form.postcode, form.phone, totalWithShipping]);

  useEffect(() => {
    if (!promocode) {
      setPromocodeDiscount(0);
      setPromocodeError(null);
      return;
    }
    fetch("/api/promocodes")
      .then(res => res.json())
      .then((codes) => {
        const found = codes.find((c: any) => c.code.toLowerCase() === promocode.trim().toLowerCase());
        if (found) {
          setPromocodeDiscount(found.discount);
          setPromocodeError(null);
        } else {
          setPromocodeDiscount(0);
          setPromocodeError("Invalid promocode");
        }
      });
  }, [promocode]);

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

  const handleCardElementReady = (element: any) => {
    setCardElement(element);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitting(true);
    setPaymentProcessing(true);
    setPaymentError(null);
    setShowLoader(true);
    let result = null;
    try {
      if (paymentMethod === "card") {
        if (!stripe || !elements) throw new Error('Stripe не инициализирован');
        result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: form.firstName + ' ' + form.lastName,
              email: form.email,
              phone: form.phone,
              address: {
                line1: form.address,
                city: form.city,
                state: form.county,
                postal_code: form.postcode,
                country: 'GB',
              },
            },
          },
        },
        redirect: 'if_required',
      });
      if (result.error) throw new Error(result.error.message);
      }
      if (paymentMethod === "smart_coins" && smartCoinBalance < totalWithShipping) {
        throw new Error("Недостаточно Smart Coins для оплаты.");
      }
      const response = await fetch('/api/products/update-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(item => ({ title: item.title, size: item.size, quantity: item.quantity })) }),
      });
      if (!response.ok) throw new Error('Не удалось обновить остатки товаров');
      // НЕ создаём новый заказ! Просто редиректим на order-status с orderDraftId
      if (!orderDraftIdRef.current) throw new Error('Order ID не найден. Попробуйте ещё раз.');
      router.push(`/order-status?orderId=${orderDraftIdRef.current}`);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Не удалось оформить заказ. Попробуйте еще раз.');
      toast.error(error instanceof Error ? error.message : 'Не удалось оформить заказ. Попробуйте еще раз.');
      // Не очищаем корзину и не редиректим
    } finally {
      setSubmitting(false);
      setPaymentProcessing(false);
      setShowLoader(false);
    }
  };

  const handleSuccess = (orderId?: string) => {
    clearBasket();
    if (orderId) {
      router.push(`/ordercomplete?orderId=${orderId}`);
    } else {
      router.push('/ordercomplete');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Checkout as Guest</h1>
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
              {items.map((item: any) => (
                <div key={item.id} className="grid grid-cols-2 items-center py-2 border-b border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{item.title} <span className="font-normal text-gray-500">× {item.quantity}</span></span>
                    {item.size && <span className="text-xs text-gray-400">Size: {item.size}</span>}
                    {item.sku && <span className="text-xs text-gray-400">SKU: {item.sku}</span>}
                  </div>
                  <div className="text-right text-gray-900">£{((item.clearanceDiscount ? item.price * (1 - item.clearanceDiscount / 100) : item.price) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Promocode</label>
                <div className="flex items-center gap-2">
                  <input
                    className="border rounded px-3 py-2 w-40"
                    value={promocode}
                    onChange={e => setPromocode(e.target.value)}
                    placeholder="Enter promocode"
                  />
                  <input
                    type="checkbox"
                    checked={promocodeChecked}
                    onChange={e => setPromocodeChecked(e.target.checked)}
                    className="accent-blue-600"
                  />
                  <span className="text-xs text-gray-500">Apply</span>
                </div>
                {promocodeError && <div className="text-xs text-red-600 mt-1">{promocodeError}</div>}
                {promocodeDiscount > 0 && !promocodeError && (
                  <div className="text-xs text-green-700 mt-1">Discount: -{promocodeDiscount}%</div>
                )}
              </div>
              <div className="grid grid-cols-2 font-semibold py-3 border-b border-gray-200">
                <span>Subtotal</span>
                <span className="text-right">£{subtotal.toFixed(2)}</span>
              </div>
              {promocodeDiscount > 0 && !promocodeError && (
                <div className="grid grid-cols-2 py-2 border-b border-gray-200 text-green-700">
                  <span>Promocode</span>
                  <span className="text-right">-£{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="grid grid-cols-2 py-3 border-b border-gray-200 items-center">
                <span className="font-semibold">Shipping</span>
                <div className="flex flex-col gap-2 text-right">
                  {SHIPPING_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center justify-end gap-2 text-sm font-normal cursor-pointer relative">
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.value}
                        checked={shipping === opt.value}
                        onChange={() => setShipping(opt.value)}
                        className="accent-blue-600"
                      />
                      <span
                        className="font-normal"
                        onMouseEnter={() => setTooltip(opt.value)}
                        onMouseLeave={() => setTooltip(null)}
                        style={{ position: 'relative' }}
                      >
                        {opt.label}{opt.price > 0 && <span> <b>£{opt.price.toFixed(2)}</b></span>}
                        {tooltip === opt.value && (
                          <span style={{
                            position: 'absolute',
                            right: 0,
                            top: '100%',
                            zIndex: 10,
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 1rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            fontSize: '0.85rem',
                            color: '#374151',
                            marginTop: '0.25rem',
                            minWidth: '140px',
                            textAlign: 'left',
                            fontWeight: 400,
                          }}>
                            {opt.value === 'free' ? '2-5 working days' : '1-2 working days'}
                          </span>
                        )}
                      </span>
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
              {stripeError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-medium">Payment System Error</p>
                  <p className="text-sm mt-1">{stripeError}</p>
                </div>
              )}
              {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-medium">Payment Error</p>
                  <p className="text-sm mt-1">{paymentError}</p>
                </div>
              )}
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
                      <span className="font-medium">Card</span>
                      <div className="flex gap-2">
                        <img src="/Visa_2021.svg.png" alt="Visa" style={{ height: 10, width: 'auto', marginRight: 8 }} />
                        <img src="/Mastercard-logo.svg.png" alt="MasterCard" style={{ height: 10, width: 'auto', marginRight: 8 }} />
                        <img src="/American_Express_logo_(2018).svg.png" alt="Amex" style={{ height: 16, width: 'auto', marginRight: 8 }} />
                        <img src="/UnionPay_logo.svg.png" alt="UnionPay" style={{ height: 16, width: 'auto', marginRight: 0 }} />
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeCardForm clientSecret={clientSecret} onSuccess={handleSuccess} amount={Math.round(totalWithShipping * 100)} />
                </Elements>
              )}
            </div>
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || paymentProcessing || (paymentMethod === "card" && !cardComplete) || !!stripeError}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 text-lg"
              >
                {submitting || paymentProcessing ? "Processing payment..." : stripeError ? "Payment Unavailable" : "Place Order"}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-6 border-t pt-4">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="/privacy" className="underline font-medium">privacy policy</a>.
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {showLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-semibold text-gray-800">Processing payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuestCheckoutPageWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <GuestCheckoutPage />
    </Elements>
  );
} 