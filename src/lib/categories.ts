import { create } from 'zustand';
import { supabase, type Category } from './supabase';
import { useConnectionStore } from './supabase';

type CategoriesStore = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  getBySlug: (slug: string) => Category | undefined;
  getById: (id: string) => Category | undefined;
};

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    const { isConnected } = useConnectionStore.getState();
    if (!isConnected) {
      set({ categories: [], isLoading: false, error: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      set({ categories: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch categories' });
      console.error('Error fetching categories:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  getBySlug: (slug: string) => {
    return get().categories.find(category => category.slug === slug);
  },
  getById: (id: string) => {
    return get().categories.find(category => category.id === id);
  }
}));