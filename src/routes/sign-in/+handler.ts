import { decode } from "decode-formdata";
import { email, literal, object, safeParseAsync, string } from "valibot";
import { invalidRequestError, redirectToPath } from "../../server/errors";
import { buildPath } from "../../utils/paths";
import { buildSearchParams } from "../../utils/searchParams";

type SignInArgs = {
  context: MarkoRun.Context;
  decoded: ReturnType<typeof decode>;
};

const magicLinkSignIn = async ({ context, decoded }: SignInArgs) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]) }),
    decoded,
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const callbackPath = buildPath({ path: "/api/auth/callback" });
  const emailRedirectTo = `${context.url.origin}${callbackPath}`;

  const response = await context.supabase.auth.signInWithOtp({
    email: parsed.output.email,
    options: { emailRedirectTo },
  });

  if (response.error) {
    return redirectToPath({
      path: "/sign-in",
      query: { message: response.error.message },
    });
  }

  console.log({ response });

  return redirectToPath({
    path: "/sign-in",
    query: { message: "Success", variant: "success" },
  });
};

export const oauthSignIn = async ({ context, decoded }: SignInArgs) => {
  const parsed = await safeParseAsync(
    object({ provider: literal("google") }),
    decoded,
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const callbackPath = buildPath({ path: "/api/auth/callback" });
  const redirectTo = `${context.url.origin}${callbackPath}`;

  console.log({ context, form: parsed, callbackPath });

  const response = await context.supabase.auth.signInWithOAuth({
    provider: parsed.output.provider,
    options: { redirectTo },
  });

  if (response.error) {
    return redirectToPath({
      path: "/sign-in",
      query: { message: response.error.message },
    });
  }

  return new Response(null, {
    headers: { location: response.data.url },
  });
};

const passwordSignIn = async ({ context, decoded }: SignInArgs) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decoded,
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
    return redirectToPath({
      path: "/sign-in",
      query: { message: response.error.message },
    });
  }

  return redirectToPath({ path: "/todos" });
};

export const POST: MarkoRun.Handler = async (context) => {
  const decoded = decode(await context.request.formData());

  switch (decoded.action) {
    case "password":
      return passwordSignIn({ context, decoded });
    case "oauth":
      return oauthSignIn({ context, decoded });
    case "magic-link":
      return magicLinkSignIn({ context, decoded });
  }

  const params = buildSearchParams({ message: "Invalid request" });
  const url = new URL(`${context.url.pathname}?${params}`, context.url);
  return new Response(null, {
    status: 302,
    headers: { location: String(url) },
  });
};
