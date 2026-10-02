"use client";

import React from "react";

export default function Noise() {
  return (
    <div
      className="noise-overlay fixed inset-0 w-full h-full z-[9999] opacity-[0.035] dark:opacity-[0.04] select-none pointer-events-none"
      style={{
        backgroundImage: "url('/noise-tile.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "100px 100px",
        willChange: "transform",
      }}
    />
  );
}
