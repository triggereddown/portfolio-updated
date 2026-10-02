"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSettings } from "@/lib/mockData";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Footer() {
  const pathname = usePathname();

  const handleScrollToLanding = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined") {
        try {
          gsap.registerPlugin(ScrollToPlugin);
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: 0, autoKill: true },
            ease: "power3.inOut",
            onComplete: () => {
              window.scrollTo(0, 0);
            },
          });
        } catch {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <footer className="bg-bg-secondary w-full py-16 border-t border-border mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Profile */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link
            href="/"
            onClick={handleScrollToLanding}
            className="font-display text-lg font-bold text-text-primary hover:text-primary transition-colors cursor-pointer"
            title="Return to Landing Page"
          >
            {siteSettings.name}
          </Link>
          <p className="text-xs text-text-muted">Built with precision. Dark Editorial style.</p>
        </div>

        {/* Copy details */}
        <p className="text-xs text-text-muted text-center md:text-left">
          &copy; {new Date().getFullYear()} Senior Product Architect. All rights reserved.
        </p>

        {/* Social Hooks */}
        <div className="flex items-center gap-6">
          <a
            href={siteSettings.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-text-secondary hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteSettings.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-text-secondary hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteSettings.email}`}
            className="text-xs font-mono text-text-secondary hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
