"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "@/components/sections/About";

// Authentic Dark Knight Batman Silhouette Path
// Centered at (193.7, 117.0), Bounding Box: ~387.5 x 234.0
const BAT_PATH =
  "M203.131 41.249l7.518-17.511 6.852 63.786c38.219 14.208 71.322-23.208 45.873-55.194 57.371 5.615 104.544 41.751 104.405 85.055-.099 31.074-24.419 60.188-76.555 75.854 23.408-40.758-19.995-85.585-54.394-13.244-3.788-40.726-39.544-12.99-43.128 32.601-7.013-55.309-40.481-67.382-42.623-34.433-39.303-65.494-75.883-31.829-53.705 16.951-46.813-16.77-77.75-45.373-77.75-77.729 0-36.572 38.626-72.226 96.826-83.666-24.751 33.726 4.464 66.312 48.15 53.586l5.856-64.201 7.339 18.103c8.317-5.927 16.784-4.895 25.336.042z";

export default function Header() {
  const sectionRef = useRef(null);
  const heroUiRef = useRef(null);
  const aboutContainerRef = useRef(null);
  const maskCutoutGRef = useRef(null);
  const strokeGRef = useRef(null);
  const strokeSvgRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // =========================================================================
    // DESKTOP & TABLET ONLY (>= 768px)
    // Batman Aperture Zoom-through Pin Animation untouched for web & tablets
    // =========================================================================
    mm.add("(min-width: 768px)", () => {
      const getCoords = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const cx = Math.max(120, Math.min(240, w * 0.12));
        const cy = h * 0.78;
        const s0 = Math.max(0.32, Math.min(0.42, (w * 0.12) / 388));
        // Calibrated scale to clear all 4 screen corners and text boundaries with zero dead air
        const sMax = Math.max(17.5, Math.ceil(Math.hypot(w - cx, cy) / 82));
        return { cx, cy, s0, sMax };
      };

      let { cx, cy, s0, sMax } = getCoords();

      // Fast direct transform updater
      const setBatTransform = (scaleVal) => {
        const tStr = `translate(${cx}, ${cy}) scale(${scaleVal}) translate(-193.7, -117)`;
        if (maskCutoutGRef.current) {
          maskCutoutGRef.current.setAttribute("transform", tStr);
          maskCutoutGRef.current.style.opacity = "1";
        }
        if (strokeGRef.current) {
          strokeGRef.current.setAttribute("transform", tStr);
          strokeGRef.current.style.opacity = "1";
        }
      };

      // Initialize resting transform
      setBatTransform(s0);

      // Master ScrollTrigger with GSAP native pin and butter-smooth 0.2s micro-scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=950",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.2, // 200ms micro-interpolation: completely smooths wheel clicks and trackpad
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onLeave: () => {
            if (heroUiRef.current) {
              heroUiRef.current.style.display = "none";
              heroUiRef.current.style.pointerEvents = "none";
            }
            if (aboutContainerRef.current) {
              aboutContainerRef.current.style.pointerEvents = "auto";
              aboutContainerRef.current.style.zIndex = "35";
            }
          },
          onEnterBack: () => {
            if (heroUiRef.current) {
              heroUiRef.current.style.display = "none";
              heroUiRef.current.style.pointerEvents = "none";
            }
            if (aboutContainerRef.current) {
              aboutContainerRef.current.style.pointerEvents = "auto";
              aboutContainerRef.current.style.zIndex = "35";
            }
          },
          onLeaveBack: () => {
            if (heroUiRef.current) {
              heroUiRef.current.style.display = "flex";
              heroUiRef.current.style.opacity = "1";
              heroUiRef.current.style.transform = "translate(0px, 0px)";
              heroUiRef.current.style.pointerEvents = "auto";
            }
            if (aboutContainerRef.current) {
              aboutContainerRef.current.style.pointerEvents = "none";
              aboutContainerRef.current.style.zIndex = "0";
            }
            if (strokeSvgRef.current) {
              strokeSvgRef.current.style.opacity = "1";
            }
            setBatTransform(s0);
          },
          onUpdate: (self) => {
            const p = self.progress;

            // When user returns to top, strictly reset heroUi to 100% opacity and resting transform
            if (p <= 0.005) {
              if (heroUiRef.current) {
                heroUiRef.current.style.display = "flex";
                heroUiRef.current.style.opacity = "1";
                heroUiRef.current.style.transform = "translate(0px, 0px)";
                heroUiRef.current.style.pointerEvents = "auto";
              }
              if (strokeSvgRef.current) {
                strokeSvgRef.current.style.opacity = "1";
              }
              if (aboutContainerRef.current) {
                aboutContainerRef.current.style.pointerEvents = "none";
                aboutContainerRef.current.style.zIndex = "0";
              }
              setBatTransform(s0);
            } else {
              // Natural exponential optical zoom: every pixel of scroll creates continuous motion
              const currentScale = s0 * Math.pow(sMax / s0, p);
              setBatTransform(currentScale);
            }

            // Layer management: as soon as Batman cutout engulfs the screen (p > 0.78),
            // hide heroUi completely so its pointer-events-auto children cannot intercept clicks,
            // and elevate About to z-35 with pointer-events: auto so hovers and clicks work immediately
            if (p > 0.78) {
              if (heroUiRef.current) {
                heroUiRef.current.style.display = "none";
                heroUiRef.current.style.pointerEvents = "none";
              }
              if (aboutContainerRef.current) {
                aboutContainerRef.current.style.pointerEvents = "auto";
                aboutContainerRef.current.style.zIndex = "35";
              }
            } else {
              if (heroUiRef.current) {
                heroUiRef.current.style.display = "flex";
                heroUiRef.current.style.pointerEvents = "auto";
              }
              if (aboutContainerRef.current) {
                aboutContainerRef.current.style.pointerEvents = "none";
                aboutContainerRef.current.style.zIndex = "0";
              }
            }
          },
        },
      });

      // 1. Hero text, postcard, bio, and buttons stay 100% visible as the Batman aperture expands over them
      // Only gently dissolves when the Batman cutout has engulfed 85%+ of the screen (0.85 -> 0.98)
      tl.fromTo(
        heroUiRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.13,
          ease: "power1.in",
        },
        0.85
      );

      // 2. Stroke outline remains visible throughout zoom, dissolving only as wings exit screen (0.75 -> 0.95)
      tl.fromTo(
        strokeSvgRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.20,
          ease: "power1.in",
        },
        0.75
      );

      // 3. Keep timeline matched to 1.0 duration for exact 1:1 scrub mapping
      tl.to({}, { duration: 0.05 }, 0.95);

      const handleResize = () => {
        const coords = getCoords();
        cx = coords.cx;
        cy = coords.cy;
        s0 = coords.s0;
        sMax = coords.sMax;
        setBatTransform(s0);
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (heroUiRef.current) {
          heroUiRef.current.style.display = "";
          heroUiRef.current.style.opacity = "";
          heroUiRef.current.style.transform = "";
          heroUiRef.current.style.pointerEvents = "";
        }
        if (aboutContainerRef.current) {
          aboutContainerRef.current.style.pointerEvents = "";
          aboutContainerRef.current.style.zIndex = "";
        }
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:h-[100dvh] md:overflow-hidden bg-[var(--hero-cover-bg)] transition-colors duration-500"
    >
      {/* =================================================================== */}
      {/* HERO LANDING UI                                                    */}
      {/* On mobile: Normal document flow (relative block, min-h-[100dvh])    */}
      {/* On desktop/tablet: Layer 3 (z-20), absolute inset-0, Batman masked  */}
      {/* =================================================================== */}
      <div
        ref={heroUiRef}
        className="hero-ui hero-bat-mask relative md:absolute md:inset-0 w-full min-h-[100dvh] md:min-h-0 text-white z-20 flex flex-col justify-between overflow-hidden pointer-events-auto md:pointer-events-none"
      >
        {/* Subtle radial glow and cosmic grid background */}
        <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none transition-all duration-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_50%,transparent_100%)] pointer-events-none" />

        {/* Hero UI: Headline, Postcard, Bio, Action Buttons */}
        <div className="relative md:absolute md:inset-0 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 md:pt-14 md:pb-0 pointer-events-auto">
          {/* Top ambient status tag from reference */}
          <div className="hero-meta w-full max-w-4xl flex items-center justify-between px-2 sm:px-4 mb-3 sm:mb-5 text-xs text-white/75 font-mono">
            <span className="truncate mr-2">Hello, from the developer&apos;s desk.</span>
            <div className="shrink-0 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[11px]">
              <span>Open To Work</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          <div className="relative inline-block">
            {/* Exact typography matching reference image 3 */}
            <h1 className="text-6xl sm:text-7xl md:text-[110px] lg:text-[140px] font-playfair font-medium leading-[1] md:leading-[0.95] tracking-tight text-white drop-shadow-sm text-center">
              Thoughtful
              <br />
              <span className="italic font-light pr-2 md:pr-4">by</span>
              design
            </h1>
          </div>

          {/* Subtitle Bio */}
          <p className="hero-meta max-w-xl mt-4 sm:mt-6 font-body text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light pointer-events-auto">
            I&apos;m Deep Moitra, a Frontend Developer working at the
            intersection of UI/UX, Scalability, and Web3.
          </p>

          {/* Action Buttons matching reference Image 2 */}
          <div className="hero-meta flex items-center gap-4 mt-6 sm:mt-7 pointer-events-auto">
            <a
              href="#contact"
              className="px-7 py-2.5 rounded-full bg-white text-gray-950 font-body text-sm font-semibold hover:bg-gray-100 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-black/20"
            >
              Contact Me
            </a>
            <a
              href="/Deep Moitra Resume.pdf"
              download
              className="px-7 py-2.5 rounded-full border border-white/30 text-white font-body text-sm font-medium transition-colors hover:bg-white/10"
            >
              My Resume ↓
            </a>
          </div>

          {/* Mobile subtle scroll indicator */}
          <div className="flex md:hidden items-center gap-2 mt-10 text-white/40 font-mono text-[10px] uppercase tracking-widest animate-pulse">
            <span>Scroll to explore</span>
            <span>↓</span>
          </div>
        </div>

        {/* Scroll Cue sitting right below the Batman Logo on Bottom-Left (Desktop & Tablet only) */}
        <div
          className="hero-meta hidden md:flex absolute items-center gap-2.5 font-mono text-[9px] tracking-[0.25em] uppercase text-white/50 pointer-events-auto"
          style={{
            left: "clamp(2rem, 7vw, 6rem)",
            bottom: "calc(22vh - 2.8rem)",
          }}
        >
          <span className="block w-6 h-px bg-white/40 animate-pulse" />
          Scroll to enter
        </div>

        {/* Profile Card in Bottom-Right (Tablet and Desktop) */}
        <div
          className="hero-meta hidden sm:block absolute z-20 pointer-events-auto w-36 sm:w-44 md:w-48 shadow-2xl transition-all duration-300 hover:-translate-y-1"
          style={{
            right: "clamp(2rem, 6vw, 5rem)",
            bottom: "calc(16vh - 2rem)",
          }}
        >
          <div className="p-2 sm:p-2.5 rounded-xl shadow-2xl bg-white text-gray-900 border border-gray-100 dark:bg-[#0c162c] dark:text-white dark:border-blue-400/20 backdrop-blur-md">
            <div className="border border-dashed border-gray-300 dark:border-blue-400/30 p-2.5 sm:p-3 font-body flex flex-col items-center text-center rounded-lg">
              <img
                src="/user-image.webp"
                alt="Deep Moitra"
                width={64}
                height={64}
                decoding="async"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mb-2 object-cover grayscale contrast-110 border border-gray-200 dark:border-blue-400/40"
              />
              <p className="font-bold text-[10px] sm:text-[11px] md:text-xs tracking-wider uppercase text-gray-900 dark:text-white">
                Deep Moitra
              </p>
              <div className="w-8 h-px my-1.5 sm:my-2 bg-gray-300 dark:bg-blue-400/30" />
              <p className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] leading-snug text-gray-600 dark:text-blue-200/85 font-mono tracking-tight text-center">
                EveryOne&apos;s got a Mask
                <br />
                So does my Portfolio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* ABOUT SECTION                                                       */}
      {/* On mobile: Normal document flow directly following Hero             */}
      {/* On desktop/tablet: Layer 1 (z-0), absolute inset-0                  */}
      {/* =================================================================== */}
      <div
        ref={aboutContainerRef}
        className="relative w-full md:absolute md:inset-0 md:w-full md:h-full z-10 md:z-0 flex flex-col justify-center pointer-events-auto md:pointer-events-none bg-[var(--bg-primary)] transition-colors duration-500"
      >
        <About isHeroReveal={true} />
      </div>

      {/* =================================================================== */}
      {/* DESKTOP/TABLET ONLY: Hardware-Accelerated SVG Mask Cover (z-10)     */}
      {/* Pure vector mask with crisp aperture opening                      */}
      {/* =================================================================== */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
        width="100%"
        height="100%"
      >
        <defs>
          <mask
            id="hero-bat-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            {/* White reveals the dark hero cover */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black cuts out a transparent window shaped like Batman */}
            <g
              ref={maskCutoutGRef}
              transform="translate(180, 600) scale(0.36) translate(-193.7, -117)"
              style={{ willChange: "transform", opacity: 0 }}
            >
              <path d={BAT_PATH} fill="black" />
            </g>
          </mask>
        </defs>

        {/* Hero cover sheet with the transparent Batman cutout */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="var(--hero-cover-bg)"
          mask="url(#hero-bat-mask)"
        />
      </svg>

      {/* =================================================================== */}
      {/* DESKTOP/TABLET ONLY: Glowing Neon Bat-Signal Perimeter (z-30)       */}
      {/* Clearly frames the expanding aperture throughout zoom              */}
      {/* =================================================================== */}
      <svg
        ref={strokeSvgRef}
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
      >
        <g
          ref={strokeGRef}
          transform="translate(180, 600) scale(0.36) translate(-193.7, -117)"
          style={{ willChange: "transform", opacity: 0 }}
        >
          {/* Subtle cyan glow */}
          <path
            d={BAT_PATH}
            fill="none"
            stroke="rgba(56,189,248,0.25)"
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Sharp neon cyber border */}
          <path
            d={BAT_PATH}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.6"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </section>
  );
}
