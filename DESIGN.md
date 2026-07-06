---
name: Neon Terminal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c5c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9378'
  outline-variant: '#444933'
  surface-tint: '#aed500'
  primary: '#ffffff'
  on-primary: '#293500'
  primary-container: '#c7f300'
  on-primary-container: '#576c00'
  inverse-primary: '#526600'
  secondary: '#d3fbff'
  on-secondary: '#00363a'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#ffffff'
  on-tertiary: '#1c333e'
  tertiary-container: '#cde6f4'
  on-tertiary-container: '#506873'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c7f300'
  primary-fixed-dim: '#aed500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4d00'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#cde6f4'
  tertiary-fixed-dim: '#b2cad8'
  on-tertiary-fixed: '#051e28'
  on-tertiary-fixed-variant: '#334a55'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

This design system is engineered for the modern developer—one who values precision, performance, and high-contrast aesthetics. The brand personality is "Technical Excellence," projecting an image of a professional who is deeply immersed in the terminal but has the design sensibility of a product-focused engineer.

The design style is a hybrid of **Minimalism** and **Glassmorphism**, specifically optimized for dark environments. It leverages high-contrast accents (Cyber Lime) against deep obsidian backgrounds to ensure that key information and calls-to-action are impossible to miss. "Code aesthetic" elements, such as bracketed labels, mono-spaced data points, and subtle grid overlays, reinforce the developer-centric narrative. The emotional response should be one of focused energy, clarity, and technical authority.

## Colors

The color palette is built on a foundation of absolute blacks and deep charcoals to maximize visual comfort during late-night sessions and provide a canvas for vibrant accents.

- **Primary (Cyber Lime):** Used exclusively for high-priority actions, active states, and critical highlights.
- **Secondary (Neon Cyan):** Used for technical secondary information, links, and code-related syntax highlighting elements.
- **Neutrals:** A scale of grays from `#050505` (Background) to `#A3A3A3` (Subtle Text). 
- **Surface Tones:** Layers are defined by varying levels of charcoal, ensuring depth without relying on heavy shadows.

Use color sparingly. The interface should feel monochromatic and "dimmed" until an interaction occurs, at which point the primary accent color "ignites" the component.

## Typography

Typography follows a strict hierarchy. **Inter** provides the structural, highly-legible framework for all prose and navigation. Its tight tracking and high x-height convey a contemporary, engineered feel.

**JetBrains Mono** is utilized for any data that is "system-generated" or "technical." This includes metadata, labels, tags, and actual code blocks. All labels should be treated with the `label-caps` style to distinguish them from editorial content. Headlines use aggressive negative letter-spacing and heavy weights to create a "brutal" and confident visual impact.

## Layout & Spacing

The layout uses a **Fluid Grid** based on an 8px rhythm, ensuring mathematical alignment of all elements. 

- **Desktop (12 Columns):** 64px outer margins. Content is centered with a max-width of 1280px to prevent excessive line lengths.
- **Tablet (8 Columns):** 32px outer margins.
- **Mobile (4 Columns):** 16px outer margins.

Spacing should be generous to allow the "minimalist" aesthetic to breathe. Use "Bracketed Padding" for technical sections—visualizing the boundaries of a container using thin 1px borders rather than solid backgrounds. Elements should align to a strict vertical axis to maintain the feeling of a structured code editor.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Glassmorphism**, avoiding traditional soft shadows which can feel too "organic" for a developer tool.

- **Level 0 (Background):** Pure `#050505`.
- **Level 1 (Cards/Panels):** `#121212` with a 1px border of `#262626`.
- **Level 2 (Overlays/Modals):** Glassmorphic effect using a background of `rgba(18, 18, 18, 0.7)` with a `20px` backdrop-blur.
- **Interactive Depth:** When hovering over a card, the 1px border should transition from `#262626` to the Primary Cyber Lime, creating a "glow" effect without adding physical elevation.

## Shapes

The design system uses **Soft** roundedness (4px) to maintain a precise, technical edge. While fully sharp corners can feel too harsh, a small radius provides a hint of modern software refinement. 

- **Small elements (Buttons, Inputs):** 4px radius.
- **Large elements (Cards, Containers):** 8px radius.
- **Status indicators:** Circular (Full pill) for a distinct visual break from the rectangular grid.

## Components

### Buttons
- **Primary:** Solid Cyber Lime background, black text. No border. On hover, a subtle outer glow of the same color.
- **Secondary:** Transparent background, 1px Cyber Lime border, Cyber Lime text.
- **Ghost:** Monospaced text with `>` prefix. Text color is neutral-400, turning Primary on hover.

### Code Blocks
- Background of `#0A0A0A`. 
- Top bar containing the file name in `label-caps` and a "Copy" icon.
- Syntax highlighting should use a limited palette of Cyber Lime and Neon Cyan.

### Inputs
- Dark background with a 1px bottom-border only by default. 
- On focus, the border animates to full 4-sided Primary color.
- Placeholder text in JetBrains Mono at 50% opacity.

### Cards (Project Cards)
- Subtle grid pattern background (10% opacity) to evoke a blueprint feel.
- Tags/Chips: Small, monospaced labels enclosed in `[brackets]`.
- Image containers: Grayscale by default, transitioning to full color on hover.

### Status Indicators
- A pulsing dot icon (using Primary or Secondary) to indicate "Open for Work" or "System Online" status.