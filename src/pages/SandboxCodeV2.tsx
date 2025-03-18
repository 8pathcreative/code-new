import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';

// Types for our resources
interface Category {
  id: string;
  name: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  url: string;
  featured: boolean;
  dateAdded: string;
}

// Mock resource categories for the example
const categories: Category[] = [
  { id: 'all', name: 'All Resources' },
  { id: 'frameworks', name: 'Frameworks' },
  { id: 'libraries', name: 'Libraries' },
  { id: 'tools', name: 'Tools & Utilities' },
  { id: 'ui', name: 'UI Components' },
  { id: 'learning', name: 'Learning Resources' },
  { id: 'apis', name: 'APIs & Services' },
];

// Mock resources data
const initialResources: Resource[] = [
  {
    id: '1',
    title: 'React Design Patterns',
    description: 'Learn advanced design patterns for React applications',
    category: 'frameworks',
    tags: ['react', 'patterns', 'architecture'],
    image: '/images/resources/react-patterns.webp',
    url: '/resources/react-patterns',
    featured: true,
    dateAdded: '2023-11-22'
  },
  {
    id: '2',
    title: 'Vue.js Component Library',
    description: 'Pre-built components for Vue applications',
    category: 'libraries',
    tags: ['vue', 'components', 'ui'],
    image: '/images/resources/vue-components.webp',
    url: '/resources/vue-components',
    featured: false,
    dateAdded: '2023-10-15'
  }
];

// Resource component definitions
const MegaMenu: React.FC = () => (
  <header className="border-b p-4 bg-background">
    <div className="container mx-auto flex justify-between items-center">
      <div className="font-bold text-xl">Code Resources</div>
      <nav>
        <ul className="flex gap-4">
          <li>Home</li>
          <li>Resources</li>
          <li>About</li>
        </ul>
      </nav>
    </div>
  </header>
);

interface ResourceSearchProps {
  onSearch: (query: string) => void;
  query: string;
}

const ResourceSearch: React.FC<ResourceSearchProps> = ({ onSearch, query }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search resources..."
      className="w-full p-2 pl-10 rounded-md border"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
    />
    <span className="absolute left-3 top-2.5">🔍</span>
  </div>
);

interface ResourceFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  resourceCounts: Record<string, number>;
}

const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  resourceCounts
}) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <button
        key={category.id}
        className={`px-3 py-1 rounded-full border ${
          selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-background'
        }`}
        onClick={() => onSelectCategory(category.id)}
      >
        {category.name} ({resourceCounts[category.id] || 0})
      </button>
    ))}
  </div>
);

interface ResourceGridProps {
  resources: Resource[];
  isLoading: boolean;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, isLoading }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {isLoading ? (
      Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4 h-64 animate-pulse bg-muted"></div>
      ))
    ) : (
      resources.map((resource) => (
        <div key={resource.id} className="rounded-lg border p-4">
          <h3 className="font-medium text-lg">{resource.title}</h3>
          <p className="text-muted-foreground text-sm mt-2">{resource.description}</p>
          <div className="mt-4 flex gap-2">
            {resource.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))
    )}
  </div>
);

export default function ResourcesPage() {
  const [resources] = useState<Resource[]>(initialResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(initialResources);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter resources based on category and search query
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filtered = resources;
      
      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(resource => resource.category === selectedCategory);
      }
      
      // Apply search filter if query exists
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(resource => 
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      setFilteredResources(filtered);
      setIsLoading(false);
    }, 300);
  }, [selectedCategory, searchQuery, resources]);

  // Count resources by category for the filter badges
  const resourceCounts = categories.reduce<Record<string, number>>((acc, category) => {
    acc[category.id] = category.id === 'all' 
      ? resources.length 
      : resources.filter(r => r.category === category.id).length;
    return acc;
  }, {});

  return (
    <>
      <SEO
        title="Developer Resources & Tools | Code Tutorials"
        description="Discover the best web development resources, libraries, tools, and learning materials curated for modern developers."
      />
      
      <MegaMenu />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Hero section */}
          <div className="py-10 md:py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Developer Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover handpicked tools, libraries, components, and learning materials to accelerate your development workflow.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="flex flex-col gap-6 mb-10">
            <ResourceSearch 
              onSearch={setSearchQuery} 
              query={searchQuery}
            />
            <ResourceFilters 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              resourceCounts={resourceCounts}
            />
          </div>
          
          {/* Resource Grid */}
          <ResourceGrid 
            resources={filteredResources}
            isLoading={isLoading}
          />
          
          {/* Empty state */}
          {!isLoading && filteredResources.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-6">
                Try changing your filters or search term
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-primary hover:text-primary/80"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}