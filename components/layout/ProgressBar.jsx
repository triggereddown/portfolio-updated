"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion, AnimatePresence } from "motion/react";

const STAGES = [
  {
    id: "hero",
    threshold: 0.10,
    name: "Hero",
    title: "Ready to Build",
    prop: "Cape & Bat-Suit",
    avatar: "/avatar/standing.png",
    color: "#3b82f6",
  },
  {
    id: "about",
    threshold: 0.22,
    name: "About",
    title: "System Design",
    prop: "Books",
    avatar: "/avatar/learning.png",
    color: "#60a5fa",
  },
  {
    id: "experience",
    threshold: 0.36,
    name: "Exp",
    title: "Pushing Systems",
    prop: "Stack Blocks",
    avatar: "/avatar/stack.png",
    color: "#38bdf8",
  },
  {
    id: "work",
    threshold: 0.52,
    name: "Work",
    title: "Shipping Products",
    prop: "Bat Laptop",
    avatar: "/avatar/idea.png",
    color: "#f59e0b",
  },
  {
    id: "tech-stack",
    threshold: 0.70,
    name: "Stack",
    title: "Deploying Cloud",
    prop: "Deploy Pipeline",
    avatar: "/avatar/deployment.png",
    color: "#10b981",
  },
  {
    id: "blog",
    threshold: 0.90,
    name: "Notes",
    title: "Architecture Planning",
    prop: "Thought Bubble",
    avatar: "/avatar/planning.png",
    color: "#818cf8",
  },
  {
    id: "contact",
    threshold: 1.0,
    name: "Contact",
    title: "Mission Complete",
    prop: "Headphones & Cat",
    avatar: "/avatar/relax.png",
    color: "#059669",
  },
];

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Smooth vertical runner translation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.12,
  });

  // Moves the character downwards along the vertical rail from top (0%) to bottom (100%) in exact sync with barHeight
  const characterTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const characterY = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const barHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Percent is rendered straight from smoothProgress so text stays locked with visual position
  const percent = useTransform(smoothProgress, (v) => Math.round(v * 100));

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollTimeout = useRef(null);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setIsScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 250);

    const idx = STAGES.findIndex((s) => latest <= s.threshold);
    const newIdx = idx === -1 ? STAGES.length - 1 : idx;
    setCurrentStageIdx((prev) => (prev !== newIdx ? newIdx : prev));
  });

  const stage = STAGES[currentStageIdx];

  const handleMilestoneClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile-only slim top progress line (< md) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[99] bg-border/20 md:hidden pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-emerald-400 to-primary origin-left"
          style={{ scaleX: smoothProgress }}
        />
      </div>

      {/* Desktop Vertical journey scroll tracker (md and above) */}
      <aside
        aria-label="Vertical journey scroll tracker"
        className="fixed right-2 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 z-[85] pointer-events-none select-none hidden md:block"
      >
      {/* Minimized Pill Toggle */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto p-2 rounded-full bg-bg-card/90 backdrop-blur-md border border-border shadow-xl text-[10px] font-mono text-text-primary hover:text-primary transition-all flex flex-col items-center gap-1"
          title="Expand Character Journey"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span><motion.span>{percent}</motion.span>%</span>
        </button>
      ) : (
        <div className="relative flex items-center h-[54vh] max-h-[460px]">
          
          {/* Walking Character Container (Stacked vertically, ZERO horizontal encroachment into content) */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute right-5 pointer-events-auto cursor-pointer flex flex-col items-center group"
              style={{ top: characterTop, y: characterY }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                window.scrollTo({
                  top: scrollYProgress.get() >= 0.95 ? 0 : window.scrollY + window.innerHeight * 0.8,
                  behavior: "smooth",
                });
              }}
            >
              {/* Unclipped Real Transparent PNG Avatar with Downward Walk-Bob */}
              <motion.div
                animate={{
                  y: isScrolling ? [0, -5, 0] : [0, -2, 0],
                  rotate: isScrolling ? [-2, 2, -2] : [0, 0.5, 0],
                  scale: isScrolling ? 1.05 : 1,
                }}
                transition={{
                  duration: isScrolling ? 0.3 : 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-16 h-16 sm:w-18 sm:h-18 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] shrink-0"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={stage.avatar}
                    src={stage.avatar}
                    alt={stage.title}
                    initial={{ opacity: 0, scale: 0.75, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.75, y: 4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="w-full h-full object-contain pointer-events-none select-none filter contrast-105"
                  />
                </AnimatePresence>
              </motion.div>

              {/* Compact Sub-Avatar Badge (Centered directly under avatar, no left spillover) */}
              <div className="mt-0.5 px-2 py-0.5 rounded-full bg-bg-card border border-border shadow-md flex items-center gap-1 text-[10px] font-mono text-text-primary whitespace-nowrap">
                <span className="font-semibold">{stage.name}</span>
                <span className="text-[9px] text-primary"><motion.span>{percent}</motion.span>%</span>
              </div>

              {/* Hover Tooltip (Only visible when user explicitly hovers over the avatar) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-8 px-2.5 py-1 rounded-lg bg-bg-card border border-border shadow-xl text-[10px] font-mono text-text-primary whitespace-nowrap"
                  >
                    <span>{stage.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* The Vertical Rail Track */}
          <div className="relative w-3 h-full flex flex-col items-center justify-between py-2 pointer-events-auto">
            {/* Background Track Line */}
            <div className="absolute top-0 bottom-0 w-1 rounded-full bg-border/40 overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-primary via-emerald-400 to-primary origin-top"
                style={{ height: barHeight }}
              />
            </div>

            {/* Milestone Dots Along the Rail */}
            {STAGES.map((s, idx) => {
              const isPassed = idx < currentStageIdx;
              const isCurrent = currentStageIdx === idx;

              return (
                <button
                  key={s.id}
                  onClick={() => handleMilestoneClick(s.id)}
                  className="relative z-10 group flex items-center justify-center p-0.5"
                  title={`Jump to ${s.name}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      isCurrent
                        ? "w-2.5 h-2.5 bg-emerald-400 ring-2 ring-emerald-400/30 scale-125"
                        : isPassed
                        ? "w-1.5 h-1.5 bg-primary"
                        : "w-1 h-1 bg-border hover:bg-text-muted"
                    }`}
                  />
                </button>
              );
            })}

            {/* Close / Minimize Button at Bottom of Rail */}
            <button
              onClick={() => setIsMinimized(true)}
              className="mt-1 text-text-muted hover:text-text-primary text-[10px] font-mono p-0.5 transition-colors"
              title="Minimize Tracker"
            >
              ✕
            </button>
          </div>

        </div>
      )}
    </aside>
    </>
  );
}
