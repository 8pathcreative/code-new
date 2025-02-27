import React from 'react';
import { PageTemplate } from '@/components/PageTemplate';

const NewPage: React.FC = () => {
  const seoConfig = {
    title: 'New Page',
    description: 'Description for the new page',
  };

  const content = `
    # New Page

    This is the content for the new page.
  `;

  return <PageTemplate seoConfig={seoConfig} content={content} />;
};

export default NewPage;