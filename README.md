# Dakhina Group — Premium Website Redesign & Client Demo

> **"Architect of Trust"** — REHAB Member #495  
> Headquartered at Dakhina Tower, 543/A ECB Chattar, Main Road, Dhaka Cantonment, Dhaka-1206.  
> Live Existing Site: [https://dakhinagroup.com/](https://dakhinagroup.com/)

[![CI](https://github.com/dakhinagroup/redesign-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/dakhinagroup/redesign-demo/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/dakhinagroup/redesign-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/dakhinagroup/redesign-demo/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%205.7-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](./LICENSE)

---

## 1. Project Overview

This repository houses the modern, mobile-first website redesign for **Dakhina Group** (Dakhina Real Estate Pvt. Ltd.), one of Bangladesh's premier real-estate developers. 

Because Dakhina Group serves distinguished clientele including the **Bangladesh Air Force (BAF)**, **BAF Welfare Trust**, senior retired military officers (Major Generals, Brigadier Generals), and statutory government agencies, **trust, institutional security, legal transparency, and sober elegance** are the core design priorities.

### The 5 Switchable Design Variants

This build features a live **Design Switcher** fixed at the top, allowing the client, board of directors, and marketing committee to evaluate 5 distinct architectural personalities with instant cross-fading, URL synchronization, and a screenshot-ready summary modal:

| # | Variant Name | Color Palette | Typography | Personality & Architectural Layout |
|---|---|---|---|---|
| **1** | **Heritage Luxe** | Forest Green (`#0F3D2E`), Gold (`#B8934A`), Ivory (`#FAF7F0`) | *Cormorant Garamond + Inter* | Classic editorial with gold hairlines, slow-zoom hero imagery, and tall 3-column cards echoing the brand's heritage green. |
| **2** | **Modern Minimal** | Warm Stone (`#F4F1EC`), Charcoal (`#1C1C1C`), Terracotta (`#C65D3B`) | *Manrope* | Maximum whitespace, razor-thin lines, list-style property rows with sticky filters. |
| **3** | **Midnight Estate** | Deep Navy (`#0B1220`), Champagne (`#E8D8B0`), Copper (`#B87333`) | *Fraunces + Inter* | Cinematic dark aesthetic, full-bleed hero, glowing interactive states, and immersive property cards. |
| **4** | **Tropical Resort** | Sand (`#F6EFE4`), Lagoon Teal (`#0E7C7B`), Coral (`#FF7A59`) | *DM Serif Display + Plus Jakarta Sans* | Organic curves, frosted glass cards, wavy natural water body dividers, and lakeside resort feel. |
| **5** | **Editorial Bold** | Off-White (`#F2F0EB`), High Ink (`#111111`), Vermilion (`#E5391B`) | *Space Grotesk* | Swiss/brutalist influence, oversized display numbers, asymmetrical grids, and high contrast. |

---

## 2. Key Features

- **Instant Variant Switching**: Switch on the fly via top pill bar, URL query parameters (`?variant=1` through `?variant=5`), or keyboard shortcuts `1`, `2`, `3`, `4`, `5`.
- **Client Review Mode**: One-click summary modal providing exact color swatches, font pairings, and variant rationale ready for executive decision-making.
- **Bilingual Support (English & বাংলা)**: Full content translation across all pages with genuine Bangla typography (`Hind Siliguri`).
- **48 Villa Listings**: Complete dataset across 7 villa categories (Lakeview, Garden, Duplex, Twin, Courtyard, Corner, Cottage Studio). All records are strictly marked with `"demo": true` and display sample badges.
- **Interactive Leaflet Maps**: OpenStreetMap integration showing exact coordinates for **Dakhina Tower (ECB Chattar)** and **Dakhina City (1,200 Bigha Township, Savar)** without requiring third-party API keys.
- **BDT Loan & EMI Calculator**: Accurate calculation of down payments, principal, monthly EMI, total interest, and an annual amortization preview in Bangladeshi Taka.
- **Secure Anti-Spam Forms**: Inquiry, Callback, Site Visit Schedule, and Career applications protected with hidden honeypot fields, submission time-traps (minimum 2.0s human fill), and fallback to prefilled WhatsApp / mailto links.
- **Lenis Smooth Scroll & Motion**: Fluid kinetic scrolling respecting user `prefers-reduced-motion` settings.
- **Progressive Web App (PWA)**: Web manifest, cache-first Service Worker, and offline fallback page (`offline.html`).
- **Comprehensive Sitemaps & Subpages**: Includes About Us, Message from MD, Board of Directors, REHAB Membership #495, Awards & Achievements, Our Teams, Our Clients, Media & News, Career, and Contact Us.

---

## 3. Getting Started

### Prerequisites

- Node.js `v20.x` or `v22.x` (or `v24.x`)
- npm `v10.x` or `v11.x`

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/dakhinagroup/redesign-demo.git
cd redesign-demo

# Install pinned dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 4. Verification & Testing

Every build must satisfy strict quality gates:

```bash
# 1. TypeScript Strict Typecheck (zero errors)
npm run typecheck

# 2. ESLint (zero errors, zero warnings)
npm run lint

# 3. Vitest Unit Test Suite (19 tests across schema, math, filters, security)
npm run test

# 4. Production Build (Rollup chunks & asset hashing)
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 5. Project Architecture

```
dakhina-group-website/
├── public/
│   ├── assets/              # SVG logos, floor plans, agency badges, property imagery
│   ├── _headers             # Production CSP & security headers (Cloudflare/Netlify)
│   ├── .well-known/         # RFC 9116 security.txt
│   ├── 404.html             # SPA fallback for static hosting
│   ├── manifest.webmanifest # PWA configuration
│   ├── offline.html         # Offline fallback
│   ├── robots.txt           # Search engine crawling rules
│   ├── sitemap.xml          # Multilingual XML sitemap
│   └── sw.js                # Service Worker
├── src/
│   ├── app/                 # App.tsx root, HashRouter, Lenis provider
│   ├── components/
│   │   ├── shared/          # Navbar, Footer, PropertyCard (5 layouts), LeafletMap,
│   │   │                    # LoanCalculator, Lightbox, CompareBar, FloatingWhatsApp
│   │   │   └── Forms/       # Inquiry, Callback, VisitSchedule, Career forms
│   │   └── switcher/        # VariantSwitcher top bar
│   ├── data/
│   │   ├── content.en.json  # Authentic English copy & leadership data
│   │   ├── content.bn.json  # Accurate Bengali translations
│   │   ├── properties.json  # Exactly 48 demo villa listings
│   │   └── schema.ts        # Zod validation schemas
│   ├── hooks/               # useVariant, useLanguage, useFavourites, useCompare
│   ├── lib/                 # utils.ts (formatBDT, calculateLoanEmi, validateFormSecurity)
│   ├── pages/               # 15 complete pages matching the full sitemap
│   ├── styles/              # index.css (5 theme tokens, print stylesheet)
│   └── test/                # schema, calculator, forms, filters tests
├── docs/                    # AUDIT.md, DECISIONS.md, DESIGN_VARIANTS.md,
│                            # ADDING_PROPERTIES.md, ASSETS_TO_REPLACE.md,
│                            # IMAGE_CREDITS.md, SECURITY_CHECKLIST.md, HANDOVER.md
├── index.html               # Strict CSP meta tag, JSON-LD schema, Google Fonts
├── vite.config.ts           # Base path, alias, Rollup manualChunks
└── package.json             # NPM scripts and overrides
```

---

## 6. Deployment Guide

### GitHub Pages (Automated via GitHub Actions)

The repository includes a ready-to-run GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Initialize git and push to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Dakhina Group redesign demo with 5 design variants"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USER>/<REPO_NAME>.git
   git push -u origin main
   ```
2. In GitHub, navigate to **Settings** → **Pages** → **Build and deployment**.
3. Under **Source**, select **GitHub Actions**.
4. The deployment workflow will trigger automatically and publish to:
   `https://<YOUR_USER>.github.io/<REPO_NAME>/`

### VPS / Nginx Production

For dedicated hosting, use the provided configuration file in `docs/NGINX_HEADERS.conf` which enforces HSTS, strict Content Security Policy, X-Frame-Options: DENY, and gzip compression.

---

## 7. Sample Data Notice

All property listings, pricing estimates, and floor plan dimensions in `src/data/properties.json` are **demonstration sample data** generated for presentation purposes and marked with `"demo": true`. They do not represent final commercial inventory. 

To replace sample data with actual real estate listings, refer to [docs/ADDING_PROPERTIES.md](docs/ADDING_PROPERTIES.md). To replace placeholder heraldry badges with official armed forces crests, refer to [docs/ASSETS_TO_REPLACE.md](docs/ASSETS_TO_REPLACE.md).

---

## 8. License & Confidentiality

Copyright © 2004–2026 Dakhina Real Estate (Pvt) Limited and its client partners. All rights reserved. Proprietary software for demonstration and review.
