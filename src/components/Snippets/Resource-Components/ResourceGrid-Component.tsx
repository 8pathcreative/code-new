import React from 'react';
import { ResourceCard } from 'src/components/Snippets/Resource-Components/ResourceGrid-Component';
import { Skeleton } from '@/components/ui/skeleton';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  url: string;
  featured?: boolean;
  dateAdded?: string;
}

interface ResourceGridProps {
  resources: Resource[];
  isLoading?: boolean;
}

export function ResourceGrid({ resources, isLoading = false }: ResourceGridProps) {
  // Featured resources appear at the top
  const sortedResources = [...resources].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
  
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
          category={resource.category}
          tags={resource.tags}
          image={resource.image}
          url={resource.url}
          featured={resource.featured}
          dateAdded={resource.dateAdded}
        />
      ))}
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