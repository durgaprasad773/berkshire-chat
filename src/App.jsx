import React, { useEffect } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { initializeWidget } from './services/chatApi';
import './AppStyles.css';

export default function App() {
  useEffect(() => {
    initializeWidget().catch(error => {
      console.error('Failed to initialize widget:', error);
    });
  }, []);

  return (
    <main className="page" id="top">
      <div className="top-logo" aria-label="Berkshire Psychiatrist logo">
        <img 
          className="bp-logo" 
          src="https://static.wixstatic.com/media/700e69_2f4791b79eff4ec9b587f202b15d11b9~mv2.png/v1/fill/w_162%2Ch_60%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/logo-2022-v2.png" 
          alt="Berkshire Psychiatrist" 
        />
      </div>

      <section className="hero">
        <div className="avatar-wrap">
          <img 
            className="avatar" 
            src="https://static.wixstatic.com/media/02dd64_bee50af1fb264a0395f683625acfd98b~mv2.jpg/v1/crop/x_283%2Cy_0%2Cw_2002%2Ch_2002/fill/w_342%2Ch_342%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/CircleReading_AbrarHussain_Psyc3_edited.jpg" 
            alt="Dr Abrar Hussain" 
          />
        </div>
        <div className="brand-kicker">Ask Dr Abrar</div>
        <h1 className="hero-title">Berkshire Psychiatrist</h1>
        <p className="subtitle">
          A discreet information portal for adults exploring private psychiatry, FND, trauma-informed care, 
          appointments, fees, insurance, and the right next step.
        </p>
        <div className="pills">
          <span className="pill green">Adult Psychiatry</span>
          <span className="pill">FND & Mind–Body Symptoms</span>
          <span className="pill gold">Trauma-informed Care</span>
          <span className="pill">Consultant-led</span>
        </div>
      </section>

      <section id="ask" className="w-full">
        <ChatWidget />
      </section>

      <section className="section-card">
        <h2 className="section-title">
          <span className="title-icon">
            <svg viewBox="0 0 24 24">
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
            </svg>
          </span>
          Why Ask Dr Abrar exists
        </h2>
        <p>
          Many people are not ready to contact a private practice immediately. They first want to understand whether 
          private psychiatry is suitable, what an assessment involves, how fees and insurance work, whether their 
          concern fits Dr Abrar's scope, and what to do if the situation is urgent. Ask Dr Abrar gives visitors a 
          calm information portal before they contact the practice.
        </p>
      </section>

      <div className="divider-label">Quick Routes</div>
      <section className="links" aria-label="Useful links">
        <a className="link-card" href="mailto:admin@berkshirepsychiatrist.co.uk?subject=Private%20psychiatry%20consultation%20enquiry" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h16v16H4z"/>
              <path d="m22 6-10 7L2 6"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Contact Emma Selby's Team</strong>
            <span>admin@berkshirepsychiatrist.co.uk</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="tel:+441184164131" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1z"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Call the Practice</strong>
            <span>0118 416 4131</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.berkshirepsychiatrist.co.uk/#contact" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="M8 2v4M16 2v4M3 10h18"/>
              <rect x="3" y="4" width="18" height="18" rx="2"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Open Contact Form</strong>
            <span>Use the Berkshire Psychiatrist website contact route</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.berkshirepsychiatrist.co.uk/initial-assessment" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="M9 11h6M9 15h6"/>
              <path d="M7 3h10l3 3v15H4V6z"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Assessment & Care Planning</strong>
            <span>What to expect from an initial psychiatric assessment</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.berkshirepsychiatrist.co.uk/prescription-medication" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="M21 12a9 9 0 0 1-9 9"/>
              <path d="M3 12a9 9 0 0 1 9-9"/>
              <path d="m3 4 3 3-3 3"/>
              <path d="m21 20-3-3 3-3"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Review & Support</strong>
            <span>Follow-up support and care-plan review</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.berkshirepsychiatrist.co.uk/follow-up-care" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2v20M2 12h20"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Consultation & Advice</strong>
            <span>Guidance for individuals, families, clinicians, teams and organisations</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.berkshirepsychiatrist.co.uk/psychotherapy" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-1.5z"/>
              <path d="M8 7h7"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Education & Workshops</strong>
            <span>Educational sessions and workshops, subject to current availability</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.berkshirepsychiatrist.co.uk/about-me" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 22a8 8 0 0 1 16 0"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>View Professional Profile</strong>
            <span>Dr Abrar's background, training, approach and interests</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.berkshirepsychiatrist.co.uk/faq" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.5 1.5-2.4 2.2-.5.4-.5.8-.5 1.3"/>
              <path d="M12 17h.01"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Fees, Insurance & FAQs</strong>
            <span>Common questions before contacting the practice</span>
          </span>
          <span className="arrow">→</span>
        </a>

        <a className="link-card" href="https://www.cognitionsforcasc.co.uk/" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <svg viewBox="0 0 24 24">
              <path d="m22 10-10-5-10 5 10 5 10-5z"/>
              <path d="M6 12v5c3 2 9 2 12 0v-5"/>
            </svg>
          </span>
          <span className="link-text">
            <strong>Cognitions for CASC</strong>
            <span>Psychiatry exam preparation</span>
          </span>
          <span className="arrow">→</span>
        </a>
      </section>

      <section className="section-card">
        <h2 className="section-title">
          <span className="title-icon">
            <svg viewBox="0 0 24 24">
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
              <path d="M8.5 14a6 6 0 1 1 7 0c-.8.6-1.5 1.5-1.5 2.5h-4c0-1-.7-1.9-1.5-2.5z"/>
            </svg>
          </span>
          What Dr Abrar can help with
        </h2>
        <div className="help-grid">
          <div className="help-item">
            <strong>Depression, anxiety and stress-related conditions</strong>
            <span>Adult psychiatry support for common and complex mental-health presentations.</span>
          </div>
          <div className="help-item">
            <strong>Trauma and PTSD</strong>
            <span>Trauma-informed understanding, relational formulation, and treatment planning.</span>
          </div>
          <div className="help-item">
            <strong>Bipolar disorder and personality-related difficulties</strong>
            <span>Consultant-led assessment, formulation, review and care planning.</span>
          </div>
          <div className="help-item">
            <strong>FND and medically unexplained symptoms</strong>
            <span>Support where symptoms sit at the interface of physical and psychological health.</span>
          </div>
        </div>
        <div className="warning">
          ADHD screening may be included within a broader assessment, but Dr Abrar does not provide full ADHD 
          assessments or ADHD treatment. Crisis care and medicolegal work are not provided.
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title">
          <span className="title-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>
            </svg>
          </span>
          What to expect
        </h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <div>
              <strong>Initial assessment</strong>
              <span>A structured consultation to understand symptoms, history, previous treatment, current concerns and goals.</span>
            </div>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <div>
              <strong>Formulation</strong>
              <span>A working understanding that may draw on diagnosis, trauma-informed thinking, relationships, physical health and psychological factors.</span>
            </div>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <div>
              <strong>Collaborative plan</strong>
              <span>A care plan that may include therapy recommendations, medication options, review appointments or liaison with other professionals.</span>
            </div>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <div>
              <strong>Follow-up if needed</strong>
              <span>Review appointments may help monitor progress, adjust medication, discuss therapy or transition care back to a GP/clinician.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title">
          <span className="title-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2 3 7l9 5 9-5-9-5z"/>
              <path d="M3 17l9 5 9-5"/>
              <path d="M3 12l9 5 9-5"/>
            </svg>
          </span>
          Approach
        </h2>
        <div className="help-grid">
          <div className="help-item">
            <strong>Liaison Psychiatry</strong>
            <span>Specialist understanding of the overlap between physical symptoms, mental health and medical pathways.</span>
          </div>
          <div className="help-item">
            <strong>CAT, EMDR & trauma-informed care</strong>
            <span>A compassionate, relational approach grounded in safety, trust, collaboration and recovery.</span>
          </div>
          <div className="help-item">
            <strong>FND & mind–body symptoms</strong>
            <span>Clear explanations where nervous-system signalling is disrupted without structural damage.</span>
          </div>
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title">
          <span className="title-icon">
            <svg viewBox="0 0 24 24">
              <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>
              <path d="M12 9v4"/>
              <path d="M12 17h.01"/>
            </svg>
          </span>
          Crisis support
        </h2>
        <p>
          Ask Dr Abrar is not for emergencies. If you need urgent support, contact your out-of-hours GP service, 
          local mental health crisis team, NHS 111, or attend your local Emergency Department. Samaritans can be 
          contacted on 116 123, and Shout offers text-based crisis support by texting SHOUT to 85258.
        </p>
      </section>

      <section className="section-card">
        <h2 className="section-title">
          <span className="title-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 17.3 18.2 21l-1.7-7.1L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21z"/>
            </svg>
          </span>
          Patient feedback
        </h2>
        <p>
          Verified patient feedback is available through Doctify and the testimonials section on the Berkshire 
          Psychiatrist website.
        </p>
        <div className="cta-row" style={{padding:'18px 0 0', background:'transparent'}}>
          <a className="secondary-cta" href="https://www.berkshirepsychiatrist.co.uk/testimonials" target="_blank" rel="noopener noreferrer">
            View Testimonials
          </a>
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title">
          <span className="title-icon">
            <svg viewBox="0 0 24 24">
              <path d="M3 11h18"/>
              <path d="M11 3v18"/>
              <path d="M7 7h4v4H7z"/>
              <path d="M13 13h4v4h-4z"/>
            </svg>
          </span>
          Share Ask Dr Abrar
        </h2>
        <div className="share-card">
          <img src="/askabrar_live_qr.png" alt="QR code for Ask Dr Abrar" />
          <div>
            <strong>Scan to start</strong>
            <span>
              Use this QR code on LinkedIn posts, presentation slides, clinic handouts, talks, email signatures 
              and professional profiles.
            </span>
            <span style={{marginTop:'8px', color:'#102033', fontWeight:'900'}}>
              askabrar.neurascalex.com
            </span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="https://www.berkshirepsychiatrist.co.uk/" target="_blank" rel="noopener noreferrer">Website</a>
          <a href="https://www.berkshirepsychiatrist.co.uk/about-me" target="_blank" rel="noopener noreferrer">Profile</a>
          <a href="https://www.berkshirepsychiatrist.co.uk/faq" target="_blank" rel="noopener noreferrer">FAQ</a>
          <a href="https://www.berkshirepsychiatrist.co.uk/resources-1" target="_blank" rel="noopener noreferrer">Resources</a>
          <a href="https://www.berkshirepsychiatrist.co.uk/blog" target="_blank" rel="noopener noreferrer">Blog</a>
        </div>
        <div>© Berkshire Psychiatrist · Powered by <strong>NeuraScaleX</strong></div>
        <div style={{marginTop:'8px'}}>
          <a href="https://askabrar.neurascalex.com/" target="_blank" rel="noopener noreferrer">
            askabrar.neurascalex.com
          </a>
        </div>
        <div style={{marginTop:'8px', lineHeight:'1.45'}}>
          Information only. Not a substitute for professional medical advice, diagnosis, treatment, prescriptions, or crisis support.
        </div>
      </footer>

      <a className="floating-ask" href="#ask" aria-label="Go to Dr Abrar's Online Assistant">
        <span>●</span>
        <span>Ask Dr Abrar</span>
      </a>
    </main>
  );
}
