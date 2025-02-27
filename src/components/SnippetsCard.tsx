// src/components/SnippetCard.tsx
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';

interface SnippetCardProps {
  snippet: {
    id: string;
    title: string;
    language: string;
    code: string;
    description?: string;
    url?: string;
  };
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-xl font-semibold leading-tight">
                {snippet.title}
              </CardTitle>
              {snippet.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {snippet.description}
                </p>
              )}
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {snippet.language}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <SyntaxHighlighter
          language={snippet.language.toLowerCase()}
          style={dracula}
          customStyle={{ borderRadius: '8px', padding: '16px' }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </CardContent>
      <CardFooter className="pt-2 pb-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleCopyCode}>
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
        {snippet.url && (
          <Button variant="outline" size="sm" asChild>
            <a href={snippet.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Source
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default SnippetCard;