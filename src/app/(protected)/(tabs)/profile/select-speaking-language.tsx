import React from "react";
import LanguageList from "~/src/components/language-list";
import { useRouter } from "expo-router";
import { useAuth } from "~/src/contexts/AuthProvider";
import { supabase } from "~/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchProfile = async (userId: string) => {
  if (!userId) {
    return null; // Return null if no user ID
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};

const SelectSpeakingLanguage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const client = useQueryClient();

  if (!user) {
    router.back();
    return null;
  }

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfile(user?.id),
    enabled: !!user?.id
  });

  const { mutate } = useMutation({
    mutationFn: async (language: string) => {
      console.log('Selected language:', language);
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ learning: language })
          .eq('id', user.id);

        if (error) {
          throw new Error('Failed to update profile');
        }
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['profile', user?.id] });
      router.back();
    }
  });
  return (
    <LanguageList onSelect={onSelect} />
  );
};

export default SelectSpeakingLanguage;
