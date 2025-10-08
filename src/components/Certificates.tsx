import Image from "next/image";

interface CertificatesProps {
  isEnglish: boolean;
}

export default function Certificates({ isEnglish }: CertificatesProps) {
  return (
    <section className="section" id="certs">
      <h2>{isEnglish ? "Certificates & Accreditations" : "الشهادات والاعتمادات"}</h2>
      <div className="grid-3">
        <article className="card">
          <div style={{ marginBottom: "16px", textAlign: "center" }}>
            <Image
              src="/personal-trainer.png"
              alt={isEnglish ? "Certified Personal Trainer Certificate" : "شهادة مدرب شخصي معتمد"}
              width={300}
              height={200}
              style={{ 
                maxWidth: "100%", 
                height: "auto", 
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            />
          </div>
          <h3>Certified Personal Trainer</h3>
          <ul className="list">
            <li><strong>ID:</strong> 1251498540</li>
            <li><strong>Valid to:</strong> 05/06/2027</li>
            <li><strong>CEUs:</strong> NASM 1.9 · AFAA 15</li>
          </ul>
        </article>
        <article className="card">
          <div style={{ marginBottom: "16px", textAlign: "center" }}>
            <Image
              src="/nutritaion-coach.png"
              alt={isEnglish ? "Certified Nutrition Coach Certificate" : "شهادة مدرب تغذية معتمد"}
              width={300}
              height={200}
              style={{ 
                maxWidth: "100%", 
                height: "auto", 
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            />
          </div>
          <h3>Certified Nutrition Coach</h3>
          <ul className="list">
            <li><strong>ID:</strong> 1251498124</li>
            <li><strong>Valid to:</strong> 05/05/2027</li>
            <li><strong>CEUs:</strong> NASM 1.9 · AFAA 19 · ACE 3.0 (CEP220140)</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
