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
    dates: '16 Feb - 17 Feb',
    time: 'Mon - Tue, 6:30pm - 9:30pm',
    format: 'Online (Zoom)',
    slotsLeft: 15,
    month: 'Feb 2026'
  },
  {
    type: 'Weekend',
    dates: '22 Feb - 23 Feb',
    time: 'Sat - Sun, 9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 4,
    month: 'Feb 2026'
  },
  {
    type: 'Weekend',
    dates: '8 Mar - 9 Mar',
    time: 'Sat - Sun, 9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 12,
    month: 'Mar 2026'
  },
  {
    type: 'Weekday',
    dates: '17 Mar - 18 Mar',
    time: 'Mon - Tue, 9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 15,
    month: 'Mar 2026'
  },
  {
    type: 'Weekend',
    dates: '22 Mar - 23 Mar',
    time: 'Sat - Sun, 9:00am - 6:00pm',
    format: 'Online (Zoom)',
    slotsLeft: 15,
    month: 'Mar 2026'
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is agentic AI and how does it differ from generative AI?",
    answer: "Generative AI creates content (text, images, code), while agentic AI takes it further — autonomous AI agents can plan, execute multi-step workflows, and take actions on your behalf. Our agentic AI course teaches you to build these systems for real business automation, no coding required."
  },
  {
    question: "What are the prerequisites for this course?",
    answer: "There are no technical prerequisites. The course is designed to be beginner-friendly while scaling to advanced techniques."
  },
  {
    question: "Are there course fee subsidies available?",
    answer: "Yes! Singapore Citizens and PRs aged 21 and above can enjoy up to 90% subsidies. You can also use your SkillsFuture credits."
  },
  {
    question: "What AI certification course will I receive in Singapore?",
    answer: "Upon completion of this AI certification course Singapore professionals trust, you will receive a WSQ Statement of Attainment — a nationally recognized credential that validates your AI skills training."
  }
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
    title: "Business Writing & Automation",
    description: "Automate reports, emails, marketing copy, and proposals while maintaining corporate brand voice.",
    iconName: "Briefcase"
  },
  {
    title: "Visual Content Creation",
    description: "Generate professional assets, edit graphics, and create presentations using Midjourney and DALL-E 3.",
    iconName: "Image"
  },
  {
    title: "Data Analysis & Insights",
    description: "Leverage AI interpreters to analyze spreadsheets, visualize trends, and extract actionable insights.",
    iconName: "Code"
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
    excerpt: 'Discover why AI adoption isn\'t enough. Learn the four fundamental shifts in leadership, structure, and strategy needed to transform your business into a Frontier Firm with Agentic Architecture.',
    featured: true,
  },
  {
    id: 2,
    slug: 'enterprise-ai-insights',
    title: 'Beyond the Hype: 5 Things We Just Learned About How Enterprises Really Use AI',
    date: '02 Jun 2025',
    views: 87,
    excerpt: 'OpenAI\'s new report reveals surprising insights from 1 million business customers—from the emergence of a new coder class to a widening gap between AI leaders and laggards.',
    featured: true,
  },
  {
    id: 3,
    slug: 'anthropic-ai-skills',
    title: '4 Counter-Intuitive Ideas From Anthropic on Building AI That Actually Works',
    date: '12 Dec 2025',
    views: 21,
    excerpt: 'Stop building monolithic agents. Discover Anthropic\'s revolutionary approach to AI using composable "Skills"—simple folders that bridge the expertise gap and democratize AI development.',
    featured: true,
  },
];

export const SYSTEM_INSTRUCTION = `
You are an expert AI Advisor for the 'Nexius Academy Certificate in Applied Generative AI'.
Your goal is to help potential students understand the course and encourage them to apply. From the user's questions, determine the level of interest and try to get their contact details like email or phone number. Use the information in this website and the following course details to answer questions:

- Course Name: Agentic AI Foundations for Non-Technical Professionals: Enhancing Productivity and Business Process Automation
- Course Ref: TGS-2025059915
- Price: $890 (Full), $111.03 (After Subsidy for SG Citizens 40 & above).
- Duration: 16 Hours Total (2 full days + 1 Assessment).
- Format: In-Person.
- Curriculum: Fundamentals, Advanced Prompt Engineering, Business Writing, Image Generation, Data Analysis, Ethics.
- Subsidies: SkillsFuture Credits, UTAP, PSEA available.
- Cert: WSQ Statement of Attainment.
- Tone: Professional, encouraging, and helpful. Keep answers concise (under 100 words).
`;