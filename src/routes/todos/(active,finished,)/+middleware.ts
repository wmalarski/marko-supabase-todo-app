import { redirectToPath } from "../../../server/errors";

const handler: MarkoRun.Handler = async (context, next) => {
  const session = await context.supabase.auth.getSession();

  if (session.error || !session.data.session) {
    return redirectToPath({ path: "/sign-in" });
  }

  context.session = session.data.session || null;

  return next();
};

export default handler;
