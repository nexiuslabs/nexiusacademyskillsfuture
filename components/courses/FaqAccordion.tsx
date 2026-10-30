import React from 'react';

export type FaqAccordionItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqAccordionItem[];
  open?: boolean;
  openFirst?: boolean;
};

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, open = false, openFirst = false }) => (
  <div className="divide-y divide-gray-200 border-y border-gray-200">
    {items.map((item, index) => (
      <details key={item.question} open={open || (openFirst && index === 0)} className="group py-1">
        <summary className="cursor-pointer py-4 pr-3 font-semibold leading-relaxed text-primary">{item.question}</summary>
        <div className="pb-5 pr-4 leading-relaxed text-gray-600">{item.answer}</div>
      </details>
    ))}
  </div>
);

export default FaqAccordion;
