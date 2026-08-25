import React, { useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Laptop,
  ListChecks,
  MapPin,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/home/Footer';
import { submitLeadCapture } from '../services/leadCaptureService';
import { getVisitorContext } from '../services/visitorSession';

const PAGE_PATH = '/workshops/agentic-ai-personal-assistant';

const buildOutcomes = [
  'A clear assistant role built around how you work',
  'Trusted context covering priorities, preferences and boundaries',
  'Reusable instructions for recurring tasks',
  'A human approval step before important actions',
  'A working personal-assistant workflow you can improve over time',
];

const workshopFlow = [
  { number: '01', title: 'Choose the job', description: 'Identify one useful recurring responsibility for your assistant.' },
  { number: '02', title: 'Define how you work', description: 'Turn your goals, preferences and standards into clear instructions.' },
  { number: '03', title: 'Add trusted context', description: 'Give the assistant only the information it needs to produce relevant work.' },
  { number: '04', title: 'Build the workflow', description: 'Connect inputs, useful outputs and a repeatable review step.' },
  { number: '05', title: 'Test and improve', description: 'Run a real task, inspect the result and strengthen the assistant together.' },
];

const useCases = [
  { icon: ListChecks, title: 'Daily priorities', description: 'Turn scattered notes and commitments into a focused plan.' },
  { icon: MessageSquareText, title: 'Meeting support', description: 'Prepare agendas, organise notes and draft follow-up actions.' },
  { icon: BrainCircuit, title: 'Research briefs', description: 'Structure questions and synthesise trusted material into useful summaries.' },
  { icon: RefreshCw, title: 'Recurring work', description: 'Create repeatable first drafts for updates, reviews and routine tasks.' },
];

const learningOutcomes = [
  'Recognise where a personal assistant can save time without removing judgement',
  'Write clearer instructions that produce more consistent results',
  'Select useful context without over-sharing sensitive information',
  'Design approval checkpoints for higher-impact work',
  'Evaluate and improve an assistant using real outputs',
];

const faqs = [
  { question: 'Do I need coding experience?', answer: 'No. The workshop is designed for non-technical professionals and uses an accessible, guided build process.' },
  { question: 'Is the workshop really free?', answer: 'Yes. Workshop admission is complimentary. Any personal travel, food or incidental costs are not included.' },
  { question: 'What will I leave with?', answer: 'You will leave with a working personal-assistant workflow, reusable instructions and a blueprint you can continue improving.' },
  { question: 'Which AI tool will we use?', answer: 'The confirmed tool and access requirements will be shared before the workshop. The core workflow principles are designed to transfer across modern AI assistants.' },
  { question: 'Will the assistant act without my approval?', answer: 'No. The workshop teaches human-in-the-loop design, with clear review and approval boundaries before important actions.' },
  { question: 'When and where is the workshop?', answer: 'The date, time and venue are being confirmed. Register now and we will send the final session details when available.' },
];

const AgenticAIPersonalAssistantWorkshopPage: React.FC = () => {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', role: '', companyName: '', ageBand: 'below_40' as 'below_40' | '40_and_above' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    const visitor = getVisitorContext();

    try {
      await submitLeadCapture({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role.trim(),
        companyName: form.companyName.trim(),
        departmentOrDesignation: form.role.trim(),
        leadFlow: 'apply_now',
        ageBand: form.ageBand,
        preferredIntake: 'Agentic AI Personal Assistant workshop — schedule to be confirmed',
        cohortCode: 'AGENTIC-AI-PERSONAL-ASSISTANT-TBC',
        courseSlug: 'agentic-ai-personal-assistant-workshop',
        intent: 'reserve_seat',
        payerType: 'self',
        sponsorContactName: '',
        sponsorContactEmail: '',
        sponsorStatus: 'not_applicable',
        sourceTag: 'agentic_ai_personal_assistant_workshop_registration',
        pagePath: PAGE_PATH,
        visitorId: visitor?.visitorId,
        sessionId: visitor?.sessionId,
        landingPath: visitor?.landingPath,
        referrer: visitor?.referrer,
        leadSource: visitor?.leadSource || 'agentic_ai_personal_assistant_workshop_registration',
        utmSource: visitor?.utmSource,
        utmMedium: visitor?.utmMedium,
        utmCampaign: visitor?.utmCampaign,
        utmContent: visitor?.utmContent,
        deviceType: visitor?.deviceType,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="Build Your Own Agentic AI Personal Assistant Workshop | Nexius Academy"
        description="Join a free, two-hour hands-on workshop for non-technical professionals. Build an agentic AI personal assistant for recurring work—no coding required."
        canonical={PAGE_PATH}
      />
      <main className="min-h-screen overflow-hidden bg-[#031716] text-white">
        <section className="relative border-b border-accent/15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(0,202,186,0.18),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(0,143,131,0.22),transparent_38%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(0,202,186,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,202,186,.12)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-7 sm:px-8 lg:px-10 lg:pb-28">
            <header className="mb-16 flex items-center justify-between">
              <a href="/" aria-label="Nexius Academy home"><img src="/images/brand/nexius-academy-horizontal.webp" alt="Nexius Academy" className="h-12 w-auto sm:h-14" /></a>
              <a href="#register" className="rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-bold text-accent transition hover:bg-accent/20">Reserve your free seat</a>
            </header>

            <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_.88fr]">
              <div>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-accent"><span className="h-2 w-2 rounded-full bg-accent" /> Free 2-hour hands-on workshop</div>
                <h1 className="max-w-4xl text-balance text-5xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">Build Your Own <span className="text-accent">Agentic AI Personal Assistant</span></h1>
                <p className="mt-7 max-w-2xl text-lg font-bold text-white sm:text-xl">Stop starting from a blank chat.</p>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-300">Build a practical AI assistant that understands how you work, helps organise what matters and supports recurring tasks using clear instructions, trusted context and human approval.</p>
                <div className="mt-9 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><Clock3 className="h-4 w-4 text-accent" /> 2 hours</span>
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><Laptop className="h-4 w-4 text-accent" /> Hands-on</span>
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><ShieldCheck className="h-4 w-4 text-accent" /> No coding required</span>
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Leave with a working assistant</span>
                </div>
                <a href="#register" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-4 font-black text-primary transition hover:bg-[#00b4a5]">Reserve your free seat <ArrowRight className="h-5 w-5" /></a>
              </div>

              <div className="relative mx-auto w-full max-w-lg">
                <div className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative rounded-3xl border border-accent/25 bg-[#062825]/90 p-4 shadow-2xl shadow-black/50">
                  <div className="flex items-center gap-2 border-b border-white/10 px-2 pb-4"><span className="h-3 w-3 rounded-full bg-rose-400" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div>
                  <div className="space-y-4 p-3 sm:p-6">
                    <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4"><span className="text-xs font-bold uppercase tracking-widest text-accent">How you work</span><p className="mt-2 font-semibold">Goals · Preferences · Trusted context</p></div>
                    <div className="flex justify-center text-accent"><ArrowRight className="h-6 w-6 rotate-90" /></div>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold sm:text-sm"><div className="rounded-xl bg-white/5 p-3">Organise</div><div className="rounded-xl bg-white/5 p-3">Support</div><div className="rounded-xl bg-white/5 p-3">Review</div></div>
                    <div className="flex justify-center text-accent"><ArrowRight className="h-6 w-6 rotate-90" /></div>
                    <div className="rounded-2xl bg-gradient-to-r from-accent to-[#008f83] p-5 text-center font-black text-primary shadow-lg">Your working personal assistant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_.82fr]">
            <div>
              <p className="font-bold uppercase tracking-[.2em] text-accent">From blank chat to useful system</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">A personal assistant built around your real work.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Generic chats forget your standards and make you repeat yourself. In this workshop, you will turn the way you already work into a reusable assistant with clear responsibilities, relevant context and approval boundaries.</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {buildOutcomes.map((outcome) => <div key={outcome} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-4"><Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-accent p-1 text-primary" /><span className="font-semibold leading-6">{outcome}</span></div>)}
              </div>
            </div>

            <aside id="register" className="scroll-mt-8">
              <div className="sticky top-8 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
                {status === 'success' ? (
                  <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-[#008f83]" /><h2 className="mt-5 text-2xl font-black">Your seat request is received.</h2><p className="mt-3 leading-7 text-slate-600">We’ll contact you when the workshop date, time and venue are confirmed.</p></div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 font-bold text-[#007f75]"><Sparkles className="h-5 w-5" /> Free workshop registration</div>
                    <h2 className="mt-3 text-3xl font-black tracking-tight">Reserve your free seat</h2>
                    <div className="mt-4 space-y-2 rounded-2xl bg-[#e8fffc] p-4 text-sm text-slate-700">
                      <p className="flex gap-2"><CalendarDays className="h-5 w-5 shrink-0 text-[#007f75]" /><strong>Date and time to be confirmed</strong></p>
                      <p className="flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-[#007f75]" /><strong>Venue to be confirmed</strong></p>
                      <p className="border-t border-accent/25 pt-3 leading-6"><strong>Complimentary admission.</strong> Final session details will be sent to registered participants.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                      <label className="block text-sm font-bold">Full name<input required autoComplete="name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" /></label>
                      <label className="block text-sm font-bold">Work email<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" /></label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-bold">Mobile number<input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                        <label className="block text-sm font-bold">Role<input required autoComplete="organization-title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                      </div>
                      <label className="block text-sm font-bold">Company <span className="font-normal text-slate-400">(optional)</span><input autoComplete="organization" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-accent" /></label>
                      <label className="block text-sm font-bold">Age group<select value={form.ageBand} onChange={(e) => setForm({ ...form, ageBand: e.target.value as 'below_40' | '40_and_above' })} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-accent"><option value="below_40">Below 40</option><option value="40_and_above">40 and above</option></select></label>
                      {status === 'error' && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">We couldn’t submit the form. Please try again or email hello@nexiuslabs.com.</p>}
                      <button disabled={status === 'submitting'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-4 font-black text-primary transition hover:bg-[#00b4a5] disabled:cursor-wait disabled:opacity-60">{status === 'submitting' ? 'Submitting…' : 'Reserve your free seat'}<ArrowRight className="h-5 w-5" /></button>
                      <p className="text-center text-xs leading-5 text-slate-500">By registering, you agree to be contacted about this workshop. No spam.</p>
                    </form>
                  </>
                )}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[.025] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-bold uppercase tracking-[.2em] text-accent">Five-step workshop flow</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Build it one practical step at a time.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {workshopFlow.map((step) => <div key={step.number} className="rounded-2xl border border-white/10 bg-[#062825] p-5"><span className="text-sm font-black text-accent">{step.number}</span><h3 className="mt-4 text-lg font-black">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p></div>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="font-bold uppercase tracking-[.2em] text-accent">Personal-assistant use cases</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Start with work you already do.</h2>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">{useCases.map(({ icon: Icon, title, description }) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><Icon className="h-6 w-6 text-accent" /><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></div>)}</div>
            </div>
            <div>
              <p className="font-bold uppercase tracking-[.2em] text-accent">Learning outcomes</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Know how to guide, review and improve it.</h2>
              <div className="mt-9 space-y-4">{learningOutcomes.map((outcome) => <div key={outcome} className="flex gap-4"><CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent" /><p className="leading-7 text-slate-300">{outcome}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[.025] py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-3 lg:px-10">
            <div className="rounded-3xl border border-white/10 bg-[#062825] p-7"><Users className="h-8 w-8 text-accent" /><h2 className="mt-5 text-2xl font-black">Who it’s for</h2><p className="mt-4 leading-7 text-slate-300">Founders, consultants, managers, marketers and professionals who want practical AI support without learning to code.</p></div>
            <div className="rounded-3xl border border-white/10 bg-[#062825] p-7"><Laptop className="h-8 w-8 text-accent" /><h2 className="mt-5 text-2xl font-black">What to bring</h2><p className="mt-4 leading-7 text-slate-300">A laptop, access to the confirmed AI tool and one recurring task you would genuinely like help with.</p></div>
            <div className="rounded-3xl border border-white/10 bg-[#062825] p-7"><FileCheck2 className="h-8 w-8 text-accent" /><h2 className="mt-5 text-2xl font-black">Privacy boundaries</h2><p className="mt-4 leading-7 text-slate-300">Use non-sensitive examples, share only necessary context and keep a human approval step before consequential actions.</p></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid items-center gap-10 rounded-3xl border border-accent/20 bg-[#062825] p-7 sm:p-10 lg:grid-cols-[auto_1fr]">
            <img src="/images/authors/melverick-ng.jpg" alt="Melverick Ng, Nexius Academy trainer" className="h-36 w-36 rounded-2xl object-cover shadow-xl" />
            <div><p className="font-bold uppercase tracking-[.2em] text-accent">Your trainer</p><h2 className="mt-3 text-3xl font-black">Melverick Ng</h2><p className="mt-4 max-w-3xl leading-7 text-slate-300">Founder of Nexius Labs and lead trainer at Nexius Academy. Melverick helps non-technical professionals turn AI concepts into practical, governed workflows they can use at work.</p></div>
          </div>
        </section>

        <section className="bg-accent px-5 py-16 text-center text-primary">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Stop starting from a blank chat.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8">Reserve your free seat and build a personal assistant designed around the way you work.</p>
          <a href="#register" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-4 font-black text-white">Reserve your free seat <ArrowRight className="h-5 w-5" /></a>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-center font-bold uppercase tracking-[.2em] text-accent">FAQs</p>
          <h2 className="mt-4 text-center text-3xl font-black tracking-tight sm:text-5xl">What to know before you join.</h2>
          <div className="mt-10 space-y-4">{faqs.map((faq) => <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[.035] p-5"><summary className="cursor-pointer list-none pr-6 font-black">{faq.question}</summary><p className="mt-4 leading-7 text-slate-300">{faq.answer}</p></details>)}</div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default AgenticAIPersonalAssistantWorkshopPage;
