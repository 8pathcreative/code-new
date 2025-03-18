// src/lib/resources.ts
import { supabase, type Resource, type Category } from './supabase';

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

export async function getResources(options: {
  categoryId?: string;
  featured?: boolean;
  searchQuery?: string;
  limit?: number;
  tags?: string[];
}): Promise<Resource[]> {
  let query = supabase.from('resources').select('*');

  if (options.categoryId) {
    query = query.eq('category_id', options.categoryId);
  }

  if (options.featured !== undefined) {
    query = query.eq('featured', options.featured);
  }

  if (options.searchQuery) {
    query = query.or(
      `title.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%`
    );
  }

  if (options.tags && options.tags.length > 0) {
    // This assumes tags are stored as an array in Supabase
    query = query.contains('tags', options.tags);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query.order('date_added', { ascending: false });

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }

  return data || [];
}

export async function getResourceWithCategory(resourceId: string): Promise<{
  resource: Resource | null;
  category: Category | null;
}> {
  const { data: resource, error: resourceError } = await supabase
    .from('resources')
    .select('*')
    .eq('id', resourceId)
    .single();

  if (resourceError) {
    console.error('Error fetching resource:', resourceError);
    return { resource: null, category: null };
  }

  if (!resource) {
    return { resource: null, category: null };
  }

  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', resource.category_id)
    .single();

  if (categoryError) {
    console.error('Error fetching category:', categoryError);
    return { resource, category: null };
  }

  return { resource, category };
}