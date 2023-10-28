export const GET: MarkoRun.Handler = async (context) => {
  console.log({ context });

  const response = await context.supabase.auth.signOut();

  console.log({ response });

  return new Response(JSON.stringify(response), { status: 200 });
};
