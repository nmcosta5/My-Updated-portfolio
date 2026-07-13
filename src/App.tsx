import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Cpu, 
  Activity, 
  User, 
  Map, 
  BookOpen, 
  Compass, 
  MessageSquare,
  Sparkles,
  Volume2
} from "lucide-react";
import CyberBackground from "./components/CyberBackground";
import HeroScreen from "./components/HeroScreen";
import PlayerProfile from "./components/PlayerProfile";
import ProjectMissionSystem from "./components/ProjectMissionSystem";
import TechArsenal from "./components/TechArsenal";
import StoryCampaign from "./components/StoryCampaign";
import ContactTerminal from "./components/ContactTerminal";
import SoundToggle from "./components/SoundToggle";
import sfx from "./lib/audio";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [timeCoords, setTimeCoords] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "PROFILE" | "MISSIONS" | "ARSENAL" | "CAMPAIGN" | "LINK">("ALL");

  // Real-time HUD system clock coordinates
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatDigit = (num: number) => num.toString().padStart(2, "0");
      setTimeCoords(
        `${formatDigit(now.getUTCHours())}:${formatDigit(now.getUTCMinutes())}:${formatDigit(
          now.getUTCSeconds()
        )}__GMT`
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabSelect = (tab: typeof activeTab) => {
    sfx.playSelect();
    setActiveTab(tab);
    
    // Smooth scroll to target viewport element
    const elementId = {
      ALL: "top-arena",
      PROFILE: "player-profile",
      MISSIONS: "projects",
      ARSENAL: "skills",
      CAMPAIGN: "experience",
      LINK: "contact"
    }[tab];

    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-neutral-100 overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      
      {/* Immersive animated background layer */}
      <CyberBackground />

      {/* FIXED SOUND STATUS */}
      {booted && <SoundToggle />}

      <AnimatePresence mode="wait">
        {!booted ? (
          <motion.div
            key="hero-state"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <HeroScreen onStart={() => setBooted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full min-h-screen flex flex-col justify-between"
          >
            
            {/* HUD HEADER BAR */}
            <header className="sticky top-0 z-40 bg-neutral-950/60 backdrop-blur-md border-b border-white/5 px-6 sm:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center">
                  <Cpu className="size-4 text-cyan-400 animate-spin" />
                </div>
                <div>
                  <h2 className="text-sm font-black tracking-widest text-white leading-none">
                    NZABANA_COSTA.SYS
                  </h2>
                  <span className="font-mono text-[8px] tracking-widest text-neutral-500 uppercase">
                    Full-Stack Core Node // Live Sync
                  </span>
                </div>
              </div>

              {/* HUD center system information */}
              <div className="flex items-center gap-6 font-mono text-[9px] tracking-widest text-neutral-400">
                <span className="hidden md:inline-block">SYS_LINK: ACTIVE</span>
                <span className="text-cyan-400 font-bold">{timeCoords}</span>
              </div>
            </header>

            {/* DASHBOARD COMPONENT TABS (Gaming Menu style) */}
            <div className="w-full bg-neutral-950/20 border-b border-white/5 py-3 sticky top-[73px] z-30 backdrop-blur-md px-6 sm:px-12">
              <div className="max-w-6xl mx-auto flex flex-wrap justify-center sm:justify-start gap-1.5 font-mono text-[9px] tracking-widest uppercase">
                {([
                  { label: "ALL_LOBBY", key: "ALL", icon: Sparkles },
                  { label: "PLAYER_PROFILE", key: "PROFILE", icon: User },
                  { label: "MISSION_SYSTEM", key: "MISSIONS", icon: Map },
                  { label: "TECH_ARSENAL", key: "ARSENAL", icon: Cpu },
                  { label: "CAMPAIGN_ROAD", key: "CAMPAIGN", icon: Compass },
                  { label: "SECURE_LINK", key: "LINK", icon: MessageSquare }
                ] as const).map(({ label, key, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleTabSelect(key)}
                    className={`px-3.5 py-2 rounded-xl border transition-all active:scale-95 flex items-center gap-2 cursor-pointer ${
                      activeTab === key
                        ? "bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                        : "bg-neutral-900/40 border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
                    }`}
                  >
                    <Icon size={11} className="shrink-0" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN HUD CONTENT SCREEN */}
            <main id="top-arena" className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-12 py-8 space-y-6">
              
              {/* Conditional viewport layers based on active coordinates */}
              {(activeTab === "ALL" || activeTab === "PROFILE") && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PlayerProfile />
                </motion.div>
              )}

              {(activeTab === "ALL" || activeTab === "MISSIONS") && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectMissionSystem />
                </motion.div>
              )}

              {(activeTab === "ALL" || activeTab === "ARSENAL") && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TechArsenal />
                </motion.div>
              )}

              {(activeTab === "ALL" || activeTab === "CAMPAIGN") && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <StoryCampaign />
                </motion.div>
              )}

              {(activeTab === "ALL" || activeTab === "LINK") && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ContactTerminal />
                </motion.div>
              )}

            </main>

            {/* IMMERSIVE DIAGNOSTIC HUD FOOTER */}
            <footer className="w-full border-t border-white/5 bg-neutral-950/60 backdrop-blur-md px-6 sm:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-neutral-500">
              <div className="flex items-center gap-2">
                <Activity className="size-3.5 text-emerald-500" />
                <span>ALL_COORDS_UPLINKED // HOST: PORT_3000</span>
              </div>
              
              <div className="flex gap-6 uppercase">
                <span>Database sync: secure</span>
                <span>Audio Engine: Web_Audio_API</span>
                <span>© {new Date().getFullYear()} Costa System Inc.</span>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
