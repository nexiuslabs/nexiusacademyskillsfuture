export type ActionKitField = 'tech' | 'accountancy';
export type ActionKitAnswers = {
  field: ActionKitField;
  careerStage: string;
  role: string;
  concern: string;
  pathway: string;
  tasks: string[];
};
export type GapAnalysis = {
  score: number;
  label: string;
  gap: number;
  capabilities: { name: string; score: number }[];
  strongest: string;
  priorityGaps: string[];
  sevenDayChallenge: string;
  thirtyDayAction: string;
};

const fieldContent = {
  tech: {
    label: 'Tech',
    roles: 'software development, data, cloud, cybersecurity and product work',
    changing: ['Code drafting, test generation and documentation', 'Data preparation and routine analysis', 'Ticket triage, monitoring and first-line diagnosis'],
    human: ['Architecture and trade-off judgement', 'Security, reliability and accountable review', 'Product context and stakeholder communication'],
    opportunities: ['AI integration and orchestration', 'Model and workflow evaluation', 'AI security, governance and platform enablement'],
    project: 'Build and test an AI-assisted test workflow with explicit acceptance criteria, exception cases and human approval.',
  },
  accountancy: {
    label: 'Accountancy',
    roles: 'bookkeeping, reporting, audit, tax, FP&A and finance operations',
    changing: ['Transaction coding and reconciliation preparation', 'First-draft commentary and reporting', 'Research, evidence organisation and audit preparation'],
    human: ['Materiality, professional scepticism and sign-off', 'Regulatory interpretation and ethical judgement', 'Business context and stakeholder trust'],
    opportunities: ['Governed finance workflow design', 'Continuous controls and exception analysis', 'AI assurance, evaluation and governance'],
    project: 'Design a reviewed reporting workflow that traces source evidence, flags exceptions and records accountable sign-off.',
  },
};

const skills = [
  ['AI literacy and safe use', 'Understand capabilities, limitations and data boundaries before applying AI to work.'],
  ['Practical tool fluency', 'Choose and use tools deliberately instead of relying on one generic chatbot.'],
  ['Domain expertise and judgement', 'Recognise material exceptions and make decisions that remain professionally accountable.'],
  ['Data literacy', 'Assess source quality, structure inputs and interpret results in context.'],
  ['Workflow and agent orchestration', 'Design steps, handoffs, controls and escalation points around the task.'],
  ['Verification, governance and accountability', 'Test outputs, preserve evidence and keep a named human responsible.'],
];

export async function downloadActionKit(answers: ActionKitAnswers, gapAnalysis?: GapAnalysis) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const content = fieldContent[answers.field];
  const margin = 18;
  const width = 174;
  const ink: [number, number, number] = [32, 43, 82];
  const purple: [number, number, number] = [93, 63, 211];
  const teal: [number, number, number] = [16, 128, 125];

  const header = (eyebrow: string, title: string, subtitle?: string) => {
    doc.setFillColor(...ink); doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(190, 245, 238); doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.text(eyebrow.toUpperCase(), margin, 15);
    doc.setTextColor(255, 255, 255); doc.setFontSize(19); doc.text(doc.splitTextToSize(title, width), margin, 24);
    if (subtitle) { doc.setTextColor(225, 225, 240); doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text(doc.splitTextToSize(subtitle, width), margin, 35); }
  };
  const footer = (page: number) => { doc.setDrawColor(220); doc.line(margin, 282, 192, 282); doc.setTextColor(110); doc.setFontSize(8); doc.text('Nexius Academy | AI Career Readiness Action Kit', margin, 288); doc.text(String(page), 190, 288, { align: 'right' }); };
  const body = (text: string, y: number, size = 10, color: [number, number, number] = ink) => { doc.setTextColor(...color); doc.setFont('helvetica', 'normal'); doc.setFontSize(size); const lines = doc.splitTextToSize(text, width); doc.text(lines, margin, y); return y + lines.length * size * 0.42 + 3; };
  const heading = (text: string, y: number) => { doc.setTextColor(...purple); doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text(doc.splitTextToSize(text, width), margin, y); return y + 9; };
  const bullets = (items: string[], y: number) => { for (const item of items) { const lines = doc.splitTextToSize(item, width - 7); doc.setTextColor(...ink); doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.text('•', margin, y); doc.text(lines, margin + 6, y); y += lines.length * 4.5 + 3; } return y; };
  const nextPage = (eyebrow: string, title: string, subtitle?: string) => { doc.addPage(); header(eyebrow, title, subtitle); return 55; };

  header('Tech & Accountancy Career Fair 2026', 'AI Career Readiness Action Kit', 'Understand the shift. Assess your work. Build your next 90-day plan.');
  let y = 60;
  y = heading('Your readiness snapshot', y);
  y = body(`Selected field: ${content.label}`, y);
  y = body(`Career stage: ${answers.careerStage}`, y);
  y = body(`Role or area of interest: ${answers.role}`, y);
  y = body(`Main concern: ${answers.concern || 'Not specified'}`, y);
  y = body(`Recommended starting pathway: ${answers.pathway}`, y);
  doc.setFillColor(235, 248, 246); doc.roundedRect(margin, y + 4, width, 38, 3, 3, 'F');
  doc.setTextColor(...teal); doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text('Your 90-day outcome', margin + 7, y + 15);
  doc.setTextColor(...ink); doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.text(doc.splitTextToSize(`Complete one role-relevant project for ${content.label} and document the problem, process, controls and outcome.`, width - 14), margin + 7, y + 24);
  footer(1);

  y = nextPage('Understand the shift', 'AI changes tasks before it changes job titles.');
  for (const [title, text] of [
    ['Automated', 'Repeatable, rules-based tasks AI may execute within defined boundaries.'],
    ['Augmented', 'Tasks people perform faster or better with AI support and review.'],
    ['Human-led', 'Judgement, accountability, relationships and context remain with people.'],
    ['Newly created', 'Emerging work in integration, orchestration, evaluation and governance.'],
  ]) { y = heading(title, y); y = body(text, y); }
  footer(2);

  y = nextPage(`What this means for ${content.label}`, `Role areas include ${content.roles}.`);
  y = heading('Tasks likely to change', y); y = bullets(content.changing, y);
  y = heading('Human capabilities gaining value', y); y = bullets(content.human, y);
  y = heading('New opportunities to explore', y); y = bullets(content.opportunities, y);
  footer(3);

  y = nextPage('My task-opportunity map', 'Use this map to decide what to practise, protect and explore.');
  const selectedTasks = answers.tasks.length ? answers.tasks : content.changing;
  const map = [
    ['Learn to automate', selectedTasks.slice(0, 1)],
    ['Learn to perform with AI', selectedTasks.slice(1, 3).length ? selectedTasks.slice(1, 3) : [content.changing[1]]],
    ['Strengthen my human judgement', content.human.slice(0, 2)],
    ['Explore as a new opportunity', content.opportunities.slice(0, 2)],
  ] as const;
  for (const [title, items] of map) { y = heading(title, y); y = bullets([...items], y); }
  footer(4);

  y = nextPage('Skills to build', 'A focused capability set for your role, not a long catalogue.');
  for (const [title, description] of skills) { y = heading(title, y); y = body(`${description} For ${content.label}, connect this capability to ${answers.role}.`, y, 9); }
  footer(5);

  y = nextPage('My 30/60/90-day readiness plan', 'Move from understanding to a piece of evidence you can defend.');
  y = heading('First 30 days - Understand and practise', y); y = body('Learn the fundamentals and use AI on one low-risk task. Keep a short note of the input, output, errors and your review.', y);
  y = heading('By 60 days - Redesign one workflow', y); y = body('Map a real task, identify what AI can assist, and define human review, approval and exception points.', y);
  y = heading('By 90 days - Prove readiness', y); y = body('Complete one small role-relevant project and document the problem, process, controls and outcome.', y);
  y = heading('Suggested project', y); y = body(content.project, y);
  footer(6);

  y = nextPage('Career-fair conversation guide', 'Use these questions with employers, educators and recruiters.');
  y = bullets(['Which tasks in this role are already AI-assisted?', 'What AI capabilities do you expect from new hires?', 'Where is human review still essential?', 'What project would demonstrate readiness for this role?', 'How does your organisation train staff to work with AI safely?'], y);
  y = heading('A short introduction', y + 4);
  body(`Here is how I am preparing for AI-enabled work: I am focusing on ${answers.pathway.toLowerCase()}, practising a real ${content.label.toLowerCase()} task and documenting how I verify the result and keep human accountability clear.`, y);
  footer(7);

  y = nextPage('My next actions', 'Keep the plan small, specific and visible.');
  y = bullets(['Choose one low-risk task to practise this week.', 'Map its AI-assisted steps and human review points.', `Complete the suggested ${content.label} project and document the evidence.`], y);
  y = heading('Optional guided learning', y + 3); y = body('Explore Agentic AI Foundations for Non-Technical Professionals at academy.nexiuslabs.com/courses/agentic-ai/. Current dates, fees, funding and availability are confirmed through the live registration channel.', y);
  y = heading('Revisit your assessment', y); y = body('academy.nexiuslabs.com/ai-career/', y);
  y = heading('Privacy', y); body('This PDF was generated in your browser. Your readiness answers were not sent to analytics or stored merely to create this download. Consultation information is handled separately under the Nexius Labs Privacy Notice.', y);
  footer(8);

  if (gapAnalysis) {
    y = nextPage('Optional AI workplace gap analysis', `Your AI Workplace Readiness: ${gapAnalysis.score}/100`);
    y = heading(gapAnalysis.label, y);
    y = body(`Gap to the Nexius workplace-ready benchmark: ${gapAnalysis.gap} points. The 70-point benchmark is criterion-based and is not an industry average.`, y);
    y = heading('Five capability results', y + 3);
    for (const item of gapAnalysis.capabilities) y = body(`${item.name}: ${item.score}/100`, y);
    y = heading(`Your strength: ${gapAnalysis.strongest}`, y + 3);
    y = heading(`Priority gaps: ${gapAnalysis.priorityGaps.join(' and ')}`, y + 3);
    footer(9);

    y = nextPage('Gap-closing action plan', 'Turn the diagnostic into practical evidence.');
    y = heading('Your seven-day challenge', y);
    y = body(gapAnalysis.sevenDayChallenge, y);
    y = heading('Your tailored 30-day action', y + 4);
    y = body(gapAnalysis.thirtyDayAction, y);
    y = heading('Important safeguard', y + 4);
    body('This is a short, educational diagnostic based on practical workplace scenarios. It is not a certified assessment, hiring decision, population percentile or prediction of employment success.', y, 9);
    footer(10);
  }

  doc.setProperties({ title: 'AI Career Readiness Action Kit - Tech & Accountancy', subject: 'Personalised 90-day AI career readiness plan', author: 'Nexius Academy', creator: 'Nexius Academy' });
  doc.save(`nexius-ai-career-readiness-${answers.field}${gapAnalysis ? '-enhanced' : ''}.pdf`);
}
