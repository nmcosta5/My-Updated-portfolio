import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Star, Zap, Layers, Sparkles } from "lucide-react";
import sfx from "../lib/audio";
import { SkillItem } from "../types";

export default function TechArsenal() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "FRONTEND" | "BACKEND" | "SYSTEMS" | "TOOLS">("ALL");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const skills: SkillItem[] = useMemo(() => [
    {
      name: "TypeScript",
      level: 96,
      category: "FRONTEND",
      rarity: "LEGENDARY",
      description: "Ultimate syntactic compiler shielding codebases from standard architectural runtime errors with complex structured types."
    },
    {
      name: "React.js",
      level: 98,
      category: "FRONTEND",
      rarity: "LEGENDARY",
      description: "High-grade virtual DOM rendering grid, triggering lightning-fast state transitions and optimized fiber reconciliations."
    },
    {
      name: "Next.js",
      level: 92,
      category: "FRONTEND",
      rarity: "EPIC",
      description: "App Router mechanics syncing client interfaces with server-side rendered layouts and smart route optimization."
    },
    {
      name: "Node.js & Express",
      level: 95,
      category: "BACKEND",
      rarity: "EPIC",
      description: "High-throughput asynchronous engine powering reliable RESTful nodes, proxies, and full-stack route endpoints."
    },
    {
      name: "PostgreSQL",
      level: 91,
      category: "SYSTEMS",
      rarity: "EPIC",
      description: "Relational containment database holding complex custom transactional schemas with deep relational query paths."
    },
    {
      name: "Firebase",
      level: 94,
      category: "SYSTEMS",
      rarity: "EPIC",
      description: "Durable Cloud firestore storage and secure user authentication nodes with ABAC-validated rules files."
    },
    {
      name: "Framer Motion",
      level: 95,
      category: "FRONTEND",
      rarity: "RARE",
      description: "Aero-dynamic motion engine handling clean keyframe layout transitions and smooth micro-interaction physics."
    },
    {
      name: "Drizzle ORM",
      level: 88,
      category: "SYSTEMS",
      rarity: "RARE",
      description: "Lightweight type-safe SQL query map translating programmatic objects directly into structured relational operations."
    },
    {
      name: "Tailwind CSS",
      level: 97,
      category: "FRONTEND",
      rarity: "EPIC",
      description: "Atomic styling utility mapping high-fidelity design specifications directly onto responsive fluid grids."
    },
    {
      name: "Docker Containers",
      level: 85,
      category: "TOOLS",
      rarity: "RARE",
      description: "Self-contained software pods preserving environmental parity across development loops and production runtimes."
    },
    {
      name: "Git & Actions",
      level: 90,
      category: "TOOLS",
      rarity: "RARE",
      description: "Version verification nodes driving distributed sync pipelines and automated build-and-test integrations."
    }
  ], []);

  // Filter skills based on chosen category
  const filteredSkills = useMemo(() => {
    if (activeCategory === "ALL") return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  const handleSelectCategory = (cat: typeof activeCategory) => {
    sfx.playSelect();
    setActiveCategory(cat);
    // Auto reset selected skill or pick first one
    setSelectedSkill(null);
  };

  const handleSelectSkill = (skill: SkillItem) => {
    sfx.playTick();
    setSelectedSkill(skill);
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "LEGENDARY":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      case "EPIC":
        return "bg-purple-500/10 border-purple-500/30 text-purple-400";
      case "RARE":
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
      default:
        return "bg-neutral-500/10 border-neutral-500/30 text-neutral-400";
    }
  };

  return (
    <div id="skills" className="w-full relative py-12 border-b border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: GEAR LIST AND CATEGORY CONTROLS */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <Cpu size={16} />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">TACTICAL_EQUIPMENT_LOADOUT</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
              TECH ARSENAL
            </h2>
            <p className="text-neutral-400 font-light text-sm max-w-xl">
              Inspect Costa's passive attributes and active operational weaponry below. Filter weapons by module slot, and select a weapon blueprint for diagnostics.
            </p>
          </div>

          {/* CATEGORY TABS BAR */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 font-mono text-[9px] tracking-widest">
            {["ALL", "FRONTEND", "BACKEND", "SYSTEMS", "TOOLS"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat as any)}
                className={`px-3 py-1.5 rounded-lg border transition-all active:scale-95 uppercase ${
                  activeCategory === cat
                    ? "bg-white text-black border-white font-bold"
                    : "bg-neutral-900/40 border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* EQUIPMENT GRID CELLS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredSkills.map((skill, idx) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectSkill(skill)}
                  className={`border rounded-2xl p-4 cursor-pointer transition-all duration-300 relative flex flex-col justify-between aspect-[1.15] ${
                    isSelected
                      ? "bg-neutral-900/80 border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.08)]"
                      : "bg-neutral-900/20 border-white/5 hover:bg-neutral-900/40 hover:border-white/10"
                  }`}
                >
                  {/* Skill Rarity Tag */}
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[6px] font-mono font-black tracking-widest px-1.5 py-0.5 rounded uppercase border ${getRarityBadge(skill.rarity)}`}>
                      {skill.rarity}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">+{skill.level}%</span>
                  </div>

                  {/* Weapon Name */}
                  <div className="space-y-1 mt-auto">
                    <span className="text-[7px] font-mono text-neutral-500 uppercase block">
                      SLOT_{skill.category}
                    </span>
                    <h4 className={`text-sm font-black uppercase tracking-wide truncate ${isSelected ? "text-cyan-400" : "text-white"}`}>
                      {skill.name}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE BLUEPRINT CONSOLE DIAGNOSTICS */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-[2.5rem] blur opacity-30 pointer-events-none" />
            
            <div className="relative w-full bg-neutral-950 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[400px] overflow-hidden">
              
              {/* Corner brackets */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 flex-1 flex flex-col justify-between py-2"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono text-cyan-400 block font-bold tracking-widest uppercase">
                          TACTICAL_SLOT // {selectedSkill.category}
                        </span>
                        <h3 className="text-2xl font-black text-white tracking-wide uppercase">
                          {selectedSkill.name}
                        </h3>
                      </div>
                      
                      <div className={`px-2 py-1 rounded text-[8px] font-mono font-black border uppercase tracking-widest ${getRarityBadge(selectedSkill.rarity)}`}>
                        {selectedSkill.rarity}
                      </div>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono text-neutral-500 block uppercase font-bold tracking-widest">
                        Arsenal description / Blueprint log:
                      </span>
                      <p className="text-neutral-400 text-xs leading-relaxed font-sans font-light">
                        {selectedSkill.description}
                      </p>
                    </div>
                  </div>

                  {/* Level gauge circles */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                      <span>BLUEPRINT_STABILITY:</span>
                      <span className="text-white font-bold">{selectedSkill.level}%</span>
                    </div>
                    
                    <div className="h-2 w-full bg-neutral-900 border border-white/5 rounded-full overflow-hidden p-[1px]">
                      <div 
                        style={{ width: `${selectedSkill.level}%` }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[8px] font-mono text-neutral-500">
                      <div className="bg-neutral-900 border border-white/5 rounded-lg p-2 uppercase">
                        CRIT_CHANCE: <strong className="text-emerald-400">+{selectedSkill.level - 50}%</strong>
                      </div>
                      <div className="bg-neutral-900 border border-white/5 rounded-lg p-2 uppercase">
                        UPGRADE_STABILITY: <strong className="text-cyan-400">OPTIMAL</strong>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                  <Cpu className="size-10 text-neutral-600 animate-pulse mb-4" />
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 max-w-[200px]">
                    Select a tech weapon slot for detailed diagnostic specifications
                  </span>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
