// src/pages/SnippetsPage.tsx
import React from 'react';
import { SnippetsList } from '../components/Snippets/SnippetsList';

const SnippetsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Code Snippets</h1>
      <SnippetsList />
    </div>
  );
};

export default SnippetsPage;