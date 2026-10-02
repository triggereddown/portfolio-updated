"use client";

import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import { siteSettings } from "@/lib/mockData";

export default function AboutPage() {
  return (
    <div className="w-full pt-32 pb-24 max-w-[1200px] mx-auto px-6 flex flex-col gap-16">
      
      {/* Intro Header */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <ScrollReveal>
          <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">The Engineer</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Obsessed with <span className="text-primary italic font-serif">Performance.</span>
          </h1>
        </ScrollReveal>
      </div>

      {/* Grid layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-text-secondary text-sm sm:text-base leading-relaxed">
          <ScrollReveal>
            <p>
              I am a Senior Product Engineer with a passion for designing and building highly responsive, scalable systems.
              Based in Kolkata, India, I operate at the sweet spot where technical precision meets high-fidelity design.
              I help startups and enterprises launch solid digital experiences built on clean engineering principles.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary mt-4">
              My Engineering Philosophy
            </h2>
            <p className="mt-3">
              I believe that code is written for humans to read and only incidentally for computers to execute. I care
              deeply about semantic structure, clean logic flows, automated test pipelines, and highly optimized query caches.
              For me, true full-stack means knowing exactly how data flows from the React virtual DOM tree, down through Edge HTTP
              routing headers, into Redis memory buffers, and finally to transactional relational table storage blocks.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary mt-4">
              Specialized Competency
            </h2>
            <p className="mt-3">
              Most of my time is spent coding React, Next.js and Node.js. However, my competency extends to Python backend frameworks
              (like Django and FastAPI), cloud orchestrations (Docker, AWS ECS/EC2 clusters), cache layer optimization, and database
              query debugging. I also maintain accessibility integrations, ensuring visual structures meet AA standard compliance ratios.
            </p>
          </ScrollReveal>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-8 bg-bg-secondary border border-border p-6 rounded-lg shadow-card">
          <div className="flex flex-col gap-1 border-b border-border-subtle pb-4">
            <span className="font-mono text-xs text-primary uppercase tracking-wide">Developer Focus</span>
            <span className="font-display text-lg font-bold text-text-primary">Deep Moitra</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm border-b border-border-subtle pb-2">
              <span className="text-text-muted">Primary Role</span>
              <span className="font-bold text-text-primary">Product Architect</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border-subtle pb-2">
              <span className="text-text-muted">Location</span>
              <span className="font-bold text-text-primary">Kolkata, IN</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border-subtle pb-2">
              <span className="text-text-muted">Avg Latency</span>
              <span className="font-mono text-xs text-primary font-bold">&lt;120ms</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
