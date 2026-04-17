import React, { useEffect, useRef, useState } from "react";

export const Scanlines = () => (
  <>
    <div className="astra-scanlines" />
    <div className="astra-grain" />
  </>
);

export const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setVisible(true);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="astra-cursor" style={{ opacity: visible ? 1 : 0 }} />
      <div ref={dotRef} className="astra-cursor-dot" style={{ opacity: visible ? 1 : 0 }} />
    </>
  );
};

export const BootOverlay = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const lines = [
    "> astra-core :: booting runtime",
    "> handshake :: imamchowdhury.com [OK]",
    "> identity :: IMAM_CH verified",
    "> systems :: 08 online",
    "> ready"
  ];

  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => setStep(step + 1), 280);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#050506] flex items-center justify-center">
      <div className="max-w-sm w-full px-8 font-mono text-[11px] text-primary/80 tracking-widest">
        <div className="mb-6 flex items-center gap-2 text-primary">
          <span className="w-2 h-2 bg-primary astra-pulse" />
          <span>ASTRA_CORE // v1.0</span>
        </div>
        {lines.slice(0, step).map((l, i) => (
          <div key={i} className="opacity-0 animate-fade-in-up" style={{ animation: "fade-in-up 0.35s ease-out forwards" }}>
            {l}
          </div>
        ))}
        <div className="mt-6 h-[2px] bg-primary/10 w-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / lines.length) * 100}%`, boxShadow: "0 0 12px #00f0ff" }}
          />
        </div>
      </div>
    </div>
  );
};
