import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import ScrollToTop from '../components/ScrollToTop';
import { ArticleCTA, ArticleMeta, AuthorCredibilityBox, RelatedCourseModuleCard } from '../components/blog/ArticleConversionBlocks';

const ARTICLE_SLUG = 'problem-framing-ai-agents-business-professionals';

const ProblemFramingAIAgentsBusinessProfessionalsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Problem Framing for AI Agents: What Business Professionals Must Learn"
        description="Learn how to turn vague AI requests into testable workplace problems before building an agent: recurring pain, evidence, decisions, exceptions, outcomes, and stop rules."
        canonical={`/blog/${ARTICLE_SLUG}`}
        ogType="article"
        ogImage="https://academy.nexiuslabs.com/images/blog/problem-framing-ai-agents-business-professionals.png"
        ogImageAlt="Business professionals turning vague AI requests into clear workflow problem statements"
      />
      <ScrollToTop />
      <div className="min-h-screen bg-[#f4f7f9] py-10">
        <div className="max-w-[760px] mx-auto bg-white px-8 py-10 shadow-lg my-10 rounded-lg">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8 font-semibold">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight mb-5">
            Problem Framing for AI Agents: What Business Professionals Must Learn Before They Build
          </h1>

          <ArticleMeta articleSlug={ARTICLE_SLUG} readTime="9 min read" />

          <img
            src="/images/blog/problem-framing-ai-agents-business-professionals.png"
            alt="Business professionals turning vague AI requests into clear workflow problem statements"
            className="w-full rounded-xl shadow-md border border-gray-100 mb-8"
            loading="eager"
          />

          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            AI can now turn a rough instruction into a prototype, a workflow, or a working application in less time than most teams need to approve the project.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            That sounds like progress. It also creates a new failure mode: building the wrong thing faster.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            A current practitioner discussion about problem selection made the point clearly. Strong operators do not treat every request as a project. They collect repeated pain, separate the requested solution from the underlying job, look for the common shape, and stop ideas that do not survive pressure-testing. A separate engineering discussion reached the same conclusion from another direction: as implementation gets cheaper, maintainability, interfaces, trade-offs, and long-term fit become more valuable.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            This is why problem framing belongs inside any serious AI agent course in Singapore. Prompting helps you communicate with a model. Problem framing helps you decide whether an agent should exist, what job it should perform, and how you will know the work improved.
          </p>

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-10 mb-5 border-l-4 border-[#007bff] pl-4">
            The Skill Gap Has Moved Upstream
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            When execution was expensive, weak ideas often died because nobody had time or budget to build them. AI removes part of that friction. Teams can now produce demos for requests that were never examined properly.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            The scarce skill is judgment before execution. Domain experts need to recognise recurring pain, define the decision that is actually slow or inconsistent, identify the evidence people use, and name the exceptions that make the work difficult.
          </p>

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-12 mb-6 leading-snug">
            <span className="text-[#007bff] font-extrabold mr-3">1.</span>
            Separate the Request from the Problem
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            A request usually arrives with a preferred solution: “Build a chatbot,” “Create an agent,” or “Automate this report.” That is not yet a useful problem statement.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">Start with five questions:</p>
          <ul className="list-disc ml-5 mb-8 text-lg leading-relaxed text-[#333] space-y-4">
            <li>Which recurring decision or task is slow, inconsistent, or expensive?</li>
            <li>Who experiences the problem, and how often?</li>
            <li>What evidence does the person use today?</li>
            <li>Which exceptions require judgment?</li>
            <li>What measurable outcome should improve?</li>
          </ul>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            “We need a sales chatbot” may become “Account managers spend 45 minutes assembling renewal briefs because contract terms, support history, and usage notes sit in three systems.” The second statement gives you a real job to examine.
          </p>

          <ArticleCTA articleSlug={ARTICLE_SLUG} ctaType="workflow_checklist" position="30_percent" />

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-12 mb-6 leading-snug">
            <span className="text-[#007bff] font-extrabold mr-3">2.</span>
            Wait for Repeated Evidence
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            Cheap prototypes can make impatience look like innovation. One loud request does not prove that a workflow deserves automation.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            Keep a problem queue. Collect examples from different people, teams, or weeks. Three similar exceptions often teach you more than one polished solution proposal. Repeated evidence shows whether the pain is structural, whether the same data is missing each time, and whether one work package can solve several requests.
          </p>

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-12 mb-6 leading-snug">
            <span className="text-[#007bff] font-extrabold mr-3">3.</span>
            Define the Work Package
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            A good AI work package is smaller than a transformation programme and clearer than a prompt. It should name:
          </p>
          <ul className="list-disc ml-5 mb-8 text-lg leading-relaxed text-[#333] space-y-4">
            <li><strong>Trigger:</strong> what starts the work?</li>
            <li><strong>Inputs:</strong> which records, documents, and rules are trusted?</li>
            <li><strong>Decision:</strong> what judgment or classification is being prepared?</li>
            <li><strong>Output:</strong> what must the agent produce, and in what format?</li>
            <li><strong>Exception:</strong> when should it stop and ask a person?</li>
            <li><strong>Evidence:</strong> what must be logged so another person can check the result?</li>
          </ul>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            This is where non-technical domain experts become AI architects. They know which fields matter, which policy has changed, which customer situation is unusual, and which shortcut would produce a confident but wrong result.
          </p>

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-12 mb-6 leading-snug">
            <span className="text-[#007bff] font-extrabold mr-3">4.</span>
            Pressure-Test Before You Build
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            Walk the proposed workflow using real examples. Include missing data, conflicting policies, unusual customers, delayed approvals, and one case where the correct answer is to stop.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            Ask whether the same result could come from a checklist, form redesign, report filter, or simpler automation. An agent is useful when the work genuinely needs context, tool use, variation, and bounded judgment. It is not a badge of maturity.
          </p>

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-12 mb-6 leading-snug">
            <span className="text-[#007bff] font-extrabold mr-3">5.</span>
            Train the Stop Decision
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            The most valuable Agent Boss may be the person who prevents weak work from entering the build queue. Teams should review proposed agent work with three outcomes: proceed, merge, or stop.
          </p>
          <ul className="list-disc ml-5 mb-8 text-lg leading-relaxed text-[#333] space-y-4">
            <li><strong>Proceed</strong> when the pain repeats, the work package is clear, and the outcome can be tested.</li>
            <li><strong>Merge</strong> when several requests share the same underlying problem.</li>
            <li><strong>Stop</strong> when the evidence is weak, the process itself is broken, or a simpler fix is better.</li>
          </ul>

          <ArticleCTA articleSlug={ARTICLE_SLUG} ctaType="subsidy_check" position="70_percent" />
          <RelatedCourseModuleCard articleSlug={ARTICLE_SLUG} />

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-12 mb-6 leading-snug">
            A 20-Minute Practice Exercise
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#333]">
            Take one AI idea from your team and rewrite it using this template:
          </p>
          <div className="bg-[#eef6ff] border border-[#cfe5ff] rounded-xl p-6 mb-8 text-lg leading-relaxed text-[#333]">
            <p className="mb-3"><strong>Repeated problem:</strong> [what keeps happening]</p>
            <p className="mb-3"><strong>People affected:</strong> [roles and frequency]</p>
            <p className="mb-3"><strong>Current evidence:</strong> [records and rules]</p>
            <p className="mb-3"><strong>Desired decision or output:</strong> [specific result]</p>
            <p className="mb-3"><strong>Exceptions:</strong> [cases that need human judgment]</p>
            <p className="mb-3"><strong>Success measure:</strong> [cycle time, correction rate, reopen rate, or error reduction]</p>
            <p><strong>Decision:</strong> proceed / merge / stop</p>
          </div>
          <p className="mb-8 text-lg leading-relaxed text-[#333] font-semibold">
            AI can accelerate execution. Professionals still need to decide which problem deserves that speed.
          </p>

          <h2 className="text-3xl font-bold text-[#1a1a1a] mt-12 mb-6 leading-snug">Sources</h2>
          <ul className="list-disc ml-5 mb-8 text-lg leading-relaxed text-[#333] space-y-4">
            <li><a className="text-accent font-semibold underline" href="https://lalitm.com/post/find-problems-staff-engineer/" target="_blank" rel="noopener noreferrer">How I Find Problems to Solve as a Staff Engineer</a></li>
            <li><a className="text-accent font-semibold underline" href="https://news.ycombinator.com/item?id=49411643" target="_blank" rel="noopener noreferrer">Current Hacker News discussion on problem selection</a></li>
            <li><a className="text-accent font-semibold underline" href="https://rhonabwy.com/2026/08/15/software-engineering-fundamentals-matter-more-than-ever/" target="_blank" rel="noopener noreferrer">Software Engineering Fundamentals Matter More Than Ever</a></li>
            <li><a className="text-accent font-semibold underline" href="https://insufferable.dev/posts/vibe-tax/" target="_blank" rel="noopener noreferrer">The Vibe Tax: practitioner discussion of autonomy and expert steering</a></li>
          </ul>

          <AuthorCredibilityBox articleSlug={ARTICLE_SLUG} />
        </div>
      </div>
    </>
  );
};

export default ProblemFramingAIAgentsBusinessProfessionalsPage;
