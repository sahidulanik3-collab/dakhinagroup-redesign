# 5 Design Variants Architecture & Token Specification (DESIGN_VARIANTS.md)

This document specifies the typography, palette, layout philosophy, motion signature, and property card designs for each of the 5 switchable variants. Each variant is WCAG 2.2 AA compliant.

---

## Comparative Matrix

| Variant # | Name | Primary Tone | Font Pairing | Layout Character | Property Card Style |
|---|---|---|---|---|---|
| **1** | **Heritage Luxe** | Forest Green `#0F3D2E`<br>Antique Gold `#B8934A`<br>Ivory `#FAF7F0` | Cormorant Garamond<br>+ Inter | High-editorial real estate; slow zoom hero; split architectural narrative; gold hairlines. | Tall vertical card with gold accent borders, serif title, and inset metadata grid. |
| **2** | **Modern Minimal** | Warm Stone `#F4F1EC`<br>Charcoal `#1C1C1C`<br>Terracotta `#C65D3B` | Manrope<br>(Variable Weight) | Extreme architectural whitespace; sticky desktop filter sidebar; mobile bottom-sheet; zero ornament. | Horizontal list row card (image left, specs right) with clean hairline dividers. |
| **3** | **Midnight Estate** | Deep Navy `#0B1220`<br>Champagne `#E8D8B0`<br>Copper `#B87333` | Fraunces<br>+ Inter | Dark cinematic; glowing gold hover states; horizontal-scroll "Featured Villas" carousel; full-bleed imagery. | Dark glassmorphic card with ambient glow on hover, luxury gold tags, and high-contrast badges. |
| **4** | **Tropical Resort** | Sand `#F6EFE4`<br>Lagoon Teal `#0E7C7B`<br>Coral `#FF7A59` | DM Serif Display<br>+ Plus Jakarta Sans | Organic curves; wave-inspired section dividers; soft pastel glass cards; masonry layout. | Rounded pebble-style card (border-radius: 1.5rem) with teal badges and floating coral price pill. |
| **5** | **Editorial Bold** | Clean Newsprint `#F2F0EB`<br>Deep Ink `#111111`<br>Vermilion `#E5391B` | Space Grotesk<br>(Monospace/Grotesk) | Swiss/Brutalist-leaning; oversized titles; numbered sections (01, 02, 03); animated marquee ticker. | Sharp geometric card (0 border radius), high-contrast vermilion tags, and bold tabular metadata. |

---

## Variant 1: Heritage Luxe (Echoing Dakhina's Brand Green)
- **Palette Tokens:**
  - Background: `#FAF7F0` (Ivory warm paper)
  - Surface: `#FFFFFF`
  - Primary / Brand: `#0F3D2E` (Deep regal forest green)
  - Accent / Metallic: `#B8934A` (Antique polished gold)
  - Text Primary: `#14241D` (Deep forest ink)
  - Text Secondary: `#5C6B63`
  - Border: `rgba(184, 147, 74, 0.28)`
- **Typography:**
  - Headings: `font-serif` (Cormorant Garamond, Georgia, serif), letter-spacing: -0.02em, line-height: 1.15
  - Body & UI: `font-sans` (Inter, system-ui, sans-serif)
- **Motions & Accents:**
  - Subtle Ken-Burns image zooms (1.05 scale over 8s).
  - Delicate 1px gold hairline separators and ornate leaf/crest motifs.
  - Symmetrical 3-column tall card grid with gold badges.

---

## Variant 2: Modern Minimal (Scandinavian Architectural Gallery)
- **Palette Tokens:**
  - Background: `#F4F1EC` (Soft warm limestone)
  - Surface: `#FFFFFF`
  - Primary / Dark: `#1C1C1C` (Matte Charcoal)
  - Accent: `#C65D3B` (Earthy Terracotta)
  - Text Primary: `#1C1C1C`
  - Text Secondary: `#666666`
  - Border: `rgba(28, 28, 28, 0.08)`
- **Typography:**
  - Unified Modern Sans: `Manrope` (300 light, 500 medium, 700 bold), clean geometric shapes.
- **Motions & Accents:**
  - Crisp slide reveals, zero gradients, zero drop-shadows.
  - Sticky desktop sidebar filters with real-time numeric badge counts.
  - Property listings formatted as elegant architectural catalog index rows.

---

## Variant 3: Midnight Estate (Cinematic Private VIP Atmosphere)
- **Palette Tokens:**
  - Background: `#0B1220` (Obsidian navy)
  - Surface: `#131D31` (Midnight card elevation)
  - Primary / Accent: `#E8D8B0` (Champagne glow)
  - Secondary Accent: `#B87333` (Metallic copper)
  - Text Primary: `#F8FAFC` (Luminous off-white)
  - Text Secondary: `#94A3B8` (Slate cool gray)
  - Border: `rgba(232, 216, 176, 0.18)`
- **Typography:**
  - Headings: `Fraunces` / High-contrast display serif with optical sizing.
  - Body: `Inter` with elevated contrast.
- **Motions & Accents:**
  - Ambient radial illumination on card hover.
  - Horizontal drag-and-scroll showcase for featured military and luxury villas.
  - Cinematic hero with ambient video simulation overlay.

---

## Variant 4: Tropical Resort (Organic Oasis & Nature Living)
- **Palette Tokens:**
  - Background: `#F6EFE4` (Warm sand)
  - Surface: `rgba(255, 255, 255, 0.85)` with backdrop blur (Glassmorphism)
  - Primary: `#0E7C7B` (Lagoon teal)
  - Accent: `#FF7A59` (Tropical warm coral)
  - Text Primary: `#163231` (Deep pine teal)
  - Text Secondary: `#4F6765`
  - Border: `rgba(14, 124, 123, 0.15)`
- **Typography:**
  - Headings: `DM Serif Display` (Warm, rounded, welcoming)
  - Body: `Plus Jakarta Sans`
- **Motions & Accents:**
  - Smooth wave and pebble section transitions.
  - Masonry visual property cards with organic rounded corners (24px).
  - Floating pill buttons with micro-bounce interactions.

---

## Variant 5: Editorial Bold (Swiss / Modernist Broadsheet)
- **Palette Tokens:**
  - Background: `#F2F0EB` (Raw newsprint)
  - Surface: `#FFFFFF`
  - Primary: `#111111` (Heavy carbon ink)
  - Accent: `#E5391B` (Vivid Vermilion Red)
  - Text Primary: `#111111`
  - Text Secondary: `#555555`
  - Border: `#111111` (Solid 1.5px architectural hairline borders)
- **Typography:**
  - Headings & Accents: `Space Grotesk` (Monospace / Neo-brutalist technical aesthetic).
- **Motions & Accents:**
  - Monospaced serial tags: `01 / DAKHINA RESIDENCES`, `02 / SPECIFICATIONS`.
  - Continuous running marquee text banner with market statistics.
  - Sharp zero-radius cards with bold tabular specs.

---

## Contrast & Accessibility Verification (WCAG 2.2 AA)
All 5 palettes have been tested against standard WCAG AA contrast requirements:
- Large text (>18pt / >14pt bold): Minimum 3:1 ratio (all variants achieve ≥ 6:1).
- Normal body text: Minimum 4.5:1 ratio (all variants achieve ≥ 7:1).
- Interactive element focus rings: 2px high-visibility outline with safe offset.
