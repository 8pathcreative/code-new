// src/pages/SnippetsPage.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SnippetCard } from '@/components/SnippetCard';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      const { data, error } = await supabase.from('code_snippets').select('*');
      if (error) {
        console.error('Error fetching snippets:', error);
      } else {
        setSnippets(data);
      }
      setLoading(false);
    };

    fetchSnippets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Code Snippets</h1>
      {loading ? (
        <p>Loading snippets...</p>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetsPage;