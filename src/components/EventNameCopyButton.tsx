import React, { useState } from 'react';
import { Copy, CheckCircle } from 'react-feather';

interface EventNameCopyButtonProps {
  eventName: string;
}

export default function EventNameCopyButton({ eventName }: EventNameCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="event-name-copy-button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '7px 12px',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.01em',
        color: copied ? '#ffffff' : '#64748b',
        backgroundColor: copied ? '#10b981' : '#ffffff',
        border: copied ? 'none' : '1px solid #e2e8f0',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'inherit',
        boxShadow: copied 
          ? '0 1px 3px rgba(16, 185, 129, 0.3), 0 1px 2px rgba(16, 185, 129, 0.2)' 
          : '0 1px 2px rgba(0, 0, 0, 0.05)',
        transform: copied ? 'translateY(-1px)' : 'translateY(0)',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = '#f8fafc';
          e.currentTarget.style.borderColor = '#cbd5e1';
          e.currentTarget.style.color = '#475569';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.color = '#64748b';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = '2px solid #3b82f6';
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
      aria-label="Copy event name"
      title={copied ? 'Copied!' : 'Copy event name'}
    >
      {copied ? (
        <>
          <CheckCircle size={14} style={{ color: '#ffffff', strokeWidth: 2.5 }} />
          <span style={{ fontWeight: 500 }}>Copied</span>
        </>
      ) : (
        <>
          <Copy size={14} style={{ color: 'inherit', strokeWidth: 2 }} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

