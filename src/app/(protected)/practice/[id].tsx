import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/src/lib/supabase";
import {
  Call,
  CallContent, HangUpCallButton,
  StreamCall, ToggleAudioPublishingButton, ToggleCameraFaceButton, ToggleVideoPublishingButton,
  useCallStateHooks,
  useStreamVideoClient
} from "@stream-io/video-react-native-sdk";
import { useAuth } from "~/src/contexts/AuthProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConversationCard from "~/src/components/conversation-card";

const fetchPractice = async (id: string) => {
  const { data, error } = await
    supabase
      .from('practices')
    .select('*, profile1:profiles!practices_user1_id_fkey(*),profile2:profiles!practices_user2_id_fkey(*)')
    .eq('id', id)
    .single();

  console.log("Practice");
  console.log(JSON.stringify(data, null, 2));

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

const CustomCallControls = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  console.log(callingState);

  return (
    <SafeAreaView edges={['bottom']}>
      <View className={'flex-row justify-around p-6'}>
        <ToggleAudioPublishingButton />
        <ToggleVideoPublishingButton />
        <ToggleCameraFaceButton />
        <HangUpCallButton />
      </View>
    </SafeAreaView>
  )
}

const PracticeScreen = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const { user } = useAuth();
  const { data: practice, isLoading, error } = useQuery({
    queryKey: ['practice', id],
    queryFn: () => fetchPractice(id),
  });

  const onChangeCard = () => {
    console.log("Card changed");
  }

  const otherUser = practice?.profile1?.id === user?.id ? practice?.profile2 : practice?.profile1;

  const videoClient = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const router = useRouter();

  useEffect(() => {
    let unsubscribeCall: (() => void) | undefined;

    const setupCall = async () => {
      if (!videoClient || !practice) return;

      const newCall = videoClient?.call('default', practice.id);

      unsubscribeCall = newCall.on('call.ended', () => {
        newCall.leave();
        router.back();
      });

      try {
        await newCall?.join({ create: true });
        setCall(newCall);
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };

    setupCall();

    return () => {
      if (unsubscribeCall) {
        unsubscribeCall();
      }

      if (call) {
        call?.leave().catch(() => console.error("Failed to leave the call"));
        call.off('call.ended', () => {});
        setCall(undefined);
      }
    };
  }, [videoClient, practice, router]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (call) {
          call?.endCall();
          setCall(undefined);
        }
      };
    }, [call])
  );

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  if (!call) {
    return null
  }

  return (
    <StreamCall call={call}>
      {otherUser && (
        <Text className={'text-lg text-center p-4 font-bold pt-16'}>{otherUser?.name} Learning {otherUser?.learning}, speaking {otherUser?.speaking}</Text>
      )}
      <ConversationCard onChangeCard={onChangeCard} />
      <CallContent
        onHangupCallHandler={() => router.back()}
        CallControls={CustomCallControls}
      />
    </StreamCall>
  );
};

export default PracticeScreen;
