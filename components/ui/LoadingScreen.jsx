"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio_has_visited");
    if (!hasVisited) {
      setIsVisible(true);
      sessionStorage.setItem("portfolio_has_visited", "true");
      // Auto-dismiss after 2.2s
      const timer = setTimeout(() => setIsDone(true), 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Don't render at all if user has already visited (no hooks violated)
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 w-full h-full bg-[#09090b] z-[99999] flex flex-col items-center justify-center pointer-events-auto"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* DM SVG Logo Draw */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-primary"
            >
              <motion.path
                d="M 20 20 L 20 80 L 40 80 C 55 80 55 20 40 20 Z"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M 55 80 L 55 20 L 70 50 L 85 20 L 85 80"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>

            {/* Text reveal */}
            <motion.div
              className="flex flex-col items-center gap-1 font-mono text-sm tracking-[0.2em] text-text-secondary uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <span>Deep Moitra</span>
              <span className="text-[10px] text-primary tracking-[0.3em]">Portfolio 2.0</span>
            </motion.div>
          </div>

          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
