import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { CTAButtons } from './CTAButtons';
import { EmailFormModal } from './EmailFormModal';
import {
  WIDGET_ID,
  fetchImprovedChatResponse,
  saveReaction,
  getClinicSettings,
  getStarterQuestions,
  fetchUserIP,
  insertUserChatSession,
  trackButtonClick,
} from '../services/chatApi';

const API_BASE_URL = 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net';

const DEFAULT_STARTER_QUESTIONS = [
  { q: 'What is Functional Neurological Disorder?', a: null },
  { q: 'How do I book an appointment?', a: null },
  { q: 'What conditions does Dr Abrar work with?', a: null },
];

export function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
  const [starterQuestions, setStarterQuestions] = useState(DEFAULT_STARTER_QUESTIONS);
  const [chatbotId] = useState(WIDGET_ID);
  const [userIP, setUserIP] = useState('127.0.0.1');
  const [sessionId, setSessionId] = useState(null);
  const [sessionTracked, setSessionTracked] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi, I can help you understand whether Dr Abrar's service may be relevant, how to book, and practical questions about appointments, fees, referrals, and support options."
  );
  const [headerName, setHeaderName] = useState('Ask AbrarAI');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [brandColour, setBrandColour] = useState('#0f172a');
  const [ctaConfig, setCtaConfig] = useState({
    bookNowShow: false, bookNowText: '', bookNowUrl: '',
    sendEmailShow: false, sendEmailText: '',
    ctaTwoShow: false, ctaTwoText: '', ctaTwoUrl: '',
    ctaThreeShow: false, ctaThreeText: '', ctaThreeUrl: ''
  });

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [bookNowClicksId, setBookNowClicksId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isLoading]);

  const initialize = async () => {
    try {
      const ip = await fetchUserIP();
      setUserIP(ip);

      const settings = await getClinicSettings(WIDGET_ID);
      if (settings?.IntroMessage) setWelcomeMessage(settings.IntroMessage);
      if (settings?.ClinicName) setHeaderName(settings.ClinicName);
      if (settings?.LogoUrl) setProfileImageUrl(settings.LogoUrl);
      if (settings?.BrandColour) setBrandColour(settings.BrandColour);
      setCtaConfig({
        bookNowShow: settings?.BookNowShow === 'True' || settings?.BookNowShow === true,
        bookNowText: settings?.BookNowLabel || '',
        bookNowUrl: settings?.BookNowUrl || '',
        sendEmailShow: settings?.SendAnEmailShow === 'True' || settings?.SendAnEmailShow === true,
        sendEmailText: settings?.SendAnEmailLabel || '',
        ctaTwoShow: settings?.CTATwoShow === 'True' || settings?.CTATwoShow === true,
        ctaTwoText: settings?.CTATwoLabel || '',
        ctaTwoUrl: settings?.CTATwoUrl || '',
        ctaThreeShow: settings?.CTAThreeShow === 'True' || settings?.CTAThreeShow === true,
        ctaThreeText: settings?.CTAThreeLabel || '',
        ctaThreeUrl: settings?.CTAThreeUrl || ''
      });

      const questions = await getStarterQuestions(WIDGET_ID);
      if (questions?.q1 || questions?.q2 || questions?.q3) {
        const qs = [
          questions.q1 && { q: questions.q1, a: questions.a1, url: questions.Url1, label: questions.ButtonLabel1 },
          questions.q2 && { q: questions.q2, a: questions.a2, url: questions.Url2, label: questions.ButtonLabel2 },
          questions.q3 && { q: questions.q3, a: questions.a3, url: questions.Url3, label: questions.ButtonLabel3 },
        ].filter(Boolean);
        if (qs.length) setStarterQuestions(qs);
      }
    } catch {
      // use defaults silently
    }
  };

  const ensureSession = async () => {
    if (sessionId) return sessionId;
    try {
      const sid = await insertUserChatSession(userIP, chatbotId);
      setSessionId(sid);
      setSessionTracked(true);
      return sid;
    } catch {
      return null;
    }
  };

  const handleSend = async (text) => {
    const msg = (text || inputValue).trim();
    if (!msg || isLoading) return;
    setInputValue('');
    setShowStarters(false);

    const sid = await ensureSession();

    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'user' }]);
    setIsLoading(true);

    try {
      const res = await fetchImprovedChatResponse(msg, sid, chatbotId, API_BASE_URL);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: res.response || res.message || 'Sorry, I could not process your request.',
          sender: 'bot',
          message_id: res.message_id,
          session_id: res.session_id || sid,
          userReaction: null,
          hasActionButton: res.has_action_button,
          actionButtons: res.action_buttons || [],
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: 'Sorry, I encountered an error. Please try again.', sender: 'bot', isError: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterClick = async (item) => {
    if (isLoading) return;
    setShowStarters(false);

    const sid = await ensureSession();

    setMessages(prev => [...prev, { id: Date.now(), text: item.q, sender: 'user' }]);

    if (item.a) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: item.a,
          sender: 'bot',
          hasActionButton: !!(item.url && item.label),
          actionButtons: item.url && item.label ? [{ [item.label]: item.url }] : [],
          userReaction: null,
        },
      ]);
    } else {
      setIsLoading(true);
      try {
        const res = await fetchImprovedChatResponse(item.q, sid, chatbotId, API_BASE_URL);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: res.response || res.message || 'Sorry, I could not process your request.',
            sender: 'bot',
            message_id: res.message_id,
            session_id: res.session_id || sid,
            userReaction: null,
            hasActionButton: res.has_action_button,
            actionButtons: res.action_buttons || [],
          },
        ]);
      } catch {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, text: 'Sorry, I encountered an error. Please try again.', sender: 'bot', isError: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReaction = async (messageId, msgSessionId, reaction) => {
    const current = messages.find(m => m.message_id === messageId);
    if (!current) return;
    const newReaction = current.userReaction === reaction ? null : reaction;
    setMessages(prev => prev.map(m => m.message_id === messageId ? { ...m, userReaction: newReaction } : m));
    try {
      await saveReaction(msgSessionId, messageId, newReaction, chatbotId, API_BASE_URL);
    } catch {
      setMessages(prev => prev.map(m => m.message_id === messageId ? { ...m, userReaction: null } : m));
    }
  };

  const handleBookNow = async () => {
    if (sessionId) {
      try {
        const clickId = await trackButtonClick(sessionId, ctaConfig.bookNowText, chatbotId);
        if (clickId) setBookNowClicksId(clickId);
      } catch {}
    }
    if (ctaConfig.bookNowUrl) window.open(ctaConfig.bookNowUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = async () => {
    const sid = await ensureSession();
    if (sid && ctaConfig.sendEmailText) {
      try {
        const clickId = await trackButtonClick(sid, ctaConfig.sendEmailText, chatbotId);
        if (clickId) setBookNowClicksId(clickId.trim());
      } catch {}
    }
    setIsEmailModalOpen(true);
  };

  const handleCTATwo = () => {
    if (ctaConfig.ctaTwoUrl) window.open(ctaConfig.ctaTwoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCTAThree = () => {
    if (ctaConfig.ctaThreeUrl) window.open(ctaConfig.ctaThreeUrl, '_blank', 'noopener,noreferrer');
  };

  const latestBotId = [...messages].reverse().find(m => m.sender === 'bot' && m.message_id)?.message_id;

  return (
    <>
    <EmailFormModal
      isOpen={isEmailModalOpen}
      onClose={() => setIsEmailModalOpen(false)}
      chatbotId={chatbotId}
      brandColour={brandColour}
      bookNowClicksId={bookNowClicksId}
    />
    <section className="mt-7 w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-3">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt={headerName} className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">AI</div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">{headerName}</p>
            <p className="text-xs text-emerald-600">Online now</p>
          </div>
        </div>
        <div className="text-right text-[11px] leading-tight text-slate-400">
          <p>Educational only</p>
          <p>Not medical advice</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="bg-slate-50 px-4 py-4 h-[420px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="mb-4 max-w-[88%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 shadow-sm">
            {welcomeMessage}
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, idx) => {
          const isLatestBot = msg.message_id && msg.message_id === latestBotId;
          return (
            <ChatMessage
              key={msg.id}
              message={msg}
              isLatestBot={isLatestBot}
              onReaction={handleReaction}
              profileImageUrl={profileImageUrl}
              headerName={headerName}
            />
          );
        })}

        {/* Typing indicator */}
        {isLoading && <TypingIndicator />}

        {/* Starter questions */}
        {showStarters && messages.length === 0 && (
          <div className="flex flex-col items-end space-y-3 mt-2">
            <p className="text-xs font-medium text-slate-500">Choose a topic to get started:</p>
            {starterQuestions.map((item, i) => (
              <button
                key={i}
                onClick={() => handleStarterClick(item)}
                disabled={isLoading}
                className="ml-auto block w-[86%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors text-right disabled:opacity-50"
              >
                {item.q}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* CTA Buttons */}
      <CTAButtons
        bookNowShow={ctaConfig.bookNowShow}
        bookNowText={ctaConfig.bookNowText}
        bookNowUrl={ctaConfig.bookNowUrl}
        sendEmailShow={ctaConfig.sendEmailShow}
        sendEmailText={ctaConfig.sendEmailText}
        ctaTwoShow={ctaConfig.ctaTwoShow}
        ctaTwoText={ctaConfig.ctaTwoText}
        ctaTwoUrl={ctaConfig.ctaTwoUrl}
        ctaThreeShow={ctaConfig.ctaThreeShow}
        ctaThreeText={ctaConfig.ctaThreeText}
        ctaThreeUrl={ctaConfig.ctaThreeUrl}
        onBookNow={handleBookNow}
        onSendEmail={handleSendEmail}
        onCTATwo={handleCTATwo}
        onCTAThree={handleCTAThree}
        brandColour={brandColour}
      />

      {/* Input area */}
      <div className="border-t border-slate-100 bg-white px-3 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your question..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white disabled:bg-slate-100 disabled:text-slate-400 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8L2 2l2 6-2 6 12-6z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <p className="mt-3 text-center text-[10px] text-slate-400">
          Educational information only · Not a substitute for professional medical advice · Powered by{' '}
          <span className="font-semibold text-slate-600">NeuraScaleX</span>
        </p>
      </div>
    </section>
    </>
  );
}
