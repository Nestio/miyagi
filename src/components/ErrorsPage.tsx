import React from 'react';
import Callout from './Callout';
import SectionHeader from './SectionHeader';
import ModernTable, { type TableColumn, type TableRow } from './ModernTable';
import CodeSection, { type CodeTab } from './CodeSection';
import { DocsP, DocsUl, DocsSection } from './DocsPrimitives';
import {
  ErrorCircleRegular,
  DocumentRegular,
} from '@fluentui/react-icons';

export default function ErrorsPage() {
  // Code chip component for consistent styling
  const CodeChip = ({ children }: { children: React.ReactNode }) => (
    <code
      style={{
        display: 'inline-block',
        borderRadius: '6px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-subtle)',
        padding: '4px 8px',
        fontSize: '12px',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        fontWeight: 500,
        lineHeight: '1.4',
        verticalAlign: 'baseline',
        color: 'var(--text-primary)',
      }}
    >
      {children}
    </code>
  );

  const httpStatusColumns: TableColumn[] = [
    { header: 'Code', width: '100px', align: 'center' as const },
    { header: 'Status', width: '180px' },
    { header: 'Description' },
  ];

  const httpStatusRows: TableRow[] = [
    {
      cells: [
        <CodeChip key="200">200</CodeChip>,
        <span key="ok" className="font-medium" style={{ color: 'var(--text-primary)' }}>OK</span>,
        'Everything worked as expected.',
      ],
    },
    {
      cells: [
        <CodeChip key="400">400</CodeChip>,
        <span key="bad" className="font-medium" style={{ color: 'var(--text-primary)' }}>Bad Request</span>,
        'The request was unacceptable, often due to missing a required parameter.',
      ],
    },
    {
      cells: [
        <CodeChip key="401">401</CodeChip>,
        <span key="unauth" className="font-medium" style={{ color: 'var(--text-primary)' }}>Unauthorized</span>,
        'No valid API key provided.',
      ],
    },
    {
      cells: [
        <CodeChip key="403">403</CodeChip>,
        <span key="forbidden" className="font-medium" style={{ color: 'var(--text-primary)' }}>Forbidden</span>,
        'The API key doesn\'t have permissions to perform the request.',
      ],
    },
    {
      cells: [
        <CodeChip key="404">404</CodeChip>,
        <span key="notfound" className="font-medium" style={{ color: 'var(--text-primary)' }}>Not Found</span>,
        'The requested resource doesn\'t exist.',
      ],
    },
    {
      cells: [
        <CodeChip key="429">429</CodeChip>,
        <span key="ratelimit" className="font-medium" style={{ color: 'var(--text-primary)' }}>Too Many Requests</span>,
        'Too many requests hit the API too quickly. Try exponential backoff.',
      ],
    },
    {
      cells: [
        <CodeChip key="5xx">5xx</CodeChip>,
        <span key="server" className="font-medium" style={{ color: 'var(--text-primary)' }}>Server Errors</span>,
        'Something went wrong on Funnel Leasing\'s end.',
      ],
    },
  ];

  const errorAttributesColumns: TableColumn[] = [
    { header: 'Attribute' },
    { header: 'Type' },
    { header: 'Description' },
  ];

  const errorAttributesRows: TableRow[] = [
    {
      cells: [
        <CodeChip key="code">code</CodeChip>,
        <CodeChip key="int">integer</CodeChip>,
        'Represents the specific error code returned by the API.',
      ],
    },
    {
      cells: [
        <CodeChip key="message">message</CodeChip>,
        <CodeChip key="nullable">nullable string</CodeChip>,
        'A human-readable message describing the error.',
      ],
    },
    {
      cells: [
        <CodeChip key="param">param</CodeChip>,
        <CodeChip key="nullable2">nullable string</CodeChip>,
        'The parameter that caused the error (if applicable).',
      ],
    },
  ];

  const errorExampleTabs: CodeTab[] = [
    {
      label: 'JSON',
      language: 'json',
      title: 'Error Response Example',
      code: `{
  "code": 1234,
  "message": "Invalid parameter: start_date",
  "param": "start_date"
}`,
    },
  ];

  return (
    <div className="errors-page">
      <div className="max-w-[760px] mx-auto px-8">
        <DocsP variant="body" className="!mb-8">
          Funnel Leasing uses conventional HTTP response codes to indicate the success or failure of an API request.
        </DocsP>

        {/* Overview */}
        <DocsSection>
          <SectionHeader
            icon={<ErrorCircleRegular />}
            title="Overview"
          />

          <DocsP variant="body">
            HTTP status codes are grouped into ranges that indicate different types of responses:
          </DocsP>
          <DocsUl>
            <li><strong className="font-semibold">2xx range:</strong> Indicates success.</li>
            <li><strong className="font-semibold">4xx range:</strong> Indicates an error due to the provided information.</li>
            <li><strong className="font-semibold">5xx range:</strong> Indicates a server error on Funnel Leasing's end.</li>
          </DocsUl>
          <Callout type="info">
            Some 4xx errors include a response body with <CodeChip>code</CodeChip>, <CodeChip>message</CodeChip>, and optionally <CodeChip>param</CodeChip> fields that provide detailed information about the error.
          </Callout>
        </DocsSection>

        {/* Error Response Structure */}
        <DocsSection>
          <SectionHeader
            icon={<DocumentRegular />}
            title="Error Response Structure"
          />

          <DocsP variant="body">
            When an error occurs, the API returns a response body with the following attributes:
          </DocsP>

          <div className="docs-mt-24 docs-mb-24">
            <ModernTable
              columns={errorAttributesColumns}
              rows={errorAttributesRows}
            />
          </div>

          <DocsP variant="body" className="!mt-6 !mb-0">
            Example error response:
          </DocsP>

          <div className="docs-mt-16 docs-mb-24">
            <CodeSection
              variant="file"
              tabs={errorExampleTabs}
              initialTab={0}
              ariaDescription="Example error response JSON structure"
            />
          </div>
        </DocsSection>

        {/* HTTP Status Codes */}
        <DocsSection>
          <SectionHeader
            icon={<ErrorCircleRegular />}
            title="HTTP Status Codes"
          />

          <DocsP variant="body">
            The following table lists the HTTP status codes used by the Funnel Leasing API:
          </DocsP>

          <div className="docs-mt-24 docs-mb-24">
            <ModernTable
              columns={httpStatusColumns}
              rows={httpStatusRows}
            />
          </div>

          <Callout type="warning" title="Rate Limiting">
            If you receive a 429 (Too Many Requests) error, implement exponential backoff in your retry logic. Wait progressively longer between retry attempts to avoid overwhelming the API. Honor the <CodeChip>Retry-After</CodeChip> header if provided.
          </Callout>
        </DocsSection>
      </div>
    </div>
  );
}
