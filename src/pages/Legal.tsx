import React from 'react';
import { SEO } from '@/components/SEO';

export function Legal() {
  return (
    <>
      <SEO
        title="Legal Information"
        description="Legal information, terms of service, and privacy policy for Code Resources."
        keywords={['legal', 'terms of service', 'privacy policy', 'cookies policy']}
      />

      <div className="container max-w-4xl py-24">
        <h1 className="text-4xl font-bold mb-12">Legal Information</h1>

        <div className="space-y-12">
          {/* Terms of Service */}
          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
            <p className="text-muted-foreground">
              By accessing and using Code Resources, you agree to be bound by these terms and conditions.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">1. Use License</h3>
            <p className="text-muted-foreground">
              Permission is granted to temporarily access the materials on Code Resources's website for personal,
              non-commercial transitory viewing only.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">2. Disclaimer</h3>
            <p className="text-muted-foreground">
              The materials on Code Resources's website are provided on an 'as is' basis. Code Resources
              makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          {/* Privacy Policy */}
          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-muted-foreground">
              Your privacy is important to us. It is Code Resources's policy to respect your privacy regarding
              any information we may collect from you across our website.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h3>
            <p className="text-muted-foreground">
              We only ask for personal information when we truly need it to provide a service to you.
              We collect it by fair and lawful means, with your knowledge and consent.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Data Protection</h3>
            <p className="text-muted-foreground">
              We employ industry standard techniques to protect against unauthorized access of data about
              you that we store, including personal information.
            </p>
          </section>

          {/* Cookie Policy */}
          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
            <p className="text-muted-foreground">
              We use cookies to help improve your experience of our website. Cookies are small text files
              that are placed on your computer or mobile phone when you browse websites.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Our Cookies</h3>
            <p className="text-muted-foreground">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Authentication and security</li>
              <li>Preferences and settings</li>
              <li>Analytics and performance</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}