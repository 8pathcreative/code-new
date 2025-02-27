import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { MegaMenu } from '@/components/Snippets/Resource-Components/MegaMenuComponent';
import { ResourceCard, Resource } from 'src/components/ResourceCard_2';
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
import { supabase } from '@/lib/supabase';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('resource_categories')
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;

        // Fetch resources
        const { data: resourcesData, error: resourcesError } = await supabase
          .from('resources_row')
          .select('*')
          .order('created_at', { ascending: false });

        if (resourcesError) throw resourcesError;

        // Process and transform resources data if needed
        const processedResources = resourcesData.map((resource: any) => ({
          ...resource,
          // Ensure categories is an array
          categories: typeof resource.categories === 'string'
            ? resource.categories.split(',').map((c: string) => c.trim())
            : (Array.isArray(resource.categories) ? resource.categories : []),
        }));

        setCategories(categoriesData);
        setResources(processedResources);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter resources based on search query and filters
  const filteredResources = resources.filter(resource => {
    // Filter by search query
    const matchesSearch = searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by selected category
    const matchesCategory = selectedCategory === 'all' ||
      resource.categories.includes(selectedCategory);

    // Filter by type
    const matchesType = selectedType === 'all' ||
      resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Get unique resource types
  const resourceTypes = [...new Set(resources.map(resource => resource.type))];

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
  };

  return (
    <>
      <SEO
        title="Developer Resources"
        description="Curated collection of tools, tutorials, and resources for web developers and designers."
      />

      <MegaMenu />

      <main className="container mx-auto pt-28 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Developer Resources
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Curated collection of the best tools, libraries and learning resources for developers
          </p>

          {/* Search and Filter Controls */}
          <div className="bg-muted/40 rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[130px]">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={selectedCategory === 'all' ? 'bg-accent' : ''}
                      onClick={() => setSelectedCategory('all')}
                    >
                      All categories
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        className={selectedCategory === category.slug ? 'bg-accent' : ''}
                        onClick={() => setSelectedCategory(category.slug)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active filters */}
            {(selectedCategory !== 'all' || selectedType !== 'all' || searchQuery) && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <div className="bg-primary/10 text-primary rounded-full px-2 py-1 flex items-center gap-1">
                    <span>
                      {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                    </span>
                    <button onClick={() => setSelectedCategory('all')}>
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {selectedType !== 'all' && (
                  <div className="bg-primary/10 text-primary rounded-full px-2 py-1 flex items-center gap-1">
                    <span>{selectedType}</span>
                    <button onClick={() => setSelectedType('all')}>
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="bg-primary/10 text-primary rounded-full px-2 py-1 flex items-center gap-1">
                    <span>"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')}>
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto text-xs">
                  Reset all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="h-10 p-1">
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedCategory('all')}
                  className="px-4"
                >
                  All Resources
                </TabsTrigger>
                {categories.slice(0, 8).map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className="px-4"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-6">
              {/* Resources Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-80 bg-muted rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              ) : filteredResources.length === 0 ? (
                <div className="text-center p-12">
                  <h3 className="text-lg font-medium mb-2">No resources found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Content for each category tab */}
            {categories.slice(0, 8).map((category) => (
              <TabsContent key={category.id} value={category.slug} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.filter(resource =>
                    resource.categories.includes(category.slug)
                  ).map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
                {filteredResources.filter(resource =>
                  resource.categories.includes(category.slug)
                ).length === 0 && (
                  <div className="text-center p-12">
                    <h3 className="text-lg font-medium mb-2">No resources found in this category</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </>
  );
}