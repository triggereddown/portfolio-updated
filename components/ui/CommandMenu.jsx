"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, FileText, Mail, Github, Linkedin, Moon, Sun, ArrowRight, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { projects, blogPosts } from "@/lib/mockData";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavigate = (path) => {
    setOpen(false);
    router.push(path);
  };

  const handleAction = (action) => {
    setOpen(false);
    if (action === "email") {
      window.location.href = "mailto:deepmoitra.dev@gmail.com";
    } else if (action === "resume") {
      window.open("/resume.pdf", "_blank");
    } else if (action === "github") {
      window.open("https://github.com/triggereddown", "_blank");
    } else if (action === "linkedin") {
      window.open("https://linkedin.com/in/deepmoitra", "_blank");
    } else if (action === "theme") {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.theme = isDark ? "dark" : "light";
    }
  };

  return (
    <>
      {/* Search trigger navbar button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded bg-bg-secondary border border-border hover:border-primary text-text-muted hover:text-text-primary text-xs font-mono transition-all"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="bg-bg-tertiary px-1.5 py-0.5 rounded border border-border text-[9px]">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* CMD Panel */}
            <motion.div
              className="relative w-full max-w-lg bg-[#121214] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Command className="flex flex-col w-full text-text-primary font-body">
                {/* Search Bar */}
                <div className="flex items-center gap-3 px-4 border-b border-white/5 py-3">
                  <Search className="w-4 h-4 text-text-muted" />
                  <Command.Input
                    placeholder="Search anything (projects, blogs, shortcuts)..."
                    className="w-full bg-transparent border-0 outline-0 ring-0 text-sm placeholder-text-muted text-text-primary"
                  />
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar">
                  <Command.Empty className="text-xs text-text-muted p-4 text-center">
                    No results found.
                  </Command.Empty>

                  {/* Navigation Group */}
                  <Command.Group heading="Navigation" className="text-[10px] tracking-wider uppercase font-mono text-text-muted px-2 py-1.5">
                    <Command.Item
                      onSelect={() => handleNavigate("/")}
                      className="flex items-center justify-between text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2"><Laptop className="w-3.5 h-3.5 text-primary" /> Home Dashboard</span>
                      <ArrowRight className="w-3 h-3 text-text-muted" />
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleNavigate("/projects")}
                      className="flex items-center justify-between text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-primary" /> Technical Projects</span>
                      <ArrowRight className="w-3 h-3 text-text-muted" />
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleNavigate("/blog")}
                      className="flex items-center justify-between text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-primary" /> Engineering Blog</span>
                      <ArrowRight className="w-3 h-3 text-text-muted" />
                    </Command.Item>
                  </Command.Group>

                  {/* Projects Group */}
                  <Command.Group heading="Featured Projects" className="text-[10px] tracking-wider uppercase font-mono text-text-muted px-2 py-1.5 mt-2">
                    {projects.map((proj) => (
                      <Command.Item
                        key={proj._id}
                        onSelect={() => handleNavigate(`/projects/${proj.slug.current}`)}
                        className="flex items-center justify-between text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <span className="font-semibold text-text-primary">{proj.title} <span className="text-[10px] font-normal text-text-muted">({proj.category})</span></span>
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">{proj.techStack[0]}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Blogs Group */}
                  <Command.Group heading="Articles & Insights" className="text-[10px] tracking-wider uppercase font-mono text-text-muted px-2 py-1.5 mt-2">
                    {blogPosts.map((post) => (
                      <Command.Item
                        key={post._id}
                        onSelect={() => handleNavigate(`/blog/${post.slug.current}`)}
                        className="flex items-center justify-between text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <span className="text-text-primary line-clamp-1">{post.title}</span>
                        <span className="text-[10px] text-text-muted shrink-0">{post.readTime}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Actions Group */}
                  <Command.Group heading="Quick Actions" className="text-[10px] tracking-wider uppercase font-mono text-text-muted px-2 py-1.5 mt-2">
                    <Command.Item
                      onSelect={() => handleAction("resume")}
                      className="flex items-center gap-3 text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span>Download Resume (Tracked)</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleAction("theme")}
                      className="flex items-center gap-3 text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <Sun className="w-3.5 h-3.5 text-accent block dark:hidden" />
                      <Moon className="w-3.5 h-3.5 text-accent hidden dark:block" />
                      <span>Toggle Dark / Light Theme</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleAction("email")}
                      className="flex items-center gap-3 text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      <span>Shoot Direct Email</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleAction("github")}
                      className="flex items-center gap-3 text-xs px-3 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-accent" />
                      <span>Explore Developer GitHub</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>

              {/* Panel Footer */}
              <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-t border-white/5 text-[10px] text-text-muted font-mono select-none">
                <span>Navigate with <kbd>↑↓</kbd> and <kbd>Enter</kbd></span>
                <span>ESC to Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
