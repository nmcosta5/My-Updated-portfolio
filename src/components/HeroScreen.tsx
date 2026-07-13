import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal, Shield, Cpu, Activity, Info } from "lucide-react";
import sfx from "@/lib/audio";

interface HeroScreenProps {
  onStart: () => void;
}

export default function HeroScreen({ onStart }: HeroScreenProps) {
  const [bootStep, setBootStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const logs = [
    "LOG: Initializing security handshake protocols...",
    "SECURE: Verification token [MZ_COSTA_099] accepted.",
    "LOG: Mounting full-stack system dependencies...",
    "NODE: React 19 + TypeScript modules online.",
    "LOG: Connecting to Firebase Cloud Firestore datastore...",
    "DB: Handshake verified on database [ai-studio-92a4d3bd].",
    "LOG: Synthesizing cyber-acoustic synthesizers...",
    "AUDIO: sfx.module.initialized (Audio Engine Safe).",
    "LOG: Synchronizing mission selection boards...",
    "LOG: Complete. System is ready to materialize."
  ];

  useEffect(() => {
    // Incrementally print out the boot logs for a retro gaming terminal effect
    if (bootStep < logs.length) {
      const timer = setTimeout(() => {
        setBootLogs((prev) => [...prev, logs[bootStep]]);
        setBootStep((prev) => prev + 1);
        sfx.playTick();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [bootStep]);

  useEffect(() => {
    // Progress bar loader
    if (progress < 100) {
      const speed = bootStep === logs.length ? 15 : 4;
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(100, prev + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [progress, bootStep]);

  const handleStartExperience = () => {
    sfx.playSelect();
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center p-6 sm:p-12 text-white z-20">
      
      {/* HEADER BAR */}
      <div className="w-full max-w-6xl flex justify-between items-center border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-cyan-400 animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest text-neutral-400">COSTA_SECURE_ACCESS_V4.9</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-500 font-mono text-[9px]">
          <span>GRID_LOC: LAT_2026</span>
          <span className="size-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* CENTER ENTRY COMPONENT */}
      <div className="w-full max-w-3xl flex flex-col items-center justify-center my-auto py-10">
        
        {/* Cinematic Game Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative size-24 mb-8 flex items-center justify-center"
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-400/40 animate-ping opacity-30" />
          <div className="absolute inset-2 rounded-2xl border border-violet-400/30 animate-pulse" />
          
          <div className="absolute inset-0 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center shadow-2xl">
            <Cpu className="size-10 text-cyan-400 animate-[spin_10s_linear_infinite]" />
          </div>
        </motion.div>

        {/* Display Heading */}
        <div className="text-center mb-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase mb-2 font-bold"
          >
            SYSTEM_UPGRADE_INITIATED
          </motion.p>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase select-none leading-none"
          >
            COSTA'S SYSTEM
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-neutral-400 font-mono text-xs sm:text-sm tracking-widest mt-3 uppercase"
          >
            Full Stack Developer | Architect | Builder
          </motion.p>
        </div>

        {/* LOADING TERMINAL HUD */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-xl bg-neutral-950/80 border border-white/5 rounded-2xl p-5 font-mono text-[10px] text-neutral-400 space-y-1.5 shadow-2xl backdrop-blur-lg mb-8 text-left"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-neutral-500">
            <span className="flex items-center gap-1.5 text-[8px] font-bold tracking-wider">
              <Terminal size={12} className="text-cyan-400" /> SYSTEM_INITIALIZATION_LOG
            </span>
            <span>ID: 0x92A4D</span>
          </div>

          <div className="h-28 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {bootLogs.map((log, index) => (
              <div 
                key={index} 
                className={`transition-all duration-300 ${
                  log.startsWith("SECURE:") || log.startsWith("DB:") || log.startsWith("AUDIO:")
                    ? "text-cyan-400" 
                    : log.startsWith("NODE:") 
                    ? "text-emerald-400" 
                    : "text-neutral-400"
                }`}
              >
                {log}
              </div>
            ))}
            {bootStep < logs.length && (
              <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5" />
            )}
          </div>

          {/* Loading metric indicator */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[8px] text-neutral-500">
            <span>READY_RESOURCES: {bootStep}/{logs.length}</span>
            <span>CPU_STABILITY: 100%</span>
          </div>
        </motion.div>

        {/* IMMERSIVE PROGRESS GAUGE */}
        <div className="w-full max-w-sm space-y-2 mb-8">
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 tracking-wider">
            <span>UPLINK_BANDWIDTH</span>
            <span className="font-bold text-cyan-400">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-neutral-900 border border-white/5 rounded-full overflow-hidden p-[1px]">
            <motion.div 
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.4)]"
            />
          </div>
        </div>

        {/* CTA GAME ENTRY BUTTON */}
        <AnimatePresence mode="wait">
          {isLoaded ? (
            <motion.button
              key="start-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartExperience}
              className="group relative px-10 py-4 bg-white text-black font-mono font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center gap-3 transition-all duration-300 border border-white cursor-pointer hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
            >
              <span className="absolute inset-0 bg-cyan-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Play size={14} className="fill-current text-black" />
              <span>START_EXPERIENCE</span>
            </motion.button>
          ) : (
            <div className="h-[48px] flex items-center font-mono text-[10px] tracking-widest text-neutral-500 uppercase animate-pulse">
              Buffering Experience Coordinates...
            </div>
          )}
        </AnimatePresence>

      </div>

      {/* FOOTER BAR */}
      <div className="w-full max-w-6xl border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] font-mono text-neutral-500">
        <span className="flex items-center gap-1">
          <Activity size={12} className="text-emerald-500" /> PORT 3000 UPLINK ONLINE
        </span>
        <span className="uppercase">Vite Core Server OK — Click Start</span>
      </div>

    </div>
  );
}
