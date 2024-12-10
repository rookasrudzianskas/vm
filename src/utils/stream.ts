import { supabase } from "~/src/lib/supabase";

export const streamTokenProvider = async () => {
  const response = await supabase.functions.invoke('stream-token-provider')
  console.log(response.data.token);
  return response.data?.token || ""
}
