import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import SEO from '../components/SEO';
import ActionKitAssessment from '../components/career/ActionKitAssessment';
import { trackEvent } from '../services/analytics';

const levels = [
  { id: 'explorer', label: 'Explorer', result: 'You are building safe AI foundations.', guidance: 'Focus on task framing, structured requests, data boundaries and a simple review checklist.', artifact: 'A tested instruction-and-review card for one recurring task.', statements: ['I can describe a work problem clearly.', 'I know AI output can be wrong.', 'I avoid confidential and personal data.', 'I can compare and improve two outputs.'] },
  { id: 'collaborator', label: 'Collaborator', result: 'You are ready to move from prompting to workflow design.', guidance: 'Make steps, handoffs, checks and human decisions visible so the result is repeatable.', artifact: 'A before/after process map with a verification gate.', statements: ['I give AI useful context and an output format.', 'I refine the result with feedback.', 'I verify claims, sources and calculations.', 'I can explain what the human remains responsible for.'] },
  { id: 'workflow_builder', label: 'Workflow Builder', result: 'You are ready to strengthen governance and evidence.', guidance: 'Add exception handling, test cases, approval records and a business outcome you can defend.', artifact: 'A governed workflow blueprint and short test log.', statements: ['I map multi-step work and handoffs.', 'I define approval and exception gates.', 'I test normal and failure cases.', 'I produce an audit trail or portfolio artifact.'] },
] as const;

const capabilities = ['Problem framing', 'Workflow design', 'AI collaboration', 'Verification and governance', 'Evidence of application'];
const bookingUrl = 'https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb@nexiuslabs.com/meetingtype/rQlRqMpqtECRRRNfXW-T9A2?anonymous&ismsaljsauthenabled&ep=mlink';
const validPhone = (value: string) => /^\+?[0-9]{7,15}$/.test(value.replace(/[\s().-]/g, ''));

const AICareerFairPage: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const result = useMemo(() => {
    const counts = levels.map(level => ({ level, count: level.statements.filter((_, i) => checked[`${level.id}-${i}`]).length }));
    let best = counts[0];
    for (const item of counts.slice(1)) if (item.count > best.count || (item.count === best.count && item.count >= 3)) best = item;
    return best.count ? best.level : null;
  }, [checked]);
  const bookingReady = bookingName.trim().length >= 2 && validPhone(bookingPhone);

  return <div className="min-h-screen bg-[#f7f8fc] text-gray-800">
    <SEO title="AI Career Readiness Action Kit | Nexius Academy" description="Assess your AI career readiness, build a practical 90-day action plan and book a 15-minute consultation." canonical="/ai-career" />
    <Navbar />
    <main>
      <section className="relative overflow-hidden bg-[#001827] pt-28 text-white lg:pt-0">
        <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-[#001827] via-[#001827]/95 to-transparent lg:block" aria-hidden="true" />
        <div className="container-page relative z-10 py-12 lg:flex lg:min-h-[620px] lg:items-center lg:py-24"><div className="lg:max-w-[48%]"><p className="mb-5 text-xs font-bold tracking-[.18em] text-teal-200">TECH &amp; ACCOUNTANCY CAREER FAIR 2026 · AI CAREER READINESS ACTION KIT</p><h1 className="text-balance text-4xl font-black leading-[1.05] md:text-6xl">AI changes tasks before it changes job titles.</h1><p className="mt-6 text-lg leading-8 text-purple-50">Understand the shift, assess your work and build a practical 30/60/90-day plan for Tech or Accountancy.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><a href="#action-kit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white shadow-lg hover:bg-accent/90">Build my kit <ArrowRight size={18}/></a><a href="#self-check" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/50 px-6 py-3 font-bold hover:bg-white/10">Check my readiness</a></div><p className="mt-5 text-sm text-purple-100">Your personalised 8-page PDF is generated privately in your browser. No coding required.</p></div></div>
        <img src="/images/career/ai-career-readiness-hero.jpg" alt="Three early-career professionals walking towards connected Tech and Accountancy opportunities" width="1280" height="720" loading="eager" className="relative z-0 block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-contain lg:object-right" />
      </section>

      <section className="container-page py-16"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Practical role examples','Two-minute self-check','30-day action plan','Human-led, privacy-aware guidance'].map(item => <div key={item} className="flex items-center gap-3 rounded-xl border border-purple-100 bg-white p-4 shadow-sm"><Check className="text-secondary" size={20}/><span className="font-semibold">{item}</span></div>)}</div></section>

      <ActionKitAssessment />

      <section className="bg-white py-20"><div className="container-page"><p className="text-sm font-bold uppercase tracking-wider text-secondary">Transferable skills</p><h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">Five AI capabilities employers can use</h2><p className="mt-3 text-gray-600">Tools will change. These capabilities travel with you.</p><div className="mt-8 grid gap-4 md:grid-cols-5">{capabilities.map((item,i)=><div key={item} className="rounded-xl bg-purple-50 p-5"><span className="text-sm font-black text-secondary">0{i+1}</span><h3 className="mt-2 font-bold text-primary">{item}</h3></div>)}</div><blockquote className="mt-8 rounded-xl border-l-4 border-accent bg-orange-50 p-6 font-semibold text-primary">“I used AI” is weak evidence. “I mapped the process, limited the data, designed review gates, tested exceptions and documented the result” is credible.</blockquote></div></section>

      <section className="container-page py-20" id="self-check"><p className="text-sm font-bold uppercase tracking-wider text-secondary">Two-minute self-check</p><h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">Where are you now?</h2><p className="mt-3 text-gray-600">Select every statement you can demonstrate, not merely explain.</p><div className="mt-8 grid gap-6 lg:grid-cols-3">{levels.map(level=><fieldset key={level.id} className="rounded-2xl bg-white p-6 shadow-sm"><legend className="text-xl font-black text-primary">{level.label}</legend><div className="mt-4 space-y-4">{level.statements.map((statement,i)=><label key={statement} className="flex cursor-pointer gap-3 leading-6"><input className="mt-1 h-5 w-5 accent-secondary" type="checkbox" checked={!!checked[`${level.id}-${i}`]} onChange={e=>setChecked(v=>({...v,[`${level.id}-${i}`]:e.target.checked}))}/><span>{statement}</span></label>)}</div></fieldset>)}</div>{result&&<div className="mt-8 rounded-2xl bg-primary p-7 text-white" aria-live="polite"><p className="text-sm font-bold uppercase tracking-wider text-teal-200">Your task-specific level: {result.label}</p><h3 className="mt-2 text-2xl font-black">{result.result}</h3><p className="mt-3 text-purple-100">{result.guidance}</p><p className="mt-4"><strong>Next artifact:</strong> {result.artifact}</p></div>}</section>

      <section className="bg-gradient-to-r from-secondary to-[#0d807d] py-16 text-white"><div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><h2 className="text-3xl font-black">Build the Action Kit you will actually use</h2><p className="mt-3 max-w-2xl text-teal-50">Your personalised download turns your field, role, concern and selected tasks into an opportunity map, focused skills and a 30/60/90-day plan.</p></div><a href="#action-kit" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-primary shadow-lg">Complete the check <ArrowRight size={18}/></a></div></section>

      <section className="container-page py-20" id="consultation"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-wider text-secondary">Founder guidance</p><h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">Book a 15-minute AI career consultation</h2><p className="mt-4 text-lg leading-8 text-gray-600">Receive one personalised AI-career recommendation and one practical next step for your target role.</p><div className="mt-6 rounded-xl bg-purple-50 p-5 text-sm leading-6 text-primary"><ShieldCheck className="mb-2 text-secondary"/><strong>Choose a suitable time directly in the booking calendar.</strong> Your meeting is confirmed only after you complete the Outlook booking process.</div></div>
        <form onSubmit={event=>event.preventDefault()} className="rounded-2xl bg-white p-6 shadow-xl md:p-8"><div className="grid gap-5"><Field label="Name" value={bookingName} onChange={setBookingName} autoComplete="name"/><Field label="Phone number" type="tel" value={bookingPhone} onChange={setBookingPhone} autoComplete="tel" hint="Include country code, for example +65 …"/></div><p className="mt-5 text-sm text-gray-600" aria-live="polite">{bookingReady?'You can now open the booking calendar.':'Enter your name and a valid phone number to enable booking.'}</p><a href={bookingReady?bookingUrl:undefined} target={bookingReady?'_blank':undefined} rel={bookingReady?'noreferrer':undefined} aria-disabled={!bookingReady} tabIndex={bookingReady?0:-1} onClick={bookingReady?()=>trackEvent('consultation_booking_opened', { campaign: 'career_fair_2026', source: 'booth_qr' }):event=>event.preventDefault()} className={`mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-lg px-6 py-3 font-bold text-white shadow-lg ${bookingReady?'bg-accent hover:bg-accent/90':'cursor-not-allowed bg-gray-400'}`}>Book this meeting</a><p className="mt-4 text-xs leading-5 text-gray-500">These details stay on this page and are not submitted by Nexius Academy. Enter them again if requested in the Microsoft booking form.</p></form>
      </div></section>

      <section className="bg-white py-20"><div className="container-page"><h2 className="text-3xl font-black text-primary">Want guided practice after the career fair?</h2><p className="mt-3 max-w-3xl text-gray-600">Agentic AI Foundations for Non-Technical Professionals is a practical, no-code, 2-day course for turning everyday work into governed AI-assisted workflows with human review built in.</p><div className="mt-8 grid gap-6 md:grid-cols-2">{[['September cohort','18 & 25 September 2026','9:00am–6:00pm'],['October cohort','9 & 16 October 2026','9:00am–5:00pm']].map(cohort=><article className="rounded-2xl border border-purple-100 p-6" key={cohort[0]}><h3 className="text-xl font-black text-primary">Agentic AI Foundations — {cohort[0]}</h3><p className="mt-3 font-semibold">{cohort[1]} · {cohort[2]}</p><p className="mt-2 text-gray-600">In person · Singapore Institute of Management, 461 Clementi Road</p><p className="mt-2 text-sm text-gray-500">SkillsFuture-eligible. Final payable amount and live seat availability depend on learner eligibility and the registration channel.</p><a href="/courses/agentic-ai/?lead=join-next-cohort&lead_source=career_fair_2026" className="mt-5 inline-flex items-center gap-2 font-bold text-secondary">View registration <ArrowRight size={17}/></a></article>)}</div></div></section>
    </main>
    <Footer />
  </div>;
};

const fieldClass='mt-2 min-h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10';
function Field({label,value,onChange,type='text',autoComplete,hint}:{label:string;value:string;onChange:(v:string)=>void;type?:string;autoComplete?:string;hint?:string}) { return <label className="block font-semibold text-primary">{label}<input className={fieldClass} type={type} value={value} onChange={e=>onChange(e.target.value)} autoComplete={autoComplete} required/>{hint&&<span className="mt-1 block text-xs font-normal text-gray-500">{hint}</span>}</label>; }

export default AICareerFairPage;
