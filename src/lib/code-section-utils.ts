import type { CodeTab } from '../components/CodeSection';

/**
 * Maps language identifiers to Prism language IDs
 */
export function mapLanguageId(lang: string): string {
  const langMap: Record<string, string> = {
    curl: 'bash',
    node: 'javascript',
    dotnet: 'csharp',
    '.net': 'csharp',
    cli: 'bash',
    typescript: 'typescript',
    ts: 'typescript',
    js: 'javascript',
  };

  return langMap[lang.toLowerCase()] || lang.toLowerCase();
}

/**
 * Determines the active title for a code tab
 */
export function titleForTab(
  tab: CodeTab,
  variant: 'terminal' | 'file',
  fallback?: string
): string {
  if (tab.title) return tab.title;
  if (fallback) return fallback;

  if (variant === 'terminal') return 'Command Line';

  if (tab.filename) return tab.filename;

  // Title Case language
  return tab.language.replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Splits text into lines, normalizing line endings
 */
export function splitLines(raw: string): string[] {
  return raw.replace(/\r\n?/g, '\n').split('\n');
}

/**
 * Strips existing terminal prefixes from a line
 */
export function stripTerminalPrefix(line: string): string {
  return line.replace(/^([>$]\s*)/, '');
}

/**
 * Determines if a line is a continuation (ends with \ or starts with >)
 */
export function isContinuationLine(line: string, previousLine?: string): boolean {
  if (previousLine && previousLine.trim().endsWith('\\')) return true;
  if (/^\s*>/.test(line)) return true;
  return false;
}

