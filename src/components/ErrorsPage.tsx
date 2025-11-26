import React from 'react';
import Callout from './Callout';
import SectionHeader from './SectionHeader';
import ModernTable, { type TableColumn, type TableRow } from './ModernTable';
import {
  ErrorCircleRegular,
  DocumentRegular,
} from '@fluentui/react-icons';

export default function ErrorsPage() {
  const httpStatusColumns: TableColumn[] = [
    { header: 'Code' },
    { header: 'Status' },
    { header: 'Description' },
  ];

  const httpStatusRows: TableRow[] = [
    {
      cells: [
        <code key="200" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          200
        </code>,
        <span key="ok" className="font-medium" style={{ color: 'var(--docs-color-text)' }}>OK</span>,
        'Everything worked as expected.',
      ],
    },
    {
      cells: [
        <code key="400" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          400
        </code>,
        <span key="bad" className="font-medium" style={{ color: 'var(--docs-color-text)' }}>Bad Request</span>,
        'The request was unacceptable, often due to missing a required parameter.',
      ],
    },
    {
      cells: [
        <code key="401" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          401
        </code>,
        <span key="unauth" className="font-medium" style={{ color: 'var(--docs-color-text)' }}>Unauthorized</span>,
        'No valid API key provided.',
      ],
    },
    {
      cells: [
        <code key="403" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          403
        </code>,
        <span key="forbidden" className="font-medium" style={{ color: 'var(--docs-color-text)' }}>Forbidden</span>,
        'The API key doesn\'t have permissions to perform the request.',
      ],
    },
    {
      cells: [
        <code key="404" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          404
        </code>,
        <span key="notfound" className="font-medium" style={{ color: 'var(--docs-color-text)' }}>Not Found</span>,
        'The requested resource doesn\'t exist.',
      ],
    },
    {
      cells: [
        <code key="429" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          429
        </code>,
        <span key="ratelimit" className="font-medium" style={{ color: 'var(--docs-color-text)' }}>Too Many Requests</span>,
        'Too many requests hit the API too quickly. Try exponential backoff.',
      ],
    },
    {
      cells: [
        <code key="5xx" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          5xx
        </code>,
        <span key="server" className="font-medium" style={{ color: 'var(--docs-color-text)' }}>Server Errors</span>,
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
        <code key="code" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          code
        </code>,
        <code key="int" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          integer
        </code>,
        'Represents the specific error code returned by the API.',
      ],
    },
    {
      cells: [
        <code key="message" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          message
        </code>,
        <code key="nullable" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          nullable string
        </code>,
        'A human-readable message describing the error.',
      ],
    },
    {
      cells: [
        <code key="param" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          param
        </code>,
        <code key="nullable2" className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium">
          nullable string
        </code>,
        'The parameter that caused the error (if applicable).',
      ],
    },
  ];

  return (
    <div className="errors-page">
      <div className="mb-10">
        <p className="text-lg leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Funnel Leasing uses conventional HTTP response codes to indicate the success or failure of an API request.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <SectionHeader
          icon={<ErrorCircleRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Overview"
        />

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          HTTP status codes are grouped into ranges that indicate different types of responses:
        </p>
        <ul className="mb-6 space-y-2 pl-6 text-base leading-relaxed list-disc" style={{ color: 'var(--docs-color-text-100)' }}>
          <li><strong className="font-semibold" style={{ color: 'var(--docs-color-text)' }}>2xx range:</strong> Indicates success.</li>
          <li><strong className="font-semibold" style={{ color: 'var(--docs-color-text)' }}>4xx range:</strong> Indicates an error due to the provided information.</li>
          <li><strong className="font-semibold" style={{ color: 'var(--docs-color-text)' }}>5xx range:</strong> Indicates a server error on Funnel Leasing's end.</li>
        </ul>
        <Callout type="info">
          Some 4xx errors include an error code that explains the issue with a human-friendly message.
        </Callout>
      </section>

      {/* Error Response Structure */}
      <section className="mb-12">
        <SectionHeader
          icon={<DocumentRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Error Response Structure"
        />

        <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          When an error occurs, the API returns a response body with the following attributes:
        </p>

        <div className="mb-6">
          <ModernTable
            columns={errorAttributesColumns}
            rows={errorAttributesRows}
          />
        </div>
      </section>

      {/* HTTP Status Codes */}
      <section className="mb-12">
        <SectionHeader
          icon={<ErrorCircleRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="HTTP Status Codes"
        />

        <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          The following table lists the HTTP status codes used by the Funnel Leasing API:
        </p>

        <div className="mb-6">
          <ModernTable
            columns={httpStatusColumns}
            rows={httpStatusRows}
          />
        </div>

        <Callout type="warning" title="Rate Limiting">
          If you receive a 429 (Too Many Requests) error, implement exponential backoff in your retry logic. Wait progressively longer between retry attempts to avoid overwhelming the API.
        </Callout>
      </section>
    </div>
  );
}
