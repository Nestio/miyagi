import React from 'react';
import { Row, Col } from './Layout';
import APIEndpoint from './APIEndpoint';
import ApiDocumentation from './ApiDocumentation';

interface AttributeItem {
  name: string;
  type: string;
  description: string;
  children?: AttributeItem[];
}

interface ApiPageProps {
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  path: string;
  attributes: AttributeItem[];
  exampleCode: string;
  exampleTitle?: string;
  exampleLang?: string;
  contentType?: string;
  formatLabel?: string;
}

/**
 * ApiPage - A complete API documentation page component
 * 
 * This component provides a standardized layout for API documentation pages:
 * - Header section with description and API endpoint
 * - Attributes section with collapsible properties and code example
 * 
 * @example
 * ```tsx
 * <ApiPage
 *   title="Applicant"
 *   description="The Applicant object represents..."
 *   method="GET"
 *   path="/api/v2/applicants/:id"
 *   attributes={attributes}
 *   exampleCode={exampleCode}
 * />
 * ```
 */
export default function ApiPage({
  title,
  description,
  method,
  path,
  attributes,
  exampleCode,
  exampleTitle = 'Example request payload',
  exampleLang = 'json',
  contentType,
  formatLabel,
}: ApiPageProps) {
  return (
    <>
      {/* Header Section: Description + Endpoint */}
      <div style={{ marginBottom: '48px' }}>
        <Row>
          <Col>
            <p 
              className="font-normal"
              style={{ 
                marginBottom: '0',
                fontSize: '15px',
                lineHeight: '1.65',
                color: '#4b5563',
                maxWidth: '640px',
              }}
            >
              {description}
            </p>
          </Col>
          <Col>
            <APIEndpoint method={method} path={path} />
          </Col>
        </Row>
      </div>

      {/* Subtle separator */}
      <div 
        style={{ 
          borderBottom: '1px solid #f1eef3',
          marginTop: '32px',
          marginBottom: '24px',
        }}
      />

      {/* Attributes Section */}
      <div
        style={{
          border: '1px solid #eee',
          borderRadius: '16px',
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          padding: '24px 24px',
          marginBottom: '48px',
          marginLeft: '8px',
        }}
      >
        <h4 
          className="text-[18px] font-semibold text-gray-900 border-b border-[#efeff3] pb-3 mb-4"
          style={{ 
            marginTop: '0',
            fontFamily: 'inherit',
          }}
        >Attributes</h4>

        <ApiDocumentation
          attributes={attributes}
          code={exampleCode}
          title={exampleTitle}
          lang={exampleLang}
          contentType={contentType}
          formatLabel={formatLabel}
        />
      </div>
    </>
  );
}

