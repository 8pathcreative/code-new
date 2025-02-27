import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { supabase, type Resource, useConnectionStore } from '@/lib/supabase';
import { useCategoriesStore } from '@/lib/categories';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { SEO } from '@/components/SEO';
import ResourceCard from '@/components/ResourceCard';

const Home: React.FC = () => {
  const { categories, fetchCategories } = useCategoriesStore();
  const { isConnected } = useConnectionStore();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isConnected) {
        setResources([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch categories first
        await fetchCategories();
        
        // Then fetch resources
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setResources(data || []);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch resources';
        console.error('Error fetching data:', error);
        setError(errorMessage);
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [fetchCategories, isConnected]);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || 
      categories.find(cat => cat.id === resource.category_id)?.slug === selectedCategory;
    
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const currentCategory = categories.find(cat => cat.slug === selectedCategory);
  const seoTitle = currentCategory 
    ? `${currentCategory.name} Resources for Developers`
    : 'Code Resources - Best Resources for Developers';
  const seoDescription = currentCategory
    ? `Find the best ${currentCategory.name.toLowerCase()} resources, tutorials, and tools for developers and designers.`
    : 'A curated collection of the best resources for designers and developers. Find tutorials, tools, and learning materials to enhance your skills.';

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="container py-16">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Code Tutorials & Resources
            </h1>
            <p className="text-xl text-muted-foreground">
              A curated collection of the best resources for designers and developers
            </p>

            <div className="mt-10 relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-2xl" />
              <div className="relative flex items-center max-w-2xl mx-auto">
                <Search className="absolute left-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-12 h-12 bg-background/80 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {!isConnected && <ConnectionStatus />}

          {isConnected && (
            <>
              <div className="relative pb-12 mb-8">
                <div className="flex gap-2 overflow-x-auto pb-6 justify-center">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                    onClick={() => setSelectedCategory('all')}
                    className="min-w-[100px]"
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.slug ? 'default' : 'ghost'}
                      onClick={() => setSelectedCategory(category.slug)}
                      className="min-w-[100px]"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-destructive">
                  <p>{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;