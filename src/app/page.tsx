import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Plans from "@/components/Plans";
import Certificates from "@/components/Certificates";
import Achievements from "@/components/Achievements";
import CV from "@/components/CV";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrap">
        <Hero />
        <Plans />
        <Certificates />
        <Achievements />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
