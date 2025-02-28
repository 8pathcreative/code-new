import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { MegaMenu } from '@/components/Snippets/Resource-Components/MegaMenuComponent';
import { ResourceGrid } from '@/components/Snippets/Resource-Components/ResourceGridComponent';
import { ResourceFilters } from '@/components/Snippets/Resource-Components/ResourceFiltersComponent';
import { ResourceSearch } from '@/components/Snippets/Resource-Components/ResourceSearchComponent';

// Mock resource categories for the example
const categories = [
  { id: 'all', name: 'All Resources' },
  { id: 'frameworks', name: 'Frameworks' },
  { id: 'libraries', name: 'Libraries' },
  { id: 'tools', name: 'Tools & Utilities' },
  { id: 'ui', name: 'UI Components' },
  { id: 'learning', name: 'Learning Resources' },
  { id: 'apis', name: 'APIs & Services' },
];

// Mock resources data
const initialResources = [
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
  // Add more resources here...
  // Each with different categories, some featured, some not
];

// Add a proper index signature to your object type
interface FilterState {
  [key: string]: boolean | string | number;
}

// If it's a mapping of categories to their properties
interface CategoryMap {
  [categoryId: string]: {
    name: string;
    count: number;
    isSelected?: boolean;
  };
}

// const categoryMap: CategoryMap = {}; // This line is not needed and can be removed

// Now you can safely do:
// const category = categoryMap[categoryId]; // This line is not needed and can be removed

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

interface ResourceGridProps {
  resources: Resource[];
  isLoading: boolean;
}

export default function ResourcesPage() {
  const [resources] = useState(initialResources);
  const [filteredResources, setFilteredResources] = useState(initialResources);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const [filters, setFilters] = useState<FilterState>({}); // This line is not needed and can be removed

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
  const resourceCounts = categories.reduce<{ [key: string]: number }>((acc, category) => {
    acc[category.id] = category.id === 'all' 
      ? resources.length 
      : resources.filter(r => r.category === category.id).length;
    return acc;
  }, {});

  // Now you can safely access properties with string indices
  // const handleFilterChange = (filterName: string, value: boolean | string | number) => {
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     [filterName]: value
  //   }));
  // };

  // When accessing the filter values
  // const currentValue = filters[filterName]; // No more type error

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

const CodeResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch resources and update state
    fetch('/api/resources')
      .then(response => response.json())
      .then(data => {
        setResources(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching resources:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Code Resources</h1>
      <ResourceGrid resources={resources} isLoading={isLoading} />
    </div>
  );
};