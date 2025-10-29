# Stripe Test Cards Guide

## ⚠️ IMPORTANT: Test Cards Only Work with Test Keys

**You currently have LIVE keys** (`pk_live_` and `sk_live_`). 

- ❌ **Test cards will NOT work** with live keys
- ✅ **Test cards only work** with test keys (`pk_test_` and `sk_test_`)

---

## For Testing (Use Test Keys)

### Step 1: Get Test Keys from Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in the top right)
3. Go to **Developers** → **API keys**
4. Copy your **test** keys:
   - `pk_test_...` (Publishable key)
   - `sk_test_...` (Secret key)

### Step 2: Update `.env.local`

Replace your live keys with test keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
STRIPE_SECRET_KEY=sk_test_your_test_key_here
```

### Step 3: Restart Your Server

After changing keys, restart your development server.

### Step 4: Use These Test Cards

| Card Number | Description |
|------------|-------------|
| **4242 4242 4242 4242** | ✅ Success - Use this for normal testing |
| **4000 0000 0000 0002** | ❌ Card declined |
| **4000 0025 0000 3155** | Requires 3D Secure authentication |
| **5555 5555 5555 4444** | Success (Mastercard) |

**For all test cards:**
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any ZIP code (e.g., 12345)

---

## For Live Website (Current Setup)

You have **LIVE keys** which means:

- ✅ Real payments will be processed
- ✅ You'll receive real money
- ❌ Test cards will NOT work
- ⚠️ Each "Subscribe Now" click will charge a real card

### Safe Testing on Live Mode

If you need to test on live mode:

1. **Use a real card** with a small amount you're comfortable losing
2. **Test with the lowest plan** ($150/month Basic Plan)
3. **Refund immediately** after testing (via Stripe Dashboard)
4. Or use Stripe's **test mode toggle** in Dashboard

### Recommended: Two Separate Environments

- **Local Development:** Use test keys for safe testing
- **Production Website:** Use live keys for real payments

Switch keys based on where you're testing!

---

## Quick Reference

### Test Mode Setup:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```
Test card: `4242 4242 4242 4242`

### Live Mode Setup:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```
Use real cards only!

---

## Switching Between Test and Live

1. Update `.env.local` with the appropriate keys
2. Restart the server: `pnpm dev` (or stop and start again)
3. Clear browser cache if needed

---

**Need Help?**
- [Stripe Test Cards Documentation](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com)

