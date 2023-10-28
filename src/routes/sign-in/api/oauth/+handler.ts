import { decode } from "decode-formdata";
import { literal, object, parseAsync } from "valibot";

export const POST: MarkoRun.Handler = async (context) => {
  const form = await parseAsync(
    object({ provider: literal("google") }),
    decode(await context.request.formData()),
  );

  console.log({ context, form });

  const response = await context.supabase.auth.signInWithOAuth({
    provider: form.provider,
  });

  console.log({ response });

  return new Response(JSON.stringify(response), { status: 200 });
};
