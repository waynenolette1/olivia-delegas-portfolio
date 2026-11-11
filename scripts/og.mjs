// Renders the link-preview cards (1200x630) shown when the site is shared in messages and social apps.
// Usage: node scripts/og.mjs   -> public/og/home.jpg and public/og/<slug>.jpg
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('.');
// Inline everything as data URIs: a page set from a string can't load file:// resources.
const mime = { woff2: 'font/woff2', webp: 'image/webp' };
const f = (p) => `data:${mime[p.split('.').pop()]};base64,${readFileSync(resolve(root, p)).toString('base64')}`;
const jost = f('node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2');
const serif = f('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2');
const work = (slug, n) => f(`src/assets/work/${slug}/${String(n).padStart(3, '0')}.webp`);

const src = readFileSync('src/data/projects.ts', 'utf8');
const projects = [...src.matchAll(/slug: '([^']+)',\s*title: '([^']+)',[\s\S]*?kind: '([^']+)',\s*color: '(#\w+)',\s*ink: '(#\w+)',\s*tint: '(#\w+)',\s*cover: s\('_covers', (\d+)/g)]
  .map((m) => ({ slug: m[1], title: m[2].replace(/\\'/g, "'"), kind: m[3], color: m[4], ink: m[5], tint: m[6], cover: Number(m[7]) }));

const base = `
  @font-face { font-family: Jost; src: url(${jost}) format('woff2'); font-weight: 100 900; }
  @font-face { font-family: IS; src: url(${serif}) format('woff2'); font-style: italic; }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { font-family: Jost, sans-serif; -webkit-font-smoothing: antialiased; position: relative; }
  .serif { font-family: IS, serif; font-style: italic; font-weight: 400; }
  .label { font-size: 17px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; }
  .piece { position: absolute; box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 30px 60px -24px rgba(0,0,0,.5); }
`;

const home = `<style>${base}
  body { background: #f4f0e8; color: #141d1d; }
  .copy { position: absolute; left: 72px; top: 76px; width: 560px; }
  .mark { color: #1a5e63; font-weight: 600; font-size: 104px; line-height: .9; letter-spacing: -.035em; }
  .mark span { display: block; padding-left: .55em; }
  .line { margin-top: 36px; font-size: 34px; line-height: 1.15; letter-spacing: -.02em; font-weight: 420; }
  .line .serif { font-size: 1.12em; color: #1a5e63; }
  .foot { position: absolute; left: 72px; bottom: 58px; color: #4d5857; }
  .p1 { width: 250px; left: 640px; top: 70px; transform: rotate(-6deg); }
  .p2 { width: 270px; left: 860px; top: 120px; transform: rotate(4deg); z-index: 2; }
  .p3 { width: 230px; left: 735px; top: 290px; transform: rotate(-1.5deg); z-index: 3; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; display: flex; }
  .bar i { flex: 1; }
</style>
<div class="copy">
  <div class="mark">Olivia<span>Delegas</span></div>
  <p class="line">Graphic designer specializing in branding, marketing, and <span class="serif">visual storytelling.</span></p>
</div>
<p class="label foot">Portfolio · Boston, Massachusetts</p>
<img class="piece p1" src="${work('futura-type-specimen', 29)}">
<img class="piece p2" src="${work('wrestle-like-a-girl', 68)}">
<img class="piece p3" src="${work('nec-athletics', 50)}">
<div class="bar">${projects.map((p) => `<i style="background:${p.color}"></i>`).join('')}</div>`;

const card = (p) => `<style>${base}
  body { background: ${p.color}; color: ${p.ink}; }
  .copy { position: absolute; left: 72px; top: 64px; bottom: 60px; width: 560px; display: flex; flex-direction: column; }
  .by { display: flex; justify-content: space-between; padding-bottom: 16px; border-bottom: 1.5px solid color-mix(in oklab, ${p.ink} 35%, transparent); }
  .kind { margin-top: auto; opacity: .85; }
  h1 { margin-top: 14px; font-weight: 540; font-size: ${p.title.length > 22 ? 70 : p.title.length > 15 ? 84 : 100}px; line-height: .92; letter-spacing: -.045em; text-wrap: balance; }
  .mat { position: absolute; right: 56px; top: 56px; bottom: 56px; width: 480px; background: ${p.tint}; display: grid; place-items: center; padding: 34px; }
  .mat img { position: static; max-width: 412px; max-height: 450px; width: auto; height: auto; }
</style>
<div class="copy">
  <div class="by label"><span>Olivia Delegas</span><span>Portfolio</span></div>
  <p class="label kind">${p.kind}</p>
  <h1>${p.title}</h1>
</div>
<div class="mat"><img class="piece" src="${work('_covers', p.cover)}"></div>`;

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const shoot = async (html, out) => {
  await page.setContent(`<!doctype html><meta charset="utf-8">${html}`, { waitUntil: 'load' });
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, type: 'jpeg', quality: 90 });
};
await shoot(home, 'public/og/home.jpg');
for (const p of projects) await shoot(card(p), `public/og/${p.slug}.jpg`);
await browser.close();
console.log(`og cards: home + ${projects.length} projects`);
