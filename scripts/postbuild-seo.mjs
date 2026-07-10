import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://academy.nexiuslabs.com';
const DIST_DIR = path.resolve('dist');
const DEFAULT_IMAGE = 'https://academy.nexiuslabs.com/images/social/agentic-ai-courses.jpg';
const HOME_IMAGE = `${SITE_URL}/images/homepage-hero.jpg`;
const COURSE_IMAGE = `${SITE_URL}/images/og/agentic-ai-course-og.jpg`;
const PRIVATE_CLASS_IMAGE = `${SITE_URL}/images/private-class/hall-room.jpg`;
const LASTMOD = '2026-07-06';

const melverickPerson = {
  '@type': 'Person',
  name: 'Melverick Ng',
  url: 'https://academy.nexiuslabs.com/about/',
  image: `${SITE_URL}/images/authors/melverick-ng-selected.jpg`,
  jobTitle: 'Founder of Nexius Labs and Master Trainer at Nexius Academy',
  worksFor: {
    '@type': 'Organization',
    name: 'Nexius Labs',
    url: 'https://nexiuslabs.com',
  },
  affiliation: {
    '@type': 'EducationalOrganization',
    name: 'Nexius Academy',
    url: SITE_URL,
  },
  sameAs: ['https://www.linkedin.com/in/melverick'],
};

const darrylPerson = {
  '@type': 'Person',
  name: 'Darryl Wong',
  url: 'https://academy.nexiuslabs.com/about/',
  image: `${SITE_URL}/images/authors/darryl-wong-selected.jpeg`,
  jobTitle: 'Master Sifu and AI Trainer at Nexius Academy',
  worksFor: {
    '@type': 'Organization',
    name: 'Nexius Labs',
    url: 'https://nexiuslabs.com',
  },
  affiliation: {
    '@type': 'EducationalOrganization',
    name: 'Nexius Academy',
    url: SITE_URL,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Nexius Academy',
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  description:
    'Nexius Academy offers hands-on AI training in Singapore for business professionals, covering agentic AI, no-code automation, and generative AI workshops.',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Nexius Labs',
    url: 'https://nexiuslabs.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SG',
  },
  sameAs: [
    'https://www.linkedin.com/company/nexius-labs',
    'https://www.linkedin.com/in/melverick',
  ],
  employee: [melverickPerson, darrylPerson],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nexius Academy',
  url: SITE_URL,
  inLanguage: 'en-SG',
};

const toAbsoluteUrl = (routePath) => `${SITE_URL}${routePath === '/' ? '/' : `${routePath}/`}`;

const breadcrumbSchema = (routePath, title) => {
  if (routePath === '/') return null;
  const parts = routePath.split('/').filter(Boolean);
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ];

  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    itemListElement.push({
      '@type': 'ListItem',
      position: index + 2,
      name:
        index === parts.length - 1
          ? title.replace(' | Nexius Academy', '')
          : part.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
      item: toAbsoluteUrl(currentPath),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};

const courseSchema = ({ name, description, url, image, audienceType, courseInstance, aggregateRating, offers, instructors }) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  url,
  image,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Nexius Academy',
    url: SITE_URL,
  },
  instructor: instructors,
  offers,
  aggregateRating,
  hasCourseInstance: courseInstance,
  educationalLevel: 'Professional',
  audience: {
    '@type': 'Audience',
    audienceType,
  },
  inLanguage: 'en',
  availableLanguage: 'en',
  locationCreated: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SG',
    },
  },
});

const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

const articleSchema = ({ headline, description, url, image, datePublished }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  image,
  mainEntityOfPage: url,
  datePublished,
  dateModified: LASTMOD,
  author: {
    ...melverickPerson,
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Nexius Academy',
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_IMAGE,
    },
  },
});

const pageSchema = ({ name, description, url, image, type = 'WebPage' }) => ({
  '@context': 'https://schema.org',
  '@type': type,
  name,
  description,
  url,
  inLanguage: 'en-SG',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Nexius Academy',
    url: SITE_URL,
  },
  primaryImageOfPage: image ? { '@type': 'ImageObject', url: image } : undefined,
});

const mainCourseFaqs = [
  {
    question: 'Can I use SkillsFuture credits fully?',
    answer:
      'Many eligible learners can offset most or all out-of-pocket fees using a mix of SkillsFuture subsidy and available SkillsFuture Credits. Final payable depends on your eligibility profile and current funding rules at application time.',
  },
  {
    question: 'Will I get hands-on help for my own workflow?',
    answer:
      'Yes. This course is workshop-first. You will apply concepts to your own use cases during guided activities, with trainer support to shape one practical workflow blueprint you can deploy after class.',
  },
  {
    question: 'What happens after class?',
    answer:
      'You will receive implementation templates and can continue with advisor follow-up for next steps. For teams, we also provide options for post-course implementation support and corporate enablement.',
  },
  {
    question: 'What is agentic AI and how does it differ from generative AI?',
    answer:
      'Generative AI creates content like text, images, and code, while agentic AI takes it further with autonomous agents that can plan, execute multi-step workflows, and take actions on your behalf.',
  },
];

const privateClassFaqs = [
  {
    question: 'Who is this private class for?',
    answer:
      'It is for companies that want to train one internal team or multiple departments together in a dedicated cohort instead of joining a public class.',
  },
  {
    question: 'What is the minimum class size?',
    answer: 'The minimum class size is 12 pax for a dedicated company run.',
  },
  {
    question: 'Can the workshop focus on our real internal workflows?',
    answer:
      'Yes. The company-run format is specifically designed to make the workshop more relevant to your team use cases, recurring tasks, and process pain points.',
  },
  {
    question: 'Can you run the training at our office?',
    answer:
      'Yes. Delivery can be discussed for your office or an external venue depending on privacy, convenience, and room setup.',
  },
];

const accountantsFaqs = [
  {
    question: 'Who is this course designed for?',
    answer:
      'It is designed for accountants, corporate service providers, firm owners, and non-technical professionals handling drafting, reporting, compliance, and client-service work.',
  },
  {
    question: 'Do I need coding experience?',
    answer:
      'No. The course focuses on practical AI workflows and no-code adoption rather than technical retraining.',
  },
];

const frontierFaqs = [
  {
    question: 'Who should attend this course?',
    answer:
      'This programme is suitable for anyone who wants to learn advanced Agentic AI knowledge, including professionals, builders, managers, business owners, educators, consultants, and transformation teams.',
  },
  {
    question: 'What is the main outcome of the programme?',
    answer:
      'Participants will learn how to move from isolated AI use cases to coordinated, secure, and scalable agentic workflows through Frontier Firm and Agent Boss frameworks.',
  },
  {
    question: 'What is the course duration and fee?',
    answer:
      'The course runs over 3 days. The official TP/STMS payable amounts are S$190.50 for Singaporean aged 40 and above or eligible SME-sponsored learners, S$490.50 for Singaporean aged 39 and below, Singapore Permanent Residents, and LTVP+ learners, and S$1,635.00 for the full course fee. Amounts are inclusive of 9% GST and subject to final eligibility confirmation.',
  },
  {
    question: 'Will participants receive a certificate?',
    answer:
      'Participants who meet at least 75% attendance and attempt the assessment will be awarded a Certificate of Completion.',
  },
];

const agenticBusinessInnovationFaqs = [
  {
    question: 'Who should attend this advanced Agentic AI course?',
    answer:
      'The course is suitable for SME owners and founders, business managers and C-suite executives, entrepreneurs, intrapreneurs, and professionals who want advanced Agentic AI knowledge for organisation-wide productivity.',
  },
  {
    question: 'What does the course teach?',
    answer:
      'The course teaches business leaders how to restructure an organization into an Agentic Company using the Frontier Firm concept, a 3-phase roadmap, multi-department agent orchestration, the Agent Boss paradigm, hybrid workforce management, governance, security, and transformation roadmapping.',
  },
  {
    question: 'What are the course fee amounts?',
    answer:
      'The published payable amounts are S$190.50 for Singaporean aged 40 and above or eligible SME-sponsored learners, S$490.50 for Singaporean aged 39 and below, Singapore Permanent Residents, and LTVP+ learners, and S$1,635.00 for the full course fee. Amounts are inclusive of 9% GST and subject to final eligibility confirmation.',
  },
  {
    question: 'Will participants receive a certificate?',
    answer:
      'Participants who meet at least 75% of the required course attendance and attempt the assessment will be awarded the Certificate of Completion.',
  },
];

const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Nexius Academy | Practical AI Training in Singapore',
    description:
      'Practical AI training in Singapore for business teams. Learn agentic AI, no-code automation, and useful workplace workflows.',
    ogType: 'website',
    ogImage: HOME_IMAGE,
    schemas: [organizationSchema, websiteSchema],
  },
  {
    path: '/about',
    priority: '0.7',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'About Nexius Academy | AI Training Experts Singapore',
    description:
      'Meet Nexius Academy, a Singapore AI training provider helping business teams apply agentic AI and no-code automation at work.',
    ogType: 'website',
    ogImage: HOME_IMAGE,
    schemas: [],
  },
  {
    path: '/skillsfuture-funding-guide',
    priority: '0.7',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'SkillsFuture Funding Guide for Employers | Nexius Academy',
    description:
      'A practical SkillsFuture funding guide for employers reviewing course fee support, sponsored training, and official verification steps.',
    ogType: 'article',
    ogImage: COURSE_IMAGE,
    schemas: [],
  },
  {
    path: '/assessments',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Agentic AI Challenge | Nexius Academy',
    description:
      'Take the Nexius Academy Agentic AI Challenge: a 20-question quiz covering AI maturity, context engineering, Codex workflows, memory, MCP, and governance.',
    ogType: 'website',
    ogImage: COURSE_IMAGE,
    schemas: [
      pageSchema({
        name: 'Agentic AI Challenge',
        description:
          'A 20-question Agentic AI Foundation quiz covering AI maturity, context engineering, the DUO workflow, Codex workflows, skills, memory, MCP, and governance.',
        url: `${SITE_URL}/assessments/`,
        image: COURSE_IMAGE,
        type: 'Quiz',
      }),
    ],
  },
  {
    path: '/reports/singapore-ai-training-readiness-2026',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Singapore AI Training & Readiness Report 2026 | Nexius Academy',
    description:
      'A practical Singapore AI training and readiness report for SMEs, non-technical professionals, accountants, CSP firms, and business leaders evaluating agentic AI skills.',
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
    schemas: [],
    articleDate: '2026-05-29',
  },
  {
    path: '/courses/agentic-ai',
    priority: '0.9',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Agentic AI Course Singapore | Nexius Academy',
    description:
      'Learn agentic AI in a 16-hour SkillsFuture-eligible course for non-technical business professionals. Build no-code AI workflows.',
    ogType: 'course',
    ogImage: COURSE_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI Foundations for Non-Technical Professionals',
        description:
          'A 16-hour, SkillsFuture-eligible course on agentic AI, no-code automation, prompt engineering, and practical business workflow design.',
        url: `${SITE_URL}/courses/agentic-ai`,
        image: COURSE_IMAGE,
        audienceType: 'Business professionals, SME owners, and non-technical teams',
        instructors: [melverickPerson, darrylPerson],
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/courses/agentic-ai/`,
          priceCurrency: 'SGD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '223',
        },
        courseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'In-person',
          courseWorkload: 'PT16H',
          startDate: '2026-08-14',
          endDate: '2026-08-21',
          location: {
            '@type': 'Place',
            name: 'Nexius Academy',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'SG',
            },
          },
          instructor: {
            '@type': 'Person',
            name: 'Melverick Ng',
          },
        },
      }),
      faqSchema(mainCourseFaqs),
    ],
  },
  {
    path: '/private-class',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Dedicated Company AI Class | Nexius Academy',
    description:
      'Private agentic AI training for teams of 12 or more. Tailor the workshop to real workflows and align staff on practical AI adoption.',
    ogType: 'website',
    ogImage: PRIVATE_CLASS_IMAGE,
    schemas: [
      courseSchema({
        name: 'Dedicated Company AI Class',
        description:
          'Private company-run agentic AI training for teams that want aligned adoption, practical workflow relevance, and a safer internal learning setting.',
        url: `${SITE_URL}/private-class`,
        image: PRIVATE_CLASS_IMAGE,
        audienceType: 'Company teams, department heads, and business operations leaders',
        instructors: [melverickPerson, darrylPerson],
      }),
      faqSchema(privateClassFaqs),
    ],
  },
  {
    path: '/course-preview',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Course Preview: Agentic AI Foundations | Nexius Academy',
    description:
      'Join the 11 July 2026 course preview for Agentic AI Foundations. A classroom session for non-technical professionals from 10am to 1pm.',
    ogType: 'course',
    ogImage: COURSE_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI Foundations for Non-Technical Professionals Course Preview',
        description:
          'A 3-hour preview introducing non-technical professionals to Agentic AI, workplace use cases, hands-on AI activity, and safe adoption habits.',
        url: `${SITE_URL}/course-preview`,
        image: COURSE_IMAGE,
        audienceType: 'Non-technical professionals, business managers, SME owners, and workplace teams',
        instructors: [melverickPerson, darrylPerson],
        courseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'In-person',
          courseWorkload: 'PT3H',
          startDate: '2026-07-11T10:00:00+08:00',
          endDate: '2026-07-11T13:00:00+08:00',
          location: {
            '@type': 'Place',
            name: 'Devan Nair Institute for Employment and Employability',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '80 Jurong East St 21',
              addressCountry: 'SG',
            },
          },
        },
      }),
    ],
  },
  {
    path: '/e2i-preview',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: '4-Hour Agentic AI Preview Session | Nexius Academy',
    description:
      'A beginner-friendly 4-hour Agentic AI preview for non-technical professionals. Learn prompts, reusable instructions, and safe AI habits.',
    ogType: 'course',
    ogImage: COURSE_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI Foundations for Non-Technical Professionals Preview Session',
        description:
          'A 4-hour preview introducing non-technical professionals to Agentic AI, better prompting, reusable instructions, and safe review habits.',
        url: `${SITE_URL}/e2i-preview`,
        image: COURSE_IMAGE,
        audienceType: 'Non-technical professionals, SME owners, managers, and business teams',
        instructors: [melverickPerson, darrylPerson],
        courseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'In-person',
          courseWorkload: 'PT4H',
          startDate: '2026-06-26T14:00:00+08:00',
          endDate: '2026-06-26T18:00:00+08:00',
          location: {
            '@type': 'Place',
            name: 'e2i preview venue',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'SG',
            },
          },
        },
      }),
    ],
  },
  {
    path: '/sim-preview',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: '4-Hour Agentic AI Preview Session | Nexius Academy',
    description:
      'A beginner-friendly 4-hour Agentic AI preview for non-technical professionals. Learn prompts, reusable instructions, and safe AI habits.',
    ogType: 'course',
    ogImage: COURSE_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI Foundations for Non-Technical Professionals Preview Session',
        description:
          'A 4-hour preview introducing non-technical professionals to Agentic AI, better prompting, reusable instructions, and safe review habits.',
        url: `${SITE_URL}/sim-preview`,
        image: COURSE_IMAGE,
        audienceType: 'Non-technical professionals, SME owners, managers, and business teams',
        instructors: [melverickPerson, darrylPerson],
        courseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'In-person',
          courseWorkload: 'PT4H',
          startDate: '2026-07-04T09:00:00+08:00',
          endDate: '2026-07-04T13:00:00+08:00',
          location: {
            '@type': 'Place',
            name: 'SIM Global Education',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'SG',
            },
          },
        },
      }),
    ],
  },
  {
    path: '/courses/agentic-ai-company-class',
    priority: '0.3',
    changefreq: 'monthly',
    includeInSitemap: false,
    title: 'Dedicated Company AI Class | Nexius Academy',
    description:
      'This legacy company-class page now redirects search signals to the dedicated private-class page for private team training enquiries.',
    ogType: 'website',
    ogImage: PRIVATE_CLASS_IMAGE,
    canonicalPath: '/private-class',
    robots: 'noindex,follow',
    schemas: [],
  },
  {
    path: '/courses/agentic-ai-accountants',
    priority: '0.7',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Agentic AI for Accountants & CSPs | Nexius Academy',
    description:
      'A practical no-code AI course for accountants, CSPs, and firm owners improving drafting, reporting, compliance, and client-service work.',
    ogType: 'course',
    ogImage: COURSE_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI Foundations for Accounting and CSP Professionals',
        description:
          'A practical no-code AI course for accounting and corporate-service professionals handling drafting, reporting, compliance, and client service.',
        url: `${SITE_URL}/courses/agentic-ai-accountants`,
        image: COURSE_IMAGE,
        audienceType: 'Accountants, corporate service providers, firm owners, and non-technical finance teams',
        instructors: [melverickPerson, darrylPerson],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '223',
        },
      }),
      faqSchema(accountantsFaqs),
    ],
  },
  {
    path: '/courses/advanced-agentic-ai',
    priority: '0.7',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Agentic AI-Driven Innovation | Nexius Academy',
    description:
      'An advanced Agentic AI course for learners who want to understand Frontier Firm strategy, agent orchestration, AI governance, and practical implementation.',
    ogType: 'course',
    ogImage: HOME_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI-Driven Innovation for Productivity',
        description:
          'An advanced Agentic AI programme on Frontier Firm strategy, cross-functional orchestration, Agent Boss operating models, and AI governance.',
        url: `${SITE_URL}/courses/advanced-agentic-ai`,
        image: HOME_IMAGE,
        audienceType: 'Professionals, builders, managers, business owners, educators, consultants, and advanced AI learners',
        instructors: [melverickPerson, darrylPerson],
      }),
      faqSchema(frontierFaqs),
    ],
  },
  {
    path: '/courses/agentic-ai-business-innovation',
    priority: '0.6',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Agentic AI Business Innovation Course | Nexius Academy',
    description:
      'Agentic AI-Driven Business Innovation for Productivity: Strategies for the Frontier Firm, covering overview, audience, outcomes, certification, fees, and application guidance.',
    ogType: 'course',
    ogImage: HOME_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI-Driven Business Innovation for Productivity: Strategies for the Frontier Firm',
        description:
          'An advanced Agentic AI programme on the Frontier Firm concept, Agentic Company transformation, multi-department agent orchestration, Agent Boss operating models, governance, security, and transformation roadmapping.',
        url: `${SITE_URL}/courses/agentic-ai-business-innovation`,
        image: HOME_IMAGE,
        audienceType: 'SME owners and founders, business managers and C-suite executives, entrepreneurs, intrapreneurs, and advanced Agentic AI learners',
        instructors: [melverickPerson, darrylPerson],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SGD',
          price: '1635.00',
          availability: 'https://schema.org/InStock',
        },
        courseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'In-person',
          courseWorkload: 'P3D',
        },
      }),
      faqSchema(agenticBusinessInnovationFaqs),
    ],
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'AI Training Blog | Agentic AI Guides | Nexius Academy',
    description:
      'Explore agentic AI insights, business automation guides, and practical AI training trends for non-technical professionals.',
    ogType: 'website',
    ogImage: HOME_IMAGE,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Nexius Academy Blog',
        url: `${SITE_URL}/blog`,
        description:
          'Agentic AI insights, practical business automation guides, and AI training analysis for Singapore professionals.',
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'Nexius Academy',
          url: SITE_URL,
        },
      },
    ],
  },
  {
    path: '/blog/beyond-chatgpt-ai-powered-company',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Beyond ChatGPT: Building an AI-Powered Company',
    description:
      'Most companies hit an AI plateau after adopting ChatGPT. Learn the leadership, structure, and strategy shifts behind AI-powered companies.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2025-12-10',
  },
  {
    path: '/blog/enterprise-ai-insights',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Enterprise AI Insights: Scaling AI in 2026',
    description:
      'Real-world insights on how enterprises deploy AI at scale, with strategies and lessons from agentic AI implementation.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2025-06-02',
  },
  {
    path: '/blog/anthropic-ai-skills',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Anthropic AI Skills for Business Professionals',
    description:
      "Explore the essential AI skills from Anthropic's ecosystem that business professionals need in 2026. From Claude to enterprise AI deployment strategies.",
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2025-12-12',
  },
  {
    path: '/blog/what-is-agentic-ai-guide',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'What Is Agentic AI? A Business Guide',
    description:
      'Learn what agentic AI is, how it differs from generative AI, and why Singapore business professionals need to understand the shift.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-01-08',
  },
  {
    path: '/blog/best-ai-courses-singapore-2026',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Best AI Courses Singapore 2026: How to Choose',
    description:
      'Compare AI courses in Singapore for 2026, from SkillsFuture options to agentic AI training for business professionals.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-01-22',
  },
  {
    path: '/blog/smes-no-code-ai-automation-singapore',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'No-Code AI Automation for Singapore SMEs',
    description:
      'See how Singapore SMEs use no-code AI automation to cut costs, scale operations, and compete with larger firms.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-02-05',
  },
  {
    path: '/blog/ai-literacy-corporate-learning-2026',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'AI Literacy for Corporate Learning in 2026',
    description:
      'Learn how corporate learning teams can build practical AI fluency, role-based training, and agentic AI readiness in 2026.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-04-19',
  },
  {
    path: '/blog/ai-readiness-singapore-2026-agentic-ai',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'AI Readiness Singapore 2026: Pre-Build Checklist',
    description:
      'A practical AI-readiness checklist for Singapore professionals and SMEs before adopting agentic AI workflows, no-code automation, and workplace AI tools.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-05-15',
  },
  {
    path: '/blog/best-ai-for-coding-business-professionals',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Best AI for Coding? What Business Teams Should Learn',
    description:
      'Search interest in AI coding tools signals a shift from chat to execution. Learn what non-technical professionals should take from it.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-05-21',
  },
  {
    path: '/blog/computer-using-agents-business-professionals',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Computer-Using Agents for Business Professionals',
    description:
      'Learn what computer-using agents are, why they matter for non-technical teams, and the practical skills needed to supervise AI workflows safely.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-05-30',
  },
  {
    path: '/blog/always-on-agents-work-iq-business-professionals',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Always-On AI Agents: What Business Professionals Must Learn',
    description:
      'Microsoft Scout and Work IQ show AI moving into always-on workplace execution. Learn the practical skills professionals need before supervising agents.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-06-08',
  },
  {
    path: '/blog/dashboard-agents-business-professionals',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Dashboard Agents: What Business Professionals Must Learn',
    description:
      "Google Cloud's Looker agents show analytics moving from static dashboards to AI-assisted decision workflows. Learn the practical skills professionals need next.",
    ogType: 'article',
    ogImage: 'https://academy.nexiuslabs.com/images/blog/dashboard-agents-decision-workflows.png',
    ogImageAlt: 'Dashboard agents turning business metrics into governed decision workflows',
    schemas: [],
    articleDate: '2026-06-15',
  },
  {
    path: '/blog/ai-connectors-mcp-business-professionals',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'AI Connectors and MCP: What Business Professionals Must Learn',
    description:
      'AI connectors, MCP, and work graph APIs are moving AI from chat into company systems. Learn the workflow, context, approval, testing, and governance skills professionals need next.',
    ogType: 'article',
    ogImage: 'https://academy.nexiuslabs.com/images/blog/ai-connectors-mcp-business-professionals.png',
    ogImageAlt: 'Business professionals learning to design governed AI connector workflows',
    schemas: [],
    articleDate: '2026-06-22',
  },
  {
    path: '/blog/agent-handoffs-business-professionals',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Agent Handoffs: What Business Professionals Must Learn',
    description:
      'Agent-to-agent protocols show AI moving from isolated assistants to coordinated digital coworkers. Learn the workflow mapping, context, approval, testing, and governance skills professionals need next.',
    ogType: 'article',
    ogImage: 'https://academy.nexiuslabs.com/images/blog/agent-handoffs-business-professionals.png',
    ogImageAlt: 'Business professionals mapping governed AI agent handoffs and approval gates',
    schemas: [],
    articleDate: '2026-06-29',
  },
  {
    path: '/blog/research-agents-business-professionals',
    priority: '0.8',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Research Agents: What Business Professionals Must Learn',
    description:
      'AI research agents are moving from chat answers to decision-prep workflows. Learn the source-checking, context, approval, testing, and governance skills professionals need next.',
    ogType: 'article',
    ogImage: 'https://academy.nexiuslabs.com/images/blog/research-agents-business-professionals.png',
    ogImageAlt: 'Business professionals supervising AI research agents with source checks and approval gates',
    schemas: [],
    articleDate: '2026-07-06',
  },
  {
    path: '/admin',
    priority: '0.1',
    changefreq: 'monthly',
    includeInSitemap: false,
    title: 'Admin | Nexius Academy',
    description: 'Secure admin access for Nexius Academy operations.',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    robots: 'noindex,nofollow',
    schemas: [],
  },
];

const ensureDistExists = () => {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Build output not found at ${DIST_DIR}`);
  }
};

const readHtml = () => fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

const upsertMeta = (html, selector, replacement) => {
  const regex = new RegExp(`<meta\\s+${selector}\\s+content="[^"]*"\\s*\\/?>`, 'i');
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n</head>`);
};

const upsertLink = (html, selector, replacement) => {
  const regex = new RegExp(`<link\\s+${selector}\\s+href="[^"]*"\\s*\\/?>`, 'i');
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n</head>`);
};

const stripJsonLd = (html) => html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

const applyHead = (html, route) => {
  const canonicalPath = route.canonicalPath ?? route.path;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const pageUrl = toAbsoluteUrl(route.path);
  const ogTitle = route.ogTitle ?? route.title;
  const ogDescription = route.ogDescription ?? route.description;
  const twitterTitle = route.twitterTitle ?? ogTitle;
  const twitterDescription = route.twitterDescription ?? ogDescription;
  const robots = route.robots ?? 'index,follow';

  let output = html;
  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
  output = upsertMeta(output, 'name="robots"', `<meta name="robots" content="${robots}" />`);
  output = upsertMeta(output, 'name="description"', `<meta name="description" content="${route.description}" />`);
  output = upsertMeta(output, 'property="og:title"', `<meta property="og:title" content="${ogTitle}" />`);
  output = upsertMeta(output, 'property="og:description"', `<meta property="og:description" content="${ogDescription}" />`);
  output = upsertMeta(output, 'property="og:url"', `<meta property="og:url" content="${pageUrl}" />`);
  output = upsertMeta(output, 'property="og:type"', `<meta property="og:type" content="${route.ogType}" />`);
  output = upsertMeta(output, 'property="og:image"', `<meta property="og:image" content="${route.ogImage}" />`);
  output = upsertMeta(output, 'property="og:image:width"', '<meta property="og:image:width" content="1200" />');
  output = upsertMeta(output, 'property="og:image:height"', '<meta property="og:image:height" content="630" />');
  output = upsertMeta(output, 'property="og:image:alt"', `<meta property="og:image:alt" content="${route.ogImageAlt ?? route.title}" />`);
  output = upsertMeta(output, 'property="og:site_name"', '<meta property="og:site_name" content="Nexius Academy" />');
  output = upsertMeta(output, 'name="twitter:card"', '<meta name="twitter:card" content="summary_large_image" />');
  output = upsertMeta(output, 'name="twitter:title"', `<meta name="twitter:title" content="${twitterTitle}" />`);
  output = upsertMeta(output, 'name="twitter:description"', `<meta name="twitter:description" content="${twitterDescription}" />`);
  output = upsertMeta(output, 'name="twitter:image"', `<meta name="twitter:image" content="${route.ogImage}" />`);
  output = upsertMeta(output, 'name="twitter:site"', '<meta name="twitter:site" content="@nexiuslabs" />');
  output = upsertMeta(output, 'name="twitter:creator"', '<meta name="twitter:creator" content="@melverick" />');
  if (route.ogType === 'article') {
    output = upsertMeta(output, 'property="article:published_time"', `<meta property="article:published_time" content="${route.articleDate ?? LASTMOD}" />`);
    output = upsertMeta(output, 'property="article:modified_time"', `<meta property="article:modified_time" content="${LASTMOD}" />`);
    output = upsertMeta(output, 'property="article:author"', '<meta property="article:author" content="Melverick Ng" />');
  }
  output = upsertLink(output, 'rel="canonical"', `<link rel="canonical" href="${canonicalUrl}" />`);
  output = upsertLink(output, 'rel="alternate" hreflang="en-SG"', `<link rel="alternate" hreflang="en-SG" href="${canonicalUrl}" />`);
  output = upsertLink(output, 'rel="alternate" hreflang="x-default"', `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`);
  output = upsertLink(output, 'rel="manifest"', '<link rel="manifest" href="/manifest.webmanifest" />');
  output = stripJsonLd(output);

  const hasExplicitSchemas = route.schemas.length > 0;
  const schemas = [...route.schemas];
  const breadcrumb = breadcrumbSchema(route.path, route.title);
  if (breadcrumb) {
    schemas.push(breadcrumb);
  }
  if (route.ogType === 'article') {
    schemas.push(
      articleSchema({
        headline: route.title.replace(' | Nexius Academy', ''),
        description: route.description,
        url: pageUrl,
        image: route.ogImage,
        datePublished: route.articleDate ?? LASTMOD,
      }),
    );
  } else if (!hasExplicitSchemas && route.path !== '/admin') {
    schemas.unshift(
      pageSchema({
        name: route.title.replace(' | Nexius Academy', ''),
        description: route.description,
        url: pageUrl,
        image: route.ogImage,
        type: route.path === '/about' ? 'AboutPage' : 'WebPage',
      }),
    );
  }

  if (schemas.length > 0) {
    const schemaMarkup = schemas
      .map((schema) => `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n  </script>`)
      .join('\n');
    output = output.replace('</head>', `${schemaMarkup}\n</head>`);
  }

  return output;
};

const writeRoute = (route, html) => {
  const targetDir = route.path === '/' ? DIST_DIR : path.join(DIST_DIR, route.path.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
};

const writeSitemap = () => {
  const entries = routes
    .filter((route) => route.includeInSitemap)
    .map((route) => {
      const loc = toAbsoluteUrl(route.path);
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${LASTMOD}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml);
};

const writeRobots = () => {
  const robots = [
    '# Nexius Academy - Robots.txt',
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
};

const write404 = () => {
  const html = `<!DOCTYPE html>
<html lang="en-SG">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,follow" />
    <title>Page Not Found | Nexius Academy</title>
    <meta name="description" content="The requested Nexius Academy page could not be found." />
    <link rel="canonical" href="${SITE_URL}/404/" />
  </head>
  <body>
    <main style="min-height:100vh;display:grid;place-items:center;font-family:Arial,sans-serif;color:#1D2A4D;padding:2rem;text-align:center">
      <div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p><a href="${SITE_URL}/">Return to Nexius Academy</a></p>
      </div>
    </main>
  </body>
</html>
`;

  fs.writeFileSync(path.join(DIST_DIR, '404.html'), html);
};

const main = () => {
  ensureDistExists();
  const baseHtml = readHtml();

  for (const route of routes) {
    const routeHtml = applyHead(baseHtml, route);
    writeRoute(route, routeHtml);
  }

  writeSitemap();
  writeRobots();
  write404();
};

main();
