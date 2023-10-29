import {
  deleteTask,
  insertTask,
  updateAllTasks,
  updateTask,
} from "../../../server/todos";
import { buildSearchParams } from "../../../utils/searchParams";

export const POST: MarkoRun.Handler = async (context) => {
  const formData = await context.request.formData();

  switch (formData.get("action")) {
    case "delete":
      return deleteTask({ context, formData });
    case "update":
      return updateTask({ context, formData });
    case "update-all":
      return updateAllTasks({ context, formData });
    case "insert":
      return insertTask({ context, formData });
  }

  const params = buildSearchParams({ message: "Invalid request" });
  const url = new URL(`${context.url.pathname}?${params}`, context.url);
  return new Response(null, {
    status: 302,
    headers: { location: String(url) },
  });
};
