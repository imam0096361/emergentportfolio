import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

/**
 * ResumeDownload - Animated PDF resume generation HUD
 * Simulates generating a PDF resume with cinematic UI
 */
export const ResumeDownload = () => {
  const { toast } = useToast();
  const [state, setState] = useState("idle"); // idle | generating | ready
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setState("generating");
    setProgress(0);

    // Simulate generation steps
    const steps = [
      { label: "Compiling experience data", duration: 400 },
      { label: "Rendering systems overview", duration: 500 },
      { label: "Formatting timeline", duration: 350 },
      { label: "Generating PDF", duration: 450 },
      { label: "Finalizing document", duration: 300 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration));
      setProgress(((i + 1) / steps.length) * 100);
    }

    setState("ready");

    // In production, this would generate actual PDF using jsPDF or similar
    toast({
      title: "Resume Ready",
      description: "Your resume has been generated successfully.",
    });
  };

  const reset = () => {
    setState("idle");
    setProgress(0);
  };

  return (
    <div className="relative">
      {state === "idle" && (
        <motion.button
          onClick={handleGenerate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hud-panel hud-corners px-6 py-3 flex items-center gap-3 hover:border-primary/60 transition-all group"
        >
          <Download size={16} className="text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          <span className="font-mono text-xs tracking-[0.2em] text-white/80 group-hover:text-primary transition-colors">
            DOWNLOAD_RESUME
          </span>
        </motion.button>
      )}

      {state === "generating" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hud-panel hud-corners p-6 w-72"
        >
          <div className="flex items-center gap-3 mb-4">
            <Loader2 size={16} className="text-primary animate-spin" strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-[0.3em] text-primary">GENERATING</span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="font-mono text-[9px] text-white/60 tracking-wider">
              {progress < 20 && "Compiling experience data..."}
              {progress >= 20 && progress < 40 && "Rendering systems overview..."}
              {progress >= 40 && progress < 60 && "Formatting timeline..."}
              {progress >= 60 && progress < 80 && "Generating PDF..."}
              {progress >= 80 && "Finalizing document..."}
            </div>
          </div>

          <div className="h-1 bg-primary/10 w-full overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{ boxShadow: "0 0 12px #00f0ff" }}
            />
          </div>

          <div className="mt-3 font-mono text-[9px] text-white/40 text-right">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}

      {state === "ready" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hud-panel hud-corners p-6 w-72"
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 size={16} className="text-primary" strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-[0.3em] text-primary">COMPLETE</span>
          </div>

          <p className="text-white/60 text-sm mb-4">
            Your resume has been generated and is ready for download.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => {
                // Trigger actual download here
                toast({
                  title: "PDF Download",
                  description: "Real PDF generation will be implemented with jsPDF library.",
                });
              }}
              className="flex-1 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 px-4 py-2 font-mono text-xs tracking-wider text-primary transition-all"
            >
              <FileText size={14} className="inline mr-2" strokeWidth={1.5} />
              OPEN
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 border border-white/10 hover:border-white/20 font-mono text-xs tracking-wider text-white/60 hover:text-white/80 transition-all"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
