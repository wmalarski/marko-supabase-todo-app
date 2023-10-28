import type { Session, SupabaseClient } from "@supabase/supabase-js";

declare module "@marko/run" {
  export interface Context {
    supabase: SupabaseClient;
    session: Session | null;
  }
}

export {};
