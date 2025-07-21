import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: (process.env.STRIPE_API_VERSION as any) || '2025-05-28.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
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

  console.log('Received webhook event:', event.type);

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      try {
        const { db } = await connectToDatabase();
        const orderDraftId = paymentIntent.metadata?.orderDraftId;
        if (orderDraftId) {
          // Обновляем черновик заказа
          const updateResult = await db.collection('orders').updateOne(
            { _id: new ObjectId(orderDraftId) },
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
    }
    case 'payment_intent.payment_failed': {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
} 