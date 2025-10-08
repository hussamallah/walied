"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="wrap" style={{
      margin: "56px 0 12px",
      color: "var(--muted)",
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      flexWrap: "wrap",
      fontSize: "14px"
    }}>
      <div>&copy; {year} LEVEL UP — وليد الحلفاوي</div>
      <div>الخصوصية أولاً · يمكنك الإلغاء في أي وقت</div>
    </footer>
  );
}
