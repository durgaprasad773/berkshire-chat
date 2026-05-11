import React from 'react';
import { parseMarkdown } from '../utils/helpers';

export function ChatMessage({ message, isLatestBot, onReaction, profileImageUrl, headerName }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col mb-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
      {!isUser && (
        <div className="flex items-center gap-1.5 mb-1">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt={headerName} className="h-[18px] w-[18px] rounded-full object-cover" />
          ) : (
            <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-slate-900">
              <span className="text-[8px] text-white font-bold">AI</span>
            </div>
          )}
          <span className="text-[10px] text-slate-400 font-medium">{headerName || 'Ask AbrarAI'}</span>
        </div>
      )}

      <div
        className={`px-3.5 py-2.5 max-w-[88%] break-words shadow-sm text-sm leading-relaxed ${
          isUser
            ? 'rounded-[14px_4px_14px_14px] bg-slate-900 text-white'
            : 'rounded-[4px_14px_14px_14px] bg-white text-slate-800 border border-slate-200'
        }`}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
      />

      {/* Action buttons */}
      {!isUser && message.hasActionButton && message.actionButtons?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1.5 ml-1">
          {message.actionButtons.map((btnObj, idx) => {
            const label = Object.keys(btnObj)[0];
            const url = btnObj[label];
            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-900 text-slate-900 hover:bg-slate-50 px-4 py-1.5 text-xs font-medium transition"
              >
                {label}
              </a>
            );
          })}
        </div>
      )}

      {/* Reaction buttons */}
      {message.sender === 'bot' && message.message_id && !message.isError && isLatestBot && (
        <div className="flex gap-2 mt-1.5">
          <button
            onClick={() => onReaction(message.message_id, message.session_id, true)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition text-xs ${
              message.userReaction === true
                ? 'bg-green-100 text-green-600 border-2 border-green-400'
                : 'bg-white border border-slate-200 hover:bg-slate-50'
            }`}
            title="Helpful"
          >
            👍
          </button>
          <button
            onClick={() => onReaction(message.message_id, message.session_id, false)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition text-xs ${
              message.userReaction === false
                ? 'bg-red-100 text-red-600 border-2 border-red-400'
                : 'bg-white border border-slate-200 hover:bg-slate-50'
            }`}
            title="Not helpful"
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
}
