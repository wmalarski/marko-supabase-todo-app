import { SupabaseClient } from "@supabase/supabase-js";

declare module "@marko/run" {
  export interface Context {
    supabase: SupabaseClient;
  }
}

export {};
