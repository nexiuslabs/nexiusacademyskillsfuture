import React from 'react';
import { Link } from 'react-router-dom';
import { trackBlogToCourseClick, trackOutboundClick } from '../../services/analytics';
import { openLeadModal } from '../../services/leadModal';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type CtaType = 'workflow_checklist' | 'subsidy_check' | 'join_next_cohort';

const CTA_CONTENT: Record<CtaType, { title: string; description: string; cta: string; href: string }> = {
  workflow_checklist: {
    title: 'Download the SME Workflow Checklist',
    description: 'Get the exact checklist we use to spot high-ROI automation opportunities in under 15 minutes.',
    cta: 'Get the Checklist',
    href: '/courses/agentic-ai?lead=workflow-checklist&lead_source=blog_inline',
  },
  subsidy_check: {
    title: 'Check Your SkillsFuture Subsidy',
    description: 'See your estimated net payable fee and eligibility path in under 60 seconds.',
    cta: 'Check My Subsidy',
    href: '/courses/agentic-ai?lead=subsidy-check&lead_source=blog_inline',
  },
  join_next_cohort: {
    title: 'Join the Next Cohort',
    description: 'Get hands-on guidance and leave class with a deployable AI workflow for your business.',
    cta: 'Reserve My Seat',
    href: '/courses/agentic-ai?lead=join-next-cohort&lead_source=blog_inline',
  },
};

const trackArticleEvent = (articleSlug: string, ctaType: CtaType, position: string) => {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'blog_article_cta_click', {
    article_slug: articleSlug,
    cta_type: ctaType,
    cta_position: position,
    page_path: window.location.pathname,
  });
};

interface ArticleCTAProps {
  articleSlug: string;
  ctaType: CtaType;
  position: '30_percent' | '70_percent' | 'article_end';
}

export const ArticleCTA: React.FC<ArticleCTAProps> = ({ articleSlug, ctaType, position }) => {
  const content = CTA_CONTENT[ctaType];
  const isChecklist = ctaType === 'workflow_checklist';

  return (
    <div className="rounded-xl border border-[#d8e8ff] bg-[#f6faff] p-6 my-8 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.12em] text-[#007bff] uppercase mb-2">Next Step</p>
      <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{content.title}</h3>
      <p className="text-[#3a4a5e] mb-4 leading-relaxed">{content.description}</p>
      {isChecklist ? (
        <button
          type="button"
          onClick={() => {
            trackArticleEvent(articleSlug, ctaType, position);
            openLeadModal('blog_inline', 'download_checklist', {
              page: `/blog/${articleSlug}`,
              position: `article_${position}_${ctaType}`,
              ctaLabel: content.cta,
              redirectUrl: '/downloads/sme-ai-workflow-checklist.pdf',
            });
          }}
          className="inline-flex items-center justify-center rounded-md bg-[#007bff] px-5 py-3 font-semibold text-white hover:bg-[#0062cc] transition-colors"
        >
          {content.cta}
        </button>
      ) : (
        <Link
          to={content.href}
          onClick={() => {
            trackArticleEvent(articleSlug, ctaType, position);
            trackBlogToCourseClick({
              sourceArea: `article_${position}_${ctaType}`,
              pagePath: `/blog/${articleSlug}`,
              targetPath: '/courses/agentic-ai',
            });
          }}
          className="inline-flex items-center justify-center rounded-md bg-[#007bff] px-5 py-3 font-semibold text-white hover:bg-[#0062cc] transition-colors"
        >
          {content.cta}
        </Link>
      )}
    </div>
  );
};

interface RelatedCourseModuleCardProps {
  articleSlug: string;
}

export const RelatedCourseModuleCard: React.FC<RelatedCourseModuleCardProps> = ({ articleSlug }) => (
  <div className="rounded-xl border border-[#ffe2a8] bg-[#fff8eb] p-6 my-8">
    <p className="text-xs font-semibold tracking-[0.12em] text-[#cc7a00] uppercase mb-2">Related Course Module</p>
    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Module: Build Your First Agentic Workflow Blueprint</h3>
    <p className="text-[#4a4a4a] mb-4 leading-relaxed">
      Learn how to map, automate, and test one real workflow from your own business during class.
    </p>
    <Link
      to="/courses/agentic-ai?module=workflow-blueprint"
      onClick={() => {
        trackArticleEvent(articleSlug, 'join_next_cohort', '70_percent');
        trackBlogToCourseClick({
          sourceArea: 'article_related_module',
          pagePath: `/blog/${articleSlug}`,
          targetPath: '/courses/agentic-ai',
        });
      }}
      className="font-semibold text-[#007bff] hover:underline"
    >
      See module details →
    </Link>
  </div>
);

interface AuthorCredibilityBoxProps {
  articleSlug: string;
}

export const AuthorCredibilityBox: React.FC<AuthorCredibilityBoxProps> = ({ articleSlug }) => (
  <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6 mt-10">
    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">About the Trainer</h3>
    <p className="text-[#374151] leading-relaxed mb-4">
      <strong>Melverick Ng</strong> is Founder of Nexius Labs and Master Trainer at Nexius Academy. He has trained business teams
      and non-technical professionals to design practical AI workflows for sales, operations, and customer support.
    </p>
    <a
      href="https://wa.me/6589002130?text=Hi%20Melverick%2C%20I%20read%20the%20article%20and%20want%20to%20speak%20to%20a%20course%20advisor."
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackArticleEvent(articleSlug, 'join_next_cohort', 'article_end');
        trackOutboundClick({
          channel: 'whatsapp',
          pagePath: `/blog/${articleSlug}`,
          position: 'article_author_box',
        });
      }}
      className="inline-flex items-center justify-center rounded-md bg-[#111827] px-5 py-3 font-semibold text-white hover:bg-[#1f2937] transition-colors"
    >
      Talk to a Course Advisor
    </a>
  </div>
);
