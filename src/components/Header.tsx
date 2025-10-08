export default function Header() {
  return (
    <header className="wrap">
      <nav className="grid" style={{gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "16px"}}>
        <div style={{display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap"}}>
          <a href="#" className="tag" aria-label="الصفحة الرئيسية — LEVEL UP">LEVEL UP</a>
          <span className="pill">المدرّب: وليد الحلفاوي</span>
        </div>
        <div></div>
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
          <a href="#plans" className="tag">الباقات</a>
          <a href="#certs" className="tag">الشهادات</a>
          <a href="#hof" className="tag">قاعة الإنجازات</a>
          <a href="#cv" className="tag">السيرة</a>
          <a href="#contact" className="tag">استشارة مجانية</a>
        </div>
      </nav>
    </header>
  );
}
