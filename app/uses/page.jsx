"use client";

import React from "react";
import { Laptop, Code, Hammer, Database, Settings } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function UsesPage() {
  const categories = [
    {
      title: "Hardware & Workspace",
      icon: <Laptop className="w-5 h-5 text-primary" />,
      items: [
        { name: "MacBook Pro M3 Max", desc: "16-inch, 36GB Unified Memory, 1TB SSD. Standard workstation." },
        { name: "Dell UltraSharp 27 Monitor", desc: "4K resolution, strict color accuracy for visual audits." },
        { name: "Keychron K2 V2 Keyboard", desc: "Tactile Gateron brown switches for long code sessions." }
      ]
    },
    {
      title: "Development & Editor",
      icon: <Code className="w-5 h-5 text-primary" />,
      items: [
        { name: "VS Code Editor", desc: "Theme: Tokyo Night. Font: JetBrains Mono at 13.5px." },
        { name: "Hyper Terminal", desc: "Zsh shell with customized Oh My Zsh configurations." },
        { name: "Postman & TablePlus", desc: "Direct REST debugging and quick PostgreSQL query profiling." }
      ]
    },
    {
      title: "Engineering Stack",
      icon: <Hammer className="w-5 h-5 text-primary" />,
      items: [
        { name: "Next.js / React", desc: "Core frontend layout architectures and Edge rendering engines." },
        { name: "Node.js (NestJS & Express)", desc: "Scalable REST APIs and background worker services." },
        { name: "Tailwind CSS", desc: "Tailored custom design utility tokens and smooth transitions." }
      ]
    }
  ];

  return (
    <div className="w-full pt-32 pb-24 max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
      
      {/* Intro Header */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <ScrollReveal>
          <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">Equipment Register</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Tooling, Stack & <span className="text-primary italic font-serif">Setup.</span>
          </h1>
        </ScrollReveal>
      </div>

      {/* Tool categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
        {categories.map((cat, idx) => (
          <ScrollReveal key={cat.title} delay={idx * 0.1}>
            <div className="bg-bg-secondary border border-border rounded-lg p-6 flex flex-col gap-6 shadow-card h-full">
              <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
                {cat.icon}
                <h2 className="font-display text-lg font-bold text-text-primary">
                  {cat.title}
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1">
                    <span className="font-bold text-sm text-text-primary">{item.name}</span>
                    <span className="text-xs text-text-secondary leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}
