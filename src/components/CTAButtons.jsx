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
    { show: bookNowShow, label: bookNowText, onClick: onBookNow, url: bookNowUrl, isPrimary: true },
    { show: sendEmailShow, label: sendEmailText, onClick: onSendEmail, url: null, isPrimary: false },
    { show: ctaTwoShow, label: ctaTwoText, onClick: onCTATwo, url: ctaTwoUrl, isPrimary: false },
    { show: ctaThreeShow, label: ctaThreeText, onClick: onCTAThree, url: ctaThreeUrl, isPrimary: false }
  ].filter(a => a.show && a.label);

  if (actions.length === 0) return null;

  return (
    <div className="cta-row">
      {actions.map((action, idx) => (
        <a
          key={idx}
          className={idx === 0 ? 'primary-cta' : 'secondary-cta'}
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
