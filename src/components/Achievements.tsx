import Image from "next/image";

export default function Achievements() {
  return (
    <section className="section" id="hof">
      <h2>قاعة الإنجازات</h2>
      <div className="card tl-details">
        <Image 
          id="tl-photo" 
          alt="صورة من الحدث" 
          src="/placeholder-achievement.svg"
          width={500}
          height={300}
        />
        <div id="tl-text" className="lead" style={{marginTop: "10px"}}>
          Mr. Olympia — San Diego 2024 · Overall Champion
        </div>
      </div>
      <div className="timeline" id="timeline" style={{marginTop: "10px"}}></div>
    </section>
  );
}
