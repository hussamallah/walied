'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface PlansProps {
  isEnglish: boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Plans({ isEnglish }: PlansProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planType: string) => {
    setLoading(planType);
    
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planType, isEnglish }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL received');
        alert(isEnglish ? 'Error creating checkout session' : 'خطأ في إنشاء جلسة الدفع');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(isEnglish ? 'Error creating checkout session' : 'خطأ في إنشاء جلسة الدفع');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="section" id="plans">
      <h2>{isEnglish ? "Training Plans" : "الباقات"}</h2>
      <div className="grid-3">
        <article className="card" style={{
          border: "2px solid #b87333",
          boxShadow: "0 0 20px rgba(184, 115, 51, 0.3), inset 0 0 20px rgba(184, 115, 51, 0.1)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(184, 115, 51, 0.05) 0%, rgba(184, 115, 51, 0.02) 100%)",
            borderRadius: "inherit",
            pointerEvents: "none"
          }}></div>
          <h3 style={{ color: "#b87333" }}>{isEnglish ? "Basic Plan — $150/month" : "الباقة الأساسية — 150$ / شهر"}</h3>
          <ul className="list">
            <li>{isEnglish ? "Customized training plan" : "خطة تدريب مخصّصة"}</li>
            <li>{isEnglish ? "Customized nutrition plan" : "خطة تغذية مخصّصة"}</li>
            <li>{isEnglish ? "Daily WhatsApp follow-up" : "متابعة يومية عبر واتساب"}</li>
            <li>{isEnglish ? "Supplement schedule when needed" : "جدول المكمّلات عند الحاجة"}</li>
          </ul>
          <button
            onClick={() => handleCheckout('basic')}
            disabled={loading !== null}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: loading === 'basic' ? "#94a3b8" : "#b87333",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: loading !== null ? "not-allowed" : "pointer",
              width: "100%",
              fontSize: "16px",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => {
              if (loading === null) e.currentTarget.style.backgroundColor = "#8b5a26";
            }}
            onMouseLeave={(e) => {
              if (loading === null) e.currentTarget.style.backgroundColor = "#b87333";
            }}
          >
            {loading === 'basic' 
              ? (isEnglish ? "Processing..." : "جاري المعالجة...")
              : (isEnglish ? "Subscribe Now" : "اشترك الآن")
            }
          </button>
        </article>
        <article className="card" style={{
          border: "2px solid #fbbf24",
          boxShadow: "0 0 25px rgba(251, 191, 36, 0.4), inset 0 0 25px rgba(251, 191, 36, 0.15)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(251, 191, 36, 0.03) 100%)",
            borderRadius: "inherit",
            pointerEvents: "none"
          }}></div>
          <h3 style={{ color: "#fbbf24" }}>{isEnglish ? "Gold Plan (Advanced) — $250/month" : "الذهبـية (المتقدمة) — 250$ / شهر"}</h3>
          <ul className="list">
            <li>{isEnglish ? "Everything in Basic" : "كل ما في الأساسية"}</li>
            <li><strong>{isEnglish ? "Video call every 2 weeks (20 minutes)" : "مكالمة فيديو كل أسبوعين (20 دقيقة)"}</strong></li>
            <li>{isEnglish ? "Daily WhatsApp follow-up" : "متابعة يومية عبر واتساب"}</li>
            <li>{isEnglish ? "Supplement schedule when needed" : "جدول المكمّلات عند الحاجة"}</li>
          </ul>
          <button
            onClick={() => handleCheckout('gold')}
            disabled={loading !== null}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: loading === 'gold' ? "#94a3b8" : "#fbbf24",
              color: "#0f172a",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: loading !== null ? "not-allowed" : "pointer",
              width: "100%",
              fontSize: "16px",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => {
              if (loading === null) e.currentTarget.style.backgroundColor = "#f59e0b";
            }}
            onMouseLeave={(e) => {
              if (loading === null) e.currentTarget.style.backgroundColor = "#fbbf24";
            }}
          >
            {loading === 'gold' 
              ? (isEnglish ? "Processing..." : "جاري المعالجة...")
              : (isEnglish ? "Subscribe Now" : "اشترك الآن")
            }
          </button>
        </article>
        <article className="card" style={{
          border: "2px solid #e5e7eb",
          boxShadow: "0 0 30px rgba(229, 231, 235, 0.5), inset 0 0 30px rgba(229, 231, 235, 0.2)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(229, 231, 235, 0.1) 0%, rgba(229, 231, 235, 0.05) 100%)",
            borderRadius: "inherit",
            pointerEvents: "none"
          }}></div>
          <h3 style={{ color: "#e5e7eb" }}>{isEnglish ? "Platinum Plan (VIP) — $300/month" : "البلاتينية (VIP) — 300$ / شهر"}</h3>
          <ul className="list">
            <li>{isEnglish ? "Everything in Basic" : "كل ما في الأساسية"}</li>
            <li><strong>{isEnglish ? "Priority response" : "أولوية الرد"}</strong> {isEnglish ? "via WhatsApp" : "عبر واتساب"}</li>
            <li><strong>{isEnglish ? "Weekly video call (30 minutes)" : "مكالمة فيديو أسبوعية (30 دقيقة)"}</strong></li>
            <li><strong>{isEnglish ? "Technical analysis of exercise videos" : "تحليل تقني لفيديوهات التمرين"}</strong></li>
            <li><strong>{isEnglish ? "Daily progress review every 24 hours" : "مراجعة يومية لتقدمك كل 24 ساعة"}</strong></li>
          </ul>
          <button
            onClick={() => handleCheckout('platinum')}
            disabled={loading !== null}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: loading === 'platinum' ? "#94a3b8" : "#e5e7eb",
              color: "#0f172a",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: loading !== null ? "not-allowed" : "pointer",
              width: "100%",
              fontSize: "16px",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => {
              if (loading === null) e.currentTarget.style.backgroundColor = "#d1d5db";
            }}
            onMouseLeave={(e) => {
              if (loading === null) e.currentTarget.style.backgroundColor = "#e5e7eb";
            }}
          >
            {loading === 'platinum' 
              ? (isEnglish ? "Processing..." : "جاري المعالجة...")
              : (isEnglish ? "Subscribe Now" : "اشترك الآن")
            }
          </button>
        </article>
      </div>
    </section>
  );
}
