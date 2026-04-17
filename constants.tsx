import { Instructor, Review, ScheduleItem, FaqItem, CurriculumModule, BlogPost } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    name: "Melverick Ng",
    role: "Master Trainer",
    image: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/Melverick%20portrait.jpeg",
    bio: "Non-technical Business Consultant with 30+ years professional experience."
  },
  {
    name: "Darryl Wong",
    role: "Master Sifu",
    image: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/darryl.jpeg",
    bio: "AI Enthusiast with CPA, 20+ years professional experience ."
  },
];

export const REVIEWS: Review[] = [
  {
    name: "Fion Heu",
    role: "Marketing Director",
    date: "Sep 2025",
    rating: 5,
    content: "This course sharpened my AI skills through hands-on practice with ChatGPT, Copilot, and Claude. The prompt engineering techniques were game-changing.",
    image: "https://picsum.photos/id/64/100/100"
  },
  {
    name: "Boon Peng Yeo",
    role: "Consultant",
    date: "Sep 2025",
    rating: 5,
    content: "I love how the course focused on prompt engineering concepts: from zero-shot prompting to chain-of-thought reasoning.",
    image: "https://picsum.photos/id/91/100/100"
  }
];

export const SCHEDULES: ScheduleItem[] = [
  {
    type: 'Weekday',
    dates: '18–19 May 2026',
    time: '9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 4,
    month: 'May 2026',
    registrationCloses: 'TBC',
  },
  {
    type: 'Weekday',
    dates: '08–09 Jun 2026',
    time: '9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 4,
    month: 'Jun 2026',
    registrationCloses: 'TBC',
  },
  {
    type: 'Weekday',
    dates: '26 Jun 2026 & 03 Jul 2026',
    time: '9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 4,
    month: 'Jun 2026',
    registrationCloses: 'TBC',
  },
  {
    type: 'Weekday',
    dates: '26 Jun 2026 & 03 Jul 2026',
    time: '9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 4,
    month: 'Jul 2026',
    registrationCloses: 'TBC',
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
      'Generative AI creates content (text, images, code), while agentic AI takes it further — autonomous AI agents can plan, execute multi-step workflows, and take actions on your behalf. Our course teaches practical business automation with this approach, no coding required.',
  },
  {
    question: 'What are the prerequisites for this course?',
    answer: 'There are no technical prerequisites. The course is designed to be beginner-friendly while scaling to advanced techniques.',
  },
  {
    question: 'What AI certification will I receive in Singapore?',
    answer:
      'Upon completion, you will receive a WSQ Statement of Attainment — a nationally recognized credential validating your AI upskilling outcomes.',
  },
];

export const MODULES: CurriculumModule[] = [
  {
    title: "AI Fundamentals & LLMs",
    description: "Understand the Generative AI landscape, LLM architecture, and key tools like ChatGPT, Gemini, and Copilot.",
    iconName: "Brain"
  },
  {
    title: "Advanced Prompt Engineering",
    description: "Master Zero-shot, Few-shot, and Chain-of-Thought reasoning to elicit precise and complex outputs.",
    iconName: "MessageSquare"
  },
  {
    title: "Build Apps with AI",
    description: "Learn how to build with AI to turn your business ideas into working software, with no programming experience required.",
    iconName: "Code"
  },
  {
    title: "Build AI Agents",
    description: "Build a dedicated AI agent tailored to your workflow that executes complex tasks with precision.",
    iconName: "Bot"
  },
  {
    title: "Data Analysis & Insights",
    description: "Leverage AI interpreters to analyze spreadsheets, visualize trends, and extract actionable insights.",
    iconName: "BarChart3"
  },
  {
    title: "Ethics, Safety & Governance",
    description: "Navigate copyright, data privacy (PDPA), hallucinations, and implement safe AI adoption strategies.",
    iconName: "Shield"
  }
];

export const LEARNING_OUTCOMES = [
  "Understand the principles of Agentic AI and how autonomous agents differ from standard LLMs.",
  "Identify high-value opportunities to deploy AI agents for business process automation.",
  "Design and configure basic AI agents to handle scheduling, data retrieval, and reporting.",
  "Apply prompt engineering strategies to control agent behavior and ensure reliability.",
  "Analyze the ethical and security implications of deploying autonomous AI in corporate environments."
];

export const WEBSITE_IMAGES = {
  hero: {
    main: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/hero-main.jpg"
  },
  about: {
    primary: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/about-primary.jpg",
    secondary: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/about-secondary.jpg"
  },
  blog: {
    featured: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/blog-feature.jpg"
  },
  subscription: {
    cta: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/subscription-cta.jpg"
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'beyond-chatgpt-ai-powered-company',
    title: 'Beyond ChatGPT: 4 Hard Truths About Building an AI-Powered Company',
    date: '10 Dec 2025',
    views: 15,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover why AI adoption isn\'t enough. Learn the four fundamental shifts in leadership, structure, and strategy needed to transform your business into a Frontier Firm with Agentic Architecture.',
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
    excerpt: 'OpenAI\'s new report reveals surprising insights from 1 million business customers—from the emergence of a new coder class to a widening gap between AI leaders and laggards.',
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
    excerpt: 'Stop building monolithic agents. Discover Anthropic\'s revolutionary approach to AI using composable "Skills"—simple folders that bridge the expertise gap and democratize AI development.',
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
    excerpt: 'Agentic AI isn\'t just a buzzword — it\'s the most significant shift in business technology since the internet. Learn how autonomous AI agents plan, decide, and act, and why every business professional needs to understand this now.',
    category: 'Beginner Guides',
    bestFor: 'SME owners, first-time AI learners',
    featured: true,
  },
  {
    id: 5,
    slug: 'best-ai-courses-singapore-2026',
    title: 'Best AI Courses Singapore 2026: How to Choose the Right Programme',
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
];

export const SYSTEM_INSTRUCTION = `
You are an expert AI Advisor for the 'Nexius Academy Certificate in Applied Generative AI'.
Your goal is to help potential students understand the course and encourage them to apply. From the user's questions, determine the level of interest and try to get their contact details like email or phone number. Use the information in this website and the following course details to answer questions:

- Course Name: Agentic AI Foundations for Non-Technical Professionals: Enhancing Productivity and Business Process Automation
- Course Ref: TP-NC-C0021-F
- Price: $890 (Full), $111.03 (After Subsidy for SG Citizens 40 & above).
- Duration: 16 Hours Total (2 full days + 1 Assessment).
- Format: In-Person.
- Curriculum: Fundamentals, Advanced Prompt Engineering, Business Writing, Image Generation, Data Analysis, Ethics.
- Subsidies: SkillsFuture Credits, UTAP, PSEA available.
- Cert: WSQ Statement of Attainment.
- Tone: Professional, encouraging, and helpful. Keep answers concise (under 100 words).
`;
