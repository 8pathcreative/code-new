import { Resource } from './types';
import { useCategoriesStore } from './categories';

export function searchResources(resources: Resource[], query: string, categorySlug?: string) {
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  const { categories } = useCategoriesStore.getState();
  
  return resources.filter(resource => {
    // Category filter
    if (categorySlug && categorySlug !== 'all') {
      const category = categories.find(cat => cat.slug === categorySlug);
      if (!category || resource.category_id !== category.id) return false;
    }

    // Search filter
    if (searchTerms.length === 0) return true;

    const searchableText = [
      resource.title,
      resource.description,
      resource.tags?.join(' ') || ''
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}

const searchResources = (resources: Resource[], query: string): Resource[] => {
  return resources.filter(resource =>
    resource.title.includes(query) ||
    resource.description.includes(query) ||
    resource.tags.some(tag => tag.includes(query)) // Access the tags property
  );
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// filepath: /Users/neilhumphrey/Desktop/code-new/src/types.ts
export interface Resource {
  id: number;
  title: string;
  description: string;
  tags: string[]; // Add the tags property
  // other properties...
}