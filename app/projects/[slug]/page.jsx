"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Clock, ShieldCheck, User } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects } from "@/lib/mockData";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const found = projects.find(p => p.slug.current === slug) || projects[0];
    setProject(found);
  }, [slug]);

  if (!project) return null;

  return (
    <div className="w-full pt-32 pb-24 max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
      
      {/* Back button */}
      <ScrollReveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </ScrollReveal>

      {/* Hero Banner header */}
      <ScrollReveal delay={0.1} className="relative w-full rounded-xl overflow-hidden bg-bg-secondary border border-border">
        {/* Banner image */}
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <img
            src={project.coverImage.url}
            alt={project.title}
            className="w-full h-full object-cover grayscale pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/40 to-transparent" />
        </div>

        {/* Title details overlays */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
              {project.category}
            </span>
            <span className="text-xs text-text-secondary font-mono">{project.year}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </ScrollReveal>

      {/* Metadata strip (Box bordered) */}
      <ScrollReveal delay={0.2} className="w-full grid grid-cols-2 md:grid-cols-5 gap-6 bg-bg-secondary border border-border p-6 rounded-lg select-none">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">My Role</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary">{project.myRole || "Lead Developer"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">Team Size</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary">{project.teamSize ? `${project.teamSize} Engineers` : "1 Engineer"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">Duration</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary">{project.duration}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">Year</span>
          <span className="text-xs sm:text-sm font-bold text-text-primary">{project.year}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">Status</span>
          <span className="text-xs sm:text-sm font-bold text-primary">{project.status}</span>
        </div>
      </ScrollReveal>

      {/* 3 Prominent performance metrics cards */}
      <ScrollReveal delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.metrics.map((m, mIdx) => (
          <div key={mIdx} className="bg-bg-secondary border border-border p-6 rounded-lg shadow-card hover:border-primary/30 transition-all duration-300">
            <span className="font-display text-3xl sm:text-4xl font-bold text-primary block mb-2">
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

      {/* Two-Column split body (65% content, 35% sticky sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <ScrollReveal>
            <div className="bg-bg-secondary border border-border p-8 rounded-lg flex flex-col gap-6">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Problem Statement</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
                  {project.problem}
                </p>
              </div>

              <div className="w-full h-[1px] bg-border-subtle" />

              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Solution Architecture</h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
                  {project.solution}
                </p>
              </div>

              {project.impact && (
                <>
                  <div className="w-full h-[1px] bg-border-subtle" />
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">Technical Impact</h2>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
                      {project.impact}
                    </p>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>

          {/* System design architecture drawing mockup */}
          {project.architectureDescription && (
            <ScrollReveal delay={0.1}>
              <div className="bg-bg-secondary border border-border p-8 rounded-lg flex flex-col gap-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                  System Architecture Layout
                </h2>
                
                {/* Dot grid Canvas drawing mock */}
                <div className="w-full h-64 bg-bg-primary dot-grid border border-border rounded flex items-center justify-center relative p-6 select-none text-text-muted">
                  <div className="flex gap-4 items-center flex-wrap justify-center">
                    <div className="px-4 py-3 bg-bg-secondary border border-primary rounded shadow text-xs font-mono text-primary flex items-center gap-1.5">
                      <span>HTTP Client</span>
                    </div>
                    <div className="w-8 h-[2px] bg-primary relative" />
                    <div className="px-4 py-3 bg-bg-secondary border border-secondary rounded shadow text-xs font-mono text-secondary flex items-center gap-1.5">
                      <span>Edge Cache</span>
                    </div>
                    <div className="w-8 h-[2px] bg-secondary relative" />
                    <div className="px-4 py-3 bg-bg-secondary border border-tertiary rounded shadow text-xs font-mono text-tertiary flex items-center gap-1.5">
                      <span>Data Server</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mt-2">
                  {project.architectureDescription}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Sticky Sidebar (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
          {/* Tech Stack card */}
          <ScrollReveal direction="fade">
            <div className="bg-bg-secondary border border-border p-6 rounded-lg flex flex-col gap-4 shadow-card">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-primary border-b border-border-subtle pb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1.5 rounded bg-bg-primary border border-border text-xs font-mono text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Links card */}
          <ScrollReveal direction="fade" delay={0.1}>
            <div className="bg-bg-secondary border border-border p-6 rounded-lg flex flex-col gap-4 shadow-card">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-primary border-b border-border-subtle pb-2">
                Deployment & Code
              </h3>
              
              <div className="flex flex-col gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded bg-primary text-text-inverse hover:bg-primary/95 text-xs font-mono uppercase tracking-wider font-bold transition-colors"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {project.githubUrl !== "--" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded bg-bg-primary border border-border hover:border-primary text-text-primary text-xs font-mono uppercase tracking-wider transition-all"
                  >
                    <span>View Repository</span>
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

    </div>
  );
}
