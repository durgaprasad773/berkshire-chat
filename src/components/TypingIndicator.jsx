import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-2.5">
      <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-slate-900 flex-shrink-0 mt-0.5">
        <span className="text-[8px] text-white font-bold">AI</span>
      </div>
      <div className="rounded-[4px_14px_14px_14px] bg-white border border-slate-200 px-3.5 py-2.5 shadow-sm">
        <div className="flex gap-1 items-center h-5">
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
