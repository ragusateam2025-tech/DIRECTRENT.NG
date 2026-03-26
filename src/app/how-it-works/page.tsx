'use client';

import { useState } from 'react';

import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { HowItWorksCTA } from '@/components/sections/HowItWorksCTA';
import { HowItWorksHero } from '@/components/sections/HowItWorksHero';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { SecurityFeatures } from '@/components/sections/SecurityFeatures';

type UserType = 'tenant' | 'landlord';

export default function HowItWorksPage() {
  const [activeView, setActiveView] = useState<UserType>('tenant');

  return (
    <>
      <HowItWorksHero activeView={activeView} onViewChange={setActiveView} />
      <ProcessTimeline activeView={activeView} />
      <ProcessSteps activeView={activeView} />
      <ComparisonTable />
      <SecurityFeatures />
      <FAQAccordion />
      <HowItWorksCTA />
    </>
  );
}
