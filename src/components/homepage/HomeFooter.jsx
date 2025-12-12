import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { Linkedin, Youtube, Github } from '@styled-icons/boxicons-logos';
import { XIcon } from '@site/src/icons';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ThemedImage from '@theme/ThemedImage';

const products = [
  {
    name: 'Online Leasing',
    href: '/online-leasing',
  },
  {
    name: 'CRM & Lead Management',
    href: '/crm',
  },
  {
    name: 'Resident Portal',
    href: '/resident-portal',
  },
  {
    name: 'AI Virtual Assistant',
    href: '/ai-virtual-assistant',
  },
  {
    name: 'Voice AI Insights',
    href: '/voice-ai-insights',
  },
  {
    name: 'Getting Started',
    href: '/getting-started',
  },
];

const developers = [
  {
    name: 'Documentation',
    href: '/',
  },
  {
    name: 'API Reference',
    href: '/api',
  },
  {
    name: 'Guides',
    href: '/guides',
  },
  {
    name: 'SDKs',
    isAccordion: true,
    content: [
      {
        name: 'React Web Core',
        href: '/react-web-core',
      },
      {
        name: 'React UI Kit',
        href: '/react-ui-kit',
      },
      {
        name: 'Angular UI Kit',
        href: '/angular-ui-kit',
      },
      {
        name: 'Flutter Core',
        href: '/flutter-core',
      },
      {
        name: 'Flutter UI Kit',
        href: '/flutter',
      },
      {
        name: 'iOS Core',
        href: '/ios-core',
      },
      {
        name: 'iOS UI Kit',
        href: '/ios',
      },
      {
        name: 'Android Core',
        href: '/android-core',
      },
      {
        name: 'Android UI Kit',
        href: '/android',
      },
      {
        name: 'React Native Core',
        href: '/rn-core',
      },
      {
        name: 'React Native UI Kit',
        href: '/react-native',
      },
    ],
  },
  {
    name: 'Release Notes',
    href: '/release-notes',
  },
];

const usecases = [
  { name: 'Lead Management', href: '/crm/lead-management' },
  { name: 'Prospect Tracking', href: '/crm/prospect-tracking' },
  { name: 'Lease Transactions', href: '/online-leasing/lease-transactions' },
  { name: 'Legal Contracts', href: '/online-leasing/legal-contracts' },
  { name: 'Screening & Fraud Prevention', href: '/online-leasing/screening-fraud-prevention' },
  { name: 'Maintenance Requests', href: '/resident-portal/maintenance-requests' },
  { name: 'Chatbot Features', href: '/ai-virtual-assistant/chatbot-features' },
  { name: 'Call Analytics', href: '/voice-ai-insights/call-analytics' },
];

const company = [
  { name: 'About Funnel', href: 'https://funnelleasing.com/about' },
  { name: 'Support', href: 'https://funnelleasing.com/support' },
  { name: 'Contact', href: 'https://funnelleasing.com/contact' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Search', href: '/search' },
  { name: 'Homepage', href: 'https://funnelleasing.com' },
];


function Safety({ className }) {
  return (
    <div
      className={clsx(
        'flex max-w-[418px] flex-row overflow-clip rounded-2xl bg-white dark:bg-[#474747] sm:flex-col sm:pr-0 sm:pb-8 lg:flex-row lg:pr-16 lg:pb-0',
        className,
      )}
    >
      <div className="flex flex-1 place-items-center justify-center rounded-2xl bg-white px-4 py-6 font-jakarta font-bold text-gray-500 dark:bg-[#474747] dark:text-[#fff]">
        Your Security,
        <br />
        Our Priority.
      </div>
      <div className="flex flex-1 items-center justify-around px-6">
        <img src="/img/soc-compliant-1.png" alt="SOC Compliant" style={{ width: '170px' }} />
      </div>
    </div>
  );
}

function Status({ className }) {
  const [status, setStatus] = useState({
    indicator: 'none',
    description: 'All Systems Operational',
  });

  useEffect(() => {
    if (typeof StatusPage !== 'undefined') {
      // eslint-disable-next-line no-undef
      var sp = new StatusPage.page({ page: 'wjlxrzb5h09l' });
      sp.status({
        success: function (data) {
          setStatus({
            indicator: data.status.indicator,
            description: data.status.description,
          });
        },
      });
    }
  }, []);

  return (
    <Link
      href="https://status.funnelleasing.com/"
      className={clsx(
        'flex items-center gap-2 rounded-lg border border-transparent p-1 px-2 font-jakarta font-semibold text-gray-500 transition-colors hover:border-gray-400 hover:bg-white hover:no-underline dark:hover:bg-[#474747]',
        className,
      )}
      target="_blank"
    >
      <div
        className={clsx(
          'h-4 w-4 rounded-full bg-[#2DB002]',
          status.indicator === 'none' ? 'bg-[#2DB002]' : 'bg-yellow-500',
        )}
      ></div>
      <div>{status.description}</div>
    </Link>
  );
}

function Links({ name, links, isAccordion }) {
  //To control accordion in footer
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (href) => {
    setActiveAccordion((prevAccordion) =>
      prevAccordion === href ? null : href,
    );
  };

  return (
    <div>
      <h3 className="font-jakarta text-base font-semibold uppercase text-gray-400 dark:text-[#fff]">
        {name}
      </h3>
      <div className="flex flex-col gap-3">
        {links.map(({ name, href, isAccordion, content }) => (
          <Link
            href={href}
            className="text-base text-gray-700 hover:text-primary hover:no-underline dark:text-[#f9f9f9]"
            onClick={() => (isAccordion ? toggleAccordion(href) : null)}
          >
            {name}
            {isAccordion && activeAccordion === href && (
              <ul style={{ paddingLeft: '1rem', listStyle: 'unset' }}>
                {content.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-base text-gray-700 hover:text-primary hover:no-underline dark:text-[#f9f9f9]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#F4F7FF] dark:bg-[#191919]">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col px-6 py-12">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ThemedImage
            alt="Funnel Leasing"
            className="h-9 w-fit lg:h-12"
            sources={{
              light: '/logo/funnel-leasing.webp',
              dark: '/logo/funnel-leasing.webp',
            }}
          />

          <Safety className="hidden lg:flex" />
          <BrowserOnly>
            {() => {
              return <Status className="lg:hidden" />;
            }}
          </BrowserOnly>
        </div>

        <hr className="my-12 !bg-gray-300 dark:!bg-[#999]" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <BrowserOnly>
            {() => {
              return <Status className="hidden lg:flex" />;
            }}
          </BrowserOnly>
          <Safety className="flex w-full max-w-full lg:hidden" />

          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            <Link
              href="https://funnelleasing.com/privacy-policy"
              className="text-inherit hover:text-black hover:underline dark:text-[#999] dark:hover:text-[#2160fd]"
            >
              Privacy Policy
            </Link>
            &bull;
            <Link
              href="https://funnelleasing.com/terms-of-service"
              className="text-inherit hover:text-black hover:underline dark:text-[#999] dark:hover:text-[#2160fd]"
            >
              Terms of Service
            </Link>
            &bull;
            <span className="text-inherit dark:text-[#999]">
              &copy; {new Date().getFullYear()} Funnel Leasing Inc.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/nestio/yoda"
              aria-label="Funnel Leasing's GitHub Organization"
            >
              <Github className="h-7 w-7 text-zinc-400 hover:text-primary" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/funnelleasing/"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-7 w-7 text-zinc-400 hover:text-primary" />
            </Link>
            <Link href="https://twitter.com/funnelleasing" aria-label="Twitter">
              <XIcon className="h-7 w-7 text-zinc-400 hover:text-primary" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCzDmikmKU694trssiGpmgIg"
              aria-label="Funnel Leasing YouTube Channel"
            >
              <Youtube className="h-7 w-7 text-zinc-400 hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


