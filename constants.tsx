import { Instructor, Review, ScheduleItem, FaqItem, CurriculumModule } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    name: "Melverick Ng",
    role: "Master Trainer",
    image: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/Melverick%20portrait.jpeg",
    bio: "Non-techincal Business Consultant with 30+ years professional experience."
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
    dates: '29 Dec - 30 Dec',
    time: 'Mon - Tue, 9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 3,
    month: 'Dec 2025'
  },
  {
    type: 'Weekend',
    dates: '11 Jan - 12 Jan',
    time: 'Sat - Sun, 9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 8,
    month: 'Jan 2026'
  },
  {
    type: 'Weekday',
    dates: '20 Jan - 21 Jan',
    time: 'Mon - Tue, 9:00am - 6:00pm',
    format: 'Online (Zoom)',
    slotsLeft: 12,
    month: 'Jan 2026'
  },
  {
    type: 'Weekend',
    dates: '25 Jan - 26 Jan',
    time: 'Sat - Sun, 9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 6,
    month: 'Jan 2026'
  },
  {
    type: 'Weekend',
    dates: '8 Feb - 9 Feb',
    time: 'Sat - Sun, 9:00am - 6:00pm',
    format: 'In-Person',
    slotsLeft: 10,
    month: 'Feb 2026'
  },
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
];

export const FAQS: FaqItem[] = [
  {
    question: "Do I need any coding experience to join?",
    answer: "No. This course is specifically designed for non-coders and business professionals. We teach you how to use AI tools and natural language to build software and automations without writing complex code from scratch."
  },
  {
    question: "Is this course just theory, or will I build something?",
    answer: "We hate fluff as much as you do. This is a hands-on, builder-focused course. You will finish the program having built at least one functional prototype or workflow that you can use immediately."
  },
  {
    question: "What tools will we be using?",
    answer: "We focus on accessible, high-impact tools. You will likely use platforms like Bolt.new for building apps, n8n for automation, and leading LLMs (like ChatGPT, Claude, or Gemini) for reasoning and content generation (subject to changes)."
  },
  {
    question: "Is this an online course?",
    answer: "No, it is 100% in-person. We prioritize physical classes because hands-on guidance is the most effective way to master these tools quickly."
  },
{
    question: "Can I apply these skills to my current job?",
    answer: "Absolutely. We focus on real-world business use cases—like automating CRM data entry, generating lead reports, or building internal tools—so you can start saving time at work immediately."
  },
  {
    question: "What is the time commitment required?",
    answer: "This is an intensive, 2-day workshop. Sessions run from 9:00 AM to 5:00 PM on consecutive days (e.g., Tuesday and Wednesday) to ensure deep immersion and focus."
  },
{
    question: "Are there course fee subsidies available?",
    answer: "Yes! Singapore Citizens and PRs aged 21 and above can enjoy up to 90% subsidies. You can also use your SkillsFuture credits."
  },
  {
    question: "What certification will I receive?",
    answer: "Upon completion, you will receive a Certificate of Completion jointly issued by Nexius Academy & SkillsFuture."
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

export const SYSTEM_INSTRUCTION = `
You are an expert AI Advisor for the 'Nexius Academy Certificate in Agentic AI for non-technical professionals'.
Your goal is to help potential students understand the course and encourage them to apply.
Use the following course details to answer questions:

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