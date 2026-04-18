import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Cpu, Radar } from "lucide-react";
import HeroScene from "./HeroScene";
import { identity, telemetry } from "../data/mock";

/* --- Magnetic Button ------------------------------------------------------ */
const MagneticBtn = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </button>
  );
};

/* --- Split Text letter-by-letter reveal (mask-based, preserves gradient) --- */
const SplitReveal = ({ text, delay = 0, className, style, as: Tag = "span" }) => {
  return (
    <Tag className={className} aria-label={text} style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{
            verticalAlign: "top",
            lineHeight: 1
          }}
        >
          <span
            className="inline-block"
            style={{
              ...style,
              display: "inline-block",
              animation: `heroLetterRise 0.95s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * 0.04}s both`
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </Tag>
  );
};

const Hero = () => {
  const [time, setTime] = useState("");
  const [coords, setCoords] = useState("00.00 / 00.00");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      setTime(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const move = (e) => {
      const x = ((e.clientX / window.innerWidth) * 180 - 90).toFixed(2);
      const y = ((e.clientY / window.innerHeight) * 90 - 45).toFixed(2);
      setCoords(`${x} / ${y}`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden anchor-offset">
      {/* grid */}
      <div className="astra-grid" />
      {/* 3D Scene */}
      <HeroScene />

      {/* HUD framing */}
      <div className="absolute top-28 left-6 md:left-12 w-24 h-px bg-primary/30 z-10" />
      <div className="absolute top-28 left-6 md:left-12 w-px h-24 bg-primary/30 z-10" />
      <div className="absolute bottom-10 right-6 md:right-12 w-24 h-px bg-primary/30 z-10" />
      <div className="absolute bottom-10 right-6 md:right-12 w-px h-24 bg-primary/30 z-10" />

      {/* content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center pt-32 pb-24 px-6 md:px-14 lg:px-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tag pointer-events-auto">
              <span className="w-1.5 h-1.5 bg-primary astra-pulse" style={{ boxShadow: "0 0 8px #00f0ff" }} />
              SYS.INIT // {time}
            </span>
            <span className="tag hidden md:inline-flex pointer-events-auto">
              <Radar size={10} strokeWidth={1.5} /> SECTOR {telemetry.sector}
            </span>
          </div>

          <div className="relative">
            <span className="absolute -left-6 top-2 text-[10px] font-mono text-primary tracking-widest hidden md:block">01</span>
            <h1
              className="font-display font-black uppercase leading-[0.82] tracking-tighter overflow-hidden"
              style={{ fontSize: "clamp(3.2rem, 11vw, 11rem)" }}
            >
              <SplitReveal
                text="IMAM"
                delay={0.2}
                className="block"
                style={{
                  background: "linear-gradient(120deg, #ffffff 0%, #cffcff 45%, #00f0ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "#00f0ff",
                  textShadow: "0 0 40px rgba(0,240,255,0.35)"
                }}
              />
              <SplitReveal
                text="CHOWDHURY"
                delay={0.55}
                className="block"
                style={{
                  background: "linear-gradient(120deg, #ffffff 0%, #8ff7ff 55%, #00f0ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "#00f0ff",
                  textShadow: "0 0 40px rgba(0,240,255,0.35)"
                }}
              />
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            className="mt-8 max-w-xl font-mono text-[13px] md:text-sm text-hud leading-relaxed border-l border-primary/40 pl-5 py-1 bg-gradient-to-r from-primary/5 to-transparent pointer-events-auto"
          >
            &gt; {identity.role.toUpperCase()}. {identity.yearsExperience}+ YEARS.
            <br />
            &gt; {identity.tagline}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto"
          >
            <MagneticBtn
              onClick={() => document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-astra"
            >
              <Cpu size={12} strokeWidth={1.75} />
              EXPLORE SYSTEMS
            </MagneticBtn>
            <MagneticBtn
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-astra btn-astra-ghost"
            >
              INITIATE CONTACT
              <ArrowDownRight size={12} strokeWidth={1.75} />
            </MagneticBtn>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom HUD telemetry */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-6 md:px-14 flex items-end justify-between gap-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="hud-panel hud-corners p-3 pointer-events-auto hidden md:flex items-center gap-6"
        >
          <div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em] mb-1">COORDS</p>
            <p className="font-mono text-xs text-primary tracking-widest">{coords}</p>
          </div>
          <div className="w-px h-8 bg-primary/20" />
          <div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em] mb-1">FLUID_VEL</p>
            <p className="font-mono text-xs text-primary tracking-widest">{telemetry.fluidVel}</p>
          </div>
          <div className="w-px h-8 bg-primary/20" />
          <div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em] mb-1">UPTIME</p>
            <p className="font-mono text-xs text-primary tracking-widest">{telemetry.uptime}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="hud-panel hud-corners p-3 pointer-events-auto ml-auto"
        >
          <p className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em] mb-2">ENV.STATUS</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-hud font-mono uppercase tracking-widest">LUM</span>
              <div className="w-28 h-px bg-white/10 relative">
                <div className="absolute inset-y-0 right-0 bg-primary" style={{ width: `${telemetry.luminescence * 100}%`, boxShadow: "0 0 10px #00f0ff" }} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-hud font-mono uppercase tracking-widest">DIM</span>
              <div className="w-28 h-px bg-white/10 relative">
                <div className="absolute inset-y-0 right-0 bg-secondary" style={{ width: `${telemetry.dimensionality * 100}%`, boxShadow: "0 0 10px #ff00e5" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-primary/60">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-4 bg-primary"
            style={{ boxShadow: "0 0 8px #00f0ff" }}
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
