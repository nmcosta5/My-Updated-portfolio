import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import sfx from "@/lib/audio";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);

  const handleToggle = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    sfx.setMuted(nextMuted);
    
    // Play a check sound on activation
    if (!nextMuted) {
      setTimeout(() => sfx.playSuccess(), 100);
    }
  };

  return (
    <button
      id="sound-toggle-btn"
      onClick={handleToggle}
      className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2 rounded-xl border font-mono text-[10px] uppercase tracking-widest transition-all duration-300 backdrop-blur-md active:scale-95 ${
        muted
          ? "bg-neutral-900/40 border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700"
          : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:bg-cyan-500/20"
      }`}
    >
      {muted ? (
        <>
          <VolumeX className="size-4 animate-pulse text-neutral-500" />
          <span>AUDIO_OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="size-4 animate-bounce text-cyan-400" />
          <span className="text-cyan-300">AUDIO_ON_AMBIENT</span>
        </>
      )}
    </button>
  );
}
