// QA sweep: every page at phone + desktop width. Fails on broken images, console errors,
// horizontal overflow, missing alt text, em/en dashes in rendered copy, and low-contrast ink pairs.
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
const base = process.argv[2] || 'http://127.0.0.1:4321';
const src = readFileSync('src/data/projects.ts', 'utf8');
const slugs = [...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const pages = ['/', '/about', '/contact', '/404', ...slugs.map((s) => `/work/${s}`)];
const problems = [];

// WCAG contrast for each project's colour / ink pair
const lum = (hex) => { const c = hex.match(/\w\w/g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
for (const m of src.matchAll(/slug: '([^']+)'[\s\S]*?color: '(#\w+)',\s*ink: '(#\w+)'/g)) {
  const r = ratio(m[2], m[3]);
  if (r < 4.5) problems.push(`contrast ${m[1]} ${m[2]}/${m[3]} = ${r.toFixed(2)}`);
}

const browser = await chromium.launch({ channel: 'chrome' });
for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  let errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push(String(e)));
  for (const p of pages) {
    errs = [];
    const res = await page.goto(base + p, { waitUntil: 'networkidle' });
    if (p !== '/404' && res.status() !== 200) problems.push(`${p} status ${res.status()}`);
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
    await page.waitForLoadState('networkidle');
    const r = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('img')];
      const visible = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
      const broken = imgs.filter((i) => visible(i) && i.complete && i.naturalWidth === 0).map((i) => i.src);
      const noAlt = imgs.filter((i) => !i.hasAttribute('alt')).length;
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const text = document.body.innerText;
      const dashes = (text.match(/.{0,30}[–—].{0,30}/g) || []);
      const h1 = document.querySelectorAll('h1').length;
      return { broken, noAlt, overflow, dashes, h1 };
    });
    const tag = `${vp.width} ${p}`;
    if (r.broken.length) problems.push(`${tag} broken images: ${r.broken.join(', ')}`);
    if (r.noAlt) problems.push(`${tag} ${r.noAlt} images without alt`);
    if (r.overflow > 1) problems.push(`${tag} horizontal overflow ${r.overflow}px`);
    if (r.dashes.length) problems.push(`${tag} dashes: ${r.dashes.join(' | ')}`);
    if (r.h1 !== 1) problems.push(`${tag} has ${r.h1} h1`);
    if (errs.length) problems.push(`${tag} console: ${errs.join(' | ')}`);
  }
  // Regression: the phone menu must cover the whole screen even after scrolling
  // (a blurred header once trapped it in a 64px strip and froze the page).
  if (vp.width < 760) {
    await page.goto(base + '/work/ymca-camp-massapoag', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollBy(0, -60));
    await page.waitForTimeout(500);
    await page.click('[data-menu-btn]');
    await page.waitForTimeout(900);
    const h = await page.evaluate(() => document.querySelector('[data-menu]').getBoundingClientRect().height);
    if (h < vp.height - 1) problems.push(`menu mid-scroll is ${h}px tall, expected ${vp.height}`);
    await page.click('[data-menu-btn]');
    await page.waitForTimeout(900);
    const locked = await page.evaluate(() => document.documentElement.style.overflow === 'hidden');
    if (locked) problems.push('page still scroll-locked after closing menu');
  }
  await ctx.close();
}
await browser.close();
console.log(problems.length ? problems.join('\n') : `QA clean: ${pages.length} pages x 2 viewports`);
process.exit(problems.length ? 1 : 0);
