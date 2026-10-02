"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Exact mouse coordinates (zero lag)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const checkElement = (e) => {
      const target = e.target;
      if (!target) return;

      const isInput = target.closest("input, textarea, select, [contenteditable='true']");
      setIsTextInput(!!isInput);

      const isInteractive = target.closest("a, button, [role='button'], .cursor-pointer, .magnetic-element");
      setIsHovered(!!isInteractive && !isInput);
    };

    window.addEventListener("mouseover", checkElement);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", checkElement);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [mouseX, mouseY]);

  if (!isVisible || isTextInput) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      {/* Precision Pointer Dot: Dual-Tone (Dark on Light Mode, White on Dark Mode). Zero blue circle. */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-sm bg-neutral-900 border border-white/60 dark:bg-white dark:border-black/50"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? 14 : 8,
          height: isHovered ? 14 : 8,
          scale: isClicked ? 0.75 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </div>
  );
}
