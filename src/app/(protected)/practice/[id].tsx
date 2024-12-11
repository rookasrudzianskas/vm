import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/src/lib/supabase";
import { Call, CallContent, StreamCall, useStreamVideoClient } from "@stream-io/video-react-native-sdk";

const fetchPractice = async (id: string) => {
  const { data, error } = await supabase.from('practices').select('*').eq('id', id).single();

  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

const PracticeScreen = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const { data: practice, isLoading, error } = useQuery({
    queryKey: ['practice', id],
    queryFn: () => fetchPractice(id),
  });

  const videoClient = useStreamVideoClient();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    const setupCall = async () => {
      if (!videoClient || !practice) return;
      const call = videoClient?.call('default', practice.id);
      try {
        await call?.join({ create: true });
        setCall(call);
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };
    setupCall();
  }, [videoClient, practice]);

  if(isLoading) {
    return <Text>Loading...</Text>
  }

  if(error) {
    return <Text>Error: {error.message}</Text>
  }

  if(!call) {
    return null
  }

  return (
    <StreamCall call={call}>
      <CallContent />
    </StreamCall>
  );
};

export default PracticeScreen;
