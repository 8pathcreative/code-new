import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Calendar, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCategoriesStore } from '@/lib/categories';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { categories } = useCategoriesStore();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) throw error;
      
      toast.success('Successfully subscribed to the newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="contentinfo" aria-label="Site footer">
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-4xl font-semibold tracking-tight text-white">Subscribe to our newsletter</h2>
              <p className="mt-4 text-lg text-gray-300">
                Get weekly updates on new resources, tutorials, and tips for developers and designers.
              </p>
              <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <Calendar className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-white">Weekly articles</h3>
                <p className="mt-2 leading-7 text-gray-300">
                  Get curated resources and in-depth articles delivered to your inbox every week.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <ThumbsUp className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-white">No spam</h3>
                <p className="mt-2 leading-7 text-gray-300">
                  We respect your inbox. Only relevant content, no spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <nav className="container py-12" aria-label="Footer navigation">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding and Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              <Link
                to="/"
                className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                Code Tutorials
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">
              A curated collection of the best resources for designers and developers.
              Updated regularly with new content.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary"
              >
                <a
                  href="https://github.com/8pathcreative"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our GitHub repository"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {/* Categories */}
          <nav className="space-y-4" aria-label="Categories">
            <h2 className="text-sm font-semibold">Categories</h2>
            <ul className="grid gap-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Button variant="link" asChild className="h-auto p-0 justify-start">
                    <Link to={`/?category=${category.slug}`}>
                      {category.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

           {/* Company Links */}
           <nav className="space-y-4" aria-label="Company">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="grid gap-2">
              <li>
                <Button variant="link" asChild className="h-auto p-0 justify-start">
                  <Link to="/about" data-link-id="about">About</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="h-auto p-0 justify-start">
                  <Link to="/contact" data-link-id="contact">Contact</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="h-auto p-0 justify-start">
                  <Link to="/pricing" data-link-id="pricing">Pricing</Link>
                </Button>
              </li>
            </ul>
          </nav>

          {/* Legal Links */}
          <nav className="space-y-4" aria-label="Legal">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="grid gap-2">
              <li>
                <Button variant="link" asChild className="h-auto p-0 justify-start">
                  <Link to="/legal" data-link-id="terms-of-service">Terms of Service</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="h-auto p-0 justify-start">
                  <Link to="/legal" data-link-id="privacy-policy">Privacy Policy</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="h-auto p-0 justify-start">
                  <Link to="/legal" data-link-id="cookie-policy">Cookie Policy</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Code Tutorials. All rights reserved.
          </p>
        </div>
      </nav>
    </footer>
  );
}