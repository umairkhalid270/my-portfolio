import { useState } from 'react';
import useChat from '../../hooks/useChat';
import ChatWindow from './ChatWindow';

/** Chat bubble icon (outline) for FAB when panel is closed */
function ChatBubbleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M7 9.5h10M7 13h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Close (X) icon for FAB when panel is open */
function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Root widget: floating button + optional chat panel wired to useChat.
 */
export default function ChatBot() {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();
  const [isOpen, setIsOpen] = useState(false);

  const showUnreadBadge = messages.length > 1 && !isOpen;

  return (
    <>
      {isOpen ? (
        <div
          className="fixed bottom-24 left-1/2 z-50 w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 md:left-auto md:right-6 md:max-w-none md:translate-x-0"
          role="presentation"
        >
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSend={sendMessage}
            onClear={clearChat}
            onClose={() => setIsOpen(false)}
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_8px_32px_-4px_rgba(79,70,229,0.65),0_0_0_1px_rgba(255,255,255,0.12)_inset] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
          !isOpen ? 'portfolio-chat-fab-pulse' : ''
        }`}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {showUnreadBadge ? (
          <span
            className="absolute right-1 top-1 size-2.5 rounded-full bg-red-500 ring-2 ring-white"
            aria-hidden
          />
        ) : null}

        <span className="relative flex size-7 items-center justify-center">
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${
              isOpen ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <ChatBubbleIcon className="size-7" />
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${
              isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
          >
            <CloseIcon className="size-6" />
          </span>
        </span>
      </button>
    </>
  );
}
