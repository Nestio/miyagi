const { themes } = require('prism-react-renderer');
const fs = require('fs');
const path = require('path');

const code_themes = {
  light: themes.github,
  dark: themes.dracula,
};

/** @type {import('@docusaurus/types').Config} */
const meta = {
  title: 'Funnel Leasing Docs',
  tagline:
    'Explore comprehensive documentation for Funnel Leasing products, including guides, references, and best practices.',
  url: 'https://docs.funnelleasing.com',
  baseUrl: '/',
  favicon: '/logo/favicon.png',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
};

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const defaultSettings = {
  breadcrumbs: true,
  editUrl: 'https://github.com/Nestio/miyagi/tree/main/',
  showLastUpdateTime: true,
  sidebarCollapsible: true,
  remarkPlugins: [
    [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
  ],
  sidebarPath: require.resolve('./sidebars-default.js'),
};

/**
 * Create a section
 * @param {import('@docusaurus/plugin-content-docs').Options} options
 */
function create_doc_plugin({
  sidebarPath = require.resolve('./sidebars-default.js'),
  ...options
}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      ...defaultSettings,
      sidebarPath,
      ...options,
    }),
  ];
}

const { webpackPlugin } = require('./plugins/webpack-plugin.cjs');
const tailwindPlugin = require('./plugins/tailwind-plugin.cjs');

const plugins = [
  tailwindPlugin,
  webpackPlugin,
  [
    '@docusaurus/plugin-client-redirects',
    {},
  ],
  // Customer API docs
  create_doc_plugin({
    id: 'customer-api',
    path: 'docs/apis/customer-api',
    routeBasePath: '/apis/customer-api',
    sidebarPath: require.resolve('./sidebars-default.js'),
  }),
  // Partner API docs
  create_doc_plugin({
    id: 'partner-api',
    path: 'docs/apis/partner-api',
    routeBasePath: '/apis/partner-api',
    sidebarPath: require.resolve('./sidebars-default.js'),
  }),
  // Webhooks latest docs
  create_doc_plugin({
    id: 'webhooks-latest',
    path: 'docs/webhooks/latest',
    routeBasePath: '/webhooks/latest',
    sidebarPath: require.resolve('./sidebars-default.js'),
  }),
  // Webhooks legacy docs
  create_doc_plugin({
    id: 'webhooks-legacy',
    path: 'docs/webhooks/legacy',
    routeBasePath: '/webhooks/legacy',
    sidebarPath: require.resolve('./sidebars-default.js'),
  }),
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  ...meta,
  plugins,
  future: {
    experimental_faster: true,
  },

  trailingSlash: false,
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],
  clientModules: [
    require.resolve('./src/client/define-ui-kit.js'),
    require.resolve('./src/client/set-framework.js'),
    require.resolve('./src/client/add-http-badges.js'),
  ],
  scripts: [{ src: 'https://cdn.statuspage.io/se-v2.js', async: true }],
  markdown: {
    mermaid: true,
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/guides',
          id: 'guides',
          routeBasePath: '/guides',
          ...defaultSettings,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/api-reference.css'),
          ],
        },
        sitemap: {
          ignorePatterns: ['**/tags/**', '/api/*'],
        },
        googleTagManager: {
          containerId: 'GTM-5FDFFSS',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: '/img/dyte-docs-card.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      navbar: {
        logo: {
          href: '/',
          src: '/logo/funnel-logo.png',
          alt: 'Funnel Leasing Documentation | Funnel Leasing Docs',
          height: '40px',
        },
        items: [
          {
            label: 'APIs',
            type: 'dropdown',
            className: 'funnel-dropdown',
            items: [
              {
                label: 'Customer API',
                to: '/apis/customer-api/',
              },
              {
                label: 'Partner API',
                to: '/apis/partner-api/',
              },
            ],
          },
          {
            label: 'Webhooks',
            type: 'dropdown',
            className: 'funnel-dropdown docs-dropdown',
            items: [
              {
                label: 'Latest (V2)',
                to: '/webhooks/latest/',
              },
              {
                label: 'Legacy (V1)',
                to: '/webhooks/legacy/',
              },
            ],
          },
          {
            label: 'Integrations',
            type: 'dropdown',
            className: 'funnel-dropdown',
            items: [
              {
                label: 'Customer API',
                to: '/apis/customer-api/',
              },
              {
                label: 'Partner API',
                to: '/apis/partner-api/',
              },
            ],
          },
          {
            label: 'Guides',
            to: '/guides/',
          },
          {
            label: 'Resources',
            type: 'dropdown',
            className: 'funnel-dropdown',
            items: [
              {
                label: 'Release Notes',
                to: '/release-notes/',
              },
              {
                label: 'FAQ',
                to: '/faq/',
              },
              {
                label: 'Support',
                to: 'https://funnelleasing.com/contact?type=docs',
              },
            ],
          },
          
          {
            type: 'search',
            position: 'right',
          },
          {
            label: 'Support',
            href: 'https://funnelleasing.com/contact?type=docs',
            position: 'right',
            className: 'navbar-book-demo',
          },
          {
            label: 'Book a demo',
            href: 'https://funnelleasing.com/schedule-demo',
            position: 'right',
            className: 'dev-portal-signup dev-portal-link',
          },
        ],
      },
      footer: {
        logo: {
          href: '/',
          src: '/logo/funnel-logo.png',
          alt: 'Funnel Leasing Documentation | Funnel Leasing Docs',
          height: '36px',
        },
        links: [
          {
            title: 'Products',
            items: [
              {
                label: 'CRM',
                href: '/crm/',
              },
              {
                label: 'Online Leasing',
                href: '/online-leasing/',
              },
              {
                label: 'Resident Portal',
                href: '/resident-portal/',
              },
              {
                label: 'AI Virtual Assistant',
                href: '/ai-virtual-assistant/',
              },
              {
                label: 'Voice AI & Insights',
                href: '/voice-ai-insights/',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://funnelleasing.com',
              },
              {
                label: 'Careers',
                href: 'https://funnelleasing.com/careers',
              },
              {
                label: 'Privacy Policy',
                href: 'https://funnelleasing.com/privacy-policy',
              },
              {
                label: 'Contact Us',
                href: 'https://funnelleasing.com/contact',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                href: '/',
              },
              {
                label: 'Blog',
                href: 'https://funnelleasing.com/blog',
              },
              {
                label: 'Support',
                href: 'https://funnelleasing.com/support',
              },
              {
                label: 'Status',
                href: 'https://status.funnelleasing.com/',
              },
            ],
          },
        ],
        copyright: 'Copyright © Funnel Leasing since 2024. All rights reserved.',
      },
      prism: {
        theme: code_themes.light,
        darkTheme: code_themes.dark,
        additionalLanguages: [
          'dart',
          'ruby',
          'groovy',
          'kotlin',
          'java',
          'swift',
          'objectivec',
          'json',
          'bash',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'highlight-next-line-error',
          },
        ],
      },
      algolia: {
        appId: 'HL0HSV62RK',
        apiKey: '72ebf02146698733b7114c7b36da0945',
        indexName: 'docs',
        contextualSearch: true,
        searchParameters: {},
      },
    }),

};

module.exports = config;

