"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Bookmark,
  BookOpen,
  Cpu,
  Sparkles,
} from "lucide-react";
import { blogPosts } from "@/lib/mockData";

function cleanReadTime(timeStr) {
  if (!timeStr) return "5 min read";
  const num = timeStr.toString().replace(/[^0-9]/g, "");
  return num ? `${num} min read` : "5 min read";
}

// Hand-drawn sketchy doodle SVGs
function TopicDoodle({ index }) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 240 95" className="w-full h-auto select-none pointer-events-none">
          <path
            d="M50,34 C36,34 32,48 40,61 C44,68 45,74 49,76 L59,76 C63,74 64,68 68,61 C76,48 72,34 50,34 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M48,79 L60,79 M50,82 L58,82"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M47,51 Q54,38 54,51 Q54,38 61,51"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-stone-700 dark:text-amber-300"
          />
          <path
            d="M54,22 L54,12 M26,36 L16,30 M82,36 L92,30 M28,64 L18,70 M80,64 L90,70"
            stroke="#eab308"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="dark:stroke-amber-400"
          />
          <path
            d="M86,44 C108,34 125,54 145,44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 3"
            className="text-stone-600 dark:text-stone-300"
          />
          <path
            d="M142,38 L150,45 L141,49"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-600 dark:text-stone-300"
          />
          <text
            x="105"
            y="26"
            className="font-['Architects_Daughter'] text-[13px] font-bold fill-blue-600 dark:fill-sky-400"
            transform="rotate(-4 105 26)"
          >
            no re-renders!
          </text>
          <text
            x="118"
            y="72"
            className="font-['Caveat'] text-[17px] font-bold fill-stone-800 dark:fill-stone-100"
          >
            fiber tree compiled ⚡
          </text>
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 240 95" className="w-full h-auto select-none pointer-events-none">
          <rect
            x="30"
            y="41"
            width="42"
            height="32"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M38,41 L38,28 C38,18 64,18 64,28 L64,41"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-stone-800 dark:text-stone-100"
          />
          <circle cx="51" cy="54" r="3" fill="currentColor" className="text-stone-800 dark:text-amber-400" />
          <path d="M51,57 L51,64" stroke="currentColor" strokeWidth="2" className="text-stone-800 dark:text-stone-100" />
          <path
            d="M92,38 L105,38 L100,52 L114,52 L102,74"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="dark:stroke-sky-400"
          />
          <ellipse
            cx="155"
            cy="34"
            rx="22"
            ry="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M133,34 L133,61 C133,68 177,68 177,61 L177,34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M133,48 C133,55 177,55 177,48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="3 3"
            className="text-stone-700 dark:text-stone-300"
          />
          <text
            x="122"
            y="86"
            className="font-['Architects_Daughter'] text-[13px] font-bold fill-emerald-600 dark:fill-emerald-400"
          >
            &lt; 2ms cache lock!
          </text>
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 240 95" className="w-full h-auto select-none pointer-events-none">
          <path
            d="M30,46 C30,26 55,26 72,34 C85,40 95,60 82,69 C68,78 42,74 30,46 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <circle cx="45" cy="40" r="3.5" fill="#3b82f6" />
          <circle cx="60" cy="38" r="3.5" fill="#ec4899" />
          <circle cx="70" cy="51" r="3.5" fill="#eab308" />
          <path
            d="M100,46 L135,46"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeDasharray="4 2"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M130,41 L138,46 L130,51"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <rect
            x="150"
            y="30"
            width="52"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeDasharray="2 2"
            className="text-stone-800 dark:text-stone-100"
          />
          <text
            x="160"
            y="50"
            className="font-mono text-[12px] font-bold fill-blue-600 dark:fill-sky-400"
          >
            0kb JS
          </text>
          <text
            x="95"
            y="81"
            className="font-['Architects_Daughter'] text-[13px] font-bold fill-purple-600 dark:fill-purple-400"
          >
            compiled @ build 🎨
          </text>
        </svg>
      );
    case 3:
    default:
      return (
        <svg viewBox="0 0 240 95" className="w-full h-auto select-none pointer-events-none">
          <rect
            x="25"
            y="34"
            width="26"
            height="18"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M25,36 L38,44 L51,36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-stone-800 dark:text-stone-100"
          />
          <rect
            x="62"
            y="34"
            width="26"
            height="18"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <path
            d="M62,36 L75,44 L88,36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-stone-800 dark:text-stone-100"
          />
          <path d="M96,43 L120,43" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" className="dark:stroke-emerald-400" />
          <path d="M115,38 L122,43 L115,48" fill="none" stroke="#10b981" strokeWidth="2.4" className="dark:stroke-emerald-400" />
          <circle
            cx="152"
            cy="43"
            r="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-stone-800 dark:text-stone-100"
          />
          <circle cx="152" cy="43" r="4.5" fill="currentColor" className="text-stone-800 dark:text-stone-100" />
          <path
            d="M152,26 L152,30 M152,56 L152,60 M135,43 L139,43 M165,43 L169,43"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-stone-800 dark:text-stone-100"
          />
          <text
            x="96"
            y="81"
            className="font-['Architects_Daughter'] text-[13px] font-bold fill-emerald-600 dark:fill-emerald-400"
          >
            async queue worker ⚙️
          </text>
        </svg>
      );
  }
}

/**
 * Left Page Content (Photo + Date + Handwritten Doodles)
 */
function LeftPageContent({ post, index }) {
  if (!post) return null;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full h-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative select-none bg-transparent">
      {/* Red Margin Line */}
      <div className="absolute top-0 bottom-0 left-9 sm:left-12 w-[2px] bg-rose-500/50 dark:bg-rose-500/60 pointer-events-none z-10" />

      {/* Header Row: Date & Read Time */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-300 pb-2 border-b border-stone-300/80 dark:border-stone-700/80 pl-8">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
          <span>{cleanReadTime(post.readTime)}</span>
        </span>
      </div>

      {/* Center: Framed Photograph */}
      <div className="my-auto py-1 pl-8 flex flex-col gap-2">
        <div className="relative p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-md">
          {/* Frosted Drafting Tape Motifs */}
          <div className="absolute -top-2 left-4 w-11 h-4 bg-amber-200/85 dark:bg-white/20 dark:backdrop-blur-sm rotate-[-5deg] border border-amber-300/70 dark:border-white/30 shadow-sm pointer-events-none z-10" />
          <div className="absolute -top-2 right-4 w-11 h-4 bg-amber-200/85 dark:bg-white/20 dark:backdrop-blur-sm rotate-[5deg] border border-amber-300/70 dark:border-white/30 shadow-sm pointer-events-none z-10" />

          {/* Photo */}
          <div className="relative w-full h-36 sm:h-40 lg:h-44 overflow-hidden bg-stone-200 dark:bg-stone-950 border border-stone-300 dark:border-stone-800">
            <img
              src={post.coverImage?.url || post.coverImage || "/work-8.png"}
              alt={post.title}
              className="w-full h-full object-cover filter contrast-[1.03]"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/85 dark:bg-stone-900/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10">
              {post.category}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-['Architects_Daughter'] text-stone-600 dark:text-stone-300">
            <span>Fig 0{index + 1}. Live Production Capture</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Verified ✅</span>
          </div>
        </div>

        {/* Hand-Drawn Sketch / Doodle Below Photo */}
        <div className="pt-1">
          <TopicDoodle index={index} />
        </div>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-300/80 dark:border-stone-700/80 text-xs font-mono text-stone-600 dark:text-stone-400 pl-8">
        <span className="font-['Architects_Daughter'] text-blue-600 dark:text-sky-400 text-[11px]">
          // handwritten notes: verified
        </span>
        <span className="font-bold text-stone-800 dark:text-stone-200">
          PAGE 0{index * 2 + 1}
        </span>
      </div>
    </div>
  );
}

/**
 * Right Page Content (Heading + Description + Link)
 */
function RightPageContent({ post, index, isTurningRef, hasDraggedRef }) {
  if (!post) return null;
  const targetUrl = post.url || `/blog/${post.slug?.current}`;
  const isExternal = !!post.url;

  return (
    <div className="w-full h-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative select-none pr-8 bg-transparent">
      {/* Margin Line on Right */}
      <div className="absolute top-0 bottom-0 right-9 sm:right-12 w-[2px] bg-rose-500/50 dark:bg-rose-500/60 pointer-events-none z-10" />

      {/* Header Row: Chapter & Platform */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-300 pb-2 border-b border-stone-300/80 dark:border-stone-700/80">
        <span className="font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">
          ENTRY // 0{index + 1}
        </span>
        <span className="px-2.5 py-0.5 rounded bg-stone-200/90 dark:bg-stone-800/90 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-[11px] font-bold">
          {post.platform || "Medium"}
        </span>
      </div>

      {/* Main Narrative */}
      <div className="my-auto py-2 flex flex-col gap-2.5">
        <span className="font-['Architects_Daughter'] text-xs font-bold text-amber-600 dark:text-amber-400">
          ★ Architectural Teardown
        </span>

        <h3 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 dark:text-white leading-[1.12]">
          {post.title}
        </h3>

        {/* Hand-drawn scribble underline */}
        <svg viewBox="0 0 200 8" className="w-44 h-2 text-blue-500 dark:text-sky-400 opacity-80 -mt-1 pointer-events-none">
          <path d="M2,4 Q50,7 100,4 T198,5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-normal leading-relaxed">
          {post.excerpt || post.subtitle}
        </p>

        {/* Handwritten Bullet Points */}
        <div className="flex flex-col gap-1.5 pt-1 font-['Architects_Daughter'] text-xs text-stone-700 dark:text-stone-200">
          <span className="flex items-center gap-1.5">
            <span className="text-blue-500 dark:text-sky-400 font-bold">→</span> Measured on production traffic
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span> Sub-millisecond latency target met
          </span>
        </div>

        {/* Tech Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-mono text-stone-800 dark:text-stone-200 bg-stone-200/80 dark:bg-stone-800/90 border border-stone-300 dark:border-stone-700 pointer-events-none"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Row: Action Link & Page Number */}
      <div className="pt-2.5 border-t border-stone-300/80 dark:border-stone-700/80 flex items-center justify-between gap-4">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            if (isTurningRef?.current) {
              e.preventDefault();
              return;
            }
            if (targetUrl) {
              window.open(targetUrl, "_blank", "noopener,noreferrer");
            }
          }}
          className="relative z-30 inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold tracking-wider uppercase bg-stone-900 text-white dark:bg-white dark:text-stone-950 hover:bg-blue-600 dark:hover:bg-sky-400 dark:hover:text-black transition-colors shadow-sm select-none cursor-pointer"
        >
          <span>Read Full Article</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <span className="font-mono text-xs font-bold text-stone-800 dark:text-stone-200 pointer-events-none">
          PAGE 0{index * 2 + 2}
        </span>
      </div>
    </div>
  );
}

/**
 * Authentic Navy Blue Leather Field Diary Cover
 */
function TechDiaryCover({ onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer select-none transition-transform duration-500 hover:scale-[1.015]"
      style={{ perspective: "1800px" }}
    >
      <div
        className="relative w-full max-w-[430px] sm:max-w-[470px] rounded-3xl overflow-hidden shadow-[0_35px_80px_-15px_rgba(0,0,0,0.9),0_15px_35px_rgba(0,0,0,0.6)] border-2 border-stone-800/70 dark:border-stone-700/60"
        style={{
          transform: "rotateY(-4deg) rotateX(2deg)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Silk Bookmark Ribbon on Cover */}
        <div
          className="absolute -top-3 left-10 sm:left-12 w-5 sm:w-6 h-16 sm:h-20 bg-red-600 dark:bg-rose-600 shadow-xl z-30 pointer-events-none"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
          }}
        />

        <img
          src="/blog-cover.jpg"
          alt="Deep Moitra - Architectural Field Logs"
          className="w-full h-auto object-cover select-none pointer-events-none"
        />

        {/* Ambient warm glow sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Click to open badge pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-black/90 dark:bg-stone-950/95 backdrop-blur-md border border-amber-500/60 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase shadow-2xl flex items-center gap-2.5 group-hover:border-amber-400 group-hover:text-white group-hover:scale-105 transition-all">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>CLICK TO OPEN JOURNAL</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>
    </div>
  );
}

export default function BlogNotebook({ posts = blogPosts, showHeader = true }) {
  // Spreads: 0 = Spread 1 (Entry 01), 1 = Spread 2 (Entry 02), 2 = Spread 3 (Entry 03), 3 = Spread 4 (Entry 04)
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  const spreadIndexRef = useRef(0);
  spreadIndexRef.current = spreadIndex;

  const isClosedRef = useRef(false);
  isClosedRef.current = isClosed;

  const totalLeaves = posts.length - 1; // 3 leaves between 4 spreads
  const totalSpreads = posts.length; // 4 spreads

  const sectionRef = useRef(null);
  const lookbookRef = useRef(null);
  const blockRef = useRef(null);
  const leavesRef = useRef([]);

  const isTurningRef = useRef(false);

  // Dragging interaction state
  const isHoldingRef = useRef(false);
  const dragDirectionRef = useRef(null); // 'next' or 'prev'
  const activeDragLeafRef = useRef(null);
  const dragProgressRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Initialize and update leaf 3D rotations and z-indexes cleanly
  const updateLeavesZAndState = useCallback((activeIdx) => {
    leavesRef.current.forEach((leafEl, i) => {
      if (!leafEl) return;
      const isTurned = i < activeIdx;
      gsap.killTweensOf(leafEl);
      gsap.set(leafEl, {
        rotateY: isTurned ? -180 : 0,
        rotateZ: 0,
        z: 0,
        zIndex: isTurned ? i + 1 : totalLeaves - i,
      });
      const shadowFront = leafEl.querySelector(".page-curl-shadow--front") || leafEl.querySelector(".page-curl-shadow");
      const shadowBack = leafEl.querySelector(".page-curl-shadow--back");
      if (shadowFront) shadowFront.style.opacity = "0";
      if (shadowBack) shadowBack.style.opacity = "0";
    });
  }, [totalLeaves]);

  useEffect(() => {
    if (!isClosed) {
      updateLeavesZAndState(spreadIndexRef.current);
    }
  }, [isClosed, updateLeavesZAndState]);

  // Turn page forward or backward with buttery-smooth 3D lift and soft landing
  const turnToSpread = useCallback((targetIndex) => {
    if (isTurningRef.current) return;
    const current = spreadIndexRef.current;
    if (targetIndex === current) return;
    if (targetIndex < 0 || targetIndex >= totalSpreads) return;

    if (isClosedRef.current) {
      setIsClosed(false);
    }

    isTurningRef.current = true;
    const isNext = targetIndex > current;

    // Which leaf is turning?
    // Forward: leaf at `current` turns from 0 to -180
    // Backward: leaf at `targetIndex` turns from -180 to 0
    const leafIndex = isNext ? current : targetIndex;
    const leafEl = leavesRef.current[leafIndex];

    if (!leafEl) {
      setSpreadIndex(targetIndex);
      updateLeavesZAndState(targetIndex);
      isTurningRef.current = false;
      return;
    }

    // Raise turning leaf above both stacks
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

        // Subtle stage tilt
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
    if (isClosedRef.current) {
      setIsClosed(false);
      return;
    }
    if (spreadIndexRef.current < totalSpreads - 1) {
      turnToSpread(spreadIndexRef.current + 1);
    }
  }, [totalSpreads, turnToSpread]);

  const turnPrev = useCallback(() => {
    if (spreadIndexRef.current > 0) {
      turnToSpread(spreadIndexRef.current - 1);
    } else if (spreadIndexRef.current === 0 && !isClosedRef.current) {
      setIsClosed(true);
    }
  }, [turnToSpread]);

  const openJournal = useCallback(() => {
    setIsClosed(false);
  }, []);

  const closeJournal = useCallback(() => {
    setIsClosed(true);
  }, []);

  // REAL-TIME MOUSE DRAG & PAGE TURNING PHYSICS
  // "The page should move with my mouse, lift and softly fall onto the next side!"
  useEffect(() => {
    const el = lookbookRef.current;
    if (!el || isClosed) return;

    const handlePointerDown = (e) => {
      // Don't intercept clicks on interactive links, inputs, or buttons
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
        // Dragging/clicking right page (e.g. Page 2, Page 4) to turn forward
        direction = "next";
        leaf = leavesRef.current[current];
      } else if (!isRightSide && current > 0) {
        // Dragging/clicking left page (e.g. Page 3) to turn backward
        direction = "prev";
        leaf = leavesRef.current[current - 1];
      }

      if (!direction || !leaf) return;

      // Prevent native browser text selection & image dragging ghost
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

      // Bring active leaf to top
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
        // Dragging right page towards the left: dx is negative
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

        // Subtle stage tilt
        const tiltLift = Math.sin(Math.PI * progress);
        gsap.set(blockRef.current, {
          rotateY: -tiltLift * 2,
          x: -tiltLift * 4,
        });
      } else if (direction === "prev") {
        // Dragging left page towards the right: dx is positive
        const progress = Math.max(0, Math.min(1, dx / dragDist));
        dragProgressRef.current = progress;

        // Angle goes from -180 (flat left) towards 0 (flat right)
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

        // Subtle stage tilt
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
      const velocity = dx / dt; // px per ms

      const shadowFront = leaf.querySelector(".page-curl-shadow--front") || leaf.querySelector(".page-curl-shadow");
      const shadowBack = leaf.querySelector(".page-curl-shadow--back");

      // CASE 1: USER JUST CLICKED (no dragging) -> PERFORM CLEAN PRECISE TURN!
      if (!hasDraggedRef.current) {
        activeDragLeafRef.current = null;
        if (direction === "next") {
          turnNext();
        } else if (direction === "prev") {
          turnPrev();
        }
        return;
      }

      // CASE 2: USER DRAGGED -> SOFTLY FALL ONTO NEXT SIDE OR SOFTLY SPRING BACK!
      isTurningRef.current = true;

      // Commit condition: dragged past 35% or flicked
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
          ease: "power2.out", // Softly falls onto the next side!
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
          ease: "power2.out", // Softly falls onto the right side!
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
  }, [isClosed, totalSpreads, turnNext, turnPrev, updateLeavesZAndState]);

  // Trackpad horizontal swipe
  // USER REQUIREMENT:
  // "left scroll should turn right side page" -> user swiping fingers left outputs e.deltaX > 0 -> turnNext()!
  // "right scroll should turn left side page" -> user swiping fingers right outputs e.deltaX < 0 -> turnPrev()!
  const deltaXAccumRef = useRef(0);
  const swipeTimeoutRef = useRef(null);

  useEffect(() => {
    const el = lookbookRef.current;
    if (!el || isClosed) return;

    const handleWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Never hijack vertical scrolling; allow normal page scroll
      if (absY > absX * 0.8 || absX < 4) {
        deltaXAccumRef.current = 0;
        return;
      }

      // Intercept horizontal scroll gesture
      e.preventDefault();
      deltaXAccumRef.current += e.deltaX;

      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
      swipeTimeoutRef.current = setTimeout(() => {
        deltaXAccumRef.current = 0;
      }, 160);

      // Left scroll -> turn right side page (Next)
      if (deltaXAccumRef.current >= 18) {
        deltaXAccumRef.current = 0;
        turnNext();
      }
      // Right scroll -> turn left side page (Prev)
      else if (deltaXAccumRef.current <= -18) {
        deltaXAccumRef.current = 0;
        turnPrev();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      if (swipeTimeoutRef.current) clearTimeout(swipeTimeoutRef.current);
    };
  }, [turnNext, turnPrev, isClosed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        turnNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        turnPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnNext, turnPrev]);

  // Simple click to turn if user clicked without dragging
  const handleStageClick = (e) => {
    if (e.target.closest("button, a, input")) return;
    if (hasDraggedRef.current || isHoldingRef.current || isTurningRef.current) return;
    if (isClosed) {
      setIsClosed(false);
      return;
    }
    if (!blockRef.current) return;
    const rect = blockRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      turnPrev();
    } else {
      turnNext();
    }
  };

  return (
    <div ref={sectionRef} className="w-full flex flex-col items-center gap-8 select-none">
      {/* 3D Hardware Accelerated Book CSS */}
      <style jsx global>{`
        .book-stage {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 2800px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          touch-action: pan-y;
          user-select: none;
          cursor: grab;
          width: 100%;
        }
        .book-stage:active {
          cursor: grabbing;
        }
        .book-block {
          position: relative;
          width: 100%;
          max-width: 1220px;
          height: clamp(620px, 76vh, 730px);
          transform-style: preserve-3d;
          user-select: none;
        }
        /* Bound Spine Crease: Zero Gap Overlay */
        .book-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 72px;
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
          -webkit-backface-visibility: hidden;
          border-radius: 0 12px 12px 0;
          overflow: hidden;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.38);
        }
        .book-leaf__face--back {
          transform: rotateY(180deg);
          border-radius: 12px 0 0 12px;
        }
        .page-curl-shadow {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.05s ease;
          z-index: 20;
        }
        .page-curl-shadow--front {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.42) 0%,
            rgba(0, 0, 0, 0.12) 30%,
            transparent 70%
          );
        }
        .page-curl-shadow--back {
          background: linear-gradient(
            -90deg,
            rgba(0, 0, 0, 0.42) 0%,
            rgba(0, 0, 0, 0.12) 30%,
            transparent 70%
          );
        }
      `}</style>

      {/* Section Header */}
      {showHeader && (
        <div className="w-full max-w-[1220px] flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary border border-border text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>3D INTERACTIVE JOURNAL • ARCHITECTURAL LOGS</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Field Notes & Architecture Logs.
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              Authentic bound engineering journal with real-time mouse drag physics. Click & drag a page across, swipe on trackpad, or use arrow keys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Open / Close Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (isClosed) {
                  openJournal();
                } else {
                  closeJournal();
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono border border-border bg-bg-secondary hover:bg-bg-primary text-text-muted hover:text-text-primary transition-colors uppercase tracking-wider shadow-sm"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>{isClosed ? "Open Journal" : "Close Journal"}</span>
            </button>

            <span className="text-xs font-mono text-text-muted">
              {isClosed ? (
                "Hardcover Closed"
              ) : (
                <>
                  Spread <strong className="text-text-primary">0{spreadIndex + 1}</strong> of 0{totalSpreads}
                </>
              )}
            </span>
          </div>
        </div>
      )}

      {/* TOP BOOKMARK TABS */}
      <div
        className={`w-full max-w-[1220px] flex items-end justify-start gap-2 pl-4 sm:pl-8 overflow-x-auto no-scrollbar pt-2 transition-opacity duration-300 ${
          !isClosed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {posts.map((post, idx) => {
          const isActive = idx === spreadIndex;
          return (
            <button
              type="button"
              key={post._id}
              onClick={() => turnToSpread(idx)}
              className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 border-t border-x rounded-t-lg select-none shrink-0 ${
                isActive
                  ? "bg-[#fbf9f4] dark:bg-[#14161f] text-blue-600 dark:text-sky-400 font-bold border-stone-300 dark:border-stone-700 shadow-[0_-4px_10px_rgba(0,0,0,0.06)] -mb-[1px] z-20 pb-2.5"
                  : "bg-stone-200 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-800 hover:text-text-primary hover:bg-stone-100 dark:hover:bg-stone-800 z-10"
              }`}
            >
              <span className="opacity-60 mr-1.5 font-['Architects_Daughter']">0{idx + 1}.</span>
              <span>{post.category || post.title.slice(0, 14)}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3D BOOK STAGE: PURE GPU ACCELERATED MULTI-LEAF ARCHITECTURE               */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-center relative py-4">
        {isClosed ? (
          /* REALISTIC HIGH-TECH ENGINEERING DIARY COVER */
          <TechDiaryCover onOpen={openJournal} />
        ) : (
          /* OPENED 2-PAGE SPREAD */
          <div
            ref={lookbookRef}
            className="book-stage"
            onClick={handleStageClick}
            aria-label="Interactive 3D Page-Turn Journal"
          >
            {/* LOOKBOOK BLOCK (Holds the 50/50 Pages) */}
            <div
              ref={blockRef}
              className="book-block rounded-2xl border-2 border-stone-400/40 dark:border-stone-800 overflow-hidden relative shadow-[0_35px_80px_-15px_rgba(0,0,0,0.75),0_10px_25px_-5px_rgba(0,0,0,0.5)]"
            >
              {/* Spine Gutter Crease: Zero Gap Overlay */}
              <div className="book-spine" />

              {/* Silk Bookmark Ribbon on Spine */}
              <div
                className="absolute -top-3 w-4 h-16 bg-red-600 dark:bg-rose-700 rounded-b shadow-xl z-52 pointer-events-none"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
                }}
              />

              {/* =================================================================== */}
              {/* BASE STATIC LEFT PAGE: Underside of Left Stack (Spread 1 Left)      */}
              {/* =================================================================== */}
              <div className="book-page book-page--base book-page--base-left">
                <LeftPageContent post={posts[0]} index={0} />
              </div>

              {/* =================================================================== */}
              {/* BASE STATIC RIGHT PAGE: Underside of Right Stack (Spread 4 Right)   */}
              {/* =================================================================== */}
              <div className="book-page book-page--base book-page--base-right">
                <RightPageContent
                  post={posts[3]}
                  index={3}
                  isTurningRef={isTurningRef}
                  hasDraggedRef={hasDraggedRef}
                />
              </div>

              {/* =================================================================== */}
              {/* PHYSICAL LEAF 0: Turns from Spread 1 to Spread 2                    */}
              {/* Front = Spread 1 Right (Post 0) | Back = Spread 2 Left (Post 1)     */}
              {/* =================================================================== */}
              <article
                ref={(el) => (leavesRef.current[0] = el)}
                className="book-leaf"
                style={{ zIndex: 3 }}
              >
                <div
                  className="book-leaf__face book-leaf__face--front"
                  style={{
                    boxShadow: "inset 4px 0 8px -2px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="page-curl-shadow page-curl-shadow--front" />
                  <RightPageContent
                    post={posts[0]}
                    index={0}
                    isTurningRef={isTurningRef}
                    hasDraggedRef={hasDraggedRef}
                  />
                </div>
                <div
                  className="book-leaf__face book-leaf__face--back"
                  style={{
                    boxShadow: "inset -4px 0 8px -2px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="page-curl-shadow page-curl-shadow--back" />
                  <LeftPageContent post={posts[1]} index={1} />
                </div>
              </article>

              {/* =================================================================== */}
              {/* PHYSICAL LEAF 1: Turns from Spread 2 to Spread 3                    */}
              {/* Front = Spread 2 Right (Post 1) | Back = Spread 3 Left (Post 2)     */}
              {/* =================================================================== */}
              <article
                ref={(el) => (leavesRef.current[1] = el)}
                className="book-leaf"
                style={{ zIndex: 2 }}
              >
                <div
                  className="book-leaf__face book-leaf__face--front"
                  style={{
                    boxShadow: "inset 4px 0 8px -2px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="page-curl-shadow page-curl-shadow--front" />
                  <RightPageContent
                    post={posts[1]}
                    index={1}
                    isTurningRef={isTurningRef}
                    hasDraggedRef={hasDraggedRef}
                  />
                </div>
                <div
                  className="book-leaf__face book-leaf__face--back"
                  style={{
                    boxShadow: "inset -4px 0 8px -2px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="page-curl-shadow page-curl-shadow--back" />
                  <LeftPageContent post={posts[2]} index={2} />
                </div>
              </article>

              {/* =================================================================== */}
              {/* PHYSICAL LEAF 2: Turns from Spread 3 to Spread 4                    */}
              {/* Front = Spread 3 Right (Post 2) | Back = Spread 4 Left (Post 3)     */}
              {/* =================================================================== */}
              <article
                ref={(el) => (leavesRef.current[2] = el)}
                className="book-leaf"
                style={{ zIndex: 1 }}
              >
                <div
                  className="book-leaf__face book-leaf__face--front"
                  style={{
                    boxShadow: "inset 4px 0 8px -2px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="page-curl-shadow page-curl-shadow--front" />
                  <RightPageContent
                    post={posts[2]}
                    index={2}
                    isTurningRef={isTurningRef}
                    hasDraggedRef={hasDraggedRef}
                  />
                </div>
                <div
                  className="book-leaf__face book-leaf__face--back"
                  style={{
                    boxShadow: "inset -4px 0 8px -2px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="page-curl-shadow page-curl-shadow--back" />
                  <LeftPageContent post={posts[3]} index={3} />
                </div>
              </article>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS & HINT */}
      <div className="w-full max-w-[1220px] flex items-center justify-between pt-2 px-2 text-xs font-mono text-text-muted">
        <button
          type="button"
          onClick={turnPrev}
          disabled={isClosed}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-bg-secondary hover:bg-bg-primary disabled:opacity-30 disabled:pointer-events-none transition-all uppercase tracking-wider select-none shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{spreadIndex === 0 ? "Close Cover" : "Previous Page"}</span>
        </button>

        <div className="flex items-center gap-2 font-['Architects_Daughter'] text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
          <span>{isClosed ? "Click the diary cover or 'Open Journal' to explore 📖" : "Click & drag pages or swipe horizontally on trackpad to turn 📖"}</span>
        </div>

        <button
          type="button"
          onClick={turnNext}
          disabled={!isClosed && spreadIndex >= totalSpreads - 1}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-bg-secondary hover:bg-bg-primary disabled:opacity-30 disabled:pointer-events-none transition-all uppercase tracking-wider select-none shadow-sm cursor-pointer"
        >
          <span>{isClosed ? "Open Journal" : "Next Page"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
