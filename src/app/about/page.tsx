'use client';

import { AboutCTA } from '@/components/sections/AboutCTA';
import { AboutHero } from '@/components/sections/AboutHero';
import { CompanyValues } from '@/components/sections/CompanyValues';
import { FounderNote } from '@/components/sections/FounderNote';
import { MissionStatement } from '@/components/sections/MissionStatement';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ResearchBacked } from '@/components/sections/ResearchBacked';
import { Roadmap } from '@/components/sections/Roadmap';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionStatement />
      <ProblemSection />
      <ResearchBacked />
      <CompanyValues />
      <FounderNote />
      <Roadmap />
      <AboutCTA />
    </>
  );
}
