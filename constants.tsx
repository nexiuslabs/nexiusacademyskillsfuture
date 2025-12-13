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
    question: "What is Generative AI and how does it work?",
    answer: "Generative AI refers to algorithms (like ChatGPT or Midjourney) that can be used to create new content, including audio, code, images, text, simulations, and videos."
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
    question: "What certification will I receive?",
    answer: "Upon completion, you will receive a Certificate of Completion recognized by industry employers."
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
You are an expert AI Advisor for the 'Nexius Academy Certificate in Applied Generative AI'.
Your goal is to help potential students understand the course and encourage them to apply. From the user's questions, determine the level of interest and provide the registration link of the course they are interested. Use the information in this website and the following course details to answer questions:

- Course Name: Agentic AI Foundations for Non-Technical Professionals: Enhancing Productivity and Business Process Automation
- Course Ref: TGS-2025059915
- Price: $890 (Full), $111.03 (After Subsidy for SG Citizens 40 & above).
- Duration: 16 Hours Total (2 full days + 1 Assessment).
- Format: In-Person.
- Curriculum: Fundamentals, Advanced Prompt Engineering, Business Writing, Image Generation, Data Analysis, Ethics.
- Subsidies: SkillsFuture Credits, UTAP, PSEA available.
- Cert: WSQ Statement of Attainment.
- Registration Link: https://www.myskillsfuture.gov.sg/content/portal/en/training-exchange/course-directory/course-detail.html?courseReferenceNumber=TGS-2025059915
- Tone: Professional, encouraging, and helpful. Keep answers concise (under 100 words).
`;