import React from 'react';
import Link from '@docusaurus/Link';
import {
  CodeRegular,
  AlertRegular,
  WindowRegular,
  KeyRegular,
} from '@fluentui/react-icons';

export default function PopularResourcesSection() {
  return (
    <section className="w-full py-20 px-6">
      <div 
        className="w-full"
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <h2 className="text-[28px] font-semibold text-neutral-900 dark:text-white mb-8 text-center">
          Popular Resources
        </h2>
        <div 
          className="w-full grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {/* REST API Reference Card */}
          <Link
            to="/apis/customer-api"
            className="group flex flex-col rounded-[22px] transition-all duration-300 hover:-translate-y-1 hover:no-underline"
            style={{ 
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'none',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center">
                <CodeRegular className="w-5 h-5 text-neutral-500 dark:text-neutral-400" strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-700 dark:text-neutral-300">
                REST API Reference
              </h3>
            </div>
            <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Complete API documentation for integrating with Funnel's leasing platform.
            </p>
          </Link>

          {/* Webhook Events Card */}
          <Link
            to="/webhooks"
            className="group flex flex-col rounded-[22px] transition-all duration-300 hover:-translate-y-1 hover:no-underline"
            style={{ 
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'none',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center">
                <AlertRegular className="w-5 h-5 text-neutral-500 dark:text-neutral-400" strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-700 dark:text-neutral-300">
                Webhook Events
              </h3>
            </div>
            <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Subscribe to real-time events for prospects, applications, and leasing updates.
            </p>
          </Link>

          {/* iFrame Integrations Card */}
          <Link
            to="/integrations/iframe"
            className="group flex flex-col rounded-[22px] transition-all duration-300 hover:-translate-y-1 hover:no-underline"
            style={{ 
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'none',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center">
                <WindowRegular className="w-5 h-5 text-neutral-500 dark:text-neutral-400" strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-700 dark:text-neutral-300">
                iFrame Integrations
              </h3>
            </div>
            <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Embed Funnel's leasing workflows seamlessly into your applications.
            </p>
          </Link>

          {/* Authentication Card */}
          <Link
            to="/authentication"
            className="group flex flex-col rounded-[22px] transition-all duration-300 hover:-translate-y-1 hover:no-underline"
            style={{ 
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'none',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center">
                <KeyRegular className="w-5 h-5 text-neutral-500 dark:text-neutral-400" strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-700 dark:text-neutral-300">
                Authentication
              </h3>
            </div>
            <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Secure API authentication and environment configuration guide.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

