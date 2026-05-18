import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { sendEmail } from '../services/chatApi';

export function EmailFormModal({ isOpen, onClose, chatbotId, brandColour }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e) => { e.preventDefault(); onClose(); };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsLoading(true);
    try {
      await sendEmail(formData.name, formData.email, formData.message, chatbotId);
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', message: '' });
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to send email. Please try again.');
      setIsLoading(false);
    }
  };

  const accent = brandColour || '#0f172a';

  /* Inline styles so the dialog renders as a responsive bottom-sheet on
     mobile and a centred card on wider screens, regardless of browser
     default dialog positioning. */
  const dialogStyle = {
    padding: 0,
    border: 'none',
    borderRadius: '1rem 1rem 0 0',
    width: '100%',
    maxWidth: '100vw',
    maxHeight: '90vh',
    overflowY: 'auto',
    margin: '0',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <dialog
      ref={dialogRef}
      aria-labelledby="em-modal-title"
      style={dialogStyle}
      className="shadow-2xl backdrop:bg-black/50"
    >
      {/* Drag handle — mobile hint */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-slate-200" />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 id="em-modal-title" className="text-lg font-bold text-slate-900">Send us an Email</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X size={20} color="#94a3b8" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="em-name" className="block text-[13px] font-semibold text-slate-700 mb-1.5">Your Name*</label>
            <input
              id="em-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 transition"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="em-email" className="block text-[13px] font-semibold text-slate-700 mb-1.5">Your Email*</label>
            <input
              id="em-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 transition"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="em-message" className="block text-[13px] font-semibold text-slate-700 mb-1.5">Message*</label>
            <textarea
              id="em-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please tell us how we can help you..."
              rows={4}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:border-slate-400 transition"
              required
            />
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-[13px] mb-4 text-slate-500">
              <div className="w-4 h-4 border-2 border-slate-200 rounded-full animate-spin" style={{ borderTopColor: accent }} />
              <span>Sending email...</span>
            </div>
          )}

          {showSuccess && (
            <div className="text-[13px] mb-4 text-center text-emerald-600 font-medium">
              Email sent successfully! We will get back to you soon.
            </div>
          )}

          {error && (
            <div className="text-[13px] mb-4 text-center text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-full text-[13px] font-semibold text-slate-500 hover:bg-slate-50 active:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-full text-[13px] font-bold text-white transition disabled:opacity-50 active:opacity-80"
              style={{ background: accent }}
            >
              {isLoading ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

EmailFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  chatbotId: PropTypes.string,
  brandColour: PropTypes.string,
};

EmailFormModal.defaultProps = {
  chatbotId: null,
  brandColour: null,
};
