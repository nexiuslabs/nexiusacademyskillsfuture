import { Instructor, Review, ScheduleItem, FaqItem, CurriculumModule, BlogPost } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    name: 'Melverick Ng',
    role: 'Co-founder & Lead Trainer, Nexius Academy',
    image: '/images/authors/melverick-ng-selected.jpg',
    bio: 'Melverick Ng is the co-founder and director of Nexius Labs and a Nexius Academy trainer. He helps business leaders, SMEs, and professional teams move from AI chat to practical, governed execution with agentic AI workflows, human review, and auditability built in.',
    credentials: ['Nexius Labs Co-founder / Director', 'Nexius Academy trainer', '30+ years professional experience'],
    focusAreas: ['Agentic AI adoption', 'AI workforce governance', 'Business workflow redesign', 'Human-in-the-loop operating models'],
  },
  {
    name: 'Darryl Wong',
    role: 'AI Workflow Trainer',
    image: '/images/authors/darryl-wong-selected.jpeg',
    bio: 'Darryl Wong brings a CPA background and more than 20 years of professional experience to practical AI adoption for business and professional-services teams.',
    credentials: ['CPA background', '20+ years professional experience'],
    focusAreas: ['Accounting and finance workflows', 'Professional-services productivity', 'Practical AI use cases'],
  },
];

export const REVIEWS: Review[] = [
  {
    name: 'Fion Heu',
    role: 'Marketing Director',
    date: 'Sep 2025',
    rating: 5,
    content: 'This course sharpened my AI skills through hands-on practice with ChatGPT, Copilot, and Claude. The prompt engineering techniques were game-changing.',
    image: 'https://picsum.photos/id/64/100/100',
  },
  {
    name: 'Boon Peng Yeo',
    role: 'Consultant',
    date: 'Sep 2025',
    rating: 5,
    content: 'I love how the course focused on prompt engineering concepts: from zero-shot prompting to chain-of-thought reasoning.',
    image: 'https://picsum.photos/id/91/100/100',
  },
];

export const SCHEDULES: ScheduleItem[] = [
  {
    type: 'Weekday',
    dates: '18 Sep 2026 & 25 Sep 2026',
    time: '9:00am - 6:00pm',
    format: 'In-Person',
    venue: 'Singapore Institute of Management, 461 Clementi Road, Singapore 599491',
    slotsLeft: 4,
    month: 'Sep 2026',
    registrationCloses: 'TBC',
  },
  {
    type: 'Weekday',
    dates: '09 Oct 2026 & 16 Oct 2026',
    time: '9:00am - 5:00pm',
    format: 'In-Person',
    venue: 'Venue to be confirmed',
    slotsLeft: 0,
    month: 'Oct 2026',
    registrationCloses: 'TBC',
    interestOnly: true,
    cohortCode: '2026-10-09-interest',
  },
  {
    type: 'Weekday',
    dates: '13 Nov 2026 & 20 Nov 2026',
    time: '9:00am - 5:00pm',
    format: 'In-Person',
    venue: 'Venue to be confirmed',
    slotsLeft: 0,
    month: 'Nov 2026',
    registrationCloses: 'TBC',
    interestOnly: true,
    cohortCode: '2026-11-13-interest',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'Can I use SkillsFuture credits fully?',
    answer:
      'Many eligible learners can offset most or all out-of-pocket fees using a mix of SkillsFuture subsidy + available SkillsFuture Credits. Final payable depends on your eligibility profile and current funding rules at application time.',
  },
  {
    question: 'Will I get hands-on help for my own workflow?',
    answer:
      'Yes. This course is workshop-first. You will apply concepts to your own use cases during guided activities, with trainer support to shape one practical workflow blueprint you can deploy after class.',
  },
  {
    question: 'What happens after class (support/community)?',
    answer:
      'You will receive implementation templates and can continue with advisor follow-up for next steps. For teams, we also provide options for post-course implementation support and corporate enablement.',
  },
  {
    question: 'What is agentic AI and how does it differ from generative AI?',
    answer:
      'Generative AI creates content (text, images, code), while agentic AI takes it further - autonomous AI agents can plan, execute multi-step workflows, and take actions on your behalf. Our course teaches practical business automation with this approach, no coding required.',
  },
  {
    question: 'What are the prerequisites for this course?',
    answer: 'There are no technical prerequisites. The course is designed to be beginner-friendly while scaling to advanced techniques.',
  },
  {
    question: 'How do I choose the best AI course in Singapore for my needs?',
    answer:
      'Start with the outcome you need: general AI literacy, practical workflow automation, technical model building, or leadership and governance. Then compare hands-on time, instructor experience, delivery format, current funding eligibility, assessment requirements, and the work product you will complete. This course is designed for non-technical professionals who want practical, governed AI workflows rather than a coding programme.',
  },
  {
    question: 'What AI certification will I receive in Singapore?',
    answer:
      'You will receive a Certificate of Completion after attending at least 75% of the course and passing the assessment.',
  },
  {
    question: 'Is this an AI agent course in Singapore for beginners?',
    answer:
      'Yes. This 16-hour AI agent course in Singapore is designed for non-technical professionals and does not require coding experience. Learners practise structuring workplace tasks, configuring no-code agent workflows, reviewing outputs, and deciding where human approval is required.',
  },
  {
    question: 'Is this an AI agent course in Singapore with SkillsFuture support?',
    answer:
      'Yes. The course page presents this programme as SkillsFuture-eligible and publishes the current subsidy tiers and estimated payable fees. Learners comparing an Agentic AI SkillsFuture course in Singapore should confirm their eligibility, available SkillsFuture Credits, and final payable amount through the official registration channels before enrolling.',
  },
  {
    question: 'Which AI agent course in Singapore is designed for non-technical professionals?',
    answer:
      'Agentic AI Foundations for Non-Technical Professionals is a 16-hour in-person AI agent course in Singapore for business users who want practical workflows without learning software engineering. Learners apply AI agents, no-code tools, reusable instructions, and human review habits to workplace tasks.',
  },
  {
    question: 'Who is this course for?',
    answer:
      'The course is for non-technical professionals, SME owners, managers, operations teams, finance teams, HR teams, sales teams, and customer-support teams that want to reduce repetitive drafting, reporting, follow-up, and coordination work while keeping human judgement in the loop.',
  },
  {
    question: 'What will learners be able to do?',
    answer:
      'Learners practise turning common business tasks into structured AI-assisted workflows. They learn to write better instructions, review AI output, protect sensitive information, and identify which tasks are suitable for automation, drafting, synthesis, and internal process support.',
  },
];

export const MODULES: CurriculumModule[] = [
  {
    title: 'AI Fundamentals & LLMs',
    description: 'Understand the Generative AI landscape, LLM architecture, and key tools like ChatGPT, Gemini, and Copilot.',
    iconName: 'Brain',
  },
  {
    title: 'Advanced Prompt Engineering',
    description: 'Master Zero-shot, Few-shot, and Chain-of-Thought reasoning to elicit precise and complex outputs.',
    iconName: 'MessageSquare',
  },
  {
    title: 'Build Apps with AI',
    description: 'Learn how to build with AI to turn your business ideas into working software, with no programming experience required.',
    iconName: 'Code',
  },
  {
    title: 'Build AI Agents',
    description: 'Build a dedicated AI agent tailored to your workflow that executes complex tasks with precision.',
    iconName: 'Bot',
  },
  {
    title: 'Data Analysis & Insights',
    description: 'Leverage AI interpreters to analyze spreadsheets, visualize trends, and extract actionable insights.',
    iconName: 'BarChart3',
  },
  {
    title: 'Ethics, Safety & Governance',
    description: 'Navigate copyright, data privacy (PDPA), hallucinations, and implement safe AI adoption strategies.',
    iconName: 'Shield',
  },
];

export const LEARNING_OUTCOMES = [
  'Discover how Agentic AI can solve real business problems across different workplace functions.',
  'Understand how Agentic AI differs from traditional automation and ordinary chatbot use.',
  'Apply context engineering techniques to guide AI agents toward more accurate and relevant outputs.',
  'Configure no-code and low-code agent workflows for practical workplace processes.',
  'Build multi-step workflows using clear agent roles, goals, context, outputs, and trusted organisational documents.',
  'Automate routine activities across workplace tools while assessing risks, limitations, governance, readiness, and practical next steps.',
];

export const WEBSITE_IMAGES = {
  hero: {
    main: 'https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/hero-main.jpg',
  },
  about: {
    primary: 'https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/about-primary.jpg',
    secondary: 'https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/about-secondary.jpg',
  },
  blog: {
    featured: 'https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/blog-feature.jpg',
  },
  subscription: {
    cta: 'https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/subscription-cta.jpg',
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 21,
    slug: 'agent-team-diversity-business-professionals',
    title: 'AI Agent Teams: What Business Professionals Must Learn About Designed Dissent',
    date: '17 Aug 2026',
    views: 0,
    image: '/images/blog/agent-team-diversity-business-professionals.png',
    excerpt: 'More AI agents can repeat the same blind spot. Learn evidence-lane design, dissent roles, integration, testing, and human judgment for reliable agent teams.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, analysts, L&D teams',
    featured: true,
  },
  {
    id: 20,
    slug: 'finance-agent-maker-checker-business-professionals',
    title: 'Finance AI Agents: What Business Professionals Must Learn About Maker-Checker Workflows',
    date: '10 Aug 2026',
    views: 0,
    image: '/images/blog/finance-agent-maker-checker-business-professionals.png',
    excerpt: 'Finance AI agents are entering receivables and audit. Learn maker-checker workflow mapping, evidence design, approval rules, exception handling, testing, and auditability.',
    category: 'Beginner Guides',
    bestFor: 'Finance professionals, accountants, SME owners, operations managers, auditors, L&D teams',
    featured: true,
  },
  {
    id: 19,
    slug: 'agent-builders-business-professionals',
    title: 'Agent Builders: What Business Professionals Must Learn Before AI Starts Building Workflows',
    date: '03 Aug 2026',
    views: 0,
    image: '/images/blog/agent-builders-business-professionals.png',
    excerpt: 'Enterprise agent builders are moving AI from chat into workflow construction. Learn the workflow mapping, permission boundaries, approval gates, testing, and telemetry skills professionals need next.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, analysts, L&D teams',
    featured: true,
  },
  {
    id: 18,
    slug: 'agent-execution-readiness-business-professionals',
    title: 'Agent Execution Readiness: What Business Professionals Must Learn Before AI Acts Across Tools',
    date: '27 Jul 2026',
    views: 0,
    image: '/images/blog/agent-execution-readiness-business-professionals.png',
    excerpt: 'AI agents are moving from chat into business execution. Learn the workflow mapping, context design, approval gates, testing, and governance skills professionals need before agents act across tools.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, analysts, L&D teams',
    featured: true,
  },
  {
    id: 17,
    slug: 'agentic-ai-cost-control-business-professionals',
    title: 'Agentic AI Cost Control: What Business Professionals Must Learn Before Agents Start Executing Work',
    date: '20 Jul 2026',
    views: 0,
    image: '/images/blog/agentic-ai-cost-control-business-professionals.png',
    excerpt: 'Agentic AI cost pressure is an orchestration problem. Learn the workflow mapping, context design, approval gates, testing, and governance skills professionals need before agents execute work.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, analysts, L&D teams',
    featured: true,
  },
  {
    id: 16,
    slug: 'workspace-agents-business-professionals',
    title: 'Workspace Agents: What Business Professionals Must Learn Before AI Starts Working Across Apps',
    date: '13 Jul 2026',
    views: 0,
    image: '/images/blog/workspace-agents-business-professionals.png',
    excerpt: 'Workspace agents are moving AI from chat into business workflows. Learn the workflow mapping, context design, approval gates, testing, and governance skills professionals need next.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, analysts, L&D teams',
    featured: true,
  },
  {
    id: 15,
    slug: 'research-agents-business-professionals',
    title: 'Research Agents: What Business Professionals Must Learn Before AI Starts Writing the Brief',
    date: '06 Jul 2026',
    views: 0,
    image: '/images/blog/research-agents-business-professionals.png',
    excerpt: 'AI research agents are moving from chat answers to decision-prep workflows. Learn the source-checking, context, approval, testing, and governance skills business professionals need next.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, analysts, L&D teams',
    featured: true,
  },
  {
    id: 14,
    slug: 'agent-handoffs-business-professionals',
    title: 'Agent Handoffs: What Business Professionals Must Learn Before AI Coworkers Start Passing Work to Each Other',
    date: '29 Jun 2026',
    views: 0,
    image: '/images/blog/agent-handoffs-business-professionals.png',
    excerpt: 'Agent-to-agent protocols show AI moving from isolated assistants to coordinated digital coworkers. Learn the workflow mapping, context, approval, testing, and governance skills professionals need next.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, L&D teams',
    featured: true,
  },
  {
    id: 13,
    slug: 'ai-connectors-mcp-business-professionals',
    title: 'AI Connectors and MCP: What Business Professionals Must Learn Before Agents Touch Company Data',
    date: '22 Jun 2026',
    views: 0,
    image: '/images/blog/ai-connectors-mcp-business-professionals.png',
    excerpt: 'AI connectors, MCP, and work graph APIs are moving AI from chat into company systems. Learn the workflow, context, approval, testing, and governance skills professionals need next.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, L&D teams',
    featured: true,
  },
  {
    id: 12,
    slug: 'dashboard-agents-business-professionals',
    title: 'Dashboard Agents: What Business Professionals Must Learn Before AI Starts Explaining the Numbers',
    date: '15 Jun 2026',
    views: 0,
    image: '/images/blog/dashboard-agents-decision-workflows.png',
    excerpt: "Google Cloud's Looker agents show analytics moving from static dashboards to AI-assisted decision workflows. Learn the metric, exception, approval, and governance skills professionals need next.",
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, finance teams, L&D teams',
    featured: true,
  },
  {
    id: 11,
    slug: 'always-on-agents-work-iq-business-professionals',
    title: 'Always-On AI Agents: What Business Professionals Must Learn Before Work Gets Automated Around Them',
    date: '08 Jun 2026',
    views: 0,
    image: '/images/blog/always-on-agents-work-iq.png',
    excerpt: 'Microsoft Scout and Work IQ show AI moving into always-on workplace execution. Learn the workflow, context, approval, and governance skills professionals need next.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, L&D teams',
    featured: true,
  },
  {
    id: 10,
    slug: 'computer-using-agents-business-professionals',
    title: 'Computer-Using Agents: What Business Professionals Need to Learn Before They Automate',
    date: '30 May 2026',
    views: 0,
    image: '/images/blog/computer-using-agents.png',
    excerpt: 'Computer-using agents show that workplace AI is moving from chat to execution. Learn what non-technical professionals need before supervising agentic workflows safely.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, SME owners, operations managers, L&D teams',
    featured: true,
  },
  {
    id: 1,
    slug: 'beyond-chatgpt-ai-powered-company',
    title: 'Beyond ChatGPT: 4 Hard Truths About Building an AI-Powered Company',
    date: '10 Dec 2025',
    views: 15,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    excerpt: "Discover why AI adoption isn't enough. Learn the four fundamental shifts in leadership, structure, and strategy needed to transform your business into a Frontier Firm with Agentic Architecture.",
    category: 'Case Studies',
    bestFor: 'SME owners, transformation leaders',
    featured: false,
  },
  {
    id: 2,
    slug: 'enterprise-ai-insights',
    title: 'Beyond the Hype: 5 Things We Just Learned About How Enterprises Really Use AI',
    date: '02 Jun 2025',
    views: 87,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    excerpt: "OpenAI's new report reveals surprising insights from 1 million business customers - from the emergence of a new coder class to a widening gap between AI leaders and laggards.",
    category: 'Case Studies',
    bestFor: 'Business managers, strategy teams',
    featured: false,
  },
  {
    id: 3,
    slug: 'anthropic-ai-skills',
    title: '4 Counter-Intuitive Ideas From Anthropic on Building AI That Actually Works',
    date: '12 Dec 2025',
    views: 21,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    excerpt: `Stop building monolithic agents. Discover Anthropic's revolutionary approach to AI using composable "Skills" - simple folders that bridge the expertise gap and democratize AI development.`,
    category: 'Beginner Guides',
    bestFor: 'Non-technical teams, ops managers',
    featured: false,
  },
  {
    id: 4,
    slug: 'what-is-agentic-ai-guide',
    title: 'What Is Agentic AI? A Complete Guide for Business Professionals',
    date: '08 Jan 2026',
    views: 42,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    excerpt: "Agentic AI isn't just a buzzword - it's the most significant shift in business technology since the internet. Learn how autonomous AI agents plan, decide, and act, and why every business professional needs to understand this now.",
    category: 'Beginner Guides',
    bestFor: 'SME owners, first-time AI learners',
    featured: true,
  },
  {
    id: 5,
    slug: 'best-ai-courses-singapore-2026',
    title: 'Best AI Course Singapore 2026: SkillsFuture Comparison Guide',
    date: '22 Jan 2026',
    views: 63,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    excerpt: 'With hundreds of AI courses now available in Singapore, how do you pick the right one? We break down the five types, seven questions to ask, and the SkillsFuture advantage that can cut costs by 90%.',
    category: 'SkillsFuture',
    bestFor: 'Working adults, HR and L&D teams',
    featured: true,
  },
  {
    id: 6,
    slug: 'smes-no-code-ai-automation-singapore',
    title: 'How SMEs in Singapore Are Using No-Code AI Automation to Scale',
    date: '05 Feb 2026',
    views: 38,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Real examples of Singapore SMEs automating invoicing, lead qualification, customer support, and reporting with no-code AI tools. The ROI math is staggering: a $111 course saving $50,000+ per year.',
    category: 'SME Automation',
    bestFor: 'SME owners, operations teams',
    featured: true,
  },
  {
    id: 7,
    slug: 'ai-literacy-corporate-learning-2026',
    title: 'AI Literacy for Corporate Learning in 2026: How L&D Teams Should Prepare for Agentic AI',
    date: '19 Apr 2026',
    views: 0,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    excerpt: 'AI literacy is no longer enough on its own. Learn how corporate learning teams can build practical AI fluency, role-based training, and agentic AI readiness across the organisation.',
    category: 'SkillsFuture',
    bestFor: 'L&D teams, HR leaders, corporate managers',
    featured: true,
  },
  {
    id: 8,
    slug: 'ai-readiness-singapore-2026-agentic-ai',
    title: 'AI Readiness in Singapore 2026: What to Check Before You Build AI Agents',
    date: '15 May 2026',
    views: 0,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    excerpt: 'AI adoption is accelerating in Singapore, but readiness now matters more than tool access. Use this practical checklist before building agentic AI workflows.',
    category: 'SkillsFuture',
    bestFor: 'Working professionals, SME owners, managers',
    featured: true,
  },
  {
    id: 9,
    slug: 'best-ai-for-coding-business-professionals',
    title: 'Best AI for Coding? What Business Professionals Should Really Learn',
    date: '21 May 2026',
    views: 0,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Search interest around the best AI for coding is a signal that AI is moving from chat to execution. Learn what non-technical professionals should take from the trend.',
    category: 'Beginner Guides',
    bestFor: 'Business professionals, managers, SME owners',
    featured: true,
  },
];

export const SYSTEM_INSTRUCTION = `
You are an expert AI Advisor for the 'Nexius Academy Certificate in Applied Generative AI'.
Your goal is to help potential students understand the course and encourage them to apply. From the user's questions, determine the level of interest and try to get their contact details like email or phone number. Use the information in this website and the following course details to answer questions:

- Course Name: Agentic AI Foundations for Non-Technical Professionals: Enhancing Productivity and Business Process Automation
- Course Ref: TP-NC-C0021-F
- Price: S$970.10 (full fee), S$291.03 after the standard subsidy, or S$113.03 at the enhanced subsidy tier, subject to eligibility.
- Duration: 16 Hours Total (2 full days + 1 Assessment).
- Format: In-Person.
- Curriculum: Fundamentals, Advanced Prompt Engineering, Business Writing, Image Generation, Data Analysis, Ethics.
- Subsidies: SkillsFuture Credits, UTAP, PSEA available.
- Cert: Certificate of Completion after at least 75% attendance and a passing assessment result.
- Tone: Professional, encouraging, and helpful. Keep answers concise (under 100 words).
`;
