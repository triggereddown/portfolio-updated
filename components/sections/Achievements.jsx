"use client";

import React, { useState } from "react";
import { Award, Cloud, ArrowUpRight, ShieldCheck } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import { achievements } from "@/lib/mockData";

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Hackathon", "Certification"];

  const filtered = activeCategory === "All"
    ? achievements
    : achievements.filter(a => a.category === activeCategory);

  const getIcon = (cat) => {
    switch (cat) {
      case "Certification":
        return Cloud;
      case "Hackathon":
      default:
        return Award;
    }
  };

  return (
    <section id="achievements" className="relative w-full py-28 overflow-hidden border-t border-border bg-bg-primary">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <ScrollReveal>
              <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
                Accolades & Certifications
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
                National engineering competitions and verified cloud architecture credentials.
              </p>
            </ScrollReveal>
          </div>

          {/* Filter Pills */}
          <ScrollReveal delay={0.15}>
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-bg-secondary border border-border">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 text-xs font-mono tracking-wide rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-text-primary text-text-inverse font-semibold shadow-sm"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Accolades Ledger */}
        <div className="flex flex-col divide-y divide-border max-w-4xl mx-auto">
          {filtered.map((item, idx) => {
            const Icon = getIcon(item.category);
            const year = new Date(item.date).getFullYear();

            return (
              <ScrollReveal key={item._id} delay={idx * 0.08}>
                <div className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
                  
                  {/* Left: Icon & Meta */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-bg-secondary border border-border text-text-primary group-hover:text-primary transition-colors shrink-0">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-sans text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-primary bg-primary/10 border border-primary/20">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light max-w-xl">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs font-mono text-text-muted/80">
                        <span>{item.issuer}</span>
                        <span>•</span>
                        <span>{year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Verification Action */}
                  <div className="sm:shrink-0 pl-14 sm:pl-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg-secondary border border-border hover:border-text-muted text-xs font-mono text-text-secondary hover:text-text-primary transition-all group/btn"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verify Credential</span>
                      <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
