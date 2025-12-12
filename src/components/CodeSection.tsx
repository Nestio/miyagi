import React, { useState, useRef, useEffect } from 'react';
import { Highlight } from 'prism-react-renderer';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { Check, ChevronDown, Copy, CheckCircle } from 'react-feather';
import { titleForTab, splitLines, stripTerminalPrefix, isContinuationLine, mapLanguageId } from '../lib/code-section-utils';
import './prism-theme-stripeish.css';

// Helper to escape HTML
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Helper to escape regex
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export type LinePrefixMode =
  | { kind: 'none' }
  | { kind: 'terminal'; prompt?: string; continuation?: string }
  | { kind: 'gutterNumbers'; start?: number };

export type CodeTab = {
  /** Visible in the dropdown */
  label: string;
  /** Used for syntax highlighting; must map to Prism/Shiki language id */
  language:
    | 'bash'
    | 'curl'
    | 'python'
    | 'ruby'
    | 'php'
    | 'java'
    | 'javascript'
    | 'node'
    | 'go'
    | 'dotnet'
    | 'cli'
    | string;
  /** Raw source text */
  code: string;
  /** Optional header title that replaces the global title when active */
  title?: string;
  /** Optional filename badge (file variant only) */
  filename?: string;
  /** Controls the left gutter/prefix behavior for this tab */
  prefixMode?: LinePrefixMode;
  /** Override theme for this tab (Shiki theme id) */
  theme?: string;
};

export type TokenMark = {
  /** literal substring to highlight; first match by default */
  text: string;
  /** optional regex if you prefer */
  pattern?: RegExp;
  /** aria-label for accessibility, e.g., 'Secret key' */
  label?: string;
  /** if true, highlight all occurrences */
  all?: boolean;
};

export type CodeSectionProps = {
  variant: 'terminal' | 'file';
  tabs: CodeTab[];
  initialTab?: number;
  /** Inline token highlights */
  marks?: TokenMark[];
  /** Optional header title (deprecated - use tab.title instead) */
  title?: string;
  /** Optional className for outer container */
  className?: string;
  /** Optional copy button label override */
  copyLabel?: string;
  /** Optional aria description */
  ariaDescription?: string;
  /** Enable soft wrapping for terminal snippets */
  softWrap?: boolean;
};

export default function CodeSection({
  variant,
  tabs,
  initialTab = 0,
  marks = [],
  title: fallbackTitle,
  className,
  copyLabel = 'Copy',
  ariaDescription,
  softWrap = false,
}: CodeSectionProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTab);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const activeTab = tabs[activeTabIndex];
  const codeId = `code-section-${activeTabIndex}`;

  // Determine active title
  const activeTitle = activeTab ? titleForTab(activeTab, variant, fallbackTitle) : '';

  // Get Prism language
  const prismLang = activeTab ? mapLanguageId(activeTab.language) : 'text';

  // Handle copy to clipboard - always use raw code
  const handleCopy = async () => {
    if (!activeTab) return;

    try {
      await navigator.clipboard.writeText(activeTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close any open dropdowns (handled by Radix)
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Render prefix cell for a line
  const renderPrefixCell = (line: string, lineIndex: number, previousLine?: string): React.ReactNode => {
    const prefixMode = activeTab?.prefixMode;

    if (!prefixMode || prefixMode.kind === 'none') {
      return <span className="opacity-0 select-none">&nbsp;</span>;
    }

    if (prefixMode.kind === 'gutterNumbers') {
      const lineNumber = (prefixMode.start ?? 1) + lineIndex;
      return (
        <span className="code-section-line-number tabular-nums select-none" style={{ 
          color: 'rgba(253, 253, 254, 0.5)',
          fontSize: '0.75rem',
          display: 'inline-block',
          minWidth: '2.5rem',
          textAlign: 'right'
        }}>
          {lineNumber}
        </span>
      );
    }

    // terminal mode
    const prompt = prefixMode.prompt ?? '$';
    const continuation = prefixMode.continuation ?? '>';
    const isCont = isContinuationLine(line, previousLine);
    const glyph = lineIndex === 0 ? prompt : isCont ? continuation : continuation;

    return (
      <span 
        className="code-section-prompt select-none" 
        aria-hidden="true"
        style={{
          opacity: 0.8,
          display: 'inline-block',
          minWidth: '2.5rem',
          textAlign: 'right',
          color: 'rgba(253, 253, 254, 0.8)'
        }}
      >
        {glyph}
      </span>
    );
  };

  // Get lines from raw code (for prefix rendering)
  const codeLines = activeTab ? splitLines(activeTab.code) : [];

  const headerAriaLabel = activeTitle
    ? `Code example: ${activeTitle} - ${activeTab?.label || ''}`
    : `Code example: ${activeTab?.label || ''}`;

  return (
    <div
      className={clsx(
        'code-section-container rounded-xl shadow-md ring-1',
        'bg-[#232C5F] text-[#FDFDFE]',
        'ring-[#333B6A]/30',
        className
      )}
      role="region"
      aria-label={headerAriaLabel}
      aria-describedby={ariaDescription ? `${codeId}-description` : undefined}
    >
      {ariaDescription && (
        <div id={`${codeId}-description`} className="sr-only">
          {ariaDescription}
        </div>
      )}

      {/* Header */}
      <div className="code-section-header bg-[#1B254D] flex items-baseline justify-between rounded-t-xl" style={{ padding: '18px 20px' }}>
        <div className="flex items-baseline gap-3">
          {variant === 'file' && activeTab?.filename && (
            <span className="code-section-filename text-sm font-medium px-2 py-0.5 rounded bg-[#232C5F] text-[#FDFDFE]">
              {activeTab.filename}
            </span>
          )}
          {activeTitle && (
            <span className="text-sm font-medium text-[#FDFDFE] leading-none" id={`${codeId}-title`}>
              {activeTitle}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          {/* Language Switcher */}
          {tabs.length > 1 && (
            <Select.Root
              value={activeTabIndex.toString()}
              onValueChange={(value) => setActiveTabIndex(parseInt(value, 10))}
            >
              <Select.Trigger
                className="code-section-language-trigger inline-flex items-baseline gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-[#232C5F] text-[#FDFDFE] hover:bg-[#2A3568] focus:outline-none focus:ring-2 focus:ring-[#81B5C9] focus:ring-offset-2 focus:ring-offset-[#1B254D] transition-colors"
                aria-label="Select code language"
              >
                <Select.Value>{activeTab?.label || 'Select'}</Select.Value>
                <Select.Icon>
                  <ChevronDown className="w-3 h-3" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Content
                position="popper"
                className="code-section-language-content z-50 min-w-[120px] rounded-md bg-[#1B254D] border border-[#333B6A] shadow-lg overflow-hidden"
                sideOffset={4}
              >
                <Select.Viewport>
                  <Select.Group>
                    {tabs.map((tab, index) => (
                      <Select.Item
                        key={index}
                        value={index.toString()}
                        className="code-section-language-item px-3 py-2 text-sm text-[#FDFDFE] hover:bg-[#232C5F] focus:bg-[#232C5F] focus:outline-none cursor-pointer flex items-center justify-between"
                      >
                        <Select.ItemText>{tab.label}</Select.ItemText>
                        <Select.ItemIndicator>
                          <Check className="w-4 h-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCopy();
              }
            }}
            className="code-section-copy-button relative inline-flex items-baseline justify-center w-8 h-8 rounded hover:bg-[#2A3568] focus:outline-none focus:ring-2 focus:ring-[#81B5C9] focus:ring-offset-2 focus:ring-offset-[#1B254D] transition-colors"
            aria-label={copyLabel}
            aria-pressed={copied}
            title={copied ? 'Copied!' : copyLabel}
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-[#90CB97]" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4" aria-hidden="true" />
            )}
            {/* Tooltip */}
            <span
              className={clsx(
                'code-section-tooltip absolute bottom-full mb-2 px-2 py-1 text-xs font-medium rounded bg-[#1B254D] text-[#FDFDFE] border border-[#333B6A] shadow-lg whitespace-nowrap pointer-events-none opacity-0 transition-opacity',
                copied && 'opacity-100'
              )}
              role="tooltip"
            >
              {copied ? 'Copied!' : copyLabel}
            </span>
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div
        className="code-section-body p-4 md:p-5 overflow-x-auto"
        role="code"
        aria-labelledby={`${codeId}-title`}
      >
        {activeTab ? (
          <Highlight code={activeTab.code} language={prismLang} theme={undefined}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
              return (
                <div className="code-section-grid-wrapper">
                  <table className="code-section-table" cellPadding="0" cellSpacing="0">
                    <tbody>
                      {tokens.map((line, lineIndex) => {
                        const lineProps = getLineProps({ line, key: lineIndex });
                        const rawLine = codeLines[lineIndex] || '';

                        // Build HTML for this line with token marks
                        const lineHtml = line
                          .map((token, tokenIndex) => {
                            const tokenProps = getTokenProps({ token, key: tokenIndex });
                            const content = String(token.content);
                            const className = tokenProps.className || '';
                            
                            // Check if this token matches any mark
                            let markedContent = content;
                            for (const mark of marks) {
                              const pattern = mark.pattern || new RegExp(escapeRegex(mark.text), mark.all !== false ? 'g' : '');
                              if (pattern.test(content)) {
                                const ariaLabel = mark.label ? ` aria-label="${escapeHtml(mark.label)}"` : '';
                                markedContent = content.replace(pattern, (match) => {
                                  return `<mark class="code-section-token-mark"${ariaLabel}>${escapeHtml(match)}</mark>`;
                                });
                                break; // Only apply first matching mark per token
                              }
                            }
                            
                            return `<span class="${escapeHtml(className)}">${markedContent}</span>`;
                          })
                          .join('');

                        return (
                          <tr key={lineIndex} className="code-section-table-row" style={{ border: 'none' }}>
                            <td className="code-section-gutter-cell" style={{ border: 'none' }}>
                              {renderPrefixCell(rawLine, lineIndex, codeLines[lineIndex - 1])}
                            </td>
                            <td className="code-section-code-cell" style={{ border: 'none' }}>
                              <span
                                className={clsx('code-section-code', `language-${activeTab.language}`)}
                                dangerouslySetInnerHTML={{ __html: lineHtml }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }}
          </Highlight>
        ) : (
          <pre className="code-section-pre m-0 font-mono text-sm">
            <code>No code available</code>
          </pre>
        )}
      </div>
    </div>
  );
}
