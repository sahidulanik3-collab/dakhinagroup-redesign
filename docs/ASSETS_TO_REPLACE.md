# Assets Replacement Guide: Dakhina Group (ASSETS_TO_REPLACE.md)

This document provides instructions for Dakhina Group's marketing and media team on replacing placeholder demonstration assets with production-grade official photography and authorized institutional crests.

---

## 1. Compliance Notice Regarding Official Badges

To respect institutional regulations and avoid committing protected insignia into a public GitHub repository, this demonstration build uses stylized vector placeholder badges for all military welfare trusts and government statutory agencies.

Before commercial production deployment, replace the files in `public/assets/approvals/` with high-resolution authorized SVG or transparent PNG assets:

| Placeholder ID | Institution Name | File Path in Staging | Recommended Dimensions | Notes |
|---|---|---|---|---|
| `baf-badge` | Bangladesh Air Force (BAF) | `public/assets/approvals/baf.png` | 400x400 transparent PNG / SVG | Authorized welfare / liaison crest |
| `bafwt-badge` | BAF Welfare Trust (BAFWT) | `public/assets/approvals/bafwt.png` | 400x400 transparent PNG / SVG | Welfare trust official insignia |
| `rajuk-badge` | RAJUK (Rajdhani Unnayan Kartripakkha) | `public/assets/approvals/rajuk.png` | 400x400 transparent PNG / SVG | DAP approval reference badge |
| `wasa-badge` | Dhaka WASA | `public/assets/approvals/wasa.png` | 400x400 transparent PNG / SVG | Utility compliance certificate |
| `titas-badge` | Titas Gas T&D Co. Ltd. | `public/assets/approvals/titas.png` | 400x400 transparent PNG / SVG | Transmission approval badge |
| `bwdb-badge` | Bangladesh Water Development Board | `public/assets/approvals/bwdb.png` | 400x400 transparent PNG / SVG | Hydrology compliance |
| `doe-badge` | Department of Environment (DoE) | `public/assets/approvals/doe.png` | 400x400 transparent PNG / SVG | Environmental clearance certificate |
| `police-badge` | Bangladesh Police | `public/assets/approvals/police.png` | 400x400 transparent PNG / SVG | Security jurisdiction clearance |
| `fire-badge` | Fire Service & Civil Defence | `public/assets/approvals/fire.png` | 400x400 transparent PNG / SVG | Fire safety & accessibility clearance |

---

## 2. Executive Leadership Portraits

Replace sample leadership photography with official studio portraits in `public/assets/leadership/`:

- `md.jpg` (Managing Director: Lt. Col. Syed Ariful Azam Retd.) – 800x1000px, 4:5 aspect ratio, neutral executive studio background.
- `chairman.jpg` (Chairman: Mrs. Mona Haque) – 800x1000px, 4:5 aspect ratio.
- `founder.jpg` (Founder Chairman: Late Syed Panaul Haque) – 800x1000px, 4:5 aspect ratio.
- `director-tajwar.jpg` (Director: Syed Tajwar Azam) – 800x1000px.
- `director-salwa.jpg` (Director: Syeda Salwa Azam) – 800x1000px.

---

## 3. High-Resolution Project & Villa Photography

The project demo currently contains architectural SVG diagrams and royalty-free architectural models. For real inventory:

- Directory: `public/assets/properties/<property-slug>/`
- Formats: WebP or AVIF (compressed with quality 85).
- Suggested resolutions:
  - Hero image: 1920x1080px (16:9)
  - Gallery thumbnails: 1200x800px (3:2)
  - Floor plans: 1600x1200px (4:3) with clear dimensions and room labels.
