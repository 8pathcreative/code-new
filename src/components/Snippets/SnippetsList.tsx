import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define TypeScript interfaces
interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface SnippetsListProps {
  snippets: Snippet[];
  isLoading?: boolean;
  error?: string | null;
}

export function SnippetsList({ snippets, isLoading = false, error = null }: SnippetsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  
  // Filter snippets based on search term and selected language
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = searchTerm === '' || 
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = selectedLanguage === null || snippet.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });
  
  // Get unique languages for the filter dropdown
  const languages = Array.from(new Set(snippets.map(snippet => snippet.language)));
  
  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse flex flex-col space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>Error loading snippets: {error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search snippets
            </label>
            <input
              type="text"
              id="search"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Search by title, description or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by language
            </label>
            <select
              id="language"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedLanguage || ''}
              onChange={(e) => setSelectedLanguage(e.target.value || null)}
            >
              <option value="">All languages</option>
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredSnippets.length} of {snippets.length} snippets
        </p>
        
        {/* Snippets list */}
        {filteredSnippets.length > 0 ? (
          <div className="space-y-6">
            {filteredSnippets.map((snippet) => (
              <Link
                key={snippet.id}
                to={`/snippets/${snippet.id}`}
                className="block bg-white overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{snippet.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {snippet.language}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{snippet.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 text-right text-xs text-gray-500">
                  Updated {new Date(snippet.updatedAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
            <h3 className="mt-2 text-lg font-medium text-gray-900">No snippets found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}