import { type SupabaseClient, createClient } from '@supabase/supabase-js'
import { useMemo } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const useSupabase = (): SupabaseClient => {
    const supabase = useMemo(() => createClient(supabaseUrl, supabaseAnonKey), [supabaseUrl, supabaseAnonKey])
    return supabase;
};