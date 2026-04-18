import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * AudioPlayer - Ambient sci-fi background sound toggle
 * Plays looping ambient track with HUD toggle control
 */
export const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage for user preference
    const stored = localStorage.getItem("astra:audio");
    if (stored === "true") {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (enabled) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch((e) => {
        console.log("Audio autoplay blocked:", e);
      });
    } else {
      audioRef.current.pause();
    }
    
    localStorage.setItem("astra:audio", enabled.toString());
  }, [enabled]);

  const toggle = () => setEnabled((v) => !v);

  return (
    <>
      {/* Audio element - using a placeholder ambient loop */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onLoadedData={() => setLoaded(true)}
      >
        {/* Placeholder ambient sound - in production replace with proper sci-fi track */}
        <source src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" type="audio/mpeg" />
      </audio>

      {/* HUD toggle button */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-[60] w-12 h-12 hud-panel hud-corners flex items-center justify-center hover:border-primary/60 transition-all group"
        title={enabled ? "Mute audio" : "Enable audio"}
        aria-label={enabled ? "Mute audio" : "Enable audio"}
      >
        {enabled ? (
          <Volume2 size={16} className="text-primary" strokeWidth={1.5} />
        ) : (
          <VolumeX size={16} className="text-white/40 group-hover:text-primary" strokeWidth={1.5} />
        )}
        {/* Pulse indicator when active */}
        {enabled && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full astra-pulse" />
        )}
      </button>
    </>
  );
};
