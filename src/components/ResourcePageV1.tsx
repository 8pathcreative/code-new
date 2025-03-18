import React, { useState } from 'react'; // removed useEffect since it's unused
import { SEO } from '@/components/SEO';

// Import UI components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ChevronDownIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';

// Create simplified local versions of these components since the imports are not working
const Header = () => <header className="py-4 border-b">Resource Page Header</header>;
const ResourceCard = ({ resource }: { resource: any }) => (
  <div className="border p-4 rounded-lg">
    <h3>{resource.title}</h3>
    <p>{resource.description}</p>
  </div>
);

// Mock data for resources - fixed array structure
const MOCK_RESOURCES = [
  {
    id: 'react-hooks',
    title: 'React Hooks: A Complete Guide',
    description: 'Learn everything you need to know about React Hooks, from useState and useEffect to custom hooks.',
    url: 'https://example.com/react-hooks',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1740&auto=format&fit=crop',
    categories: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    type: 'tutorial',
    level: 'intermediate',
    isNew: true,
    publishedAt: '2023-12-01T12:00:00Z',
  },
  {
    id: 'nextjs-13',
    title: 'Next.js 13: The Ultimate Guide',
    description: 'Explore the new features in Next.js 13 including the app directory, server components, and more.',
    url: 'https://example.com/nextjs-13',
    image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1740&auto=format&fit=crop',
    categories: ['Next.js', 'React', 'Server Components', 'Frontend'],
    type: 'article',
    level: 'advanced',
    publishedAt: '2023-10-15T12:00:00Z',
  },
  {
    id: 'typescript-basics',
    title: 'TypeScript Basics for Beginners',
    description: 'A comprehensive introduction to TypeScript for JavaScript developers.',
    url: 'https://example.com/typescript-basics',
    categories: ['TypeScript', 'JavaScript', 'Frontend'],
    type: 'tutorial',
    level: 'beginner',
    publishedAt: '2023-11-05T12:00:00Z',
  }
];

export const ResourcePageV1: React.FC = () => {
  const [resources] = useState(MOCK_RESOURCES); // Removed setResources since it's unused
  
  return (
    <div className="container mx-auto px-4">
      <SEO title="Resources" description="Browse our collection of resources" />
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};