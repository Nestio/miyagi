import type { ComponentProps, ReactNode } from 'react';
import {
  ReactIcon,
  AngularIcon,
  AndroidIcon,
  AppleIcon,
  FlutterIcon,
  HTMLIcon,
  JSIcon,
} from './icons';

export type Section = { docId: string } & (
  | {
      section: false;
    }
  | {
      section: string;
      icon: (props: ComponentProps<'svg'>) => ReactNode;
      name: string;
    }
);

const SECTIONS: Section[] = [
  {
    name: 'CRM',
    docId: 'crm',
    icon: ReactIcon,
    section: false,
  },
  {
    name: 'Online Leasing',
    docId: 'online-leasing',
    icon: JSIcon,
    section: false,
  },
  {
    name: 'Resident Portal',
    docId: 'resident-portal',
    icon: HTMLIcon,
    section: 'resident-services',
  },
  {
    name: 'AI Virtual Assistant',
    docId: 'ai-virtual-assistant',
    icon: AngularIcon,
    section: 'ai-services',
  },
  {
    name: 'Voice AI & Insights',
    docId: 'voice-ai-insights',
    icon: AndroidIcon,
    section: 'ai-services',
  },
];

export type SectionsGroup = {
  name: string;
  section: string;
  description?: string;
  className?: string;
};

const SECTION_GROUPS: SectionsGroup[][] = [
  [
    {
      name: 'Resident Services',
      section: 'resident-services',
      description: 'Tools and portals for resident engagement and services.',
    },
  ],
  [
    {
      name: 'AI Services',
      section: 'ai-services',
      description: 'Intelligent automation and analytics solutions.',
    },
  ],
];

export { SECTIONS, SECTION_GROUPS };
