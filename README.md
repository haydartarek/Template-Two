# Kasper Template Two - Project Handover

Modernized static creative agency template, upgraded for premium UI/UX while keeping the original stack and project structure.

Prepared by: **Haydar Tarek**  
LinkedIn: [https://www.linkedin.com/in/haydartarek-dev/](https://www.linkedin.com/in/haydartarek-dev/)

Last updated: **May 18, 2026**

---

## 1) Project Overview

This project is a static website template based on:

- HTML
- CSS
- Vanilla JavaScript
- Font Awesome local assets

The website has been fully improved visually and structurally while preserving the same technology stack.

---

## 2) Delivered Improvements

- Complete modern UI refresh (premium look and cleaner visual hierarchy)
- Sticky header with scroll-state styling
- Mobile navigation toggle with accessibility attributes
- Dynamic active-link highlighting based on visible section
- Hero section modernization with better typography and CTA hierarchy
- Functional hero slider (arrows, bullets, and auto-play)
- Refined spacing system and section rhythm across all blocks
- Service cards redesigned with modern shadows, radius, and hover effects
- Portfolio category filter with interactive controls
- Portfolio grid and captions polished with cleaner interaction
- About, stats, skills, pricing, subscribe, and contact sections modernized
- Animated counters in stats and animated skill progress bars
- Stable promo-video handling with graceful image fallback if video fails
- Footer structure and social link markup fixed
- Dynamic current year injection in footer
- Back-to-top floating button for long-page usability
- Scroll reveal animation system added for smoother presentation
- Client-side validation and feedback states for subscribe/contact forms
- HTML structure issues fixed (invalid/misaligned tags)

---

## 3) Technology Stack (Unchanged)

- `index.html`
- `css/normalize.css`
- `css/all.min.css`
- `css/kasper.css`
- `js/main.js`
- local assets in `images/`, `font/`, and `webfonts/`

No framework migration was performed.

---

## 4) Production Structure

```text
Template-Two/
├─ index.html
├─ README.md
├─ css/
│  ├─ all.min.css
│  ├─ normalize.css
│  └─ kasper.css
├─ js/
│  └─ main.js
├─ images/
├─ font/
└─ webfonts/
```

---

## 5) Runtime Behavior

- Header style updates automatically on scroll.
- Mobile menu opens/closes via toggle button (`aria-expanded` updated).
- Scroll reveal transitions for elements marked with `data-reveal`.
- Existing content flow and section order preserved.

---

## 6) Local Run

Run from project root using a static server:

1. VS Code Live Server
2. `python -m http.server 5500`
3. `npx serve .`

Open:

- [http://127.0.0.1:5500/](http://127.0.0.1:5500/)

---

## 7) Deployment Notes

- Deploy as static hosting (Netlify / Vercel static / cPanel / Nginx / Apache).
- Keep directory names and file casing unchanged.
- Keep `css/`, `js/`, `images/`, `font/`, and `webfonts/` next to `index.html`.

---

## 8) Handover Sign-Off

Handover owner: **Haydar Tarek**  
Contact: [https://www.linkedin.com/in/haydartarek-dev/](https://www.linkedin.com/in/haydartarek-dev/)  
Status: **Ready for publishing and maintenance handover**

---

## 9) Playwright E2E Test Suite

Playwright has been added to validate full user journeys on both desktop and mobile viewports.

### Included test files

- `tests/desktop-user-flows.spec.js`
- `tests/mobile-user-flows.spec.js`

### Covered user scenarios

- Page load and key section visibility
- Dynamic footer year validation
- Sticky header and back-to-top button behavior
- Hero slider navigation with arrows and bullets
- Portfolio category filtering behavior
- Subscribe form validation and success flow
- Contact form validation and success flow
- Video CTA links and reveal-motion settings
- Mobile nav toggle and close behavior
- Mobile layout checks for video block and subscribe form

### How to run

From project root:

1. Install dependencies:

   `npm install`

2. Run all E2E tests:

   `npm run test:e2e`

3. Useful additional commands:
   - `npm run test:e2e:headed`
   - `npm run test:e2e:ui`
   - `npm run test:e2e:debug`
   - `npm run test:e2e:report`
