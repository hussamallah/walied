import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "LEVEL UP — وليد الحلفاوي",
  description: "LEVEL UP — تدريب وتغذية بقيادة وليد الحلفاوي. خطط مخصّصة، متابعة يومية، وتحديثات أسبوعية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
