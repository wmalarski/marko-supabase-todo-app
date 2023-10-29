import { initSupabase } from "../server/supabase";

const handler: MarkoRun.Handler = async (context, next) => {
  const cookies: string[] = [];

  context.supabase = initSupabase({
    context,
    onAppendCookie: cookies.push,
  });

  const response = await next();

  cookies.forEach((cookie) => {
    response.headers.append("set-cookie", cookie);
  });

  return response;
};

export default handler;
