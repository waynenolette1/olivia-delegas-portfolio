// Fails if any source file contains an em or en dash. Copy uses commas, colons and middots instead.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const hits = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) return walk(p);
  if (!/\.(astro|ts|css|md|mjs)$/.test(f)) return;
  readFileSync(p, 'utf8').split('\n').forEach((l, i) => { if (/[–—]/.test(l)) hits.push(`${p}:${i + 1}: ${l.trim()}`); });
});
walk('src');
console.log(hits.length ? hits.join('\n') : 'copy lint clean');
process.exit(hits.length ? 1 : 0);
