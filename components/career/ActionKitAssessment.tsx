import React, { useMemo, useState } from 'react';
import { Download, Loader2, ShieldCheck } from 'lucide-react';
import { downloadActionKit, ActionKitAnswers, ActionKitField } from '../../services/actionKitPdf';
import { trackEvent } from '../../services/analytics';

const tasks: Record<ActionKitField, string[]> = {
  tech: ['Draft or review code', 'Create and run tests', 'Prepare technical documentation', 'Analyse data', 'Triage incidents or tickets', 'Research technical options'],
  accountancy: ['Prepare reconciliations', 'Draft management commentary', 'Organise audit evidence', 'Research tax or accounting issues', 'Prepare forecasts or scenarios', 'Review exceptions and controls'],
};
const pathways: Record<ActionKitField, string> = { tech: 'AI-assisted technical workflow and verification', accountancy: 'AI-assisted finance workflow and accountable review' };
const stages = ['Student or recent graduate', 'Early career', 'Mid-career or career switcher', 'Returning to work', 'Exploring options'];

const ActionKitAssessment: React.FC = () => {
  const [field, setField] = useState<ActionKitField>('tech');
  const [careerStage, setCareerStage] = useState('');
  const [role, setRole] = useState('');
  const [concern, setConcern] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const ready = useMemo(() => careerStage && role.trim().length >= 2 && selectedTasks.length > 0, [careerStage, role, selectedTasks]);
  const selectField = (next: ActionKitField) => { setField(next); setSelectedTasks([]); trackEvent('action_kit_field_selected', { field: next, campaign: 'career_fair_2026' }); };
  const toggleTask = (task: string) => setSelectedTasks(current => current.includes(task) ? current.filter(item => item !== task) : [...current, task]);
  const generate = async () => {
    if (!ready || busy) { setError('Choose a field, career stage, role and at least one task.'); return; }
    setBusy(true); setError('');
    const answers: ActionKitAnswers = { field, careerStage, role: role.trim().slice(0, 100), concern: concern.trim().slice(0, 180), pathway: pathways[field], tasks: selectedTasks };
    try { await downloadActionKit(answers); trackEvent('personalised_action_kit_downloaded', { field, career_stage: stages.indexOf(careerStage), task_count: selectedTasks.length, campaign: 'career_fair_2026' }); }
    catch { setError('We could not generate the kit on this device. Please use the generic version below.'); }
    finally { setBusy(false); }
  };
  const generateGeneric = async () => {
    if (busy) return;
    setBusy(true); setError('');
    try {
      await downloadActionKit({ field, careerStage: 'Exploring options', role: `${field === 'tech' ? 'Tech' : 'Accountancy'} role`, concern: 'Not specified', pathway: pathways[field], tasks: [] });
      trackEvent('generic_action_kit_downloaded', { field, campaign: 'career_fair_2026' });
    } catch { setError('We could not generate the generic kit on this device. Please try again.'); }
    finally { setBusy(false); }
  };

  return <section id="action-kit" className="container-page py-20"><div className="mx-auto max-w-4xl"><p className="text-sm font-bold uppercase tracking-wider text-secondary">Draft personalised download</p><h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">Complete the check to download your personalised AI Career Readiness Action Kit.</h2><p className="mt-4 text-lg text-gray-600">Understand the shift. Assess your work. Build your next 90-day plan.</p>
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-xl md:p-8"><fieldset><legend className="text-lg font-black text-primary">1. Select your field</legend><div className="mt-4 grid grid-cols-2 gap-3">{(['tech','accountancy'] as const).map(item=><button key={item} type="button" onClick={()=>selectField(item)} aria-pressed={field===item} className={`min-h-12 rounded-lg border-2 px-4 font-bold capitalize ${field===item?'border-secondary bg-purple-50 text-primary':'border-gray-200'}`}>{item}</button>)}</div></fieldset>
    <div className="mt-7 grid gap-5 md:grid-cols-2"><label className="font-semibold text-primary">2. Career stage<select value={careerStage} onChange={e=>setCareerStage(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-gray-300 px-4"><option value="">Choose a stage</option>{stages.map(stage=><option key={stage}>{stage}</option>)}</select></label><label className="font-semibold text-primary">3. Role or area of interest<input value={role} maxLength={100} onChange={e=>setRole(e.target.value)} placeholder={field==='tech'?'e.g. cybersecurity analyst':'e.g. audit associate'} className="mt-2 min-h-12 w-full rounded-lg border border-gray-300 px-4"/></label></div>
    <label className="mt-6 block font-semibold text-primary">4. Main concern (optional)<textarea value={concern} maxLength={180} onChange={e=>setConcern(e.target.value)} placeholder="What are you most concerned or uncertain about?" className="mt-2 min-h-24 w-full rounded-lg border border-gray-300 p-4"/></label>
    <fieldset className="mt-6"><legend className="font-semibold text-primary">5. Select tasks you want to prepare for</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{tasks[field].map(task=><label key={task} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3"><input type="checkbox" className="h-5 w-5 accent-secondary" checked={selectedTasks.includes(task)} onChange={()=>toggleTask(task)}/><span>{task}</span></label>)}</div></fieldset>
    <div className="mt-6 flex gap-3 rounded-lg bg-teal-50 p-4 text-sm text-teal-900"><ShieldCheck className="shrink-0" size={20}/><p>Your answers stay in this browser while the PDF is generated. They are not placed in the URL or sent to analytics.</p></div>{error&&<p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}<button type="button" onClick={generate} disabled={busy} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white disabled:opacity-60">{busy?<><Loader2 className="animate-spin" size={18}/> Building your 8-page kit…</>:<>Download my personalised Action Kit <Download size={18}/></>}</button><p className="mt-4 text-center text-sm text-gray-500">Prefer not to complete the check? <button type="button" onClick={generateGeneric} disabled={busy} className="font-semibold text-secondary underline">Download a generic {field === 'tech' ? 'Tech' : 'Accountancy'} Action Kit.</button></p></div></div></section>;
};
export default ActionKitAssessment;
