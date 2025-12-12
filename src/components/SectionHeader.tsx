import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { LinkRegular } from '@fluentui/react-icons';

export interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function SectionHeader({ icon, title, className }: SectionHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionId = generateId(title);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setIsActive(true);
          } else {
            setIsActive(false);
          }
        });
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '-100px 0px -50% 0px',
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={headerRef}
      id={sectionId}
      className={className || ''}
      style={{
        marginTop: '64px',
        paddingTop: '8px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-baseline gap-2 mb-4">
        <span className="inline-flex h-5 w-5 items-center justify-center shrink-0" style={{ color: 'var(--text-muted)' }}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as any, { 
                className: "h-4 w-4",
                style: {
                  ...(icon as React.ReactElement).props?.style,
                  color: 'var(--text-muted)',
                  strokeWidth: 1.5,
                  opacity: 0.75,
                  display: 'block',
                },
              })
            : icon}
        </span>
        <h2 
          className="text-[22px] leading-[28px] font-semibold tracking-[-0.015em]" 
          style={{ 
            color: 'var(--text-primary)',
          }}
        >
          {title}
          <a
            href={`#${sectionId}`}
            className="docs-link-anchor inline-flex items-center"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(sectionId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', `#${sectionId}`);
              }
            }}
          >
            <LinkRegular className="w-4 h-4 ml-1" />
          </a>
        </h2>
      </div>
      <div 
        style={{ 
          height: '1px', 
          backgroundColor: 'var(--border)', 
          opacity: 1,
          marginTop: '16px', 
          marginBottom: '24px',
          maxWidth: '680px',
          width: '100%',
        }}
      />
    </div>
  );
}

