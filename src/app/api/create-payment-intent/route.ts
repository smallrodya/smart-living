import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil'
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'gbp' } = await req.json();
    
    // Создаем Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe работает в центах
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: 'accept_a_payment'
      }
    });

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