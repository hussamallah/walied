import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function generateWhatsAppMessage(data: {
  customerName: string;
  planType: string;
  trainingCode: string;
}) {
  const planNames: Record<string, { en: string; ar: string }> = {
    basic: { en: 'Basic Plan', ar: 'الباقة الأساسية' },
    gold: { en: 'Gold Plan', ar: 'الذهبية (المتقدمة)' },
    platinum: { en: 'Platinum Plan', ar: 'البلاتينية (VIP)' },
  };

  const planName = planNames[data.planType]?.en || data.planType;

  const message = encodeURIComponent(
    `🎉 Payment Confirmed! ✅\n\n` +
    `Hi ${data.customerName}!\n\n` +
    `Your payment for ${planName} has been received successfully.\n\n` +
    `📋 Training Code: ${data.trainingCode}\n\n` +
    `🚀 You are now READY FOR FULL TRAINING! 💪\n\n` +
    `I'll contact you shortly to begin your personalized training program.\n\n` +
    `Let's level up together! 🔥`
  );

  const whatsappNumber = '15715644075';
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  try {
    const stripeMode = process.env.NEXT_PUBLIC_STRIPE_MODE || 'test';
    const secretKey = stripeMode === 'live'
      ? process.env.STRIPE_SECRET_KEY_LIVE
      : process.env.STRIPE_SECRET_KEY_TEST;

    if (!secretKey) {
      return NextResponse.json({ error: `Stripe secret key for ${stripeMode} mode is not configured` }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const customerName = session.customer_details?.name || 'Valued Client';
      const planType = session.metadata?.planType || 'unknown';
      
      // This logic is duplicated from the webhook to ensure immediate availability.
      // The webhook remains the source of truth for your internal records (like the email).
      const trainingCode = `TRAIN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const whatsappUrl = generateWhatsAppMessage({
        customerName,
        planType,
        trainingCode,
      });

      return NextResponse.json({ whatsappUrl });
    } else {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 402 });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json({ error: 'Failed to retrieve session details' }, { status: 500 });
  }
}
