import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../server/types";

declare module "@marko/run" {
  export interface Context {
    supabase: SupabaseClient<Database>;
    session: Session | null;
  }
}

export {};
