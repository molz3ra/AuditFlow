import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// O '!' no final diz ao TypeScript: "Eu garanto que essa chave vai existir"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);