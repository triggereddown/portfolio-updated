"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Database, Layers } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import { caseStudies } from "@/lib/mockData";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative w-full py-28 overflow-hidden border-t border-border bg-bg-primary">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Architectural Teardowns
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
              Deep dives into database indexing, distributed memory caches, and scalable web topology.
            </p>
          </ScrollReveal>
        </div>

        {/* Deep Dive Feature Showcase */}
        <div className="flex flex-col gap-12">
          {caseStudies.map((cs, idx) => (
            <ScrollReveal key={cs._id} delay={idx * 0.1}>
              <div className="group rounded-xl bg-bg-secondary/60 border border-border hover:border-text-muted/40 overflow-hidden transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Column: Visual Asset & Topology (5 cols) */}
                  <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-bg-primary overflow-hidden flex flex-col justify-end p-8 border-b lg:border-b-0 lg:border-r border-border">
                    <img
                      src={cs.coverImage.url}
                      alt={cs.coverImage.alt}
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent" />
                    
                    {/* Architectural Note Overlay */}
                    <div className="relative z-10 p-4 rounded-lg bg-bg-secondary/90 backdrop-blur-md border border-border">
                      <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold mb-1">
                        <Database className="w-3.5 h-3.5" />
                        <span>Cache Invalidation Topology</span>
                      </div>
                      <p className="text-[11px] font-mono text-text-muted leading-relaxed line-clamp-3">
                        {cs.architectureDescription}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Case Analysis & Metrics (7 cols) */}
                  <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between gap-8">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-text-muted mb-3">
                        <span className="text-primary font-semibold">{cs.category}</span>
                        <span>/</span>
                        <span>{cs.year}</span>
                        <span>/</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {cs.duration}
                        </span>
                      </div>

                      <h3 className="font-sans text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                        {cs.title}
                      </h3>

                      <p className="mt-4 text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                        {cs.problem}
                      </p>

                      <div className="mt-4 p-4 rounded-lg bg-bg-primary/50 border border-border-subtle">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold mb-1">
                          Architectural Solution
                        </h4>
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                          {cs.solution}
                        </p>
                      </div>
                    </div>

                    {/* Measured Outcomes */}
                    <div>
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-border-subtle">
                        {cs.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                              {m.value}
                            </span>
                            <span className="text-[10px] sm:text-xs font-mono text-text-muted uppercase tracking-wider mt-0.5">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                        <span className="text-xs font-mono text-text-muted">
                          Role: {cs.myRole}
                        </span>

                        <Link
                          href={`/case-studies/${cs.slug.current}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-primary border border-border hover:border-text-muted/60 text-xs font-mono text-text-primary hover:text-primary transition-all group/btn"
                        >
                          <span>Full Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
