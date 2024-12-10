import { createClient } from '@supabase/supabase-js';
import Storage from 'expo-sqlite/kv-store';

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseUrl = "https://tebircgjqfabjalitdse.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYmlyY2dqcWZhYmphbGl0ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MjU4NDcsImV4cCI6MjA0OTQwMTg0N30.nVQWPxhrhsRi31LA5CUwsdzjtIMDPmdOHnveaNAb3YA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
