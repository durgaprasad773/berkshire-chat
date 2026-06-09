import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { CTAButtons } from './CTAButtons';
import { EmailFormModal } from './EmailFormModal';
import {
  getWidgetId,
  fetchImprovedChatResponse,
  saveReaction,
  getClinicSettings,
  getStarterQuestions,
  fetchUserIP,
  getWidgetRegistration,
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
  const [chatbotId] = useState(getWidgetId());
  const [userIP, setUserIP] = useState('127.0.0.1');
  const [widgetWebUrlId, setWidgetWebUrlId] = useState(null);
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

      // Fetch widget registration to get WidgetWebUrlId
      const webUrl = window.location.href;
      const registration = await getWidgetRegistration(webUrl);
      if (registration?.WidgetWebUrlId) {
        setWidgetWebUrlId(registration.WidgetWebUrlId);
      }

      const settings = await getClinicSettings(getWidgetId());
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

      const questions = await getStarterQuestions(getWidgetId());
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
      const sid = await insertUserChatSession(userIP, chatbotId, widgetWebUrlId);
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
    <section className="assistant-card">
      {/* Header */}
      <div className="assistant-header">
        <div className="assistant-title">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt={headerName} />
          ) : (
            <img src="https://static.wixstatic.com/media/02dd64_bee50af1fb264a0395f683625acfd98b~mv2.jpg/v1/crop/x_283%2Cy_0%2Cw_2002%2Ch_2002/fill/w_342%2Ch_342%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/CircleReading_AbrarHussain_Psyc3_edited.jpg" alt="Dr Abrar's Online Assistant" />
          )}
          <div>
            <strong>{headerName || "Dr Abrar's Online Assistant"}</strong>
            <span><i className="online-dot"></i> Online now</span>
          </div>
        </div>
        <div className="safety-note">
          Information only<br/>Not medical advice
        </div>
      </div>

      {/* Chat window */}
      <div className="chat-window">
        {/* Welcome/first bot message */}
        {messages.length === 0 && (
          <div className="bubble bot">
            <p>{welcomeMessage}</p>
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
          <>
            <div className="topic-label">Choose a topic to get started</div>
            <div className="topic-buttons">
              {starterQuestions.map((item, i) => (
                <button
                  key={i}
                  className="topic-button"
                  onClick={() => handleStarterClick(item)}
                  disabled={isLoading}
                >
                  {item.q}
                </button>
              ))}
            </div>
          </>
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

      {/* Input area - functional styled as askabrar */}
      <div className="input-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your question..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          disabled={isLoading}
          style={{
            flex: 1,
            minHeight: '44px',
            borderRadius: '14px',
            border: '1px solid #dce8ee',
            background: 'white',
            padding: '0 14px',
            fontSize: '14px',
            fontFamily: 'inherit',
            color: '#233044'
          }}
        />
        <button 
          className="send-fake"
          onClick={() => handleSend()}
          disabled={!inputValue.trim() || isLoading}
          style={{
            opacity: (!inputValue.trim() || isLoading) ? 0.5 : 1,
            cursor: (!inputValue.trim() || isLoading) ? 'not-allowed' : 'pointer'
          }}
        >
          ↑
        </button>
      </div>
      
      <div className="micro-disclaimer">
        Information only. Not a substitute for professional medical advice, diagnosis, treatment, medication advice, repeat prescriptions, or crisis support.
      </div>
    </section>
    </>
  );
}
