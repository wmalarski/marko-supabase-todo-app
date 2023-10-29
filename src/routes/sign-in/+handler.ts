import { decode } from "decode-formdata";
import {
  magicLinkSignIn,
  oauthSignIn,
  passwordSignIn,
} from "../../server/auth";
import { buildSearchParams } from "../../utils/searchParams";

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
