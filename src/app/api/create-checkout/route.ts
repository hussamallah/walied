import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
  try {
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
      success_url: `${req.headers.get('origin')}/?success=true&plan=${planType}`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      metadata: {
        planType,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


