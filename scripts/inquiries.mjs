// Read contact-form inquiries saved by /api/contact.
// Setup once: npx vercel env pull .env.local --environment=production
// Usage: node --env-file=.env.local scripts/inquiries.mjs [--delete <pathname>]
import { list, get, del } from '@vercel/blob';

const args = process.argv.slice(2);
if (args[0] === '--delete' && args[1]) {
  await del(args[1]);
  console.log('deleted', args[1]);
  process.exit(0);
}
const { blobs } = await list({ prefix: 'inquiries/' });
if (!blobs.length) console.log('No inquiries yet.');
for (const b of blobs.sort((x, y) => x.uploadedAt - y.uploadedAt)) {
  const r = await get(b.pathname, { access: 'private' });
  const text = await new Response(r.stream).text();
  console.log(`\n# ${b.pathname}\n${text}`);
}
