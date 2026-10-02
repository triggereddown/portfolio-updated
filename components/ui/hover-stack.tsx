// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import React, { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ShieldCheck } from "lucide-react";

type CSSVars = CSSProperties & Record<string, string | number | undefined>;

export interface HoverStackCard {
  id?: number | string;
  name?: string;
  role?: string;
  company?: string;
  relationship?: string;
  quote: string;
  tag?: string;
  highlighterClass?: string;
  bg: string;
  accent?: string;
  borderColor?: string;
  boxShadow?: string;
  activeRingColor?: string;
}

interface PreparedHoverStackCard extends HoverStackCard {
  _rotation: number;
  _baseX: number;
  _baseZ: number;
}

export interface HoverStackProps {
  cards?: HoverStackCard[];
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  hoverLift?: number;
  pushDistance?: number;
  spread?: number;
  rotation?: number;
  duration?: number;
  accentColor?: string;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  className?: string;
}

const PRESET_ROTATIONS = [-8, 4, -3, 5, -4, 6, 3, -6, 2, -5];

const DEFAULT_CARDS: HoverStackCard[] = [
  { quote: "A must-have for anyone looking to save time and boost productivity.", tag: "Efficiency", bg: "#E4FF1A", accent: "text-[#1A1A1A]" },
  { quote: "This tech has completely streamlined my daily tasks.", tag: "Workflow", bg: "#DD1155", accent: "text-white" },
  { quote: "Innovative and powerful, yet so easy to use!", tag: "Simplicity", bg: "#FF5714", accent: "text-[#1A1A1A]" },
  { quote: "It made everything smoother. Highly recommend!", tag: "Reliability", bg: "#E980FC", accent: "text-[#1A1A1A]" },
  { quote: "Fast, reliable, and user-friendly. Exactly what I needed.", tag: "Speed", bg: "#67D6A3", accent: "text-[#1A1A1A]" },
  { quote: "I can't imagine my workflow without it now. Simply amazing!", tag: "Impact", bg: "#3454D1", accent: "text-white" },
  { quote: "Performance is a game changer. So much smoother now.", tag: "Performance", bg: "#B98CFF", accent: "text-[#1A1A1A]" },
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Shared card footer: divider + attribution or "explore" pill + index number. */
function CardFooter({ card, index }: { card: HoverStackCard; index: number }) {
  if (card.name) {
    const initials = card.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");

    return (
      <div className="relative z-[2] flex flex-col gap-3.5">
        <div className="h-px w-full bg-current/15" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/15 text-current font-mono text-xs font-bold border border-current/20 shadow-sm">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-current leading-tight truncate">
                {card.name}
              </p>
              <p className="text-[10px] opacity-75 font-mono leading-tight truncate mt-0.5">
                {card.role} {card.company ? `• ${card.company}` : ""}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono uppercase tabular-nums tracking-[0.16em] opacity-60 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-[2] flex flex-col gap-4">
      <div className="h-px w-full bg-current/15" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
            <ArrowUpRight className="size-[15px]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            Explore
          </span>
        </div>
        <span className="text-[11px] font-medium uppercase tabular-nums tracking-[0.16em] opacity-55">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function HoverStack({
  cards = DEFAULT_CARDS,
  cardWidth = 280,
  cardHeight = 360,
  overlap = 96,
  hoverLift = 30,
  pushDistance = 235,
  spread = 24,
  rotation = 7,
  duration = 0.5,
  accentColor = "transparent",
  autoAdvance = false,
  autoAdvanceInterval = 4000,
  className = "",
}: HoverStackProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );

  useEffect(() => {
    setHasMounted(true);
    const checkResponsive = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isNarrow = window.innerWidth < 768;
      setIsTouch(isCoarse || isNarrow);
    };
    checkResponsive();
    window.addEventListener("resize", checkResponsive);
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener?.("change", checkResponsive);
    return () => {
      window.removeEventListener("resize", checkResponsive);
      mq.removeEventListener?.("change", checkResponsive);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
      if (event.matches) setActiveIndex(null);
    };

    setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const preparedCards: PreparedHoverStackCard[] = useMemo(() => {
    const rotationScale = rotation / 7;

    return cards.map((card, index) => {
      const presetRotation =
        PRESET_ROTATIONS[index % PRESET_ROTATIONS.length] +
        (index % 2 === 0 ? 0 : 1);

      const baseX = index * overlap;

      return {
        ...card,
        _rotation: presetRotation * rotationScale,
        _baseX: baseX,
        _baseZ: index + 1,
      };
    });
  }, [cards, overlap, rotation]);

  // Gentle automatic cycle when enabled and not currently hovered
  useEffect(() => {
    if (!autoAdvance || isHovered || isTouch || reduceMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % preparedCards.length;
      });
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [autoAdvance, autoAdvanceInterval, isHovered, isTouch, reduceMotion, preparedCards.length]);

  const getCardStyle = (card: PreparedHoverStackCard, index: number): CSSVars => {
    const isActive = activeIndex === index;
    const hasActive = activeIndex !== null;

    let x = card._baseX;
    let y = 0;
    let rotate = card._rotation;
    let zIndex = card._baseZ;
    let scale = 1;

    let boxShadow = card.boxShadow || "0 10px 28px -6px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04)";

    if (reduceMotion) {
      if (isActive) zIndex = 999;

      return {
        "--card-width": `${cardWidth}px`,
        "--card-height": `${cardHeight}px`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1)`,
        zIndex,
        transition: "none",
        background: card.bg,
        borderColor: card.borderColor,
        boxShadow,
      };
    }

    if (hasActive) {
      if (index < activeIndex) {
        x -= pushDistance;
        y -= spread * 0.4;
      } else if (index > activeIndex) {
        x += pushDistance;
        y += spread * 0.4;
      }

      if (isActive) {
        x = card._baseX;
        y = -hoverLift;
        rotate = 0;
        zIndex = 999;
        scale = 1.035;
        const ring = card.activeRingColor || accentColor || "rgba(0,0,0,0.15)";
        boxShadow = `0 0 0 2px ${ring}, 0 26px 52px -12px rgba(0,0,0,0.3)`;
      }
    }

    const activeMs = Math.max(0, duration) * 1000;
    const transition = isActive
      ? `transform ${activeMs}ms cubic-bezier(0.22, 1.6, 0.32, 1), box-shadow ${activeMs * (900 / 700)}ms cubic-bezier(0.22, 1.6, 0.32, 1)`
      : hasActive
        ? `transform ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : `transform ${activeMs * (480 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${activeMs * (380 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    return {
      "--card-width": `${cardWidth}px`,
      "--card-height": `${cardHeight}px`,
      transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      transition,
      background: card.bg,
      borderColor: card.borderColor,
      boxShadow,
    };
  };

  const totalWidth =
    preparedCards.length > 0
      ? preparedCards.at(-1)!._baseX + cardWidth
      : cardWidth;

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className={`relative w-full px-4 sm:px-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveIndex(null);
      }}
    >
      {isTouch ? (
        <div className="flex flex-col gap-5 max-w-lg mx-auto w-full">
          {cards.map((card, index) => (
            <div
              key={card.id ?? index}
              className={`relative flex min-h-[250px] sm:min-h-[300px] w-full cursor-default select-none flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border p-5 sm:p-7 shadow-lg transition-all ${card.accent || ""}`}
              style={{
                background: card.bg,
                borderColor: card.borderColor,
                boxShadow: card.boxShadow,
              }}
            >
              <div className="relative z-[2] flex items-center justify-between gap-2">
                {card.tag ? (
                  <span className="relative inline-block px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider font-bold text-current select-none">
                    <span
                      className={`absolute inset-x-0 bottom-0.5 top-1 -z-0 rounded-[1px] -rotate-0.5 skew-x-2 opacity-85 mix-blend-multiply dark:mix-blend-screen transition-opacity ${
                        card.highlighterClass || "bg-[#fef08a] dark:bg-yellow-400/25"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10">{card.tag}</span>
                  </span>
                ) : <div />}
                {card.relationship && (
                  <span className="text-[10px] font-mono opacity-70 flex items-center gap-1">
                    <ShieldCheck className="size-3 text-current" />
                    {card.relationship}
                  </span>
                )}
              </div>

              <div className="relative z-[2] my-3.5 flex flex-1 items-center">
                <p className="m-0 max-w-full text-lg sm:text-2xl font-cormorant italic font-medium leading-[1.2] tracking-[-0.01em]">
                  “{card.quote}”
                </p>
              </div>

              <CardFooter card={card} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="relative mx-auto"
          style={{
            "--stack-width": `${totalWidth}px`,
            "--stack-height": `${cardHeight + (reduceMotion ? 0 : hoverLift) + 24}px`,
            width: "var(--stack-width)",
            height: "var(--stack-height)",
          } as CSSVars}
        >
          {preparedCards.map((card, index) => (
            <div
              key={card.id ?? index}
              className={`absolute left-0 top-0 flex h-[var(--card-height)] w-[var(--card-width)] origin-[center_center] cursor-pointer select-none flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-7 will-change-transform ${card.accent || ""}`}
              style={getCardStyle(card, index)}
              onMouseEnter={() => {
                setIsHovered(true);
                setActiveIndex(index);
              }}
              onMouseLeave={() => {
                setActiveIndex(null);
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative z-[2] flex items-center justify-between gap-2">
                {card.tag ? (
                  <span className="relative inline-block px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider font-bold text-current select-none">
                    <span
                      className={`absolute inset-x-0 bottom-0.5 top-1 -z-0 rounded-[1px] -rotate-0.5 skew-x-2 opacity-85 mix-blend-multiply dark:mix-blend-screen transition-opacity ${
                        card.highlighterClass || "bg-[#fef08a] dark:bg-yellow-400/25"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10">{card.tag}</span>
                  </span>
                ) : <div />}
                {card.relationship && (
                  <span className="text-[10px] font-mono opacity-70 flex items-center gap-1">
                    <ShieldCheck className="size-3 text-current" />
                    {card.relationship}
                  </span>
                )}
              </div>

              <div className="relative z-[2] my-3 flex flex-1 items-center">
                <p className="m-0 max-w-[96%] text-[1.45rem] font-cormorant italic font-medium leading-[1.12] tracking-[-0.01em]">
                  “{card.quote}”
                </p>
              </div>

              <CardFooter card={card} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HoverStack;
