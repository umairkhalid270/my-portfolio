const SYSTEM_PROMPT = `You are a portfolio assistant for Umair Khalid. Use ONLY the facts below.

## Person
- Name: Umair Khalid
- Role: Full Stack Developer
- Skills: React, Tailwind CSS, JavaScript, Node.js, PostgreSQL, Firebase

## Projects
1. MeherbaanGlobals — Import/export business website. Built with React, Node.js, Firebase.
2. Gopickreviews — Amazon product review blog. Built with React, Node.js, PostgreSQL.

## Education
- BS-CS, FAST NUCES

## Availability
- Open to: freelance, internship, full-time

## Contact
- Email: umairkhalid270@gmail.com
- GitHub: https://github.com/umairkhalid270

## Rules
- Be friendly and concise (2-4 sentences max)
- Only answer questions about this portfolio
- If unsure, say so honestly`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'No API key' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    // Build contents — must alternate user/model and end with user
    let contents = messages
      .filter((m) => m && typeof m.content === 'string' && m.content.trim())
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    // Gemini requires at least one user message
    if (contents.length === 0) {
      contents = [{ role: 'user', parts: [{ text: 'Hello' }] }];
    }

    // Gemini requires last message to be from user
    if (contents[contents.length - 1].role !== 'user') {
      contents.push({ role: 'user', parts: [{ text: 'Continue' }] });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
        }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error('Gemini error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Gemini error', detail: JSON.stringify(data) });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) return res.status(500).json({ error: 'No reply' });

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}