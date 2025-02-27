import React from 'react';
import { type SchemaOrgProps } from '@/components/SchemaOrg';
export interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: SchemaOrgProps;
}


export const defaultSEOConfig: SEOConfig = {
  title: 'Code Tutorials: Tools, Components, and Best Practices for Modern Web Development',
  description: 'A curated collection of the best resources for designers and developers. Find tutorials, tools, and learning materials to enhance your skills.',
  image: '/images/og-image.svg',
  type: 'website',
  schema: {
    type: 'WebSite',
    data: {
      name: 'Code Tutorials',
      url: 'https://codetutorials.io',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://codetutorials.io/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  }
};


export function generateSEOConfig(config: Partial<SEOConfig> = {}): SEOConfig {
  return {
    ...defaultSEOConfig,
    ...config,
    title: config.title 
      ? config.title.includes('Code Tutorials') 
        ? config.title 
        : `${config.title} | Code Tutorials`
      : defaultSEOConfig.title,
  };
}