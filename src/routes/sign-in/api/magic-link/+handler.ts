import { decode } from "decode-formdata";
import { email, object, parseAsync, string } from "valibot";

export const POST: MarkoRun.Handler = async (context) => {
  const form = await parseAsync(
    object({ email: string([email()]) }),
    decode(await context.request.formData()),
  );

  console.log({ context, form });

  const response = await context.supabase.auth.signInWithOtp({
    email: form.email,
  });

  console.log({ response });

  return new Response(JSON.stringify(response), { status: 200 });
};
