import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { StreamChat } from "npm:stream-chat";
import { createClient } from 'jsr:@supabase/supabase-js@2'

console.log(Deno.env.get("STREAM_API_KEY"));

const serverClient = StreamChat.getInstance(
  Deno.env.get("STREAM_API_KEY"),
  Deno.env.get("STREAM_API_SECRET")
);

Deno.serve(async (req) => {
  const authHeader = req.headers.get('Authorization')!
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  )

  const authToken = authHeader.replace('Bearer ', '')
  const { data } = await supabaseClient.auth.getUser(authToken)
  const token = serverClient.createToken(data.user.id);
  console.log(token);

  return new Response(
    JSON.stringify({ token }),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stream-token-provider' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
