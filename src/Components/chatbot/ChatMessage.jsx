/**
 * Single chat row: user (right, gradient) or assistant (left, gray + sparkle).
 * The content prop preserves newlines via whitespace-pre-wrap.
 */
export default function ChatMessage({ role, content: messageContent }) {
  const isUser = role === 'user';
  const messageText = messageContent ?? '';

  const bubbleBase =
    'max-w-[80%] px-4 py-2.5 text-sm shadow-sm break-words whitespace-pre-wrap portfolio-chat-msg-anim';

  const userBubble =
    'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-md bg-gradient-to-r from-indigo-600 to-violet-600 text-white';

  const assistantBubble =
    'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md bg-gray-100 text-gray-900';

  const userBubbleClass = `${bubbleBase} ${userBubble}`;
  const assistantBubbleClass = `${bubbleBase} ${assistantBubble}`;

  if (isUser) {
    return (
      <div className="w-full">
        <div className="flex w-full justify-end">
          <div className={userBubbleClass}>{messageText}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-start gap-2">
        <span className="mt-2 shrink-0 select-none text-xs leading-none text-violet-600" aria-hidden>
          {'\u2726'}
        </span>
        <div className={assistantBubbleClass}>{messageText}</div>
      </div>
    </div>
  );
}
