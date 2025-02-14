import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
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