"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { projects as defaultProjects } from "@/lib/mockData";

export default function ProjectsStackedDeck({
  projects = defaultProjects,
  showHeader = false,
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

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => {
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
              p.status?.toLowerCase().includes("beta"))
          )
            return true;
          return false;
        });

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-border/70">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary border border-border text-xs font-mono text-text-muted mb-4 uppercase tracking-wider">
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400" />
              <span>SELECTED PRODUCTION SYSTEMS • ARCHITECTURAL LEDGER</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Engineering Works & Systems.
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
              Industrial-grade full-stack platforms, distributed backends, and performance-tuned architectures built with zero superfluous decoration.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center border border-border bg-bg-secondary p-1 flex-wrap">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-150 select-none ${
                    isActive
                      ? "bg-text-primary text-text-inverse font-bold"
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

      {/* FILTER TABS (When showHeader is false, show standalone tabs) */}
      {!showHeader && (
        <div className="mb-12 flex justify-start">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-none bg-bg-secondary border border-border flex-wrap shadow-sm">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 select-none ${
                    isActive
                      ? "bg-text-primary text-text-inverse font-bold shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* NATIVE GPU-ACCELERATED STICKY STACK */}
      <div className="relative flex flex-col gap-12 pb-28">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-border bg-bg-secondary/40 font-mono text-xs text-text-muted">
            NO SYSTEMS CATALOGED UNDER FILTER: {activeFilter.toUpperCase()}
          </div>
        ) : (
          filteredProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={project._id}
                className="sticky w-full transition-transform duration-300"
                style={{
                  top: `calc(5rem + ${idx * 0.75}rem)`,
                  zIndex: idx + 1,
                  willChange: "transform",
                }}
              >
                <div
                  className="w-full bg-[#faf9f5] dark:bg-[#0b1120] border border-stone-300 dark:border-slate-800 p-6 sm:p-8 lg:p-10 relative shadow-sm"
                  style={{
                    transform: "translate3d(0, 0, 0)",
                  }}
                >
                  {/* Technical Crosshair Corner Markers */}
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-text-muted/60 select-none">
                    + [SYS:0{idx + 1}]
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] font-mono text-text-muted/60 select-none">
                    + [VER:{project.year || "2025"}]
                  </span>

                  {/* 12-Column Grid: Crisp Alternating Left-Right Rhythm */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-3">
                    {/* MEDIA SURFACE */}
                    <div
                      className={`lg:col-span-7 flex flex-col gap-3 ${
                        isReversed ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-bg-secondary border border-border/80 overflow-hidden group">
                        <img
                          src={project.coverImage?.url || "/work-1.png"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        />

                        {/* Technical Status Chips */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-3 py-1 bg-black/85 text-white text-[10px] font-mono uppercase tracking-wider font-bold border border-white/20">
                            {project.category}
                          </span>
                          {project.status && (
                            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                              ● {project.status}
                            </span>
                          )}
                        </div>

                        {/* Year & Index Header */}
                        <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 dark:bg-slate-900/95 text-text-primary text-[10px] font-mono font-bold border border-border">
                          INDEX // 0{idx + 1}
                        </div>

                        {/* Bottom Context Ledger */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-xs font-mono text-white/90 bg-slate-950/85 px-4 py-2 border-t border-white/10">
                          <span className="truncate">
                            ROLE: {project.myRole || "Lead Developer"}
                          </span>
                          <span className="shrink-0">
                            {project.duration || "Production"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* EDITORIAL SPECIFICATION LEDGER */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-between gap-6 ${
                        isReversed ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        {/* Domain Tag */}
                        <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-border/60">
                          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            System Spec // 0{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-text-muted">
                            {project.year || "2025"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                          {project.title}
                        </h3>

                        {/* Problem / Architecture Synopsis */}
                        <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 font-light leading-relaxed">
                          {project.problem || project.tagline}
                        </p>

                        {project.solution && (
                          <div className="mt-3 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-normal border-l-2 border-blue-500 pl-3 py-0.5">
                            <span>{project.solution}</span>
                          </div>
                        )}
                      </div>

                      {/* Technical Stack Ledger */}
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                          Engineered With
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack?.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono bg-stone-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-stone-300 dark:border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Impact / Metric Highlight */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/60">
                          {project.metrics.slice(0, 2).map((m, mIdx) => (
                            <div key={mIdx} className="flex flex-col">
                              <span className="font-cormorant text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {m.value}
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Interactive Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <Link
                          href={`/projects/${project.slug?.current}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-colors shadow-sm group"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <div className="flex items-center gap-4">
                          {project.githubUrl && project.githubUrl !== "--" && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 border border-border hover:border-text-primary text-text-muted hover:text-text-primary transition-colors"
                              title="Source Code"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
                              title="Live System"
                            >
                              <span>Demo</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
