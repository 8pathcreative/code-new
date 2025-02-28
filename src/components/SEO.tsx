import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

import { SchemaOrg } from './SchemaOrg';
import { type SEOConfig, generateSEOConfig } from '@/lib/seo';

// SEOConfig interface
export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

export function SEO(props: Partial<SEOConfig>) {
  const {
    title,
    description,
    image,
    url = typeof window !== 'undefined' ? window.location.href : '',
    type,
    schema,
  } = generateSEOConfig(props);

  return (
    <>
      <Helmet>
        {/* Basic metadata */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content="Code Resources" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Additional SEO best practices */}
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="Code Resources" />
        <meta name="apple-mobile-web-app-title" content="Code Resources" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      </Helmet>

      {/* Add schema.org structured data */}
      <SchemaOrg {...(schema || generateSEOConfig().schema!)} />
    </>
  );
}