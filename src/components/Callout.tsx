import React from 'react';
import clsx from 'clsx';

export type CalloutType = 'info' | 'warning' | 'success' | 'error';

export interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Callout({ type, title, children, className }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-100',
      text: 'text-blue-800 dark:text-blue-200',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-600 dark:text-amber-400',
      title: 'text-amber-900 dark:text-amber-100',
      text: 'text-amber-800 dark:text-amber-200',
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: 'text-emerald-600 dark:text-emerald-400',
      title: 'text-emerald-900 dark:text-emerald-100',
      text: 'text-emerald-800 dark:text-emerald-200',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-900 dark:text-red-100',
      text: 'text-red-800 dark:text-red-200',
    },
  };

  const style = styles[type];
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✓',
    error: '✕',
  };

  return (
    <div
      className={clsx(
        'rounded-lg border-l-4 p-4 mb-6',
        style.bg,
        style.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className={clsx('text-xl flex-shrink-0 mt-0.5', style.icon)}>
          {icons[type]}
        </span>
        <div className="flex-1">
          {title && (
            <h4 className={clsx('font-semibold mb-2 text-sm', style.title)}>
              {title}
            </h4>
          )}
          <div className={clsx('text-sm leading-relaxed', style.text)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

