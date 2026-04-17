import React, { useEffect, useState } from "react";
import { Menu, Terminal, Github, Linkedin, ExternalLink, X } from "lucide-react";
import { identity } from "../data/mock";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "systems", label: "Systems" },
  { id: "stack", label: "Stack" },
  { id: "timeline", label: "Timeline" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" }
];

const HudNav = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = l.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-6 md:gap-10 hud-panel px-6 md:px-8 py-3 border-x-2 border-x-primary/50">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-primary astra-pulse" style={{ boxShadow: "0 0 10px #00f0ff" }} />
          <span className="font-display font-black text-primary tracking-[0.24em] uppercase text-sm md:text-base">
            {identity.name.split(" ")[0]}<span className="text-white/50">.</span>CH
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] tracking-[0.28em] uppercase">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`flex items-center gap-2 transition-colors ${
                active === l.id ? "text-primary" : "text-white/50 hover:text-primary"
              }`}
            >
              <span
                className={`w-1 h-1 rounded-full ${active === l.id ? "bg-primary astra-pulse" : "bg-white/40"}`}
                style={active === l.id ? { boxShadow: "0 0 8px #00f0ff" } : {}}
              />
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 pl-5 border-l border-primary/20">
          <a href={identity.social.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="GitHub">
            <Github size={14} strokeWidth={1.5} />
          </a>
          <a href={identity.social.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="LinkedIn">
            <Linkedin size={14} strokeWidth={1.5} />
          </a>
          <a href={identity.agency.url} target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary transition-colors flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase">
            AUTOMATEBD <ExternalLink size={10} strokeWidth={1.5} />
          </a>
        </div>

        <button onClick={() => setOpen(true)} className="lg:hidden text-primary" aria-label="Menu">
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-primary/20">
            <span className="font-display font-black text-primary tracking-[0.24em] text-sm">IMAM.CH</span>
            <button onClick={() => setOpen(false)} className="text-primary"><X size={20} /></button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-8 px-10">
            {links.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left font-display text-4xl font-black text-white hover:text-primary transition-colors flex items-baseline gap-4"
              >
                <span className="font-mono text-xs text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Left HUD rail (desktop) */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-[70] hidden xl:flex flex-col items-center gap-6">
        <div className="writing-vertical font-mono text-[9px] tracking-[0.5em] uppercase text-white/30 rotate-180" style={{ writingMode: "vertical-rl" }}>
          {identity.handle}
        </div>
        <div className="w-px h-24 bg-gradient-to-b from-primary via-primary/30 to-transparent" />
      </aside>

      {/* Right HUD rail (desktop) */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] hidden xl:flex flex-col items-center gap-4">
        <div className="flex flex-col gap-3">
          <a href={identity.social.github} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center text-primary/80 hover:text-primary hover:bg-primary/10 border border-primary/20 transition-all">
            <Github size={14} strokeWidth={1.5} />
          </a>
          <a href={identity.social.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center text-primary/80 hover:text-primary hover:bg-primary/10 border border-primary/20 transition-all">
            <Linkedin size={14} strokeWidth={1.5} />
          </a>
          <a href={identity.agency.url} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center text-primary/80 hover:text-primary hover:bg-primary/10 border border-primary/20 transition-all">
            <Terminal size={14} strokeWidth={1.5} />
          </a>
        </div>
      </aside>
    </>
  );
};

export default HudNav;
