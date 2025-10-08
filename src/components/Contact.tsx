"use client";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('شكرًا — سنرد خلال 24 ساعة.');
  };

  return (
    <section className="section contact" id="contact">
      <div className="card">
        <h2>احجز استشارة مجانية لمدة 20 دقيقة</h2>
        <form onSubmit={handleSubmit}>
          <label>
            الاسم 
            <input 
              required 
              style={{
                display: "block",
                width: "100%",
                marginTop: "6px",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.18)",
                background: "rgba(255,255,255,.06)",
                color: "var(--text)"
              }}
            />
          </label>
          <label>
            البريد الإلكتروني 
            <input 
              type="email" 
              required 
              style={{
                display: "block",
                width: "100%",
                marginTop: "6px",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.18)",
                background: "rgba(255,255,255,.06)",
                color: "var(--text)"
              }}
            />
          </label>
          <label>
            هدفك الأساسي 
            <input 
              required 
              style={{
                display: "block",
                width: "100%",
                marginTop: "6px",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.18)",
                background: "rgba(255,255,255,.06)",
                color: "var(--text)"
              }}
            />
          </label>
          <div style={{marginTop: "12px"}}>
            <button className="btn" type="submit">أرسل الطلب</button>
          </div>
        </form>
      </div>
    </section>
  );
}
