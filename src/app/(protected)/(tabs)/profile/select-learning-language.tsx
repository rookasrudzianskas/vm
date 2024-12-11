import React from "react";
import LanguageList from "~/src/components/language-list";
import { useRouter } from "expo-router";
import { supabase } from "~/src/lib/supabase";
import { useAuth } from "~/src/contexts/AuthProvider";

const SelectLearningLanguage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const onSelect = async (language: string) => {
    if(user) {
      console.log('Selected language:', user);
      console.log('Updating profile:', user.id);
      const { error } = await supabase.from('profiles').update({ learning: language }).eq('id', user.id);
      if(error) {
        console.error('Failed to update profile:', error);
        return;
      }
    }
    router.back();
  }

  return (
    <LanguageList onSelect={onSelect} />
  );
};

export default SelectLearningLanguage;
