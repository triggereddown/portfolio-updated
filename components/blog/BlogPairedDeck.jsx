"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Calendar,
  BookOpen,
  Sparkles,
  Linkedin,
  Twitter,
  Layers,
} from "lucide-react";

/**
 * Format read time safely to avoid any duplicate "min read min read"
 */
function cleanReadTime(timeStr) {
  if (!timeStr) return "5 min read";
  const num = timeStr.toString().replace(/[^0-9]/g, "");
  return num ? `${num} min read` : "5 min read";
}

export default function BlogPairedDeck({ posts = [], showHeroHeader = true }) {
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  const platforms = ["All", "Medium", "Substack", "LinkedIn"];

  const filteredPosts =
    selectedPlatform === "All"
      ? posts
      : posts.filter(
          (p) => p.platform?.toLowerCase() === selectedPlatform.toLowerCase()
        );

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="w-3.5 h-3.5" />;
      case "twitter":
      case "x":
        return <Twitter className="w-3.5 h-3.5" />;
      case "substack":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "medium":
      default:
        return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Editorial Header */}
      {showHeroHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/60">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border text-xs font-mono text-text-muted mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>EDITORIAL ARCHIVES • TECHNICAL ARTICLES</span>
            </div>
            <h1 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
              Writings & Publication Notes.
            </h1>
            <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
              Curated architectural deep-dives, systems essays, and frontend engineering notes published across industry publications.
            </p>
          </div>

          <div className="text-xs font-mono text-text-muted">
            Showing <strong className="text-text-primary">{filteredPosts.length}</strong> Articles
          </div>
        </div>
      )}

      {/* SKEUOMORPHIC HORIZONTAL TAB BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div
          role="tablist"
          aria-label="Filter by Publication"
          className="relative inline-flex items-center p-1.5 rounded-full select-none max-w-full overflow-x-auto no-scrollbar"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), linear-gradient(180deg, #ede8dc 0%, #dfd8c9 100%)",
            boxShadow:
              "inset 0 2px 4px rgba(0,0,0,0.12), inset 0 -1px 2px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {platforms.map((platform) => {
            const isActive = selectedPlatform === platform;
            return (
              <button
                key={platform}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedPlatform(platform)}
                className="relative px-5 py-2 text-xs font-mono tracking-wider transition-all duration-300 rounded-full flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{
                  color: isActive ? "#0f172a" : "#64748b",
                  textShadow: isActive ? "0 1px 1px rgba(255,255,255,0.9)" : "none",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBlogTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%)",
                      boxShadow:
                        "0 4px 12px -2px rgba(37, 99, 235, 0.25), 0 2px 4px rgba(0,0,0,0.06), inset 0 2px 2px rgba(255,255,255,1), inset 0 -1px 2px rgba(96, 165, 250, 0.3)",
                      border: "1px solid #dbeafe",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-bold">{platform}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-text-muted">
          Scroll down to browse publications
        </span>
      </div>

      {/* VERTICAL STREAM OF HORIZONTAL MEDIUM-STYLE ARTICLES */}
      <div className="flex flex-col gap-6 w-full pb-12">
        {filteredPosts.map((post) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          );
          const cleanTime = cleanReadTime(post.readTime);
          const targetUrl = post.url || `/blog/${post.slug?.current}`;
          const isExternal = !!post.url;

          return (
            <article
              key={post._id}
              className="group relative rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.5) 50%, rgba(203,213,225,0.2) 100%)",
                boxShadow:
                  "0 15px 35px -10px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.02)",
              }}
            >
              <div
                className="rounded-[calc(1rem-1px)] bg-bg-card p-5 sm:p-7 flex flex-col md:flex-row items-stretch gap-6 md:gap-8 overflow-hidden relative"
                style={{
                  boxShadow:
                    "inset 0 1.5px 2px rgba(255,255,255,0.9), inset 0 -1.5px 3px rgba(0,0,0,0.02)",
                }}
              >
                {/* Left Side: Clean Image */}
                <div className="relative w-full md:w-72 lg:w-80 h-48 sm:h-52 md:h-auto min-h-[170px] rounded-xl overflow-hidden bg-bg-secondary border border-border/80 shadow-inner shrink-0 group-hover:border-blue-400/60 transition-colors">
                  <img
                    src={post.coverImage?.url || post.coverImage || "/work-8.png"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Lens Rim */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 15px 25px -10px rgba(0,0,0,0.3)",
                    }}
                  />
                  {/* Floating Platform Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono shadow-md">
                    {getPlatformIcon(post.platform)}
                    <span className="font-semibold">{post.platform || "Article"}</span>
                  </div>
                </div>

                {/* Right Side: Heading, Small Description, Date, Link */}
                <div className="flex flex-col justify-between flex-grow gap-4 py-1">
                  <div className="flex flex-col gap-2.5">
                    {/* Metadata: Category • Date • Read Time */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-text-muted">
                      <span className="font-bold text-blue-600">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-medium text-text-secondary">{cleanTime}</span>
                      </span>
                    </div>

                    {/* Heading */}
                    <h2 className="font-cormorant text-2xl sm:text-3xl font-bold tracking-tight text-text-primary leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Small Description */}
                    <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {post.excerpt || post.subtitle}
                    </p>
                  </div>

                  {/* Date & Link Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs font-mono text-text-muted">
                      Published on {post.platform || "Platform"}
                    </span>

                    {/* Link */}
                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-0.5 duration-200"
                      >
                        <span>Read Article</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={targetUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-0.5 duration-200"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
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
