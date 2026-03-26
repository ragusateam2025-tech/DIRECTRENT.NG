'use client';

import { useState } from 'react';

import { FeatureLifestyleBreak } from '@/components/sections/FeatureLifestyleBreak';
import { FeaturesCTA } from '@/components/sections/FeaturesCTA';
import { FeaturesHero } from '@/components/sections/FeaturesHero';
import { FeatureShowcase } from '@/components/sections/FeatureShowcase';
import { SavingsCalculator } from '@/components/sections/SavingsCalculator';

type UserType = 'tenant' | 'landlord';

export default function FeaturesPage() {
  const [activeView, setActiveView] = useState<UserType>('tenant');

  return (
    <>
      <FeaturesHero activeView={activeView} onViewChange={setActiveView} />
      <FeatureShowcase activeView={activeView} />
      <FeatureLifestyleBreak />
      <SavingsCalculator />
      <FeaturesCTA />
    </>
  );
}
