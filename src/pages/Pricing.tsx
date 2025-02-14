import React from 'react';
import { SEO } from '@/components/SEO';

export function Pricing() {
  return (
    <>
      <SEO
        title="Pricing Plans - Code Resources"
        description="Access our curated collection of coding resources and tutorials."
        keywords={['resources', 'tutorials', 'developer tools', 'learning platform']}
      />
      
      <div className="container py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Free Access to All Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All resources are currently available for free. We're working on new features
            and premium content that will be available soon.
          </p>
        </div>
      </div>
    </>
  );
}