import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { identity } from "../data/mock";

const capabilities = [
  { k: "01", t: "Process Automation", d: "Eliminate repetitive operational work with auditable, production-grade pipelines." },
  { k: "02", t: "AI Content Systems", d: "Transcription, translation, sub-editing — guardrailed, reviewable, aligned to house style." },
  { k: "03", t: "Infrastructure Hardening", d: "Reliable Linux / Windows / VMware / Docker estates with security baked in." },
  { k: "04", t: "Ops Integrations", d: "Connect CMS, storage, archives, messaging — one coherent operational fabric." }
];

const AutomateBD = () => {
  return (
    <section id="studio" className="relative py-28 md:py-40 px-6 md:px-14 lg:px-24 anchor-offset overflow-hidden">
      {/* ambient glow */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,0,229,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-primary" /> 06 // STUDIO_SPOTLIGHT
          </p>

          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tighter text-white leading-[0.9] mb-6">
            Automate<span className="text-primary">BD</span>
          </h2>

          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-lg mb-8">
            {identity.agency.tagline} An independent studio building automation and AI systems for organizations that need real-world reliability — not flashy prototypes.
          </p>

          <a
            href={identity.agency.url}
            target="_blank"
            rel="noreferrer"
            className="btn-astra group"
          >
            <Zap size={12} strokeWidth={1.75} />
            VISIT {identity.agency.url.replace("https://", "").toUpperCase()}
            <ArrowUpRight size={12} strokeWidth={1.75} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <div className="border border-primary/20 p-3">
              <div className="font-display font-black text-2xl text-primary">7+</div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mt-1">YRS EXP</div>
            </div>
            <div className="border border-primary/20 p-3">
              <div className="font-display font-black text-2xl text-primary">08</div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mt-1">SYS LIVE</div>
            </div>
            <div className="border border-primary/20 p-3">
              <div className="font-display font-black text-2xl text-primary">24/7</div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mt-1">UPTIME</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="hud-panel hud-corners p-6 relative group hover:border-primary/40 transition-colors"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-primary/70">// {c.k}</span>
                  <ArrowUpRight size={14} strokeWidth={1.5} className="text-white/30 group-hover:text-primary group-hover:rotate-12 transition-all" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{c.t}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomateBD;
