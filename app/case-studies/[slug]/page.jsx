"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, ExternalLink, ShieldCheck, Database, Award } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { caseStudies } from "@/lib/mockData";

export default function CaseStudyDetailsPage() {
  const { slug } = useParams();
  const [cs, setCs] = useState(null);

  useEffect(() => {
    const found = caseStudies.find(c => c.slug.current === slug) || caseStudies[0];
    setCs(found);
  }, [slug]);

  if (!cs) return null;

  return (
    <div className="w-full pt-32 pb-24 max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
      
      {/* Back button */}
      <ScrollReveal>
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Case Studies</span>
        </Link>
      </ScrollReveal>

      {/* Hero Banner */}
      <ScrollReveal delay={0.1} className="relative w-full rounded-xl overflow-hidden bg-bg-secondary border border-border">
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <img
            src={cs.coverImage.url}
            alt={cs.title}
            className="w-full h-full object-cover grayscale pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
              {cs.category}
            </span>
            <span className="text-xs text-text-secondary font-mono">{cs.year}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            {cs.title}
          </h1>

          <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            {cs.tagline}
          </p>
        </div>
      </ScrollReveal>

      {/* Metadata strip */}
      <ScrollReveal delay={0.2} className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 bg-bg-secondary border border-border p-6 rounded-lg select-none">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">My Role</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary">{cs.myRole || "Solutions Architect"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">Duration</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary">{cs.duration}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">Team size</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary">{cs.teamSize ? `${cs.teamSize} Engineers` : "3 Engineers"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">Deployment Status</span>
          <span className="text-xs sm:text-sm font-bold text-primary">{cs.status || "Production Live"}</span>
        </div>
      </ScrollReveal>

      {/* 3 Prominent Metrics Cards */}
      <ScrollReveal delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cs.metrics.map((m, mIdx) => (
          <div key={mIdx} className="bg-bg-secondary border border-border p-6 rounded-lg shadow-card hover:border-primary/30 transition-all duration-300">
            <span className="font-display text-3xl sm:text-4xl font-bold text-tertiary block mb-2">
              {m.value}
            </span>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-primary mb-1">
              {m.label}
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              {m.context}
            </p>
          </div>
        ))}
      </ScrollReveal>

      {/* Two-Column split body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main content (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <ScrollReveal>
            <div className="bg-bg-secondary border border-border p-8 rounded-lg flex flex-col gap-6">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Problem Statement</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
                  {cs.problem}
                </p>
              </div>

              <div className="w-full h-[1px] bg-border-subtle" />

              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Solution Overview</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
                  {cs.solution}
                </p>
              </div>

              <div className="w-full h-[1px] bg-border-subtle" />

              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Technical Impact</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
                  {cs.impact}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Architecture visual canvas */}
          {cs.architectureDescription && (
            <ScrollReveal delay={0.1}>
              <div className="bg-bg-secondary border border-border p-8 rounded-lg flex flex-col gap-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                  Data Flow Diagram
                </h2>
                
                <div className="w-full h-64 bg-bg-primary dot-grid border border-border rounded flex items-center justify-center relative p-6 select-none text-text-muted">
                  <div className="flex gap-4 items-center flex-wrap justify-center">
                    <div className="px-4 py-3 bg-bg-secondary border border-primary rounded shadow text-xs font-mono text-primary">
                      <span>Gateway</span>
                    </div>
                    <div className="w-8 h-[2px] bg-primary relative" />
                    <div className="px-4 py-3 bg-bg-secondary border border-secondary rounded shadow text-xs font-mono text-secondary">
                      <span>Redis Cache</span>
                    </div>
                    <div className="w-8 h-[2px] bg-secondary relative" />
                    <div className="px-4 py-3 bg-bg-secondary border border-tertiary rounded shadow text-xs font-mono text-tertiary">
                      <span>PostgreSQL DB</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mt-2">
                  {cs.architectureDescription}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
          {/* Key values card */}
          <ScrollReveal direction="fade">
            <div className="bg-bg-secondary border border-border p-6 rounded-lg flex flex-col gap-4 shadow-card">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-primary border-b border-border-subtle pb-2">
                Engineering Values
              </h3>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <Database className="w-4 h-4 text-primary" />
                  <span>High Data Reliability</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Sub-millisecond latency</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Scalable CPU Footprint</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

    </div>
  );
}
