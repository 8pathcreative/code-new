import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Connection store
type ConnectionStore = {
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
};

export const useConnectionStore = create<ConnectionStore>((set) => ({
  isConnected: Boolean(supabaseUrl && supabaseKey),
  setIsConnected: (status) => set({ isConnected: status }),
}));

// Initialize Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

// Export types
export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  category_id: string;
  icon: string;
};