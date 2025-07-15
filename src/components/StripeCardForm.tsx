import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

interface StripeCardFormProps {
  clientSecret: string;
  onSuccess: () => void;
  amount: number; // сумма в пенсах
}

export default function StripeCardForm({ clientSecret, onSuccess, amount }: StripeCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [prSupported, setPrSupported] = useState(false);

  useEffect(() => {
    if (stripe && amount > 0) {
      const pr = stripe.paymentRequest({
        country: 'GB',
        currency: 'gbp',
        total: { label: 'Total', amount },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      pr.canMakePayment().then(result => {
        console.log('Stripe paymentRequest canMakePayment result:', result);
        if (result) {
          setPrSupported(true);
          setPaymentRequest(pr);
        } else {
          setPrSupported(false);
        }
      }).catch(err => {
        console.error('Stripe paymentRequest canMakePayment error:', err);
        setPrSupported(false);
      });
    }
  }, [stripe, amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    });
    setLoading(false);
    if (result.error) {
      setError(result.error.message || 'Payment failed');
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <>
      {paymentRequest && prSupported && (
        <div className="mb-4">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}
      {!prSupported && (
        <div className="text-sm text-gray-500 mb-2">
          Apple Pay / Google Pay are not supported on this device or browser
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <PaymentElement options={{ layout: 'tabs' }} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold mt-2"
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </>
  );
} 