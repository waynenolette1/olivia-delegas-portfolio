// POST /api/contact: receives the contact page inquiry form.
// Each inquiry is saved as a private JSON file in the "olivia-inquiries" Vercel Blob store,
// so nothing is lost. Email delivery is optional: set INQUIRY_EMAIL (and redeploy) to also
// forward every inquiry to that inbox through FormSubmit.
import { put } from '@vercel/blob';

const LIMITS = { Name: 120, email: 200, Project: 5000, Timeline: 60, Budget: 40, 'Interested in': 200 };
const clean = (v, max) => String(v ?? '').replace(/\u0000/g, '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};

  // Bots fill the hidden field; pretend success and store nothing.
  if (body._honey) return res.status(200).json({ ok: true });

  const interests = Array.isArray(body['Interested in']) ? body['Interested in'].join(', ') : body['Interested in'];
  const inquiry = {
    Name: clean(body.Name, LIMITS.Name),
    email: clean(body.email, LIMITS.email),
    'Interested in': clean(interests, LIMITS['Interested in']),
    Project: clean(body.Project, LIMITS.Project),
    Timeline: clean(body.Timeline, LIMITS.Timeline),
    Budget: clean(body.Budget, LIMITS.Budget),
  };

  const errors = [];
  if (!inquiry.Name) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inquiry.email)) errors.push('email');
  if (!inquiry.Project) errors.push('project');
  if (errors.length) return res.status(400).json({ ok: false, error: `Please check: ${errors.join(', ')}` });

  const receivedAt = new Date().toISOString();
  const record = { receivedAt, ...inquiry, userAgent: clean(req.headers['user-agent'], 300) };

  try {
    const id = `${receivedAt.replace(/[:.]/g, '-')}-${Math.random().toString(36).slice(2, 8)}`;
    await put(`inquiries/${id}.json`, JSON.stringify(record, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
  } catch (err) {
    console.error('inquiry store failed', err);
    return res.status(500).json({ ok: false, error: 'Could not save your message' });
  }

  // Optional forwarding to an inbox, switched on by setting INQUIRY_EMAIL.
  const to = process.env.INQUIRY_EMAIL;
  if (to) {
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...inquiry, _subject: `New inquiry from ${inquiry.Name}`, _template: 'table', _captcha: 'false', _replyto: inquiry.email }),
      });
    } catch (err) {
      console.error('inquiry email forward failed (inquiry is still saved)', err);
    }
  }

  return res.status(200).json({ ok: true });
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
