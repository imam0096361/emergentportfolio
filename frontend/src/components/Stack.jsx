import React from "react";
import { motion } from "framer-motion";
import { stack } from "../data/mock";

const Stack = () => {
  // Marquee items duplicated
  const marquee = stack.flatMap((g) => g.items).concat(stack.flatMap((g) => g.items));

  return (
    <section id="stack" className="relative py-28 md:py-40 px-0 anchor-offset">
      <div className="px-6 md:px-14 lg:px-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> 04 // STACK_MATRIX
            </p>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white">
              TOOLS<span className="text-primary">•</span>I<span className="text-primary">•</span>SHIP<span className="text-primary">.</span>WITH
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="hud-panel p-6 hud-corners group hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] tracking-[0.35em] text-primary">{g.group}</span>
                <span className="font-mono text-[9px] text-white/30">0{i + 1}</span>
              </div>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary/60 group-hover:bg-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-20 border-y border-primary/20 py-6 overflow-hidden">
        <div className="marquee-track font-display font-black uppercase text-5xl md:text-7xl tracking-tight whitespace-nowrap">
          {marquee.map((m, i) => (
            <span key={i} className={i % 2 === 0 ? "text-white/15 hover:text-primary/60 transition-colors" : "text-primary/40"}>
              {m} <span className="text-primary">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
