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
        // Создаём заказ в базе, если ещё не создан
        try {
          const { db } = await connectToDatabase();
          // Проверяем, есть ли уже заказ с этим paymentIntentId
          const existingOrder = await db.collection('orders').findOne({ paymentIntentId: paymentIntent.id });
          if (!existingOrder) {
            // Собираем данные для заказа из metadata
            const email = paymentIntent.metadata?.email || '';
            const orderDraftId = paymentIntent.metadata?.orderDraftId || null;
            // Здесь можно доработать: если orderDraftId есть — подтянуть черновик заказа
            // Сейчас создаём минимальный заказ
            const orderData = {
              items: [], // Можно доработать: подтянуть из черновика
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
          } else {
            console.log('Order already exists for paymentIntent:', paymentIntent.id);
          }
        } catch (err) {
          console.error('Error creating order from webhook:', err);
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