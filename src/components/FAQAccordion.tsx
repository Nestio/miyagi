import React, { useState } from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';
import clsx from 'clsx';

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
    <div className={clsx('max-w-[680px]', className)}>
      <div style={{ display: 'grid', gap: '12px' }}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="faq-accordion-item"
              style={{
                backgroundColor: isOpen ? '#F9FAFB' : '#FFFFFF',
                border: `1px solid ${isOpen ? '#C7D2FE' : '#E5E7EB'}`,
                borderRadius: '12px',
                padding: '16px 18px',
                minHeight: '44px',
                transition: 'all 150ms ease-out',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                  e.currentTarget.style.borderColor = '#D1D5DB';
                }
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  cursor: 'pointer',
                  minHeight: '44px',
                }}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onMouseEnter={(e) => {
                  const chevron = e.currentTarget.querySelector('svg');
                  if (chevron && !isOpen) {
                    chevron.style.color = '#6B7280';
                  }
                }}
                onMouseLeave={(e) => {
                  const chevron = e.currentTarget.querySelector('svg');
                  if (chevron && !isOpen) {
                    chevron.style.color = '#9CA3AF';
                  }
                }}
              >
                <h3
                  style={{
                    flex: 1,
                    fontSize: '15px',
                    lineHeight: '24px',
                    fontWeight: 500,
                    color: '#111827',
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {item.question}
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ChevronDownRegular
                    style={{
                      width: '16px',
                      height: '16px',
                      color: isOpen ? '#6B7280' : '#9CA3AF',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease-out, color 200ms ease-out',
                    }}
                    aria-hidden="true"
                  />
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '2000px' : '0',
                  transition: 'max-height 200ms ease-out',
                  marginTop: isOpen ? '12px' : '0',
                }}
              >
                <div
                  style={{
                    paddingTop: '12px',
                    paddingBottom: '4px',
                    paddingRight: '32px',
                  }}
                >
                  <div
                    className="faq-answer-content"
                    style={{
                      fontSize: '14px',
                      lineHeight: '24px',
                      color: '#374151',
                    }}
                  >
                    {typeof item.answer === 'string' ? (
                      <p style={{ margin: 0 }}>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
