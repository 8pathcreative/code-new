import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { SnippetsList } from '@/components/Snippets/SnippetsList';

// Mock data - replace with actual API call in production
const MOCK_SNIPPETS = [
  {
    id: '1',
    title: 'React useState Hook Example',
    description: 'A simple example of using the useState hook in React',
    language: 'typescript',
    code: 'const [count, setCount] = useState(0);',
    tags: ['react', 'hooks', 'state'],
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-01-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'CSS Flexbox Center Alignment',
    description: 'Center align content both horizontally and vertically with flexbox',
    language: 'css',
    code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
    tags: ['css', 'flexbox', 'layout'],
    createdAt: '2023-02-10T09:30:00Z',
    updatedAt: '2023-02-12T14:15:00Z',
  },
  {
    id: '3',
    title: 'JavaScript Array Methods',
    description: 'Common array methods in JavaScript',
    language: 'javascript',
    code: `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);`,
    tags: ['javascript', 'arrays', 'methods'],
    createdAt: '2023-03-05T16:45:00Z',
    updatedAt: '2023-03-05T16:45:00Z',
  },
];

export function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        // In a real app, replace with an actual API call:
        // const response = await fetch('/api/snippets');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setSnippets(MOCK_SNIPPETS);
          setLoading(false);
        }, 500); // Simulate network delay
      } catch (err) {
        console.error('Error fetching snippets:', err);
        setError('Failed to load snippets. Please try again later.');
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <>
      <SEO 
        title="Code Snippets"
        description="Browse and search through our collection of useful code snippets for web development"
      />
      
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Code Snippets</h1>
          </div>
        </header>
        
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <SnippetsList 
              snippets={snippets}
              isLoading={loading}
              error={error}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default SnippetsPage;