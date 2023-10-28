import { createClient } from "@supabase/supabase-js";
import type { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";
import { parse, serialize } from "cookie";

const options = {
  httpOnly: true,
  path: "/",
  sameSite: "strict",
} as const;

const getCookieStorage = (
  context: MarkoRun.Context,
): SupabaseAuthClientOptions["storage"] => {
  return {
    getItem(key: string) {
      const cookie = context.request.headers.get("cookie");
      return cookie ? parse(cookie)?.[key] : null;
    },
    removeItem(key: string) {
      const cookie = serialize(key, "", { ...options, maxAge: -1 });
      context.request.headers.append("set-cookie", cookie);
    },
    setItem(key: string, value: string) {
      const cookie = serialize(key, value, { ...options, maxAge: 610000 });
      context.request.headers.append("set-cookie", cookie);
    },
  };
};

export const initSupabase = (context: MarkoRun.Context) => {
  return createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { flowType: "pkce", storage: getCookieStorage(context) } },
  );
};
