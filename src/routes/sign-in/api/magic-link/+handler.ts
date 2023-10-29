import { decode } from "decode-formdata";
import { email, object, safeParseAsync, string } from "valibot";
import { invalidRequestError } from "../../../../server/errors";
import { buildPath } from "../../../../utils/paths";

export const POST: MarkoRun.Handler = async (context) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]) }),
    decode(await context.request.formData()),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const callbackPath = buildPath("/api/auth/callback", {});
  const emailRedirectTo = `${context.url.origin}${callbackPath}`;

  const response = await context.supabase.auth.signInWithOtp({
    email: parsed.output.email,
    options: { emailRedirectTo },
  });

  console.log({ response });

  return new Response(JSON.stringify(response), { status: 200 });
};
