import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, BarChart3, Clock3, RotateCcw } from "lucide-react";
import { trackEvent } from "../../services/analytics";

type TimedAnswer = { value: string; elapsed: number };
type ProfileKey = "Judgment" | "Workflow" | "Evidence";
type Option = readonly [string,string];

const scenarios = [
  {
    title: "A number does not match",
    prompt: "A client update is due in 30 minutes. The AI draft is clear, but one number differs from your meeting notes. What would you do first?",
    options: [
      ["a", "Remove the disputed number and send the rest on time."],
      ["b", "Check the meeting notes and source file before deciding."],
      ["c", "Ask a colleague which number they remember seeing."],
      ["d", "Send the draft with the number marked as unverified."],
    ], scores: { a: 1, b: 3, c: 2, d: 1 },
  },
  {
    title: "The useful file contains sensitive data",
    prompt: "You want AI to summarise a spreadsheet containing employee names, salaries and performance notes. Your company has an approved AI tool, but you are unsure whether this type of data is allowed. What would you do first?",
    options: [
      ["a", "Remove names and upload the remaining spreadsheet."],
      ["b", "Check the data policy or ask the responsible data owner."],
      ["c", "Create a small fictional sample and test the prompt with that."],
      ["d", "Summarise the spreadsheet manually to avoid delaying the work."],
    ], scores: { a: 1, b: 3, c: 2, d: 2 },
  },
  {
    title: "The automation stops halfway",
    prompt: "An AI workflow normally reads enquiries, classifies them and drafts replies. Today it processed 18 of 40 enquiries and then stopped. Customers are waiting. What would you do first?",
    options: [
      ["a", "Restart the workflow for all 40 enquiries."],
      ["b", "Process the remaining enquiries manually, then investigate later."],
      ["c", "Check which records completed and where the failure began."],
      ["d", "Run the failed records through a different AI tool."],
    ], scores: { a: 0, b: 2, c: 3, d: 1 },
  },
  {
    title: "The recommendation affects a person",
    prompt: "An AI screening tool flags a job applicant as a poor match. The applicant has unusual experience that does not fit the standard profile. What would you do?",
    options: [
      ["a", "Keep the score but add a note about the unusual experience."],
      ["b", "Ask a recruiter to review the application without seeing the AI score first."],
      ["c", "Compare the applicant with previously successful non-standard hires."],
      ["d", "Move the applicant forward because the model may be biased."],
    ], scores: { a: 1, b: 3, c: 2, d: 1 },
  },
] as const;

const workflowItems = {
  report: [
    ["review", "Review the output against the source data."],
    ["decision", "Define what the report must help the manager decide."],
    ["test", "Test the workflow on one past week."],
    ["sources", "Identify the approved data sources and access limits."],
    ["save", "Save the tested process as a reusable workflow."],
  ],
  summary: [
    ["trace", "Trace the main claims back to the interview notes."],
    ["contradict", "Look for comments that contradict the majority view."],
    ["separate", "Separate direct customer evidence from AI interpretation."],
    ["privacy", "Remove or mask personal and commercially sensitive details."],
    ["final", "Prepare the final management summary."],
  ],
} as const;

const evidenceOptions = [
  ["a", "A prompt I have used more than once, with examples of how I improved it."],
  ["b", "A workflow map showing the task, AI steps, human checks and hand-offs."],
  ["c", "A review checklist I use to catch errors, privacy risks or unsupported claims."],
  ["d", "A working automation I tested, including what happens when it fails."],
  ["e", "A portfolio case showing the problem, process, evidence and measured result."],
  ["f", "I understand these ideas, but I do not yet have an artefact I could show."],
] as const;
const confidenceOptions = ["Not yet confident", "Somewhat confident", "Confident with occasional guidance", "Confident working independently", "Confident enough to guide another person"];

const shuffle = (items: readonly Option[]): Option[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
};
const multiplier = (seconds: number) => seconds <= 180 ? 1 : seconds <= 240 ? 0.5 : seconds <= 300 ? 0.3 : 0.1;
const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
const relationScore = (order: string[], pairs: [string,string][]) => pairs.filter(([before,after]) => order.indexOf(before) < order.indexOf(after)).length;

export default function WorkplaceGapTest() {
  const [started,setStarted] = useState(false);
  const [startedAt,setStartedAt] = useState(0);
  const [elapsed,setElapsed] = useState(0);
  const [answers,setAnswers] = useState<Record<number,TimedAnswer>>({});
  const [orders,setOrders] = useState(() => scenarios.map(item => shuffle(item.options)));
  const [reportOrder,setReportOrder] = useState(() => shuffle(workflowItems.report));
  const [summaryOrder,setSummaryOrder] = useState(() => shuffle(workflowItems.summary));
  const [workflowTimes,setWorkflowTimes] = useState<Record<string,number>>({});
  const [artefact,setArtefact] = useState("");
  const [submitted,setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (!started || submitted) return; const tick=()=>setElapsed(Math.floor((Date.now()-startedAt)/1000)); tick(); const id=window.setInterval(tick,1000); return()=>window.clearInterval(id); },[started,startedAt,submitted]);
  const answer = (index:number,value:string) => setAnswers(current => ({...current,[index]:{value,elapsed:Math.floor((Date.now()-startedAt)/1000)}}));
  const move = (items:readonly Option[],setter:(next:Option[])=>void,from:number,to:number) => { if(to<0||to>=items.length)return; const next=[...items]; const [item]=next.splice(from,1); next.splice(to,0,item); setter(next); };
  const clearWorkflowTime = (key:string) => setWorkflowTimes(current => { const next={...current}; delete next[key]; return next; });
  const start = () => { setStartedAt(Date.now()); setElapsed(0); setStarted(true); };
  const complete = answers[0]&&answers[1]&&answers[2]&&answers[3]&&workflowTimes.report!==undefined&&workflowTimes.summary!==undefined&&answers[6]&&answers[7];

  const result = useMemo(() => {
    if(!submitted)return null;
    const judgmentRaw=scenarios.reduce((total,q,index)=>total+q.scores[answers[index].value as keyof typeof q.scores]*multiplier(answers[index].elapsed),0);
    const reportPoints=relationScore(reportOrder.map(i=>i[0]),[["decision","test"],["sources","test"],["test","save"],["review","save"]]);
    const summaryPoints=relationScore(summaryOrder.map(i=>i[0]),[["trace","final"],["contradict","final"],["separate","final"],["privacy","final"]]);
    const workflowRaw=reportPoints*multiplier(workflowTimes.report)+summaryPoints*multiplier(workflowTimes.summary);
    const evidenceMap:Record<string,number>={f:0,a:1,c:1,b:2,d:3,e:3};
    const evidenceRaw=evidenceMap[answers[6].value]*multiplier(answers[6].elapsed);
    const profile:{name:ProfileKey;score:number}[]=[{name:"Judgment",score:Math.round(judgmentRaw/12*100)},{name:"Workflow",score:Math.round(workflowRaw/8*100)},{name:"Evidence",score:Math.round(evidenceRaw/3*100)}];
    const skill=profile.reduce((sum,item)=>sum+item.score,0)/3; const confidence=Number(answers[7].value);
    const calibration=skill>=60?(confidence>=2?"Well calibrated":"Ready but under-confident"):(confidence>=3?"Confidence ahead of evidence":"Accurate self-awareness");
    const label=skill<34?"AI-aware":skill<60?"Applied foundation":skill<80||profile[2].score<67?"Workflow practitioner":"Workplace-proven";
    const lowest=[...profile].sort((a,b)=>a.score-b.score)[0].name;
    const actions:Record<ProfileKey,string>={Judgment:"Use a fact, privacy and human-review checklist on one bounded AI-assisted task.",Workflow:"Map and test one recurring workflow, including evidence checks, exceptions and stop conditions.",Evidence:"Create one interview-ready artefact that shows the problem, process, checks and outcome."};
    return {profile,calibration,label,action:actions[lowest]};
  },[submitted,answers,reportOrder,summaryOrder,workflowTimes]);

  useEffect(()=>{if(result)requestAnimationFrame(()=>{resultRef.current?.scrollIntoView({behavior:"smooth",block:"start"});resultRef.current?.focus({preventScroll:true});});},[result]);
  const reset=()=>{setStarted(false);setSubmitted(false);setAnswers({});setWorkflowTimes({});setArtefact("");setOrders(scenarios.map(item=>shuffle(item.options)));setReportOrder(shuffle(workflowItems.report));setSummaryOrder(shuffle(workflowItems.summary));};

  return <section id="self-check" className="container-page py-20"><div className="mx-auto max-w-4xl">
    <p className="text-sm font-bold uppercase tracking-wider text-secondary">Free 3-minute diagnostic</p><h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">How ready are you for AI-enabled business work?</h2>
    <p className="mt-4 text-lg text-gray-600">Choose what you would most likely do in real work, not what sounds ideal. Some questions have no perfect answer. Your result is based on the pattern across all eight questions.</p>
    {!started&&!result&&<button onClick={start} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white">Start 3-minute test <ArrowRight size={18}/></button>}
    {started&&!result&&<form onSubmit={event=>{event.preventDefault();if(complete){setSubmitted(true);trackEvent("workplace_gap_test_completed",{time_band:elapsed<=180?"within_3":elapsed<=240?"minute_4":elapsed<=300?"minute_5":"after_5",campaign:"career_fair_2026"});}}} className="mt-8 space-y-6">
      <div className={`sticky top-20 z-20 flex items-center justify-between rounded-xl p-4 shadow-lg ${elapsed<=180?"bg-primary text-white":"bg-orange-100 text-orange-950"}`} role="timer" aria-live="polite"><span className="flex items-center gap-2 font-bold"><Clock3 size={20}/>{elapsed<=180?"Time remaining":"Time elapsed"}</span><strong className="text-xl tabular-nums">{elapsed<=180?formatTime(180-elapsed):`+${formatTime(elapsed-180)}`}</strong></div>
      {elapsed>180&&<p className="rounded-xl bg-orange-50 p-4 text-sm text-orange-900">You can continue. Answers completed in minute 4 receive 50% weighting, minute 5 receives 30%, and after minute 5 receives 10%.</p>}
      {scenarios.map((q,qi)=><fieldset key={q.title} className="rounded-2xl bg-white p-6 shadow-sm"><legend className="text-xl font-black text-primary">{qi+1}. {q.title}</legend><p className="mt-3 font-semibold">{q.prompt}</p><div className="mt-4 space-y-3">{orders[qi].map(([value,text])=><label key={value} className="flex cursor-pointer gap-3 rounded-lg border border-gray-200 p-4 hover:border-secondary"><input required type="radio" name={`q-${qi}`} checked={answers[qi]?.value===value} onChange={()=>answer(qi,value)} className="mt-1 h-5 w-5 accent-secondary"/><span>{text}</span></label>)}</div></fieldset>)}
      <OrderingQuestion number={5} title="Put the work in order" prompt="You have been asked to use AI to produce a weekly operations report. Put these steps in the order you would actually perform them." items={reportOrder} setItems={items=>{setReportOrder(items);clearWorkflowTime("report");}} move={move} confirmed={workflowTimes.report!==undefined} confirm={()=>setWorkflowTimes(v=>({...v,report:Math.floor((Date.now()-startedAt)/1000)}))}/>
      <OrderingQuestion number={6} title="The summary sounds convincing" prompt="AI produces a concise summary of six customer interviews. Put these checks in the order you would perform them before presenting the findings to management." items={summaryOrder} setItems={items=>{setSummaryOrder(items);clearWorkflowTime("summary");}} move={move} confirmed={workflowTimes.summary!==undefined} confirm={()=>setWorkflowTimes(v=>({...v,summary:Math.floor((Date.now()-startedAt)/1000)}))}/>
      <fieldset className="rounded-2xl bg-white p-6 shadow-sm"><legend className="text-xl font-black text-primary">7. Evidence of practice</legend><p className="mt-3 font-semibold">Which one of these could you show and explain in an interview today? Choose the strongest evidence you genuinely have.</p><div className="mt-4 space-y-3">{evidenceOptions.map(([value,text])=><label key={value} className="flex cursor-pointer gap-3 rounded-lg border border-gray-200 p-4"><input required type="radio" name="q-7" checked={answers[6]?.value===value} onChange={()=>answer(6,value)} className="mt-1 h-5 w-5 accent-secondary"/><span>{text}</span></label>)}</div><label className="mt-5 block font-semibold text-primary">Name the artefact in five words or fewer (optional)<input value={artefact} onChange={e=>setArtefact(e.target.value.split(/\s+/).slice(0,5).join(" "))} className="mt-2 min-h-12 w-full rounded-lg border border-gray-300 px-4"/></label></fieldset>
      <fieldset className="rounded-2xl bg-white p-6 shadow-sm"><legend className="text-xl font-black text-primary">8. Confidence calibration</legend><p className="mt-3 font-semibold">If you had to complete a similar AI-assisted task at work tomorrow, how confident are you that you could produce a reliable result and explain your checks to someone else?</p><div className="mt-4 space-y-3">{confidenceOptions.map((text,value)=><label key={text} className="flex cursor-pointer gap-3 rounded-lg border border-gray-200 p-4"><input required type="radio" name="q-8" checked={answers[7]?.value===String(value)} onChange={()=>answer(7,String(value))} className="mt-1 h-5 w-5 accent-secondary"/><span>{text}</span></label>)}</div></fieldset>
      <button disabled={!complete} className="min-h-12 w-full rounded-lg bg-accent px-6 py-3 font-bold text-white disabled:opacity-50">Show my profile</button>
    </form>}
    {result&&<div ref={resultRef} tabIndex={-1} className="mt-8 scroll-mt-28 rounded-2xl bg-white p-6 shadow-xl outline-none md:p-8" aria-live="polite"><p className="text-sm font-bold uppercase tracking-wider text-secondary">Your next step</p><h3 className="mt-2 text-3xl font-black text-primary">{result.label}</h3><div className="mt-7 grid gap-5 sm:grid-cols-2"><ProfileCard label="Judgment" value={`${result.profile[0].score}/100`}/><ProfileCard label="Workflow" value={`${result.profile[1].score}/100`}/><ProfileCard label="Evidence" value={`${result.profile[2].score}/100`}/><ProfileCard label="Calibration" value={result.calibration}/></div><div className="mt-7 rounded-xl bg-purple-50 p-5"><h4 className="text-xl font-black text-primary">Your next 30 days</h4><p className="mt-2">{result.action}</p>{artefact&&<p className="mt-3 text-sm"><strong>Add to your plan:</strong> {artefact}</p>}</div><p className="mt-7 border-t pt-5 text-xs leading-5 text-gray-500">This is a short, educational diagnostic based on practical workplace scenarios. It is not a certified assessment, hiring decision, population percentile or prediction of employment success.</p><button onClick={reset} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg px-5 py-3 font-bold text-secondary"><RotateCcw size={17}/>Retake the test</button></div>}
  </div></section>;
}

function OrderingQuestion({number,title,prompt,items,setItems,move,confirmed,confirm}:{number:number;title:string;prompt:string;items:readonly Option[];setItems:(items:Option[])=>void;move:(items:readonly Option[],setter:(items:Option[])=>void,from:number,to:number)=>void;confirmed:boolean;confirm:()=>void}) {
  const [dragged,setDragged]=useState<number|null>(null);
  return <fieldset className="rounded-2xl bg-white p-6 shadow-sm"><legend className="text-xl font-black text-primary">{number}. {title}</legend><p className="mt-3 font-semibold">{prompt}</p><ol className="mt-4 space-y-3">{items.map(([id,text],index)=><li key={id} draggable onDragStart={()=>setDragged(index)} onDragOver={e=>e.preventDefault()} onDrop={()=>{if(dragged!==null)move(items,setItems,dragged,index);setDragged(null);}} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50 font-bold text-primary">{index+1}</span><span className="flex-1">{text}</span><button type="button" onClick={()=>move(items,setItems,index,index-1)} aria-label={`Move ${text} up`} className="p-2 text-secondary disabled:opacity-30" disabled={index===0}><ArrowUp size={18}/></button><button type="button" onClick={()=>move(items,setItems,index,index+1)} aria-label={`Move ${text} down`} className="p-2 text-secondary disabled:opacity-30" disabled={index===items.length-1}><ArrowDown size={18}/></button></li>)}</ol><button type="button" onClick={confirm} className={`mt-4 min-h-11 rounded-lg px-5 font-bold ${confirmed?"bg-teal-50 text-teal-800":"bg-primary text-white"}`}>{confirmed?"Order confirmed":"Use this order"}</button></fieldset>;
}
function ProfileCard({label,value}:{label:string;value:string}) { return <div className="rounded-xl bg-[#f7f8fc] p-5"><BarChart3 className="text-secondary"/><p className="mt-3 text-sm font-bold uppercase tracking-wider text-gray-500">{label}</p><p className="mt-1 text-xl font-black text-primary">{value}</p></div>; }
