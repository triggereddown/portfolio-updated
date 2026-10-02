"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Building2, ChevronDown } from "lucide-react";
import { experience } from "@/lib/mockData";

const formatMonthYear = (dateStr) => {
  if (!dateStr) return "";
  const parts = String(dateStr).trim().split("-");
  if (parts.length >= 2) {
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    if (month >= 1 && month <= 12) {
      return `${months[month - 1]} ${year}`;
    }
  }
  return dateStr;
};

const getDisplayPeriod = (exp) => {
  if (exp.period) return exp.period;
  const start = formatMonthYear(exp.startDate);
  const end = exp.current ? "Present" : formatMonthYear(exp.endDate);
  if (start && end) return `${start} – ${end}`;
  if (start) return start;
  return "";
};

export default function Experience() {
  const containerRef = useRef(null);
  const card0Ref = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const spine0Ref = useRef(null);
  const spine1Ref = useRef(null);

  const node0RingRef = useRef(null);
  const node1RingRef = useRef(null);
  const node2RingRef = useRef(null);

  const node0BeadRef = useRef(null);
  const node1BeadRef = useRef(null);
  const node2BeadRef = useRef(null);

  const stepLabelRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = [card0Ref.current, card1Ref.current, card2Ref.current];
    if (!cards[0] || !cards[1] || !cards[2] || !containerRef.current) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const peekOffset = isMobile ? 105 : 82;
    const deepOffset = isMobile ? 210 : 160;
    const peekOpacity = isMobile ? 0 : 0.35;

    // Initial transforms
    gsap.set(card0Ref.current, { yPercent: 0, opacity: 1, scale: 1, zIndex: 30 });
    gsap.set(card1Ref.current, { yPercent: peekOffset, opacity: peekOpacity, scale: 0.96, zIndex: 20 });
    gsap.set(card2Ref.current, { yPercent: deepOffset, opacity: 0, scale: 0.92, zIndex: 10 });

    if (spine0Ref.current) {
      gsap.set(spine0Ref.current, { strokeDasharray: 200, strokeDashoffset: 200 });
    }
    if (spine1Ref.current) {
      gsap.set(spine1Ref.current, { strokeDasharray: 200, strokeDashoffset: 200 });
    }

    if (node0RingRef.current) {
      gsap.set(node0RingRef.current, { strokeDasharray: 180, strokeDashoffset: 0 });
    }
    if (node1RingRef.current) {
      gsap.set(node1RingRef.current, { strokeDasharray: 180, strokeDashoffset: 180 });
    }
    if (node2RingRef.current) {
      gsap.set(node2RingRef.current, { strokeDasharray: 180, strokeDashoffset: 180 });
    }

    if (node0BeadRef.current) gsap.set(node0BeadRef.current, { opacity: 1 });
    if (node1BeadRef.current) gsap.set(node1BeadRef.current, { opacity: 0 });
    if (node2BeadRef.current) gsap.set(node2BeadRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      // Butter-smooth scroll scrub: CSS handles sticky pinning with zero spacer fighting,
      // while GSAP scrubs the timeline at native 120Hz/60Hz compositor rate
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2, // 200ms silky micro-interpolation matches Header
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!stepLabelRef.current) return;
            const p = self.progress;
            if (p < 0.42) {
              stepLabelRef.current.textContent = "01";
            } else if (p < 0.82) {
              stepLabelRef.current.textContent = "02";
            } else {
              stepLabelRef.current.textContent = "03";
            }
          },
        },
      });

      // ========================================================
      // TRANSITION 1: Card 0 -> Card 1 (Card 2 moves to peek)
      // ========================================================
      tl.to(card0Ref.current, {
        yPercent: -115,
        opacity: 0,
        scale: 0.94,
        ease: "power1.inOut",
        duration: 1,
      }, 0);

      tl.to(card1Ref.current, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: "power1.inOut",
        duration: 1,
      }, 0);

      tl.to(card2Ref.current, {
        yPercent: peekOffset,
        opacity: peekOpacity,
        scale: 0.96,
        ease: "power1.inOut",
        duration: 1,
      }, 0);

      // Spine 0 draws down to Node 1
      if (spine0Ref.current) {
        tl.to(spine0Ref.current, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 0.9,
        }, 0);
      }

      // Node 1 illuminates & circle sketches
      if (node1BeadRef.current) {
        tl.to(node1BeadRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        }, 0.7);
      }
      if (node1RingRef.current) {
        tl.to(node1RingRef.current, {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: "power2.out",
        }, 0.6);
      }

      // Rest plateau for Card 1 (lets user comfortably inspect role)
      tl.to({}, { duration: 0.4 });

      // ========================================================
      // TRANSITION 2: Card 1 -> Card 2
      // ========================================================
      tl.to(card1Ref.current, {
        yPercent: -115,
        opacity: 0,
        scale: 0.94,
        ease: "power1.inOut",
        duration: 1,
      });

      tl.to(card2Ref.current, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: "power1.inOut",
        duration: 1,
      }, "<");

      // Spine 1 draws down to Node 2
      if (spine1Ref.current) {
        tl.to(spine1Ref.current, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 0.9,
        }, "<");
      }

      // Node 2 illuminates & circle sketches
      if (node2BeadRef.current) {
        tl.to(node2BeadRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        }, ">-0.3");
      }
      if (node2RingRef.current) {
        tl.to(node2RingRef.current, {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: "power2.out",
        }, "<");
      }

      // Final rest plateau for Card 2
      tl.to({}, { duration: 0.4 });
    }, containerRef);

    // Refresh ScrollTrigger to sync with full document layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const cardRefs = [card0Ref, card1Ref, card2Ref];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full h-[280vh] bg-bg-primary border-t border-border"
    >
      {/* Pinned Sticky Viewport Stage: 100% native browser CSS pinning for zero jitter */}
      <div className="sticky top-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between py-10 sm:py-14 px-6 overflow-hidden">
        
        {/* Stage Header */}
        <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest text-primary uppercase font-semibold">
              02 / CAREER TRAJECTORY
            </span>
            <h2 className="mt-2 font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.08]">
              Experience & Milestones
            </h2>
          </div>

          {/* Interactive Step Counter */}
          <div className="flex items-center gap-3 font-mono text-xs text-text-muted self-start sm:self-auto">
            <span
              ref={stepLabelRef}
              className="text-text-primary font-bold text-sm"
            >
              01
            </span>
            <span className="text-text-muted/40">/</span>
            <span>03</span>
            <div className="hidden sm:flex items-center gap-1.5 ml-2 text-[11px] text-text-muted/70">
              <span>Scroll to step</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-primary" />
            </div>
          </div>
        </div>

        {/* Center Stage: Timeline Spine on Left + Pinned Card Deck on Right */}
        <div className="max-w-[1200px] w-full mx-auto flex-1 flex items-center py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">

            {/* Left Rail: Organic Doodly Timeline Spine */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-between h-[360px] py-2 relative select-none">
              
              {/* Node 0 */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="absolute -inset-2.5 w-16 h-16 pointer-events-none overflow-visible" viewBox="0 0 64 64" fill="none">
                  <path
                    d="M 32 7 C 45 6, 56 16, 55 31 C 54 45, 44 55, 30 56 C 16 56, 7 45, 8 30 C 9 15, 19 7, 33 8.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    className="text-border/40"
                  />
                  <path
                    ref={node0RingRef}
                    d="M 32 7 C 45 6, 56 16, 55 31 C 54 45, 44 55, 30 56 C 16 56, 7 45, 8 30 C 9 15, 19 7, 33 8.5 C 40 9.5, 48 13.5, 51 18"
                    stroke="rgb(52, 211, 153)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="relative w-9 h-9 rounded-full flex items-center justify-center p-[1.5px] bg-gradient-to-b from-white/25 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent shadow-[0_3px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.65)] border border-border/40 relative overflow-hidden">
                    <div ref={node0BeadRef} className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />
                    <div className="absolute w-full h-full rounded-full border border-emerald-400/60 animate-ping opacity-75" />
                  </div>
                </div>
                <span className="absolute -left-6 font-mono text-[10px] tracking-wider text-text-muted/60">01</span>
              </div>

              {/* Spine Connector 0 to 1 */}
              <div className="relative flex-1 w-10 flex justify-center py-1">
                <svg className="w-8 h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 32 160" fill="none">
                  <defs>
                    <linearGradient id="gsapStickySpine0" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="60%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 16 0 C 24 35, 8 80, 22 120 C 25 135, 19 150, 16 160"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="text-border/40"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M 10 80 L 22 80 M 12 84 L 20 84"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-border/30"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={spine0Ref}
                    d="M 16 0 C 24 35, 8 80, 22 120 C 25 135, 19 150, 16 160"
                    stroke="url(#gsapStickySpine0)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Node 1 */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="absolute -inset-2.5 w-16 h-16 pointer-events-none overflow-visible" viewBox="0 0 64 64" fill="none">
                  <path
                    d="M 32 7 C 45 6, 56 16, 55 31 C 54 45, 44 55, 30 56 C 16 56, 7 45, 8 30 C 9 15, 19 7, 33 8.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    className="text-border/40"
                  />
                  <path
                    ref={node1RingRef}
                    d="M 32 7 C 45 6, 56 16, 55 31 C 54 45, 44 55, 30 56 C 16 56, 7 45, 8 30 C 9 15, 19 7, 33 8.5 C 40 9.5, 48 13.5, 51 18"
                    stroke="rgb(56, 189, 248)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="relative w-9 h-9 rounded-full flex items-center justify-center p-[1.5px] bg-gradient-to-b from-white/25 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent shadow-[0_3px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.65)] border border-border/40 relative overflow-hidden">
                    <div ref={node1BeadRef} className="absolute w-3.5 h-3.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]" />
                  </div>
                </div>
                <span className="absolute -left-6 font-mono text-[10px] tracking-wider text-text-muted/60">02</span>
              </div>

              {/* Spine Connector 1 to 2 */}
              <div className="relative flex-1 w-10 flex justify-center py-1">
                <svg className="w-8 h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 32 160" fill="none">
                  <defs>
                    <linearGradient id="gsapStickySpine1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="60%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 16 0 C 8 35, 24 80, 10 120 C 7 135, 13 150, 16 160"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="text-border/40"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M 10 80 L 22 80 M 12 84 L 20 84"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-border/30"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={spine1Ref}
                    d="M 16 0 C 8 35, 24 80, 10 120 C 7 135, 13 150, 16 160"
                    stroke="url(#gsapStickySpine1)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Node 2 */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="absolute -inset-2.5 w-16 h-16 pointer-events-none overflow-visible" viewBox="0 0 64 64" fill="none">
                  <path
                    d="M 32 7 C 45 6, 56 16, 55 31 C 54 45, 44 55, 30 56 C 16 56, 7 45, 8 30 C 9 15, 19 7, 33 8.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    className="text-border/40"
                  />
                  <path
                    ref={node2RingRef}
                    d="M 32 7 C 45 6, 56 16, 55 31 C 54 45, 44 55, 30 56 C 16 56, 7 45, 8 30 C 9 15, 19 7, 33 8.5 C 40 9.5, 48 13.5, 51 18"
                    stroke="rgb(56, 189, 248)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="relative w-9 h-9 rounded-full flex items-center justify-center p-[1.5px] bg-gradient-to-b from-white/25 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent shadow-[0_3px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.65)] border border-border/40 relative overflow-hidden">
                    <div ref={node2BeadRef} className="absolute w-3.5 h-3.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]" />
                  </div>
                </div>
                <span className="absolute -left-6 font-mono text-[10px] tracking-wider text-text-muted/60">03</span>
              </div>

            </div>

            {/* Right Stage: Hardware-Accelerated Pinned Card Deck */}
            <div className="lg:col-span-9 relative w-full h-[520px] sm:h-[480px] overflow-hidden rounded-2xl">
              {experience.map((exp, idx) => {
                const displayPeriod = getDisplayPeriod(exp);

                return (
                  <div
                    key={exp._id}
                    ref={cardRefs[idx]}
                    className="absolute inset-x-0 top-0 w-full rounded-2xl border border-border bg-bg-secondary p-5 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.22)] flex flex-col justify-between will-change-transform"
                    style={{
                      maxHeight: "500px",
                    }}
                  >
                    {/* Top Row: Meta Dates, Location, Badge & Tech Stack */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
                        <span className="flex items-center gap-1.5 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="font-semibold text-text-primary">{displayPeriod}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{exp.location}</span>
                        </span>
                        <span>•</span>
                        <span className="uppercase text-[11px] tracking-wider text-text-muted/80">
                          {exp.type}
                        </span>
                      </div>

                      {/* Current Role Indicator */}
                      {exp.current && (
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Current Role
                          </span>
                          <svg className="w-6 h-4 overflow-visible text-emerald-400 -rotate-6" viewBox="0 0 28 20" fill="none">
                            <path
                              d="M 2 15 C 10 16, 18 13, 24 5 M 18 4 L 25 5 L 23 11"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Middle: Role, Company & Narrative Description */}
                    <div className="my-4 flex flex-col gap-2">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-sans text-2xl sm:text-3xl font-bold text-text-primary">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm sm:text-base font-medium text-text-secondary">
                          <Building2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <p className="mt-1 text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Quantified Bullet Points */}
                    <ul className="flex flex-col gap-2 py-2 border-t border-border/30">
                      {exp.achievements.map((ach, aIdx) => (
                        <li
                          key={aIdx}
                          className="text-xs sm:text-sm text-text-muted leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-2 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom: Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-bg-primary text-[11px] font-mono text-text-muted border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
