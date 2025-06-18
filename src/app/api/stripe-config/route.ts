import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil'
});

export async function GET() {
  try {
    // Get account details
    const account = await stripe.accounts.retrieve();
    
    // Get Apple Pay domains
    const applePayDomains = await stripe.applePayDomains.list();
    
    // Get payment method types
    const paymentMethods = await stripe.paymentMethods.list({
      type: 'card',
      limit: 1
    });

    return NextResponse.json({
      account: {
        id: account.id,
        country: account.country,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        details_submitted: account.details_submitted,
        business_type: account.business_type,
        capabilities: account.capabilities
      },
      applePayDomains: applePayDomains.data.map(domain => ({
        id: domain.id,
        domain_name: domain.domain_name,
        livemode: domain.livemode,
        created: domain.created
      })),
      paymentMethods: {
        available: paymentMethods.data.length > 0
      },
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Configured' : 'Missing'
    });
  } catch (error) {
    console.error('Error fetching Stripe config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Stripe configuration' },
      { status: 500 }
    );
  }
} 