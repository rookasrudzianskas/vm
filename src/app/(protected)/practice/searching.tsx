import React, { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { supabase } from "~/src/lib/supabase";
import { useAuth } from "~/src/contexts/AuthProvider";

const Searching = () => {
  const { user } = useAuth();

  const addToQueue = useCallback(async () => {
    const { error, data } = await supabase.from('practice_queue').upsert({
      id: user?.id
    });
    console.log('Practice Queue Added');
    if(error) {
      console.error('Failed to add practice queue:', error);
      return;
    }
  }, [user?.id])

  const removeFromQueue = useCallback(async () => {
    const { error, data } = await supabase.from('practice_queue').delete().eq('id', user?.id);
    console.log('Practice Queue Removed');
    if(error) {
      console.error('Failed to remove practice queue:', error);
      return;
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      addToQueue();

      return () => {
        removeFromQueue();
      }
    }, [])
  );

  return (
    <View className={'flex-1 items-center justify-center'}>
      <Text>
        byrookas 🚀
      </Text>
    </View>
  );
};

export default Searching;
