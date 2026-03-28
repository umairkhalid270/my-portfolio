import { useState, useCallback, useRef, useEffect } from 'react';

/** Portfolio owner name shown in the welcome line. */
const OWNER_NAME = 'Umair Khalid';

/** First message only; real chat for the API starts at index 1. */
const WELCOME_MESSAGE = {
  role: 'assistant',
  content: `Hi! 👋 I'm ${OWNER_NAME}'s AI assistant. Ask me about my skills, projects, experience, or availability!`,
};

/**
 * Chat hook: local message list, loading/error flags, send + clear helpers.
 * POSTs to /api/chat with messages slice(1) so the welcome bubble is not sent to the model.
 */
export default function useChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Keeps the latest messages for sendMessage without stale closures or side effects in setState
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = useCallback(async (userInput) => {
    const trimmed = typeof userInput === 'string' ? userInput.trim() : '';
    if (!trimmed) return;

    setError('');
    const userMsg = { role: 'user', content: trimmed };

    // Append user message immediately
    const next = [...messagesRef.current, userMsg];
    messagesRef.current = next;
    setMessages(next);

    setIsLoading(true);

    try {
      // Skip welcome at index 0; normalize to { role, content } for the API
      const payloadMessages = next.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          typeof data.error === 'string' ? data.error : 'Something went wrong',
        );
      }

      const reply = data.reply;
      if (typeof reply !== 'string' || !reply) {
        throw new Error('Something went wrong');
      }

      // Append assistant reply when the request completes
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    messagesRef.current = [WELCOME_MESSAGE];
    setError('');
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
