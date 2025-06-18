import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil'
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'gbp', payment_method_types = ['card'], payment_method_data } = await req.json();
    
    console.log('Creating payment intent with:', { amount, currency, payment_method_types, payment_method_data });
    
    // Создаем Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // amount уже в центах
      currency,
      payment_method_types,
      payment_method_data,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: 'accept_a_payment'
      }
    });

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