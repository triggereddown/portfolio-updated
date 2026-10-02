"use client";

import React, { useState } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import { Cpu, Database, Cloud, Terminal, CheckCircle2 } from "lucide-react";

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const marqueeSkills = [
    "Next.js 15", "React 19", "TypeScript", "Node.js", "PostgreSQL",
    "Redis", "Docker", "AWS Cloud", "Tailwind CSS", "Framer Motion", "MongoDB", "GraphQL"
  ];

  const categories = [
    { id: "Frontend", label: "Frontend & UI Architecture", icon: Cpu },
    { id: "Backend", label: "Backend & Microservices", icon: Terminal },
    { id: "Database", label: "Data & Storage Layers", icon: Database },
    { id: "DevOps", label: "DevOps & Cloud Systems", icon: Cloud },
  ];

  const capabilityData = {
    Frontend: [
      {
        name: "React 19 & Next.js 15",
        role: "Production Core",
        note: "Server Components (RSC), Server Actions, dynamic asset streaming, sub-second hydration.",
      },
      {
        name: "TypeScript",
        role: "Strict Typing",
        note: "End-to-end type safety, complex generic utilities, zero runtime type errors.",
      },
      {
        name: "Tailwind CSS & CSS Systems",
        role: "Styling Engine",
        note: "Design token architecture, fluid responsive typography, zero runtime CSS overhead.",
      },
      {
        name: "Motion (Framer Motion)",
        role: "Physics & Micro-interactions",
        note: "Non-blocking useMotionValue physics, spring damping, responsive layout animations.",
      },
    ],
    Backend: [
      {
        name: "Node.js (Express / Fastify)",
        role: "Runtime Core",
        note: "Event loop optimization, asynchronous non-blocking I/O, REST and microservice endpoints.",
      },
      {
        name: "Python (FastAPI)",
        role: "Microservices",
        note: "High-throughput asynchronous services, background worker queues, AI integrations.",
      },
      {
        name: "Socket.io & WebSockets",
        role: "Real-time Protocol",
        note: "Bi-directional state sync, low-latency multiplayer messaging, automated heartbeats.",
      },
      {
        name: "RESTful & GraphQL Architectures",
        role: "API Contracts",
        note: "Strict schema contracts, idempotent mutation handling, rate-limiting & pagination.",
      },
    ],
    Database: [
      {
        name: "PostgreSQL",
        role: "Relational Primary",
        note: "ACID transactions, complex relational queries, partial indexing, connection pooling.",
      },
      {
        name: "Redis",
        role: "In-Memory Cache",
        note: "Sliding TTL key strategies, query hash caching, distributed locking, pub/sub events.",
      },
      {
        name: "MongoDB",
        role: "Document Store",
        note: "Aggregation pipelines, indexed geo-queries, schema validation with Mongoose.",
      },
      {
        name: "Database Query Tuning",
        role: "Optimization",
        note: "EXPLAIN ANALYZE inspection, vacuum tuning, reducing execution cost on high-volume tables.",
      },
    ],
    DevOps: [
      {
        name: "Docker & Containers",
        role: "Orchestration",
        note: "Multi-stage minimal image builds, container isolation, local compose environments.",
      },
      {
        name: "AWS Cloud (ECS, S3, CloudFront)",
        role: "Cloud Infrastructure",
        note: "Containerized deployment pipelines, edge CDN caching, secure IAM role management.",
      },
      {
        name: "GitHub Actions CI/CD",
        role: "Automated Pipelines",
        note: "Automated linting, integration testing, semantic versioning, and zero-downtime deployment.",
      },
      {
        name: "Linux & System Observability",
        role: "Server Operations",
        note: "Process management, structured log aggregation, health checks, server metrics.",
      },
    ],
  };

  return (
    <section id="tech-stack" className="relative w-full py-28 overflow-hidden border-t border-border bg-bg-secondary/30">
      
      {/* Single Smooth Ambient Marquee Ticker */}
      <div className="w-full flex overflow-hidden select-none mb-16 relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 py-2 animate-marquee whitespace-nowrap">
          {Array(3).fill(marqueeSkills).flat().map((skill, idx) => (
            <span
              key={idx}
              className="text-lg sm:text-xl font-mono text-text-muted/60 tracking-wider uppercase flex items-center gap-6"
            >
              <span>{skill}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Technical Capabilities
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
              A battle-tested technology ecosystem chosen for performance, stability, and scale.
            </p>
          </ScrollReveal>
        </div>

        {/* Matrix Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Category Selector Buttons (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3.5 px-5 py-4 rounded-xl text-left transition-all duration-200 border ${
                    isActive
                      ? "bg-bg-secondary border-text-muted/40 text-text-primary shadow-sm"
                      : "bg-transparent border-transparent text-text-muted hover:text-text-secondary hover:bg-bg-secondary/40"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-text-muted"}`} />
                  <span className="text-xs sm:text-sm font-mono tracking-wide">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Capability Details Matrix (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl bg-bg-secondary/60 border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capabilityData[activeCategory].map((tool, idx) => (
                <ScrollReveal key={tool.name} delay={idx * 0.05}>
                  <div className="p-5 rounded-lg bg-bg-primary/60 border border-border-subtle flex flex-col justify-between gap-3 h-full group hover:border-text-muted/30 transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-sans text-sm sm:text-base font-bold text-text-primary">
                          {tool.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 shrink-0">
                          {tool.role}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {tool.note}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted/70 pt-2 border-t border-border-subtle">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Production Ready</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
