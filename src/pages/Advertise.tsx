import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';

const Advertise: React.FC = () => {
  return (
    <>
      <SEO
        title="Advertise with Us"
        description="Learn about advertising opportunities with our platform."
      />

      <div className="container max-w-6xl py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Reach Millions of Developers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your product or service in front of our engaged community of developers and designers.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-4xl font-bold text-primary mb-2">500K+</div>
            <div className="text-muted-foreground">Monthly Views</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-4xl font-bold text-primary mb-2">200K+</div>
            <div className="text-muted-foreground">Active Developers</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-4xl font-bold text-primary mb-2">85%</div>
            <div className="text-muted-foreground">Engagement Rate</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Advertise with Us?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Targeted Audience</h3>
                  <p className="text-muted-foreground">
                    Reach developers, designers, and tech decision-makers directly.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">High Engagement</h3>
                  <p className="text-muted-foreground">
                    Our community is actively looking for tools and resources.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Premium Placement</h3>
                  <p className="text-muted-foreground">
                    Featured spots in newsletters, website, and social media.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Advertising Options</h2>
            <div className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Featured Resource</h3>
                <p className="text-muted-foreground mb-4">
                  Premium placement in our curated resources list with enhanced visibility.
                </p>
                <div className="font-semibold">Starting at $499/month</div>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Newsletter Sponsorship</h3>
                <p className="text-muted-foreground mb-4">
                  Reach our subscriber base directly in their inbox.
                </p>
                <div className="font-semibold">Starting at $999/week</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Promote Your Product?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with us to discuss advertising opportunities and custom packages tailored to your needs.
          </p>
          <Button size="lg" className="gap-2">
            <Mail className="w-4 h-4" />
            Contact for Advertising
          </Button>
        </div>
      </div>
    </>
  );
}

export default Advertise;