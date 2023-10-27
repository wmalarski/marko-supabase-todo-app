import { coerce, integer, minValue, number, object, parseAsync } from "valibot";
import { getMediaByGenre } from "../../../../../services/tmdb";

export const GET: MarkoRun.Handler = async (context) => {
  const parseResult = await parseAsync(
    object({
      genreId: coerce(number([minValue(0), integer()]), Number),
      page: coerce(number([integer(), minValue(1)]), Number),
    }),
    { ...context.params, ...Object.fromEntries(context.url.searchParams) },
  );

  const movies = await getMediaByGenre({
    context: context.tmdb,
    genre: parseResult.genreId,
    media: "movie",
    page: parseResult.page,
  });

  return new Response(JSON.stringify(movies), { status: 200 });
};
