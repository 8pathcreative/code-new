import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Define TypeScript interfaces
interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

interface SnippetsListProps {
  snippets: Snippet[];
  isLoading?: boolean;
  error?: string | null;
}

export function SnippetsList({ snippets, isLoading = false, error = null }: SnippetsListProps) {
  const [expandedSnippet, setExpandedSnippet] = useState<string | null>(null);

  const toggleExpandSnippet = (id: string) => {
    setExpandedSnippet(prev => prev === id ? null : id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full space-y-6">
      {snippets.map((snippet) => (
        <Card key={snippet.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{snippet.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {snippet.description}
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <CodeBlock 
              code={snippet.code}
              language={snippet.language}
              showLineNumbers={true}
              className={expandedSnippet === snippet.id ? "max-h-none" : "max-h-[300px]"}
            />
            {snippet.code.split('\n').length > 12 && (
              <Button
                variant="ghost"
                onClick={() => toggleExpandSnippet(snippet.id)}
                className="text-xs mt-2"
              >
                {expandedSnippet === snippet.id ? "Show less" : "Show more"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}