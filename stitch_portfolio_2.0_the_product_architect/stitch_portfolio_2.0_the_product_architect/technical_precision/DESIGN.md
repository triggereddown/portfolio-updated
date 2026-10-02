---
name: Technical Precision
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap-lg: 160px
  section-gap-md: 80px
---

## Brand & Style
The design system is engineered to project the persona of an elite Senior Product Engineer: someone who operates at the intersection of high-fidelity aesthetics and robust system architecture. The brand personality is **Technical, Precise, and Authoritative**, emphasizing the ability to bridge the gap between abstract design and scalable code.

The visual style is a fusion of **Modern Corporate** and **Glassmorphism**, heavily inspired by industry leaders like Vercel and Linear. It utilizes a "Dark Mode First" philosophy, prioritizing deep obsidian surfaces, ultra-fine borders (sub-pixel aesthetics), and controlled light leaks. The emotional response should be one of absolute trust in technical competence, feeling like a high-performance IDE or a mission-control dashboard.

## Colors
The palette is rooted in a deep charcoal and black foundation to establish a premium, focused environment. 

- **Primary (Electric Blue):** Used for primary actions, focus states, and key interactive landmarks.
- **Secondary (Deep Purple):** Employed for sophisticated gradients, hover states, and to differentiate "architectural" or "system-level" content.
- **Tertiary (Emerald):** Reserved for "success" indicators, deployment status, and live performance metrics.
- **Neutral (Zinc/Slate):** A range of greys from `#09090B` (Background) to `#FAFAFA` (Text), ensuring high legibility and professional contrast levels.

Gradients should be used sparingly as "light leaks" or subtle linear strokes to guide the eye toward featured projects or call-to-action buttons.

## Typography
This design system utilizes **Geist** for all primary interface elements, providing a clean, geometric, and technical feel that scales perfectly from massive hero headlines to dense body copy. **JetBrains Mono** is introduced for labels, badges, and code snippets to reinforce the engineer-centric nature of the portfolio.

- **Scale:** Use tight tracking on large headings to create a "machined" look.
- **Hierarchy:** Maintain a clear distinction between technical metadata (Monospace) and narrative content (Sans-serif).
- **Legibility:** Body text uses a generous line height (1.6) to ensure long-form case studies remain readable during deep-dive reviews.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop, centering content within a 1200px container to maintain focus and prevent visual fatigue. A 12-column system is used for project grids and system architecture sections.

- **White Space:** Generous vertical spacing (`section-gap-lg`) is used to separate distinct case studies, allowing each "product" room to breathe.
- **Rhythm:** All spacing is derived from a 4px base unit.
- **Mobile Adaptivity:** On mobile, margins shrink to 20px, and the 12-column grid collapses into a single-column stack, ensuring that technical diagrams remain zoomable or horizontally scrollable.

## Elevation & Depth
Elevation in this design system is achieved through **Tonal Layering** and **Glassmorphism**, rather than heavy shadows.

- **Level 0 (Base):** Deep obsidian (`#09090B`).
- **Level 1 (Cards):** Slightly lighter surface (`#121214`) with a 1px border of `#FFFFFF10`.
- **Level 2 (Modals/Popovers):** Semi-transparent background with a 12px backdrop blur and a more prominent top-down gradient border to simulate a light source.
- **Interactive States:** When hovering over cards, apply a subtle "inner glow" or a very soft, diffused primary-color shadow (15% opacity) to indicate interactivity without breaking the flat, technical aesthetic.

## Shapes
The shape language is **Soft (Level 1)**, utilizing small corner radii to maintain a crisp, professional, and slightly "industrial" feel. 

- **Standard Elements:** 4px (0.25rem) radius for inputs and small buttons.
- **Cards/Sections:** 8px (0.5rem) to 12px (0.75rem) for larger containers. 
- **Tech Badges:** Use a "squircle" or slightly higher radius (16px) to contrast against the rigid structural elements.

This choice balances the coldness of a purely "sharp" design with the modern approachability of rounded interfaces.

## Components

### Buttons
- **Primary:** High-contrast white background with black text. On hover, a subtle scale-down (98%) and a primary-color outer glow.
- **Secondary:** Ghost style. Transparent background with a 1px zinc border. On hover, background shifts to a very subtle grey (`#FFFFFF05`).

### Cards (Project & Architecture)
- Cards feature a sub-pixel border and a very subtle linear gradient (Top-Left to Bottom-Right).
- **Architecture Cards:** Dedicated containers for Mermaid.js or SVG diagrams, featuring a "dot-grid" background pattern to simulate a canvas.

### Badges (Tech Stack)
- Small, low-contrast labels using **JetBrains Mono**. 
- Backgrounds are slightly tinted with the brand color (e.g., 10% Blue tint for React, 10% Green tint for Node.js) to provide a quick visual scan of the stack.

### Input Fields
- Dark, recessed fields with a 1px border that glows Primary Blue on focus. Labels sit strictly above the input in `label-md` mono-type.

### System Diagrams
- Connectors between elements should be 1px solid lines with a subtle pulse animation for "active" data paths. Use "Tertiary Emerald" for live nodes and "Neutral" for idle ones.