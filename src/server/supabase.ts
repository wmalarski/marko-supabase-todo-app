import { createClient } from "@supabase/supabase-js";
import type { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";
import { parse, serialize } from "cookie";

export const getCookieStorage = (
  context: MarkoRun.Context,
): SupabaseAuthClientOptions["storage"] => {
  return {
    getItem(key: string): string | Promise<string | null> | null {
      const getSetResponse = context.request.headers.getSetCookie();
      const cookie = context.request.headers.get("cookie");

      console.log("getItem", { getSetResponse, cookie });

      if (!cookie) {
        return null;
      }

      const value = parse(cookie)?.[key];

      console.log("getItem", { value });

      return value;
    },
    removeItem(key: string): void | Promise<void> {
      const cookie = serialize(key, "", {
        httpOnly: true,
        maxAge: -1,
        path: "/",
        sameSite: "strict",
      });

      console.log("removeItem", { key, cookie });

      context.request.headers.append("set-cookie", cookie);
    },
    setItem(key: string, value: string): void | Promise<void> {
      const cookie = serialize(key, value, {
        httpOnly: true,
        maxAge: 610000,
        path: "/",
        sameSite: "strict",
      });

      console.log("setItem", { cookie, key, value });

      context.request.headers.append("set-cookie", cookie);
    },
  };
};

export const initSupabase = (context: MarkoRun.Context) => {
  const env = import.meta.env;
  return createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_KEY,
    { auth: { flowType: "pkce", storage: getCookieStorage(context) } },
  );
};
