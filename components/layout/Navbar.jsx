"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Scroll state trigger
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial theme set from classList or localStorage
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isDark = savedTheme ? savedTheme === "dark" : document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    // Observer to detect theme changes from any source (e.g. CommandMenu or other toggles)
    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains("dark");
      setTheme(currentDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.theme = nextTheme;
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/projects" },
    { label: "Posts", href: "/#blog" },
    { label: "Uses", href: "/uses" },
    { label: "Contact", href: "/#contact" }
  ];

  const isHeroBanner = !isScrolled && pathname === "/";
  const useDarkContrast = theme === "dark" || isHeroBanner;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* LOGO: Guaranteed to show dark mode logo (/logo_dark.png) in dark mode */}
        <Link href="/" className="flex items-center group select-none">
          {/* Light Mode Logo (black text) */}
          <img
            src="/logo.png"
            alt="Deep Moitra"
            className={`h-8 w-auto object-contain transition-opacity duration-300 ${
              isHeroBanner ? "hidden" : "block dark:hidden"
            }`}
          />
          {/* Dark Mode Logo (white text) */}
          <img
            src="/logo_dark.png"
            alt="Deep Moitra"
            className={`h-8 w-auto object-contain transition-opacity duration-300 ${
              isHeroBanner ? "block" : "hidden dark:block"
            }`}
          />
        </Link>
 
        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  useDarkContrast
                    ? isActive ? "text-[#adc6ff] font-bold" : "text-white/80 hover:text-white"
                    : isActive ? "text-primary font-bold" : "text-text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA ROW */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-bg-secondary border border-border hover:border-text-muted/50 text-text-secondary hover:text-text-primary transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Hire Me CTA with Magnetic Button */}
          <MagneticButton>
            <Link
              href="/#contact"
              className="px-4 py-2 bg-text-primary text-text-inverse hover:bg-primary hover:text-text-inverse text-xs uppercase font-mono font-bold tracking-wider rounded transition-colors"
            >
              Hire Me
            </Link>
          </MagneticButton>
        </div>

        {/* MOBILE TOGGLER */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded transition-colors ${
              useDarkContrast
                ? "bg-white/10 border border-white/20 text-white"
                : "bg-bg-secondary border border-border text-text-secondary"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              useDarkContrast ? "text-white" : "text-text-primary"
            }`}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bg-bg-secondary border-b border-border shadow-2xl p-6 z-40 animate-slide-up">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-text-primary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4">
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-text-primary text-text-inverse hover:bg-primary font-mono uppercase font-bold tracking-wider rounded transition-all"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
