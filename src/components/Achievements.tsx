"use client";

import Image from "next/image";
import { useState } from "react";

interface AchievementsProps {
  isEnglish: boolean;
}

export default function Achievements({ isEnglish }: AchievementsProps) {
  const [activeAchievement, setActiveAchievement] = useState(0);

  const achievements = [
    {
      year: 2019,
      title: "Mr. Olympia 2019",
      organizer: "NPC/IFBB Pro League",
      photo: "/mr.olympia2019.jpg"
    },
    {
      year: 2020,
      title: "Mr. Olympia 2020",
      organizer: "NPC/IFBB Pro League",
      photo: "/mr olympia2020.jpg"
    },
    {
      year: 2021,
      title: "2021 Competition",
      organizer: "NPC/IFBB Pro League",
      photo: "/2021.jpg"
    },
    {
      year: 2022,
      title: "Musclecontest San Diego 2022",
      organizer: "NPC/IFBB Pro League / Musclecontest",
      photo: "/Musclecontest San Diego2022.jpg"
    },
    {
      year: 2024,
      title: "Las Vegas 2024",
      organizer: "NPC/IFBB Pro League",
      photo: "/2024-lasvigas.jpg"
    },
    {
      year: 2024,
      title: "2024 Competition",
      organizer: "NPC/IFBB Pro League",
      photo: "/2024.jpg"
    }
  ];

  return (
    <section className="section" id="hof">
      <h2>{isEnglish ? "Hall of Achievements" : "قاعة الإنجازات - 6 مرات بطل العالم IFBB"}</h2>
      <div className="card tl-details">
        <Image 
          id="tl-photo" 
          alt="صورة من الحدث" 
          src={achievements[activeAchievement].photo}
          width={500}
          height={300}
        />
        <div id="tl-text" className="lead" style={{marginTop: "10px"}}>
          {achievements[activeAchievement].title} · {achievements[activeAchievement].year}
        </div>
      </div>
      <div className="timeline" id="timeline" style={{marginTop: "10px"}}>
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`tl-item ${activeAchievement === index ? 'active' : ''}`}
            onClick={() => setActiveAchievement(index)}
          >
            {achievement.year}
          </div>
        ))}
      </div>
    </section>
  );
}
