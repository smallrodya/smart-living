"use client";
import React, { useState, useEffect } from "react";
import { useBasket } from "@/context/BasketContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getCookie, setCookie } from 'cookies-next';
import { toast } from 'react-hot-toast';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import StripeCardForm from '@/components/StripeCardForm';

// Инициализация Stripe с fallback
const stripePromise = (async () => {
  try {
    const { loadStripe } = await import('@stripe/stripe-js');
    return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  } catch (error) {
    console.error('Failed to load Stripe:', error);
    return null;
  }
})();

// Apple Pay Domain ID
const APPLE_PAY_DOMAIN_ID = 'pmd_1NbX8hITL54KWsfnQ2r2oVNU';

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

// Wrap the main component with Stripe Elements
export default function CheckoutPageWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}

function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearBasket } = useBasket();
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const [cardElement, setCardElement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stripeError, setStripeError] = useState<string | null>(null);

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
  const [saveCard, setSaveCard] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [smartCoinBalance, setSmartCoinBalance] = useState<number>(0);
  const [useSmartCoins, setUseSmartCoins] = useState(false);
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [applePayLoading, setApplePayLoading] = useState(false);

  useEffect(() => {
    const checkAuthAndBalance = async () => {
      try {
        console.log('Starting auth check...');
        const userCookie = getCookie('user');
        console.log('User cookie:', userCookie);

        if (!userCookie) {
          console.log('No user cookie found, redirecting to login...');
          router.push('/user/login');
          return;
        }

        let userData;
        try {
          userData = JSON.parse(userCookie as string);
          console.log('Parsed user data:', userData);
        } catch (parseError) {
          console.error('Error parsing user cookie:', parseError);
          router.push('/user/login');
          return;
        }

        if (!userData || !userData.userId) {
          console.log('Invalid user data structure:', userData);
          router.push('/user/login');
          return;
        }

        // Fetch complete user data from API
        try {
          console.log('Fetching user profile data...');
          const response = await fetch('/api/user/profile');
          
          if (response.ok) {
            const profileData = await response.json();
            console.log('Profile data received:', profileData);
            
            // Populate form with user data if available
            setForm(prev => ({
              ...prev,
              email: profileData.email || userData.email || '',
              firstName: profileData.firstName || '',
              lastName: profileData.lastName || '',
              company: profileData.company || '',
              country: profileData.country || 'United Kingdom (UK)',
              address: profileData.address || '',
              address2: profileData.address2 || '',
              city: profileData.city || '',
              county: profileData.county || '',
              postcode: profileData.postcode || '',
              phone: profileData.phone || '',
            }));

            // Set Smart Coin balance from profile data
            if (typeof profileData.smartCoins === 'number') {
              setSmartCoinBalance(profileData.smartCoins);
            } else {
              console.log('Smart Coins not found in profile data, setting default value to 0');
              setSmartCoinBalance(0);
            }
          } else {
            console.log('Failed to fetch profile data, using cookie data only');
            // Fallback to cookie data
            setForm(prev => ({
              ...prev,
              email: userData.email || ''
            }));

            // Set Smart Coin balance from cookie
            if (typeof userData.smartCoins === 'number') {
              setSmartCoinBalance(userData.smartCoins);
            } else {
              console.log('Smart Coins not found in user data, setting default value to 0');
              setSmartCoinBalance(0);
              // Обновляем данные пользователя в куки
              const updatedUserData = {
                ...userData,
                smartCoins: 0
              };
              setCookie('user', JSON.stringify(updatedUserData), {
                maxAge: 30 * 24 * 60 * 60, // 30 дней
                path: '/'
              });
            }
          }
        } catch (profileError) {
          console.error('Error fetching profile data:', profileError);
          // Fallback to cookie data
          setForm(prev => ({
            ...prev,
            email: userData.email || ''
          }));

          // Set Smart Coin balance from cookie
          if (typeof userData.smartCoins === 'number') {
            setSmartCoinBalance(userData.smartCoins);
          } else {
            console.log('Smart Coins not found in user data, setting default value to 0');
            setSmartCoinBalance(0);
            // Обновляем данные пользователя в куки
            const updatedUserData = {
              ...userData,
              smartCoins: 0
            };
            setCookie('user', JSON.stringify(updatedUserData), {
              maxAge: 30 * 24 * 60 * 60, // 30 дней
              path: '/'
            });
          }
        }

        setIsLoading(false);
        console.log('Auth check completed successfully');
      } catch (error) {
        console.error('Error in checkAuthAndBalance:', error);
        router.push('/user/login');
      }
    };

    checkAuthAndBalance();
  }, [router]);

  // Check Stripe availability
  useEffect(() => {
    const checkStripe = async () => {
      try {
        const stripeInstance = await stripePromise;
        if (!stripeInstance) {
          setStripeError('Payment processing is temporarily unavailable. Please try again later or contact support.');
        }
      } catch (error) {
        console.error('Stripe check error:', error);
        setStripeError('Payment processing is temporarily unavailable. Please try again later or contact support.');
      }
    };

    checkStripe();
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.clearanceDiscount ? item.price * (1 - item.clearanceDiscount / 100) : item.price) * item.quantity, 0);
  const shippingPrice = SHIPPING_OPTIONS.find(opt => opt.value === shipping)?.price || 0;
  const totalWithShipping = subtotal + shippingPrice;

  // Check Apple Pay availability
  useEffect(() => {
    const checkApplePay = async () => {
      if (!stripe) return;

      try {
        const pr = stripe.paymentRequest({
          country: 'GB',
          currency: 'gbp',
          total: {
            label: 'Smart Living Order',
            amount: Math.round(totalWithShipping * 100), // Convert to pence
          },
          requestPayerName: true,
          requestPayerEmail: true,
          requestPayerPhone: true,
        });

        // Check if Apple Pay is available
        const result = await pr.canMakePayment();
        if (result && result.applePay) {
          setApplePayAvailable(true);
          
          // Handle Apple Pay payment
          pr.on('paymentmethod', async (event: any) => {
            setApplePayLoading(true);
            try {
              // Create payment intent
              const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount: Math.round(totalWithShipping * 100),
                  currency: 'gbp',
                  payment_method_types: ['card', 'apple_pay'],
                }),
              });

              const { clientSecret } = await response.json();

              // Confirm payment
              const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: event.paymentMethod.id,
              });

              if (error) {
                setPaymentError(error.message || 'Payment failed');
                setApplePayLoading(false);
              } else {
                // Payment successful - proceed with order creation
                await createOrder('apple_pay');
              }
            } catch (error) {
              console.error('Apple Pay error:', error);
              setPaymentError('Apple Pay payment failed');
              setApplePayLoading(false);
            }
          });

          pr.on('cancel', () => {
            setApplePayLoading(false);
          });
        }
      } catch (error) {
        console.error('Apple Pay check error:', error);
        setApplePayAvailable(false);
      }
    };

    checkApplePay();
  }, [stripe, totalWithShipping]);

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

  // Function to create order
  const createOrder = async (paymentMethod: string) => {
    try {
      // Update product stock
      console.log('Updating stock...');
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

      // Create order in database
      console.log('Creating order...');
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
          customerDetails: {
            ...form,
            email: form.email
          },
          status: 'DONE'
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await orderResponse.json();
      console.log('Order created:', orderData);

      // Clear basket
      clearBasket();

      toast.success(`Order placed successfully!`);
      router.push("/basket");
    } catch (error) {
      console.error('Error creating order:', error);
      setPaymentError(error instanceof Error ? error.message : 'Failed to create order');
      setApplePayLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Authentication check
    console.log('Starting order submission...');
    const userCookie = getCookie('user');
    console.log('User cookie in handleSubmit:', userCookie);

    if (!userCookie) {
      console.log('No user cookie found in handleSubmit');
      setAuthError('Please login or register to complete your purchase. This will allow you to track your orders in your account.');
      return;
    }

    // Get user email from cookie
    let userData;
    try {
      userData = JSON.parse(userCookie as string);
      console.log('Parsed user data in handleSubmit:', userData);
    } catch (parseError) {
      console.error('Error parsing user cookie in handleSubmit:', parseError);
      setAuthError('Session error. Please login again.');
      return;
    }

    if (!userData || !userData.userId) {
      console.log('Invalid user data in handleSubmit:', userData);
      setAuthError('Session error. Please login again.');
      return;
    }

    // Check if user has enough Smart Coins
    if (useSmartCoins && smartCoinBalance < totalWithShipping) {
      console.log('Not enough Smart Coins:', { balance: smartCoinBalance, required: totalWithShipping });
      setPaymentError(`Not enough Smart Coins. Your balance: ${smartCoinBalance}, Required: ${totalWithShipping}`);
      return;
    }

    setSubmitting(true);
    setPaymentProcessing(true);
    setPaymentError(null);

    try {
      if (useSmartCoins) {
        // Process Smart Coin payment
        console.log('Processing Smart Coin payment...', {
          amount: totalWithShipping,
          userId: userData.userId
        });
        const smartCoinResponse = await fetch('/api/payments/smart-coins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalWithShipping,
            userId: userData.userId
          }),
        });

        const smartCoinData = await smartCoinResponse.json();

        if (!smartCoinResponse.ok) {
          throw new Error(smartCoinData.error || 'Failed to process Smart Coin payment');
        }

        // Update product stock
        console.log('Updating stock...');
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

        // Create order in database
        console.log('Creating order...');
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
            total: totalWithShipping,
            shipping,
            paymentMethod: 'smart_coins',
            customerDetails: {
              ...form,
              email: userData.email
            },
            status: 'DONE'
          }),
        });

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          throw new Error(errorData.error || 'Failed to create order');
        }

        const orderData = await orderResponse.json();
        console.log('Order created:', orderData);

        // Обновляем куки с новым балансом
        if (smartCoinData.userData) {
          setCookie('user', JSON.stringify(smartCoinData.userData), {
            maxAge: 30 * 24 * 60 * 60, // 30 дней
            path: '/'
          });
        }

        // Clear basket
        clearBasket();

        toast.success(`Order placed successfully using Smart Coins!`);
        router.push("/basket");
        return;
      }

      // Regular payment flow continues here...
      // Create Payment Intent
      console.log('Creating payment intent...');
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalWithShipping,
          currency: 'gbp',
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await paymentResponse.json();
      console.log('Payment intent created:', clientSecret);

      // Confirm payment
      if (!stripe || !cardElement) {
        throw new Error('Stripe is not initialized');
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: form.firstName + ' ' + form.lastName,
              email: form.email,
              phone: form.phone,
              address: {
                line1: form.address,
                city: form.city,
                state: form.county,
                postal_code: form.postcode,
                country: 'GB'
              }
            }
          }
        }
      );

      if (paymentError) {
        console.error('Stripe payment error:', paymentError);
        throw new Error(paymentError.message);
      }

      console.log('Payment successful:', paymentIntent);

      // Update product stock
      console.log('Updating stock...');
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

      // Create order in database
      console.log('Creating order...');
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
          paymentIntentId: paymentIntent.id,
          customerDetails: {
            ...form,
            email: userData.email
          },
          status: 'DONE'
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await orderResponse.json();
      console.log('Order created:', orderData);

      // Обновляем куки с новым балансом
      if (orderData.userData) {
        setCookie('user', JSON.stringify(orderData.userData), {
          maxAge: 30 * 24 * 60 * 60, // 30 дней
          path: '/'
        });
      }

      // Clear basket
      clearBasket();

      toast.success(`Order placed successfully! You earned ${orderData.smartCoinEarned} Smart Coins!`);
      router.push("/basket");
    } catch (error) {
      console.error('Error placing order:', error);
      setPaymentError(error instanceof Error ? error.message : "Failed to place order. Please try again.");
      toast.error(error instanceof Error ? error.message : "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
      setPaymentProcessing(false);
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
              
              {/* Smart Coin Section */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 border-2 border-black">
                      <div className="flex items-center justify-center w-8 h-8">
                        <span className="text-white font-bold text-lg tracking-wider">SC</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Smart Coin Rewards</h4>
                      <p className="text-sm text-gray-600">You'll earn 5% of your subtotal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      +{(subtotal * 0.05).toFixed(2)}
                    </div>
                    <p className="text-xs text-gray-500">Smart Coins</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-purple-100">
                  <p className="text-sm text-gray-600">
                    <span className="text-purple-600 font-medium">Smart Coins</span> can be used for future purchases and special offers
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              {/* Stripe Error Display */}
              {stripeError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-medium">Payment System Error</p>
                  <p className="text-sm mt-1">{stripeError}</p>
                </div>
              )}
              
              {/* Payment method selection */}
              <div className="space-y-3 mb-6">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "smart_coins" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="smart_coins"
                    checked={paymentMethod === "smart_coins"}
                    onChange={() => setPaymentMethod("smart_coins")}
                    className="accent-purple-600 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Smart Coins</span>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 rounded-full shadow-md transform hover:scale-105 transition-transform duration-200 border-2 border-black">
                          <div className="flex items-center justify-center w-6 h-6">
                            <span className="text-white font-bold text-sm tracking-wider">SC</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Balance: {smartCoinBalance.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </label>

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

                {/* Apple Pay Option */}
                {applePayAvailable && (
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "apple_pay" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="apple_pay"
                      checked={paymentMethod === "apple_pay"}
                      onChange={() => setPaymentMethod("apple_pay")}
                      className="accent-blue-600 mr-3"
                    />
                    <div className="flex items-center justify-between flex-1">
                      <span className="font-medium">Apple Pay</span>
                      <div className="flex items-center gap-2">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                      </div>
                    </div>
                  </label>
                )}
              </div>

              {/* Payment method forms */}
              {paymentMethod === "smart_coins" && (
                <div className="space-y-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Smart Coin Balance</h4>
                      <p className="text-sm text-gray-600">Available: {smartCoinBalance.toFixed(2)} Smart Coins</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">£{totalWithShipping.toFixed(2)}</div>
                      <p className="text-sm text-gray-600">Required</p>
                    </div>
                  </div>
                  {smartCoinBalance < totalWithShipping ? (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                      <p className="font-medium">Not enough Smart Coins</p>
                      <p className="text-sm mt-1">You need {(totalWithShipping - smartCoinBalance).toFixed(2)} more Smart Coins to complete this purchase.</p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                      <p className="font-medium">Sufficient Balance</p>
                      <p className="text-sm mt-1">You have enough Smart Coins to complete this purchase.</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useSmartCoins}
                      onChange={() => setUseSmartCoins(!useSmartCoins)}
                      className="accent-purple-600"
                      id="useSmartCoins"
                      disabled={smartCoinBalance < totalWithShipping}
                    />
                    <label htmlFor="useSmartCoins" className="text-sm text-gray-600">
                      Use Smart Coins for this purchase
                    </label>
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4 bg-gray-50 rounded-lg p-6 border mb-4">
                  <StripeCardForm 
                    onCardChange={setCardComplete} 
                    onCardElementReady={handleCardElementReady}
                  />
                  {paymentError && (
                    <div className="text-red-600 text-sm mt-2">
                      {paymentError}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={() => setSaveCard(!saveCard)}
                      className="accent-blue-600"
                      id="saveCard"
                    />
                    <label htmlFor="saveCard" className="text-sm text-gray-600">
                      Save card for future purchases
                    </label>
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

              {paymentMethod === "apple_pay" && (
                <div className="space-y-4 bg-gray-50 rounded-lg p-6 border mb-4">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!stripe) return;
                        try {
                          const pr = stripe.paymentRequest({
                            country: 'GB',
                            currency: 'gbp',
                            total: {
                              label: 'Smart Living Order',
                              amount: Math.round(totalWithShipping * 100),
                            },
                            requestPayerName: true,
                            requestPayerEmail: true,
                            requestPayerPhone: true,
                          });

                          const result = await pr.canMakePayment();
                          if (result && result.applePay) {
                            pr.on('paymentmethod', async (event: any) => {
                              setApplePayLoading(true);
                              try {
                                const response = await fetch('/api/create-payment-intent', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    amount: Math.round(totalWithShipping * 100),
                                    currency: 'gbp',
                                    payment_method_types: ['card', 'apple_pay'],
                                  }),
                                });

                                const { clientSecret } = await response.json();
                                const { error } = await stripe.confirmCardPayment(clientSecret, {
                                  payment_method: event.paymentMethod.id,
                                });

                                if (error) {
                                  setPaymentError(error.message || 'Payment failed');
                                  setApplePayLoading(false);
                                } else {
                                  await createOrder('apple_pay');
                                }
                              } catch (error) {
                                console.error('Apple Pay error:', error);
                                setPaymentError('Apple Pay payment failed');
                                setApplePayLoading(false);
                              }
                            });

                            pr.on('cancel', () => {
                              setApplePayLoading(false);
                            });

                            await pr.show();
                          }
                        } catch (error) {
                          console.error('Apple Pay error:', error);
                          setPaymentError('Apple Pay is not available');
                        }
                      }}
                      disabled={applePayLoading}
                      className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {applePayLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          Pay with Apple Pay
                        </>
                      )}
                    </button>
                  </div>
                  {paymentError && (
                    <div className="text-red-600 text-sm mt-2">
                      {paymentError}
                    </div>
                  )}
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
                disabled={submitting || paymentProcessing || (paymentMethod === "card" && !cardComplete) || !!stripeError || paymentMethod === "apple_pay"}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 text-lg"
              >
                {submitting || paymentProcessing ? "Processing payment..." : stripeError ? "Payment Unavailable" : paymentMethod === "apple_pay" ? "Use Apple Pay Button Above" : "Place Order"}
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