import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { decode } from "decode-formdata";
import { boolean, object, safeParseAsync, string } from "valibot";
import {
  invalidRequestError,
  redirectCurrentWithQuery,
  unauthorizedError,
} from "./errors";

type SelectTasksArgs = {
  context: MarkoRun.Context;
  limit: number;
  skip: number;
  finished?: boolean;
};

export const selectTasks = async ({
  context,
  limit,
  skip,
  finished,
}: SelectTasksArgs) => {
  const paginated = context.supabase
    .from("Task")
    .select()
    .range(skip, skip + limit);

  return typeof finished === "boolean"
    ? paginated.eq("finished", finished)
    : paginated;
};

type BuildResponseArgs = {
  context: MarkoRun.Context;
  result: PostgrestSingleResponse<unknown>;
};

const buildResponse = ({ context, result }: BuildResponseArgs) => {
  if (result.error) {
    return redirectCurrentWithQuery({
      context,
      query: { message: result.error.message },
      variant: "error",
    });
  }

  return redirectCurrentWithQuery({
    context,
    query: { message: "Success" },
    variant: "success",
  });
};

type TaskMutationArgs = {
  context: MarkoRun.Context;
  formData: FormData;
};

export const deleteTask = async ({ context, formData }: TaskMutationArgs) => {
  const parsed = await safeParseAsync(
    object({ id: string() }),
    decode(formData),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const result = await context.supabase
    .from("Task")
    .delete()
    .eq("id", parsed.output.id);

  return buildResponse({ context, result });
};

export const updateTask = async ({ context, formData }: TaskMutationArgs) => {
  const parsed = await safeParseAsync(
    object({ text: string(), finished: boolean(), id: string() }),
    decode(formData, { booleans: ["finished"] }),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const result = await context.supabase
    .from("Task")
    .update({ finished: parsed.output.finished, text: parsed.output.text })
    .eq("id", parsed.output.id);

  return buildResponse({ context, result });
};

export const insertTask = async ({ context, formData }: TaskMutationArgs) => {
  const userId = context.session?.user.id;

  if (!userId) {
    return unauthorizedError();
  }

  const parsed = await safeParseAsync(
    object({ text: string() }),
    decode(formData),
  );

  if (!parsed.success) {
    return invalidRequestError(parsed.issues);
  }

  const result = await context.supabase.from("Task").insert({
    text: parsed.output.text,
    user_id: userId,
  });

  return buildResponse({ context, result });
};
