// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions based on your database schema
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  parent_id?: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  category_id: string;
  tags?: string[];
  featured: boolean;
  date_added: string;
  views_count?: number;
  likes_count?: number;
};