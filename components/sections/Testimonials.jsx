"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import HoverStack from "../ui/hover-stack";
import { testimonials } from "@/lib/mockData";

// Light Mode Luxury Palettes (Soft Alabaster, Ivory Cashmere, Pale Celadon matching the warm beige background)
const LIGHT_LUXURY_PALETTES = [
  {
    bg: "linear-gradient(150deg, #ffffff 0%, #f7f2ea 100%)",
    accent: "text-[#1c1917]",
    borderColor: "rgba(215, 200, 180, 0.8)",
    boxShadow: "0 16px 36px -10px rgba(160, 135, 110, 0.22), 0 2px 8px rgba(0,0,0,0.03)",
    activeRingColor: "rgba(37, 99, 235, 0.45)",
    tag: "Architecture & Scale",
    highlighterClass: "bg-[#fef08a] opacity-90",
  },
  {
    bg: "linear-gradient(150deg, #fffdfa 0%, #f8efe3 100%)",
    accent: "text-[#1c1917]",
    borderColor: "rgba(228, 208, 185, 0.8)",
    boxShadow: "0 16px 36px -10px rgba(175, 135, 105, 0.22), 0 2px 8px rgba(0,0,0,0.03)",
    activeRingColor: "rgba(217, 119, 6, 0.45)",
    tag: "Delivery & Execution",
    highlighterClass: "bg-[#fed7aa] opacity-90",
  },
  {
    bg: "linear-gradient(150deg, #fdfffd 0%, #edf6ef 100%)",
    accent: "text-[#1c1917]",
    borderColor: "rgba(200, 222, 206, 0.8)",
    boxShadow: "0 16px 36px -10px rgba(125, 155, 135, 0.22), 0 2px 8px rgba(0,0,0,0.03)",
    activeRingColor: "rgba(16, 185, 129, 0.45)",
    tag: "UI/UX & Client Experience",
    highlighterClass: "bg-[#bbf7d0] opacity-90",
  },
];

// Dark Mode Luxury Palettes (Deep Obsidian Sapphire, Violet, and Forest Emerald)
const DARK_LUXURY_PALETTES = [
  {
    bg: "linear-gradient(145deg, #0a1324 0%, #13243f 100%)",
    accent: "text-slate-100",
    borderColor: "rgba(255, 255, 255, 0.12)",
    boxShadow: "0 18px 42px -12px rgba(0, 0, 0, 0.7)",
    activeRingColor: "rgba(59, 130, 246, 0.55)",
    tag: "Architecture & Scale",
    highlighterClass: "bg-blue-400/25",
  },
  {
    bg: "linear-gradient(145deg, #130c24 0%, #221440 100%)",
    accent: "text-slate-100",
    borderColor: "rgba(255, 255, 255, 0.12)",
    boxShadow: "0 18px 42px -12px rgba(0, 0, 0, 0.7)",
    activeRingColor: "rgba(168, 85, 247, 0.55)",
    tag: "Delivery & Execution",
    highlighterClass: "bg-purple-400/25",
  },
  {
    bg: "linear-gradient(145deg, #091a18 0%, #11312c 100%)",
    accent: "text-slate-100",
    borderColor: "rgba(255, 255, 255, 0.12)",
    boxShadow: "0 18px 42px -12px rgba(0, 0, 0, 0.7)",
    activeRingColor: "rgba(16, 185, 129, 0.55)",
    tag: "UI/UX & Client Experience",
    highlighterClass: "bg-emerald-400/25",
  },
];

export default function Testimonials() {
  const [isDark, setIsDark] = useState(false);

  // Sync theme changes reactively with DOM classList
  useEffect(() => {
    const updateTheme = () => {
      const darkActive = document.documentElement.classList.contains("dark");
      setIsDark(darkActive);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const currentPalettes = isDark ? DARK_LUXURY_PALETTES : LIGHT_LUXURY_PALETTES;

  const cards = testimonials.map((t, idx) => {
    const palette = currentPalettes[idx % currentPalettes.length];
    return {
      id: t._id || idx,
      name: t.name,
      role: t.role,
      company: t.company,
      relationship: t.relationship || "Verified Colleague",
      quote: t.quote,
      tag: palette.tag,
      highlighterClass: palette.highlighterClass,
      bg: palette.bg,
      accent: palette.accent,
      borderColor: palette.borderColor,
      boxShadow: palette.boxShadow,
      activeRingColor: palette.activeRingColor,
    };
  });

  return (
    <section id="testimonials" className="relative w-full py-28 overflow-hidden border-t border-border bg-bg-secondary/30">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Endorsements & Reviews</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Peer & Engineering Endorsements
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
              Perspectives from technical leads, project managers, and clients on system architecture, delivery speed, and code quality.
            </p>
          </ScrollReveal>
        </div>

        {/* Hyperiux Interactive Responsive Hover Stack */}
        <div className="relative w-full flex flex-col items-center justify-center pt-4 pb-8">
          <ScrollReveal delay={0.15}>
            <HoverStack
              cards={cards}
              cardWidth={330}
              cardHeight={390}
              overlap={140}
              hoverLift={32}
              pushDistance={210}
              spread={26}
              rotation={6}
              duration={0.5}
              autoAdvance={true}
              autoAdvanceInterval={5000}
              className="py-4"
            />
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
