import { Issues } from "valibot";

export const unauthorizedError = () => {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
};

export const redirect = () => {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
};

export const invalidRequestError = (issues: Issues) => {
  return new Response(JSON.stringify(issues), { status: 400 });
};
