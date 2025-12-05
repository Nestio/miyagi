import React from 'react';
import clsx from 'clsx';
import { Copy, CheckCircle } from 'react-feather';

export interface APIEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  path: string;
  className?: string;
  environment?: string;
  onEnvironmentChange?: (env: string) => void;
  environments?: string[];
}

// Accent bar colors (for left border)
const methodAccentColors = {
  GET: '#22c55e',      // green-500
  POST: '#3b82f6',     // blue-500
  PUT: '#f59e0b',      // amber-500
  PATCH: '#f59e0b',    // amber-500
  DELETE: '#ef4444',   // red-500
  HEAD: '#22c55e',     // green-500
  OPTIONS: '#7a7a85',  // gray-500
};

// Pill colors (for method badge)
const methodPillStyles = {
  GET: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)', // green-600/15
    color: '#15803d', // green-700
    borderColor: 'rgba(21, 128, 61, 0.3)', // green-700/30
  },
  POST: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)', // blue-600/15
    color: '#1e40af', // blue-700
    borderColor: 'rgba(30, 64, 175, 0.3)', // blue-700/30
  },
  PUT: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)', // amber-600/15
    color: '#b45309', // amber-700
    borderColor: 'rgba(180, 83, 9, 0.3)', // amber-700/30
  },
  PATCH: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)', // amber-600/15
    color: '#b45309', // amber-700
    borderColor: 'rgba(180, 83, 9, 0.3)', // amber-700/30
  },
  DELETE: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)', // red-600/15
    color: '#b91c1c', // red-700
    borderColor: 'rgba(185, 28, 28, 0.3)', // red-700/30
  },
  HEAD: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)', // green-600/15
    color: '#15803d', // green-700
    borderColor: 'rgba(21, 128, 61, 0.3)', // green-700/30
  },
  OPTIONS: {
    backgroundColor: 'rgba(122, 122, 133, 0.15)', // gray-600/15
    color: '#52525b', // gray-700
    borderColor: 'rgba(82, 82, 91, 0.3)', // gray-700/30
  },
};

export default function APIEndpoint({
  method,
  path,
  className,
  environment,
  onEnvironmentChange,
  environments = ['Production', 'Staging', 'Development'],
}: APIEndpointProps) {
  const [copied, setCopied] = React.useState(false);
  const fullEndpoint = `${method} ${path}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullEndpoint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={clsx('relative bg-white transition-all hover:shadow-xl', className)}
      style={{
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #ece6f2',
        padding: '20px 22px',
      }}
    >
      {/* Colored left accent bar for method */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          backgroundColor: methodAccentColors[method],
          borderRadius: '12px 0 0 12px',
        }}
      />

      <div className="flex items-center gap-3">
        {/* Method Pill - Matched to JSON pill style */}
        <span
          className="uppercase whitespace-nowrap border"
          style={{
            ...methodPillStyles[method],
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '6px',
            letterSpacing: '0.5px',
          }}
        >
          {method}
        </span>

        {/* URL Path and Copy Icon */}
        <div className="flex items-center justify-between flex-1 gap-3 min-w-0">
          <code
            className="font-mono flex-1 break-all"
            style={{
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
            }}
          >
            {path}
          </code>
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-all flex-shrink-0"
            style={{
              color: 'rgba(0,0,0,0.6)',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff2fff';
              e.currentTarget.style.borderColor = 'rgba(255,47,255,0.3)';
              e.currentTarget.style.backgroundColor = 'rgba(255,47,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(0,0,0,0.6)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Copy endpoint"
            title={copied ? 'Copied!' : 'Copy endpoint'}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Optional Environment Selector */}
      {environment !== undefined && onEnvironmentChange && (
        <div 
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <select
            value={environment}
            onChange={(e) => onEnvironmentChange(e.target.value)}
            className="font-sans text-sm"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary-border)';
              e.currentTarget.style.boxShadow = `0 0 0 2px var(--color-primary-soft)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseEnter={(e) => {
              if (document.activeElement !== e.currentTarget) {
                e.currentTarget.style.borderColor = 'var(--color-primary-border)';
              }
            }}
            onMouseLeave={(e) => {
              if (document.activeElement !== e.currentTarget) {
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }
            }}
          >
            {environments.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

