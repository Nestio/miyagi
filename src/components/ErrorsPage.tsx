import React from 'react';
import Callout from './Callout';
import SectionHeader from './SectionHeader';
import ModernTable, { type TableColumn, type TableRow } from './ModernTable';
import CodeSection, { type CodeTab } from './CodeSection';
import { DocsH1, DocsH3, DocsP, DocsUl, DocsDivider, DocsSection } from './DocsPrimitives';
import { ErrorCircleRegular, DocumentRegular, QuestionCircleRegular } from '@fluentui/react-icons';

export default function ErrorsPage() {
  // Inline code chip for consistent styling across tables and callouts
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
    { header: 'Status', width: '190px' },
    { header: 'What it means' },
  ];

  const httpStatusRows: TableRow[] = [
    {
      cells: [
        <CodeChip key="200">200</CodeChip>,
        <span key="ok" className="font-medium" style={{ color: 'var(--text-primary)' }}>
          OK
        </span>,
        'The request succeeded.',
      ],
    },
    {
      cells: [
        <CodeChip key="400">400</CodeChip>,
        <span key="bad" className="font-medium" style={{ color: 'var(--text-primary)' }}>
          Bad Request
        </span>,
        'The request is invalid, often due to missing or malformed parameters.',
      ],
    },
    {
      cells: [
        <CodeChip key="401">401</CodeChip>,
        <span key="unauth" className="font-medium" style={{ color: 'var(--text-primary)' }}>
          Unauthorized
        </span>,
        'Authentication failed (missing or invalid API key).',
      ],
    },
    {
      cells: [
        <CodeChip key="403">403</CodeChip>,
        <span key="forbidden" className="font-medium" style={{ color: 'var(--text-primary)' }}>
          Forbidden
        </span>,
        "The API key is valid, but it isn't permitted to access this resource or configuration.",
      ],
    },
    {
      cells: [
        <CodeChip key="404">404</CodeChip>,
        <span key="notfound" className="font-medium" style={{ color: 'var(--text-primary)' }}>
          Not Found
        </span>,
        "The requested resource doesn't exist, or the endpoint path is incorrect.",
      ],
    },
    {
      cells: [
        <CodeChip key="429">429</CodeChip>,
        <span key="ratelimit" className="font-medium" style={{ color: 'var(--text-primary)' }}>
          Too Many Requests
        </span>,
        'Request volume is too high. Reduce frequency and retry with backoff. Honor Retry-After if provided.',
      ],
    },
    {
      cells: [
        <CodeChip key="5xx">5xx</CodeChip>,
        <span key="server" className="font-medium" style={{ color: 'var(--text-primary)' }}>
          Server Errors
        </span>,
        "An internal error occurred on Funnel's side. Retry with backoff for transient failures.",
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
      cells: [<CodeChip key="code">code</CodeChip>, <CodeChip key="int">integer</CodeChip>, 'A machine-readable error code returned by the API.'],
    },
    {
      cells: [<CodeChip key="message">message</CodeChip>, <CodeChip key="nullable">nullable string</CodeChip>, 'A human-readable description of what went wrong.'],
    },
    {
      cells: [<CodeChip key="param">param</CodeChip>, <CodeChip key="nullable2">nullable string</CodeChip>, 'The parameter associated with the error, when applicable.'],
    },
  ];

  const errorExampleTabs: CodeTab[] = [
    {
      label: 'JSON',
      language: 'json',
      title: 'Error response example',
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
        <div className="docs-intro">
          <DocsH1>Customer API Errors</DocsH1>
          <DocsP variant="body">
            Funnel Customer APIs use standard HTTP status codes to indicate whether a request succeeded or failed. Some errors include a structured JSON response body with additional details you can use for debugging and user-friendly handling.
          </DocsP>
          <DocsDivider />
        </div>

        <Callout type="info" title="Related documentation">
          If you are seeing authentication failures, start with{' '}
          <a href="/apis/customer-api/authentication" className="docs-link">
            Authentication
          </a>
          . For acceptable use and operational requirements, see{' '}
          <a href="/apis/customer-api/usage-and-terms" className="docs-link">
            Usage &amp; Terms
          </a>
          .
        </Callout>

        <DocsSection>
          <SectionHeader icon={<ErrorCircleRegular />} title="How to interpret responses" />

          <DocsP variant="body">
            HTTP status codes are grouped into ranges that describe the category of the response:
          </DocsP>

          <DocsUl>
            <li>
              <strong className="font-semibold">2xx:</strong> The request succeeded.
            </li>
            <li>
              <strong className="font-semibold">4xx:</strong> The request failed due to client-side input or permissions.
            </li>
            <li>
              <strong className="font-semibold">5xx:</strong> The request failed due to a server-side error.
            </li>
          </DocsUl>

          <Callout type="info" title="Implementation note">
            Not every error includes a JSON body. When present, the body may include <CodeChip>code</CodeChip>, <CodeChip>message</CodeChip>, and optionally <CodeChip>param</CodeChip>.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<DocumentRegular />} title="Error response format" />

          <DocsP variant="body">When an error response includes a JSON body, it uses the attributes below:</DocsP>

          <div className="docs-mt-24 docs-mb-24">
            <ModernTable columns={errorAttributesColumns} rows={errorAttributesRows} />
          </div>

          <DocsP variant="body" className="!mt-6 !mb-0">
            Example:
          </DocsP>

          <div className="docs-mt-16 docs-mb-24">
            <CodeSection variant="file" tabs={errorExampleTabs} initialTab={0} ariaDescription="Example error response JSON structure" />
          </div>

          <Callout type="info" title="Recommended handling">
            Use <CodeChip>code</CodeChip> for programmatic handling, <CodeChip>message</CodeChip> for logs (and optionally user-facing UI), and <CodeChip>param</CodeChip> to highlight invalid inputs in validation errors.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<ErrorCircleRegular />} title="HTTP status codes" />

          <DocsP variant="body">The Funnel Customer APIs may return the following HTTP status codes:</DocsP>

          <div className="docs-mt-24 docs-mb-24">
            <ModernTable columns={httpStatusColumns} rows={httpStatusRows} />
          </div>

          <Callout type="warning" title="Rate limiting (429)">
            If you receive <CodeChip>429</CodeChip>, reduce request frequency and retry using exponential backoff. Honor the <CodeChip>Retry-After</CodeChip> header if it is provided. Repeated 429s usually indicate the integration should switch to a bulk/sync approach instead of frequent polling.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<ErrorCircleRegular />} title="Retry strategy and resilience" />

          <DocsP variant="body">
            Production integrations should treat failures differently depending on the error class. The guidance below helps prevent retry storms and improves end-user experience.
          </DocsP>

          <DocsUl>
            <li>
              <strong className="font-semibold">Do not automatically retry most 4xx errors:</strong> Fix the request (parameters, permissions, endpoint path) before retrying.
            </li>
            <li>
              <strong className="font-semibold">Retry 429 with backoff:</strong> Slow down and respect any server guidance (such as <CodeChip>Retry-After</CodeChip>).
            </li>
            <li>
              <strong className="font-semibold">Retry transient 5xx errors:</strong> Use exponential backoff with jitter and a maximum retry cap.
            </li>
            <li>
              <strong className="font-semibold">Set timeouts:</strong> Always use reasonable connect and read timeouts to prevent hung workers.
            </li>
            <li>
              <strong className="font-semibold">Log with context:</strong> Include endpoint, method, status code, and any returned error <CodeChip>code</CodeChip> to speed up debugging.
            </li>
          </DocsUl>

          <Callout type="info" title="Avoid retry storms">
            If many requests fail at once (for example, during a deployment or outage), apply a circuit breaker or global backoff so you do not overwhelm your own systems or the API with synchronized retries.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<QuestionCircleRegular />} title="Getting help" />

          <DocsP variant="body">
            If you contact support about an error, include enough detail for us to reproduce or investigate quickly.
          </DocsP>

          <DocsUl>
            <li>Customer account name (or the organization the key is issued to)</li>
            <li>Endpoint URL and HTTP method</li>
            <li>Timestamp and timezone</li>
            <li>HTTP status code and any error response body (remove secrets)</li>
            <li>Whether the issue is intermittent or consistently reproducible</li>
          </DocsUl>

          <Callout type="info" title="Support contact">
            Email{' '}
            <a href="mailto:support@funnelleasing.com" className="docs-link">
              support@funnelleasing.com
            </a>{' '}
            for API integration support.
          </Callout>
        </DocsSection>
      </div>
    </div>
  );
}
