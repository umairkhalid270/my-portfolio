import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineRestartAlt } from 'react-icons/md';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
const SUGGESTED_CHIPS = [
  'What are your skills?',
  'Show me your projects',
  'Are you available?',
];

/**
 * Full chat panel: message list, typing state, suggestions, input, header actions.
 */
export default function ChatWindow({
  messages,
  isLoading,
  error,
  onSend,
  onClear,
  onClose,
}) {
  const scrollRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Mount animation: scale 95% → 100%, fade in over 200ms
  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keep the latest message in view when history or typing state changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const showChips = messages.length === 1;

  return (
    <div
      className={`origin-center transition-[transform,opacity] duration-200 ease-out ${
        open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <div
        className="flex h-[min(540px,85dvh)] w-full flex-col overflow-hidden rounded-2xl border border-indigo-200/40 bg-white shadow-[0_20px_50px_-12px_rgba(49,46,129,0.35)] md:h-[540px] md:w-[380px]"
        role="dialog"
        aria-label="AI assistant chat"
      >
        {/* Header */}
        <header className="relative shrink-0 bg-gradient-to-r from-indigo-900 to-violet-900 px-4 py-3 shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight text-white">
                  AI Assistant
                </h2>
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.85)]" />
                </span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-violet-200/90">
                Powered by Gemini
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                onClick={onClear}
                className="rounded-lg p-2 text-violet-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80"
                aria-label="Clear chat"
              >
                <MdOutlineRestartAlt className="size-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-violet-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80"
                aria-label="Close chat"
              >
                <IoMdClose className="size-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="portfolio-chat-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-gradient-to-b from-indigo-50/90 to-slate-50/95 px-3 py-3"
        >
          {messages.map((msg, index) => (
            <ChatMessage
              key={`${index}-${msg.role}-${String(msg.content).slice(0, 24)}`}
              role={msg.role}
              content={msg.content}
            />
          ))}
          {isLoading ? <TypingIndicator /> : null}
        </div>

        {/* Suggested prompts (welcome only) */}
        {showChips ? (
          <div className="shrink-0 border-t border-indigo-100/60 bg-indigo-50/50 px-3 pb-2 pt-2">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-indigo-400">
              Try asking
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_CHIPS.map((label) => (
                <button
                  key={label}
                  type="button"
                  disabled={isLoading}
                  onClick={() => onSend(label)}
                  className="rounded-full border border-indigo-200/90 bg-white/90 px-3 py-1.5 text-left text-xs font-medium text-indigo-900 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {error ? (
          <p
            className="shrink-0 border-t border-red-100 bg-red-50/90 px-3 py-2 text-center text-xs font-medium text-red-600"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <ChatInput onSend={onSend} disabled={isLoading} />
      </div>
    </div>
  );
}
