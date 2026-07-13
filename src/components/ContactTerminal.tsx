import React, { useState, useEffect, useMemo } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { Send, Terminal, Key, Shield, MessageSquare, Sparkles } from "lucide-react";
import sfx from "@/lib/audio";
import { db } from "@/lib/firebase";

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "GENERAL_INTEL",
    message: ""
  });

  const [logs, setLogs] = useState<string[]>([
    "CONSOLE: Uplink active. Waiting for input parameters...",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");

  // Push messages to the terminal emulator screen
  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    sfx.playTick();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    sfx.playTick();
  };

  const validateEmail = (email: string) => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  };

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    sfx.playSelect();

    // Reset state
    setSubmitStatus("IDLE");
    setLogs(["CONSOLE: Initializing secure handshake protocol..."]);

    const { name, email, subject, message } = formData;

    // Validate parameters
    if (!name.trim()) {
      addLog("ERROR: SENDER_NAME parameter is empty.");
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      addLog("ERROR: SENDER_EMAIL matches invalid email criteria.");
      return;
    }
    if (!message.trim() || message.length > 5000) {
      addLog("ERROR: TRANSMISSION_ENVELOPE empty or exceeds 5000 characters.");
      return;
    }

    setIsSubmitting(true);
    addLog("PARAMS: Input data vectors validated successfully.");
    addLog("SECURE: Connecting to Firebase client gateway...");

    try {
      // Create new transmission record
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: serverTimestamp() // Matches 'request.time' in Firestore security rules!
      });

      addLog("DB: Write accepted. Handshake successful.");
      addLog("SUCCESS: Uplink message dispatched cleanly into firestore.messages.");
      setSubmitStatus("SUCCESS");
      sfx.playSuccess();
      
      // Clear envelope
      setFormData({ name: "", email: "", subject: "GENERAL_INTEL", message: "" });
    } catch (err) {
      console.error("Transmission failure:", err);
      addLog(`ERROR: Transmission handshake failed: ${err instanceof Error ? err.message : "Unknown error"}`);
      setSubmitStatus("ERROR");
      sfx.playBack();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="w-full relative py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: CONTACT TRANSMISSION HUD FORM */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <MessageSquare size={16} />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">TACTICAL_TRANSMISSION_LINK</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
              SECURE COMMUNICATION LINK
            </h2>
            <p className="text-neutral-400 font-light text-sm max-w-xl">
              Initiate a high-priority system transmission below. Handshake protocols are fully validated and stored securely in Firebase Cloud Firestore.
            </p>
          </div>

          <form onSubmit={handleTransmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block">
                  SENDER_NAME (ID)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Commander Guest"
                    required
                    className="w-full bg-neutral-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 focus:bg-neutral-900/80 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block">
                  SENDER_EMAIL (COORDS)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. guest@uplink.net"
                  required
                  className="w-full bg-neutral-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 focus:bg-neutral-900/80 transition-all font-mono"
                />
              </div>

            </div>

            {/* Subject Select */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block">
                TRANSMISSION_CHANNEL
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-neutral-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/40 focus:bg-neutral-900/80 transition-all font-mono"
              >
                <option value="GENERAL_INTEL">GENERAL_INTEL (General Message)</option>
                <option value="CONTRACT_QUEST">CONTRACT_QUEST (Project Proposal)</option>
                <option value="ALLIANCE_LINK">ALLIANCE_LINK (Partnership/Job)</option>
              </select>
            </div>

            {/* Message Envelope */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block">
                TRANSMISSION_ENVELOPE (MESSAGE)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                maxLength={5000}
                placeholder="Compose secure package here..."
                required
                className="w-full bg-neutral-900/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 focus:bg-neutral-900/80 transition-all font-sans font-light resize-none"
              />
            </div>

            {/* Submit Transmitter */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-mono text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-white/10 ${
                isSubmitting
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : "bg-white text-black hover:bg-neutral-100 cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
              }`}
            >
              <Send size={12} className="text-current" />
              <span>{isSubmitting ? "TRANSMITTING..." : "TRANSMIT_PACKAGE"}</span>
            </button>

          </form>
        </div>

        {/* RIGHT COLUMN: CYBERNETIC CONSOLE SCREEN LOGS */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-[2.5rem] blur opacity-20 pointer-events-none" />
            
            <div className="relative w-full bg-neutral-950 border border-white/10 rounded-[2.5rem] p-6 flex flex-col justify-between min-h-[350px] overflow-hidden font-mono text-[10px]">
              
              {/* Corner brackets */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 text-neutral-500">
                <span className="flex items-center gap-1.5 text-[8px] font-bold tracking-wider">
                  <Terminal size={12} className="text-cyan-400" /> SYSTEM_COMM_UPLINK
                </span>
                <span>DB_SYS_0x44</span>
              </div>

              {/* Scrolling Console Lines */}
              <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[220px] pr-1 custom-scrollbar text-left">
                {logs.map((log, index) => {
                  let textClass = "text-neutral-400";
                  if (log.includes("ERROR:")) textClass = "text-rose-400 font-bold";
                  if (log.includes("SUCCESS:")) textClass = "text-emerald-400 font-bold animate-pulse";
                  if (log.includes("PARAMS:") || log.includes("SECURE:")) textClass = "text-cyan-400";
                  if (log.includes("DB:")) textClass = "text-violet-400";

                  return (
                    <div key={index} className={`transition-all duration-300 ${textClass}`}>
                      {log}
                    </div>
                  );
                })}
              </div>

              {/* Success badge overlay */}
              {submitStatus === "SUCCESS" && (
                <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-[9px] uppercase tracking-wider animate-bounce">
                  <Sparkles size={12} />
                  <span>Secure Uplink Verified. Costa will respond on your coordinates.</span>
                </div>
              )}

              {/* Console diagnostics footer */}
              <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[7px] text-neutral-500 uppercase tracking-widest">
                <span>HANDSHAKE: OK</span>
                <span>COSTA_GATEWAY: CONNECTED</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
