import React from 'react';
import CodeSection from './CodeSection';
import type { CodeTab } from './CodeSection';
import Callout from './Callout';
import Badge from './Badge';
import SectionHeader from './SectionHeader';
import FAQAccordion, { type FAQItem } from './FAQAccordion';
import ModernTable, { type TableColumn, type TableRow } from './ModernTable';
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
      {/* API Key Section */}
      <section className="mb-12">
        <SectionHeader
          icon={<KeyRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="API Key"
        />

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold" style={{ color: 'var(--docs-color-text)' }}>
            Getting your Authorized API Key
          </h3>
          <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
            To get access to the Funnel listings API please contact your customer service representative. We will create a key for you on request, configured according to your needs.
          </p>
          <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
            Your customer service representative will discuss your intended API use to determine if you need a <strong>public</strong> or <strong>private</strong> access key. Typically public access keys are appropriate for website frontends and private access keys are required for server-to-server API integration.
          </p>
        </div>
      </section>

      {/* Basic Authentication */}
      <section className="mb-12">
        <SectionHeader
          icon={<LockClosedRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Basic Authentication"
        />
        
        <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Requests are made using the HTTP Basic Authentication protocol. The username is your key and the password is blank. See the{' '}
          <a
            href="https://en.wikipedia.org/wiki/Basic_access_authentication"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
          >
            wikipedia page
          </a>{' '}
          for more details: HTTP Basic Auth
        </p>

        <h3 className="mb-5 text-xl font-semibold" style={{ color: 'var(--docs-color-text)' }}>
          Example Usage
        </h3>
        <div className="mb-6">
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
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <SectionHeader
          icon={<ShieldCheckmarkRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Best Practices"
        />
        <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          We recommend the following best practices when using Funnel Online Leasing API keys:
        </p>

        <div className="mb-6">
          <ModernTable
            columns={[
              {
                header: (
                  <div className="flex items-center gap-2">
                    <CheckmarkCircleRegular className="w-4 h-4 text-emerald-600" />
                    Do These
                  </div>
                ),
              },
              {
                header: (
                  <div className="flex items-center gap-2">
                    <DismissCircleRegular className="w-4 h-4 text-red-600" />
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
                  '',
                ],
              },
              {
                cells: [
                  'Keep minimum number of API keys as possible.',
                  '',
                ],
              },
              {
                cells: [
                  'Always remove keys that are inactive or serving a temporary need.',
                  '',
                ],
              },
            ]}
          />
        </div>

        <Callout type="warning" title="Security Notice">
          Always store your API keys securely and never commit them to version control. Use environment variables or secure credential management systems. If an API key is exposed, rotate it immediately to prevent unauthorized access to your account.
        </Callout>
      </section>

      {/* FAQs */}
      <section className="mb-12">
        <SectionHeader
          icon={<QuestionCircleRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Frequently Asked Questions"
        />
        <p className="mb-10 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Answers to commonly asked questions. When in doubt, please reach out to{' '}
          <a href="mailto:support@funnelleasing.com" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
            support@funnelleasing.com
          </a>
          .
        </p>

        <FAQAccordion
          items={[
            {
              question: 'My API key was compromised, what should I do?',
              answer: (
                <div className="space-y-4">
                  <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--docs-color-text)' }}>
                    Do you suspect a breach?
                  </p>
                  <div className="space-y-3">
                    <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
                      <strong className="font-semibold" style={{ color: 'var(--docs-color-text)' }}>Yes</strong> — Contact your customer service representative as soon as possible and ask to delete the compromised credentials immediately. You can fix your integration right after with minimal down time.
                    </p>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
                      <strong className="font-semibold" style={{ color: 'var(--docs-color-text)' }}>No</strong> — Send an email to{' '}
                      <a href="mailto:support@funnelleasing.com" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
                        support@funnelleasing.com
                      </a>{' '}
                      and rotate your API key as soon as possible.
                    </p>
                  </div>
                </div>
              ),
            },
            {
              question: 'When does my API key expire?',
              answer: 'API keys are long-lived and do not expire. You maintain full control over their lifecycle and can rotate or revoke them at any time through your account settings.',
            },
            {
              question: 'How often should I rotate my API key?',
              answer: 'We recommend rotating API keys at least once a year, but you can adjust the frequency to fit your security requirements. Consider rotating more frequently if you handle sensitive data or have strict compliance requirements.',
            },
          ]}
        />
      </section>

      {/* API Data Display Preferences */}
      <section className="mb-12">
        <SectionHeader
          icon={<SettingsRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="API Data Display Preferences"
        />
        <p className="mb-8 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Configuration for how data is displayed in the open listings API. Display preferences are specific to single key. In some cases, you will need more than one key to have API integrations with different display preferences.
        </p>

        <h3 className="mb-5 text-xl font-semibold" style={{ color: 'var(--docs-color-text)' }}>
          Location Visibility
        </h3>
        <div className="mb-8">
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

        <h3 className="mb-5 text-xl font-semibold" style={{ color: 'var(--docs-color-text)' }}>
          Additional Display Options
        </h3>
        <div className="mb-6">
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
      </section>
    </div>
  );
}
