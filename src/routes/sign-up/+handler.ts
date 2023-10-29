import { decode } from "decode-formdata";
import { email, object, safeParseAsync, string } from "valibot";
import { invalidRequestError, redirectToPath } from "../../server/errors";

export const POST: MarkoRun.Handler = async (context) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decode(await context.request.formData()),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  console.log({ context, form: parsed });

  const response = await context.supabase.auth.signUp({
    email: parsed.output.email,
    password: parsed.output.password,
  });

  if (response.error) {
    return redirectToPath({
      path: "/sign-up",
      query: { message: response.error.message },
    });
  }

  return redirectToPath({
    path: "/sign-up",
    query: { message: "Success", variant: "success" },
  });
};
