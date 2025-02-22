import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { HeroSection } from './HeroSection';
import { useDialog } from '../hooks/useDialog';
import { ButtonsShowcase } from '../components/ButtonsShowcase';
import { CardsShowcase } from '../components/CardsShowcase';
import { DialogShowcase } from '../components/DialogShowcase';
import { MegaMenuShowcase } from '../components/MegaMenuShowcase';
import { createClient } from '@supabase/supabase-js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be defined in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export function Playground() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSnippets();
  }, []);

  async function fetchSnippets() {
    setLoading(true);
    setError(null);
    let { data, error } = await supabase
      .from('code_snippets')
      .select('*');

    if (error) {
      console.error('Error fetching snippets:', error);
      setError('Failed to fetch snippets.');
    } else {
      setSnippets(data);
    }
    setLoading(false);
  }

  async function addSnippet() {
    const title = prompt('Snippet Title:');
    const language = prompt('Snippet Language:');
    const code = prompt('Snippet Code:');

    if (!title || !language || !code) {
      alert('All fields are required.');
      return;
    }

    const { data, error } = await supabase
      .from('code_snippets')
      .insert([{ title, language, code }]);

    if (error) {
      console.error('Error adding snippet:', error);
      return;
    }

    fetchSnippets();
  }

  return (
    <>
      <SEO
        title="UI Playground"
        description="UI Component Playground"
        meta={[
          { name: 'robots', content: 'noindex, nofollow' }
        ]}
      />
      <HeroSection />
      <div className="container mx-auto py-8">
        <div className="mt-16">
          <h1 className="text-4xl font-bold mb-8">UI Component Playground</h1>
          <button
            onClick={addSnippet}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Snippet
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <p>Loading snippets...</p>
          ) : (
            <div id="snippet-list" className="space-y-4">
              {snippets.map(snippet => (
                <div key={snippet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{snippet.title}</h2>
                    <p className="text-gray-700 mb-4">{snippet.language}</p>
                    <SyntaxHighlighter language={snippet.language} style={dracula}>
                      {snippet.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-12">
          <ButtonsShowcase />
          <CardsShowcase />
          <DialogShowcase />
          <MegaMenuShowcase />
        </div>
      </div>
    </>
  );
}
