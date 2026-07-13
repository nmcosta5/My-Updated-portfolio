import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Map, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Sparkles, 
  Github, 
  Globe, 
  X,
  Plus
} from "lucide-react";
import sfx from "../lib/audio";
import { Mission } from "../types";

export default function ProjectMissionSystem() {
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [hoveredMissionId, setHoveredMissionId] = useState<string | null>(null);

  const missions: Mission[] = useMemo(() => [
    {
      id: "cyber-nexus",
      name: "MISSION: CYBER NEXUS",
      category: "FULL-STACK PLATFORM",
      desc: "Holographic workspace hub orchestrating continuous live synchronization, multi-user boards, and reactive asset pipelines.",
      longDesc: "Cyber Nexus acts as a collaborative terminal workspace built specifically for elite engineering teams. Powered by real-time protocols and secure authorization lanes, it synchronizes user profiles, tasks, and system notes with zero millisecond latency overhead.",
      image: "/src/assets/images/project_cyber_nexus_1783926871471.jpg",
      githubUrl: "https://github.com/nmcost5",
      liveUrl: "https://ais-dev-zjf4t67hiol7ap3ybwa6w5-9687561075.europe-west2.run.app",
      difficulty: "LEGENDARY",
      features: [
        "React SPA Architecture with state tracking",
        "Reactive WebSocket channels for synchronized workflows",
        "Secured ABAC firestore database structure",
        "Full fluid drag-and-drop board interfaces"
      ],
      color: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/20 glow-cyan",
      stats: { intel: 99, security: 95, compute: 92 }
    },
    {
      id: "quantum-db",
      name: "MISSION: QUANTUM CORE",
      category: "DATABASE ENGINE",
      desc: "PostgreSQL-backed high-integrity telemetry parser syncing structural databases with complex analytical query paths.",
      longDesc: "Quantum Core is a high-volume analytical repository optimized for indexing structural datasets. Using transactional safety gates, migrations tracking, and advanced DML query paths, it maintains optimal database performance under simulated peak payload loads.",
      image: "/src/assets/images/project_quantum_db_1783926882876.jpg",
      githubUrl: "https://github.com/nmcost5",
      liveUrl: "https://ais-dev-zjf4t67hiol7ap3ybwa6w5-9687561075.europe-west2.run.app",
      difficulty: "HARD",
      features: [
        "PostgreSQL and Drizzle Schema structure mapping",
        "Advanced relational indices and query parsers",
        "Incremental cache mechanisms with Redis",
        "Automated DB migration pipeline tracking"
      ],
      color: "from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/20 glow-violet",
      stats: { intel: 95, security: 98, compute: 94 }
    },
    {
      id: "sentinel-ai",
      name: "MISSION: SENTINEL ENGINE",
      category: "AI ANALYTICS CORE",
      desc: "Server-side pipeline wrapping Gemini generative neural networks for system state extraction and smart insights categorization.",
      longDesc: "Sentinel Engine harnesses modern generative AI pipelines to automatically review, extract parameters, and categorize logs or documents. Features lazy-initialized SDK clients, strict rate-limiting gates, and robust offline-fallback state machines.",
      image: "/src/assets/images/project_sentinel_ai_1783926893684.jpg",
      githubUrl: "https://github.com/nmcost5",
      liveUrl: "https://ais-dev-zjf4t67hiol7ap3ybwa6w5-9687561075.europe-west2.run.app",
      difficulty: "LEGENDARY",
      features: [
        "Full-stack Express API route proxies with Gemini",
        "Lazy initialization patterns to prevent key-startup crashes",
        "Text and prompt embeddings generation",
        "Dynamic markdown reporting engines"
      ],
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20 glow-emerald",
      stats: { intel: 98, security: 91, compute: 99 }
    }
  ], []);

  const handleMissionClick = (mission: Mission) => {
    sfx.playSelect();
    setActiveMission(mission);
  };

  const handleCloseModal = () => {
    sfx.playBack();
    setActiveMission(null);
  };

  const handleHoverMission = (id: string | null) => {
    if (id !== null) {
      sfx.playTick();
    }
    setHoveredMissionId(id);
  };

  return (
    <div id="projects" className="w-full relative py-12 border-b border-white/5">
      
      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-10 space-y-1">
        <div className="flex items-center gap-2 text-cyan-400">
          <Map size={16} />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">TACTICAL_PORTFOLIO_SELECTION</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
          MISSION CONTROL CENTER
        </h2>
        <p className="text-neutral-400 font-light text-sm max-w-xl">
          Select any active operational coordinates below to access classified technical specs, launch repositories, or deploy interfaces.
        </p>
      </div>

      {/* MISSIONS GRID SELECTOR */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map((mission) => {
          const isHovered = hoveredMissionId === mission.id;
          
          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => handleHoverMission(mission.id)}
              onMouseLeave={() => handleHoverMission(null)}
              onClick={() => handleMissionClick(mission)}
              className={`relative rounded-3xl overflow-hidden border bg-neutral-900/30 backdrop-blur-md cursor-pointer transition-all duration-500 flex flex-col justify-between ${
                isHovered 
                  ? "border-cyan-500/30 translate-y-[-6px] shadow-[0_15px_30px_rgba(34,211,238,0.08)] bg-neutral-900/60" 
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              
              {/* Mission image slot */}
              <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/5 relative">
                <img 
                  src={mission.image} 
                  alt={mission.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual glow layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                {/* Level / Difficulty badge */}
                <span className={`absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 font-mono text-[8px] font-black tracking-widest uppercase text-white`}>
                  {mission.difficulty}
                </span>
              </div>

              {/* Mission Content summary */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-mono font-bold px-2 py-0.5 rounded tracking-wide">
                      {mission.category}
                    </span>
                    <div className="size-1 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[7px] font-mono text-neutral-500 tracking-wider">ACTIVE</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-white tracking-wide uppercase">
                    {mission.name}
                  </h3>
                  
                  <p className="text-neutral-400 font-light text-xs leading-relaxed font-sans">
                    {mission.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-neutral-500">
                  <span className="flex items-center gap-1 hover:text-white transition-colors">
                    TACTICAL BRIEFING <ChevronRight size={10} className="text-cyan-400" />
                  </span>
                  <span>LEVEL_0{mission.id === "cyber-nexus" ? 1 : mission.id === "quantum-db" ? 2 : 3}</span>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* DETAILED EXPANDED HOLOGRAPHIC MISSION MODAL */}
      <AnimatePresence>
        {activeMission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal console panel */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              
              {/* Corner brackets */}
              <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 z-20 p-2 bg-neutral-950 hover:bg-neutral-800 border border-white/5 rounded-xl text-neutral-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Header status bar */}
              <div className="bg-neutral-950/60 border-b border-white/5 px-8 py-5 flex justify-between items-center text-neutral-500 font-mono text-[10px]">
                <span className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400 animate-pulse" />
                  COSTA_HUD // CLASSIFIED_MISSION_BRIEFING
                </span>
                <span className="text-cyan-400">STATUS: COMPLETED</span>
              </div>

              {/* Main Content Area */}
              <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                
                {/* Visual split layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Visual Left: Description and Objectives */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                          {activeMission.category}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">TACTICAL_ID_00{activeMission.id}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide uppercase">
                        {activeMission.name}
                      </h3>
                    </div>

                    <p className="text-neutral-300 font-light text-sm leading-relaxed font-sans">
                      {activeMission.longDesc}
                    </p>

                    {/* Core Objectives List */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono flex items-center gap-1.5">
                        <Layers size={12} className="text-cyan-400" />
                        PRIMARY_MISSION_OBJECTIVES (FEATURES)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeMission.features.map((feat, mx) => (
                          <div 
                            key={mx} 
                            className="bg-neutral-950 border border-white/5 text-neutral-300 font-mono text-[10px] p-3 rounded-xl flex items-start gap-2.5 hover:border-cyan-500/20 transition-colors"
                          >
                            <Sparkles size={11} className="text-cyan-400 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Right: Hero Image, Stats & Actions */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    
                    {/* Immersive Preview */}
                    <div className="rounded-2xl overflow-hidden border border-white/5 relative bg-neutral-950 aspect-[16/10]">
                      <img 
                        src={activeMission.image} 
                        alt={activeMission.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Mission Resource Stats */}
                    <div className="bg-neutral-950/60 border border-white/5 rounded-2xl p-4 space-y-3 font-mono text-[10px]">
                      <span className="text-neutral-500 block">MISSION_DIAGNOSTICS:</span>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">INTEL_POTENCY:</span>
                          <span className="text-cyan-400 font-bold">{activeMission.stats.intel}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">SECURITY_INTEGRITY:</span>
                          <span className="text-violet-400 font-bold">{activeMission.stats.security}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">COMPUTE_FORCE:</span>
                          <span className="text-emerald-400 font-bold">{activeMission.stats.compute}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <a
                        href={activeMission.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-neutral-950 hover:bg-neutral-800 border border-white/10 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase font-mono tracking-wider active:scale-95 cursor-pointer"
                      >
                        <Github size={14} />
                        Source Repo
                      </a>
                      <a
                        href={activeMission.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-white hover:bg-neutral-100 text-black font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase font-mono tracking-wider active:scale-95 cursor-pointer shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
                      >
                        <Globe size={14} />
                        Launch Deploy
                      </a>
                    </div>

                  </div>

                </div>

              </div>

              {/* Footer diagnostic block */}
              <div className="bg-neutral-950/60 border-t border-white/5 px-8 py-4 flex items-center justify-between text-neutral-500 font-mono text-[8px] uppercase tracking-widest">
                <span>SYSTEM_NODE: SHARD_0{activeMission.id === "cyber-nexus" ? 1 : 2}</span>
                <span>Security rule verification: Active</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
