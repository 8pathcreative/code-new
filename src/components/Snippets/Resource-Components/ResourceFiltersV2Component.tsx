import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
}

interface ResourceFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  resourceCounts: Record<string, number>;
}

export function ResourceFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  resourceCounts,
}: ResourceFiltersProps) {
  return (
    <div className="w-full overflow-auto pb-2">
      <Tabs
        value={selectedCategory}
        onValueChange={onSelectCategory}
        className="w-full"
      >
        <TabsList className="inline-flex h-10 min-w-full p-1">
          {categories.map(category => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium",
                "transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "whitespace-nowrap"
              )}
            >
              {category.name}
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">
                {resourceCounts[category.id] || 0}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}