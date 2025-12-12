import React, { useState } from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}

export default function FAQAccordion({ items, defaultOpenIndex = null, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={className}>
      <div className="space-y-0">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b" style={{ borderColor: '#e5e7eb' }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-6 flex items-start justify-between gap-4 text-left hover:opacity-80 transition-opacity group"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold leading-snug flex-1" style={{ color: 'var(--docs-color-text)' }}>
                  {item.question}
                </h3>
                <span className="inline-flex h-10 w-10 items-center justify-center flex-shrink-0">
                  <ChevronDownRegular
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--docs-color-text)' }}
                    aria-hidden="true"
                  />
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-6">
                  {typeof item.answer === 'string' ? (
                    <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
                      {item.answer}
                    </p>
                  ) : (
                    item.answer
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

