import { useState, useCallback } from 'react';

/**
 * Bottom chat field: submits trimmed text via onSend, clears input after send.
 */
export default function ChatInput({ onSend, disabled = false }) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      onSend(trimmed);
      setValue('');
    },
    [value, disabled, onSend],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-indigo-100/80 bg-white/90 px-3 py-3 backdrop-blur-sm"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="Ask about skills, projects, availability…"
          className="min-w-0 flex-1 rounded-xl border border-indigo-200/80 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-inner outline-none transition placeholder:text-indigo-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Message"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}
