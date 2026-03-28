import { SYSTEM_PROMPT } from '../src/constants/systemPrompt.js';

/** CORS headers for browser clients (dev + production). */
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Maps chat roles to Gemini roles: only "user" and "model" are valid (not "assistant").
 */
function toGeminiContents(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((m) => {
      if (!m || m.role === 'system') return false;
      const text = m.content ?? m.text;
      return typeof text === 'string';
    })
    .map((m) => {
      const text = m.content ?? m.text;
      // OpenAI-style "assistant" becomes Gemini's "model"
      const role =
        m.role === 'assistant' ? 'model' : m.role === 'model' ? 'model' : 'user';
      return {
        role,
        parts: [{ text }],
      };
    });
}

/**
 * Normalizes req.body when Vercel passes a string or unparsed body.
 */
function getJsonBody(req) {
  const raw = req.body;
  if (raw == null) return {};
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw || '{}');
    } catch {
      return {};
    }
  }
  return raw;
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  // Preflight so cross-origin POST from the Vite dev server or another origin works
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    const { messages } = getJsonBody(req);
    const contents = toGeminiContents(messages);

    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent' +
      `?key=${encodeURIComponent(apiKey)}`;

    // Gemini REST expects camelCase (systemInstruction), not system_instruction
    const geminiBody = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
    };

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof reply !== 'string' || !reply) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
