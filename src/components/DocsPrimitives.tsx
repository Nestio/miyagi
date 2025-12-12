import React from 'react';
import type { ReactNode } from 'react';

// H1 - Page Title
export interface DocsH1Props {
  children: ReactNode;
  className?: string;
}

export function DocsH1({ children, className }: DocsH1Props) {
  return (
    <h1 
      className={`font-semibold tracking-[-0.02em] ${className || ''}`}
      style={{ 
        fontSize: '34px',
        lineHeight: '42px',
        fontWeight: 600,
        marginBottom: '16px',
        color: 'var(--text-primary)',
      }}
    >
      {children}
    </h1>
  );
}

// H2 - Section Header (uses SectionHeader component, but keeping for consistency)
// Note: SectionHeader already handles H2 styling

// H3 - Subheader
export interface DocsH3Props {
  children: ReactNode;
  className?: string;
}

export function DocsH3({ children, className }: DocsH3Props) {
  return (
    <h3 
      className={`docs-h3 ${className || ''}`}
    >
      {children}
    </h3>
  );
}

// Paragraph variants
export interface DocsPProps {
  children: ReactNode;
  variant?: 'body' | 'legal' | 'muted' | 'lead';
  className?: string;
}

export function DocsP({ children, variant = 'legal', className }: DocsPProps) {
  const classMap = {
    body: 'docs-p-body',
    legal: 'docs-p',
    muted: 'docs-p-muted',
    lead: 'docs-p-lead',
  };

  return (
    <p className={`${classMap[variant]} ${className || ''}`.trim()}>
      {children}
    </p>
  );
}

// Unordered List
export interface DocsUlProps {
  children: ReactNode;
  className?: string;
}

export function DocsUl({ children, className }: DocsUlProps) {
  return (
    <ul className={`docs-ul list-disc mb-4 ${className || ''}`}>
      {children}
    </ul>
  );
}

// Divider
export interface DocsDividerProps {
  className?: string;
}

export function DocsDivider({ className }: DocsDividerProps) {
  return (
    <div
      className={className || ''}
      style={{
        height: '1px',
        backgroundColor: 'var(--border)',
        opacity: 1,
        maxWidth: '680px',
        width: '100%',
      }}
    />
  );
}

// Section wrapper
export interface DocsSectionProps {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DocsSection({ children, spacing = 'lg', className }: DocsSectionProps) {
  const spacingMap = {
    sm: '24px',
    md: '32px',
    lg: '64px',
  };

  return (
    <section 
      className={className || ''}
      style={{ marginBottom: spacingMap[spacing] }}
    >
      {children}
    </section>
  );
}
