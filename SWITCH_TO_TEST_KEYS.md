# 🔧 Switch Website to Test Mode Keys

## Problem
You switched Stripe Dashboard to test mode, but your **website** is still using **live keys**. That's why you got the error!

## Solution: Update Keys in Vercel

### Step 1: Get Your Test Keys from Stripe

1. **Go to Stripe Dashboard** (should be in Test mode already):
   - Direct link: https://dashboard.stripe.com/test/apikeys

2. **Copy Both Keys:**
   - **Publishable key:** `pk_test_...` (starts with `pk_test_`)
   - **Secret key:** `sk_test_...` (click "Reveal test key" if hidden)

### Step 2: Update Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click on your project: **coach-walid**

2. **Go to Settings:**
   - Click **Settings** (top navigation)
   - Click **Environment Variables** (left sidebar)

3. **Find and Update These Variables:**

   **Update `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`:**
   - Find the existing one (probably has `pk_live_...`)
   - Click the three dots (...) → **Edit**
   - Replace with your test key: `pk_test_...` (from Stripe)
   - Make sure **Production**, **Preview**, and **Development** are all selected
   - Click **Save**

   **Update `STRIPE_SECRET_KEY`:**
   - Find the existing one (probably has `sk_live_...`)
   - Click the three dots (...) → **Edit**
   - Replace with your test key: `sk_test_...` (from Stripe)
   - Make sure **Production**, **Preview**, and **Development** are all selected
   - Click **Save**

### Step 3: Redeploy Your Site

After updating the keys, you need to redeploy:

1. **Option A: Automatic (wait 2-3 minutes)**
   - Vercel will automatically detect the changes
   - Go to **Deployments** tab
   - Wait for it to redeploy automatically

2. **Option B: Manual Redeploy**
   - Go to **Deployments** tab
   - Click the three dots (...) on the latest deployment
   - Click **Redeploy**
   - Or push a small change to git to trigger redeploy

### Step 4: Create Test Webhook (Important!)

1. **Go to Stripe Test Mode Webhooks:**
   - Direct link: https://dashboard.stripe.com/test/webhooks

2. **Click "Add endpoint"**

3. **Enter:**
   - **Endpoint URL:** `https://coach-walid.vercel.app/api/stripe-webhook`
   - **Description:** `Payment notifications`

4. **Select Events:**
   - Check: `checkout.session.completed`

5. **Click "Add endpoint"**

6. **Copy the Signing Secret:**
   - It will show: `whsec_...`
   - Copy this entire string

7. **Add to Vercel:**
   - Vercel → Settings → Environment Variables
   - Add new variable:
     - **Name:** `STRIPE_WEBHOOK_SECRET`
     - **Value:** `whsec_...` (paste the secret)
     - **Environments:** Select all (Production, Preview, Development)
     - Click **Save**

8. **Redeploy again** (wait for automatic or manually redeploy)

### Step 5: Test Again!

1. **Wait for Vercel to finish redeploying** (check Deployments tab - should show "Ready")

2. **Visit your site:**
   - https://coach-walid.vercel.app

3. **Click "Subscribe Now" on any plan**

4. **Use test card:**
   ```
   Card Number: 4242 4242 4242 4242
   Expiry: 12/25 (any future date)
   CVC: 123 (any 3 digits)
   ZIP: 12345 (any ZIP)
   ```

5. **Complete payment** - Should work now! ✅

---

## Quick Checklist

- [ ] Copied `pk_test_...` from Stripe Dashboard
- [ ] Copied `sk_test_...` from Stripe Dashboard
- [ ] Updated `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel
- [ ] Updated `STRIPE_SECRET_KEY` in Vercel
- [ ] Created test webhook in Stripe
- [ ] Added `STRIPE_WEBHOOK_SECRET` to Vercel
- [ ] Waited for Vercel to redeploy
- [ ] Tested payment with test card

---

## How to Verify Keys Are Correct

After redeploying, check:
- Test payment works ✅
- No error about "live mode" ✅
- Email notification received ✅

If you still get errors, make sure:
1. Keys start with `pk_test_` and `sk_test_` (NOT `pk_live_` or `sk_live_`)
2. Vercel has finished redeploying
3. You're testing on the deployed site (not localhost)

---

## Important Notes

- **Test keys** only work in Stripe test mode
- **Live keys** only work in Stripe live mode
- Make sure BOTH match:
  - Stripe Dashboard mode ↔ Vercel environment variables

---

**Once everything is updated and redeployed, try the test payment again!**

