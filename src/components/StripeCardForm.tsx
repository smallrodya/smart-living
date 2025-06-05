import React, { useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripeCardFormProps {
  onCardChange: (isComplete: boolean) => void;
  onCardElementReady: (element: any) => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export default function StripeCardForm({ onCardChange, onCardElementReady }: StripeCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        onCardElementReady(cardElement);
      }
    }
  }, [elements, onCardElementReady]);

  const handleCardChange = (event: any) => {
    onCardChange(event.complete);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card details
        </label>
        <div className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleCardChange}
          />
        </div>
      </div>
    </div>
  );
} 