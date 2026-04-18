import React, { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, X, Minus } from "lucide-react";
import { identity, systems, stack, awards, timeline } from "../data/mock";

/* Terminal easter-egg widget. Users can type commands and get real responses. */
const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [history, setHistory] = useState([
    { type: "sys", text: "ASTRA_CORE Terminal v1.0 — type 'help' to begin." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  // Konami code easter egg -> opens terminal
  useEffect(() => {
    const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let buf = [];
    const onKey = (e) => {
      buf.push(e.key);
      if (buf.length > sequence.length) buf.shift();
      if (sequence.every((k, i) => k.toLowerCase() === (buf[i] || "").toLowerCase())) {
        setOpen(true);
        setMinimized(false);
        setHistory((h) => [...h, { type: "sys", text: "🎮 Konami accepted. Debug mode armed." }]);
        buf = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = {
    help: () => [
      "Available commands:",
      "  whoami       →  about the operator",
      "  systems      →  list deployed systems",
      "  stack        →  tech stack matrix",
      "  timeline     →  career trajectory",
      "  awards       →  recognition log",
      "  contact      →  how to reach me",
      "  hire         →  why hire me",
      "  social       →  social channels",
      "  matrix       →  toggle matrix rain",
      "  clear        →  wipe terminal",
      "  exit         →  close terminal"
    ],
    whoami: () => [
      `${identity.name}`,
      `→ ${identity.role}`,
      `→ ${identity.yearsExperience}+ years · ${identity.location}`,
      `→ ${identity.tagline}`
    ],
    systems: () => [
      `Deployed systems (${systems.length}):`,
      ...systems.map((s) => `  [${s.id}] ${s.title}  ·  ${s.category}`)
    ],
    stack: () => [
      "Stack matrix:",
      ...stack.map((g) => `  ${g.group.padEnd(16)} → ${g.items.join(", ")}`)
    ],
    timeline: () => [
      "Career arc:",
      ...timeline.map((t) => `  ${t.year}  ·  ${t.role} @ ${t.org}`)
    ],
    awards: () => [
      "Recognition log:",
      ...awards.map((a) => `  [${a.id}] ${a.title} — ${a.org}`)
    ],
    contact: () => [
      "Channels of transmission:",
      `  email    :: ${identity.social.email}`,
      `  linkedin :: ${identity.social.linkedin}`,
      `  github   :: ${identity.social.github}`,
      `  studio   :: ${identity.agency.url}`,
      "",
      "Fastest route: scroll to CONTACT section or run 'exec contact'."
    ],
    hire: () => [
      "Why hire Imam:",
      "  · 7+ years operating real production systems, not demos",
      "  · Guardrailed AI that behaves like a skilled human team",
      "  · Infra-aware design — every model lives on a machine",
      "  · Built and shipped automation used daily in a newsroom",
      "  · Available for automation, AI content systems, infra consulting",
      "",
      "→ Open AutomateBD for engagement: automatebd.xyz"
    ],
    social: () => [
      `github   :: ${identity.social.github}`,
      `linkedin :: ${identity.social.linkedin}`,
      `website  :: ${identity.social.website}`,
      `studio   :: ${identity.agency.url}`
    ],
    matrix: () => {
      window.dispatchEvent(new CustomEvent("astra:toggle-matrix"));
      return ["Matrix rain toggled."];
    },
    "exec contact": () => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
      return ["→ navigating to transmission panel..."];
    },
    clear: () => {
      setTimeout(() => setHistory([{ type: "sys", text: "cleared." }]), 0);
      return null;
    },
    exit: () => {
      setTimeout(() => setOpen(false), 100);
      return ["Bye."];
    }
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const next = [...history, { type: "in", text: `> ${raw}` }];
    if (!cmd) {
      setHistory(next);
      return;
    }
    const fn = commands[cmd];
    if (fn) {
      const out = fn();
      if (out) next.push(...out.map((t) => ({ type: "out", text: t })));
    } else {
      next.push({ type: "err", text: `command not found: ${cmd}  —  try 'help'` });
    }
    setHistory(next);
  };

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
          className="fixed bottom-16 right-6 z-[90] hud-panel hud-corners px-4 py-2.5 flex items-center gap-2 hover:border-primary/60 transition-colors group"
          aria-label="Open terminal"
        >
          <TerminalIcon size={14} strokeWidth={1.5} className="text-primary" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-white/70 group-hover:text-primary uppercase">
            Terminal
          </span>
          <span className="w-1.5 h-1.5 bg-primary astra-pulse" style={{ boxShadow: "0 0 8px #00f0ff" }} />
        </button>
      )}

      {open && (
        <div
          className={`fixed z-[95] transition-all ${
            minimized ? "bottom-16 right-6 w-64" : "bottom-16 right-6 w-[92vw] max-w-xl"
          }`}
        >
          <div className="hud-panel hud-corners overflow-hidden flex flex-col" style={{ maxHeight: minimized ? "auto" : "60vh" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-primary/20 bg-black/60">
              <div className="flex items-center gap-2">
                <TerminalIcon size={12} strokeWidth={1.5} className="text-primary" />
                <span className="font-mono text-[10px] tracking-[0.28em] text-primary uppercase">
                  astra@core:~
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMinimized((m) => !m)}
                  className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-primary"
                  aria-label="Minimize"
                >
                  <Minus size={12} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-primary"
                  aria-label="Close"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Body */}
            {!minimized && (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed bg-black/50"
                  style={{ minHeight: 200, maxHeight: "50vh" }}
                  onClick={() => inputRef.current?.focus()}
                >
                  {history.map((h, i) => (
                    <div
                      key={i}
                      className={
                        h.type === "sys"
                          ? "text-primary/80"
                          : h.type === "in"
                          ? "text-white"
                          : h.type === "err"
                          ? "text-secondary"
                          : "text-white/70"
                      }
                    >
                      {h.text}
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    run(input);
                    setInput("");
                  }}
                  className="flex items-center gap-2 px-4 py-2 border-t border-primary/20 bg-black/70"
                >
                  <span className="font-mono text-[11px] text-primary">{">"}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-0 outline-none font-mono text-[11px] text-white placeholder-white/30"
                    placeholder="type a command..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <span className="w-1.5 h-3 bg-primary animate-pulse" />
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Terminal;
