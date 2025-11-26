import React from 'react';
import type { ReactNode } from 'react';

export interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

export default function SectionHeader({ icon, title, className }: SectionHeaderProps) {
  return (
    <div className={`flex items-start gap-2.5 mb-6 ${className || ''}`}>
      <div className="flex-shrink-0 mt-1.5">
        {icon}
      </div>
      <h2 className="text-3xl font-bold tracking-tight leading-tight" style={{ color: 'var(--docs-color-text)' }}>
        {title}
      </h2>
    </div>
  );
}

