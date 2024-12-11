import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/src/lib/supabase";
import {
  Call,
  CallContent,
  StreamCall,
  useCallStateHooks,
  useStreamVideoClient
} from "@stream-io/video-react-native-sdk";

const fetchPractice = async (id: string) => {
  const { data, error } = await supabase.from('practices').select('*').eq('id', id).single();

  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

const MyCallControls = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  console.log(callingState);

  return (
    <View>

    </View>
  )
}

const PracticeScreen = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const { data: practice, isLoading, error } = useQuery({
    queryKey: ['practice', id],
    queryFn: () => fetchPractice(id),
  });

  const videoClient = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: () => void;
    const setupCall = async () => {
      if (!videoClient || !practice) return;
      const call = videoClient?.call('default', practice.id);

      const unsubscribe = call.on('call.ended', () => {
        call.leave();
        router.back();
      });

      try {
        await call?.join({ create: true });
        setCall(call);
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };
    setupCall();

    return () => {
      unsubscribe();
      if(call) {
        call?.leave().catch(() => console.error("Failed to leave the call"));
        call.off('call.ended', () => {});
        setCall(undefined);
      }
    };
  }, [videoClient, practice]);

  useFocusEffect(() => {
    useCallback(() => {
      return () => {
        if(call) {
          call?.endCall();
          setCall(undefined);
        }
      };
    }, [call]);
  });

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
      <MyCallControls />
    </StreamCall>
  );
};

export default PracticeScreen;
