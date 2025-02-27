// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';

// Define the environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client if credentials are available
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Connection store interface
interface ConnectionState {
  isConnected: boolean;
  setConnected: (status: boolean) => void;
}

// Create and export the connection store
export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: Boolean(supabaseUrl && supabaseKey),
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