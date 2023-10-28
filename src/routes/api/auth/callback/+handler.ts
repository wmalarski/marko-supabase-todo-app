import { object, safeParseAsync, string } from "valibot";
import { invalidRequestError, redirectToPath } from "../../../../server/errors";

export const GET: MarkoRun.Handler = async (context) => {
  console.log({ context });
  const parsed = await safeParseAsync(
    object({ code: string() }),
    Object.fromEntries(context.url.searchParams.entries()),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const response = await context.supabase.auth.exchangeCodeForSession(
    parsed.output.code,
  );

  console.log({ response });

  return redirectToPath("/", {});
};
