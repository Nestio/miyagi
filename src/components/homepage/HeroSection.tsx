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

const PRODUCTS = [
  {
    title: 'CRM',
    link: '/guides/live-video/intro-video-conf',
    icon: AppsListDetailFilled,
    lightImage: '/static/landing-page/hero/video-graphic.png',
    darkImage: '/static/landing-page/hero/video-graphic-dark.png',
    text: 'Comprehensive customer relationship management for property managers. Track leads, manage prospects, and optimize your leasing pipeline.',
  },
  {
    title: 'Online Leasing',
    link: '/guides/voice-conf/intro-voice-conf',
    icon: DocumentSignatureRegular,
    lightImage: '/static/landing-page/hero/voice-graphic.png',
    darkImage: '/static/landing-page/hero/voice-graphic-dark.png',
    text: 'Streamlined digital leasing application and processing. Transform the traditional leasing process into a seamless online experience.',
  },
  {
    title: 'Resident Portal',
    link: '/guides/livestream/livestream-overview',
    icon: PhoneKeyRegular,
    lightImage: '/static/landing-page/hero/livestream-graphic.png',
    darkImage: '/static/landing-page/hero/livestream-graphic-dark.png',
    text: 'Self-service portal for residents to manage accounts, submit maintenance requests, and access community features.',
  },
  {
    title: 'AI Virtual Assistant',
    link: '/guides/live-video/intro-video-conf',
    icon: ChatSparkleRegular,
    lightImage: '/static/landing-page/hero/video-graphic.png',
    darkImage: '/static/landing-page/hero/video-graphic-dark.png',
    text: 'Intelligent chatbot and automation solutions. Automate customer interactions and provide 24/7 support.',
  },
  {
    title: 'Voice AI & Insights',
    link: '/guides/live-video/intro-video-conf',
    icon: BrainSparkleRegular,
    lightImage: '/static/landing-page/hero/voice-graphic.png',
    darkImage: '/static/landing-page/hero/voice-graphic-dark.png',
    text: 'Advanced call analytics and voice recognition. Transform phone conversations into actionable business intelligence.',
  },
];

function HeroProduct({
  link,
  title,
  icon: Icon,
  text,
  lightImage,
  darkImage,
}: (typeof PRODUCTS)[0]) {
  return (
    <Link
      to={link}
      style={{
        borderWidth: '1px',
      }}
      className={clsx(
        'group cursor-pointer overflow-clip rounded-3xl from-primary/30 via-transparent to-transparent text-black transition-all hover:bg-gradient-to-tr hover:text-primary hover:no-underline dark:text-white',
        'w-[90vw] border-secondary-700 bg-secondary-900 hover:!border-primary dark:border-secondary-800 sm:w-[440px]',
      )}
    >
      <div className="p-6 !pb-0">
        <h3 className="mb-1.5 flex items-center gap-3 font-jakarta group-hover:text-primary">
          <Icon className="h-7 w-7" />
          <div>
            {title}
            {/* {beta && <span className="font-normal text-text-400"> (Beta)</span>} */}
          </div>
        </h3>
        <p className="mb-0 text-sm text-zinc-400">{text}</p>
      </div>
      <ThemedImage
        sources={{
          light: lightImage,
          dark: darkImage,
        }}
        alt={title}
        className="mt-1 w-full transition-transform group-hover:scale-110"
      />
    </Link>
  );
}

export default function HeroSection() {
  return (
    <div className="noise-bg pb-14">
      <section className="no-underline-links px-4 pt-16 lg:py-0">
        <div className="flex flex-col items-center justify-between py-14">
          <h2 className="mb-4 font-jakarta text-5xl font-bold">
            Scale with Funnel Leasing
          </h2>
          <p className="max-w-xl text-center text-text-400">
          Streamline every aspect of property management with our comprehensive suite of solutions. From lead generation to resident services, we've got you covered.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-6 px-4">
        {PRODUCTS.map((product) => (
          <HeroProduct {...product} key={product.title} />
        ))}
      </section>
    </div>
  );
}
