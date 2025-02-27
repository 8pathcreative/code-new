import React, { ReactNode } from 'react';
import Head from 'next/head';
import { generateSEOConfig, SEOConfig } from '../../lib/seo';

interface SEOProps extends Partial<SEOConfig> {
  children?: ReactNode;
}

export function SEO({ children, ...seoProps }: SEOProps) {
  const seo = generateSEOConfig(seoProps);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:type" content={seo.type || 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {children}
    </Head>
  );
}