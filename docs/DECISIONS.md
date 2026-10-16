# Architecture & Engineering Decisions Log (DECISIONS.md)

This log records all high-impact technical, architectural, UI/UX, and security decisions made during the redesign and development of the Dakhina Group digital showcase.

---

## Decision 1: Client-Side Variant Architecture (5 Switchable Variants)
- **Context:** The client requires 5 unique design concepts (Heritage Luxe, Modern Minimal, Midnight Estate, Tropical Resort, Editorial Bold) to evaluate live before selecting a single direction for production.
- **Decision:** 
  - Centralize domain models, data layers (`properties.json`, `content.en.json`, `content.bn.json`), filter state, comparison, favourites, and calculator math in shared modules (`src/data/`, `src/hooks/`, `src/lib/`, `src/components/shared/`).
  - Isolate each variant into its own directory under `src/variants/v1-heritage/`, `v2-minimal/`, `v3-midnight/`, `v4-tropical/`, `v5-editorial/`.
  - Each variant controls its layout, typography, micro-interactions, animations, and card presentation.
  - Implement a persistent floating Variant Switcher bar with deep link support (`?variant=X`), localStorage caching, smooth cross-fading, and a "Client Review Mode" with screenshot-ready summaries and keyboard shortcuts (1-5).
  - Provide a single global boolean flag `SHOW_SWITCHER` in configuration so the switcher can be removed instantaneously when the client confirms the winning design.

---

## Decision 2: Routing Strategy (HashRouter for Zero-Config GitHub Pages)
- **Context:** The site must deploy smoothly to free GitHub Pages or static web servers without requiring complex server rewrites or crashing on direct deep links.
- **Decision:** Use `HashRouter` (or HTML5 router with automated `404.html` redirect script provided). `HashRouter` guarantees 100% route reliability across all static hosting environments (GitHub Pages, GitLab Pages, S3, local preview, offline file protocol) while retaining query parameters for variant switching (`/#/properties/lakeview-villa-1?variant=3`).

---

## Decision 3: Armed Forces & Government Assets Protection
- **Context:** Dakhina Group's esteemed clients and institutional partners include the Bangladesh Air Force, BAF Welfare Trust, senior military officers, and government departments (RAJUK, DWASA, BWDB). Committing official government heraldry or military insignia into a public code repository raises copyright and institutional compliance concerns.
- **Decision:** 
  - Render crisp, vector-based neutral institutional trust badges with official typography and clean architectural emblems in the public demonstration code.
  - Create `docs/ASSETS_TO_REPLACE.md` providing an explicit drop-in directory (`public/client-assets/`) and filename manifest for the client's marketing team to supply high-resolution official vector assets upon staging deployment.

---

## Decision 4: Typography and Font Hosting
- **Context:** The design requirements specify unique typography pairs for each variant (Cormorant Garamond, Manrope, Fraunces, DM Serif Display, Plus Jakarta Sans, Space Grotesk, Inter) plus authentic Bengali typography (`Hind Siliguri` / `Noto Sans Bengali`). External calls to Google Fonts CDN introduce render-blocking latency and privacy leaks.
- **Decision:** Embed clean, optimized webfont declarations using system-fallbacks and local font loaders with `@fontsource` / embedded WOFF2, ensuring fast offline rendering, zero layout shifts, and total privacy compliance.

---

## Decision 5: Form Handling Without Backend Dependencies
- **Context:** The site is deployed as a fully static web app on GitHub Pages, but includes 4 interactive forms:
  1. Property Inquiry Form
  2. Request Callback
  3. Project Visit Schedule
  4. Career Application
- **Decision:** 
  - Provide a configurable environment variable `VITE_FORM_ENDPOINT`.
  - When `VITE_FORM_ENDPOINT` is configured, forms dispatch JSON payloads over HTTPS.
  - When no endpoint is set (demo mode), form submission gracefully processes client-side validation, anti-spam honeypot checks, and rate-limiting, displays an informative success toast, and provides a direct fallback action to open WhatsApp with pre-filled message text or a pre-populated mailto link. Under no circumstance is a fake submission claimed to be delivered if no endpoint responded.

---

## Decision 6: 48 Villa-Type Demo Properties & Sample Data Safeguard
- **Context:** 48 realistic villa listings across 7 categories are required for rich filtering, search, and comparison.
- **Decision:** 
  - Schema strictly typed and validated using `zod` (`src/data/schema.ts`).
  - Every demo listing includes `"demo": true` in the data.
  - The UI explicitly renders an elegant "Sample listing" badge on property cards and detail headers to maintain trust and prevent misinterpretation by viewers.

---

## Decision 7: Authentic Government & Defense Real Estate Identity (Screenshot Alignment)
- **Context:** User provided 4 screenshots from the live `https://dakhinagroup.com/` portal and requested strict fidelity to Dakhina Group's official government/defense authority and benchmarks against top Bangladesh real estate groups (Shanta, bti, Concord, Bashundhara).
- **Decision:**
  - Crawled and integrated authentic high-resolution imagery and statutory badges directly from `dakhinagroup.com` into `public/assets/dakhina-live/`.
  - Reconstructed the exact signature sections in Variant 1 (Dakhina Corporate Heritage):
    1. **Full-bleed Hero Drone Slider** (`beutyfication.jpg`, `DSCF8649.jpg`, `DSCF8646.jpg`) with orange `<` `>` arrows and integrated property search bar.
    2. **Our Respected Clients**: Circular emblems of the Bangladesh Air Force Welfare Trust (BAFWT) and Bangladesh Air Force (BAF) crest, with 4 retired Army General Officers (Tawhidul Islam, Abdul Alim Tarapder, Dr. Chowdhury Abdul Gaffar, Dr. Md Ashfaque Uzzaman) and verified plot badges.
    3. **Approved by Following Agencies**: Official round seals for RAJUK, DWASA, BWDB, Titas Gas, Fire Service, Police, DoE, DTCA, with a 4-photo on-site development progress strip (`60.jpg`, `beutyfication2.jpg`, `project_work3-1024x610.jpg`, `beutyfication4.jpg`).
    4. **Signature Green Milestone Ribbon**: 3 circular speedometer gauges (`6500 Total Plot`, `1800 Handed Over Plot`, `2000 Pending`) on an emerald green skyline banner.
    5. **DREL Landscaped Hedge & Video Showcase**: Iconic photo of the carved `DREL` bush in Kashful with interactive YouTube drone video modal (`jsMh07pOAy4`).
    6. **ECB Chattar Headquarters Map**: Google Map embed of Dakhina Tower (543/A ECB Chattar, Dhaka Cantonment).
    7. **Panoramic Green Footer**: `mirpur_view.jpg` background with 6-thumbnail project mini-gallery, ECB Chattar hotlines, and floating WhatsApp "Need Help?" widget.

