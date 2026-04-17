import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Globe, Send, Check } from "lucide-react";
import { identity } from "../data/mock";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", intent: "AUTOMATION", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Transmission incomplete", description: "All fields are required." });
      return;
    }
    // Frontend-only: persist to localStorage as mock
    const existing = JSON.parse(localStorage.getItem("astra_messages") || "[]");
    existing.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem("astra_messages", JSON.stringify(existing));
    setSent(true);
    toast({ title: "Signal received", description: "Your transmission was logged. I'll reach out soon." });
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", intent: "AUTOMATION", message: "" });
    }, 3000);
  };

  const intents = ["AUTOMATION", "AI_SYSTEMS", "INFRA_CONSULT", "AUTOMATEBD"];

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-14 lg:px-24 anchor-offset overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-primary" /> 07 // TRANSMISSION
          </p>
          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tighter text-white leading-[0.9] mb-6">
            LET'S<br />
            <span
              style={{
                background: "linear-gradient(130deg, #00f0ff 0%, #ff00e5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              BUILD.
            </span>
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md mb-10">
            Interested in production automation, AI content systems, or infrastructure that doesn't break at 3AM? Send a signal.
          </p>

          <div className="space-y-3 font-mono text-sm">
            <a href={`mailto:${identity.social.email}`} className="flex items-center gap-3 text-white/80 hover:text-primary group sweep-link w-fit">
              <Mail size={14} strokeWidth={1.5} className="text-primary" />
              {identity.social.email}
            </a>
            <a href={identity.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-primary group sweep-link w-fit">
              <Linkedin size={14} strokeWidth={1.5} className="text-primary" />
              linkedin.com/in/imamchowdhury
            </a>
            <a href={identity.social.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-primary group sweep-link w-fit">
              <Github size={14} strokeWidth={1.5} className="text-primary" />
              github.com/imam0096361
            </a>
            <a href={identity.agency.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-primary group sweep-link w-fit">
              <Globe size={14} strokeWidth={1.5} className="text-primary" />
              {identity.agency.url.replace("https://", "")}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hud-panel hud-corners p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] tracking-[0.35em] text-primary">// ENCRYPTED_CHANNEL</span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-primary astra-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary" style={{ boxShadow: "0 0 8px #00f0ff" }} /> READY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mb-2 block">Callsign</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-primary/30 focus:border-primary text-white py-2 px-1 font-mono text-sm focus:outline-none transition-colors"
                  placeholder="YOUR NAME"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mb-2 block">Uplink</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-primary/30 focus:border-primary text-white py-2 px-1 font-mono text-sm focus:outline-none transition-colors"
                  placeholder="YOU@DOMAIN.COM"
                />
              </label>
            </div>

            <div className="mb-5">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3 block">Intent</span>
              <div className="flex flex-wrap gap-2">
                {intents.map((x) => (
                  <button
                    type="button"
                    key={x}
                    onClick={() => setForm({ ...form, intent: x })}
                    className={`font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 border transition-all ${
                      form.intent === x
                        ? "border-primary text-primary bg-primary/10"
                        : "border-white/15 text-white/50 hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <label className="block mb-6">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase mb-2 block">Transmission</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-black/30 border border-primary/20 focus:border-primary text-white py-3 px-4 font-mono text-sm focus:outline-none transition-colors resize-none"
                placeholder="> tell me about the system you need built..."
              />
            </label>

            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">
                Channel: {identity.social.email}
              </p>
              <button type="submit" className="btn-astra" disabled={sent}>
                {sent ? (
                  <>
                    <Check size={12} strokeWidth={1.75} /> SIGNAL LOGGED
                  </>
                ) : (
                  <>
                    <Send size={12} strokeWidth={1.75} /> TRANSMIT
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
