import { decode } from "decode-formdata";
import { email, literal, object, safeParseAsync, string } from "valibot";
import { buildPath } from "../utils/paths";
import { redirectCurrentWithQuery, redirectToPath } from "./errors";

const getCallbackUrl = (context: MarkoRun.Context) => {
  const callbackPath = buildPath({ path: "/api/auth/callback" });
  return `${context.url.origin}${callbackPath}`;
};

type SignInArgs = {
  context: MarkoRun.Context;
  formData: FormData;
};

export const magicLinkSignIn = async ({ context, formData }: SignInArgs) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]) }),
    decode(formData),
  );

  if (!parsed.success) {
    return redirectCurrentWithQuery({
      context,
      variant: "error",
      query: { message: parsed.issues[0].message },
    });
  }

  const response = await context.supabase.auth.signInWithOtp({
    email: parsed.output.email,
    options: { emailRedirectTo: getCallbackUrl(context) },
  });

  if (response.error) {
    return redirectCurrentWithQuery({
      context,
      query: { message: response.error.message },
      variant: "error",
    });
  }

  return redirectCurrentWithQuery({
    context,
    query: { message: "Success" },
    variant: "success",
  });
};

export const oauthSignIn = async ({ context, formData }: SignInArgs) => {
  const parsed = await safeParseAsync(
    object({ provider: literal("google") }),
    decode(formData),
  );

  if (!parsed.success) {
    return redirectCurrentWithQuery({
      context,
      variant: "error",
      query: { message: parsed.issues[0].message },
    });
  }

  const response = await context.supabase.auth.signInWithOAuth({
    provider: parsed.output.provider,
    options: { redirectTo: getCallbackUrl(context) },
  });

  if (response.error) {
    return redirectCurrentWithQuery({
      context,
      query: { message: response.error.message },
      variant: "error",
    });
  }

  return new Response(null, {
    headers: { location: response.data.url },
    status: 302,
  });
};

export const passwordSignIn = async ({ context, formData }: SignInArgs) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decode(formData),
  );

  if (!parsed.success) {
    return redirectCurrentWithQuery({
      context,
      variant: "error",
      query: { message: parsed.issues[0].message },
    });
  }

  const response = await context.supabase.auth.signInWithPassword({
    email: parsed.output.email,
    password: parsed.output.password,
  });

  if (response.error) {
    return redirectCurrentWithQuery({
      context,
      variant: "error",
      query: { message: response.error.message },
    });
  }

  return redirectToPath({ path: "/todos" });
};

export const passwordSignUp = async (context: MarkoRun.Context) => {
  const parsed = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decode(await context.request.formData()),
  );

  if (!parsed.success) {
    return redirectCurrentWithQuery({
      context,
      variant: "error",
      query: { message: parsed.issues[0].message },
    });
  }

  const response = await context.supabase.auth.signUp({
    email: parsed.output.email,
    password: parsed.output.password,
    options: { emailRedirectTo: getCallbackUrl(context) },
  });

  if (response.error) {
    return redirectCurrentWithQuery({
      context,
      query: { message: response.error.message },
      variant: "error",
    });
  }

  return redirectCurrentWithQuery({
    context,
    variant: "success",
    query: { message: "Success" },
  });
};

export const signOut = async (context: MarkoRun.Context) => {
  await context.supabase.auth.signOut();

  return redirectToPath({ path: "/" });
};

export const callback = async (context: MarkoRun.Context) => {
  const parsed = await safeParseAsync(
    object({ code: string() }),
    Object.fromEntries(context.url.searchParams.entries()),
  );

  if (!parsed.success) {
    return redirectCurrentWithQuery({
      context,
      variant: "error",
      query: { message: parsed.issues[0].message },
    });
  }

  const response = await context.supabase.auth.exchangeCodeForSession(
    parsed.output.code,
  );

  if (response.error) {
    return redirectToPath({ path: "/todos" });
  }

  return redirectToPath({ path: "/" });
};

export const anonymousMiddleware: MarkoRun.Handler = async (context, next) => {
  const session = await context.supabase.auth.getSession();

  if (session.data.session) {
    return redirectToPath({ path: "/todos" });
  }

  return next();
};

export const protectedMiddleware: MarkoRun.Handler = async (context, next) => {
  const session = await context.supabase.auth.getSession();

  if (session.error || !session.data.session) {
    return redirectToPath({ path: "/sign-in" });
  }

  context.session = session.data.session || null;

  return next();
};
