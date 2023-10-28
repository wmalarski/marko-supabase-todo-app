import { decode } from "decode-formdata";
import { literal, object, safeParseAsync } from "valibot";
import { invalidRequestError } from "../../../../server/errors";

export const POST: MarkoRun.Handler = async (context) => {
  const parsed = await safeParseAsync(
    object({ provider: literal("google") }),
    decode(await context.request.formData()),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  console.log({ context, form: parsed });

  const response = await context.supabase.auth.signInWithOAuth({
    provider: parsed.output.provider,
  });

  console.log({ response });

  return new Response(JSON.stringify(response), { status: 200 });
};
