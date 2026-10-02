"use client";

import React, { useState, useEffect } from "react";

/**
 * SkeuomorphicToggle
 * 
 * Tactile skeuomorphic switch matching the verified authored source
 * and blue remix / neon dark aesthetic.
 *
 * @param {Object} props
 * @param {boolean} [props.checked] - Controlled state
 * @param {boolean} [props.defaultChecked=true] - Initial state if uncontrolled
 * @param {(checked: boolean) => void} [props.onChange] - Callback on state change
 * @param {string} [props.label="Live Sync"] - Text inside thumb
 * @param {"dark" | "light" | "auto"} [props.mode="dark"] - Visual theme
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Size scale
 * @param {string} [props.className=""] - Additional container classes
 */
export default function SkeuomorphicToggle({
  checked: controlledChecked,
  defaultChecked = true,
  onChange,
  label = "Live Sync",
  mode = "dark",
  size = "md",
  className = "",
  ariaLabel = "Toggle sync",
}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  // Scale dimensions
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1;
  const width = Math.round(192 * scale); // 12rem = 192px
  const height = Math.round(64 * scale);  // 4rem = 64px
  const thumbWidth = Math.round(116 * scale);
  const padding = Math.round(6 * scale);
  const travelDist = width - thumbWidth - padding * 2;

  const toggle = () => {
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  // Light Mode Styles
  const lightStyles = {
    onBg: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), linear-gradient(180deg, #dbeafe 0%, #93c5fd 100%)",
    offBg: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)",
    onShadow: "inset 0 4px 8px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.7), 0 0 0 6px rgba(239, 246, 255, 0.8), 0 0 25px 5px rgba(96, 165, 250, 0.4)",
    offShadow: "inset 0 4px 8px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(255,255,255,0.55), 0 0 0 6px rgba(241, 245, 249, 0.9), 0 0 18px 2px rgba(148, 163, 184, 0.25)",
    onBorder: "#60a5fa",
    offBorder: "#94a3b8",
    onThumbShadow: "0 10px 20px -4px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(0,0,0,0.04), inset 0 3px 4px rgba(255,255,255,1), inset 0 -2px 4px rgba(96, 165, 250, 0.2)",
    offThumbShadow: "0 8px 16px -4px rgba(15, 23, 42, 0.18), 0 3px 5px -2px rgba(0,0,0,0.05), inset 0 3px 4px rgba(255,255,255,1), inset 0 -2px 4px rgba(148, 163, 184, 0.25)",
    thumbBg: "linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%)",
    thumbBorder: "1px solid #e0edfa",
    labelColorOn: "#1e293b",
    labelColorOff: "#475569",
    textShadow: "0 1px 1px rgba(255,255,255,0.9)",
  };

  // Dark / Neon Blue Styles (matching reference image)
  const darkStyles = {
    onBg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 4px), linear-gradient(180deg, #0e245c 0%, #173d94 50%, #0b1a40 100%)",
    offBg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px), linear-gradient(180deg, #181d29 0%, #0d1017 100%)",
    onShadow: "inset 0 3px 6px rgba(0,0,0,0.65), inset 0 -2px 4px rgba(59, 130, 246, 0.35), 0 0 0 2px rgba(37, 99, 235, 0.7), 0 0 20px 4px rgba(37, 99, 235, 0.65), 0 0 45px 8px rgba(29, 78, 216, 0.35)",
    offShadow: "inset 0 4px 8px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.05), 0 0 0 1px rgba(51, 65, 85, 0.5), 0 0 12px rgba(0,0,0,0.4)",
    onBorder: "#3b82f6",
    offBorder: "#334155",
    onThumbShadow: "0 10px 24px -2px rgba(0, 0, 0, 0.7), 0 3px 6px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.95), inset 0 -2px 4px rgba(30, 58, 138, 0.35)",
    offThumbShadow: "0 8px 18px -2px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.8), inset 0 -2px 3px rgba(15, 23, 42, 0.4)",
    thumbBg: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 45%, #94a3b8 100%)",
    thumbBorder: "1px solid rgba(255,255,255,0.8)",
    labelColorOn: "#0f172a",
    labelColorOff: "#64748b",
    textShadow: "0 1px 1px rgba(255,255,255,0.85)",
  };

  const isDark = mode === "dark";
  const theme = isDark ? darkStyles : lightStyles;

  return (
    <div
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={`relative rounded-full cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        padding: `${padding}px`,
        background: isChecked ? theme.onBg : theme.offBg,
        boxShadow: isChecked ? theme.onShadow : theme.offShadow,
        border: `1px solid ${isChecked ? theme.onBorder : theme.offBorder}`,
        transition: "background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Thumb */}
      <div
        className="absolute rounded-full flex items-center justify-center pointer-events-none"
        style={{
          top: `${padding}px`,
          left: `${padding}px`,
          width: `${thumbWidth}px`,
          height: `${height - padding * 2}px`,
          background: theme.thumbBg,
          boxShadow: isChecked ? theme.onThumbShadow : theme.offThumbShadow,
          border: theme.thumbBorder,
          transform: `translateX(${isChecked ? travelDist : 0}px)`,
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
        }}
      >
        <span
          className="font-medium tracking-wide"
          style={{
            fontSize: `${Math.round(14 * scale)}px`,
            color: isChecked ? theme.labelColorOn : theme.labelColorOff,
            opacity: isChecked ? 1 : 0.7,
            textShadow: theme.textShadow,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            transition: "color 0.35s ease, opacity 0.35s ease",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
