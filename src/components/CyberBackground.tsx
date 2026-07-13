import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CyberBackground() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Convert to normalized coordinates (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x * 35); // Max 35px shift
      mouseY.set(y * 35);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark Ambient Base Gradation */}
      <div className="absolute inset-0 bg-neutral-950" />

      {/* Cybernetic Radial Grid Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-neutral-950 to-neutral-950" />

      {/* Parallax Layer - Dynamic Star Matrix / Coordinate grid */}
      <motion.div 
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-[-40px] opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* Dynamic scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-20" />

      {/* Ambient floating glowing orbs */}
      <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[140px]" />
      <div className="absolute top-[50%] left-[60%] w-80 h-80 rounded-full bg-emerald-500/5 blur-[110px]" />

      {/* Bottom perspective digital grid (retro/gamer aesthetic) */}
      <div className="absolute bottom-0 left-0 w-full h-[35vh] overflow-hidden opacity-[0.12] [perspective:400px]">
        <div className="absolute inset-0 [transform:rotateX(60deg)] [transform-origin:top] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_20%,transparent_100%)]">
          <div className="w-full h-[200%] bg-[linear-gradient(to_right,#06b6d4_2px,transparent_2px),linear-gradient(to_bottom,#06b6d4_2px,transparent_2px)] bg-[size:50px_50px] animate-[grid_20s_linear_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes grid {
          from { transform: translateY(0); }
          to { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
}
