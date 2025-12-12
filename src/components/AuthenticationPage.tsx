import React from 'react';
import CodeSection from './CodeSection';
import type { CodeTab } from './CodeSection';
import Callout from './Callout';
import Badge from './Badge';
import SectionHeader from './SectionHeader';
import FAQAccordion, { type FAQItem } from './FAQAccordion';
import ModernTable, { type TableColumn, type TableRow } from './ModernTable';
import { DocsH3, DocsP, DocsSection } from './DocsPrimitives';
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
      title: 'Terminal window',
      prefixMode: { kind: 'terminal', prompt: '$', continuation: '>' },
      code: `curl --user <your_key>: https://api.funnelleasing.com/api/v2/onlineleasing-link/`,
    },
    {
      label: 'Python',
      language: 'python',
      title: 'Python',
      prefixMode: { kind: 'gutterNumbers', start: 1 },
      code: `import requests

response = requests.get('https://api.funnelleasing.com/api/v2/onlineleasing-link/', auth=('<your_key>', ''))`,
    },
  ];

  return (
    <div className="authentication-page">
      <div className="max-w-[760px] mx-auto px-8">
        {/* API Key Section */}
        <DocsSection>
          <SectionHeader
            icon={<KeyRegular />}
            title="API Key"
          />

          <DocsH3>
            Getting your Authorized API Key
          </DocsH3>
          <DocsP variant="body">
            To get access to the Funnel listings API please contact your customer service representative. We will create a key for you on request, configured according to your needs.
          </DocsP>
          <DocsP variant="body">
            Your customer service representative will discuss your intended API use to determine if you need a <strong>public</strong> or <strong>private</strong> access key. Typically public access keys are appropriate for website frontends and private access keys are required for server-to-server API integration.
          </DocsP>
        </DocsSection>

        {/* Basic Authentication */}
        <DocsSection>
          <SectionHeader
            icon={<LockClosedRegular />}
            title="Basic Authentication"
          />
        
          <DocsP variant="body">
            Requests are made using the HTTP Basic Authentication protocol. The username is your key and the password is blank. See{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#basic_authentication_scheme"
              target="_blank"
              rel="noopener noreferrer"
              className="docs-link"
            >
              HTTP Basic Authentication
            </a>{' '}
            for more details.
          </DocsP>

          <DocsH3>
            Example Usage
          </DocsH3>
          <div className="docs-mb-24">
          <CodeSection
            variant="terminal"
            tabs={codeTabs}
            initialTab={0}
            marks={[
              {
                text: '<your_key>',
                all: true,
                label: 'API key placeholder',
              },
            ]}
            ariaDescription="Code examples showing how to authenticate API requests using Unix Shell and Python"
          />
        </div>
        </DocsSection>

        {/* Best Practices */}
        <DocsSection>
          <SectionHeader
            icon={<ShieldCheckmarkRegular />}
            title="Best Practices"
          />
          <DocsP variant="body">
            We recommend the following best practices when using Funnel Online Leasing API keys:
          </DocsP>

          <div className="docs-mt-24 docs-mb-24">
          <ModernTable
            columns={[
              {
                header: (
                  <div className="flex items-baseline gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5">
                      <span className="inline-flex -translate-y-[0.5px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:block">
                        <CheckmarkCircleRegular 
                          className="text-emerald-600" 
                          style={{ display: 'block' }} 
                        />
                      </span>
                    </span>
                    Do These
                  </div>
                ),
              },
              {
                header: (
                  <div className="flex items-baseline gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5">
                      <span className="inline-flex -translate-y-[0.5px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:block">
                        <DismissCircleRegular 
                          className="text-red-600" 
                          style={{ display: 'block' }} 
                        />
                      </span>
                    </span>
                    Don't Do These
                  </div>
                ),
              },
            ]}
            rows={[
              {
                cells: [
                  'Treat all API keys like a very important password you need to keep safe.',
                  "Never share your API key with others. It's not safe.",
                ],
              },
              {
                cells: [
                  'Use an environment file or credential manager to store your API key outside of your code.',
                  "Don't put your API key in your source code.",
                ],
              },
              {
                cells: [
                  'Immediately rotate API keys if you suspect a breach or exposure.',
                  "Don't store your API key on the client side.",
                ],
              },
              {
                cells: [
                  'Periodically rotate your API key on an annual basis as a proactive security measure.',
                  EMPTY,
                ],
              },
              {
                cells: [
                  'Keep minimum number of API keys as possible.',
                  EMPTY,
                ],
              },
              {
                cells: [
                  'Always remove keys that are inactive or serving a temporary need.',
                  EMPTY,
                ],
              },
            ]}
          />
        </div>

        <Callout type="warning" title="Security Notice">
          Always store your API keys securely and never commit them to version control. Use environment variables or secure credential management systems. If an API key is exposed, rotate it immediately to prevent unauthorized access to your account.
        </Callout>
        </DocsSection>

        {/* FAQs */}
        <DocsSection>
          <SectionHeader
            icon={<QuestionCircleRegular />}
            title="Frequently Asked Questions"
          />
          <DocsP variant="body">
            Answers to commonly asked questions. If you're unsure, contact{' '}
            <a href="mailto:support@funnelleasing.com" className="docs-link">
              support@funnelleasing.com
            </a>
            .
          </DocsP>

        <FAQAccordion
          items={[
            {
              question: 'My API key was compromised, what should I do?',
              answer: (
                <div>
                  <DocsP variant="body" className="!mb-2">
                    <strong className="font-semibold">If exposed:</strong> Revoke the compromised key immediately, rotate to a new key, and audit your access logs for any unauthorized activity.
                  </DocsP>
                  <DocsP variant="body" className="!mb-0">
                    <strong className="font-semibold">If unsure:</strong> Rotate your API key as a precaution, monitor your account activity, and contact{' '}
                    <a href="mailto:support@funnelleasing.com" className="docs-link">
                      support@funnelleasing.com
                    </a>{' '}
                    if you notice any suspicious behavior.
                  </DocsP>
                </div>
              ),
            },
            {
              question: 'When does my API key expire?',
              answer: <DocsP variant="body" className="!mb-0">API keys are long-lived by default and do not expire automatically. You maintain full control over their lifecycle and can rotate or revoke them at any time through your account settings.</DocsP>,
            },
            {
              question: 'How often should I rotate my API key?',
              answer: <DocsP variant="body" className="!mb-0">We recommend rotating API keys at least once a year, but you can adjust the frequency to fit your security requirements. Consider rotating more frequently if you handle sensitive data or have strict compliance requirements.</DocsP>,
            },
          ]}
        />
        </DocsSection>

        {/* API Data Display Preferences */}
        <DocsSection>
          <SectionHeader
            icon={<SettingsRegular />}
            title="API Data Display Preferences"
          />
          <DocsP variant="body">
            Configuration for how data is displayed in the open listings API. Display preferences are specific to single key. In some cases, you will need more than one key to have API integrations with different display preferences.
          </DocsP>

          <h3 className="docs-h3">
            Location Visibility
          </h3>
          <div className="docs-mt-24 docs-mb-32">
          <ModernTable
            columns={[
              { header: 'Option' },
              { header: 'Description' },
            ]}
            rows={[
              {
                cells: [
                  <div key="full" className="flex items-center gap-2">
                    Full Address Visibility
                    <Badge variant="success">default</Badge>
                  </div>,
                  'Full address and location information will be displayed on all of your company\'s listings accessed via this key.',
                ],
              },
              {
                cells: [
                  'Street Only Visibility',
                  'Streets and cross streets will be displayed, but building numbers will be hidden.',
                ],
              },
              {
                cells: [
                  <div key="neighborhood" className="flex items-center gap-2">
                    Neighborhood Only
                    <Badge variant="error">Legacy</Badge>
                  </div>,
                  'Listing neighborhoods (Legacy field, do not use) will be displayed. Address and streets will be hidden (including cross streets).',
                ],
              },
            ]}
          />
        </div>

        <Callout type="warning" title="Legacy Field Notice">
          The Neighborhood Only option is a legacy field and should not be used for new integrations. We recommend using Full Address Visibility or Street Only Visibility instead.
        </Callout>

          <DocsH3>
            Additional Display Options
          </DocsH3>
          <div className="docs-mt-24 docs-mb-24">
          <ModernTable
            columns={[
              { header: 'Option' },
              { header: 'Description' },
              { header: 'Default' },
            ]}
            rows={[
              {
                cells: [
                  'Hide Unit Number',
                  'Listing unit numbers will be blank if True.',
                  <code key="false1" className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
                    False
                  </code>,
                ],
              },
              {
                cells: [
                  'Include Broker Info',
                  'Listings will include broker specific information that might not be appropriate to show to public users. Specifically the following information is counted as Broker Info: Date and Time of upcoming Open Houses for Open Listings, Unit Access Information including information about how to get the door key to the unit, and information about the Commission Structure of the listing.',
                  <code key="false2" className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
                    False
                  </code>,
                ],
              },
            ]}
          />
        </div>

          <Callout type="info" title="Broker Information">
            Broker information is intended for internal use and should not be displayed to public users. Only enable this option if your integration requires access to this sensitive information.
          </Callout>
        </DocsSection>
      </div>
    </div>
  );
}
