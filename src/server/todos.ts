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

type DeleteTaskArgs = {
  context: MarkoRun.Context;
  id: string;
};

export const deleteTask = async ({ context, id }: DeleteTaskArgs) => {
  return context.supabase.from("Task").delete().eq("id", id);
};

type UpdateTaskArgs = {
  context: MarkoRun.Context;
  id: string;
  text: string;
  finished: boolean;
};

export const updateTask = async ({
  context,
  id,
  finished,
  text,
}: UpdateTaskArgs) => {
  return context.supabase.from("Task").update({ finished, text }).eq("id", id);
};

type UpdateAllTasksArgs = {
  context: MarkoRun.Context;
  finished: boolean;
};

export const updateAllTasks = async ({
  context,
  finished,
}: UpdateAllTasksArgs) => {
  return context.supabase.from("Task").update({ finished });
};

type InsertTaskArgs = {
  context: MarkoRun.Context;
  text: string;
  finished: boolean;
  userId: string;
};

export const insertTask = async ({
  context,
  finished,
  text,
  userId,
}: InsertTaskArgs) => {
  return context.supabase
    .from("Task")
    .insert({ finished, text, user_id: userId });
};
