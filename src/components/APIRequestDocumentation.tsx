import React, { useState } from 'react';
import AttributeList from './AttributeList';
import { Col } from './Layout';
import { Copy, CheckCircle } from 'react-feather';
import clsx from 'clsx';

interface AttributeItem {
  name: string;
  type: string;
  description: string;
  children?: AttributeItem[];
  required?: boolean;
  nullable?: boolean;
  example?: string;
  format?: string;
  pattern?: string;
  constraints?: Record<string, any>;
}

interface APIRequestDocumentationProps {
  attributes: AttributeItem[];
  code: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  path?: string;
  title?: string;
  lang?: string;
  contentType?: string;
}

export default function APIRequestDocumentation({
  attributes,
  code,
  method = 'POST',
  path = '/api/v2/endpoint',
  title = 'Example request',
  lang = 'json',
  contentType = 'application/json',
}: APIRequestDocumentationProps) {
  const [copied, setCopied] = useState(false);

  // Replace path parameters with example values
  const getExamplePath = () => {
    let examplePath = path;
    if (path.includes(':id')) {
      examplePath = path.replace(':id', '564323');
    }
    return examplePath;
  };

  // Generate cURL command
  const generateCurl = () => {
    const methodUpper = method.toUpperCase();
    const baseUrl = 'https://api.funnelleasing.com';
    const examplePath = getExamplePath();
    const fullPath = examplePath.startsWith('http') ? examplePath : `${baseUrl}${examplePath}`;
    const headers = `-H "Authorization: Bearer YOUR_API_KEY"`;
    
    if (methodUpper === 'GET') {
      return `curl -X ${methodUpper} \\\n    ${headers} \\\n    "${fullPath}"`;
    } else {
      // Format JSON code for cURL (single line, escaped)
      const jsonBody = code.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      const contentTypeHeader = `-H "Content-Type: ${contentType}"`;
      return `curl -X ${methodUpper} \\\n    ${contentTypeHeader} \\\n    ${headers} \\\n    -d '${jsonBody}' \\\n    "${fullPath}"`;
    }
  };

  const curlCommand = generateCurl();
  const examplePath = getExamplePath();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div 
      className="grid grid-cols-1 items-start xl:max-w-none xl:grid-cols-2"
      style={{
        gap: '32px',
      }}
    >
      <Col>
        <AttributeList attributes={attributes} />
      </Col>
      <Col sticky>
        {/* Modern Console-style Request Panel - Matching CodeExample styling */}
        <div
          className="transition-all hover:shadow-xl"
          style={{
            borderRadius: '12px',
            border: '1px solid #2a1a2f',
            backgroundColor: '#1a0f1e',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08), 0 0 20px rgba(255, 47, 255, 0.10)',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          {/* Gradient Header Strip */}
          <div
            style={{
              background: 'linear-gradient(to right, rgba(255,47,255,0.18), rgba(255,47,255,0.06))',
              height: '3px',
            }}
          />

          {/* Header */}
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
                {method.toUpperCase()}
              </span>

              {/* Content Type - Only show for non-GET requests */}
              {method.toUpperCase() !== 'GET' && (
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.6)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {contentType}
                </span>
              )}
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


          {/* Console Body */}
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
            <pre
              style={{
                margin: 0,
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
                fontSize: '13.5px',
                lineHeight: '1.5',
                letterSpacing: '-0.2px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <code>
                <span style={{ color: '#10b981' }}>$</span>{' '}
                <span style={{ color: '#ffffff' }}>{curlCommand}</span>
              </code>
            </pre>
          </div>
        </div>
      </Col>
    </div>
  );
}

