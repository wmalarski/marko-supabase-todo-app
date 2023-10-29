import { decode } from "decode-formdata";
import { email, object, safeParseAsync, string } from "valibot";
import { invalidRequestError, redirectToPath } from "../../../../server/errors";
import { buildSearchParams } from "../../../../utils/searchParams";

export const POST: MarkoRun.Handler = async (context) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decode(await context.request.formData()),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const response = await context.supabase.auth.signInWithPassword({
    email: parsed.output.email,
    password: parsed.output.password,
  });

  console.log({ response });

  if (response.error) {
    const params = buildSearchParams({ message: response.error.message });

    const url = new URL(`${context.url.pathname}?${params}`, context.url);

    console.log({ url });

    return Response.redirect(url);
  }

  return redirectToPath("/todos", {});
};
