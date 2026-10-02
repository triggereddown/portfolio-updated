"use client";

import React, { useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import { siteSettings } from "@/lib/mockData";
import { Layers, Zap, Download, ArrowDownToLine, Check } from "lucide-react";

export default function About({ isHeroReveal = false }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e) => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 2800);

    try {
      const a = document.createElement("a");
      a.href = "/Deep Moitra Resume.pdf";
      a.download = "Deep Moitra Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const domains = [
    {
      title: "Frontend Architecture",
      desc: "Component systems built with React 19, Next.js, and TypeScript, engineered for sub-second paint times and WCAG AA accessibility.",
      icon: Layers,
    },
    {
      title: "Backend & Systems",
      desc: "Robust APIs, microservices, and distributed pipelines powered by Node.js, PostgreSQL, Redis caching, and Docker orchestration.",
      icon: Zap,
    },
  ];

  const RevealWrapper = ({ children, delay = 0, className = "" }) => {
    if (isHeroReveal) {
      return <div className={className}>{children}</div>;
    }
    return (
      <ScrollReveal delay={delay} className={className}>
        {children}
      </ScrollReveal>
    );
  };

  return (
    <section
      id="about"
      className={`relative w-full ${
        isHeroReveal
          ? "h-full min-h-[100dvh] pt-16 sm:pt-20 pb-10 flex flex-col justify-center bg-bg-primary"
          : "py-28 border-t border-border bg-bg-secondary/30"
      } overflow-hidden`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 w-full">
        {/* Main Editorial Grid: 2 columns on tablet and desktop */}
        <div
          className={`grid grid-cols-1 ${
            isHeroReveal ? "md:grid-cols-12" : "lg:grid-cols-12"
          } gap-8 lg:gap-14 items-start`}
        >
          {/* Left Column: Narrative (7 cols) */}
          <div
            className={`${
              isHeroReveal ? "md:col-span-7" : "lg:col-span-7"
            } flex flex-col gap-4 sm:gap-5`}
          >
            <RevealWrapper>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
                Engineering systems with deliberate craft.
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={0.1}>
              <div className="space-y-3.5 sm:space-y-4 text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                <p>
                  I am{" "}
                  <span className="text-text-primary font-medium">
                    {siteSettings.name}
                  </span>
                  , a full-stack engineer and digital architect based in Kolkata,
                  India. I operate at the convergence of robust system
                  engineering and tactile user experience.
                </p>
                <p>
                  My philosophy is simple: software should feel effortless to
                  interact with, yet uncompromisingly resilient underneath.
                  Whether profiling database indexes, orchestrating
                  containerized services, or tuning spring physics for
                  micro-interactions, I treat performance as a core feature
                  rather than an afterthought.
                </p>
                <p className="text-xs sm:text-sm lg:text-base text-text-muted">
                  When not writing code, I analyze distributed cloud
                  topologies, study open-source design systems, and explore
                  creative engineering experiments.
                </p>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="pt-1">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Available for high-impact roles</span>
                </div>
                <span>/</span>
                <span>Based in {siteSettings.location}</span>
                <span>/</span>
                <span>UTC+5:30</span>
              </div>
            </RevealWrapper>
          </div>

          {/* Right Column: Architectural Principles + CV Download (5 cols) */}
          <div
            className={`${
              isHeroReveal ? "md:col-span-5" : "lg:col-span-5"
            } flex flex-col gap-3.5`}
          >
            {domains.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <RevealWrapper key={domain.title} delay={0.15 + idx * 0.1}>
                  <div className="p-4 sm:p-5 rounded-lg bg-bg-secondary border border-border hover:border-text-muted/40 transition-all duration-300 group">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 sm:p-2.5 rounded bg-bg-primary text-text-primary border border-border-subtle group-hover:text-primary transition-colors">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-1 font-sans">
                          {domain.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                          {domain.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              );
            })}

            {/* 3rd Item: Download CV / Resume CTA Button (in place of CLS card) */}
            <RevealWrapper delay={0.35} className="relative z-10 pointer-events-auto">
              <a
                href="/Deep Moitra Resume.pdf"
                download="Deep Moitra Resume.pdf"
                onClick={handleDownload}
                title="Download Deep Moitra Resume (PDF)"
                className="group relative overflow-hidden w-full p-4 sm:p-5 rounded-lg bg-text-primary text-text-inverse hover:opacity-95 hover:shadow-xl active:scale-[0.99] transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer border border-border/40"
              >
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base font-sans tracking-tight text-text-inverse">
                      Download CV / Resume
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-text-inverse/20 text-text-inverse">
                      PDF
                    </span>
                  </div>
                  <p className="text-xs opacity-75 font-mono mt-0.5 truncate">
                    Technical Experience & Credentials
                  </p>
                </div>

                <div
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-md font-sans text-xs font-semibold tracking-wide shadow-sm transition-all duration-300 ${
                    downloaded
                      ? "bg-emerald-600 text-white shadow-emerald-500/25 scale-105"
                      : "bg-primary text-white group-hover:bg-primary/90 group-hover:scale-105"
                  }`}
                >
                  <span>{downloaded ? "Downloaded" : "Download"}</span>
                  {downloaded ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5] animate-in zoom-in duration-200" />
                  ) : (
                    <span className="relative flex items-center justify-center w-3.5 h-3.5 overflow-hidden">
                      <ArrowDownToLine className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                    </span>
                  )}
                </div>
              </a>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
