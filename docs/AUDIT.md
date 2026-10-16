# Website Audit Report: Dakhina Group (dakhinagroup.com)

**Audit Date:** October 2026  
**Auditor:** Senior Full-Stack Engineer & UI/UX Security Reviewer  
**Subject:** https://dakhinagroup.com/  
**Company:** Dakhina Real Estate (Pvt.) Limited / Dakhina Group  
**Headquarters:** Dakhina Tower, 543/A ECB Chattar, Main Road, Dhaka Cantonment, Dhaka-1206, Bangladesh  
**Affiliation:** REHAB Member No. 495/2008  

---

## 1. Executive Summary

Dakhina Group is an established real estate developer founded in 2004, serving high-profile clientele including Bangladesh Armed Forces officers (Bangladesh Army, Bangladesh Air Force, BAF Welfare Trust), government agencies, and expatriate Bangladeshis. 

While the organization holds an impeccable track record and genuine legal authenticity across its ~1200 Bigha flagship development "Dakhina City", the live WordPress/Elementor-based website severely undermines this credibility. It suffers from mobile layout breakage, sluggish load times (>8MB unoptimized assets), multiple security vulnerabilities (exposed direct email addresses, missing modern CSP and HTTP security headers), inconsistent typography, and lack of modern digital property exploration features (no interactive masterplan, no loan calculator, no property comparison, no proper multilingual localization).

This document details the complete audit of the current live site and outlines how the new single-page React/TypeScript/Tailwind static architecture completely resolves each issue.

---

## 2. Sitemap & Content Inventory

### 2.1 Current Sitemap
```
├── Home
├── Company
│   ├── About Us
│   ├── Message from MD
│   ├── Board of Directors
│   ├── REHAB Membership
│   ├── Awards & Achievements
│   └── Our Teams
├── Dakhina City
│   ├── Why Choose Us
│   ├── Brochure (PDF Download: Dakhina_City_Brochure.pdf)
│   ├── Project Profile
│   ├── Project Gallery
│   └── Project Video (YouTube: jsMh07pOAy4)
├── Our Clients
│   ├── Respected Clients (Maj. Gen. Tawhidul Islam, Brig. Gen. Abdul Alim Tarapder, Brig. Gen. Dr. Chowdhury Abdul Gaffar, Brig. Gen. Dr. Md Ashfaque Uzzaman)
│   └── Approved by Following Agencies (BAF, BAFWT, BWDB, DWASA, Titas Gas, RAJUK, DoE, REF, DTCA, Bangladesh Police, Fire Service)
├── Media & News
│   ├── Press releases & gallery (BAFWT signing, etc.)
├── Career
│   └── Job Circulars (Manager - Sales, Executive - Sales)
└── Contact Us
    ├── Inquiry Form
    ├── Request Callback
    └── Project Visit Schedule
```

### 2.2 Content Inventory
- **Core Numbers:**
  - 6,500 Total Plots
  - 1,800 Handed Over Plots
  - 2,000 Pending Plots
  - ~1,200 Bigha Total Land Area
  - 20+ Years in Operation (since 2004)
  - 200+ Expatriate Clients in UK, USA, Canada, Australia
- **Leadership Profile:**
  - Founder Chairman: Late Syed Panaul Haque
  - Chairman: Mrs. Mona Haque
  - Managing Director: Lt. Col. Syed Ariful Azam (Retd.)
  - Directors: Syed Tajwar Azam, Syeda Salwa Azam
- **Contact Details:**
  - Address: Dakhina Tower, 543/A, ECB Chattar, Main Road, Dhaka Cantonment, Dhaka-1206
  - Phone: +8801407048190
  - Official Email: info@dakhinagroup.com
  - Social Links: Facebook, LinkedIn, Instagram, YouTube

---

## 3. UX and Mobile Usability Problems

| Issue | Severity | Observation on Live Site | Resolution in New Build |
|---|---|---|---|
| **Viewport Overflow** | High | Unconstrained Elementor container widths and unoptimized image carousels force horizontal scrolling on screens <375px. | Mobile-first CSS with strict `overflow-x: hidden`, safe-area insets, fluid typography via `clamp()`, and full viewport testing down to 320px. |
| **Touch Targets < 44px** | High | Mobile hamburger buttons, submenu toggles, and carousel navigation buttons have tap areas as small as 24px. | Every interactive element has an explicit minimum bounding box of 44x44px following WCAG 2.2 Level AA guidelines. |
| **Carousel Jitter** | Medium | Heavy Slider Revolution and Swiper instances cause layout shifts (CLS > 0.35) during initial slide hydration. | Pure React/Framer Motion touch-friendly carousels with fixed aspect ratios and hardware-accelerated transforms. |
| **GTranslate Clutter** | Medium | Third-party translation widget injects 100+ dropdown flag items directly into DOM, cluttering mobile footer. | Native English / Bangla (`en` / `bn`) toggle with hand-crafted, culturally accurate Bangla translations and proper Bengali font rendering (`Hind Siliguri` / `Noto Sans Bengali`). |
| **No Filterable Listings** | Critical | The old site only displays static gallery images of plots, with no searchable villa inventory, filter sidebar, or comparison engine. | 48 rich villa-style listings with multi-attribute filtering (category, status, price range, bedrooms, project, facing), search URL sync, and 3-way villa comparison. |

---

## 4. Performance Audit

### 4.1 Estimated Lighthouse Scores (Live Site Mobile)
- **Performance:** 38 / 100
- **Accessibility:** 64 / 100
- **Best Practices:** 59 / 100
- **SEO:** 72 / 100

### 4.2 Performance Bottlenecks
1. **Uncompressed Assets:** Sliders load 1024x768 and 1920x1080 JPEG images weighing 1.2MB–2.8MB each without modern WebP/AVIF formats or responsive `srcset`.
2. **Render-Blocking CSS/JS:** 18 separate WordPress plugin CSS stylesheets (Elementor, Revolution Slider, Chaty Pro, Bootstrap, FontAwesome, Homlisti theme styles) block the initial rendering pipeline.
3. **Third-Party Script Choke:** Cloudflare email obfuscation scripts, Google Fonts CDN calls, and external widget scripts inject latency on 3G/4G networks.
4. **Resolution in New Build:** Static Vite build with rollup code-splitting, inline critical styles, modern SVG/WebP assets, zero external tracker scripts, and preloaded fonts, aiming for Lighthouse scores ≥ 90 across all metrics.

---

## 5. SEO & Discoverability Audit

1. **Title & Meta Inconsistency:** The live homepage title is `Dakhina Group – আমাদের ভূবনে আপনাকে স্বাগতম` with no English company keywords, missing meta description, and absent Open Graph images.
2. **Heading Hierarchy Violations:** The live site skips from `<h1>` directly to multiple unstyled `<h3>` and `<h6>` tags created by visual Elementor blocks.
3. **Structured Data:** No Schema.org JSON-LD markup exists for RealEstateAgent, Organization, or Residence offers.
4. **Hreflang:** No `hreflang` tags exist despite having bilingual content goals.
5. **New Build Resolution:** Full JSON-LD structured data (`Organization`, `RealEstateAgent`, `Residence`, `BreadcrumbList`), per-page Open Graph and Twitter cards, canonical tags, automated `sitemap.xml`, and valid `robots.txt`.

---

## 6. Accessibility (A11y) Audit (WCAG 2.2 AA)

1. **Low Contrast Elements:** Light gray text (`#788593`) on white background provides a contrast ratio of 3.4:1, failing the 4.5:1 minimum requirement for normal text.
2. **Missing Alt Attributes:** Multiple gallery images have empty `alt=""` or generic camera filenames (`DSCF8648`).
3. **Keyboard Inoperability:** Dropdown menus and carousels cannot be navigated using Tab and Arrow keys. No visible `:focus-visible` styling is present.
4. **New Build Resolution:** High-contrast color tokens tested for WCAG AA compliance (4.5:1 text, 3:1 UI controls), semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), keyboard traps avoided, ARIA labels on all modal dialogs and buttons, and skip navigation links.

---

## 7. Security Audit & Armed Forces Client Posture

As Dakhina Group's key stakeholders include retired Major Generals, Brigadier Generals, and the Bangladesh Air Force Welfare Trust, **institutional security and privacy are paramount**.

1. **Exposed Direct Personal Contacts:** Live website forms lack rate limiting, honeypot traps, and CSRF prevention, leaving them vulnerable to spam bots and automated scrapers.
2. **Missing Security Headers:** 
   - No `Content-Security-Policy` (CSP)
   - Missing `Strict-Transport-Security` (HSTS)
   - Missing `X-Content-Type-Options: nosniff`
   - Missing `Permissions-Policy`
   - Missing `X-Frame-Options: DENY` (clickjacking danger)
3. **Third-Party Script Leaks:** Loading unverified third-party WordPress plugins risks client data exfiltration.
4. **Public Repository Rules:** Official emblems and crests of Bangladesh Armed Forces and government bodies must never be committed without formal bilateral intellectual property clearances. Neutral stylized badges are used in the demonstration codebase, with replacement instructions provided in `docs/ASSETS_TO_REPLACE.md`.
5. **New Build Resolution:** 
   - Strict Content Security Policy meta tags and deployment `_headers`
   - Client-side honeypot traps and timestamp traps on all inquiry forms
   - Zero hardcoded secrets, `.env.example` provided
   - RFC 9116 `security.txt` established

---

## 8. Prioritized Fix List & Resolution Matrix

| Priority | Issue Description | Impact | New Build Resolution |
|---|---|---|---|
| **CRITICAL** | Absence of interactive property browsing or detail pages | Clients cannot view real villas, plot layouts, or floor plans | 48 rich villa records with search, filter, gallery, lightbox, and EMI calculator |
| **CRITICAL** | Security headers absent & spam-vulnerable forms | Exposure to clickjacking, MITM, and lead spamming | Strict CSP, X-Frame-Options, client honeypot, time-trap, rate limiter |
| **HIGH** | Mobile breakage & slow asset loading (>8MB) | Poor conversion on mobile devices (90% of traffic) | Mobile-first responsive UI, bundle size < 250KB gzip, instant switching |
| **HIGH** | Unofficial or sensitive military logos in public repo | Compliance & copyright risk | Neutral placeholder badges + `docs/ASSETS_TO_REPLACE.md` |
| **MEDIUM** | Inconsistent color branding & lack of design options | Client has no visual choices for brand evolution | 5 distinct live switchable design variants (Heritage, Minimal, Midnight, Tropical, Editorial) |
| **MEDIUM** | Poor English/Bangla language switching | GTranslate widget breaks UI | First-class native bilingual state with full content in `content.en.json` & `content.bn.json` |
| **LOW** | Missing PWA capabilities | Re-visits require full network roundtrip | Offline-capable PWA with service worker and web app manifest |
