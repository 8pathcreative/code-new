import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { HeroSection } from './HeroSection';
import { useDialog } from '../hooks/useDialog';
import { ButtonsShowcase } from '../components/ButtonsShowcase';
import { CardsShowcase } from '../components/CardsShowcase';
import { DialogShowcase } from '../components/DialogShowcase';
import { MegaMenuShowcase } from '../components/MegaMenuShowcase';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export function Playground() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  async function fetchSnippets() {
    let { data, error } = await supabase
      .from('code_snippets')
      .select('*');

    if (error) {
      console.error('Error fetching snippets:', error);
      return;
    }

    setSnippets(data);
  }

  async function addSnippet() {
    const title = prompt('Snippet Title:');
    const language = prompt('Snippet Language:');
    const code = prompt('Snippet Code:');

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
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEO>
      <HeroSection />
      <div className="container py-8">
        <div className="mt-16">
          <h1 className="text-4xl font-bold mb-8">UI Component Playground</h1>
          <button
            onClick={addSnippet}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Snippet
          </button>
          <div id="snippet-list" className="space-y-4">
            {snippets.map(snippet => (
              <div key={snippet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{snippet.title}</h2>
                  <p className="text-gray-700 mb-4">{snippet.language}</p>
                  <pre className="bg-gray-200 p-2 rounded">{snippet.code}</pre>
                </div>
              </div>
            ))}
          </div>
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
