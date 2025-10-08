"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Plans from "@/components/Plans";
import Certificates from "@/components/Certificates";
import Achievements from "@/components/Achievements";
import CV from "@/components/CV";
import Footer from "@/components/Footer";

export default function Home() {
  const [isEnglish, setIsEnglish] = useState(false);

  return (
    <div style={{ direction: isEnglish ? "ltr" : "rtl" }}>
      <Header isEnglish={isEnglish} setIsEnglish={setIsEnglish} />
      <main className="wrap">
        <Hero isEnglish={isEnglish} />
        <Plans isEnglish={isEnglish} />
        <Achievements isEnglish={isEnglish} />
        <Certificates isEnglish={isEnglish} />
        <CV isEnglish={isEnglish} />
      </main>
      <Footer isEnglish={isEnglish} />
    </div>
  );
}
