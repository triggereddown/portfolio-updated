"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, ArrowDown, FileText } from "lucide-react";
import CountUp from "../ui/CountUp";
import MagneticButton from "../ui/MagneticButton";
import ScrollReveal from "../ui/ScrollReveal";
import { siteSettings } from "@/lib/mockData";

export default function Hero() {
  const canvasRef = useRef(null);
  const [typingText, setTypingText] = useState("React & Next.js");

  useEffect(() => {
    // Dynamic typing cursor effect
    const tags = ["React & Next.js", "Node.js & Python", "System Design", "AWS Cloud Systems"];
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % tags.length;
      setTypingText(tags[i]);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current;

    let renderer = null;
    let animationId = null;

    // Dynamically import Three.js only on the client to avoid SSR crash
    import("three").then((THREE) => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const particleCount = 80;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 45;
        positions[i + 1] = (Math.random() - 0.5) * 45;
        positions[i + 2] = (Math.random() - 0.5) * 40;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xadc6ff,
        size: 0.8,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
      };

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        particles.position.x += (mouseX - particles.position.x) * 0.05;
        particles.position.y += (-mouseY - particles.position.y) * 0.05;
        renderer.render(scene, camera);
      };

      animate();

      // Store cleanup in ref so the return below can call it
      container._threeCleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    });

    return () => {
      if (container._threeCleanup) {
        container._threeCleanup();
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background ambient glowing blobs */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none -z-10" />

      {/* Three.js Canvas */}
      <div ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none -z-20 opacity-70" />

      <div className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column (60%) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          {/* Availability Badge */}
          <ScrollReveal direction="fade" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border text-xs text-primary font-mono">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span>Available for high-impact roles</span>
            </div>
          </ScrollReveal>

          {/* Monospace eyebrow */}
          <ScrollReveal delay={0.2}>
            <p className="font-mono text-sm tracking-[0.2em] text-text-secondary uppercase">
              Full Stack Engineer & Solutions Architect
            </p>
          </ScrollReveal>

          {/* Large display Heading */}
          <ScrollReveal delay={0.3}>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.1]">
              Building Systems <br />
              That <span className="text-primary italic font-serif">Scale.</span>
            </h1>
          </ScrollReveal>

          {/* Subheading */}
          <ScrollReveal delay={0.4}>
            <p className="text-base sm:text-lg text-text-secondary max-w-lg leading-relaxed">
              I design and build production-grade web systems - from highly responsive, accessible
              frontends to secure, distributed backends serving thousands of users.
            </p>
          </ScrollReveal>

          {/* CTA Buttons Row */}
          <ScrollReveal delay={0.5} className="w-full">
            <div className="flex flex-wrap gap-4 items-center">
              <MagneticButton>
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-text-primary text-text-inverse hover:bg-primary hover:text-text-inverse rounded font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-md hover:shadow-lg"
                >
                  View My Work
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border hover:border-primary text-text-primary rounded font-mono text-xs uppercase font-bold tracking-wider transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              </MagneticButton>

              {/* Social icons */}
              <div className="flex items-center gap-3 ml-2">
                <MagneticButton>
                  <a
                    href={siteSettings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded bg-bg-secondary border border-border text-text-secondary hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={siteSettings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded bg-bg-secondary border border-border text-text-secondary hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Metrics summary row */}
          <ScrollReveal delay={0.6} className="w-full mt-6 border-t border-border pt-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {siteSettings.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <CountUp
                    end={parseInt(stat.value)}
                    suffix={stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : ""}
                    className="font-display text-3xl font-bold text-primary"
                  />
                  <span className="text-[10px] tracking-wider uppercase font-mono text-text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right column (40%) */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <ScrollReveal direction="fade" delay={0.4} className="relative">
            {/* Elegant Border Ring */}
            <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full border border-primary/20 flex items-center justify-center p-3 relative">
              <div className="absolute inset-0 border border-secondary/15 rounded-full animate-pulse pointer-events-none" />

              {/* Avatar */}
              <div className="w-full h-full rounded-full overflow-hidden border border-border bg-bg-secondary relative">
                <div className="absolute inset-0 dot-grid opacity-20" />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Deep Moitra"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700 pointer-events-none"
                />
              </div>

              {/* Status overlay */}
              <div className="absolute bottom-2 -left-4 px-4 py-2 rounded bg-bg-secondary/90 border border-border shadow-lg flex items-center gap-2 max-w-[200px] backdrop-blur-sm select-none">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary tracking-wide">
                  Focus: {typingText}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted flex flex-col items-center gap-1 cursor-pointer select-none">
        <span className="text-[9px] font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
