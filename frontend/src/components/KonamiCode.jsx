import { useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";

/**
 * KonamiCode - Easter egg listener
 * Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
 * Unlocks: Matrix rain effect + special message
 */
export const useKonamiCode = () => {
  const [unlocked, setUnlocked] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const code = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA"
    ];
    
    let progress = 0;
    
    const handler = (e) => {
      if (e.code === code[progress]) {
        progress++;
        if (progress === code.length) {
          setUnlocked(true);
          // Trigger matrix rain
          window.dispatchEvent(new CustomEvent("astra:toggle-matrix"));
          // Show notification
          toast({
            title: "🎮 KONAMI CODE ACTIVATED",
            description: "Welcome to the matrix, Imam.",
          });
          progress = 0;
        }
      } else {
        progress = 0;
      }
    };
    
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toast]);
  
  return unlocked;
};

export const KonamiCodeListener = () => {
  useKonamiCode();
  return null;
};
