interface PlansProps {
  isEnglish: boolean;
}

export default function Plans({ isEnglish }: PlansProps) {
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
        </article>
      </div>
    </section>
  );
}
