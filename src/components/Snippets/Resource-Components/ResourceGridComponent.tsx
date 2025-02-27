import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ResourceCard from 'src/components/ResourceCard';
import { getResources, getCategories } from '@/lib/resources';
import type { Resource as ResourceType, Category } from '@/lib/supabase';

interface ResourceGridProps {
  categoryId?: string;
  featured?: boolean;
  searchQuery?: string;
  limit?: number;
  tags?: string[];
}

export function ResourceGrid({
  categoryId,
  featured,
  searchQuery,
  limit,
  tags,
}: ResourceGridProps) {
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch categories first
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Then fetch resources
        const resourcesData = await getResources({
          categoryId,
          featured,
          searchQuery,
          limit,
          tags,
        });
        setResources(resourcesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [categoryId, featured, searchQuery, limit, tags?.join(',')]);

  // Sort resources (featured first)
  const sortedResources = [...resources].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
  
  // Find category name for each resource
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Uncategorized';
  };
  
  // Render loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ResourceCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedResources.map(resource => (
        <ResourceCard
          key={resource.id}
          title={resource.title}
          description={resource.description}
          category={getCategoryName(resource.category_id)}
          tags={resource.tags || []}
          image={resource.image || ''}
          url={resource.url}
          featured={resource.featured}
          dateAdded={resource.date_added}
        />
      ))}
      
      {sortedResources.length === 0 && !isLoading && (
        <div className="col-span-full text-center p-8">
          <h3 className="text-xl font-medium mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}

// Skeleton loader for resource cards
function ResourceCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Skeleton className="w-full aspect-[16/9]" />
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      <div className="px-5 py-4 border-t">
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}