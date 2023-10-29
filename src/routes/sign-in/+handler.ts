import {
  magicLinkSignIn,
  oauthSignIn,
  passwordSignIn,
} from "../../server/auth";
import { buildSearchParams } from "../../utils/searchParams";

export const POST: MarkoRun.Handler = async (context) => {
  const formData = await context.request.formData();

  switch (formData.get("action")) {
    case "password":
      return passwordSignIn({ context, formData });
    case "oauth":
      return oauthSignIn({ context, formData });
    case "magic-link":
      return magicLinkSignIn({ context, formData });
  }

  const params = buildSearchParams({ message: "Invalid request" });
  const url = new URL(`${context.url.pathname}?${params}`, context.url);
  return new Response(null, {
    status: 302,
    headers: { location: String(url) },
  });
};
