import React from 'react';
import { parseMarkdown } from '../utils/helpers';

export function ChatMessage({ message, isLatestBot, onReaction, profileImageUrl, headerName }) {
  const isUser = message.sender === 'user';

  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        className={`bubble ${isUser ? 'user' : 'bot'}`}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
      />

      {/* Action buttons */}
      {!isUser && message.hasActionButton && message.actionButtons?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', marginLeft: '4px' }}>
          {message.actionButtons.map((btnObj, idx) => {
            const label = Object.keys(btnObj)[0];
            const url = btnObj[label];
            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: '2px solid var(--teal-deep)',
                  color: 'var(--teal-deep)',
                  background: 'white',
                  fontSize: '13px',
                  fontWeight: '800',
                  textDecoration: 'none',
                  transition: 'all .18s ease'
                }}
              >
                {label}
              </a>
            );
          })}
        </div>
      )}

      {/* Reaction buttons */}
      {message.sender === 'bot' && message.message_id && !message.isError && isLatestBot && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', marginLeft: '4px' }}>
          <button
            onClick={() => onReaction(message.message_id, message.session_id, true)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: message.userReaction === true ? '2px solid #10b981' : '1px solid #dce8ee',
              background: message.userReaction === true ? '#d1fae5' : 'white',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .18s ease'
            }}
            title="Helpful"
          >
            👍
          </button>
          <button
            onClick={() => onReaction(message.message_id, message.session_id, false)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: message.userReaction === false ? '2px solid #ef4444' : '1px solid #dce8ee',
              background: message.userReaction === false ? '#fee2e2' : 'white',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .18s ease'
            }}
            title="Not helpful"
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
}
