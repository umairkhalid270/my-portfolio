/**
 * Compact “assistant is typing” row: three bouncing dots in a left-aligned bubble.
 */
export default function TypingIndicator() {
  return (
    <>
      {/* Bounce keyframes — Tailwind has no built-in staggered dot wave */}
      <style>{`
        @keyframes portfolio-typing-bounce {
          0%,
          60%,  
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }
          30% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
        .portfolio-typing-dot {
          animation: portfolio-typing-bounce 0.9s ease-in-out infinite;
        }
      `}</style>

      <div className="flex w-full justify-start">
        <div
          className="inline-flex max-w-fit items-center gap-1 rounded-2xl bg-gray-100 px-3 py-2.5 shadow-sm"
          role="status"
          aria-label="Assistant is typing"
        >
          <span
            className="portfolio-typing-dot size-1.5 shrink-0 rounded-full bg-violet-600"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="portfolio-typing-dot size-1.5 shrink-0 rounded-full bg-indigo-600"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="portfolio-typing-dot size-1.5 shrink-0 rounded-full bg-violet-600"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </>
  );
}
