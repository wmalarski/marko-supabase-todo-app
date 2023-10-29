import { createClient } from "@supabase/supabase-js";
import type { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";
import { parse, serialize } from "cookie";

const options = {
  httpOnly: true,
  path: "/",
  sameSite: "strict",
} as const;

type InitSupabaseArgs = {
  context: MarkoRun.Context;
  saveCookie: (cookie: string) => void;
};

const getCookieStorage = ({
  context,
  saveCookie,
}: InitSupabaseArgs): SupabaseAuthClientOptions["storage"] => {
  return {
    getItem(key: string) {
      const cookie = context.request.headers.get("cookie");
      return cookie ? parse(cookie)?.[key] : null;
    },
    removeItem(key: string) {
      saveCookie(serialize(key, "", { ...options, maxAge: -1 }));
    },
    setItem(key: string, value: string) {
      saveCookie(serialize(key, value, { ...options, maxAge: 610000 }));
    },
  };
};

export const initSupabase = (args: InitSupabaseArgs) => {
  return createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { flowType: "pkce", storage: getCookieStorage(args) } },
  );
};
