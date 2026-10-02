"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Layers,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { projects as defaultProjects } from "@/lib/mockData";

// Hand-drawn sketchy doodle SVGs tailored to engineering projects
function ProjectTopicDoodle({ index, project }) {
  const doodleType = index % 6;
  switch (doodleType) {
    case 0: // Real-time Sync & Sockets
      return (
        <svg viewBox="0 0 240 85" className="w-full h-auto select-none pointer-events-none">
          <circle cx="45" cy="42" r="18" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <path d="M45,24 L45,60 M27,42 L63,42" stroke="currentColor" strokeWidth="1.8" className="text-stone-800 dark:text-stone-100" />
          <path d="M72,42 C92,30 110,54 135,42" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeDasharray="3 3" className="dark:stroke-sky-400" />
          <polygon points="135,38 143,42 135,46" fill="#3b82f6" className="dark:fill-sky-400" />
          <rect x="150" y="28" width="46" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <text x="96" y="24" className="font-['Architects_Daughter'] text-[12px] font-bold fill-blue-600 dark:fill-sky-400">
            WS socket sync ⚡
          </text>
          <text x="108" y="72" className="font-['Caveat'] text-[15px] font-bold fill-stone-800 dark:fill-stone-100">
            &lt;15ms latency
          </text>
        </svg>
      );
    case 1: // Distributed Queue & Redis Lock
      return (
        <svg viewBox="0 0 240 85" className="w-full h-auto select-none pointer-events-none">
          <rect x="28" y="32" width="38" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <circle cx="47" cy="46" r="3" fill="currentColor" className="text-stone-800 dark:text-amber-400" />
          <path d="M74,38 L88,38 L84,50 L98,50 L88,68" fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" className="dark:stroke-emerald-400" />
          <ellipse cx="145" cy="32" rx="20" ry="7" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <path d="M125,32 L125,54 C125,60 165,60 165,54 L165,32" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <text x="110" y="74" className="font-['Architects_Daughter'] text-[12px] font-bold fill-emerald-600 dark:fill-emerald-400">
            atomic redis lock 🔒
          </text>
        </svg>
      );
    case 2: // Design System & Zero-Runtime CSS
      return (
        <svg viewBox="0 0 240 85" className="w-full h-auto select-none pointer-events-none">
          <rect x="30" y="28" width="48" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <circle cx="44" cy="40" r="3.5" fill="#3b82f6" />
          <circle cx="58" cy="40" r="3.5" fill="#ec4899" />
          <path d="M88,45 L125,45" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" className="text-stone-800 dark:text-stone-100" />
          <path d="M120,40 L128,45 L120,50" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-800 dark:text-stone-100" />
          <rect x="136" y="28" width="56" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <text x="145" y="49" className="font-mono text-[11px] font-bold fill-blue-600 dark:fill-sky-400">
            tokens
          </text>
          <text x="95" y="74" className="font-['Architects_Daughter'] text-[12px] font-bold fill-purple-600 dark:fill-purple-400">
            WCAG AA 100% 🎨
          </text>
        </svg>
      );
    case 3: // Isometric 3D Engine & FPS
      return (
        <svg viewBox="0 0 240 85" className="w-full h-auto select-none pointer-events-none">
          <polygon points="40,24 70,36 70,64 40,52" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <polygon points="70,36 100,24 100,52 70,64" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <polygon points="40,24 70,12 100,24 70,36" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <path d="M115,42 L145,42" stroke="#10b981" strokeWidth="2.2" strokeDasharray="4 2" className="dark:stroke-emerald-400" />
          <polygon points="145,38 153,42 145,46" fill="#10b981" className="dark:fill-emerald-400" />
          <text x="156" y="46" className="font-mono text-[12px] font-bold fill-emerald-600 dark:fill-emerald-400">
            60 FPS
          </text>
          <text x="96" y="74" className="font-['Architects_Daughter'] text-[12px] font-bold fill-amber-600 dark:fill-amber-400">
            spatial layout 📐
          </text>
        </svg>
      );
    case 4: // AI & LLM Streaming Channels
      return (
        <svg viewBox="0 0 240 85" className="w-full h-auto select-none pointer-events-none">
          <path d="M30,42 Q50,20 70,42 T110,42" fill="none" stroke="#8b5cf6" strokeWidth="2.2" className="dark:stroke-purple-400" />
          <circle cx="125" cy="42" r="14" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <path d="M121,38 L129,42 L121,46 Z" fill="currentColor" className="text-purple-600 dark:text-purple-400" />
          <rect x="150" y="28" width="52" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-800 dark:text-stone-100" />
          <text x="158" y="48" className="font-mono text-[11px] font-bold fill-purple-600 dark:fill-purple-400">
            LLM::AST
          </text>
          <text x="75" y="74" className="font-['Architects_Daughter'] text-[12px] font-bold fill-purple-600 dark:fill-purple-400">
            token stream 🧠
          </text>
        </svg>
      );
    case 5: // Memory optimization & Storage
    default:
      return (
        <svg viewBox="0 0 240 85" className="w-full h-auto select-none pointer-events-none">
          <rect x="32" y="25" width="60" height="38" rx="3" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <line x1="32" y1="36" x2="92" y2="36" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="42" cy="30.5" r="2.2" fill="#ef4444" />
          <circle cx="50" cy="30.5" r="2.2" fill="#eab308" />
          <circle cx="58" cy="30.5" r="2.2" fill="#22c55e" />
          <path d="M102,44 L138,44" stroke="#3b82f6" strokeWidth="2.2" strokeDasharray="3 3" />
          <rect x="148" y="28" width="50" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-stone-800 dark:text-stone-100" />
          <text x="156" y="48" className="font-mono text-[11px] font-bold fill-blue-600 dark:fill-sky-400">
            -30% RAM
          </text>
          <text x="90" y="74" className="font-['Architects_Daughter'] text-[12px] font-bold fill-blue-600 dark:fill-sky-400">
            memory heap 🗄️
          </text>
        </svg>
      );
  }
}

/**
 * Left Page: Live System Preview + External Links + Sketches
 */
function ProjectLeftPage({ project, index }) {
  if (!project) return null;

  const pageNum = index * 2 + 1;
  const formattedPageNum = pageNum < 10 ? `0${pageNum}` : pageNum;

  return (
    <div className="w-full h-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative select-none bg-transparent">
      {/* Red Vertical Margin Line */}
      <div className="absolute top-0 bottom-0 left-9 sm:left-12 w-[2px] bg-rose-500/50 dark:bg-rose-500/60 pointer-events-none z-10" />

      {/* Header Row: Category & Status */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-300 pb-2 border-b border-stone-300/80 dark:border-stone-700/80 pl-8">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400">
          <Layers className="w-3.5 h-3.5" />
          <span>{project.category || "Full Stack"}</span>
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
          <span>BUILD // {project.year || "2025"}</span>
        </span>
      </div>

      {/* Center: Framed Screenshot Card */}
      <div className="my-auto py-1 pl-8 flex flex-col gap-2.5">
        <div className="relative p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-md">
          {/* Frosted Drafting Tape Motifs */}
          <div className="absolute -top-2 left-4 w-11 h-4 bg-amber-200/85 dark:bg-white/20 dark:backdrop-blur-sm rotate-[-5deg] border border-amber-300/70 dark:border-white/30 shadow-sm pointer-events-none z-10" />
          <div className="absolute -top-2 right-4 w-11 h-4 bg-amber-200/85 dark:bg-white/20 dark:backdrop-blur-sm rotate-[5deg] border border-amber-300/70 dark:border-white/30 shadow-sm pointer-events-none z-10" />

          {/* Screenshot */}
          <div className="relative w-full h-36 sm:h-40 lg:h-44 overflow-hidden bg-stone-200 dark:bg-stone-950 border border-stone-300 dark:border-stone-800">
            <img
              src={project.coverImage?.url || "/work-1.webp"}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover filter contrast-[1.03]"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/85 dark:bg-stone-900/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10">
              {project.status || "Production"}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-['Architects_Daughter'] text-stone-600 dark:text-stone-300">
            <span>Fig {index + 1 < 10 ? `0${index + 1}` : index + 1}. Live Production System</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Verified ✅</span>
          </div>
        </div>

        {/* Quick Action Links Bar */}
        <div className="flex items-center gap-3 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-sky-400 transition-colors shadow-sm cursor-pointer"
            >
              <span>Live System</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {project.githubUrl && project.githubUrl !== "--" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-200/90 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 text-[11px] font-mono font-medium hover:border-blue-500 transition-colors cursor-pointer"
            >
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </a>
          )}

          <span className="ml-auto text-[10px] font-mono text-stone-500 dark:text-stone-400 truncate max-w-[140px]">
            ROLE: {project.myRole || "Architect"}
          </span>
        </div>

        {/* Technical Doodle Diagram */}
        <div className="pt-1">
          <ProjectTopicDoodle index={index} project={project} />
        </div>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-300/80 dark:border-stone-700/80 text-xs font-mono text-stone-600 dark:text-stone-400 pl-8">
        <span className="font-['Architects_Daughter'] text-blue-600 dark:text-sky-400 text-[11px]">
          // architectural ledger: verified
        </span>
        <span className="font-bold text-stone-800 dark:text-stone-200">
          PAGE {formattedPageNum}
        </span>
      </div>
    </div>
  );
}

/**
 * Right Page: Specs, Problem/Solution, Tech Chips, Metrics, Case Study Action
 */
function ProjectRightPage({ project, index, isTurningRef }) {
  if (!project) return null;
  const caseStudyUrl = `/projects/${project.slug?.current}`;
  const pageNum = index * 2 + 2;
  const formattedPageNum = pageNum < 10 ? `0${pageNum}` : pageNum;

  return (
    <div className="w-full h-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative select-none pr-8 bg-transparent">
      {/* Margin Line on Right */}
      <div className="absolute top-0 bottom-0 right-9 sm:right-12 w-[2px] bg-rose-500/50 dark:bg-rose-500/60 pointer-events-none z-10" />

      {/* Header Row: Chapter & Duration */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-300 pb-2 border-b border-stone-300/80 dark:border-stone-700/80">
        <span className="font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">
          SYSTEM SPEC // {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
        <span className="px-2.5 py-0.5 rounded bg-stone-200/90 dark:bg-stone-800/90 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-[11px] font-bold">
          {project.duration || "Production"}
        </span>
      </div>

      {/* Main Narrative */}
      <div className="my-auto py-2 flex flex-col gap-2.5">
        <span className="font-['Architects_Daughter'] text-xs font-bold text-amber-600 dark:text-amber-400">
          ★ Production System Architecture
        </span>

        <h3 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 dark:text-white leading-[1.12]">
          {project.title}
        </h3>

        {/* Hand-drawn scribble underline */}
        <svg viewBox="0 0 200 8" className="w-44 h-2 text-blue-500 dark:text-sky-400 opacity-80 -mt-1 pointer-events-none">
          <path d="M2,4 Q50,7 100,4 T198,5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-normal leading-relaxed line-clamp-3">
          {project.problem || project.tagline}
        </p>

        {project.solution && (
          <div className="mt-1 flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-200 leading-normal border-l-2 border-blue-500 pl-3 py-1 bg-stone-100/50 dark:bg-stone-900/40 line-clamp-2">
            <span>{project.solution}</span>
          </div>
        )}

        {/* Tech Stack Tags */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs font-mono text-stone-800 dark:text-stone-200 bg-stone-200/80 dark:bg-stone-800/90 border border-stone-300 dark:border-stone-700 pointer-events-none"
              >
                #{tech}
              </span>
            ))}
          </div>
        )}

        {/* System Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 py-2 border-y border-stone-300/70 dark:border-stone-700/70">
            {project.metrics.slice(0, 2).map((m, mIdx) => (
              <div key={mIdx} className="flex flex-col">
                <span className="font-mono text-lg font-bold text-blue-600 dark:text-sky-400">
                  {m.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Case study button */}
        <div className="pt-2 flex items-center justify-between">
          <Link
            href={caseStudyUrl}
            onClick={(e) => {
              if (isTurningRef?.current) {
                e.preventDefault();
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-mono font-bold tracking-wider uppercase hover:bg-blue-600 dark:hover:bg-sky-400 transition-colors shadow-sm select-none cursor-pointer"
          >
            <span>Explore Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-300/80 dark:border-stone-700/80 text-xs font-mono text-stone-600 dark:text-stone-400">
        <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
          LOGGED BY DEEP MOITRA
        </span>
        <span className="font-bold text-stone-800 dark:text-stone-200">
          PAGE {formattedPageNum}
        </span>
      </div>
    </div>
  );
}

export default function ProjectNotebook({
  allProjects = defaultProjects,
  showHeader = true,
  initialFilter = "All",
}) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const filters = [
    "All",
    "Production Projects",
    "Learning Projects",
    "Full Stack",
    "Frontend",
    "UI/UX",
  ];

  // Dynamically filter projects based on activeFilter
  const items = React.useMemo(() => {
    if (activeFilter === "All") return allProjects;
    return allProjects.filter((p) => {
      if (p.category === activeFilter) return true;
      if (p.status === activeFilter) return true;
      if (
        activeFilter === "Production Projects" &&
        (p.projectType === "production" ||
          p.status?.toLowerCase().includes("prod") ||
          p.status?.toLowerCase().includes("live"))
      )
        return true;
      if (
        activeFilter === "Learning Projects" &&
        (p.projectType === "learning" ||
          p.status?.toLowerCase().includes("mvp") ||
          p.status?.toLowerCase().includes("dev") ||
          p.status?.toLowerCase().includes("beta") ||
          p.status?.toLowerCase().includes("open source"))
      )
        return true;
      return false;
    });
  }, [allProjects, activeFilter]);

  const [spreadIndex, setSpreadIndex] = useState(0);

  const spreadIndexRef = useRef(0);
  spreadIndexRef.current = spreadIndex;

  const totalLeaves = Math.max(0, items.length - 1);
  const totalSpreads = items.length;

  const lookbookRef = useRef(null);
  const blockRef = useRef(null);
  const leavesRef = useRef([]);

  const isTurningRef = useRef(false);

  // Dragging interaction state
  const isHoldingRef = useRef(false);
  const dragDirectionRef = useRef(null);
  const activeDragLeafRef = useRef(null);
  const dragProgressRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const updateLeavesZAndState = useCallback((activeIdx) => {
    const currentTotalLeaves = items.length - 1;
    leavesRef.current.forEach((leafEl, i) => {
      if (!leafEl) return;
      const isTurned = i < activeIdx;
      gsap.killTweensOf(leafEl);
      gsap.set(leafEl, {
        rotateY: isTurned ? -180 : 0,
        rotateZ: 0,
        z: 0,
        zIndex: isTurned ? i + 1 : currentTotalLeaves - i,
      });
      const shadowFront = leafEl.querySelector(".page-curl-shadow--front") || leafEl.querySelector(".page-curl-shadow");
      const shadowBack = leafEl.querySelector(".page-curl-shadow--back");
      if (shadowFront) shadowFront.style.opacity = "0";
      if (shadowBack) shadowBack.style.opacity = "0";
    });
  }, [items.length]);

  // When filtered items change, reset to first spread
  useEffect(() => {
    setSpreadIndex(0);
    spreadIndexRef.current = 0;
    const t = setTimeout(() => {
      updateLeavesZAndState(0);
    }, 40);
    return () => clearTimeout(t);
  }, [items, updateLeavesZAndState]);

  const turnToSpread = useCallback((targetIndex) => {
    if (isTurningRef.current) return;
    const current = spreadIndexRef.current;
    if (targetIndex === current) return;
    if (targetIndex < 0 || targetIndex >= totalSpreads) return;

    // For jumps across multiple spreads, update directly
    if (Math.abs(targetIndex - current) > 1) {
      spreadIndexRef.current = targetIndex;
      setSpreadIndex(targetIndex);
      updateLeavesZAndState(targetIndex);
      return;
    }

    isTurningRef.current = true;
    const isNext = targetIndex > current;
    const leafIndex = isNext ? current : targetIndex;
    const leafEl = leavesRef.current[leafIndex];

    if (!leafEl) {
      setSpreadIndex(targetIndex);
      updateLeavesZAndState(targetIndex);
      isTurningRef.current = false;
      return;
    }

    leafEl.style.zIndex = "48";
    const startAngle = isNext ? 0 : -180;
    const endAngle = isNext ? -180 : 0;
    const tweenObj = { angle: startAngle };

    const shadowFront = leafEl.querySelector(".page-curl-shadow--front") || leafEl.querySelector(".page-curl-shadow");
    const shadowBack = leafEl.querySelector(".page-curl-shadow--back");

    gsap.to(tweenObj, {
      angle: endAngle,
      duration: 0.65,
      ease: "power2.inOut",
      onUpdate: () => {
        const curAngle = tweenObj.angle;
        const curProg = Math.abs(curAngle) / 180;
        const liftZ = Math.sin(curProg * Math.PI) * 35;
        const curlTilt = Math.sin(curProg * Math.PI) * (isNext ? -2.2 : 2.2);

        gsap.set(leafEl, {
          rotateY: curAngle,
          rotateZ: curlTilt,
          z: liftZ,
          transformOrigin: "0% 50%",
        });

        const curlAmt = Math.sin(curProg * Math.PI);
        if (curAngle >= -90) {
          if (shadowFront) shadowFront.style.opacity = (curlAmt * 0.45).toFixed(3);
          if (shadowBack) shadowBack.style.opacity = "0";
          leafEl.style.zIndex = "48";
        } else {
          if (shadowBack) shadowBack.style.opacity = (curlAmt * 0.45).toFixed(3);
          if (shadowFront) shadowFront.style.opacity = "0";
          leafEl.style.zIndex = "44";
        }

        const tiltLift = Math.sin(curProg * Math.PI);
        const tiltSign = isNext ? -1 : 1;
        gsap.set(blockRef.current, {
          rotateY: tiltSign * tiltLift * 1.8,
          x: tiltSign * tiltLift * 4,
        });
      },
      onComplete: () => {
        if (shadowFront) shadowFront.style.opacity = "0";
        if (shadowBack) shadowBack.style.opacity = "0";
        gsap.set(leafEl, { rotateZ: 0, z: 0 });
        gsap.to(blockRef.current, { rotateY: 0, x: 0, duration: 0.25, ease: "power2.out" });

        spreadIndexRef.current = targetIndex;
        setSpreadIndex(targetIndex);
        updateLeavesZAndState(targetIndex);
        isTurningRef.current = false;
      },
    });
  }, [totalSpreads, updateLeavesZAndState]);

  const turnNext = useCallback(() => {
    if (spreadIndexRef.current < totalSpreads - 1) {
      turnToSpread(spreadIndexRef.current + 1);
    }
  }, [totalSpreads, turnToSpread]);

  const turnPrev = useCallback(() => {
    if (spreadIndexRef.current > 0) {
      turnToSpread(spreadIndexRef.current - 1);
    }
  }, [turnToSpread]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // REAL-TIME MOUSE DRAG & PAGE TURNING PHYSICS
  useEffect(() => {
    const el = lookbookRef.current;
    if (!el || totalLeaves === 0) return;

    const handlePointerDown = (e) => {
      if (e.target.closest("button, a, input")) return;
      if (isTurningRef.current) return;
      if (!blockRef.current) return;

      const rect = blockRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const isRightSide = clickX >= rect.width / 2;

      const current = spreadIndexRef.current;
      let direction = null;
      let leaf = null;

      if (isRightSide && current < totalSpreads - 1) {
        direction = "next";
        leaf = leavesRef.current[current];
      } else if (!isRightSide && current > 0) {
        direction = "prev";
        leaf = leavesRef.current[current - 1];
      }

      if (!direction || !leaf) return;

      e.preventDefault();

      isHoldingRef.current = true;
      hasDraggedRef.current = false;
      dragDirectionRef.current = direction;
      activeDragLeafRef.current = leaf;
      dragStartXRef.current = e.clientX;
      dragStartYRef.current = e.clientY;
      dragLastXRef.current = e.clientX;
      dragStartTimeRef.current = Date.now();
      dragProgressRef.current = 0;

      leaf.style.zIndex = "48";
      document.body.style.cursor = "grabbing";
    };

    const handlePointerMove = (e) => {
      if (!isHoldingRef.current || !activeDragLeafRef.current) return;

      const dx = e.clientX - dragStartXRef.current;
      const dy = e.clientY - dragStartYRef.current;
      dragLastXRef.current = e.clientX;

      if (Math.hypot(dx, dy) > 6) {
        hasDraggedRef.current = true;
      }

      const blockW = blockRef.current?.offsetWidth || 1220;
      const pageW = blockW / 2;
      const dragDist = pageW * 0.95;

      const direction = dragDirectionRef.current;
      const leaf = activeDragLeafRef.current;

      const shadowFront = leaf.querySelector(".page-curl-shadow--front") || leaf.querySelector(".page-curl-shadow");
      const shadowBack = leaf.querySelector(".page-curl-shadow--back");

      if (direction === "next") {
        const progress = Math.max(0, Math.min(1, -dx / dragDist));
        dragProgressRef.current = progress;

        const angle = -180 * progress;
        const liftZ = Math.sin(Math.PI * progress) * 36;
        const curlTilt = Math.sin(Math.PI * progress) * -2.5;

        gsap.set(leaf, {
          rotateY: angle,
          rotateZ: curlTilt,
          z: liftZ,
          transformOrigin: "0% 50%",
        });

        const curlAmt = Math.sin(Math.PI * progress);
        if (progress <= 0.5) {
          if (shadowFront) shadowFront.style.opacity = (curlAmt * 0.5).toFixed(3);
          if (shadowBack) shadowBack.style.opacity = "0";
          leaf.style.zIndex = "48";
        } else {
          if (shadowBack) shadowBack.style.opacity = (curlAmt * 0.5).toFixed(3);
          if (shadowFront) shadowFront.style.opacity = "0";
          leaf.style.zIndex = "44";
        }

        const tiltLift = Math.sin(Math.PI * progress);
        gsap.set(blockRef.current, {
          rotateY: -tiltLift * 2,
          x: -tiltLift * 4,
        });
      } else if (direction === "prev") {
        const progress = Math.max(0, Math.min(1, dx / dragDist));
        dragProgressRef.current = progress;

        const angle = -180 + 180 * progress;
        const liftZ = Math.sin(Math.PI * progress) * 36;
        const curlTilt = Math.sin(Math.PI * progress) * 2.5;

        gsap.set(leaf, {
          rotateY: angle,
          rotateZ: curlTilt,
          z: liftZ,
          transformOrigin: "0% 50%",
        });

        const curlAmt = Math.sin(Math.PI * progress);
        if (progress >= 0.5) {
          if (shadowFront) shadowFront.style.opacity = (curlAmt * 0.5).toFixed(3);
          if (shadowBack) shadowBack.style.opacity = "0";
          leaf.style.zIndex = "48";
        } else {
          if (shadowBack) shadowBack.style.opacity = (curlAmt * 0.5).toFixed(3);
          if (shadowFront) shadowFront.style.opacity = "0";
          leaf.style.zIndex = "44";
        }

        const tiltLift = Math.sin(Math.PI * progress);
        gsap.set(blockRef.current, {
          rotateY: tiltLift * 2,
          x: tiltLift * 4,
        });
      }
    };

    const handlePointerUp = (e) => {
      if (!isHoldingRef.current || !activeDragLeafRef.current) return;
      isHoldingRef.current = false;
      document.body.style.cursor = "";

      const direction = dragDirectionRef.current;
      const leaf = activeDragLeafRef.current;
      const progress = dragProgressRef.current;
      const dx = e.clientX - dragStartXRef.current;
      const dt = Math.max(1, Date.now() - dragStartTimeRef.current);
      const velocity = dx / dt;

      const shadowFront = leaf.querySelector(".page-curl-shadow--front") || leaf.querySelector(".page-curl-shadow");
      const shadowBack = leaf.querySelector(".page-curl-shadow--back");

      if (!hasDraggedRef.current) {
        activeDragLeafRef.current = null;
        if (direction === "next") {
          turnNext();
        } else if (direction === "prev") {
          turnPrev();
        }
        return;
      }

      isTurningRef.current = true;

      let shouldCommit = false;
      if (direction === "next") {
        shouldCommit = progress >= 0.35 || velocity < -0.25;
      } else {
        shouldCommit = progress >= 0.35 || velocity > 0.25;
      }

      if (direction === "next") {
        const targetAngle = shouldCommit ? -180 : 0;
        const currentAngle = -180 * progress;
        const distanceToTarget = Math.abs(targetAngle - currentAngle);
        const duration = Math.max(0.32, (distanceToTarget / 180) * 0.52);

        const tweenObj = { angle: currentAngle, z: Math.sin(Math.PI * progress) * 36 };

        gsap.to(tweenObj, {
          angle: targetAngle,
          z: 0,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            const curProg = Math.abs(tweenObj.angle) / 180;
            const curlAmt = Math.sin(Math.PI * curProg);

            gsap.set(leaf, {
              rotateY: tweenObj.angle,
              rotateZ: curlAmt * -1.5,
              z: tweenObj.z,
              transformOrigin: "0% 50%",
            });

            if (curProg <= 0.5) {
              if (shadowFront) shadowFront.style.opacity = (curlAmt * 0.45).toFixed(3);
              if (shadowBack) shadowBack.style.opacity = "0";
              leaf.style.zIndex = "48";
            } else {
              if (shadowBack) shadowBack.style.opacity = (curlAmt * 0.45).toFixed(3);
              if (shadowFront) shadowFront.style.opacity = "0";
              leaf.style.zIndex = "44";
            }
          },
          onComplete: () => {
            if (shadowFront) shadowFront.style.opacity = "0";
            if (shadowBack) shadowBack.style.opacity = "0";
            gsap.set(leaf, { rotateZ: 0, z: 0 });
            gsap.to(blockRef.current, { rotateY: 0, x: 0, duration: 0.25, ease: "power2.out" });

            if (shouldCommit) {
              const newIdx = spreadIndexRef.current + 1;
              spreadIndexRef.current = newIdx;
              setSpreadIndex(newIdx);
            }
            updateLeavesZAndState(spreadIndexRef.current);
            isTurningRef.current = false;
            hasDraggedRef.current = false;
            activeDragLeafRef.current = null;
          },
        });
      } else if (direction === "prev") {
        const targetAngle = shouldCommit ? 0 : -180;
        const currentAngle = -180 + 180 * progress;
        const distanceToTarget = Math.abs(targetAngle - currentAngle);
        const duration = Math.max(0.32, (distanceToTarget / 180) * 0.52);

        const tweenObj = { angle: currentAngle, z: Math.sin(Math.PI * progress) * 36 };

        gsap.to(tweenObj, {
          angle: targetAngle,
          z: 0,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            const curProg = (tweenObj.angle + 180) / 180;
            const curlAmt = Math.sin(Math.PI * curProg);

            gsap.set(leaf, {
              rotateY: tweenObj.angle,
              rotateZ: curlAmt * 1.5,
              z: tweenObj.z,
              transformOrigin: "0% 50%",
            });

            if (curProg >= 0.5) {
              if (shadowFront) shadowFront.style.opacity = (curlAmt * 0.45).toFixed(3);
              if (shadowBack) shadowBack.style.opacity = "0";
              leaf.style.zIndex = "48";
            } else {
              if (shadowBack) shadowBack.style.opacity = (curlAmt * 0.45).toFixed(3);
              if (shadowFront) shadowFront.style.opacity = "0";
              leaf.style.zIndex = "44";
            }
          },
          onComplete: () => {
            if (shadowFront) shadowFront.style.opacity = "0";
            if (shadowBack) shadowBack.style.opacity = "0";
            gsap.set(leaf, { rotateZ: 0, z: 0 });
            gsap.to(blockRef.current, { rotateY: 0, x: 0, duration: 0.25, ease: "power2.out" });

            if (shouldCommit) {
              const newIdx = spreadIndexRef.current - 1;
              spreadIndexRef.current = newIdx;
              setSpreadIndex(newIdx);
            }
            updateLeavesZAndState(spreadIndexRef.current);
            isTurningRef.current = false;
            hasDraggedRef.current = false;
            activeDragLeafRef.current = null;
          },
        });
      }
    };

    el.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [totalLeaves, totalSpreads, turnNext, turnPrev, updateLeavesZAndState]);

  // Trackpad horizontal swipe
  const deltaXAccumRef = useRef(0);
  const swipeTimeoutRef = useRef(null);

  useEffect(() => {
    const el = lookbookRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      if (absY > absX * 0.8 || absX < 4) {
        deltaXAccumRef.current = 0;
        return;
      }

      e.preventDefault();
      deltaXAccumRef.current += e.deltaX;

      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
      swipeTimeoutRef.current = setTimeout(() => {
        deltaXAccumRef.current = 0;
      }, 160);

      if (deltaXAccumRef.current >= 18) {
        deltaXAccumRef.current = 0;
        turnNext();
      } else if (deltaXAccumRef.current <= -18) {
        deltaXAccumRef.current = 0;
        turnPrev();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    };
  }, [turnNext, turnPrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.closest("input, textarea")) return;
      if (e.key === "ArrowRight") {
        turnNext();
      } else if (e.key === "ArrowLeft") {
        turnPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnNext, turnPrev]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* 3D BOOK STYLES */}
      <style jsx global>{`
        .book-stage {
          perspective: 2400px;
          perspective-origin: 50% 50%;
          width: 100%;
          max-width: 1220px;
          display: none;
          justify-content: center;
          align-items: center;
          touch-action: pan-y;
          user-select: none;
        }
        @media (min-width: 768px) {
          .book-stage {
            display: flex;
          }
        }
        .book-block {
          position: relative;
          width: 100%;
          height: clamp(620px, 76vh, 730px);
          transform-style: preserve-3d;
          transition: transform 0.25s ease-out;
        }
        .book-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 48px;
          transform: translateX(-50%);
          background: linear-gradient(
            90deg,
            rgba(20, 18, 16, 0) 0%,
            rgba(20, 18, 16, 0.05) 28%,
            rgba(20, 18, 16, 0.22) 50%,
            rgba(20, 18, 16, 0.05) 72%,
            rgba(20, 18, 16, 0) 100%
          );
          pointer-events: none;
          z-index: 50;
        }
        .dark .book-spine {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.12) 28%,
            rgba(0, 0, 0, 0.42) 50%,
            rgba(0, 0, 0, 0.12) 72%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        /* Authentic Notebook Ruled Paper Background */
        .book-page,
        .book-leaf__face {
          background-color: #fbf9f4 !important;
          background-image: linear-gradient(
            to bottom,
            transparent 0px,
            transparent 28px,
            rgba(65, 115, 185, 0.22) 28px,
            rgba(65, 115, 185, 0.22) 29.5px
          ) !important;
          background-size: 100% 29.5px !important;
          background-position: 0 4px !important;
          color: #141210;
        }
        .dark .book-page,
        .dark .book-leaf__face {
          background-color: #14161f !important;
          background-image: linear-gradient(
            to bottom,
            transparent 0px,
            transparent 28px,
            rgba(148, 163, 184, 0.18) 28px,
            rgba(148, 163, 184, 0.18) 29.5px
          ) !important;
          background-size: 100% 29.5px !important;
          background-position: 0 4px !important;
          color: #efe9df;
        }
        .book-page--base {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          z-index: 0;
          overflow: hidden;
          box-shadow: 0 24px 55px rgba(0, 0, 0, 0.45);
        }
        .book-page--base-left {
          left: 0;
          border-radius: 12px 0 0 12px;
          box-shadow: inset -4px 0 8px -2px rgba(0, 0, 0, 0.06);
        }
        .book-page--base-right {
          left: 50%;
          border-radius: 0 12px 12px 0;
          box-shadow: inset 4px 0 8px -2px rgba(0, 0, 0, 0.06);
        }
        .book-leaf {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          transform-origin: 0% 50%;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .book-leaf__face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          overflow: hidden;
        }
        .book-leaf__face--front {
          border-radius: 0 12px 12px 0;
        }
        .book-leaf__face--back {
          transform: rotateY(180deg);
          border-radius: 12px 0 0 12px;
        }
        .page-curl-shadow {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 70px;
          pointer-events: none;
          opacity: 0;
          z-index: 30;
          transition: opacity 0.08s ease-out;
        }
        .page-curl-shadow--front {
          left: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.28) 0%,
            rgba(0, 0, 0, 0.12) 30%,
            transparent 70%
          );
        }
        .page-curl-shadow--back {
          right: 0;
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.28) 0%,
            rgba(0, 0, 0, 0.12) 30%,
            transparent 70%
          );
        }
      `}</style>

      {/* Section Header */}
      {showHeader && (
        <div className="w-full max-w-[1220px] flex flex-col gap-6 pb-6 border-b border-border/70">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary border border-border text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>3D INTERACTIVE JOURNAL • ARCHITECTURAL LEDGER</span>
              </div>
              <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
                Engineering Works & Systems.
              </h2>
              <p className="mt-3 text-text-secondary text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                Authentic bound engineering journal with real-time mouse drag physics. Click & drag a page across, swipe on trackpad, or use the navigation controls below.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-end">
              <span className="text-xs font-mono text-text-muted">
                Project{" "}
                <strong className="text-text-primary">
                  {items.length === 0
                    ? "00"
                    : spreadIndex + 1 < 10
                    ? `0${spreadIndex + 1}`
                    : spreadIndex + 1}
                </strong>{" "}
                of {totalSpreads < 10 ? `0${totalSpreads}` : totalSpreads}
              </span>
            </div>
          </div>

          {/* Filter Bar: Razor Sharp Precision Tabs */}
          <div className="flex items-center border border-border bg-bg-secondary p-1 flex-wrap">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-150 select-none cursor-pointer ${
                    isActive
                      ? "bg-text-primary text-text-inverse font-bold shadow-sm"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-primary/50"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3D BOOK STAGE: PURE GPU ACCELERATED MULTI-LEAF ARCHITECTURE               */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-center relative py-4">
        {items.length === 0 ? (
          <div className="w-full max-w-[1220px] p-16 text-center border border-dashed border-border bg-bg-secondary/40 font-mono text-xs text-text-muted">
            NO SYSTEMS CATALOGED UNDER FILTER: {activeFilter.toUpperCase()}
          </div>
        ) : (
          <>
            {/* Desktop / Tablet 3D Dual-Page Book Stage (md and up) */}
            <div
              ref={lookbookRef}
              className="book-stage hidden md:block"
              aria-label="Interactive 3D Project Journal"
            >
              <div
                ref={blockRef}
                className="book-block rounded-2xl border-2 border-stone-400/40 dark:border-stone-800 overflow-hidden relative shadow-[0_35px_80px_-15px_rgba(0,0,0,0.75),0_10px_25px_-5px_rgba(0,0,0,0.5)]"
              >
                {/* Spine Gutter Crease */}
                <div className="book-spine" />

                {/* Silk Bookmark Ribbon on Spine */}
                <div
                  className="absolute -top-3 w-4 h-16 bg-red-600 dark:bg-rose-700 rounded-b shadow-xl z-52 pointer-events-none"
                  style={{
                    left: "calc(50% - 8px)",
                    boxShadow: "2px 5px 12px rgba(0,0,0,0.5)",
                  }}
                />

                {/* BASE STATIC LEFT PAGE (Spread 1 Left) */}
                <div className="book-page book-page--base book-page--base-left">
                  <ProjectLeftPage project={items[0]} index={0} />
                </div>

                {/* BASE STATIC RIGHT PAGE (Last Spread Right) */}
                <div className="book-page book-page--base book-page--base-right">
                  <ProjectRightPage
                    project={items[items.length - 1]}
                    index={items.length - 1}
                    isTurningRef={isTurningRef}
                  />
                </div>

                {/* DYNAMIC PHYSICAL LEAVES */}
                {Array.from({ length: totalLeaves }).map((_, i) => (
                  <article
                    key={`leaf-${items[i]?._id || i}-${i}`}
                    ref={(el) => (leavesRef.current[i] = el)}
                    className="book-leaf"
                    style={{ zIndex: totalLeaves - i }}
                  >
                    {/* FRONT FACE: Spread i Right */}
                    <div
                      className="book-leaf__face book-leaf__face--front"
                      style={{ boxShadow: "inset 4px 0 8px -2px rgba(0,0,0,0.06)" }}
                    >
                      <div className="page-curl-shadow page-curl-shadow--front" />
                      <ProjectRightPage
                        project={items[i]}
                        index={i}
                        isTurningRef={isTurningRef}
                      />
                    </div>

                    {/* BACK FACE: Spread i+1 Left */}
                    <div
                      className="book-leaf__face book-leaf__face--back"
                      style={{ boxShadow: "inset -4px 0 8px -2px rgba(0,0,0,0.06)" }}
                    >
                      <div className="page-curl-shadow page-curl-shadow--back" />
                      <ProjectLeftPage project={items[i + 1]} index={i + 1} />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Mobile Bound Architectural Journal Sheet (< md) */}
            <div className="w-full block md:hidden max-w-md mx-auto">
              <div className="book-page rounded-2xl border-2 border-stone-400/40 dark:border-stone-800 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.45)] p-5 flex flex-col gap-4">
                {/* Red Vertical Margin Line */}
                <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-rose-500/50 dark:bg-rose-500/60 pointer-events-none z-10" />

                {/* Silk Bookmark Ribbon */}
                <div
                  className="absolute -top-1 right-6 w-3.5 h-10 bg-red-600 dark:bg-rose-700 rounded-b shadow-md z-20 pointer-events-none"
                />

                {/* Header Row: Category & System Spec */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-300 pb-2 border-b border-stone-300/80 dark:border-stone-700/80 pl-6">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{items[spreadIndex]?.category || "Full Stack"}</span>
                  </span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    SPEC // {spreadIndex + 1 < 10 ? `0${spreadIndex + 1}` : spreadIndex + 1}
                  </span>
                </div>

                {/* Title & Duration */}
                <div className="pl-6 flex flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {items[spreadIndex]?.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-stone-200/90 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-mono font-bold shrink-0">
                      {items[spreadIndex]?.duration || "Production"}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                    {items[spreadIndex]?.tagline || items[spreadIndex]?.problem}
                  </p>
                </div>

                {/* Framed Screenshot with Frosted Drafting Tape */}
                <div className="pl-6 flex flex-col gap-2">
                  <div className="relative p-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-sm">
                    <div className="absolute -top-2 left-4 w-9 h-3.5 bg-amber-200/85 dark:bg-white/20 rotate-[-4deg] border border-amber-300/70 dark:border-white/30 pointer-events-none z-10" />
                    <div className="absolute -top-2 right-4 w-9 h-3.5 bg-amber-200/85 dark:bg-white/20 rotate-[4deg] border border-amber-300/70 dark:border-white/30 pointer-events-none z-10" />
                    <div className="relative w-full h-44 overflow-hidden bg-stone-200 dark:bg-stone-950 border border-stone-300 dark:border-stone-800">
                      <img
                        src={items[spreadIndex]?.coverImage?.url || "/work-1.webp"}
                        alt={items[spreadIndex]?.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover filter contrast-[1.03]"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/85 text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                        {items[spreadIndex]?.status || "Live System"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Live System & GitHub */}
                <div className="pl-6 flex flex-wrap items-center gap-2">
                  {items[spreadIndex]?.liveUrl && (
                    <a
                      href={items[spreadIndex]?.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-mono font-bold uppercase tracking-wider shadow-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      <span>Live System</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {items[spreadIndex]?.githubUrl && items[spreadIndex]?.githubUrl !== "--" && (
                    <a
                      href={items[spreadIndex]?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 text-xs font-mono font-medium rounded hover:border-blue-500 transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {items[spreadIndex]?.slug?.current && (
                    <Link
                      href={`/projects/${items[spreadIndex]?.slug?.current}`}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-mono font-bold text-blue-600 dark:text-sky-400 hover:underline"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {/* Technical Architecture Doodle on Mobile */}
                <div className="pl-6 pt-1">
                  <ProjectTopicDoodle index={spreadIndex} project={items[spreadIndex]} />
                </div>

                {/* Solution Summary */}
                {items[spreadIndex]?.solution && (
                  <div className="pl-6 p-2.5 rounded bg-stone-200/50 dark:bg-stone-900/50 border-l-2 border-blue-500 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    {items[spreadIndex]?.solution}
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="pl-6 flex flex-wrap gap-1.5">
                  {(items[spreadIndex]?.tags || []).slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800/80 border border-stone-300/80 dark:border-stone-700/80 text-[10px] font-mono text-stone-700 dark:text-stone-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Mobile Prev / Next Controls Inside Card */}
                <div className="pl-6 pt-3 flex items-center justify-between border-t border-stone-300/80 dark:border-stone-700/80 text-xs font-mono text-stone-600 dark:text-stone-400">
                  <button
                    type="button"
                    onClick={turnPrev}
                    disabled={spreadIndex === 0}
                    className="px-3 py-1.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 font-bold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    {spreadIndex + 1} / {totalSpreads}
                  </span>

                  <button
                    type="button"
                    onClick={turnNext}
                    disabled={spreadIndex >= totalSpreads - 1}
                    className="px-3 py-1.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 font-bold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* BOTTOM CONTROLS & HINT (Desktop & Tablet) */}
      <div className="w-full max-w-[1220px] hidden md:flex items-center justify-between pt-2 px-2 text-xs font-mono text-text-muted">
        <button
          type="button"
          onClick={turnPrev}
          disabled={spreadIndex === 0 || items.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-bg-secondary hover:bg-bg-primary disabled:opacity-30 disabled:pointer-events-none transition-all uppercase tracking-wider select-none shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <div className="flex items-center gap-2 font-['Architects_Daughter'] text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
          <span>Click & drag page edge, use arrow keys, or swipe horizontally to turn 📖</span>
        </div>

        <button
          type="button"
          onClick={turnNext}
          disabled={spreadIndex >= totalSpreads - 1 || items.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-bg-secondary hover:bg-bg-primary disabled:opacity-30 disabled:pointer-events-none transition-all uppercase tracking-wider select-none shadow-sm cursor-pointer"
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
