// src/components/Snippets/SnippetsList.tsx
import React from 'react';
import { SnippetCard } from './SnippetCard';

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