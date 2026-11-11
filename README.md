# Olivia Delegas · Portfolio

A new generation of [oliviadelegasdesign.com](https://www.oliviadelegasdesign.com): a static, image-optimised Astro site built from Olivia's own work and words.

**Live:** https://oliviadelegas.vercel.app (Vercel, static). Her Squarespace site at oliviadelegasdesign.com is untouched.

## Run it

```sh
npm install
npm run dev        # http://127.0.0.1:4321 with hot reload
npm run build      # static site in dist/
npm run preview    # serve dist/ at http://127.0.0.1:4321
```

Use Node 22.12 or newer.

## Quality gates

```sh
npm run lint:copy                 # no em or en dashes anywhere in the copy
npm run qa                        # with `npm run preview` running: 15 pages x phone + desktop
npm run shoot -- http://127.0.0.1:4321 docs/reveal/after   # screenshots
```

`npm run qa` fails on broken images, console errors, horizontal overflow, missing alt text, dashes in rendered copy, pages without exactly one `h1`, and any project colour/ink pair under WCAG AA 4.5:1.

## What's here

| Path | What it is |
| --- | --- |
| `src/data/projects.ts` | All 11 projects: copy, signature colour, facts, image layout, alt text |
| `src/pages/index.astro` | Homepage with the signature index and stage |
| `src/pages/work/[slug].astro` | Project template (same URLs as the Squarespace site) |
| `src/pages/about.astro`, `contact.astro`, `404.astro` | About, contact, not found |
| `src/assets/work/` | Her original images, converted losslessly; Astro generates responsive WebP |
| `public/media/` | SkipIt motion logo, recovered from her site's video stream |
| `docs/reveal/` | Before and after screenshots and comparison sheets |

## Design notes

- **Identity:** teal `#1a5e63` sampled from her wordmark; warm uncoated-paper ground; Jost (a Futura revival, a nod to her *Futura!* specimen) with Instrument Serif italic as the storytelling voice.
- **Signature interaction:** each project carries a colour sampled from its own artwork. The homepage index mounts each piece whole on its colour, like a print on a mat, with a print-pull wipe, and the page takes on that colour as you move through the work. It tours itself slowly until the visitor takes over. Clicking morphs the cover into the project page hero (View Transitions).
- **Projects:** each page opens in its own colour, then sets the work on a tint of it. Every image opens in a keyboard- and swipe-friendly lightbox. Each page ends by handing off to the next project in that project's colour.
- **Restraint:** honours `prefers-reduced-motion` (no tour, no drift, no wipes), and content stays visible without JavaScript.

## Content provenance

All copy comes from Olivia's portfolio text or her LinkedIn profile, lightly edited. Nothing is invented: no clients, metrics, testimonials, or outcomes. Tools are listed only where she named them (InDesign, After Effects, Adobe XD, Figma, FontStruct; "Adobe Creative Suite" from LinkedIn).

### Open items before the reveal

1. **Degree wording.** The About page says "New England College · Bachelor of Fine Arts, Graphic Design" with no year and no "graduate" claim, because graduation status isn't confirmed. Add the year once known.
2. **Contact form.** Her Squarespace form can't be reused. The contact page currently offers LinkedIn and Instagram. To turn on the inline form, set `PUBLIC_CONTACT_ENDPOINT` to a form service URL (Formspree or similar) tied to an inbox she chooses, then rebuild.
3. **Domain.** Canonical and Open Graph URLs point at oliviadelegas.vercel.app. If her domain moves here, rebuild with `SITE_URL`.

## Deploy

Hosted on Vercel (project `oliviadelegas`). Deploys are manual for now; to deploy on every push, connect GitHub under the account's Login Connections in Vercel, then run `npx vercel git connect`.

```sh
npm run deploy   # copy lint, then vercel deploy --prod
```

Plain static files, no server code. `vercel.json` sets clean URLs and long-lived caching for hashed assets. To move to her own domain later, add it under the project's Domains in Vercel and rebuild with `SITE_URL` set to it.
