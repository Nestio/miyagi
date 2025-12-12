import { mapLanguageId } from './code-section-utils';
import type { TokenMark } from '../components/CodeSection';

/**
 * NOTE: This module uses Shiki for syntax highlighting with Prism as fallback.
 * To use Shiki (recommended), install it:
 *   npm install shiki
 * 
 * If Shiki is not available, the code will gracefully fall back to Prism.
 */

// Shiki highlighter cache
let shikiHighlighter: any = null;
let shikiLoadPromise: Promise<any> | null = null;
let loadedThemes: Set<string> = new Set();
let loadedLanguages: Set<string> = new Set();

// Common languages to preload
const COMMON_LANGUAGES = [
  'bash',
  'python',
  'ruby',
  'php',
  'java',
  'javascript',
  'typescript',
  'go',
  'csharp',
  'json',
  'yaml',
];

// Default theme
const DEFAULT_THEME = 'github-dark-dimmed';

/**
 * Ensures Shiki highlighter is loaded with the specified theme
 * Falls back gracefully if Shiki is not available or fails to load
 */
async function ensureHighlighter(theme: string = DEFAULT_THEME): Promise<any> {
  // If already loaded with this theme, return it
  if (shikiHighlighter && loadedThemes.has(theme)) {
    return shikiHighlighter;
  }

  // If a load is in progress, wait for it
  if (shikiLoadPromise) {
    try {
      await shikiLoadPromise;
      if (shikiHighlighter && loadedThemes.has(theme)) {
        return shikiHighlighter;
      }
    } catch (error) {
      // If load failed, we'll try again or fall back
    }
  }

  // Start loading Shiki
  shikiLoadPromise = (async () => {
    try {
      // Try to use Shiki - it may not be available in browser environments
      // Check if we're in a browser environment that supports WASM
      if (typeof window !== 'undefined' && !window.WebAssembly) {
        throw new Error('WebAssembly not supported');
      }

      const { getHighlighter } = await import('shiki');
      const languagesToLoad = [...new Set([...COMMON_LANGUAGES, ...loadedLanguages])];

      if (!shikiHighlighter) {
        shikiHighlighter = await getHighlighter({
          themes: [theme],
          langs: languagesToLoad,
        });
        loadedThemes.add(theme);
        languagesToLoad.forEach((lang) => loadedLanguages.add(lang));
      } else {
        // Add theme if not already loaded
        if (!loadedThemes.has(theme)) {
          await shikiHighlighter.loadTheme(theme);
          loadedThemes.add(theme);
        }
        // Add languages if not already loaded
        const missingLangs = languagesToLoad.filter((lang) => !loadedLanguages.has(lang));
        if (missingLangs.length > 0) {
          await shikiHighlighter.loadLanguage(...missingLangs);
          missingLangs.forEach((lang) => loadedLanguages.add(lang));
        }
      }

      return shikiHighlighter;
    } catch (error) {
      console.warn('Shiki not available or failed to load, will use Prism fallback', error);
      shikiHighlighter = null;
      throw error;
    }
  })();

  return shikiLoadPromise;
}

/**
 * Highlights code using Prism (primary) or Shiki (if available)
 * Returns HTML with line structure preserved
 */
export async function highlightCode(
  code: string,
  lang: string,
  theme?: string
): Promise<string> {
  // Try Shiki first if theme is explicitly provided (indicates user wants Shiki)
  // Otherwise, use Prism which is more reliable in browser environments
  const useShiki = theme && theme !== DEFAULT_THEME;
  
  if (useShiki) {
    try {
      const targetTheme = theme || DEFAULT_THEME;
      const shikiLang = mapLanguageId(lang);
      const highlighter = await ensureHighlighter(targetTheme);

      // Ensure language is loaded
      if (!loadedLanguages.has(shikiLang)) {
        try {
          await highlighter.loadLanguage(shikiLang);
          loadedLanguages.add(shikiLang);
        } catch (err) {
          console.warn(`Failed to load language ${shikiLang}, using Prism`, err);
          return highlightWithPrism(code, lang);
        }
      }

      // Use line-by-line structure for easier parsing
      let html: string;
      try {
        html = highlighter.codeToHtml(code, {
          lang: loadedLanguages.has(shikiLang) ? shikiLang : 'text',
          theme: targetTheme,
        });
      } catch (err) {
        console.warn('Shiki codeToHtml failed, using Prism', err);
        return highlightWithPrism(code, lang);
      }

      // Wrap each line in a div for easier parsing
      const lines = code.split(/\r?\n/);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Extract the code content (remove pre/code wrappers)
      const codeElement = tempDiv.querySelector('code') || tempDiv.querySelector('pre');
      if (codeElement) {
        const innerHtml = codeElement.innerHTML;
        // Split by line breaks in the HTML
        const lineParts = innerHtml.split(/(<br\s*\/?>)/);
        const wrappedLines: string[] = [];
        let currentLine = '';
        
        for (const part of lineParts) {
          if (part.match(/<br\s*\/?>/)) {
            if (currentLine) wrappedLines.push(currentLine);
            currentLine = '';
          } else {
            currentLine += part;
          }
        }
        if (currentLine) wrappedLines.push(currentLine);
        
        // Ensure we have the right number of lines
        while (wrappedLines.length < lines.length) {
          wrappedLines.push('');
        }
        
        return wrappedLines
          .slice(0, lines.length)
          .map((lineHtml) => `<div class="code-section-line-content">${lineHtml || '&nbsp;'}</div>`)
          .join('\n');
      }

      // Fallback: wrap the entire HTML
      return `<div class="code-section-line-content">${html}</div>`;
    } catch (error) {
      console.warn('Shiki highlighting failed, using Prism fallback', error);
      // Fall through to Prism
    }
  }

  // Use Prism (default, more reliable in browser)
  return highlightWithPrism(code, lang);
}

/**
 * Highlights code using Prism (primary method)
 * Returns line-wrapped HTML
 */
function highlightWithPrism(code: string, lang: string): string {
  try {
    // Use prism-react-renderer's Highlight component approach
    // For now, we'll use a simple token-based approach
    // In the component, we can use prism-react-renderer directly if needed
    
    // Simple approach: escape and wrap lines
    // The actual highlighting will be done via CSS classes in the component
    const lines = code.split(/\r?\n/);
    return lines.map((line) => {
      const escaped = escapeHtml(line);
      // Wrap in a span with language class for CSS-based highlighting
      return `<div class="code-section-line-content"><span class="language-${lang}">${escaped}</span></div>`;
    }).join('\n');
  } catch (error) {
    console.error('Prism highlighting failed', error);
    const lines = code.split(/\r?\n/);
    return lines.map((line) => 
      `<div class="code-section-line-content">${escapeHtml(line)}</div>`
    ).join('\n');
  }
}

/**
 * Escapes HTML special characters (SSR-safe)
 */
function escapeHtml(text: string): string {
  if (typeof document === 'undefined') {
    // SSR-safe escape
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Applies token marks to highlighted HTML
 * This wraps matched substrings with <mark> elements
 */
export function applyTokenMarks(highlightedHtml: string, marks: TokenMark[]): string {
  if (!marks || marks.length === 0) return highlightedHtml;

  let result = highlightedHtml;

  // Collect all matches from all marks
  type Match = { index: number; length: number; mark: TokenMark; text: string };
  const allMatches: Match[] = [];

  for (const mark of marks) {
    const pattern = mark.pattern || new RegExp(escapeRegex(mark.text), mark.all !== false ? 'g' : '');
    const matches = [...result.matchAll(pattern)];

    for (const match of matches) {
      if (match.index !== undefined) {
        // Don't match if already inside a mark tag
        const beforeMatch = result.substring(0, match.index);
        const openMarks = (beforeMatch.match(/<mark[^>]*>/g) || []).length;
        const closeMarks = (beforeMatch.match(/<\/mark>/g) || []).length;
        if (openMarks > closeMarks) continue; // Already inside a mark

        allMatches.push({
          index: match.index,
          length: match[0].length,
          mark,
          text: match[0],
        });
      }
    }
  }

  // Sort matches by index
  allMatches.sort((a, b) => a.index - b.index);

  // Remove overlapping matches (keep first)
  const nonOverlapping: Match[] = [];
  let lastEnd = 0;

  for (const match of allMatches) {
    if (match.index >= lastEnd) {
      nonOverlapping.push(match);
      lastEnd = match.index + match.length;
    }
  }

  // Build result by replacing matches
  let currentIndex = 0;
  let output = '';

  for (const match of nonOverlapping) {
    // Add text before match
    if (match.index > currentIndex) {
      output += result.substring(currentIndex, match.index);
    }
    // Add matched text with mark
    const ariaLabel = match.mark.label ? ` aria-label="${escapeHtml(match.mark.label)}"` : '';
    output += `<mark class="code-section-token-mark"${ariaLabel}>${match.text}</mark>`;
    currentIndex = match.index + match.length;
  }

  // Add remaining text
  if (currentIndex < result.length) {
    output += result.substring(currentIndex);
  }

  return output || result;
}

/**
 * Escapes special regex characters
 */
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
