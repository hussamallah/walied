# 🔍 How to Find Stripe Test Mode & Test Keys

## Step-by-Step Guide to Access Test Mode

### Method 1: Test Mode Toggle (Easiest)

1. **Go to Stripe Dashboard:**
   - Visit: https://dashboard.stripe.com
   - Log in to your account

2. **Look for the Toggle in the TOP RIGHT:**
   - You'll see a toggle that says either:
     - **"Test mode"** (currently in test mode)
     - **"Live mode"** (currently in live mode)
   - It looks like a small switch/toggle button
   - Click it to switch between Test and Live mode

3. **When in Test Mode:**
   - The toggle will show "Test mode"
   - The background color might be different (often orange/yellow)
   - Your test keys will be visible

### Method 2: Via Developers → API Keys

1. **Go to Stripe Dashboard:**
   - https://dashboard.stripe.com

2. **Click on "Developers"** (left sidebar)
   - Or go directly to: https://dashboard.stripe.com/apikeys

3. **Click "API keys"**

4. **You'll see TWO sections:**
   - **Test mode** (top section)
     - Publishable key: `pk_test_...`
     - Secret key: `sk_test_...` (click "Reveal test key")
   - **Live mode** (bottom section)
     - Publishable key: `pk_live_...`
     - Secret key: `sk_live_...`

5. **Make sure you're looking at "Test mode" section**
   - It should say "Test mode" clearly at the top
   - If you see "Live mode" below, scroll up to find "Test mode"

---

## Visual Guide

```
Stripe Dashboard
┌─────────────────────────────────────┐
│ [Logo] Stripe    [Test mode] ← Toggle│ ← Look here!
│                        ↑              │
│                  Click this          │
└─────────────────────────────────────┘

OR

Developers → API Keys

┌─────────────────────────────────┐
│ Test mode                        │ ← This section
│ ┌─────────────────────────────┐ │
│ │ Publishable key: pk_test_...│ │
│ │ Secret key: sk_test_...      │ │ ← Your test keys
│ └─────────────────────────────┘ │
│                                 │
│ Live mode                       │ ← Ignore this
│ ┌─────────────────────────────┐ │
│ │ Publishable key: pk_live_...│ │
│ │ Secret key: sk_live_...      │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## Quick Links

- **API Keys (Test Mode):** https://dashboard.stripe.com/test/apikeys
- **API Keys (Live Mode):** https://dashboard.stripe.com/apikeys
- **Webhooks (Test Mode):** https://dashboard.stripe.com/test/webhooks
- **Webhooks (Live Mode):** https://dashboard.stripe.com/webhooks

Notice the `/test/` in the URL for test mode!

---

## Still Can't Find It?

### Check Your Account Status

1. **New Stripe Account:**
   - New accounts start in Test mode by default
   - You might already be in test mode

2. **Account Activation:**
   - If your account isn't activated, test mode might be limited
   - Check: Settings → Account → Activation status

3. **Different Dashboard View:**
   - Try clicking directly: https://dashboard.stripe.com/test/apikeys
   - This forces test mode view

---

## What to Do Once You Find Test Keys

1. **Copy Test Keys:**
   - `pk_test_...` → Update `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel
   - `sk_test_...` → Update `STRIPE_SECRET_KEY` in Vercel

2. **Create Test Webhook:**
   - Go to: https://dashboard.stripe.com/test/webhooks
   - Click "Add endpoint"
   - URL: `https://coach-walid.vercel.app/api/stripe-webhook`
   - Event: `checkout.session.completed`
   - Copy the signing secret (`whsec_...`)

3. **Add Webhook Secret to Vercel:**
   - Vercel → Settings → Environment Variables
   - Add: `STRIPE_WEBHOOK_SECRET` = `whsec_...`

---

## Alternative: If You Can't Access Test Mode

If you can't find test mode, you can:

1. **Use Live Mode Carefully:**
   - Test with a real card with a small amount ($150 for Basic Plan)
   - Refund immediately after testing in Stripe Dashboard
   - Go to: Payments → Click payment → Refund

2. **Create a Separate Test Account:**
   - Sign up for a new Stripe account (free)
   - Use it only for testing
   - Keep your live account separate

---

## Need Help?

- Stripe Support: https://support.stripe.com
- Stripe Documentation: https://stripe.com/docs/testing
- Check if you're logged into the right account

---

**Tip:** Test mode keys always start with `pk_test_` and `sk_test_`
Live mode keys always start with `pk_live_` and `sk_live_`

