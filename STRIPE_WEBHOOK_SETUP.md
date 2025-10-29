# 📧 Stripe Payment Notification Setup

## What This Does

When a customer pays:
1. ✅ **You receive an email** with payment details and training code
2. ✅ **WhatsApp link is generated** with automated message including training code
3. ✅ **Unique training code** is created for each payment (format: `TRAIN-XXXX`)

## Setup Instructions

### Step 1: Get Webhook Secret from Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **Webhooks**
3. Click **Add endpoint**
4. Enter your webhook URL:
   - **For local testing:** Use Stripe CLI (see below)
   - **For production:** `https://yourdomain.com/api/stripe-webhook`
5. Select events to listen for:
   - ✅ `checkout.session.completed`
6. Click **Add endpoint**
7. Copy the **Signing secret** (starts with `whsec_`)

### Step 2: Add Webhook Secret to Environment Variables

Add to your `.env.local` file:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important:** Restart your server after adding this!

### Step 3: Test Locally (Optional)

For local testing, use Stripe CLI:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3001/api/stripe-webhook`
4. Copy the webhook signing secret it provides
5. Use that secret in your `.env.local` for local testing

### Step 4: For Production (Vercel)

1. Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables:
   - Go to **Project** → **Settings** → **Environment Variables**
   - Add: `STRIPE_WEBHOOK_SECRET` = `whsec_your_secret_here`
2. In Stripe Dashboard, update webhook URL to your live domain
3. Redeploy your site

## What Happens When Someone Pays

### 1. Email Notification (To You)

You'll receive an email to `hus.1998.apr@gmail.com` with:
- Customer name and email
- Plan purchased
- Amount paid
- **Training Code** (e.g., `TRAIN-A3B7`)
- WhatsApp link with pre-filled message

**Example Email:**
```
💰 New Payment: John Doe - Gold Plan (TRAIN-A3B7)

🎉 Payment Confirmed! ✅

Customer Details:
• Name: John Doe
• Email: john@example.com
• Plan: Gold Plan
• Amount: USD 250
• Training Code: TRAIN-A3B7

✅ Customer is ready for full training! 🏋️‍♂️

WhatsApp Link (with automated message):
https://wa.me/15715644075?text=...
```

### 2. WhatsApp Automated Message

The WhatsApp link in your email contains a pre-filled message:

```
🎉 Payment Confirmed! ✅

Hi John Doe!

Your payment for Gold Plan has been received successfully.

📋 Training Code: TRAIN-A3B7

🚀 You are now READY FOR FULL TRAINING! 💪

I'll contact you shortly to begin your personalized training program.

Let's level up together! 🔥
```

You can click the link to send this message directly to the customer on WhatsApp.

## Training Code Format

Each payment gets a unique code: **`TRAIN-XXXX`**
- Example: `TRAIN-A3B7`, `TRAIN-K9M2`, `TRAIN-X7P4`
- Used to identify and verify payments
- Included in both email and WhatsApp message

## Troubleshooting

### Email Not Received?

1. Check EmailJS is configured correctly:
   - Verify `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - Verify `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - Verify `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
2. Check spam folder
3. Check Vercel/Server logs for errors

### Webhook Not Working?

1. Verify `STRIPE_WEBHOOK_SECRET` is set in `.env.local`
2. Check webhook URL matches exactly in Stripe Dashboard
3. Verify webhook events include `checkout.session.completed`
4. Check server logs for webhook errors
5. Test webhook in Stripe Dashboard → Webhooks → Send test webhook

### WhatsApp Link Not Working?

1. Verify WhatsApp number is correct: `15715644075`
2. Check the link format in the email
3. Try opening the link in WhatsApp Web or mobile app

## Testing

To test the full flow:

1. Use test mode Stripe keys
2. Make a test payment
3. Check your email for notification
4. Click the WhatsApp link to verify message format

## Security Notes

✅ Webhook signature is verified for security
✅ Secret key never exposed to frontend
✅ Training codes are unique per payment
✅ All sensitive data handled server-side

---

**Need Help?**
- Check Vercel logs: Dashboard → Your Project → Logs
- Stripe Dashboard → Webhooks → View webhook logs
- Test endpoint: Use Stripe's "Send test webhook" feature

