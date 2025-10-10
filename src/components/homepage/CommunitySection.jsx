import React from 'react';
import Link from '@docusaurus/Link';

import { Linkedin, Twitter } from 'react-feather';

const companyLogos = [
  { name: 'Avanti Residential', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Avanti-White.svg' },
  { name: 'BH', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-BH-White.svg' },
  { name: 'Camden', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Camden-White.svg' },
  { name: 'CedarSt', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-CedarSt-White.svg' },
  { name: 'Continental Properties', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Continental-White.svg' },
  { name: 'Cornerstone', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Cornerstone-White.svg' },
  { name: 'Cortland', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Cortland-White.svg' },
  { name: 'Doran Group', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/10/Logo-Doran-Group-White.svg' },
  { name: 'Essex', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Essex-White.svg' },
  { name: 'GMH', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/10/Logo-GMH-White.svg' },
  { name: 'Kane Realty Corporation', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Kane-White.svg' },
  { name: 'Lantower Residential', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Lantower-White.svg' },
  { name: 'LCOR', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-LCOR-White.svg' },
  { name: 'MAA', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-MAA-White.svg' },
  { name: 'Mack Property Management', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Mack-White.svg' },
  { name: 'Morgan Properties', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Morgan-White.svg' },
  { name: 'Quadreal', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Quadreal-White.svg' },
  { name: 'Quarterra', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Quarterra-White.svg' },
  { name: 'Redpeak', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Redpeak-White.svg' },
  { name: 'Redstone', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Redstone-White.svg' },
  { name: 'RKW', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-RKW-White.svg' },
  { name: 'RMR Group', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-RMR-White.svg' },
  { name: 'Veritas', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Veritas-White.svg' },
  { name: 'Windsor', logo: 'https://cdn-ikppojb.nitrocdn.com/ixIKpewMJHrrHCmWnougzUiFrykLuTxb/assets/images/source/rev-1cc0d03/funnelleasing.com/wp-content/uploads/2025/07/Logo-Windsor-White.svg' },
];

export default function CommunitySection() {
  return (
    <section className="no-underline-links">
      <div className="mx-auto flex w-full flex-col items-center justify-center bg-gradient-to-b from-[#262626] to-black px-4 py-16 pt-64 text-white dark:from-zinc-200/90 dark:to-white dark:text-zinc-700">
        <h2 className="text-3xl">
          Multifamily leaders <span className="text-primary-100">trust</span> Funnel
        </h2>
        <p className="mb-10 text-zinc-500">
          Join industry leaders who rely on Funnel to streamline their operations and deliver exceptional resident experiences.
        </p>
        <div className="mx-auto mb-16 overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {companyLogos.map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  alt={`${company.name} logo`}
                  src={company.logo}
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
            {companyLogos.map((company, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0">
                <img
                  alt={`${company.name} logo`}
                  src={company.logo}
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-sm font-semibold lg:flex-row lg:gap-8">
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-solid border-primary-100 bg-primary-100/10 px-2 py-2 text-primary-100 lg:w-auto"
            href="https://twitter.com/funnelleasing"
          >
            <Twitter className="h-5 w-5" /> Twitter &rarr;
          </Link>
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-solid border-primary-100 bg-primary-100/10 px-2 py-2 text-primary-100 lg:w-auto"
            href="https://www.linkedin.com/company/funnelleasing/"
          >
            <Linkedin className="h-5 w-5" /> LinkedIn &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
