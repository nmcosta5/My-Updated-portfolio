import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Award, Star, Compass, ArrowRight, ShieldCheck, Trophy } from "lucide-react";
import sfx from "@/lib/audio";
import { CampaignMilestone } from "@/types";

export default function StoryCampaign() {
  const [activeQuest, setActiveQuest] = useState<number | null>(null);

  const milestones: CampaignMilestone[] = useMemo(() => [
    {
      year: "2020 — 2024",
      phase: "STAGE 01: ACADEMIC CODES",
      title: "BS IN SOFTWARE ENGINEERING",
      institution: "ADVENTIST UNIVERSITY OF CENTRAL AFRICA",
      description: "Booted primary programming loops. Mastered algorithmic data arrays, OOP principles, network safety layers, and software design guidelines.",
      status: "COMPLETED"
    },
    {
      year: "2021 — 2022",
      phase: "STAGE 02: BATTLE TESTING",
      title: "JUNIOR FULL-STACK DEVELOPER (INTERNSHIPS)",
      institution: "LOCAL TECH CORES",
      description: "Deployed first continuous integration pipelines. Designed custom relational datastores and refined fluid responsive client interfaces.",
      status: "COMPLETED"
    },
    {
      year: "2022 — 2023",
      phase: "STAGE 03: COMMAND DEPLOYMENT",
      title: "SOFTWARE PLATFORM ENGINEER",
      institution: "HYPER PLATFORM LABS",
      description: "Assumed command over microservices networks, type-safe REST nodes, and multi-tenant Firestore rule configurations.",
      status: "COMPLETED"
    },
    {
      year: "2024 — PRESENT",
      phase: "STAGE 04: LEGENDARY CAMPAIGN",
      title: "SENIOR FULL-STACK SYSTEM DEVELOPER",
      institution: "COSTA DEVELOPMENT LABS",
      description: "Engineering robust, ultra-fast custom client platforms, next-generation database indexing schemas, and Gemini AI agent deployments.",
      status: "ACTIVE"
    }
  ], []);

  const handleQuestHover = (idx: number | null) => {
    if (idx !== null) {
      sfx.playTick();
    }
    setActiveQuest(idx);
  };

  return (
    <div id="experience" className="w-full relative py-12 border-b border-white/5">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-12 space-y-1">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass size={16} />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">CAMPAIGN_CHRONOLOGY_PROGRESSION</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
          CAMPAIGN PROGRESSION
        </h2>
        <p className="text-neutral-400 font-light text-sm max-w-xl">
          Track Costa's progression path across chronological development stages, academic levels, and system upgrades.
        </p>
      </div>

      {/* HORIZONTAL / VERTICAL QUEST STEPS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        
        {/* Background connecting timeline line on desktop */}
        <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-px bg-white/5 z-0" />

        {milestones.map((step, idx) => {
          const isSelected = activeQuest === idx;
          const isActive = step.status === "ACTIVE";
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => handleQuestHover(idx)}
              onMouseLeave={() => handleQuestHover(null)}
              className={`relative z-10 border rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                isSelected
                  ? "bg-neutral-900/80 border-cyan-500/30 shadow-[0_15px_25px_rgba(34,211,238,0.04)] translate-y-[-4px]"
                  : "bg-neutral-900/20 border-white/5 hover:border-white/10"
              }`}
            >
              
              {/* Step indicator node */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[9px] text-neutral-500">{step.year}</span>
                
                <div className={`size-8 rounded-xl border flex items-center justify-center transition-colors ${
                  isActive 
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)] animate-pulse" 
                    : "bg-neutral-950 border-white/5 text-cyan-400"
                }`}>
                  {isActive ? <Trophy size={12} /> : <ShieldCheck size={12} />}
                </div>
              </div>

              {/* Quest Details */}
              <div className="space-y-1 flex-1">
                <span className="font-mono text-[8px] text-cyan-400 uppercase tracking-widest block font-bold">
                  {step.phase}
                </span>
                <h4 className="text-sm font-black text-white tracking-wide uppercase leading-tight line-clamp-2">
                  {step.title}
                </h4>
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider truncate">
                  {step.institution}
                </p>
              </div>

              {/* Status / Trigger */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono tracking-widest text-neutral-500 uppercase">
                <span>QUEST_STATUS:</span>
                <span className={isActive ? "text-amber-400 font-bold" : "text-neutral-400"}>
                  {step.status}
                </span>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* DETAIL CONSOLE FOR ACTIVE HOVERED QUEST */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="bg-neutral-950 border border-white/5 rounded-2xl p-5 min-h-[90px] flex items-center justify-start font-mono text-xs">
          {activeQuest !== null ? (
            <motion.div 
              key={activeQuest}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full"
            >
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-widest">
                  STAGE MISSION DECLASSIFIED:
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed max-w-3xl">
                  {milestones[activeQuest].description}
                </p>
              </div>
              
              <div className="bg-neutral-900 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] shrink-0 font-bold text-white uppercase">
                <Star size={11} className="text-amber-400" />
                <span>Earned XP: +120,000</span>
              </div>
            </motion.div>
          ) : (
            <div className="w-full text-center text-[10px] uppercase tracking-widest text-neutral-500 flex items-center justify-center gap-1.5">
              <Compass size={12} className="text-neutral-500 animate-spin" />
              <span>Hover over stage modules to reveal deep campaign declassified records</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
