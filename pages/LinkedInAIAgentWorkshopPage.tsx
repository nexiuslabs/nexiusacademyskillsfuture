import React, { useState } from 'react';
import { ArrowRight, CalendarDays, Check, CheckCircle2, Clock3, Laptop, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { submitLeadCapture } from '../services/leadCaptureService';
import { getVisitorContext } from '../services/visitorSession';

const PAGE_PATH = '/workshops/linkedin-ai-agent';

const outcomes = [
  'Define your audience, goals and content pillars',
  'Turn your expertise into clear agent instructions',
  'Create a research-to-draft workflow',
  'Add review, approval and quality safeguards',
  'Test the agent on a real LinkedIn brief',
  'Take home a reusable agent blueprint',
];

const LinkedInAIAgentWorkshopPage: React.FC = () => {
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
        preferredIntake: '16 September, 12:30pm–2:30pm at Hotel Boss',
        cohortCode: 'LINKEDIN-AI-AGENT-16SEP',
        courseSlug: 'linkedin-ai-agent-workshop',
        intent: 'reserve_seat',
        payerType: 'self',
        sponsorContactName: '',
        sponsorContactEmail: '',
        sponsorStatus: 'not_applicable',
        sourceTag: 'linkedin_ai_agent_workshop_registration',
        pagePath: PAGE_PATH,
        visitorId: visitor?.visitorId,
        sessionId: visitor?.sessionId,
        landingPath: visitor?.landingPath,
        referrer: visitor?.referrer,
        leadSource: visitor?.leadSource || 'linkedin_ai_agent_workshop_registration',
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
        title="Build Your Own LinkedIn AI Agent Workshop | Nexius Academy"
        description="A hands-on, no-code workshop for professionals who want a practical LinkedIn content copilot they control. Bring a laptop and leave with a reusable agent."
        canonical={PAGE_PATH}
      />
      <main className="min-h-screen overflow-hidden bg-[#030d1d] text-white">
        <section className="relative border-b border-cyan-400/15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(30,167,237,0.18),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(10,83,160,0.22),transparent_38%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(50,178,238,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(50,178,238,.12)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-7 sm:px-8 lg:px-10 lg:pb-28">
            <header className="mb-16 flex items-center justify-between">
              <a href="https://nexiuslabs.com" aria-label="Nexius Labs home" className="flex items-center gap-3 font-black tracking-tight">
                <span className="text-4xl leading-none">∞</span><span className="text-xl leading-5">NEXIUS<br />LABS</span>
              </a>
              <a href="#register" className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-bold text-cyan-200 transition hover:bg-cyan-400/20">Register now</a>
            </header>

            <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_.88fr]">
              <div>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-cyan-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" /> 2-hour hands-on workshop
                </div>
                <h1 className="max-w-4xl text-balance text-5xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">
                  Build Your Own <span className="text-[#3bb8f2]">LinkedIn AI Agent</span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Create a practical content copilot that researches ideas, drafts in your voice and keeps you in control.
                </p>
                <div className="mt-8 flex items-start gap-4 border-l-4 border-amber-400 py-1 pl-5 text-base text-slate-200 sm:text-lg">
                  <Laptop className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" />
                  <p><strong className="text-amber-300">Bring a laptop.</strong> Leave with a working agent you can reuse.</p>
                </div>
                <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><CalendarDays className="h-4 w-4 text-cyan-300" /> 16 September</span>
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><Clock3 className="h-4 w-4 text-cyan-300" /> 12:30pm–2:30pm</span>
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><MapPin className="h-4 w-4 text-cyan-300" /> Hotel Boss, Level 4</span>
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2"><ShieldCheck className="h-4 w-4 text-cyan-300" /> No coding required</span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-lg">
                <div className="absolute -inset-8 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="relative rounded-3xl border border-cyan-300/25 bg-[#071a32]/90 p-4 shadow-2xl shadow-cyan-950/70">
                  <div className="flex items-center gap-2 border-b border-white/10 px-2 pb-4"><span className="h-3 w-3 rounded-full bg-rose-400" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div>
                  <div className="space-y-4 p-3 sm:p-6">
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-300">Your expertise</span><p className="mt-2 font-semibold">Voice · Audience · Content pillars</p></div>
                    <div className="flex justify-center text-cyan-300"><ArrowRight className="h-6 w-6 rotate-90" /></div>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold sm:text-sm"><div className="rounded-xl bg-white/5 p-3">Research</div><div className="rounded-xl bg-white/5 p-3">Draft</div><div className="rounded-xl bg-white/5 p-3">Review</div></div>
                    <div className="flex justify-center text-cyan-300"><ArrowRight className="h-6 w-6 rotate-90" /></div>
                    <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-center font-black text-white shadow-lg">Publish-ready LinkedIn draft</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_.82fr] lg:px-10 lg:py-28">
          <div>
            <p className="font-bold uppercase tracking-[.2em] text-cyan-300">What you will build</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">A useful agent, not another AI demo.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Work through the full content workflow with practical guidance. You stay the editor and decision-maker at every step.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {outcomes.map((outcome) => <div key={outcome} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-4"><Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-cyan-500 p-1 text-white" /><span className="font-semibold leading-6">{outcome}</span></div>)}
            </div>
            <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5 text-slate-200"><strong className="text-amber-300">Best for:</strong> founders, consultants, marketers and professionals who want consistent content without surrendering their voice.</div>
          </div>

          <aside id="register" className="scroll-mt-8">
            <div className="sticky top-8 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
              {status === 'success' ? (
                <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" /><h2 className="mt-5 text-2xl font-black">You’re registered.</h2><p className="mt-3 leading-7 text-slate-600">We’ll contact you with confirmation details for 16 September at Hotel Boss.</p></div>
              ) : (
                <>
                  <div className="flex items-center gap-2 font-bold text-cyan-700"><Sparkles className="h-5 w-5" /> Workshop registration</div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">Register your seat</h2>
                  <div className="mt-4 space-y-2 rounded-2xl bg-cyan-50 p-4 text-sm text-slate-700">
                    <p className="flex gap-2"><CalendarDays className="h-5 w-5 shrink-0 text-cyan-700" /><strong>16 September, 12:30pm–2:30pm</strong></p>
                    <p className="flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-cyan-700" /><span><strong>Hotel Boss, Level 4</strong><br />500 Jalan Sultan Road, Singapore</span></p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">Complete the short form to register for this workshop.</p>
                  <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    <label className="block text-sm font-bold">Full name<input required autoComplete="name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" /></label>
                    <label className="block text-sm font-bold">Work email<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" /></label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-bold">Mobile number<input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500" /></label>
                      <label className="block text-sm font-bold">Role<input required autoComplete="organization-title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500" /></label>
                    </div>
                    <label className="block text-sm font-bold">Company <span className="font-normal text-slate-400">(optional)</span><input autoComplete="organization" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500" /></label>
                    <label className="block text-sm font-bold">Age group<select value={form.ageBand} onChange={(e) => setForm({ ...form, ageBand: e.target.value as 'below_40' | '40_and_above' })} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-cyan-500"><option value="below_40">Below 40</option><option value="40_and_above">40 and above</option></select></label>
                    {status === 'error' && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">We couldn’t submit the form. Please try again or email hello@nexiuslabs.com.</p>}
                    <button disabled={status === 'submitting'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#087fc0] px-5 py-4 font-black text-white transition hover:bg-[#05699f] disabled:cursor-wait disabled:opacity-60">{status === 'submitting' ? 'Submitting…' : 'Register for workshop'}<ArrowRight className="h-5 w-5" /></button>
                    <p className="text-center text-xs leading-5 text-slate-500">By registering, you agree to be contacted about this workshop. No spam.</p>
                  </form>
                </>
              )}
            </div>
          </aside>
        </section>
        <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">Practical AI training for non-technical professionals · Nexius Academy</footer>
      </main>
    </>
  );
};

export default LinkedInAIAgentWorkshopPage;
