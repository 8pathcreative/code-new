import React, { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  type?: string;
  canonical?: string;
}

export function generateSEOConfig(config: Partial<SEOConfig>): SEOConfig {
  return {
    title: config.title || 'Code Resources: Developer Tools & Components',
    description: config.description || 'Explore developer resources, components, and code snippets for modern web development.',
    image: config.image,
    type: config.type,
  };
}

interface SEOProps extends Partial<SEOConfig> {
  children?: ReactNode;
}

export function SEO({ children, ...seoProps }: SEOProps) {
  const seo = generateSEOConfig(seoProps);

  return (
    <HelmetProvider>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:type" content={seo.type || 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}
      {children}
    </HelmetProvider>
  );
}