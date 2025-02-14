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
  title: 'Code Resources - Best Resources for Developers',
  description: 'A curated collection of the best resources for designers and developers. Find tutorials, tools, and learning materials to enhance your skills.',
  image: '/images/og-image.svg',
  type: 'website',
  schema: {
    type: 'WebSite',
    data: {
      name: 'Code Resources',
      url: 'https://coderesources.dev',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://coderesources.dev/search?q={search_term_string}'
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
      ? config.title.includes('Code Resources') 
        ? config.title 
        : `${config.title} | Code Resources`
      : defaultSEOConfig.title,
  };
}