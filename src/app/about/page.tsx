'use client';

import { AboutHero } from '@/components/sections/AboutHero';
import { MissionStatement } from '@/components/sections/MissionStatement';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ResearchBacked } from '@/components/sections/ResearchBacked';
import { CompanyValues } from '@/components/sections/CompanyValues';
import { FounderNote } from '@/components/sections/FounderNote';
import { Roadmap } from '@/components/sections/Roadmap';
import { AboutCTA } from '@/components/sections/AboutCTA';

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
