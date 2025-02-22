import React from 'react';
import { SEO } from '@/components/SEO';
import { HeroSection } from './HeroSection';
import { PlaygroundSection } from './PlaygroundSection';

export function Playground() {
  return (
    <>
      <SEO
        title="UI Playground"
        description="UI Component Playground"
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEO>
      <HeroSection />
      <PlaygroundSection />
    </>
  );
}

// filepath: /Users/neilhumphrey/Desktop/code-new/src/pages/HeroSection.tsx
import React from 'react';

export function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <BackgroundPattern />
      <GradientDecoration />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <HeroContent />
        <HeroImage />
      </div>
    </div>
  );
}

// filepath: /Users/neilhumphrey/Desktop/code-new/src/pages/PlaygroundSection.tsx
import React from 'react';
import { useDialog } from '../hooks/useDialog';
import { ButtonsShowcase } from '../components/ButtonsShowcase';
import { CardsShowcase } from '../components/CardsShowcase';
import { DialogShowcase } from '../components/DialogShowcase';
import { MegaMenuShowcase } from '../components/MegaMenuShowcase';

export function PlaygroundSection() {
  return (
    <div className="container py-8">
      <div className="mt-16">
        <h1 className="text-4xl font-bold mb-8">UI Component Playground</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
  {/* Image */}
  <img
    src="https://via.placeholder.com/150"
    alt="Resource Image"
    className="w-1/3 object-cover"
  />
  {/* Content */}
  <div className="p-6 flex-1">
    {/* Title */}
    <h3 className="text-xl font-semibold mb-2">Resource Title</h3>
    {/* Description */}
    <p className="text-gray-600 mb-4">
      This is a brief description of the resource. It provides some context or
      details about what the resource offers.
    </p>
    {/* Button */}
    <a
      href="#"
      className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
    >
      Read More
    </a>
  </div>
</div>

        
        <div className="space-y-12">
          <ButtonsShowcase />
          <CardsShowcase />
          <DialogShowcase />
          <MegaMenuShowcase />
        </div>
      </div>
    </div>
  );
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zaofsdlvcrjeukhngvpg.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchSnippets() {
    let { data, error } = await supabase
        .from('code_snippets')
        .select('*');

    if (error) {
        console.error('Error fetching snippets:', error);
        return;
    }

    populateSnippetList(data);
}

function populateSnippetList(snippets) {
    const container = document.getElementById('snippet-list');
    container.innerHTML = '';

    snippets.forEach(snippet => {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-md rounded-lg overflow-hidden';
        card.innerHTML = `
            <div class="p-4">
                <h2 class="text-xl font-bold mb-2">${snippet.title}</h2>
                <p class="text-gray-700 mb-4">${snippet.language}</p>
                <pre class="bg-gray-200 p-2 rounded">${snippet.code}</pre>
            </div>
        `;
        container.appendChild(card);
    });
}

document.getElementById('add-snippet').addEventListener('click', async () => {
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
});

fetchSnippets();

// filepath: /Users/neilhumphrey/Desktop/code-new/src/hooks/useDialog.ts
import { useState, useCallback } from 'react';

export function useDialog(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  };
}

