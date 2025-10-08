# 📧 Email Setup Guide

## How to Set Up Email Notifications

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Submission - {{from_name}}

Hello Waleed,

You have a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Goal: {{goal}}

Please respond within 24 hours.

Best regards,
Your Website
```

4. Save the template and copy the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Environment Variables
1. Open `.env.local` file in your project
2. Replace the placeholder values:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### Step 6: Test the Form
1. Restart your development server: `npm run dev`
2. Fill out the contact form
3. Check your email for notifications!

## Features:
- ✅ Real-time email notifications
- ✅ Form validation
- ✅ Success/error messages
- ✅ Loading states
- ✅ Professional styling
- ✅ Arabic language support

## Troubleshooting:
- Make sure all environment variables are set correctly
- Check browser console for any errors
- Verify EmailJS service is active
- Test with a simple email first
