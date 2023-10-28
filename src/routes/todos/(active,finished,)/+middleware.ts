import { redirectToPath } from "../../../server/errors";

export const GET: MarkoRun.Handler = async (context, next) => {
  const session = await context.supabase.auth.getSession();

  if (session.error || !session.data.session) {
    return redirectToPath("/sign-in", {});
  }

  context.session = session.data.session;

  return next();
};
