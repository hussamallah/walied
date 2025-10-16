# Stripe Payment Integration Setup

This guide will help you set up Stripe payment processing for the coaching plans.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Stripe API keys (available in your Stripe Dashboard)

## Setup Steps

### 1. Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. You'll see two types of keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root (next to `package.json`)
2. Add the following content with your actual Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
```

⚠️ **Important:** Never commit your `.env.local` file to version control. It contains sensitive API keys.

### 3. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Plans section on your website
3. Click any "Subscribe Now" button
4. You'll be redirected to a Stripe Checkout page
5. Use Stripe's [test card numbers](https://stripe.com/docs/testing) to test payments:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - Use any future expiration date, any 3-digit CVC, and any ZIP code

### 4. Go Live (Production)

When you're ready to accept real payments:

1. Complete your Stripe account activation
2. Switch to **Live mode** in your Stripe Dashboard
3. Get your **live** API keys (they start with `pk_live_` and `sk_live_`)
4. Update your production environment variables with the live keys

## How It Works

### Payment Flow

1. User clicks "Subscribe Now" on a plan
2. Frontend calls `/api/create-checkout` endpoint
3. Backend creates a Stripe Checkout Session
4. User is redirected to Stripe's secure payment page
5. After payment, user is redirected back to your site

### Subscription Plans

The integration supports three recurring monthly subscription plans:

- **Basic Plan:** $150/month
- **Gold Plan:** $250/month  
- **Platinum Plan:** $300/month

### Managing Subscriptions

View and manage customer subscriptions in your Stripe Dashboard:
- Go to **Payments** → **Subscriptions**
- Here you can view active subscriptions, cancel, refund, or update them

## Webhooks (Optional but Recommended)

For production, set up webhooks to handle subscription events:

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Add an endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- [Test Card Numbers](https://stripe.com/docs/testing)

## Security Notes

- ✅ Secret keys are stored in environment variables (not in code)
- ✅ Payments are processed on Stripe's secure servers
- ✅ The integration uses Stripe Checkout (PCI compliant)
- ✅ Customer payment details never touch your server

