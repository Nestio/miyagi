import React from 'react';
import CodeSection from './CodeSection';
import type { CodeTab } from './CodeSection';
import Callout from './Callout';
import Badge from './Badge';
import SectionHeader from './SectionHeader';
import FAQAccordion from './FAQAccordion';
import ModernTable from './ModernTable';
import { DocsH1,DocsH3, DocsP, DocsSection, DocsUl, DocsDivider } from './DocsPrimitives';
import {
  KeyRegular,
  LockClosedRegular,
  ShieldCheckmarkRegular,
  QuestionCircleRegular,
  SettingsRegular,
  CheckmarkCircleRegular,
  DismissCircleRegular,
} from '@fluentui/react-icons';

export default function AuthenticationPage() {
  const EMPTY = <span style={{ color: 'var(--text-empty)' }}>—</span>;

  const codeTabs: CodeTab[] = [
    {
      label: 'Unix Shell',
      language: 'bash',
      title: 'Terminal',
      prefixMode: { kind: 'terminal', prompt: '$', continuation: '>' },
      code: `curl --user <API_KEY>: https://api.funnelleasing.com/api/v2/onlineleasing-link/`,
    },
    {
      label: 'Python',
      language: 'python',
      title: 'Python',
      prefixMode: { kind: 'gutterNumbers', start: 1 },
      code: `import requests

url = "https://api.funnelleasing.com/api/v2/onlineleasing-link/"
response = requests.get(url, auth=("<API_KEY>", ""))

print(response.status_code)
print(response.text)`,
    },
  ];

  return (
    <div className="authentication-page">
      <div className="max-w-[760px] mx-auto px-8">
        <div className="docs-intro">
          <DocsH1>Authentication</DocsH1>
          <DocsP variant="body">
            All requests to the Funnel Customer APIs must be authenticated using an API key issued for your customer
            account. Keys are scoped and configured by Funnel, and may include customer-specific settings such as listing
            display preferences.
          </DocsP>
          <DocsDivider />
        </div>

        {/* API Key */}
        <DocsSection>
          <SectionHeader icon={<KeyRegular />} title="API key" />

          <DocsP variant="body">
            To request API access, contact your Funnel customer service representative. Funnel issues API keys on request
            and configures them based on your intended use.
          </DocsP>

          <DocsH3>What to include in your request</DocsH3>
          <DocsP variant="body">
            Providing the details below helps us issue the right key the first time and avoid delays:
          </DocsP>
          <DocsUl>
            <li>Your customer account name and primary technical contact</li>
            <li>Where the integration will run (server-side service, internal tool, website, etc.)</li>
            <li>Whether the key needs to be used in a browser or other client-side environment</li>
            <li>Any listing display requirements (for example, whether full addresses may be shown)</li>
            <li>Expected volume and synchronization patterns (scheduled sync, near real-time, etc.)</li>
          </DocsUl>

          <Callout type="info" title="Authorized use">
            Funnel Customer APIs are intended for authorized users acting on behalf of a Funnel customer. This includes
            customer employees and customer-authorized development partners. If you are unsure which API applies to your
            integration, review{' '}
            <a href="/apis/customer-api/usage-and-terms" className="docs-link">
              Usage &amp; Terms
            </a>{' '}
            or contact{' '}
            <a href="mailto:support@funnelleasing.com" className="docs-link">
              support@funnelleasing.com
            </a>
            .
          </Callout>

          <DocsH3>Public vs private keys</DocsH3>
          <DocsP variant="body">
            Your representative will help determine whether you need a public key or a private key based on where the key
            will be used and the sensitivity of the data returned.
          </DocsP>

          <ModernTable
            columns={[
              { header: 'Key type' },
              { header: 'Intended use' },
              { header: 'Security expectations' },
            ]}
            rows={[
              {
                cells: [
                  <strong key="public">Public key</strong>,
                  'Customer-owned integrations where the key may be exposed in a client-side environment (for example, a public website).',
                  'Treat as less sensitive. Use only when necessary. Do not use to access sensitive fields or internal-only data.',
                ],
              },
              {
                cells: [
                  <strong key="private">Private key</strong>,
                  'Server-to-server integrations, internal services, scheduled synchronization jobs, and back-office tools.',
                  'Must be kept secret and stored in a secure secret-management system. Never embed in client-side code.',
                ],
              },
            ]}
          />

          <Callout type="warning" title="Client-side usage">
            If you plan to use an API key in a browser, assume it can be copied and reused by others. Only use a public
            key that is explicitly approved for that scenario. When possible, prefer a server-side integration that keeps
            credentials confidential.
          </Callout>
        </DocsSection>

        {/* Basic Authentication */}
        <DocsSection>
          <SectionHeader icon={<LockClosedRegular />} title="HTTP Basic authentication" />

          <DocsP variant="body">
            Funnel Customer APIs use HTTP Basic Authentication. The username is your API key and the password is blank.
            Requests must be made over HTTPS.
          </DocsP>

          <DocsP variant="body">
            For protocol details, see{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#basic_authentication_scheme"
              target="_blank"
              rel="noopener noreferrer"
              className="docs-link"
            >
              HTTP Basic Authentication
            </a>
            .
          </DocsP>

          <DocsH3>Example requests</DocsH3>
          <div className="docs-mb-24">
            <CodeSection
              variant="terminal"
              tabs={codeTabs}
              initialTab={0}
              marks={[
                {
                  text: '<API_KEY>',
                  all: true,
                  label: 'API key placeholder',
                },
              ]}
              ariaDescription="Code examples showing how to authenticate API requests using Unix Shell and Python"
            />
          </div>

          <DocsH3>Common authentication responses</DocsH3>
          <ModernTable
            columns={[
              { header: 'Status' },
              { header: 'Meaning' },
              { header: 'What to check' },
            ]}
            rows={[
              {
                cells: [
                  <code key="200" className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
                    200 OK
                  </code>,
                  'Authentication succeeded.',
                  'Proceed with your integration and implement retries/backoff for transient failures.',
                ],
              },
              {
                cells: [
                  <code key="401" className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
                    401 Unauthorized
                  </code>,
                  'Missing or invalid credentials.',
                  'Verify the API key, ensure Basic Auth is set, and confirm the password is blank.',
                ],
              },
              {
                cells: [
                  <code key="403" className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
                    403 Forbidden
                  </code>,
                  'Credentials are valid, but access is not permitted for this resource.',
                  'Confirm your key type (public/private), permissions, and any account-level restrictions.',
                ],
              },
            ]}
          />
        </DocsSection>

        {/* Best Practices */}
        <DocsSection>
          <SectionHeader icon={<ShieldCheckmarkRegular />} title="Security best practices" />

          <DocsP variant="body">
            Treat API keys as privileged credentials. The practices below help prevent accidental exposure and reduce the
            blast radius if a key is compromised.
          </DocsP>

          <div className="docs-mt-24 docs-mb-24">
            <ModernTable
              columns={[
                {
                  header: (
                    <div className="flex items-baseline gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5">
                        <span className="inline-flex -translate-y-[0.5px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:block">
                          <CheckmarkCircleRegular className="text-emerald-600" style={{ display: 'block' }} />
                        </span>
                      </span>
                      Recommended
                    </div>
                  ),
                },
                {
                  header: (
                    <div className="flex items-baseline gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5">
                        <span className="inline-flex -translate-y-[0.5px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:block">
                          <DismissCircleRegular className="text-red-600" style={{ display: 'block' }} />
                        </span>
                      </span>
                      Avoid
                    </div>
                  ),
                },
              ]}
              rows={[
                {
                  cells: [
                    'Store API keys in a secret manager (or an encrypted environment variable system) and load them at runtime.',
                    'Do not commit keys to source control, logs, support tickets, or documentation.',
                  ],
                },
                {
                  cells: [
                    'Use private keys for server-to-server integrations and keep them off client devices.',
                    'Do not embed private keys in browser code, mobile apps, or downloadable binaries.',
                  ],
                },
                {
                  cells: [
                    'Limit distribution: issue the minimum number of keys needed and retire keys that are no longer in use.',
                    'Do not reuse a single key across unrelated systems or teams without access controls.',
                  ],
                },
                {
                  cells: [
                    'Rotate keys on a regular schedule aligned with your security requirements, and rotate immediately after any suspected exposure.',
                    EMPTY,
                  ],
                },
                {
                  cells: [
                    'Monitor for unexpected usage patterns and alert on anomalies (for example, sudden volume spikes or traffic from unknown environments).',
                    EMPTY,
                  ],
                },
              ]}
            />
          </div>

          <Callout type="warning" title="If a key is exposed">
            Rotate the affected key as soon as possible and investigate where it was leaked (for example, source control,
            CI logs, client-side code, or application logs). If you need help rotating or auditing access, contact{' '}
            <a href="mailto:support@funnelleasing.com" className="docs-link">
              support@funnelleasing.com
            </a>
            .
          </Callout>
        </DocsSection>

        {/* Key Configuration */}
        <DocsSection>
          <SectionHeader icon={<SettingsRegular />} title="Key configuration and display preferences" />

          <DocsP variant="body">
            Some listing display behaviors are configured at the API key level. If you need different display behavior
            across multiple integrations, you may require more than one key.
          </DocsP>

          <DocsH3>Location visibility</DocsH3>
          <div className="docs-mt-24 docs-mb-32">
            <ModernTable
              columns={[{ header: 'Option' }, { header: 'Description' }]}
              rows={[
                {
                  cells: [
                    <div key="full" className="flex items-center gap-2">
                      Full address visibility <Badge variant="success">default</Badge>
                    </div>,
                    "Full address and location details are returned for listings accessed with this key.",
                  ],
                },
                {
                  cells: [
                    'Street-only visibility',
                    'Street and cross-street information is returned, but building numbers are hidden.',
                  ],
                },
                {
                  cells: [
                    <div key="neighborhood" className="flex items-center gap-2">
                      Neighborhood only <Badge variant="error">Legacy</Badge>
                    </div>,
                    'Legacy option. Neighborhood may be returned while address and street details are hidden. Not recommended for new integrations.',
                  ],
                },
              ]}
            />
          </div>

          <Callout type="warning" title="Legacy option">
            Neighborhood only is a legacy setting and should not be used for new integrations. Prefer Full address
            visibility or Street-only visibility.
          </Callout>

          <DocsH3>Additional display options</DocsH3>
          <div className="docs-mt-24 docs-mb-24">
            <ModernTable
              columns={[{ header: 'Option' }, { header: 'Description' }, { header: 'Default' }]}
              rows={[
                {
                  cells: [
                    'Hide unit number',
                    'Unit numbers are blank when enabled.',
                    <code
                      key="false1"
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200"
                    >
                      False
                    </code>,
                  ],
                },
                {
                  cells: [
                    'Include broker info',
                    'Includes broker-oriented fields intended for internal use (for example, access instructions, commission structure, and open house scheduling details where applicable).',
                    <code
                      key="false2"
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200"
                    >
                      False
                    </code>,
                  ],
                },
              ]}
            />
          </div>

          <Callout type="info" title="Broker information">
            Broker information is intended for internal workflows and should not be displayed to public users. Enable
            this option only when your integration requires it and your organization has approved the handling of this
            data.
          </Callout>
        </DocsSection>

        {/* FAQs */}
        <DocsSection>
          <SectionHeader icon={<QuestionCircleRegular />} title="Frequently asked questions" />

          <DocsP
            variant="body"
            style={{
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '16px',
            }}
          >
            If you do not see your question here, contact{' '}
            <a href="mailto:support@funnelleasing.com" className="docs-link">
              support@funnelleasing.com
            </a>
            .
          </DocsP>

          <FAQAccordion
            items={[
              {
                question: 'My API key was compromised. What should I do?',
                answer: (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Rotate the API key immediately.
                    </p>
                    <p className="mb-2">
                      Investigate the source of exposure (e.g., repositories, CI logs, client-side code). If you need
                      assistance rotating the key or reviewing access patterns, contact{' '}
                      <a href="mailto:support@funnelleasing.com" className="docs-link">
                        support@funnelleasing.com
                      </a>
                      .
                    </p>
                    <p className="mb-0">
                      If you believe the key was used by an unauthorized party, include approximate timestamps and any
                      relevant request identifiers when you contact support.
                    </p>
                  </div>
                ),
              },
              {
                question: 'Do API keys expire?',
                answer: (
                  <DocsP variant="body" className="!mb-0">
                    API keys are typically long-lived. If your organization requires periodic rotation, contact your
                    customer service representative or support to coordinate key rotation and ensure continuity for
                    production integrations.
                  </DocsP>
                ),
              },
              {
                question: 'How often should we rotate API keys?',
                answer: (
                  <DocsP variant="body" className="!mb-0">
                    Follow your organization’s security policy. Many teams rotate every 90 to 365 days, and rotate
                    immediately after any suspected exposure. If you need help planning rotation for multiple services or
                    environments, contact support.
                  </DocsP>
                ),
              },
              {
                question: 'Can we use multiple keys?',
                answer: (
                  <DocsP variant="body" className="!mb-0">
                    Yes. Some teams use separate keys for different environments (for example, staging vs production) or
                    to apply different key-level display settings. Contact your representative to discuss key
                    provisioning.
                  </DocsP>
                ),
              },
            ]}
          />
        </DocsSection>
      </div>
    </div>
  );
}
