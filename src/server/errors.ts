import type { Issues } from "valibot";
import { buildPath, type RouteParams, type RoutePath } from "../utils/paths";

export const unauthorizedError = () => {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
};

export const redirectToPath = <Path extends RoutePath>(
  path: Path,
  params: RouteParams<Path>,
) => {
  const url = buildPath(path, params);
  return Response.redirect(url, 301);
};

export const invalidRequestError = (issues: Issues) => {
  return new Response(JSON.stringify(issues), { status: 400 });
};
