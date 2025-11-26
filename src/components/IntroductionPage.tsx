import React from 'react';
import Callout from './Callout';
import SectionHeader from './SectionHeader';
import ModernTable, { type TableColumn, type TableRow } from './ModernTable';
import {
  DocumentRegular,
  ShieldCheckmarkRegular,
  SettingsRegular,
  KeyRegular,
  LockClosedRegular,
  CheckmarkCircleRegular,
  DismissCircleRegular,
  QuestionCircleRegular,
} from '@fluentui/react-icons';

export default function IntroductionPage() {
  const requiredProhibitedColumns: TableColumn[] = [
    {
      header: (
        <div className="flex items-center gap-2">
          <CheckmarkCircleRegular className="w-4 h-4 text-emerald-600" />
          Required Actions
        </div>
      ),
    },
    {
      header: (
        <div className="flex items-center gap-2">
          <DismissCircleRegular className="w-4 h-4 text-red-600" />
          Prohibited Actions
        </div>
      ),
    },
  ];

  const requiredProhibitedRows: TableRow[] = [
    {
      cells: [
        'Remove from Licensee\'s Application within 24 hours any content that Funnel asks you to remove in its reasonable discretion',
        'Use the Funnel API for any application that replicates or attempts to replace the unique essential user experience of Funnel\'s websites, software or services',
      ],
    },
    {
      cells: [
        'Use commercially reasonable efforts to provide reasonable support to users of the Funnel API services on your system',
        'Use the Funnel API to spam, incentivize, or harass users',
      ],
    },
    {
      cells: [
        'Comply with applicable law',
        'Use the Funnel API to post automated content to Funnel, except where authorized by Funnel or as necessary to carry out a permissible transaction',
      ],
    },
    {
      cells: [
        'Disclose in Licensee\'s Application through a privacy policy or other appropriate means, how you collect, use, store, and disclose data collected from visitors, including where applicable, that third parties (including advertisers) may serve content and/or advertisements and collect information directly from visitors and may place or recognize cookies on visitors\' browsers',
        'Attempt to cloak or conceal your identity or Licensee\'s Application\'s identity when requesting authorization to use the Funnel API',
      ],
    },
    {
      cells: [
        '',
        'Use or access the Funnel API in order to monitor the availability, performance, or functionality of the Funnel API, any Funnel service or for any similar benchmarking purposes',
      ],
    },
    {
      cells: [
        '',
        'Cache or store any Content other than for reasonable periods in order to provide the service you are providing',
      ],
    },
    {
      cells: [
        '',
        'Use the Funnel API for any application that constitutes, promotes or is used in connection with spyware, adware, or any other malicious programs or code',
      ],
    },
    {
      cells: [
        '',
        'Use the Funnel API in any manner or for any purpose that violates any law or regulation, or any rights of any person, including but not limited to intellectual property rights, rights of privacy, rights of personality, and applicable fair housing law',
      ],
    },
    {
      cells: [
        '',
        'Use the Funnel API as a generic image hosting service for banner advertisements, graphics, etc.',
      ],
    },
    {
      cells: [
        '',
        'Use the Funnel API in a manner that adversely impacts the stability of Funnel\'s websites or servers, or that adversely impacts the behavior of other applications using the Funnel API',
      ],
    },
    {
      cells: [
        '',
        'Sell, lease, or sublicense the Funnel API or access thereto or derive revenues from the use or provision of the Funnel API, whether for direct commercial or monetary gain or otherwise, except as specifically authorized by Funnel in writing',
      ],
    },
  ];

  return (
    <div className="introduction-page">
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight" style={{ color: 'var(--docs-color-text)' }}>
          Funnel API Terms of Use
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Welcome to the Funnel API documentation. This guide provides an overview of the Funnel API, its terms of use, and guidelines for integrating it into your applications. By using the Funnel API, you agree to the terms outlined in this document.
        </p>
      </div>

      <Callout type="info" title="Need Help?">
        If you have any questions or need support, please contact your Funnel customer service representative or email{' '}
        <a href="mailto:support@funnelleasing.com" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
          support@funnelleasing.com
        </a>
        .
      </Callout>

      <section className="mb-12">
        <SectionHeader
          icon={<DocumentRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Terms of Use"
        />

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          This API License Agreement ("Agreement") is a legally binding contract between you, as Licensee ("You" or "Licensee") and Funnel Leasing, Inc. ("Funnel") and applies to your use of Funnel's application programming interface and its associated documentation (including, without limitation, the Developer Documentation described in Section 2 below) ("Funnel API") that is designed to permit Licensee to receive data and content ("Content") from Funnel so that Licensee can create an application or service or enhance an existing application or service ("Licensee's Application").
        </p>

        <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          By using the Funnel API, you agree to the terms below. If you disagree with any of these terms, Funnel does not grant you a license to use the Funnel API.
        </p>

        <Callout type="warning" title="Important Notice">
          Funnel reserves the right to update and change these terms from time to time without notice to you. You should check the Agreement periodically for changes. By using the Funnel API after Funnel makes any changes to the Agreement available on our Developer Site (described in Section 2 below), you agree to accept those changes, whether or not you have reviewed them.
        </Callout>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Your license to the Funnel API under these terms continues until it is terminated by either party. You may terminate the license by discontinuing use of the Funnel API. Funnel may terminate the license at any time for any reason. Your right to use the Funnel API terminates automatically if:
        </p>

        <ul className="mb-4 list-disc space-y-2 pl-6 text-base" style={{ color: 'var(--docs-color-text-100)' }}>
          <li>You violate any of these terms</li>
          <li>Funnel sends a written notice of termination to you</li>
          <li>Funnel disables your access to the Funnel API</li>
        </ul>

        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Upon termination of this Agreement for any reason, you shall cease using, and either return to Funnel, or destroy and remove from all computers, hard drives, networks, and other storage media, all copies of any materials licensed pursuant to this Agreement and any Confidential Information (defined below) in your possession and shall certify to Funnel that such actions have occurred. Sections 4, 5 and 7 through 9 shall survive termination of this Agreement.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<SettingsRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Rate Limits"
        />

        <Callout type="info" title="Rate Limit Policy">
          Funnel does not enforce a specific rate limit for requests made to our API, but simply asks that you be reasonable and polite. We will not limit your usage for normal website traffic, but we ask that you do not hammer our API with rapid requests made by an automated script. If you do, we will revoke your API access.
        </Callout>

        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          If you have a use case that requires polling the API data for changes on a regular basis, or syncing large amounts of data at one time from the API to your system, we require using the <strong>Listings Sync Endpoint</strong>. We also have other technical solutions available that might better suit your needs. Please contact us, and we can discuss technical solutions that are mutually satisfactory.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<KeyRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="License Grant"
        />

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Subject to the terms and conditions of this Agreement, Funnel grants to you a revocable, non-exclusive, non-transferable, non-sublicensable, limited license to use the Funnel API during the term of this Agreement.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          The Funnel API license allows you to do only the following:
        </p>

        <ul className="mb-6 list-disc space-y-2 pl-6 text-base" style={{ color: 'var(--docs-color-text-100)' }}>
          <li>Use the Funnel API to develop, test and support Licensee's Application</li>
          <li>Distribute or allow access to Licensee's integration of the API within Licensee's Application</li>
          <li>Display the Content received from the Funnel API within Licensee's Application</li>
        </ul>

        <Callout type="warning">
          Licensee has no right to distribute or allow access to the stand-alone Funnel API.
        </Callout>

        <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          To use and access the Funnel API, you must obtain API credentials (a "Token"). You may not share your Token with any third party, shall keep such Token and all login information secure, and shall use the Token as the sole means of accessing the Funnel API.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<DocumentRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Developer Documentation"
        />

        <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Licensee's use of the Funnel API must comply with the technical documentation, usage guidelines, and other documentation ("Developer Documentation") maintained at Funnel's developer site located at{' '}
          <a href="https://developer.funnelleasing.com" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
            https://developer.funnelleasing.com
          </a>{' '}
          ("Developer Site").
        </p>

        <Callout type="info">
          If there is a conflict between the Developer Documentation and this Agreement, this Agreement shall control.
        </Callout>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<ShieldCheckmarkRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="License Uses and Restrictions"
        />

        <p className="mb-6 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          The following table outlines the actions you are required to take and those that are prohibited when using the Funnel API:
        </p>

        <div className="mb-6">
          <ModernTable
            columns={requiredProhibitedColumns}
            rows={requiredProhibitedRows}
          />
        </div>

        <Callout type="warning">
          Funnel reserves the right to rate limit or block applications that make a large number of calls to the Funnel API that are not primarily in response to direct user actions.
        </Callout>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<CheckmarkCircleRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Intellectual Property"
        />

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Except as otherwise provided in this Agreement, as between Funnel and you, Funnel retains all right, title and interest in and to all intellectual property rights (including without limitation all patent, trademark, copyright, trade dress, trade secrets and all other intellectual property rights) embodied in or associated with the "Funnel" name or logos, Funnel API, any Funnel websites, software, and services and any content created or derived therefrom.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          This Agreement does not create any implied licenses and Funnel expressly reserves all rights not expressly granted to you through this Agreement.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          You grant to Funnel a non-exclusive, worldwide, fully paid-up, royalty-free license, for as long as Licensee's Application is published to:
        </p>

        <ul className="mb-4 list-disc space-y-2 pl-6 text-base" style={{ color: 'var(--docs-color-text-100)' }}>
          <li>Permit others to access, install, purchase and (in the case of downloadable software applications) download such Licensee Application</li>
          <li>Use, perform, and display such Licensee Application</li>
        </ul>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          You further grant to Funnel a non-exclusive, worldwide, fully paid-up, royalty-free license to use your name, Licensee Application name(s) and associated logos (collectively, "Licensee Marks") solely to enable Funnel to exercise its rights and perform its obligations under this Agreement. Any use of Licensee's Marks shall be in accordance with your reasonable trademark usage policies if such policies are communicated in writing to Funnel.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Funnel shall have a royalty-free, fully paid-up, worldwide, transferable, sub-licensable, irrevocable and perpetual license to implement, use, modify, commercially exploit and/or incorporate into its software, services, websites and/or the Funnel API any suggestions, enhancement requests, recommendations or other feedback Funnel receives from you and your users.
        </p>

        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Funnel agrees that you retain all right, title and interest in the Licensee Application.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<LockClosedRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Confidential Information and Data Privacy"
        />

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          The Funnel API (including, without limitation, all improvements, derivatives, modifications, and the like), the Token, and any other information related to Funnel's business which is of proprietary or confidential nature constitutes Funnel's confidential information ("Confidential Information").
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Licensee hereby agrees to:
        </p>

        <ul className="mb-4 list-disc space-y-2 pl-6 text-base" style={{ color: 'var(--docs-color-text-100)' }}>
          <li>Hold the Confidential Information in confidence and take reasonable precautions to protect such Confidential Information (including, without limitation, all precautions Licensee employs with respect to its own confidential information)</li>
          <li>Not divulge any Confidential Information to any third person (except consultants, subject to the conditions stated below)</li>
          <li>Not use any Confidential Information except for the purposes set forth in this Agreement</li>
          <li>Not copy or reverse engineer any Confidential Information</li>
        </ul>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Any employee or consultant given access to the Confidential Information must have a legitimate "need to know" and shall be similarly bound in writing. Licensee acknowledges and agrees that due to the unique nature of the Confidential Information, there may be no adequate remedy at law for any breach of its obligations hereunder and therefore, that upon any such breach or any threat thereof, Funnel shall be entitled to seek appropriate equitable relief in addition to whatever remedies it might have at law.
        </p>

        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Please read Funnel's{' '}
          <a href="https://funnelleasing.com/privacy-policy/" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
            Privacy Policy
          </a>{' '}
          for more information about how Funnel collects and uses personal information about you when you use and interact with the Funnel API.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<QuestionCircleRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Support"
        />

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Funnel may elect to provide you with support or modifications for the Funnel API (collectively, "Support"), in its sole discretion, and may terminate such Support at any time without notice to you.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Funnel may change, suspend, or discontinue any aspect of the Funnel API at any time, including the availability of any Funnel API. Funnel may also impose limits on certain features and services or restrict your access to parts or all the Funnel API without notice or liability.
        </p>

        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Notwithstanding the foregoing, Licensee agrees to report to Funnel any errors or difficulties discovered and the characteristic conditions and symptoms of such errors or difficulties.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<DismissCircleRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Warranty Disclaimer; Limitation of Liability"
        />

        <Callout type="warning" title="Legal Notice">
          THE FUNNEL API AND DEVELOPER DOCUMENTATION ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND AND TO THE FULLEST EXTENT PERMITTED BY LAW, AND FUNNEL EXPRESSLY DISCLAIMS ANY AND ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </Callout>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          You acknowledge that Funnel does not warrant that the Funnel API will be uninterrupted, timely, secure, error-free or free from viruses or other malicious software, and no information or advice obtained by you from Funnel, through the Developer Documentation or elsewhere shall create any warranty not expressly stated in this Agreement.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          You understand and agree that any content obtained through the use of the Funnel API is at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data or business interruption that results from the download of content. Funnel shall not be responsible for any loss or damage caused, or alleged to have been caused, directly or indirectly, by the information or Funnel or content referenced in, appearing in or accessed through the Funnel API.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Except for Licensee's indemnification obligations and confidentiality obligations, under no circumstances and under no legal theory (whether in contract, tort, negligence or otherwise) will either party to this Agreement, or their officers, directors, employees, agents, suppliers or licensors be liable to the other party or any third party for any lost profits, lost sales or business, lost data, business interruption, loss of goodwill, or for any type of indirect, incidental, special, exemplary, consequential or punitive loss or damages, or any other loss or damages incurred by such party or third party in connection with this Agreement, the Funnel API, or the Developer Documentation, regardless of whether such party has been advised of the possibility of or could have foreseen such damages.
        </p>

        <p className="mb-4 text-base leading-relaxed font-semibold" style={{ color: 'var(--docs-color-text)' }}>
          Funnel's total cumulative liability for any and all claims in connection with this Agreement, the Funnel API, the Developer Documentation and any content received utilizing the Funnel API shall not exceed one hundred dollars ($100.00).
        </p>

        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          You acknowledge and agree that the foregoing limitations on liability are an essential basis of the bargain and that Funnel would not provide access to the Funnel website absent such limitation. Some jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply to Licensee. In these jurisdictions, Funnel's liability will be limited to the greatest extent permitted by law. The limitations in this Section 7 will survive and apply even if any limited remedy specified in this Agreement is found to have failed of its essential purpose.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<ShieldCheckmarkRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Indemnification"
        />
        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          You agree to indemnify and hold harmless Funnel, including its officers, directors, employees, agents, suppliers and licensors from any and all claims, damages, liabilities, costs and fees (including reasonable attorneys' fees) arising from:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-base" style={{ color: 'var(--docs-color-text-100)' }}>
          <li>Any use Licensee makes of the Funnel API</li>
          <li>Licensee's Application</li>
        </ul>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<DocumentRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="General Terms"
        />
        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          This Agreement shall be governed by and construed under the laws of the State of Florida without giving effect to the principles of conflicts of law. All disputes arising in connection with this Agreement shall be subject to the sole and exclusive jurisdiction and venue of the state and Federal courts located in Tampa, Florida.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          No waiver of rights under this Agreement by either party shall constitute a subsequent waiver of any right under this Agreement and all waivers must be in writing. If any term of this Agreement is held by a court to be unenforceable, such provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect and enforceable.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          Licensee may not assign or transfer this Agreement (or any part hereof) without the prior written consent of Funnel. This Agreement does not create, and nothing contained in this Agreement shall be deemed to establish, a joint venture between Funnel and Licensee, or the relationship of employer-employee, partners, principal-agent or the like.
        </p>

        <p className="mb-4 text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          All notices required or permitted under this Agreement will be in writing and sent:
        </p>

        <ul className="mb-4 list-disc space-y-2 pl-6 text-base" style={{ color: 'var(--docs-color-text-100)' }}>
          <li>
            If to Funnel: <a href="mailto:apisupport@funnelleasing.com" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">apisupport@funnelleasing.com</a>
          </li>
          <li>If to Licensee: at such email address as Licensee provides to Funnel on registering for the API (or, in either case, such address as a party may designate in writing)</li>
        </ul>

        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          This Agreement and the Privacy Policy sets forth the entire understanding and agreement of the parties regarding the Funnel API and related Content and supersedes any and all oral or written agreements or understandings between the parties with respect thereto.
        </p>
      </section>

      <section className="mb-12">
        <SectionHeader
          icon={<CheckmarkCircleRegular className="w-6 h-6" style={{ color: 'var(--docs-color-text)' }} />}
          title="Powered By Funnel"
        />
        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          If you are using the Funnel API in your website or application, we request that you include one of our approved "Powered By Funnel" logos on the page(s) where the API is used.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t" style={{ borderColor: '#e5e7eb' }}>
        <p className="text-base leading-relaxed" style={{ color: 'var(--docs-color-text-100)' }}>
          For further assistance, contact your Funnel customer service representative or email{' '}
          <a href="mailto:support@funnelleasing.com" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
            support@funnelleasing.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
