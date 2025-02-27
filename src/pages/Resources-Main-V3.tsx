import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Layout/Header';
import { ResourceCard } from '@/components/Resources/ResourceCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDownIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for resources
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
    description: 'Get started with TypeScript and learn how to write type-safe JavaScript code.',
    url: 'https://example.com/typescript-basics',
    image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1740&auto=format&fit=crop',
    categories: ['TypeScript', 'JavaScript', 'Frontend'],
    type: 'tutorial',
    level: 'beginner',
    publishedAt: '2023-09-01T12:00:00Z',
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredResources, setFilteredResources] = useState(MOCK_RESOURCES);

  // Filter resources based on search, category, type, and level
  useEffect(() => {
    const filtered = MOCK_RESOURCES.filter((resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || resource.categories.includes(selectedCategory);
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesType && matchesLevel;
    });

    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory, selectedType, selectedLevel]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedLevel('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Resources" description="Explore our collection of resources to learn and grow." />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Resources</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="React">React</SelectItem>
              <SelectItem value="Next.js">Next.js</SelectItem>
              <SelectItem value="TypeScript">TypeScript</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tutorial">Tutorial</SelectItem>
              <SelectItem value="article">Article</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={resetFilters}>
            <XIcon className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>

        {/* Resource List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}