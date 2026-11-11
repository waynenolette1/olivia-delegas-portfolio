// Usage: node scripts/shoot.mjs <baseUrl> <outDir> [paths...]
import { chromium } from '@playwright/test';
const [base, out, ...paths] = process.argv.slice(2);
const list = paths.length ? paths : ['/', '/about', '/contact', '/work/wrestle-like-a-girl', '/work/ymca-camp-massapoag'];
const browser = await chromium.launch({ channel: 'chrome' });
for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: name === 'mobile' ? 2 : 1, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  for (const p of list) {
    await page.goto(base + p, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(1500);
    const slug = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_'));
    await page.screenshot({ path: `${out}/${name}-${slug}-fold.png` });
    // scroll through to trigger lazy images, then full page
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${out}/${name}-${slug}-full.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
