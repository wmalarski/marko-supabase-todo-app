import { decode } from "decode-formdata";
import { email, object, parseAsync, string } from "valibot";

export const POST: MarkoRun.Handler = async (context) => {
  const form = await parseAsync(
    object({ email: string([email()]), password: string() }),
    decode(await context.request.formData()),
  );

  console.log({ context, form });

  const response = await context.supabase.auth.signUp({
    email: form.email,
    password: form.password,
  });

  console.log({ response });

  return new Response(JSON.stringify(response), { status: 200 });
};
