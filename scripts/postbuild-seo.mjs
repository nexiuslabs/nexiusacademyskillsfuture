import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://academy.nexiuslabs.com';
const DIST_DIR = path.resolve('dist');
const DEFAULT_IMAGE = 'https://academy.nexiuslabs.com/images/social/agentic-ai-courses.jpg';
const HOME_IMAGE = `${SITE_URL}/images/homepage-hero.jpg`;
const COURSE_IMAGE = `${SITE_URL}/images/og/agentic-ai-course-og.jpg`;
const PRIVATE_CLASS_IMAGE = `${SITE_URL}/images/private-class/hall-room.jpg`;
const LASTMOD = '2026-04-18';

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
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nexius Academy',
  url: SITE_URL,
  inLanguage: 'en-SG',
};

const courseSchema = ({ name, description, url, image, audienceType }) => ({
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
    '@type': 'Person',
    name: 'Melverick Ng',
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

const pageSchema = ({ name, description, url, image }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
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
    question: 'Is this course already open for registration?',
    answer:
      'Not yet. This page is currently set up as a waitlist page so interested leaders and business owners can register interest before launch.',
  },
  {
    question: 'Who is this programme designed for?',
    answer:
      'It is designed for business managers, organisational leaders, and business owners responsible for enterprise strategy, transformation, and operational performance.',
  },
];

const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Nexius Academy | AI Training and Workshops Singapore for Business Professionals',
    description:
      'Nexius Academy offers hands-on AI training in Singapore for business professionals. Master agentic AI, no-code automation, and generative AI through expert-led workshops and certification courses.',
    ogType: 'website',
    ogImage: HOME_IMAGE,
    schemas: [organizationSchema, websiteSchema],
  },
  {
    path: '/about',
    priority: '0.7',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'About Nexius Academy | AI Training Experts in Singapore',
    description:
      'Nexius Academy empowers business professionals with hands-on agentic AI skills. Founded by builders of agentic ERP systems, we bridge the gap between AI technology and practical business application.',
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
      'A practical SkillsFuture employer funding guide for Nexius Academy visitors, with key considerations for course fee support, employer-sponsored training, and official verification steps.',
    ogType: 'article',
    ogImage: COURSE_IMAGE,
    schemas: [],
  },
  {
    path: '/courses/agentic-ai',
    priority: '0.9',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Agentic AI Course Singapore | SkillsFuture Eligible | Nexius Academy',
    description:
      'Learn agentic AI hands-on in our 16-hour SkillsFuture-eligible course. No-code AI automation training designed for non-technical business professionals. Up to 90% subsidy.',
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
      }),
      faqSchema(mainCourseFaqs),
    ],
  },
  {
    path: '/courses/agentic-ai-accountants',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Agentic AI for Accountants & CSPs | Nexius Academy',
    description:
      'A practical, no-code course page for accountants, corporate service providers, and firm owners who want safer, more useful AI workflows for drafting, reporting, compliance, and client-service work.',
    ogType: 'course',
    ogImage: COURSE_IMAGE,
    schemas: [
      courseSchema({
        name: 'Agentic AI for Accountants and Corporate Service Providers',
        description:
          'A practical AI course for accountants and CSP teams focused on drafting, reporting, compliance, client-service workflows, and safer internal adoption.',
        url: `${SITE_URL}/courses/agentic-ai-accountants`,
        image: COURSE_IMAGE,
        audienceType: 'Accountants, corporate service providers, and firm owners',
      }),
      faqSchema(accountantsFaqs),
    ],
  },
  {
    path: '/private-class',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'Dedicated Company AI Class | Nexius Academy',
    description:
      'Private company-run agentic AI training for teams of 12 pax or more. Tailor the workshop to real workflows, train in a private setting, and align teams on practical AI adoption.',
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
      }),
      faqSchema(privateClassFaqs),
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
    path: '/courses/frontier-firm-agent-boss',
    priority: '0.7',
    changefreq: 'monthly',
    includeInSitemap: true,
    title: 'Frontier Firm & Agent Boss Programme | Waitlist | Nexius Academy',
    description:
      'Join the waitlist for our upcoming programme on Frontier Firm transformation, Agent Boss leadership, cross-functional agent orchestration, and enterprise governance for agentic AI.',
    ogType: 'website',
    ogImage: HOME_IMAGE,
    schemas: [
      courseSchema({
        name: 'Frontier Firm Transformation and Agent Boss Leadership',
        description:
          'An executive-level programme on agentic enterprise transformation, cross-functional agent orchestration, and leadership governance.',
        url: `${SITE_URL}/courses/frontier-firm-agent-boss`,
        image: HOME_IMAGE,
        audienceType: 'Business leaders, transformation sponsors, and firm owners',
      }),
      faqSchema(frontierFaqs),
    ],
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
    title: 'AI Training Blog | Agentic AI Insights & Guides | Nexius Academy',
    description:
      'Explore the latest insights on agentic AI, business automation, AI training Singapore trends, and practical guides for non-technical professionals looking to master AI skills.',
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
    title: 'Beyond ChatGPT: 4 Hard Truths About Building an AI-Powered Company | Nexius Academy',
    description:
      'Most companies hit an AI plateau after adopting ChatGPT. Discover the 4 fundamental shifts in leadership, structure, and strategy needed to build a true AI-powered company.',
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
    title: 'Enterprise AI Insights: How Businesses Are Scaling AI in 2026 | Nexius Academy',
    description:
      'Real-world insights on how enterprises are deploying AI at scale. Learn the strategies, frameworks, and lessons from companies successfully implementing agentic AI.',
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
    title: 'Anthropic AI Skills: Essential Capabilities for Business Professionals | Nexius Academy',
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
    title: 'What Is Agentic AI? A Complete Guide for Business Professionals | Nexius Academy',
    description:
      'What is agentic AI and how does it differ from generative AI? Learn how autonomous AI agents plan, decide, and act, and why every business professional in Singapore needs to understand this shift.',
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
    title: 'Best AI Courses Singapore 2026: How to Choose the Right Programme | Nexius Academy',
    description:
      'Comparing the best AI courses in Singapore for 2026. From SkillsFuture AI courses to agentic AI masterclasses, this is a practical guide to choosing the right AI training programme for business professionals.',
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
    title: 'How SMEs in Singapore Are Using No-Code AI Automation to Scale | Nexius Academy',
    description:
      'Real examples of how Singapore SMEs deploy no-code AI automation to cut costs, scale operations, and compete with larger firms. Practical AI skills training for SMEs that delivers immediate ROI.',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    schemas: [],
    articleDate: '2026-02-05',
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
  const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
  const pageUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
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
  output = upsertMeta(output, 'name="twitter:card"', '<meta name="twitter:card" content="summary_large_image" />');
  output = upsertMeta(output, 'name="twitter:title"', `<meta name="twitter:title" content="${twitterTitle}" />`);
  output = upsertMeta(output, 'name="twitter:description"', `<meta name="twitter:description" content="${twitterDescription}" />`);
  output = upsertMeta(output, 'name="twitter:image"', `<meta name="twitter:image" content="${route.ogImage}" />`);
  output = upsertLink(output, 'rel="canonical"', `<link rel="canonical" href="${canonicalUrl}" />`);
  output = stripJsonLd(output);

  const schemas = [...route.schemas];
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
  } else if (schemas.length === 0 && route.path !== '/admin') {
    schemas.push(
      pageSchema({
        name: route.title.replace(' | Nexius Academy', ''),
        description: route.description,
        url: pageUrl,
        image: route.ogImage,
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
      const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
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
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
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
};

main();
