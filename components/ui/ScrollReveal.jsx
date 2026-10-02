"use client";

import React from "react";
import { motion } from "motion/react";

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className = "",
  once = true,
}) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    fade: { x: 0, y: 0 },
  };

  const initialOffset = directions[direction] || { x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: initialOffset.x,
        y: initialOffset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Expo-out curve
      }}
    >
      {children}
    </motion.div>
  );
}
