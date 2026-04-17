import React from "react";
import { motion } from "framer-motion";
import { timeline, awards } from "../data/mock";
import { Award } from "lucide-react";

const Timeline = () => {
  return (
    <section id="timeline" className="relative py-28 md:py-40 px-6 md:px-14 lg:px-24 anchor-offset">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-primary" /> 05 // TRAJECTORY
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white">
            CAREER<span className="text-primary">_</span>ARC
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Timeline */}
        <div className="lg:col-span-8">
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative mb-12 last:mb-0"
              >
                <span
                  className="absolute -left-[34px] md:-left-[42px] top-2 w-3 h-3 bg-primary"
                  style={{ boxShadow: "0 0 12px #00f0ff" }}
                />
                <p className="font-mono text-[10px] tracking-[0.35em] text-primary mb-2">{t.year}</p>
                <h3 className="font-display font-black text-2xl md:text-3xl text-white leading-tight">
                  {t.role}
                </h3>
                <p className="font-mono text-[11px] tracking-widest text-white/40 uppercase mt-1 mb-3">
                  @ {t.org}
                </p>
                <p className="text-white/70 text-base leading-relaxed max-w-2xl">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="lg:col-span-4">
          <div className="hud-panel hud-corners p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award size={14} strokeWidth={1.5} className="text-primary" />
              <span className="font-mono text-[10px] tracking-[0.35em] text-primary">RECOGNITION</span>
            </div>
            <ul className="space-y-6">
              {awards.map((a, i) => (
                <motion.li
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="border-l border-primary/30 pl-4"
                >
                  <p className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-1">{a.id}</p>
                  <p className="font-display font-bold text-lg text-white leading-tight">{a.title}</p>
                  <p className="font-mono text-[10px] tracking-widest text-primary/80 uppercase mt-1">{a.org}</p>
                  <p className="text-white/60 text-sm leading-relaxed mt-2">{a.note}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
