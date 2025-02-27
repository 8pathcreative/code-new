import { useCategoriesStore } from './categories';

export function searchResources(resources: Resource[], query: string, categorySlug?: string): Resource[] {
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

// This is our Resource type definition
export interface Resource {
  category_id: string;
  id: number;
  title: string;
  description: string;
  tags: string[];
  // other properties...
}