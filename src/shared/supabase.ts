import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://racamjrcostgoshrhtwk.supabase.com';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);