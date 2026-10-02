"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { blogPosts } from "@/lib/mockData";

export default function BlogReaderPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const found = blogPosts.find(b => b.slug.current === slug) || blogPosts[0];
    setPost(found);
  }, [slug]);

  if (!post) return null;

  return (
    <div className="w-full pt-32 pb-24 max-w-[800px] mx-auto px-6 flex flex-col gap-10">
      
      {/* Back link */}
      <ScrollReveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </Link>
      </ScrollReveal>

      {/* Main Header details */}
      <div className="flex flex-col gap-4">
        <ScrollReveal delay={0.1} className="flex items-center gap-3 text-xs text-text-muted font-mono select-none">
          <span className="text-primary font-bold">{post.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {post.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            {post.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-base text-text-secondary leading-relaxed border-l-2 border-primary pl-4 py-1 mt-2">
            {post.excerpt}
          </p>
        </ScrollReveal>
      </div>

      {/* Banner image */}
      <ScrollReveal delay={0.4} className="relative w-full h-[250px] sm:h-[350px] rounded-lg overflow-hidden border border-border bg-bg-secondary select-none">
        <img
          src={post.coverImage.url}
          alt={post.title}
          className="w-full h-full object-cover grayscale pointer-events-none"
        />
      </ScrollReveal>

      {/* Body content */}
      <ScrollReveal delay={0.5} className="flex flex-col gap-6 text-text-secondary text-sm sm:text-base leading-relaxed mt-4">
        <p>
          Managing scaling architectures requires optimizing standard client pipelines. 
          When React rerendering issues arise, identifying redundant state sets, managing memoized properties, 
          and profiling visual trees ensures optimal user interfaces.
        </p>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary mt-6">
          1. Profiling Virtual DOM Hydrations
        </h2>
        <p>
          React 19 updates visual rendering triggers. Leveraging server components, statically optimizing
          relational nodes, and caching heavy layout assets decreases LCP latency coordinates substantially.
        </p>
        <p>
          Always keep component trees flat, optimize key properties, and leverage dynamic dynamic imports
          to separate heavy scripts from secondary route hydrations.
        </p>
      </ScrollReveal>

      {/* Tags section */}
      <ScrollReveal className="flex flex-wrap gap-2 border-t border-border pt-6 mt-8">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded bg-bg-secondary border border-border text-xs font-mono text-text-secondary"
          >
            #{tag}
          </span>
        ))}
      </ScrollReveal>

    </div>
  );
}
