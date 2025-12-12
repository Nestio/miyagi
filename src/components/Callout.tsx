import React from 'react';
import clsx from 'clsx';

export type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip' | 'note';

export interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Callout({ type, title, children, className }: CalloutProps) {
  const styles = {
    info: {
      bg: 'rgba(59, 130, 246, 0.03)',
      border: 'rgba(59, 130, 246, 0.3)',
      icon: '#3B82F6',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.04)',
      border: 'rgba(245, 158, 11, 0.5)',
      icon: '#F59E0B',
    },
    success: {
      bg: 'rgba(16, 185, 129, 0.04)',
      border: 'rgba(16, 185, 129, 0.5)',
      icon: '#10B981',
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.04)',
      border: 'rgba(239, 68, 68, 0.5)',
      icon: '#EF4444',
    },
    tip: {
      bg: 'rgba(16, 185, 129, 0.04)',
      border: 'rgba(16, 185, 129, 0.5)',
      icon: '#10B981',
    },
    note: {
      bg: 'rgba(59, 130, 246, 0.04)',
      border: 'rgba(59, 130, 246, 0.5)',
      icon: '#3B82F6',
    },
  };

  const style = styles[type] || styles.info;
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✓',
    error: '✕',
    tip: '💡',
    note: '📝',
  };

  return (
    <div
      className={clsx('max-w-[680px]', className)}
      style={{
        borderRadius: '12px',
        padding: '18px 20px',
        backgroundColor: style.bg,
        borderLeft: `3px solid ${style.border}`,
        marginTop: '32px',
        marginBottom: '32px',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            top: '2px',
          }}
        >
          <span 
            style={{ 
              color: style.icon,
              fontSize: '16px',
              lineHeight: '1',
            }}
          >
            {icons[type]}
          </span>
        </div>
        <div className="flex-1" style={{ textAlign: 'left' }}>
          {title && (
            <h4 
              className="font-semibold"
              style={{ 
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'none',
                marginBottom: '4px',
                color: 'var(--text-primary)',
              }}
            >
              {title}
            </h4>
          )}
          <div 
            style={{ 
              fontSize: '14px',
              lineHeight: '24px',
              color: 'var(--text-primary)',
              textAlign: 'left',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

