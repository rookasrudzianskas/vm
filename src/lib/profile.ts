import { supabase } from "~/src/lib/supabase";

export const fetchProfile = async (id: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}
