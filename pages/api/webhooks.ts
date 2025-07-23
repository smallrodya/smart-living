import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: (process.env.STRIPE_API_VERSION as any) || '2022-11-15',
});

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const buf = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on('data', (chunk) => chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Быстро возвращаем 200 OK, потом обрабатываем
  res.status(200).json({ received: true });

  // Асинхронная обработка событий
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      try {
        const { db } = await connectToDatabase();
        const orderDraftId = paymentIntent.metadata?.orderDraftId;
        if (orderDraftId) {
          console.log('Trying to update order with _id:', orderDraftId);
          let objectId = null;
          try {
            objectId = new ObjectId(orderDraftId);
          } catch (e) {
            console.error('Invalid ObjectId for orderDraftId:', orderDraftId, e);
          }
          if (objectId) {
            const updateResult = await db.collection('orders').updateOne(
              { _id: objectId },
              { $set: {
                  status: 'DONE',
                  paymentIntentId: paymentIntent.id,
                  updatedAt: new Date().toISOString()
                }
              }
            );
            console.log('Update result:', updateResult);
            if (updateResult.matchedCount > 0) {
              console.log('Order draft updated to DONE for paymentIntent:', paymentIntent.id);
            } else {
              console.log('Order draft not found for paymentIntent:', paymentIntent.id);
            }
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
    }
    case 'payment_intent.payment_failed': {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
} 