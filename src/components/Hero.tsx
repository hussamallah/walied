import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <Image 
            className="hero-photo" 
            alt="وليد الحلفاوي في الجيم" 
            src="/placeholder-trainer.svg"
            width={520}
            height={520}
            priority
          />
        </div>
        <div>
          <p className="kicker">LEVEL UP</p>
          <div className="pill" style={{marginBottom: "12px"}}>بقيادة المدرب وليد الحلفاوي</div>
          <h1>تدريب فعّال بنتائج مضمونة في أسبوعين</h1>
          <p className="lead">خبرة مزدوجة في التدريب والتغذية. خطط مخصّصة، متابعة واتساب يومية، وتحديثات أسبوعية.</p>
          <div className="logos" style={{margin: "10px 0 6px"}}>
          </div>
          <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: "12px"}}>
            <a href="#contact" className="btn">ابدأ باستشارة مجانية</a>
            <a href="#plans" className="btn btn-alt">اختر باقتك</a>
          </div>
        </div>
      </div>
    </section>
  );
}
