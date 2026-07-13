import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Zap, Sparkles, Award, Star } from "lucide-react";
import sfx from "@/lib/audio";

interface PlayerStat {
  name: string;
  value: number;
  description: string;
  perks: string[];
}

export default function PlayerProfile() {
  const [activeStat, setActiveStat] = useState<number | null>(null);

  const statsList: PlayerStat[] = [
    {
      name: "FRONTEND FORCE",
      value: 98,
      description: "Crafting highly responsive, animation-heavy client interfaces with flawless responsive layouts.",
      perks: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "D3 / Recharts"]
    },
    {
      name: "BACKEND COMPUTE",
      value: 96,
      description: "Developing robust, secure, and type-safe server nodes and API endpoints that scale gracefully.",
      perks: ["Node.js", "Express.js", "REST / GraphQL", "Python API", "OAuth Integrations"]
    },
    {
      name: "STORAGE ARCHITECTURE",
      value: 92,
      description: "Modeling high-integrity persistent structures, query optimization, and secure ABAC rule schemas.",
      perks: ["Firebase / Firestore", "PostgreSQL", "Supabase", "Redis Cache", "Drizzle ORM"]
    },
    {
      name: "SYSTEM DESIGN",
      value: 95,
      description: "Engineering secure system layouts, microservice maps, and solid pipeline integrations.",
      perks: ["Docker Containers", "GCP Deployment", "Vercel / Netlify", "CI/CD Actions", "API Gateway Proxy"]
    },
    {
      name: "PERFORMANCE OPTIMIZATION",
      value: 94,
      description: "Tracing latency bottlenecks, bundles optimization, and hardware-accelerated rendering.",
      perks: ["Webpack / Vite Tuning", "React Render Profiling", "Memory Leak Audit", "Lighthouse 100/100", "Image Compression"]
    }
  ];

  const handleStatHover = (index: number | null) => {
    if (index !== null) {
      sfx.playTick();
    }
    setActiveStat(index);
  };

  return (
    <div id="player-profile" className="w-full relative py-12 border-b border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: 3D-STYLE AVATAR FRAME */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group w-full max-w-sm">
            {/* Pulsing card shadows */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-700" />
            
            {/* Primary Character Frame */}
            <div className="relative w-full aspect-square bg-neutral-900 border border-white/10 rounded-[2.5rem] p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

              {/* HUD indicators */}
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 tracking-widest uppercase mb-4">
                <span>PLAYER_UPLINK_099</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <span className="size-1 bg-cyan-400 rounded-full animate-ping" /> ONLINE
                </span>
              </div>

              {/* Generated Cyborg Avatar Image */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-neutral-950 mb-4 relative">
                <img 
                  src="/src/assets/images/costa_avatar_1783926857619.jpg" 
                  alt="Nzabana Merci (Costa)" 
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Holographic scanner scan-bar */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent h-1/4 w-full animate-[scan_3s_linear_infinite]" />
              </div>

              {/* Character Header Information */}
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <h3 className="text-xl font-black text-white tracking-wide">NZABANA M. COSTA</h3>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    LVL 99
                  </div>
                </div>
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  FULL-STACK SOFTWARE ENGINEER
                </p>
              </div>

            </div>
          </div>

          {/* PLAYER PERK INJECTOR */}
          <div className="w-full max-w-sm mt-6 grid grid-cols-2 gap-3 font-mono text-[9px] tracking-wider uppercase text-neutral-400">
            <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-3 flex items-center gap-2">
              <Shield size={12} className="text-emerald-400" />
              <div>
                <span className="text-[7px] text-neutral-500 block">DEFENSE</span>
                <span>CLEAN_ARCHITECTURE</span>
              </div>
            </div>
            <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-3 flex items-center gap-2">
              <Zap size={12} className="text-cyan-400 animate-pulse" />
              <div>
                <span className="text-[7px] text-neutral-500 block">UTILITY</span>
                <span>IMMEDIATE_DELIVERY</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED STATS SHEET */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <Award size={16} />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">OPERATIONAL ATTRIBUTES</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
              PLAYER STATS SHEET
            </h2>
            <p className="text-neutral-400 font-light text-sm max-w-xl">
              Equipped with a solid programming arsenal honed across academic campaign milestones and production missions. Hover on any attribute module for detailed tactical perk lists.
            </p>
          </div>

          {/* STATS SLIDER GRID */}
          <div className="space-y-4">
            {statsList.map((stat, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => handleStatHover(idx)}
                onMouseLeave={() => handleStatHover(null)}
                className={`border rounded-2xl p-4 transition-all duration-300 relative cursor-default ${
                  activeStat === idx
                    ? "bg-neutral-900/60 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.05)]"
                    : "bg-neutral-900/20 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-center mb-2 font-mono text-[10px] tracking-widest">
                  <span className={`font-bold transition-colors ${activeStat === idx ? "text-cyan-400" : "text-neutral-300"}`}>
                    {stat.name}
                  </span>
                  <span className="text-neutral-400">
                    STATUS_POTENCY: <strong className="text-white">{stat.value}%</strong>
                  </span>
                </div>

                {/* Progress track */}
                <div className="h-1.5 w-full bg-neutral-950 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      activeStat === idx
                        ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                        : "bg-neutral-800"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* STAT DETAILED INFORMATION HOVER CONSOLE */}
          <div className="h-24 relative overflow-hidden bg-neutral-950 border border-white/5 rounded-2xl p-4 font-mono text-xs">
            {activeStat !== null ? (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1.5"
              >
                <span className="text-[9px] text-cyan-400 block font-bold">PERK UPGRADE MODULES :</span>
                <p className="text-neutral-400 text-[11px] leading-snug line-clamp-2">
                  {statsList[activeStat].description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {statsList[activeStat].perks.map((p, mx) => (
                    <span key={mx} className="bg-neutral-900 text-white border border-white/5 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
                      <Star size={7} className="text-cyan-400" /> {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-neutral-500 gap-1.5">
                <Sparkles size={12} className="text-neutral-500 animate-pulse" />
                <span>Hover over operational statistics for perk detailed logs</span>
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </div>
  );
}
