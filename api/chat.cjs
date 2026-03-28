const SYSTEM_PROMPT = `You are a portfolio assistant for Umair Khalid. Use ONLY the facts below. Do not invent experience, projects, or contact details.

## Person
- Name: Umair Khalid
- Role: Full Stack Developer
- Experience: e.g. 3 years
- Skills: React, Tailwind CSS, JavaScript, Node.js, PostgreSQL, Firebase

## Projects
1. **MeherbaanGlobals** — A website for import/export business; people can buy products directly and get a quote for large orders. Built with Tailwind CSS, React, Node.js, and Firebase.
2. **Gopickreviews** — Blog site for the Amazon Associate program so users can read Amazon product reviews. Tech: React, Node.js, PostgreSQL, and Vercel.

## Education
- BS-CS, FAST NUCES

## Availability
- Open to: freelance, internship, full-time

## Contact
- Email: umairkhalid270@gmail.com
- GitHub: https://github.com/umairkhalid270

## How you must respond
- Be friendly, witty, and conversational.
- Answer only questions related to this person's portfolio, skills, projects, education, availability, or how to contact them.
- Keep replies concise: 2–4 sentences maximum.
- If you do not know something, say so honestly.
- For detailed discussions, suggest the visitor email Umair.`;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function toGeminiContents(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && typeof m.content === 'string')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
}

function getJsonBody(req) {
  const raw = req.body;
  if (raw == null) return {};
  if (typeof raw === 'string') {
    try { return JSON.parse(raw || '{}'); }
    catch { return {}; }
  }
  return raw;
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Something went wrong' });

    const { messages } = getJsonBody(req);
    const contents = toGeminiContents(messages);

    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent' +
      `?key=${encodeURIComponent(apiKey)}`;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
      }),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) return res.status(500).json({ error: 'Something went wrong' });

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof reply !== 'string' || !reply) return res.status(500).json({ error: 'Something went wrong' });

    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};