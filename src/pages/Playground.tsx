import React from 'react';
import { SEO } from '@/components/SEO';
import { HeroSection } from './HeroSection';
import { PlaygroundSection } from './PlaygroundSection';

export function Playground() {
  return (
    <>
      <SEO
        title="UI Playground"
        description="UI Component Playground"
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEO>
      <HeroSection />
      <PlaygroundSection />
    </>
  );
}

// filepath: /Users/neilhumphrey/Desktop/code-new/src/pages/HeroSection.tsx
import React from 'react';

export function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <BackgroundPattern />
      <GradientDecoration />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <HeroContent />
        <HeroImage />
      </div>
    </div>
  );
}

// filepath: /Users/neilhumphrey/Desktop/code-new/src/pages/PlaygroundSection.tsx
import React from 'react';
import { useDialog } from '../hooks/useDialog';
import { ButtonsShowcase } from '../components/ButtonsShowcase';
import { CardsShowcase } from '../components/CardsShowcase';
import { DialogShowcase } from '../components/DialogShowcase';
import { MegaMenuShowcase } from '../components/MegaMenuShowcase';

export function PlaygroundSection() {
  return (
    <div className="container py-8">
      <div className="mt-16">
        <h1 className="text-4xl font-bold mb-8">UI Component Playground</h1>
        <div className="space-y-12">
          <ButtonsShowcase />
          <CardsShowcase />
          <DialogShowcase />
          <MegaMenuShowcase />
        </div>
      </div>
    </div>
  );
}

// filepath: /Users/neilhumphrey/Desktop/code-new/src/hooks/useDialog.ts
import { useState, useCallback } from 'react';

export function useDialog(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  };
}