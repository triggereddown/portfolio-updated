"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogStackedDeck from "@/components/blog/BlogStackedDeck";
import { blogPosts } from "@/lib/mockData";

export default function BlogListingPage() {
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
            {blogPosts.length} Published Posts & Dispatches
          </span>
        </div>

        {/* Layered Scrollable Card Deck */}
        <BlogStackedDeck posts={blogPosts} showHeader={true} />
      </div>
    </div>
  );
}
