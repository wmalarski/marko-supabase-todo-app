import { redirectCurrentWithQuery } from "../../../server/errors";
import {
  deleteTask,
  insertTask,
  updateAllTasks,
  updateTask,
} from "../../../server/todos";

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

  return redirectCurrentWithQuery({
    context,
    variant: "error",
    query: { message: "Invalid request" },
  });
};
