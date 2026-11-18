# Jay Ashok Rathod — Portfolio

A premium, dark, minimal personal portfolio for **Jay Ashok Rathod (Software Engineer)**.
Built with **React + Vite + Tailwind CSS + Framer Motion + Lucide React**.

---

## Quick start

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

---

## ✏️ Where to edit everything

**All portfolio content lives in one file:** [`src/data/portfolio.js`](src/data/portfolio.js)

| Section | Key | What to change |
|---|---|---|
| Site identity | `siteConfig` | Name, logo, email, resume path, availability badge |
| Social links | `socialLinks` | GitHub / LinkedIn / email URLs |
| Navigation | `navLinks` | Nav items (must match section `id`s in `App.jsx`) |
| Hero | `hero` | Headline, description, CTA buttons, floating tech badges |
| About | `about` | Paragraphs, pillars, highlight cards |
| Skills | `skills` | Categories and skill names (edit freely — no fake proficiency %) |
| Projects | `projects` | Title, description, tech stack, `github` / `live` links, image |
| Journey | `experience` | Education / internship / certification timeline entries |
| Why Work With Me | `whyMe` | Four value cards |
| Contact | `contact` | Contact details + `formEndpoint` for real form submissions |
| Footer | `footer` | Footer copy |

### Replacing placeholders

Every placeholder is marked with `⚠️ REPLACE` comments in `src/data/portfolio.js`:

1. **Resume** — put your real PDF at `public/resume.pdf` (a placeholder is included; regenerate it with `node scripts/generate-placeholder-resume.mjs`).
2. **Projects** — replace titles/descriptions, then add real `github` and `live` URLs. Empty links render as disabled (nothing fake is ever linked). Drop thumbnails in `public/images/` and update `image`.
3. **Experience** — replace the three placeholder entries with your real journey; delete anything that does not apply. Never invent employers, degrees or dates.
4. **Availability badge** — set `siteConfig.availability.show` to `true` only if you are actually available.
5. **SEO** — update `index.html` title/description, canonical URL and `og:image` with your real domain.

### Enabling the contact form (real submissions)

The form validates fully but **never fakes a success**. To make it send:

```js
// src/data/portfolio.js
contact: {
  formEndpoint: 'https://formspree.io/f/yourFormId', // or your own API
  ...
}
```

Until then it shows an honest "not configured yet" notice.

---

## Project structure

```
public/
  images/            # project thumbnails (SVG placeholders)
  resume.pdf         # ← put your real resume here
  robots.txt
scripts/
  generate-placeholder-resume.mjs
src/
  components/
    Navbar.jsx       # sticky nav, active indicator, mobile menu
    Hero.jsx         # two-column hero, animated code window
    About.jsx
    Skills.jsx
    Projects.jsx
    Experience.jsx   # vertical timeline
    WhyMe.jsx
    Contact.jsx      # validated form (required/email checks, a11y errors)
    Footer.jsx       # dynamic year, back-to-top
    SectionHeading.jsx
    Reveal.jsx       # shared scroll-reveal (respects reduced motion)
  data/
    portfolio.js     # ← all editable content
  App.jsx
  main.jsx
  index.css          # Tailwind layers + design tokens
```

## Design system

| Token | Value |
|---|---|
| Primary background | `#0B1120` |
| Secondary background | `#111827` |
| Card background | `#151F32` |
| Primary accent | `#38BDF8` |
| Secondary accent | `#818CF8` |
| Primary text | `#F8FAFC` |
| Secondary text | `#94A3B8` |
| Border | `rgba(148, 163, 184, 0.15)` |

Tokens are defined once in `tailwind.config.js` (`bg-bg-*`, `text-content-*`, `accent-*`).

## Accessibility & quality

- Lighthouse: **Accessibility 100 · Best Practices 100 · SEO 100**
- Semantic landmarks, single `h1`, skip link, keyboard focus rings
- `aria-invalid` + `role="alert"` form errors with focus management
- `prefers-reduced-motion` respected globally
- No horizontal overflow; mobile-first responsive grids
