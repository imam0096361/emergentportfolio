import React from "react";
import { identity } from "../data/mock";
import { Github, Linkedin, Globe, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-primary/15 bg-black/40 backdrop-blur-sm">
      <div className="px-6 md:px-14 lg:px-24 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1.5 h-1.5 bg-primary astra-pulse" style={{ boxShadow: "0 0 8px #00f0ff" }} />
            <span className="font-display font-black text-primary tracking-[0.24em] text-sm">IMAM.CH</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Systems engineer & automation architect. Dhaka, Bangladesh.
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase mb-3">Channels</p>
          <div className="flex items-center gap-3">
            <a href={identity.social.github} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center border border-primary/20 text-white/70 hover:text-primary hover:border-primary/60 transition-all">
              <Github size={14} strokeWidth={1.5} />
            </a>
            <a href={identity.social.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center border border-primary/20 text-white/70 hover:text-primary hover:border-primary/60 transition-all">
              <Linkedin size={14} strokeWidth={1.5} />
            </a>
            <a href={identity.agency.url} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center border border-primary/20 text-white/70 hover:text-primary hover:border-primary/60 transition-all">
              <Globe size={14} strokeWidth={1.5} />
            </a>
            <a href={`mailto:${identity.social.email}`} className="w-9 h-9 flex items-center justify-center border border-primary/20 text-white/70 hover:text-primary hover:border-primary/60 transition-all">
              <Mail size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="md:text-right">
          <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase mb-3">Telemetry</p>
          <p className="font-mono text-xs text-white/60">
            SECTOR 091.XC-01 · UPTIME 99.95% · BUILD v1.0
          </p>
          <p className="font-mono text-[10px] tracking-widest text-white/30 mt-2">
            © {new Date().getFullYear()} {identity.name} // ASTRA_CORE
          </p>
        </div>
      </div>

      {/* status bar */}
      <div className="px-4 py-2 border-t border-primary/10 flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary astra-pulse" style={{ boxShadow: "0 0 8px #00f0ff" }} />
          System Online // Nominal
        </div>
        <div>
          {identity.domain}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
