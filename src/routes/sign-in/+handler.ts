import {
  magicLinkSignIn,
  oauthSignIn,
  passwordSignIn,
} from "../../server/auth";
import { redirectCurrentWithQuery } from "../../server/errors";

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

  return redirectCurrentWithQuery({
    context,
    variant: "error",
    query: { message: "Invalid request" },
  });
};
