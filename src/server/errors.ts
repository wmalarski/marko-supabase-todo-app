import type { Issues } from "valibot";
import { buildPath, BuildPathArgs, type RoutePath } from "../utils/paths";
import { buildSearchParams } from "../utils/searchParams";

export const unauthorizedError = () => {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
};

export const redirectToPath = <Path extends RoutePath>(
  args: BuildPathArgs<Path>,
) => {
  const location = buildPath(args);
  return new Response(null, { status: 302, headers: { location } });
};

type RedirectCurrentWithQueryArgs = {
  context: MarkoRun.Context;
  query?: Record<string, unknown>;
  variant: "success" | "error";
};

export const redirectCurrentWithQuery = ({
  context,
  query,
  variant,
}: RedirectCurrentWithQueryArgs) => {
  const params = buildSearchParams({ ...query, variant });
  const url = new URL(`${context.url.pathname}?${params}`, context.url);
  return new Response(null, {
    status: 302,
    headers: { location: String(url) },
  });
};

export const invalidRequestError = (issues: Issues) => {
  return new Response(JSON.stringify(issues), { status: 400 });
};
