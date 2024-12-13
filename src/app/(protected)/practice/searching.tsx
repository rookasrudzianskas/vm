// @ts-nocheck
import React, { useCallback, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { supabase } from "~/src/lib/supabase";
import { useAuth } from "~/src/contexts/AuthProvider";

const Searching = () => {
  const { user } = useAuth();
  const router = useRouter();

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

  useEffect(() => {
    const handleInserts = (payload) => {
      console.log('Change received!', payload)
      if(payload.eventType === 'INSERT') {
        router.push(`/practice/${payload.new.id}`);
      }
    }

    console.log('Subscribing to practices channel');

    supabase
      .channel('practices')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'practices' }, handleInserts)
      .subscribe()
  }, [user?.id]);

  return (
    <View className={'flex-1 items-center justify-center'}>
      <Text>
        byrookas 🚀
      </Text>
    </View>
  );
};

export default Searching;


/// hello.rokastech@gmail.com rokas2020
