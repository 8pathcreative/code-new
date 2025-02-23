import React from 'react';
import { SEOConfig, generateSEOConfig } from '@/lib/seo';
import { CodeEditor } from '@/components/CodeEditor';

interface PageTemplateProps {
  seoConfig?: Partial<SEOConfig>;
  content: string;
}

const defaultContent = `
  # Welcome to Code Resources

  This is an example page. Replace this content with your own.
`;

export const PageTemplate: React.FC<PageTemplateProps> = ({
  seoConfig = {},
  content = defaultContent,
}) => {
  const finalSEOConfig = generateSEOConfig(seoConfig);

  return (
    <div>
      <head>
        <title>{finalSEOConfig.title}</title>
        <meta name="description" content={finalSEOConfig.description} />
        <meta property="og:image" content={finalSEOConfig.image} />
        <meta property="og:type" content={finalSEOConfig.type} />
        <link rel="canonical" href={finalSEOConfig.url} />
      </head>
      <header>
        <h1>Site Header</h1>
        {/* Add more header content here */}
      </header>
      <main>
        <h1>{finalSEOConfig.title}</h1>
        <CodeEditor value={content} language="markdown" readOnly />
      </main>
      <footer>
        <p>Site Footer</p>
        {/* Add more footer content here */}
      </footer>
    </div>
  );
};