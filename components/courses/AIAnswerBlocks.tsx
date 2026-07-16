import React from 'react';
import { ExternalLink } from 'lucide-react';

type CitationLink = {
  label: string;
  href: string;
};

type AnswerBlock = {
  question: string;
  answer: string;
};

type AIAnswerBlocksProps = {
  kicker?: string;
  title: string;
  summary: string;
  blocks: AnswerBlock[];
  citations?: CitationLink[];
  citationsPlacement?: 'left' | 'right';
  className?: string;
};

const CitationCard: React.FC<{ citations: CitationLink[] }> = ({ citations }) => (
  <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
    <h3 className="mb-4 text-base font-bold text-primary">Official references</h3>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      {citations.map((citation) => (
        <a
          key={citation.href}
          href={citation.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-start gap-2 rounded-xl border border-gray-100 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
        >
          <ExternalLink size={16} className="mt-0.5 shrink-0" />
          <span>{citation.label}</span>
        </a>
      ))}
    </div>
  </div>
);

const AIAnswerBlocks: React.FC<AIAnswerBlocksProps> = ({
  kicker = 'Course at a glance',
  title,
  summary,
  blocks,
  citations = [],
  citationsPlacement = 'right',
  className = 'py-16 bg-white',
}) => {
  const shouldShowCitations = citations.length > 0;

  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr,1.15fr] lg:items-start">
          <div className="space-y-8">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-accent">{kicker}</div>
              <h2 className="text-2xl font-heading font-bold text-primary lg:text-3xl">{title}</h2>
              <p className="mt-5 text-base leading-relaxed text-gray-600">{summary}</p>
            </div>

            {shouldShowCitations && citationsPlacement === 'left' && <CitationCard citations={citations} />}
          </div>

          <div className="grid gap-4">
            {blocks.map((block) => (
              <article key={block.question} className="rounded-2xl border border-gray-100 bg-neutral p-6">
                <h3 className="mb-3 text-lg font-bold text-primary">{block.question}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{block.answer}</p>
              </article>
            ))}

            {shouldShowCitations && citationsPlacement === 'right' && <CitationCard citations={citations} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAnswerBlocks;
