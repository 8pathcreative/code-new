// src/components/Snippets/SnippetsList.tsx
import React from 'react';

interface SnippetCardProps {
  snippet: {
    id: string;
    title: string;
    code: string;
    language: string;
    created_at: string;
  };
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  return (
    <div className="snippet-card">
      <h2>{snippet.title}</h2>
      <pre>{snippet.code}</pre>
      <p>{snippet.language}</p>
      <p>{snippet.created_at}</p>
    </div>
  );
};

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  created_at: string;
}

interface SnippetsListProps {
  snippets: Snippet[];
  loading: boolean;
}

export const SnippetsList: React.FC<SnippetsListProps> = ({ snippets, loading }) => {
  if (loading) {
    return <div>Loading snippets...</div>;
  }

  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};