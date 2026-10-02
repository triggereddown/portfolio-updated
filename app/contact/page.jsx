"use client";

import React from "react";
import Contact from "@/components/sections/Contact";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  return (
    <div className="w-full pt-32 pb-16 flex flex-col gap-6">
      
      {/* Centered wrapper */}
      <div className="max-w-[1200px] mx-auto px-6 w-full flex flex-col gap-4 max-w-xl text-center">
        <ScrollReveal>
          <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">Launch Project</span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Dedicated Connection Portal
          </h1>
        </ScrollReveal>
      </div>

      <Contact />
    </div>
  );
}
