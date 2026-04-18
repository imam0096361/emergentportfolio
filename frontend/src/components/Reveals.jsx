import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* --- Section header with scroll-triggered mask/stagger reveal ------------ */
export const SectionHeader = ({ index, label, title, subtitle, align = "left" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const letters = title.split("");

  return (
    <div ref={ref} className={`mb-16 ${align === "center" ? "text-center" : ""}`}>
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-3 flex items-center gap-3"
      >
        <span className="w-8 h-px bg-primary" /> {String(index).padStart(2, "0")} // {label}
      </motion.p>
      <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white leading-tight">
        {letters.map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "top", lineHeight: 1 }}>
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          </span>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/50 mt-4 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

/* --- Animated counter -----------------------------------------------------*/
export const Counter = ({ to, suffix = "", duration = 1.4, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {v}
      {suffix}
    </span>
  );
};

/* --- Matrix rain easter egg (toggleable via 'matrix' terminal command) --- */
export const MatrixRain = () => {
  const [on, setOn] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handler = () => setOn((v) => !v);
    window.addEventListener("astra:toggle-matrix", handler);
    return () => window.removeEventListener("astra:toggle-matrix", handler);
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01IMAMCHOWDHURY";
    const fontSize = 14;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array(cols).fill(1);

    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 6, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00f0ff";
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.975 ? "#ff00e5" : "#00f0ff";
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [on]);

  if (!on) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[55]"
      style={{ mixBlendMode: "screen", opacity: 0.55 }}
    />
  );
};

/* --- Reveal wrapper (generic) -------------------------------------------- */
export const Reveal = ({ children, delay = 0, y = 24, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
