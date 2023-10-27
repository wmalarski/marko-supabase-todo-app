import { initSupabase } from "../server/supabase";

const handler: MarkoRun.Handler = async (context, next) => {
  context.supabase = initSupabase(context);
  return next();
};

export default handler;
