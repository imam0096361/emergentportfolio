import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { systems } from "../data/mock";

const Systems = () => {
  const [active, setActive] = useState(systems[0].id);
  const sys = systems.find((s) => s.id === active) || systems[0];

  return (
    <section id="systems" className="relative py-28 md:py-40 px-6 md:px-14 lg:px-24 anchor-offset">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-primary" /> 03 // SYSTEMS_DEPLOYED
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white">
            PRODUCTION<span className="text-primary">.</span>SYSTEMS
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl">
            Actively-running automation and AI pipelines powering a real newsroom — not demos.
          </p>
        </div>
        <div className="hidden md:block font-mono text-[10px] tracking-[0.3em] text-white/40 text-right">
          <div>COUNT :: {String(systems.length).padStart(2, "0")}</div>
          <div>STATE :: OPERATIONAL</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List */}
        <div className="lg:col-span-5">
          <ul className="divide-y divide-primary/10 border-y border-primary/10">
            {systems.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`w-full text-left py-5 px-4 flex items-center gap-4 transition-colors group ${
                    active === s.id ? "bg-primary/5" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-primary/60 w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="tag">{s.category}</span>
                  <span className={`flex-1 font-display font-bold tracking-tight text-base md:text-lg ${active === s.id ? "text-primary" : "text-white group-hover:text-primary"}`}>
                    {s.title}
                  </span>
                  <ChevronRight size={14} strokeWidth={1.5} className={active === s.id ? "text-primary" : "text-white/30 group-hover:text-primary"} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Detail */}
        <div className="lg:col-span-7">
          <div className="hud-panel hud-corners p-6 md:p-8 min-h-[420px] relative overflow-hidden">
            <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.3em] text-primary astra-pulse">LIVE</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-primary">{sys.id}</span>
                  <span className="w-px h-3 bg-primary/40" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/50">{sys.category}</span>
                </div>
                <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4">
                  {sys.title}
                </h3>
                <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-8">
                  {sys.summary}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {sys.metrics.map((m) => (
                    <div key={m.k} className="border border-primary/20 p-4 bg-black/30">
                      <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-2">{m.k}</div>
                      <div className="font-display font-bold text-2xl text-primary">{m.v}</div>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div>
                  <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-3">// STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {sys.stack.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Decorative wireframe corner */}
                <svg className="absolute -bottom-10 -right-10 w-64 h-64 opacity-20 pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#00f0ff" strokeWidth="0.3" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#00f0ff" strokeWidth="0.3" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#ff00e5" strokeWidth="0.3" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#00f0ff" strokeWidth="0.2" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="#00f0ff" strokeWidth="0.2" />
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Systems;
