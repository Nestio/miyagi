import React from 'react';
import Callout from './Callout';
import SectionHeader from './SectionHeader';
import { DocsH1, DocsP, DocsUl, DocsDivider, DocsSection } from './DocsPrimitives';
import {
  PeopleRegular,
  CodeRegular,
  RocketRegular,
  SettingsRegular,
  QuestionCircleRegular,
} from '@fluentui/react-icons';

export default function IntroductionPage() {
  return (
    <div className="introduction-page">
      <div className="max-w-[760px] mx-auto px-8">
        <div className="docs-intro">
          <DocsH1>Funnel Customer APIs</DocsH1>
          <DocsP variant="lead">
            Funnel Customer APIs are provided to Funnel customers (for example, property management companies) to
            integrate Funnel into internal systems and production workflows. Access is restricted to customer-authorized
            users, including internal engineering teams and approved development partners, using credentials issued for
            the customer’s account.
          </DocsP>
          <DocsDivider />
        </div>

        <Callout type="info" title="Before you build">
          Review{' '}
          <a href="/apis/customer-api/usage-and-terms" className="docs-link">
            Usage &amp; Terms
          </a>{' '}
          for the legal, security, and operational requirements for production use of the Funnel Customer APIs.
        </Callout>

        <DocsSection>
          <SectionHeader icon={<PeopleRegular />} title="Who can use these APIs" />

          <DocsP variant="body">
            Funnel Customer APIs are intended for authorized individuals acting on behalf of a Funnel customer. Common
            authorized users include:
          </DocsP>

          <DocsUl>
            <li>
              <strong>Customer employees</strong> building and operating integrations for the customer’s systems
            </li>
            <li>
              <strong>Customer-authorized contractors or development partners</strong> implementing an integration for a
              specific customer account
            </li>
            <li>
              <strong>Customer IT and security teams</strong> managing credentials, environments, and operational access
            </li>
          </DocsUl>

          <DocsP variant="body">
            If you are building a reusable integration intended to serve multiple customers (not tied to a single
            customer account), refer to the{' '}
            <a href="/apis/partner-api/" className="docs-link">
              Partner API documentation
            </a>{' '}
            for separate access and terms.
          </DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<CodeRegular />} title="Typical use cases" />

          <DocsP variant="body">
            Use the Funnel Customer APIs to support customer-owned integrations and workflows such as:
          </DocsP>

          <DocsUl>
            <li>Retrieving listings and related data for internal tools and customer-facing experiences</li>
            <li>Integrating Funnel data with property management systems, CRMs, and operational workflows</li>
            <li>Building dashboards and reporting pipelines based on Funnel data</li>
            <li>Running scheduled synchronization jobs using supported sync endpoints where available</li>
            <li>Automating operational processes that depend on Funnel data and events</li>
          </DocsUl>

          <DocsP variant="body">
            Available resources and fields depend on your customer account configuration and the permissions associated
            with your credentials.
          </DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<RocketRegular />} title="Getting started" />

          <DocsP variant="body">
            For most customer integrations, the fastest path to a safe production launch is:
          </DocsP>

          <DocsUl>
            <li>
              <strong>
                <a href="/apis/customer-api/authentication" className="docs-link">
                  Authentication
                </a>
              </strong>
              : how to obtain and use credentials issued for your customer account
            </li>
            <li>
              <strong>
                <a href="/apis/customer-api/usage-and-terms" className="docs-link">
                  Usage &amp; Terms
                </a>
              </strong>
              : requirements for acceptable use, security, rate-limit expectations, and production operation
            </li>
            <li>
              <strong>
                <a href="/apis/customer-api/errors" className="docs-link">
                  Errors
                </a>
              </strong>
              : how to interpret error responses and implement reliable retries and fallbacks
            </li>
          </DocsUl>

          <DocsP variant="body">
            After completing the pages above, you can proceed to the endpoint reference sections in the left navigation.
          </DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<SettingsRegular />} title="Operational guidance" />

          <DocsP variant="body">
            Customer API integrations are typically long-lived services. To keep production usage reliable:
          </DocsP>

          <DocsUl>
            <li>
              <strong>Use backoff on retries</strong> for transient failures and follow the guidance on the Errors page.
            </li>
            <li>
              <strong>Avoid tight polling loops</strong>. Scheduled jobs are expected, but high-frequency automated
              requests that create unnecessary load are not permitted.
            </li>
            <li>
              <strong>Use sync endpoints for bulk workflows</strong> when you need to transfer or reconcile large
              amounts of data.
            </li>
            <li>
              <strong>Protect credentials</strong> using your organization’s standard secret-management practices.
            </li>
            <li>
              <strong>Plan for scaling</strong>. If you expect high request volume or frequent synchronization, contact
              support so we can recommend the right approach.
            </li>
          </DocsUl>

          <Callout type="info" title="Rate limit guidance">
            Funnel does not publish a fixed request-per-second limit for Customer APIs. Usage patterns that create
            excessive load may be throttled or blocked. For bulk synchronization, use the Listings Sync Endpoint where
            available or contact support to discuss options for your use case.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<QuestionCircleRegular />} title="Support" />

          <DocsP variant="body">
            For help with Customer API access or integration issues:
          </DocsP>

          <DocsUl>
            <li>
              Contact your <strong>Funnel customer service representative</strong> for account access, permissions, or
              onboarding questions.
            </li>
            <li>
              Email{' '}
              <a href="mailto:support@funnelleasing.com" className="docs-link">
                support@funnelleasing.com
              </a>{' '}
              for API integration support.
            </li>
            <li>
              Use the{' '}
              <a href="/apis/customer-api/errors" className="docs-link">
                Errors
              </a>{' '}
              page when troubleshooting response codes, retries, and request failures.
            </li>
          </DocsUl>
        </DocsSection>
      </div>
    </div>
  );
}
