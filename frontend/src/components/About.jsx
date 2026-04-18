import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Cpu, Workflow } from "lucide-react";
import { aboutStory, focusDomains, principles, identity } from "../data/mock";
import { SectionHeader } from "./Reveals";

const domainIcon = (code) => {
  switch (code) {
    case "INF": return <Cpu size={14} strokeWidth={1.5} />;
    case "AUT": return <Workflow size={14} strokeWidth={1.5} />;
    case "AI": return <Sparkles size={14} strokeWidth={1.5} />;
    default: return <Shield size={14} strokeWidth={1.5} />;
  }
};

const About = () => {
  return (
    <section id="about" className="relative py-28 md:py-40 px-6 md:px-14 lg:px-24 anchor-offset">
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <SectionHeader
            index={2}
            label="ABOUT"
            title="OPERATOR_PROFILE"
          />
        </div>
        <div className="hidden md:block font-mono text-[10px] tracking-[0.3em] text-white/40 text-right mb-16">
          <div>ID :: {identity.handle}</div>
          <div>LOC :: {identity.location}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Portrait panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4"
        >
          <div className="hud-panel hud-corners p-4 relative">
            <div className="absolute top-3 left-3 z-10 font-mono text-[9px] tracking-[0.3em] text-primary">SUBJECT_01</div>
            <div className="absolute top-3 right-3 z-10 font-mono text-[9px] tracking-[0.3em] text-primary astra-pulse">REC</div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={identity.photo}
                alt={identity.name}
                className="w-full h-full object-cover grayscale contrast-125"
                style={{ filter: "grayscale(1) contrast(1.15) brightness(0.85)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,240,255,0.08) 0%, rgba(5,5,6,0.7) 100%)", mixBlendMode: "screen" }} />
              <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 3px)" }} />
              {/* corner brackets */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-primary" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-primary" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-primary" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-primary" />
              {/* scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #00f0ff, transparent)", boxShadow: "0 0 20px #00f0ff" }}
                initial={{ top: 0 }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[9px] text-white/60 tracking-[0.2em] uppercase">
              <div className="border border-primary/20 p-2">
                <div className="text-white/40 mb-1">NAME</div>
                <div className="text-primary">Imam Chowdhury</div>
              </div>
              <div className="border border-primary/20 p-2">
                <div className="text-white/40 mb-1">EXP</div>
                <div className="text-primary">7+ YRS</div>
              </div>
              <div className="border border-primary/20 p-2 col-span-2">
                <div className="text-white/40 mb-1">ROLE</div>
                <div className="text-primary">{identity.role}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="space-y-5 max-w-3xl">
            {aboutStory.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-white/80 text-lg md:text-xl leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Focus domains */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase mb-4">// FOCUS_DOMAINS</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {focusDomains.map((d, i) => (
                <motion.div
                  key={d.code}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="hud-panel p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-primary mb-2">
                    {domainIcon(d.code)}
                    <span className="font-mono text-[10px] tracking-[0.3em]">{d.code}</span>
                  </div>
                  <p className="text-white/90 text-sm leading-snug">{d.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase mb-4">// OPERATING_PRINCIPLES</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 items-start border-l border-primary/30 pl-4 py-2 hover:border-primary transition-colors"
                >
                  <span className="font-mono text-xs text-primary/70 tracking-widest">{p.k}</span>
                  <div>
                    <p className="text-white font-medium mb-1">{p.t}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{p.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
