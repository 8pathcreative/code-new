import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Props for the SchemaOrg component.
 * 
 * @interface SchemaOrgProps
 * @property {'WebSite' | 'Organization' | 'Article' | 'Product' | 'BreadcrumbList'} type
 *   The type of schema.org entity.
 * @property {Record<string, any>} data
 *   The data associated with the schema.org entity.
 */
export interface SchemaOrgProps {
  type: 'WebSite' | 'Organization' | 'Article' | 'Product' | 'BreadcrumbList';
  data: Record<string, any>;
}

export function SchemaOrg({ type, data }: SchemaOrgProps) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(baseSchema)}
      </script>
    </Helmet>
  );
}