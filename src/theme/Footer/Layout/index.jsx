import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}
    >
      <div className="container-fluid container">
        {logo && <div className="margin-bottom--sm">{logo}</div>}
        <p className="footer__description mb-8">
          Funnel Leasing provides comprehensive property management and leasing
          solutions that help you streamline operations, manage leads, and
          enhance resident experiences. Our developer-friendly APIs and
          user-friendly documentation enable seamless integration with your
          existing systems. We support use cases such as online leasing, CRM and
          lead management, resident portals, AI virtual assistants, and voice
          AI insights.
        </p>
        <div className="footer__row">
          <div className="footer__data">
            <div className="footer__cta">
              <p>Get started with Funnel Leasing today!</p>
              <Link href="https://funnelleasing.com">Learn More</Link>
            </div>
          </div>
          <div className="links">{links}</div>
        </div>
        {copyright && (
          <div className="footer__bottom text--center">{copyright}</div>
        )}
      </div>
    </footer>
  );
}
