import React from 'react';
import { ChatWidget } from './components/ChatWidget';

const quickLinks = [
  {
    icon: '📅',
    title: 'Book a Consultation',
    subtitle: 'Via Berkshire Psychiatrist',
    href: 'https://www.berkshirepsychiatrist.co.uk/',
    emphasis: true,
  },
  {
    icon: '✉️',
    title: "Contact Emma Selby's Team",
    subtitle: 'admin@berkshirepsychiatrist.co.uk',
    href: 'mailto:admin@berkshirepsychiatrist.co.uk',
  },
  {
    icon: '☎️',
    title: 'Call the Practice',
    subtitle: '0118 416 4131',
    href: 'tel:01184164131',
  },
  {
    icon: '🌐',
    title: 'View Professional Profile',
    subtitle: 'drabrarhussain.com',
    href: 'https://www.drabrarhussain.com/',
  },
  {
    icon: '🎓',
    title: 'Cognitions for CASC',
    subtitle: 'Psychiatry exam preparation',
    href: 'https://www.cognitionsforcasc.co.uk/',
  },
];

const conditions = [
  'Depression',
  'Anxiety and stress-related conditions',
  'Trauma and PTSD',
  'Functional Neurological Disorder (FND)',
  'Medically unexplained symptoms',
  'Personality-related difficulties',
];

const steps = [
  {
    title: 'Initial assessment',
    text: 'A structured consultation to understand symptoms, background, and current concerns.',
  },
  {
    title: 'Formulation',
    text: 'Understanding how biological, psychological, relational, and nervous-system factors may interact.',
  },
  {
    title: 'Collaborative plan',
    text: 'A practical next-step plan, which may include medication review, therapy referral, or follow-up support.',
  },
  {
    title: 'Follow-up if needed',
    text: 'Ongoing review is arranged depending on clinical need and suitability.',
  },
];

const expertise = [
  {
    icon: '🧠',
    title: 'Liaison Psychiatry',
    text: 'Specialist understanding of the overlap between physical symptoms, mental health, and medical pathways.',
  },
  {
    icon: '💙',
    title: 'FND & Mind–Body Symptoms',
    text: 'Clear, non-alarmist explanations of symptoms where nervous-system signalling is disrupted without structural damage.',
  },
  {
    icon: '💬',
    title: 'Relational & Trauma-Informed Care',
    text: 'A formulation-led approach drawing on CAT-informed and trauma-aware principles.',
  },
];

export default function App() {
  const scrollToAssistant = () => {
    const el = document.getElementById('ask-assistant');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-[#eef4fa] text-slate-900" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <section className="mx-auto flex w-full max-w-[440px] flex-col items-center px-4 py-8 sm:py-10">

        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/50">
            <img src="/logo.png" alt="Dr Abrar Hussain" className="h-16 w-16 rounded-xl object-cover" />
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-slate-950" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Berkshire Psychiatrist
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-700">Dr Abrar Hussain FRCPsych &amp; Team</p>
          <p className="mt-1 text-sm text-slate-500">Consultant Psychiatrist · Liaison Psychiatry · Reading</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">Adult Psychiatry</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">FND &amp; Mind–Body</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">Consultant-led</span>
          </div>
        </header>

        {/* Functional Chat Widget */}
        <div id="ask-assistant">
          <ChatWidget />
        </div>

        {/* Divider */}
        <div className="my-6 flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Quick Links</p>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Quick Links */}
        <section className="w-full space-y-3">
          {quickLinks.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex items-center gap-4 rounded-2xl border bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                item.emphasis ? 'border-blue-500' : 'border-slate-200'
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${
                item.emphasis ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
              }`}>
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
              </div>
              <span className="text-slate-400 transition group-hover:translate-x-1">→</span>
            </a>
          ))}
        </section>

        {/* What Dr Abrar Can Help With */}
        <section className="mt-8 w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-950">What Dr Abrar Can Help With</h2>
          <div className="grid grid-cols-1 gap-2">
            {conditions.map((condition) => (
              <div key={condition} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {condition}
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-amber-50 px-3 py-3 text-xs leading-5 text-amber-800">
            ADHD screening may be included within broader assessment, but Dr Abrar does not provide full ADHD or dementia assessments. Crisis care and medicolegal work are not provided.
          </p>
        </section>

        {/* What to Expect */}
        <section className="mt-4 w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-950">What to Expect</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section className="mt-4 w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-950">Approach</h2>
          <div className="space-y-3">
            {expertise.map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-900">
                  <span>{item.icon}</span>
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <p className="text-sm leading-5 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Patient Feedback */}
        <section className="mt-4 w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">Patient Feedback</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Verified patient feedback is available through Doctify and the testimonials section on the Berkshire Psychiatrist website.
          </p>
          <a
            href="https://www.doctify.com/uk/specialist/dr-abrar-hussain"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900"
          >
            View Doctify Reviews <span>→</span>
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center gap-3 pb-6 text-center text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <a href="https://www.berkshirepsychiatrist.co.uk/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-3 py-2 text-slate-500 shadow-sm">Website</a>
            <a href="https://www.drabrarhussain.com/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-3 py-2 text-slate-500 shadow-sm">Profile</a>
            <a href="https://www.cognitionsforcasc.co.uk/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-3 py-2 text-slate-500 shadow-sm">CASC</a>
          </div>
          <p>© Berkshire Psychiatrist · AI page by <span className="font-semibold text-slate-600">NeuraScaleX</span></p>
          <p>askabrar.neurascalex.com</p>
        </footer>
      </section>

      {/* Floating Chat Button */}
<button
  type="button"
  onClick={scrollToAssistant}
  aria-label="Ask Dr Abrar"
  style={{
    position: 'fixed',
    right: 18,
    bottom: 18,
    zIndex: 50,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,

    // Berkshire Psychiatrist branding colours
    background: 'linear-gradient(135deg, #00534f, #0b7c75)',
    color: '#fff',
    border: '2px solid rgba(255,255,255,0.9)',
    borderRadius: 999,
    padding: '13px 17px',
    boxShadow: '0 18px 36px rgba(0,83,79,0.28)',

    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 22px 44px rgba(0,83,79,0.34)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,83,79,0.28)';
  }}
>
  <span
    style={{
      width: 30,
      height: 30,
      borderRadius: 999,
      display: 'grid',
      placeItems: 'center',

      // softer brand aqua for icon circle
      background: '#43aaa1',
      color: '#fff',
      fontSize: 15,
      flexShrink: 0,
    }}
  >
    💬
  </span>
  <span style={{ whiteSpace: 'nowrap' }}>Ask Dr Abrar</span>
</button>

    </main>
  );
}
