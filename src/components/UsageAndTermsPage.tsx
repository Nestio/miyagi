import React from 'react';
import Callout from './Callout';
import SectionHeader from './SectionHeader';
import ModernTable, { type TableColumn, type TableRow } from './ModernTable';
import { DocsH1, DocsH3, DocsP, DocsUl, DocsDivider, DocsSection } from './DocsPrimitives';
import {
  DocumentRegular,
  ShieldCheckmarkRegular,
  SettingsRegular,
  KeyRegular,
  LockClosedRegular,
  CheckmarkCircleRegular,
  DismissCircleRegular,
  QuestionCircleRegular,
  CodeRegular,
} from '@fluentui/react-icons';

export default function UsageAndTermsPage() {
  const EMPTY = <span style={{ color: 'var(--text-empty)' }}>—</span>;

  const requiredProhibitedColumns: TableColumn[] = [
    {
      header: (
        <div className="flex items-baseline gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5">
            <span className="inline-flex -translate-y-[0.5px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:block">
              <CheckmarkCircleRegular className="text-emerald-600/70" style={{ display: 'block' }} />
            </span>
          </span>
          Required Actions
        </div>
      ),
    },
    {
      header: (
        <div className="flex items-baseline gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5">
            <span className="inline-flex -translate-y-[0.5px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:block">
              <DismissCircleRegular className="text-red-600/70" style={{ display: 'block' }} />
            </span>
          </span>
          Prohibited Actions
        </div>
      ),
    },
  ];

  const requiredProhibitedRows: TableRow[] = [
    {
      cells: [
        "Remove from Licensee's Application within 24 hours any content that Funnel asks you to remove in its reasonable discretion",
        "Use the Funnel API for any application that replicates or attempts to replace the unique essential user experience of Funnel's websites, software or services",
      ],
    },
    {
      cells: [
        'Use commercially reasonable efforts to provide reasonable support to users of the Funnel API services on your system',
        'Use the Funnel API to spam, incentivize, or harass users',
      ],
    },
    {
      cells: ['Comply with applicable law', 'Use the Funnel API to post automated content to Funnel, except where authorized by Funnel or as necessary to carry out a permissible transaction'],
    },
    {
      cells: [
        "Disclose in Licensee's Application through a privacy policy or other appropriate means, how you collect, use, store, and disclose data collected from visitors, including where applicable, that third parties (including advertisers) may serve content and/or advertisements and collect information directly from visitors and may place or recognize cookies on visitors' browsers",
        "Attempt to cloak or conceal your identity or Licensee's Application's identity when requesting authorization to use the Funnel API",
      ],
    },
    {
      cells: [
        EMPTY,
        'Use or access the Funnel API in order to monitor the availability, performance, or functionality of the Funnel API, any Funnel service or for any similar benchmarking purposes',
      ],
    },
    {
      cells: [EMPTY, 'Cache or store any Content other than for reasonable periods in order to provide the service you are providing'],
    },
    {
      cells: [EMPTY, 'Use the Funnel API for any application that constitutes, promotes or is used in connection with spyware, adware, or any other malicious programs or code'],
    },
    {
      cells: [
        EMPTY,
        'Use the Funnel API in any manner or for any purpose that violates any law or regulation, or any rights of any person, including but not limited to intellectual property rights, rights of privacy, rights of personality, and applicable fair housing law',
      ],
    },
    {
      cells: [EMPTY, 'Use the Funnel API as a generic image hosting service for banner advertisements, graphics, etc.'],
    },
    {
      cells: [
        EMPTY,
        "Use the Funnel API in a manner that adversely impacts the stability of Funnel's websites or servers, or that adversely impacts the behavior of other applications using the Funnel API",
      ],
    },
    {
      cells: [
        EMPTY,
        'Sell, lease, or sublicense the Funnel API or access thereto or derive revenues from the use or provision of the Funnel API, whether for direct commercial or monetary gain or otherwise, except as specifically authorized by Funnel in writing',
      ],
    },
  ];

  return (
    <div className="usage-and-terms-page">
      <div className="max-w-[760px] mx-auto px-8">
        <div className="docs-intro">
          <DocsH1>Funnel Customer API Usage &amp; Terms</DocsH1>
          <DocsP variant="lead">
            This page defines the legal, security, and operational requirements for using Funnel Customer APIs in production. By using the Funnel API, you agree to the terms below.
          </DocsP>
          <DocsDivider />
        </div>

        <Callout type="warning" title="Legally binding terms">
          This page contains a legally binding agreement that governs your use of the Funnel Customer APIs. If you are implementing an integration on behalf of a Funnel customer (for example, as a development partner), confirm you are authorized by that customer to access and use the APIs under their account.
        </Callout>

        <Callout type="info" title="Related documentation">
          For technical implementation details, see{' '}
          <a href="/apis/customer-api/authentication" className="docs-link">
            Authentication
          </a>{' '}
          and{' '}
          <a href="/apis/customer-api/errors" className="docs-link">
            Errors
          </a>
          .
        </Callout>

        <DocsSection>
          <SectionHeader icon={<DocumentRegular />} title="Terms of Use" />

          <DocsP>
            This API License Agreement ("Agreement") is a legally binding contract between you, as Licensee ("You" or "Licensee") and Funnel Leasing, Inc. ("Funnel") and applies to your use of Funnel's application programming interface and its associated documentation (including, without limitation, the Developer Documentation described in Section 2 below) ("Funnel API").
          </DocsP>
          <DocsP>
            The Funnel API is designed to permit Licensee to receive data and content ("Content") from Funnel so that Licensee can create an application or service or enhance an existing application or service ("Licensee's Application").
          </DocsP>

          <DocsP>
            By using the Funnel API, you agree to the terms below. If you disagree with any of these terms, Funnel does not grant you a license to use the Funnel API.
          </DocsP>

          <Callout type="warning" title="Important Notice">
            Funnel reserves the right to update and change these terms from time to time without notice to you. You should check the Agreement periodically for changes. By using the Funnel API after Funnel makes any changes to the Agreement available on our Developer Site (described in Section 2 below), you agree to accept those changes, whether or not you have reviewed them.
          </Callout>

          <DocsP>
            Your license to the Funnel API under these terms continues until it is terminated by either party. You may terminate the license by discontinuing use of the Funnel API. Funnel may terminate the license at any time for any reason.
          </DocsP>
          <DocsP>Your right to use the Funnel API terminates automatically if:</DocsP>

          <DocsUl>
            <li>You violate any of these terms</li>
            <li>Funnel sends a written notice of termination to you</li>
            <li>Funnel disables your access to the Funnel API</li>
          </DocsUl>

          <DocsP>
            Upon termination of this Agreement for any reason, you shall cease using, and either return to Funnel, or destroy and remove from all computers, hard drives, networks, and other storage media, all copies of any materials licensed pursuant to this Agreement and any Confidential Information (defined below) in your possession and shall certify to Funnel that such actions have occurred.
          </DocsP>
          <DocsP>Sections 4, 5 and 7 through 9 shall survive termination of this Agreement.</DocsP>
        </DocsSection>

        <Callout type="info" title="Need help">
          If you have questions about these terms or your intended API usage, contact your Funnel customer service representative or email{' '}
          <a href="mailto:support@funnelleasing.com" className="docs-link">
            support@funnelleasing.com
          </a>
          .
        </Callout>

        <DocsSection>
          <SectionHeader icon={<SettingsRegular />} title="Rate Limits" />

          <Callout type="info" title="Rate Limit Policy">
            Funnel does not enforce a specific rate limit for requests made to our API, but simply asks that you be reasonable and polite. We will not limit your usage for normal website traffic, but we ask that you do not hammer our API with rapid requests made by an automated script. If you do, we will revoke your API access.
          </Callout>

          <DocsP variant="body">
            If you have a use case that requires polling the API data for changes on a regular basis, or syncing large amounts of data at one time from the API to your system, we require using the <strong>Listings Sync Endpoint</strong>. We also have other technical solutions available that might better suit your needs. Please contact us, and we can discuss technical solutions that are mutually satisfactory.
          </DocsP>

          <Callout type="info" title="Operational guidance">
            In production integrations, avoid high-frequency polling loops. Use scheduled synchronization patterns where appropriate and implement retries with backoff. If you expect high volume or frequent synchronization, contact support so we can recommend the best approach for your use case.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<KeyRegular />} title="License Grant" />

          <DocsP>
            Subject to the terms and conditions of this Agreement, Funnel grants to you a revocable, non-exclusive, non-transferable, non-sublicensable, limited license to use the Funnel API during the term of this Agreement.
          </DocsP>

          <DocsP>The Funnel API license allows you to do only the following:</DocsP>

          <DocsUl>
            <li>Use the Funnel API to develop, test and support Licensee's Application</li>
            <li>Distribute or allow access to Licensee's integration of the API within Licensee's Application</li>
            <li>Display the Content received from the Funnel API within Licensee's Application</li>
          </DocsUl>

          <Callout type="warning">Licensee has no right to distribute or allow access to the stand-alone Funnel API.</Callout>

          <DocsP>
            To use and access the Funnel API, you must obtain API credentials (a "Token"). You may not share your Token with any third party, shall keep such Token and all login information secure, and shall use the Token as the sole means of accessing the Funnel API.
          </DocsP>

          <Callout type="info" title="Terminology">
            In the Agreement below, API credentials are referred to as a Token. In the Funnel Customer API documentation, these credentials may also be described as an API key.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<CodeRegular />} title="Developer Documentation" />

          <DocsP variant="body">
            Licensee's use of the Funnel API must comply with the technical documentation, usage guidelines, and other documentation ("Developer Documentation") maintained at Funnel's developer site located at{' '}
            <a href="https://developer.funnelleasing.com" className="docs-link" target="_blank" rel="noopener noreferrer">
              https://developer.funnelleasing.com
            </a>{' '}
            ("Developer Site").
          </DocsP>

          <Callout type="info">If there is a conflict between the Developer Documentation and this Agreement, this Agreement shall control.</Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<ShieldCheckmarkRegular />} title="License Uses and Restrictions" />

          <DocsP variant="body">
            The following table outlines the actions you are required to take and those that are prohibited when using the Funnel API:
          </DocsP>

          <div className="mb-4">
            <ModernTable columns={requiredProhibitedColumns} rows={requiredProhibitedRows} />
          </div>

          <Callout type="warning">
            Funnel reserves the right to rate limit or block applications that make a large number of calls to the Funnel API that are not primarily in response to direct user actions.
          </Callout>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<CheckmarkCircleRegular />} title="Intellectual Property" />

          <DocsP>
            Except as otherwise provided in this Agreement, as between Funnel and you, Funnel retains all right, title and interest in and to all intellectual property rights (including without limitation all patent, trademark, copyright, trade dress, trade secrets and all other intellectual property rights) embodied in or associated with the "Funnel" name or logos, Funnel API, any Funnel websites, software, and services.
          </DocsP>
          <DocsP>This includes any content created or derived therefrom.</DocsP>

          <DocsP>This Agreement does not create any implied licenses and Funnel expressly reserves all rights not expressly granted to you through this Agreement.</DocsP>

          <DocsP>
            You grant to Funnel a non-exclusive, worldwide, fully paid-up, royalty-free license, for as long as Licensee's Application is published to:
          </DocsP>

          <DocsUl>
            <li>Permit others to access, install, purchase and (in the case of downloadable software applications) download such Licensee Application</li>
            <li>Use, perform, and display such Licensee Application</li>
          </DocsUl>

          <DocsP>
            You further grant to Funnel a non-exclusive, worldwide, fully paid-up, royalty-free license to use your name, Licensee Application name(s) and associated logos (collectively, "Licensee Marks") solely to enable Funnel to exercise its rights and perform its obligations under this Agreement.
          </DocsP>
          <DocsP>Any use of Licensee's Marks shall be in accordance with your reasonable trademark usage policies if such policies are communicated in writing to Funnel.</DocsP>

          <DocsP>
            Funnel shall have a royalty-free, fully paid-up, worldwide, transferable, sub-licensable, irrevocable and perpetual license to implement, use, modify, commercially exploit and/or incorporate into its software, services, websites and/or the Funnel API any suggestions, enhancement requests, recommendations or other feedback Funnel receives from you and your users.
          </DocsP>

          <DocsP>Funnel agrees that you retain all right, title and interest in the Licensee Application.</DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<LockClosedRegular />} title="Confidential Information and Data Privacy" />

          <DocsP>
            The Funnel API (including, without limitation, all improvements, derivatives, modifications, and the like), the Token, and any other information related to Funnel's business which is of proprietary or confidential nature constitutes Funnel's confidential information ("Confidential Information").
          </DocsP>

          <DocsP>Licensee hereby agrees to:</DocsP>

          <DocsUl>
            <li>Hold the Confidential Information in confidence and take reasonable precautions to protect such Confidential Information (including, without limitation, all precautions Licensee employs with respect to its own confidential information)</li>
            <li>Not divulge any Confidential Information to any third person (except consultants, subject to the conditions stated below)</li>
            <li>Not use any Confidential Information except for the purposes set forth in this Agreement</li>
            <li>Not copy or reverse engineer any Confidential Information</li>
          </DocsUl>

          <DocsP>
            Any employee or consultant given access to the Confidential Information must have a legitimate "need to know" and shall be similarly bound in writing.
          </DocsP>
          <DocsP>
            Licensee acknowledges and agrees that due to the unique nature of the Confidential Information, there may be no adequate remedy at law for any breach of its obligations hereunder and therefore, that upon any such breach or any threat thereof, Funnel shall be entitled to seek appropriate equitable relief in addition to whatever remedies it might have at law.
          </DocsP>

          <DocsP>
            Please read Funnel's{' '}
            <a href="https://funnelleasing.com/privacy-policy/" className="docs-link" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            for more information about how Funnel collects and uses personal information about you when you use and interact with the Funnel API.
          </DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<QuestionCircleRegular />} title="Support" />

          <DocsP>
            Funnel may elect to provide you with support or modifications for the Funnel API (collectively, "Support"), in its sole discretion, and may terminate such Support at any time without notice to you.
          </DocsP>

          <DocsP>
            Funnel may change, suspend, or discontinue any aspect of the Funnel API at any time, including the availability of any Funnel API. Funnel may also impose limits on certain features and services or restrict your access to parts or all the Funnel API without notice or liability.
          </DocsP>

          <DocsP>
            Notwithstanding the foregoing, Licensee agrees to report to Funnel any errors or difficulties discovered and the characteristic conditions and symptoms of such errors or difficulties.
          </DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<DismissCircleRegular />} title="Warranty Disclaimer; Limitation of Liability" />

          <Callout type="warning" title="Legal Notice">
            <div
              style={{
                fontSize: '13px',
                lineHeight: '20px',
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
              }}
            >
              THE FUNNEL API AND DEVELOPER DOCUMENTATION ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY KIND AND TO THE FULLEST EXTENT PERMITTED BY LAW, AND FUNNEL EXPRESSLY DISCLAIMS ANY AND ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </div>
          </Callout>

          <DocsP>
            You acknowledge that Funnel does not warrant that the Funnel API will be uninterrupted, timely, secure, error-free or free from viruses or other malicious software, and no information or advice obtained by you from Funnel, through the Developer Documentation or elsewhere shall create any warranty not expressly stated in this Agreement.
          </DocsP>

          <DocsP>
            You understand and agree that any content obtained through the use of the Funnel API is at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data or business interruption that results from the download of content.
          </DocsP>
          <DocsP>
            Funnel shall not be responsible for any loss or damage caused, or alleged to have been caused, directly or indirectly, by the information or Funnel or content referenced in, appearing in or accessed through the Funnel API.
          </DocsP>

          <DocsP>
            Except for Licensee's indemnification obligations and confidentiality obligations, under no circumstances and under no legal theory (whether in contract, tort, negligence or otherwise) will either party to this Agreement, or their officers, directors, employees, agents, suppliers or licensors be liable to the other party or any third party for any lost profits, lost sales or business, lost data, business interruption, loss of goodwill, or for any type of indirect, incidental, special, exemplary, consequential or punitive loss or damages.
          </DocsP>
          <DocsP>
            This limitation applies to any other loss or damages incurred by such party or third party in connection with this Agreement, the Funnel API, or the Developer Documentation, regardless of whether such party has been advised of the possibility of or could have foreseen such damages.
          </DocsP>

          <DocsP className="font-semibold">
            Funnel's total cumulative liability for any and all claims in connection with this Agreement, the Funnel API, the Developer Documentation and any content received utilizing the Funnel API shall not exceed one hundred dollars ($100.00).
          </DocsP>

          <DocsP>
            You acknowledge and agree that the foregoing limitations on liability are an essential basis of the bargain and that Funnel would not provide access to the Funnel website absent such limitation. Some jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply to Licensee. In these jurisdictions, Funnel's liability will be limited to the greatest extent permitted by law. The limitations in this Section 7 will survive and apply even if any limited remedy specified in this Agreement is found to have failed of its essential purpose.
          </DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<ShieldCheckmarkRegular />} title="Indemnification" />

          <DocsP>
            You agree to indemnify and hold harmless Funnel, including its officers, directors, employees, agents, suppliers and licensors from any and all claims, damages, liabilities, costs and fees (including reasonable attorneys' fees) arising from:
          </DocsP>
          <DocsUl>
            <li>Any use Licensee makes of the Funnel API</li>
            <li>Licensee's Application</li>
          </DocsUl>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<DocumentRegular />} title="General Terms" />

          <DocsP>
            This Agreement shall be governed by and construed under the laws of the State of Florida without giving effect to the principles of conflicts of law. All disputes arising in connection with this Agreement shall be subject to the sole and exclusive jurisdiction and venue of the state and Federal courts located in Tampa, Florida.
          </DocsP>

          <DocsP>
            No waiver of rights under this Agreement by either party shall constitute a subsequent waiver of any right under this Agreement and all waivers must be in writing. If any term of this Agreement is held by a court to be unenforceable, such provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect and enforceable.
          </DocsP>

          <DocsP>
            Licensee may not assign or transfer this Agreement (or any part hereof) without the prior written consent of Funnel. This Agreement does not create, and nothing contained in this Agreement shall be deemed to establish, a joint venture between Funnel and Licensee, or the relationship of employer-employee, partners, principal-agent or the like.
          </DocsP>

          <DocsP>All notices required or permitted under this Agreement will be in writing and sent:</DocsP>

          <DocsUl>
            <li>
              If to Funnel:{' '}
              <a href="mailto:apisupport@funnelleasing.com" className="docs-link">
                apisupport@funnelleasing.com
              </a>
            </li>
            <li>
              If to Licensee: at such email address as Licensee provides to Funnel on registering for the API (or, in either case, such address as a party may designate in writing)
            </li>
          </DocsUl>

          <DocsP>
            This Agreement and the Privacy Policy sets forth the entire understanding and agreement of the parties regarding the Funnel API and related Content and supersedes any and all oral or written agreements or understandings between the parties with respect thereto.
          </DocsP>
        </DocsSection>

        <DocsSection>
          <SectionHeader icon={<DocumentRegular />} title="Attribution" />

          <DocsP variant="muted">
            If you are using the Funnel API in your website or application, we request that you include one of our approved &quot;Powered By Funnel&quot; logos on the page(s) where the API is used.
          </DocsP>
          <DocsP variant="muted">
            For further assistance, contact your Funnel customer service representative or email{' '}
            <a href="mailto:support@funnelleasing.com" className="docs-link">
              support@funnelleasing.com
            </a>
            .
          </DocsP>
        </DocsSection>
      </div>
    </div>
  );
}
