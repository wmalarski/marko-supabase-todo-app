import { redirectToPath } from "../../../../server/errors";

export const GET: MarkoRun.Handler = async (context) => {
  console.log({ context });

  const response = await context.supabase.auth.signOut();

  console.log({ response });

  return redirectToPath({ path: "/" });
};
