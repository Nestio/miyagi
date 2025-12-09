import React from 'react';
import Callout from './Callout';
import SectionHeader from './SectionHeader';
import { KeyRegular, LockClosedRegular } from '@fluentui/react-icons';

export default function PartnerIntroductionPage() {
  return (
    <div className="partner-introduction-page">
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight" style={{ color: 'var(--docs-color-text)' }}>
          Partner API Overview
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Partner API (1.0)
        </p>
      </div>

      <section className="mb-12">
        <SectionHeader
          icon={<KeyRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Authentication"
        />

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Funnel provides you with an API key for authentication. You can use it in either of the following ways:
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--docs-color-text)' }}>
            Option 1: Basic Auth
          </h3>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--docs-color-text-100)' }}>
            Use the API key as the username with an empty password.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--docs-color-text)' }}>
            Option 2: Bearer Token
          </h3>
          <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--docs-color-text-100)' }}>
            Use the API key directly as a bearer token. Example header:
          </p>
          <pre
            className="p-4 rounded-lg"
            style={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e7eb',
              fontFamily: 'monospace',
              fontSize: '14px',
              overflowX: 'auto',
            }}
          >
            <code>Authorization: Bearer &lt;API_KEY&gt;</code>
          </pre>
        </div>

        <Callout type="info" title="License Agreement">
          By utilizing our API you agree to our{' '}
          <a
            href="/apis/partner-api/license-agreement"
            className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
          >
            License Agreement
          </a>
          .
        </Callout>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<LockClosedRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="OpenAPI Specification"
        />

        <div className="mb-6">
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--docs-color-text-100)' }}>
            <strong>OpenAPI version:</strong> 3.0.0
          </p>
        </div>

        <div className="space-y-6">
          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: '#fafafa',
              borderColor: '#e5e7eb',
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--docs-color-text)' }}>
              BasicAuth
            </h3>
            <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--docs-color-text-100)' }}>
              Use API key as username and leave password blank.
            </p>
            <div className="mt-3 space-y-1 text-sm" style={{ color: 'var(--docs-color-text-100)' }}>
              <p>
                <strong>Security scheme type:</strong> http
              </p>
              <p>
                <strong>Scheme:</strong> basic
              </p>
            </div>
          </div>

          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: '#fafafa',
              borderColor: '#e5e7eb',
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--docs-color-text)' }}>
              BearerAuth
            </h3>
            <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--docs-color-text-100)' }}>
              Use your API key as bearer token in the <code>Authorization</code> header. Example:{' '}
              <code>Authorization: Bearer &lt;API_KEY&gt;</code>
            </p>
            <div className="mt-3 space-y-1 text-sm" style={{ color: 'var(--docs-color-text-100)' }}>
              <p>
                <strong>Security scheme type:</strong> http
              </p>
              <p>
                <strong>Scheme:</strong> bearer
              </p>
              <p>
                <strong>Bearer format:</strong> API Key
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

