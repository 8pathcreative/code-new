// src/hooks/useSupabase.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface GenericStringError {
  message: string;
  code?: string;
}

export function useSupabaseQuery<T>(
  tableName: string,
  query: any = {},
  deps: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [errors, setErrors] = useState<GenericStringError[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: result, error: queryError } = await supabase
          .from(tableName)
          .select(query.select || '*')
          .match(query.match || {})
          .order(query.order || { created_at: 'desc' });

        if (queryError) throw queryError;
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, loading, error };
}