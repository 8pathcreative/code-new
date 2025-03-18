// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Create and export the supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Connection store interface
interface ConnectionState {
  isConnected: boolean;
  setConnected: (status: boolean) => void;
}

// Create and export the connection store
export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: Boolean(supabaseUrl && supabaseAnonKey),
  setConnected: (status: boolean) => set({ isConnected: status }),
}));

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