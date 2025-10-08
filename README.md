# LEVEL UP - Personal Coach Website

A modern Next.js website for personal trainer Waleed Al-Halfawy, featuring training plans, certifications, and achievements.

## Features

- 🏋️‍♂️ **Training Plans**: Three tiers of personalized training and nutrition plans
- 🏆 **Certifications**: Professional trainer and nutrition coach credentials
- 🥇 **Achievements**: Competition history and accomplishments
- 📞 **Contact**: Free consultation booking form
- 📱 **Responsive**: Mobile-optimized design
- 🌐 **RTL Support**: Arabic language support with right-to-left layout

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Tajawal (Arabic) from Google Fonts
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-coach-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for automatic deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy your site

### Manual Deployment

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout with RTL support
│   └── page.tsx         # Main page component
└── components/
    ├── Header.tsx       # Navigation header
    ├── Hero.tsx         # Hero section with trainer photo
    ├── Plans.tsx        # Training plan packages
    ├── Certificates.tsx # Professional certifications
    ├── Achievements.tsx # Competition achievements
    ├── CV.tsx          # Contact information
    ├── Contact.tsx     # Consultation booking form
    └── Footer.tsx      # Site footer
```

## Customization

### Colors and Styling

The design uses CSS custom properties defined in `globals.css`:

- `--bg`: Main background color
- `--panel`: Card background
- `--text`: Primary text color
- `--brand`: Primary brand color (blue)
- `--brand-2`: Secondary brand color (yellow)

### Content Updates

To update content:

1. **Plans**: Edit `src/components/Plans.tsx`
2. **Certificates**: Edit `src/components/Certificates.tsx`
3. **Contact Info**: Edit `src/components/CV.tsx`
4. **Hero Content**: Edit `src/components/Hero.tsx`

## License

© 2024 LEVEL UP — وليد الحلفاوي. All rights reserved.