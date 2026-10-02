"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectsStackedDeck from "@/components/projects/ProjectsStackedDeck";
import { projects } from "@/lib/mockData";

export default function ProjectsPage() {
  return (
    <div className="w-full min-h-screen pt-28 pb-32 bg-bg-primary text-text-primary">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-col gap-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text-primary transition-colors py-1.5 px-3 bg-bg-secondary border border-border shadow-sm select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>

          <span className="text-xs font-mono text-text-muted">
            {projects.length} Architectural Systems Cataloged
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary border border-border text-xs font-mono text-text-muted uppercase tracking-wider w-fit">
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400" />
            <span>COMPLETE ENGINEERING CATALOG • LAYERED ARCHITECTURAL SPEC</span>
          </div>
          <h1 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
            Engineering Works & Systems.
          </h1>
          <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed">
            Production full-stack platforms, distributed systems, and experimental interfaces built for scale. Filter by category or scroll through the architecture ledger.
          </p>
        </div>

        {/* Layered Scrollable Card Deck with Filter Tabs */}
        <ProjectsStackedDeck projects={projects} showHeader={false} />
      </div>
    </div>
  );
}
