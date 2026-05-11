import React from 'react';

export function CTAButtons({
  bookNowShow, bookNowText, bookNowUrl,
  sendEmailShow, sendEmailText,
  ctaTwoShow, ctaTwoText, ctaTwoUrl,
  ctaThreeShow, ctaThreeText, ctaThreeUrl,
  onBookNow, onSendEmail, onCTATwo, onCTAThree,
  brandColour
}) {
  const actions = [
    { show: bookNowShow, label: bookNowText, onClick: onBookNow, url: bookNowUrl },
    { show: ctaTwoShow, label: ctaTwoText, onClick: onCTATwo, url: ctaTwoUrl },
    { show: sendEmailShow, label: sendEmailText, onClick: onSendEmail, url: null },
    { show: ctaThreeShow, label: ctaThreeText, onClick: onCTAThree, url: ctaThreeUrl }
  ].filter(a => a.show && a.label);

  if (actions.length === 0) return null;

  const colour = brandColour || '#0f172a';

  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-3 border-t border-slate-100"
      style={{ scrollbarWidth: 'none' }}
    >
      {actions.map((action, idx) => (
        <a
          key={idx}
          className="flex-none text-center border rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer bg-white"
          style={{
            minWidth: '120px',
            borderColor: colour,
            color: colour,
            textDecoration: 'none'
          }}
          href={action.url || '#'}
          target={action.url && action.url.startsWith('http') ? '_blank' : undefined}
          rel={action.url && action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={(e) => {
            if (action.onClick) {
              e.preventDefault();
              action.onClick();
            }
          }}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}
