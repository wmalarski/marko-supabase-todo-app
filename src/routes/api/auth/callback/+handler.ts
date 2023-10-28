import { object, safeParseAsync, string } from "valibot";
import { invalidRequestError } from "../../../../server/errors";

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

  // return context.redirect(paths.index());
  return new Response(JSON.stringify(response), { status: 200 });
};
