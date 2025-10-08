export default function Plans() {
  return (
    <section className="section" id="plans">
      <h2>الباقات</h2>
      <div className="grid-3">
        <article className="card">
          <h3>الباقة الأساسية — 150$ / شهر</h3>
          <ul className="list">
            <li>خطة تدريب مخصّصة</li>
            <li>خطة تغذية مخصّصة</li>
            <li>متابعة يومية عبر واتساب</li>
            <li>جدول المكمّلات عند الحاجة</li>
            <li>تحديثات أسبوعية للخطة</li>
          </ul>
        </article>
        <article className="card">
          <h3>الذهبـية (المتقدمة) — 250$ / شهر</h3>
          <ul className="list">
            <li>كل ما في الأساسية</li>
            <li><strong>مكالمة فيديو كل أسبوعين (20 دقيقة)</strong></li>
            <li>متابعة يومية عبر واتساب</li>
            <li>جدول المكمّلات عند الحاجة</li>
            <li>تحديثات أسبوعية للخطة</li>
          </ul>
        </article>
        <article className="card">
          <h3>البلاتينية (VIP) — 300$ / شهر</h3>
          <ul className="list">
            <li>خطة تدريب وتغذية مخصّصة</li>
            <li><strong>أولوية الرد</strong> عبر واتساب</li>
            <li><strong>مكالمة فيديو أسبوعية (30 دقيقة)</strong></li>
            <li><strong>تحليل تقني لفيديوهات التمرين</strong></li>
            <li>جدول مكمّلات احترافي ومفصّل</li>
            <li>تحديثات فورية للخطة</li>
          </ul>
          <div className="lead-sm">مستوى متابعة أعلى وتحليل تقنية يضمن أداءً صحيحاً وتقدّماً أسرع.</div>
        </article>
      </div>
    </section>
  );
}
