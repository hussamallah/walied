# 🧪 Complete Testing Guide - Payment & Webhook System

## Pre-Testing Setup

### 1. Make Sure Environment Variables Are Set

**In `.env.local` (for local testing):**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
STRIPE_WEBHOOK_SECRET=whsec_... (from Stripe Dashboard)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

**In Vercel (Production):**
- Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
- Add all the same variables
- Make sure `STRIPE_WEBHOOK_SECRET` is set!

---

## 🧪 Testing Methods

### Method 1: Test Mode (RECOMMENDED - Safe Testing)

#### Step 1: Switch to Test Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in top right)
3. Get your test keys:
   - `pk_test_...` (Publishable key)
   - `sk_test_...` (Secret key)
4. Update `.env.local` with test keys
5. Restart your server

#### Step 2: Create Test Webhook (Optional - for local testing)

For local testing with Stripe CLI:
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3001/api/stripe-webhook
# Copy the webhook secret it shows (whsec_...)
# Add to .env.local
```

Or use your production webhook URL for testing on deployed site.

#### Step 3: Test the Payment Flow

1. **Start your site:**
   ```bash
   cd "C:\oersonal coach\personal-coach-app"
   pnpm dev
   ```
   Site runs at: http://localhost:3001

2. **Go to Plans section** on your website

3. **Click "Subscribe Now"** on any plan (Basic, Gold, or Platinum)

4. **On Stripe Checkout page, use test card:**
   ```
   Card Number: 4242 4242 4242 4242
   Expiry: 12/25 (any future date)
   CVC: 123 (any 3 digits)
   ZIP: 12345 (any ZIP)
   Name: Test Customer
   Email: your-email@example.com
   ```

5. **Complete the payment** - You'll be redirected back to your site

6. **Check for email notification:**
   - Check `hus.1998.apr@gmail.com`
   - Should receive email with:
     - Customer name
     - Plan purchased
     - Training code (e.g., `TRAIN-A3B7`)
     - WhatsApp link

7. **Check WhatsApp link:**
   - Click the WhatsApp link in the email
   - Should open WhatsApp with pre-filled message:
     ```
     🎉 Payment Confirmed! ✅
     
     Hi Test Customer!
     
     Your payment for [Plan] has been received successfully.
     
     📋 Training Code: TRAIN-XXXX
     
     🚀 You are now READY FOR FULL TRAINING! 💪
     ...
     ```

#### Step 4: Verify Webhook in Stripe Dashboard

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click on your webhook endpoint
3. Check **Events** tab - you should see `checkout.session.completed` events
4. Click on an event to see the webhook response

---

### Method 2: Live Mode Testing (ONLY if comfortable with real charges)

⚠️ **WARNING:** This uses REAL money!

1. Make sure you have **live keys** in `.env.local` and Vercel
2. Use a **real credit card** with a small amount ($150 for Basic Plan)
3. Complete payment
4. Check email notification
5. You can refund the payment in Stripe Dashboard if needed:
   - Go to: Payments → Find the payment → Click → Refund

---

## 🐛 Troubleshooting

### Payment Works But No Email?

1. **Check EmailJS configuration:**
   - Verify EmailJS credentials in `.env.local`
   - Check spam folder
   - Check EmailJS dashboard for sent emails

2. **Check webhook:**
   - Verify `STRIPE_WEBHOOK_SECRET` is set
   - Check Stripe Dashboard → Webhooks → Check if events are being received
   - Check Vercel logs: Dashboard → Your Project → Logs

3. **Check server logs:**
   - Vercel: Dashboard → Your Project → Logs
   - Look for "Payment successful" or error messages

### Webhook Not Working?

1. **Verify webhook URL is correct:**
   ```
   https://coach-walid.vercel.app/api/stripe-webhook
   ```

2. **Check webhook secret:**
   - Must match exactly in Stripe Dashboard and `.env.local` / Vercel

3. **Test webhook manually:**
   - Stripe Dashboard → Webhooks → Your endpoint → "Send test webhook"
   - Select `checkout.session.completed`
   - Check server logs

### "Stripe secret key not configured"?

- Make sure `STRIPE_SECRET_KEY` is in `.env.local` for local testing
- Make sure it's in Vercel environment variables for production
- Restart server after adding

---

## ✅ Success Checklist

After testing, you should have:

- [ ] Payment completes successfully
- [ ] Redirect back to site with success message
- [ ] Email notification received with:
  - [ ] Customer name
  - [ ] Plan type
  - [ ] Training code (TRAIN-XXXX)
  - [ ] WhatsApp link
- [ ] WhatsApp link opens with pre-filled message
- [ ] Webhook event shows in Stripe Dashboard
- [ ] No errors in Vercel logs

---

## 🚀 Production Testing

Once everything works in test mode:

1. **Switch to live keys** in Vercel environment variables
2. **Update webhook** in Stripe Dashboard to use production endpoint
3. **Test with a real small payment**
4. **Verify everything works**
5. **Monitor for first real customer**

---

## 📞 Need Help?

- Stripe Dashboard → Webhooks → View logs
- Vercel Dashboard → Your Project → Logs
- Check EmailJS dashboard for email status
- Test webhook: Stripe Dashboard → Webhooks → Send test webhook

---

**Happy Testing! 🎉**

