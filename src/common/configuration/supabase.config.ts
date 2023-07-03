import { registerAs } from '@nestjs/config';

export interface SupabaseConfigEnv {
  url: string;
  key: string;
}

export type SupabaseConfig = Record<string, SupabaseConfigEnv>;

export default registerAs('supabase', () => {
  const supabase_credentials = process.env.SUPABASE_CREDENTIALS || '{}';
  const supabase: SupabaseConfig = JSON.parse(supabase_credentials);
  return supabase;
});
