"use client";

import React from "react";
import Header from "@/components/Header";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* 4.1 Header with Batman Zoom-through Transition into About */}
      <Header />

      {/* 4.3 Alternate milestones vertical timeline */}
      <Experience />

      {/* 4.4 Projects grid with tabs */}
      <Projects />

      {/* 4.5 Scrolling marquee reels and specialization grids */}
      <TechStack />

      {/* 4.7 Technical blog writing feeds */}
      <Blog />

      {/* 4.8 Testimonial carousel loop */}
      <Testimonials />

      {/* 4.9 Milestones lists achievements */}
      <Achievements />

      {/* 4.10 Direct validation contact form */}
      <Contact />
    </>
  );
}
