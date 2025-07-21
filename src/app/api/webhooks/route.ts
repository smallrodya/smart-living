import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('Received webhook event:', event.type);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        try {
          const { db } = await connectToDatabase();
          const orderDraftId = paymentIntent.metadata?.orderDraftId;
          if (orderDraftId) {
            // Обновляем черновик заказа
            const updateResult = await db.collection('orders').updateOne(
              { _id: new (require('mongodb').ObjectId)(orderDraftId) },
              { $set: {
                  status: 'DONE',
                  paymentIntentId: paymentIntent.id,
                  updatedAt: new Date().toISOString()
                }
              }
            );
            if (updateResult.matchedCount > 0) {
              console.log('Order draft updated to DONE for paymentIntent:', paymentIntent.id);
            } else {
              console.log('Order draft not found for paymentIntent:', paymentIntent.id);
            }
          } else {
            // fallback: создать минимальный заказ, если нет orderDraftId
            const email = paymentIntent.metadata?.email || '';
            const orderData = {
              items: [],
              total: paymentIntent.amount / 100,
              shipping: '',
              paymentMethod: 'card',
              paymentIntentId: paymentIntent.id,
              customerDetails: { email },
              status: 'DONE',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await db.collection('orders').insertOne(orderData);
            console.log('Order created from webhook for paymentIntent:', paymentIntent.id);
          }
        } catch (err) {
          console.error('Error creating/updating order from webhook:', err);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        // Add failed payment handling logic here
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 