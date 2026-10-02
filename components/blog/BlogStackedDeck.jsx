"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  Twitter,
  Linkedin,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { blogPosts as defaultBlogPosts } from "@/lib/mockData";

export default function BlogStackedDeck({
  posts = defaultBlogPosts,
  showHeader = true,
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Dynamically compute category filters from current posts
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean))
  );
  const filters = ["All", ...categories];

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  const formatDate = (dateString) => {
    if (!dateString) return "Recent Note";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getButtonLabel = (platform) => {
    if (platform === "LinkedIn") return "Read on LinkedIn";
    if (platform?.includes("Twitter") || platform?.includes("X"))
      return "View on X (Twitter)";
    if (platform === "Medium") return "Read on Medium";
    return "Read Full Post";
  };

  const getPlatformIcon = (platform) => {
    if (platform === "LinkedIn") return <Linkedin className="w-3.5 h-3.5" />;
    if (platform?.includes("Twitter") || platform?.includes("X"))
      return <Twitter className="w-3.5 h-3.5" />;
    return <MessageSquare className="w-3.5 h-3.5" />;
  };

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-border/70">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary border border-border text-xs font-mono text-text-muted mb-4 uppercase tracking-wider">
              <span className="w-2 h-2 bg-sky-500 animate-pulse" />
              <span>FIELD NOTES & SOCIAL DISPATCHES • POSTS & THOUGHTS</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Posts & Engineering Logs.
            </h2>
            <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
              Practical observations on database performance, API migrations, and software architecture shared across LinkedIn, X (Twitter), and the web.
            </p>
          </div>

          {/* Dynamic Category Filter Bar */}
          <div className="flex items-center border border-border bg-bg-secondary p-1 flex-wrap gap-1">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-150 select-none ${
                    isActive
                      ? "bg-text-primary text-text-inverse font-bold"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-primary/50"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STICKY STACK FOR POSTS & WRITING */}
      <div className="relative flex flex-col gap-12 pb-24">
        {filteredPosts.map((post, idx) => {
          const isReversed = idx % 2 === 1;
          const hasImage = Boolean(post.coverImage?.url);

          return (
            <article
              key={post._id}
              className="sticky w-full transition-transform duration-300"
              style={{
                top: `calc(5rem + ${idx * 0.75}rem)`,
                zIndex: idx + 1,
                willChange: "transform",
              }}
            >
              <div
                className="w-full bg-[#faf9f5] dark:bg-[#0b1120] border border-stone-300 dark:border-slate-800 p-6 sm:p-8 lg:p-10 relative shadow-sm"
                style={{
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                {/* Technical Corner Markers */}
                <span className="absolute top-2 left-2 text-[10px] font-mono text-text-muted/60 select-none">
                  + [LOG:0{idx + 1}]
                </span>
                <span className="absolute top-2 right-2 text-[10px] font-mono text-text-muted/60 select-none">
                  + [{post.platform?.toUpperCase() || "POST"}]
                </span>

                {/* 12-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-3">
                  {/* MEDIA / TYPOGRAPHIC SURFACE */}
                  <div
                    className={`lg:col-span-7 flex flex-col gap-3 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {hasImage ? (
                      /* Image Post Card (LinkedIn diagram, architecture sketch) */
                      <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-bg-secondary border border-border/80 overflow-hidden group">
                        <img
                          src={post.coverImage.url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        />

                        {/* Platform & Category Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-3 py-1 bg-black/85 text-white text-[10px] font-mono uppercase tracking-wider font-bold border border-white/20">
                            {post.category}
                          </span>
                          {post.platform && (
                            <span className="px-2.5 py-1 bg-blue-600/90 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-sm">
                              {getPlatformIcon(post.platform)}
                              <span>{post.platform}</span>
                            </span>
                          )}
                        </div>

                        {/* Read Time */}
                        <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 dark:bg-slate-900/95 text-text-primary text-[10px] font-mono font-bold border border-border flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-text-muted" />
                          <span>{post.readTime || "2 min read"}</span>
                        </div>

                        {/* Bottom Context Ledger */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-xs font-mono text-white/90 bg-slate-950/85 px-4 py-2 border-t border-white/10">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-white/70" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </span>
                          <span className="shrink-0 text-sky-400 font-mono text-[11px] font-semibold">
                            ORIGINAL POST ↗
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Text Post Surface (Twitter / X Post with Typographic Architecture) */
                      <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-[#111726] dark:bg-[#070d19] border border-border/80 p-6 sm:p-8 flex flex-col justify-between overflow-hidden group">
                        {/* Background subtle grid pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-mono uppercase tracking-wider font-bold border border-white/20">
                              {post.category}
                            </span>
                            <span className="px-2.5 py-1 bg-black text-white text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/20">
                              <Twitter className="w-3 h-3 text-sky-400" />
                              <span>X / Twitter</span>
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-sky-400 font-semibold">
                            MICRO-DISPATCH
                          </span>
                        </div>

                        {/* Center: Large Quote Text */}
                        <div className="relative z-10 my-auto py-4">
                          <p className="font-cormorant text-xl sm:text-2xl lg:text-3xl font-light text-slate-100 leading-snug italic">
                            &ldquo;I thought building a Pomodoro app would be just a timer. Turns out it taught me more about backend design, analytics, and system thinking than half my tutorials.&rdquo;
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
                            <span className="text-white font-medium">@Deepmoitra1</span>
                            <span>•</span>
                            <span>System Architect Reflections</span>
                          </div>
                        </div>

                        {/* Bottom Context Ledger */}
                        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-white/80 pt-3 border-t border-white/10">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-white/70" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </span>
                          <span className="text-[11px] font-mono text-sky-400">
                            VERIFIED THOUGHT LOG
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* EDITORIAL SPECIFICATION / NARRATIVE */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between gap-6 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      {/* Domain Tag */}
                      <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-border/60">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                          Field Log // 0{idx + 1}
                        </span>
                        <span className="text-xs font-mono text-text-muted">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-cormorant text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                        {post.title}
                      </h3>

                      {/* Subtitle / Excerpt preview - leaves room for reading the full post */}
                      <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 font-light leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Key takeaway note */}
                      <div className="mt-4 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-normal border-l-2 border-sky-500 pl-3 py-1 bg-stone-100/50 dark:bg-stone-900/40">
                        <span>
                          {post.platform === "LinkedIn"
                            ? "Published by Deep Moitra on LinkedIn covering practical engineering benchmarks and architecture."
                            : post.platform?.includes("Twitter") || post.platform?.includes("X")
                            ? "Original dispatch on engineering mindset and software craft by Deep Moitra on X."
                            : "Direct analysis on architectural tradeoffs and real-world implementations."}
                        </span>
                      </div>
                    </div>

                    {/* Technical Topic Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-col gap-2 pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                          Key Focus & Topics
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-mono bg-stone-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-stone-300 dark:border-slate-700"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions Row: Read Full Article / Post Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/60">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:bg-sky-600 dark:hover:bg-sky-500 hover:text-white transition-colors shadow-sm group"
                      >
                        <span>{getButtonLabel(post.platform)}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <span className="text-[11px] font-mono text-text-muted">
                        Published on {post.platform || "Web"} ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
