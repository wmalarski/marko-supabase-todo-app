import { initSupabase } from "../server/supabase";

const handler: MarkoRun.Handler = async (context, next) => {
  const cookies: string[] = [];

  context.supabase = initSupabase({
    context,
    saveCookie: (cookie) => {
      if (cookie) {
        cookies.push(cookie);
      }
    },
  });

  const response = await next();

  cookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
};

export default handler;
