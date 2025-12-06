import React from 'react';
import Link from '@docusaurus/Link';
import {
  VideoRegular,
  DocumentSignatureRegular,
  ChatSparkleRegular,
  AppsListDetailFilled,
  PhoneKeyRegular,
  BrainSparkleRegular,
} from '@fluentui/react-icons';
import ThemedImage from '@theme/ThemedImage';
import clsx from 'clsx';

export default function HeroSection() {
  return (
    <div className="noise-bg pb-14">
      <section className="no-underline-links relative w-full flex flex-col items-center text-center pt-[84px] px-6 overflow-hidden">
        {/* Subtle Grid Animation */}
        <div 
          className="absolute inset-0 pointer-events-none grid-animation"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0',
            color: 'rgba(0, 0, 0, 0.03)',
            animation: 'gridBreath 4s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes gridBreath {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.5;
            }
          }
          .dark .grid-animation {
            color: rgba(255, 255, 255, 0.03);
          }
        `}</style>
        <h1 className="relative z-10 text-[56px] leading-[1.1] font-bold tracking-[-0.03em] max-w-[900px] text-[#111] dark:text-white">
          Integrate with Funnel Leasing
        </h1>
        <p className="relative z-10 mt-8 text-[20px] leading-[1.6] text-neutral-600 dark:text-neutral-400 font-normal max-w-[720px]">
          Connect your applications to Funnel's leasing ecosystem through secure APIs, real-time event streams, and flexible UI integrations that extend leasing workflows wherever you need them.
        </p>
        
        {/* CTA Buttons */}
        <div className="relative z-10 mt-10 flex items-center justify-center gap-8">
          <div className="group relative">
            {/* Gradient Halo */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-200"></div>
            <Link
              to="/apis/customer-api"
              style={{ '--ifm-link-hover-color': 'white' } as React.CSSProperties}
              className="relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-[14px] leading-none shadow-[0_2px_8px_rgba(0,0,0,0.10)] transition-all duration-200 hover:bg-[#cc1acc] hover:!text-white hover:shadow-[0_4px_16px_rgba(255,47,255,0.25)] hover:-translate-y-[1px] active:translate-y-[0px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 hover:no-underline cursor-pointer"
            >
            <span>Start building</span>
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </Link>
          </div>
          
          <Link
            href="https://funnelleasing.com/contact"
            className="group inline-flex items-center gap-2 text-primary dark:text-primary font-semibold text-[14px] leading-none transition-all duration-200 hover:text-[#cc1acc] dark:hover:text-[#ff4dff] hover:no-underline cursor-pointer"
          >
            <span>Talk to an expert</span>
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Device Mockups Section */}
      <section className="w-full flex justify-center px-6">
        <div className="max-w-[1200px] w-full" style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}>
          <ThemedImage
            sources={{
              light: '/landing-page/funnel-app-screens.png',
              dark: '/landing-page/funnel-app-screens.png',
            }}
            alt="Funnel app screens across devices"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Get Started Section - Vertical Stepper */}
      <section className="get-started">
        <style>{`
          .get-started {
            padding: 48px 0 56px;
            background: #fafafa;
            border-radius: 0 0 48px 48px;
            position: relative;
            overflow: hidden;
          }
          .get-started::before,
          .get-started::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 56px;
            pointer-events: none;
          }
          .get-started::before {
            top: 0;
            background: linear-gradient(to bottom, #ffffff 0%, rgba(250,250,250,0) 100%);
          }
          .get-started::after {
            bottom: 0;
            background: linear-gradient(to top, #ffffff 0%, rgba(250,250,250,0) 100%);
          }
          .get-started__inner {
            max-width: 880px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .get-started__eyebrow {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #9ca3af;
            margin-bottom: 6px;
          }
          .dark .get-started__eyebrow {
            color: #6b7280;
          }
          .get-started__title {
            font-size: 24px;
            line-height: 1.25;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 18px;
            color: #111827;
          }
          .dark .get-started__title {
            color: #ffffff;
          }
          .get-started__steps {
            list-style: none;
            margin: 0;
            padding: 0;
            position: relative;
          }
          .get-started__step {
            position: relative;
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: 16px;
            padding: 10px 0 14px;
          }
          .get-started__step::before {
            content: "";
            position: absolute;
            left: 28px;
            top: 26px;
            bottom: -18px;
            width: 1px;
            background: rgba(0, 0, 0, 0.06);
          }
          .get-started__step:last-child::before {
            content: none;
          }
          .dark .get-started__step::before {
            background: rgba(255, 255, 255, 0.1);
          }
          .get-started__step:not(:last-child)::after {
            content: "";
            position: absolute;
            left: 32px;
            right: 0;
            bottom: 0;
            height: 1px;
            background: rgba(0,0,0,0.05);
          }
          .dark .get-started__step:not(:last-child)::after {
            background: rgba(255, 255, 255, 0.1);
          }
          .get-started__step-badge {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            background: rgba(236, 48, 255, 0.10);
            color: #ec30ff;
            font-weight: 600;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 2px;
            z-index: 1;
            position: relative;
          }
          .get-started__step-content {
            display: flex;
            flex-direction: column;
          }
          .get-started__step-heading {
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 2px;
            color: #111827;
            margin-top: 0;
          }
          .dark .get-started__step-heading {
            color: #ffffff;
          }
          .get-started__step-body {
            font-size: 14px;
            line-height: 1.45;
            color: #4b5563;
            margin-bottom: 4px;
            margin-top: 0;
          }
          .dark .get-started__step-body {
            color: #9ca3af;
          }
          .get-started__step-link {
            font-size: 14px;
            font-weight: 500;
            color: #ec30ff;
            text-decoration: none;
            opacity: 0.9;
          }
          .get-started__step-link:hover {
            opacity: 1;
            text-decoration: underline;
          }
          @media (max-width: 640px) {
            .get-started__inner {
              padding: 0 16px;
            }
            .get-started__step::before {
              left: 26px;
            }
            .get-started__step {
              column-gap: 12px;
            }
          }
        `}</style>
        <div className="get-started__inner">
          <span className="mb-2 uppercase tracking-wider text-text-400">
            QUICK START
          </span>
          <h3 className="mb-12 text-4xl">
            Get started in 3 steps
          </h3>
          <ol className="get-started__steps">
            <li className="get-started__step">
              <div className="get-started__step-badge">1</div>
              <div className="get-started__step-content">
                <h3 className="get-started__step-heading">Authenticate</h3>
                <p className="get-started__step-body">
                  Get your API keys and set up authentication to start making requests.
                </p>
                <Link to="/apis/customer-api/authentication" className="get-started__step-link">
                  View authentication guide →
                </Link>
              </div>
            </li>
            <li className="get-started__step">
              <div className="get-started__step-badge">2</div>
              <div className="get-started__step-content">
                <h3 className="get-started__step-heading">Make your first request</h3>
                <p className="get-started__step-body">
                  Call Funnel&apos;s API using your API key and verify your integration is working.
                </p>
                <Link to="/apis/customer-api" className="get-started__step-link">
                  Follow first request guide →
                </Link>
              </div>
            </li>
            <li className="get-started__step">
              <div className="get-started__step-badge">3</div>
              <div className="get-started__step-content">
                <h3 className="get-started__step-heading">Configure webhooks</h3>
                <p className="get-started__step-body">
                  Subscribe to real-time events so your app stays in sync with Funnel.
                </p>
                <Link to="/webhooks/latest/walkthrough" className="get-started__step-link">
                  Configure webhooks →
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
