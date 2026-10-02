"use client";

import BlogStackedDeck from "@/components/blog/BlogStackedDeck";
import { blogPosts } from "@/lib/mockData";

export default function Blog() {
  return (
    <section id="blog" className="relative w-full py-28 border-t border-border bg-bg-primary">
      <div className="max-w-[1240px] mx-auto px-6">
        <BlogStackedDeck posts={blogPosts} showHeader={true} />
      </div>
    </section>
  );
}
