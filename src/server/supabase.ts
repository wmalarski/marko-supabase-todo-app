import { createClient } from "@supabase/supabase-js";
import type { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";
import { CookieSerializeOptions, parse, serialize } from "cookie";
import { Database } from "./types";

const options: CookieSerializeOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
};

type InitSupabaseArgs = {
  context: MarkoRun.Context;
  saveCookie: (cookie: string) => void;
};

const getCookieStorage = ({
  context,
  saveCookie,
}: InitSupabaseArgs): SupabaseAuthClientOptions["storage"] => {
  const cookie = context.request.headers.get("cookie");
  const parsed = cookie ? parse(cookie) : {};

  return {
    getItem(key) {
      return parsed[key];
    },
    removeItem(key) {
      saveCookie(serialize(key, "deleted", { ...options, maxAge: 0 }));
    },
    setItem(key, value) {
      saveCookie(serialize(key, value, { ...options, maxAge: 610000 }));
    },
  };
};

export const initSupabase = (args: InitSupabaseArgs) => {
  return createClient<Database>(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { flowType: "pkce", storage: getCookieStorage(args) } },
  );
};
