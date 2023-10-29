import { decode } from "decode-formdata";
import { literal, object, safeParseAsync } from "valibot";
import { invalidRequestError } from "../../../../server/errors";
import { buildPath } from "../../../../utils/paths";

export const POST: MarkoRun.Handler = async (context) => {
  const parsed = await safeParseAsync(
    object({ provider: literal("google") }),
    decode(await context.request.formData()),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const callbackPath = buildPath("/api/auth/callback", {});
  const redirectTo = `${context.url.origin}${callbackPath}`;

  console.log({ context, form: parsed, callbackPath });

  const response = await context.supabase.auth.signInWithOAuth({
    provider: parsed.output.provider,
    options: { redirectTo },
  });

  console.log({ response });

  return new Response(JSON.stringify(response), { status: 200 });
};
