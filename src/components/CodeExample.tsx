import React, { useState } from 'react';
import clsx from 'clsx';
import { Copy, CheckCircle } from 'react-feather';
import { Highlight } from 'prism-react-renderer';

export interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  statusCode?: number;
  statusCodes?: { code: number; response: string }[];
  contentType?: string;
  formatLabel?: string;
}

export default function CodeExample({
  code,
  language = 'json',
  title = 'Example response',
  className,
  statusCode = 200,
  statusCodes,
  contentType = 'application/json',
  formatLabel = 'JSON',
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);
  const [activeStatusCode, setActiveStatusCode] = useState(statusCode);

  // Get the current code based on active status code
  const getCurrentCode = () => {
    if (statusCodes && statusCodes.length > 0) {
      const status = statusCodes.find(s => s.code === activeStatusCode);
      return status?.response || code;
    }
    return code;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Default status codes if none provided
  const availableStatusCodes = statusCodes?.map(s => s.code) || [200];

  return (
    <div
      className={clsx(
        'overflow-hidden',
        className
      )}
      className="transition-all hover:shadow-xl"
      style={{
        borderRadius: '12px',
        border: '1px solid #2a1a2f',
        backgroundColor: '#1a0f1e',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08), 0 0 20px rgba(255, 47, 255, 0.10)',
        padding: 0,
      }}
    >
      {/* Gradient Header Strip */}
      <div
        style={{
          background: 'linear-gradient(to right, rgba(255,47,255,0.18), rgba(255,47,255,0.06))',
          height: '3px',
        }}
      />

      {/* Header: Example response · JSON · 200 · application/json [Copy] */}
      <div 
        className="flex items-center justify-between"
        style={{
          borderBottom: '1px solid var(--code-border)',
          backgroundColor: '#1f1423',
          padding: '14px 22px',
          gap: '12px',
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#ffffff',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </span>
          
          {/* Format Label Pill */}
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,47,255,0.12)',
              border: '1px solid rgba(255,47,255,0.3)',
              color: '#ff2fff',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              whiteSpace: 'nowrap',
            }}
          >
            {formatLabel}
          </span>

          {/* Status Code and Content Type */}
          <span
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            {activeStatusCode} · {contentType}
          </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-all flex-shrink-0"
          style={{
            color: '#d6bedb',
            backgroundColor: 'transparent',
            border: '1px solid rgba(214,190,219,0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ff2fff';
            e.currentTarget.style.borderColor = 'rgba(255,47,255,0.3)';
            e.currentTarget.style.backgroundColor = 'rgba(255,47,255,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#d6bedb';
            e.currentTarget.style.borderColor = 'rgba(214,190,219,0.2)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Copy code"
          title={copied ? 'Copied!' : 'Copy code'}
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

      {/* Status Code Tabs (if multiple status codes provided) */}
      {statusCodes && statusCodes.length > 1 && (
        <div 
          className="flex items-center gap-2"
          style={{
            borderBottom: '1px solid var(--code-border)',
            padding: '12px 22px',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        >
          {availableStatusCodes.map((code) => (
            <button
              key={code}
              onClick={() => setActiveStatusCode(code)}
              className="px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                borderRadius: '6px',
                backgroundColor: activeStatusCode === code
                  ? 'rgba(255,47,255,0.15)'
                  : 'transparent',
                border: activeStatusCode === code
                  ? '1px solid rgba(255,47,255,0.3)'
                  : '1px solid rgba(255,255,255,0.1)',
                color: activeStatusCode === code
                  ? '#ffffff'
                  : 'rgba(255,255,255,0.6)',
              }}
              onMouseEnter={(e) => {
                if (activeStatusCode !== code) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeStatusCode !== code) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }
              }}
            >
              {code}
            </button>
          ))}
        </div>
      )}

      {/* Code Body - Read-only JSON Viewer */}
      <div 
        className="overflow-x-auto code-viewer-container"
        style={{ 
          backgroundColor: '#140b17',
          borderRadius: '12px',
          padding: '12px 16px',
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '100% 22px',
        }}
      >
        <Highlight code={getCurrentCode().trim()} language={language} theme={undefined}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={clsx(
                className,
                'm-0'
              )}
              style={{
                ...style,
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
                fontSize: '13.5px',
                lineHeight: '1.5',
                letterSpacing: '-0.2px',
              }}
            >
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token });
                      // Apply custom code theme colors - check in order of specificity
                      let tokenColor = tokenProps.style?.color;
                      
                      // Comments (check first to avoid overriding)
                      if (token.types.includes('comment')) {
                        tokenColor = 'var(--code-comment)';
                      }
                      // Strings
                      else if (token.types.includes('string')) {
                        tokenColor = 'var(--code-string)';
                      }
                      // Numbers
                      else if (token.types.includes('number')) {
                        tokenColor = 'var(--code-number)';
                      }
                      // Booleans and null
                      else if (token.types.includes('boolean') || token.types.includes('constant') || token.content === 'null' || token.content === 'true' || token.content === 'false') {
                        tokenColor = 'var(--code-boolean)';
                      }
                      // Operators
                      else if (token.types.includes('operator')) {
                        tokenColor = 'var(--code-operator)';
                      }
                      // Punctuation, brackets, braces
                      else if (token.types.includes('punctuation') || token.types.includes('bracket') || token.types.includes('brace')) {
                        tokenColor = 'var(--code-punctuation)';
                      }
                      // Keywords, properties, functions (keys)
                      else if (token.types.includes('keyword') || token.types.includes('property') || token.types.includes('function')) {
                        tokenColor = 'var(--code-key)';
                      }
                      
                      return (
                        <span 
                          key={key} 
                          {...tokenProps}
                          style={{
                            ...tokenProps.style,
                            color: tokenColor || tokenProps.style?.color || '#ffffff',
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
