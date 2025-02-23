// src/components/Snippets/SnippetsList.tsx
import React from 'react';
import { useSupabaseQuery } from '@/hooks/useSupabase';
import { SnippetCard } from './SnippetCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Snippet } from '@/types';

export const SnippetsList: React.FC = () => {
  const { data: snippets, loading, error } = useSupabaseQuery<Snippet>(
    'code_snippets',
    {
      order: { created_at: 'desc' }
    }
  );

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading snippets: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))
      ) : (
        snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))
      )}
    </div>
  );
};