"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { caseStudies } from "@/lib/mockData";

export default function CaseStudiesPage() {
  return (
    <div className="w-full pt-32 pb-24 max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
      
      {/* Intro Header */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <ScrollReveal>
          <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">Architecture Teardowns</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Distributed Systems & <span className="text-primary italic font-serif">Structures.</span>
          </h1>
        </ScrollReveal>
      </div>

      {/* Case studies list */}
      <div className="flex flex-col gap-12 mt-6">
        {caseStudies.map((cs, idx) => (
          <ScrollReveal key={cs._id} delay={idx * 0.1}>
            <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-bg-secondary border border-border rounded-lg overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-500">
              
              {/* Cover Column */}
              <div className="lg:col-span-5 relative min-h-[250px] lg:min-h-full overflow-hidden bg-bg-primary">
                <img
                  src={cs.coverImage.url}
                  alt={cs.coverImage.alt}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-102 transition-all duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent opacity-80" />
              </div>

              {/* Content Column */}
              <div className="lg:col-span-7 p-8 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                    {cs.category}
                  </span>
                  <span className="text-xs text-text-secondary font-mono">{cs.year}</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                  {cs.title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {cs.tagline}
                </p>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-4 border-t border-border-subtle pt-4 my-2">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex flex-col gap-1">
                      <span className="text-lg font-display font-bold text-tertiary">
                        {m.value}
                      </span>
                      <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle">
                  <Link
                    href={`/case-studies/${cs.slug.current}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:text-text-primary transition-colors"
                  >
                    <span>Read System Teardown</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-4 text-xs text-text-muted select-none">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {cs.duration}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}
