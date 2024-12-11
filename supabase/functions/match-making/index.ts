import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  const { type, record } = await req.json();

  if(type !== "INSERT") {
    return new Response("Invalid request type", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    }
  );

  const { data: partner, error: error2 } = await supabase.from("practice_queue").select("*").neq("id", record.id).order("created_at", {
    ascending: true,
  }).limit(1).single();

  if(error2 || !partner) {
    console.log("Errorr getting partner");
    return new Response("Error getting partner", { status: 500 });
  }

  console.log("user 1", record);
  console.log("Record:", partner);

  // remove the users from the queue
  await supabase.from('practice_queue').delete().eq('id', record.id);
  await supabase.from('practice_queue').delete().eq('id', partner.id);


  const { data, error: errorCreatingPractice } = await supabase
    .from('practices')
    .insert([
      { user1_id: record.id, user2_id: partner.id },
    ])
    .select()

  if(errorCreatingPractice) {
    console.log("Error creating practice:", errorCreatingPractice);
    // @TODO probably we should return a 500 error here
    return new Response("Error creating practice", { status: 500 });
  }
  return new Response(
    JSON.stringify(record),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/match-making' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
