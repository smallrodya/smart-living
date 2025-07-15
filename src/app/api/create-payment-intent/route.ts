import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil'
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'gbp' } = await req.json();
    
    console.log('Creating payment intent with:', { amount, currency });
    
    // Преобразуем сумму в центы (Stripe ожидает целые числа)
    const amountInCents = Math.round(amount * 100);
    
    console.log('Amount in cents:', amountInCents);
    
    // Создаем Payment Intent
    const paymentIntentConfig: any = {
      amount: amountInCents, // amount в центах
      currency,
      metadata: {
        integration_check: 'accept_a_payment'
      },
      automatic_payment_methods: { enabled: true }
    };

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentConfig);

    console.log('Payment intent created:', paymentIntent.id);

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
} 