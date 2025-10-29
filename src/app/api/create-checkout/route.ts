import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const stripeMode = process.env.NEXT_PUBLIC_STRIPE_MODE || 'test'; // Default to 'test' for safety

    // --- Vercel Environment Variable Debugging ---
    console.log("--- Stripe Env Debug ---");
    console.log("Stripe Mode:", stripeMode);
    console.log("Found LIVE Secret Key:", !!process.env.STRIPE_SECRET_KEY_LIVE);
    console.log("Found TEST Secret Key:", !!process.env.STRIPE_SECRET_KEY_TEST);
    // -----------------------------------------

    const secretKey = stripeMode === 'live'
      ? process.env.STRIPE_SECRET_KEY_LIVE
      : process.env.STRIPE_SECRET_KEY_TEST;

    if (!secretKey) {
      return NextResponse.json({ error: `Stripe secret key for ${stripeMode} mode is not configured` }, { status: 500 });
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-09-30.clover',
    });
    const { planType, isEnglish } = await req.json();

    // Define plan details
    const plans = {
      basic: {
        price: 15000, // $150 in cents
        nameEn: 'Basic Plan',
        nameAr: 'الباقة الأساسية',
      },
      gold: {
        price: 25000, // $250 in cents
        nameEn: 'Gold Plan (Advanced)',
        nameAr: 'الذهبية (المتقدمة)',
      },
      platinum: {
        price: 30000, // $300 in cents
        nameEn: 'Platinum Plan (VIP)',
        nameAr: 'البلاتينية (VIP)',
      },
    };

    const selectedPlan = plans[planType as keyof typeof plans];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: isEnglish ? selectedPlan.nameEn : selectedPlan.nameAr,
              description: isEnglish 
                ? 'Monthly subscription for personal coaching'
                : 'اشتراك شهري للتدريب الشخصي',
            },
            unit_amount: selectedPlan.price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      metadata: {
        planType,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: unknown) {
    console.error('Stripe error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
