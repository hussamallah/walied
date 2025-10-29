import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Required for Stripe webhooks - disable body parsing
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const stripeMode = process.env.NEXT_PUBLIC_STRIPE_MODE || 'test'; // Default to 'test' for safety

  const secretKey = stripeMode === 'live'
    ? process.env.STRIPE_SECRET_KEY_LIVE
    : process.env.STRIPE_SECRET_KEY_TEST;
    
  const webhookSecret = stripeMode === 'live'
    ? process.env.STRIPE_WEBHOOK_SECRET_LIVE
    : process.env.STRIPE_WEBHOOK_SECRET_TEST;

  if (!secretKey) {
    return NextResponse.json(
      { error: `Stripe secret key for ${stripeMode} mode is not configured` },
      { status: 500 }
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { error: `Webhook secret for ${stripeMode} mode is not configured` },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-09-30.clover',
  });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Get customer email and plan details
    const customerEmail = session.customer_email || session.customer_details?.email;
    const planType = session.metadata?.planType || 'unknown';
    const customerName = session.customer_details?.name || 'Customer';
    
    // Generate unique training code (format: TRAIN-XXXX)
    const trainingCode = `TRAIN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    try {
      // Generate WhatsApp link with automated message
      const whatsappLink = generateWhatsAppMessage({
        customerName,
        planType,
        trainingCode,
      });

      // Send email notification using EmailJS (via their REST API)
      await sendPaymentNotificationEmail({
        customerEmail: customerEmail || 'No email provided',
        customerName,
        planType,
        trainingCode,
        amount: (session.amount_total || 0) / 100, // Convert cents to dollars
        currency: session.currency?.toUpperCase() || 'USD',
        whatsappLink,
      });

      // Log for debugging
      console.log('✅ Payment successful:', {
        customerEmail,
        customerName,
        planType,
        trainingCode,
        whatsappLink,
      });
      
    } catch (error) {
      console.error('Error processing payment notification:', error);
      // Don't fail the webhook - payment is already processed
    }
  }

  return NextResponse.json({ received: true });
}

async function sendPaymentNotificationEmail(data: {
  customerEmail: string;
  customerName: string;
  planType: string;
  trainingCode: string;
  amount: number;
  currency: string;
  whatsappLink: string;
}) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_p1fllec';
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_7ipekdf';
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'MLSQXFKLZEE6VzPU_';
  const notificationEmail = process.env.COACH_NOTIFICATION_EMAIL || 'hus.1998.apr@gmail.com'; // Fallback for safety

  // Plan names
  const planNames: Record<string, { en: string; ar: string }> = {
    basic: { en: 'Basic Plan', ar: 'الباقة الأساسية' },
    gold: { en: 'Gold Plan', ar: 'الذهبية (المتقدمة)' },
    platinum: { en: 'Platinum Plan', ar: 'البلاتينية (VIP)' },
  };

  const planName = planNames[data.planType]?.en || data.planType;

  // Email message content
  const emailSubject = `💰 New Payment: ${data.customerName} - ${planName} (${data.trainingCode})`;
  const emailBody = `
🎉 Payment Confirmed! ✅

Customer Details:
• Name: ${data.customerName}
• Email: ${data.customerEmail}
• Plan: ${planName}
• Amount: ${data.currency} ${data.amount}
• Training Code: ${data.trainingCode}

✅ Customer is ready for full training! 🏋️‍♂️

WhatsApp Link (with automated message):
${data.whatsappLink}

---
This is an automated notification from LEVEL UP Payment System.
  `.trim();

  // Use EmailJS REST API (server-side compatible)
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: notificationEmail, // Your email
          from_name: 'LEVEL UP Payment System',
          subject: emailSubject,
          message: emailBody,
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          plan_type: planName,
          training_code: data.trainingCode,
          amount: `${data.currency} ${data.amount}`,
          whatsapp_link: data.whatsappLink,
          reply_to: data.customerEmail,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`EmailJS API error: ${response.statusText}`);
    }

    console.log('✅ Payment notification email sent successfully');
  } catch (error) {
    console.error('❌ EmailJS error:', error);
    // Log but don't throw - payment is already successful
  }
}

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

  // Create WhatsApp message text with training code
  const message = encodeURIComponent(
    `🎉 Payment Confirmed! ✅\n\n` +
    `Hi ${data.customerName}!\n\n` +
    `Your payment for ${planName} has been received successfully.\n\n` +
    `📋 Training Code: ${data.trainingCode}\n\n` +
    `🚀 You are now READY FOR FULL TRAINING! 💪\n\n` +
    `I'll contact you shortly to begin your personalized training program.\n\n` +
    `Let's level up together! 🔥`
  );

  // Your WhatsApp number (same as in your components)
  const whatsappNumber = '15715644075';
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

