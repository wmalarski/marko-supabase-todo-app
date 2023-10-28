export type RoutePath = MarkoRun.Route["path"];

export type RouteParams<Path extends RoutePath> = (MarkoRun.Route & {
  path: Path;
})["params"];

export const buildPath = <Path extends RoutePath>(
  path: Path,
  params: RouteParams<Path>,
) => {
  return Object.entries(params).reduce<string>(
    (prev, [param, value]) => prev.replaceAll(`:${param}`, value as string),
    path,
  );
};
