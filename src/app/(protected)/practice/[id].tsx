import React, { useCallback, useEffect, useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Supabase and Stream imports
import { supabase } from "~/src/lib/supabase";
import {
  Call,
  CallContent,
  CustomVideoEvent,
  HangUpCallButton,
  StreamCall,
  ToggleAudioPublishingButton,
  ToggleCameraFaceButton,
  ToggleVideoPublishingButton,
  useCallStateHooks,
  useStreamVideoClient
} from "@stream-io/video-react-native-sdk";

// Local imports
import { useAuth } from "~/src/contexts/AuthProvider";
import ConversationCard from "~/src/components/conversation-card";

// Constants
const LIST_OF_QUESTIONS = [
  "What is your favorite food?",
  "What is your favorite color?",
  "What is your favorite animal?",
  "What is your favorite book?",
  "What is your favorite movie?",
  "What is your favorite song?",
];

// Utility functions
const fetchPractice = async (id: string) => {
  const { data, error } = await supabase
    .from('practices')
    .select('*, profile1:profiles!practices_user1_id_fkey(*),profile2:profiles!practices_user2_id_fkey(*)')
    .eq('id', id)
    .single();

  console.log("Practice");
  console.log(JSON.stringify(data, null, 2));

  if (error) {
    console.error('Fetch practice error:', error);
    return null;
  }

  return data;
};

// Custom components
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
  );
};

// Main screen component
const PracticeScreen = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const { user } = useAuth();
  const videoClient = useStreamVideoClient();
  const router = useRouter();

  // State management
  const [call, setCall] = useState<Call>();
  const [card, setCard] = useState<string>();

  // Fetch practice data
  const { data: practice, isLoading, error } = useQuery({
    queryKey: ['practice', id],
    queryFn: () => fetchPractice(id),
  });

  // Utility functions
  const setRandomQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * LIST_OF_QUESTIONS.length);
    setCard(LIST_OF_QUESTIONS[randomIndex]);
  }, []);

  const onChangeCard = async (newCard: string) => {
    if (!call) return;
    await call.sendCustomEvent({
      type: 'setCard',
      id: newCard,
    });
  };

  // Determine other user
  const otherUser = practice?.profile1?.id === user?.id
    ? practice?.profile2
    : practice?.profile1;

  // Call setup effect
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
        setRandomQuestion();
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
  }, [videoClient, practice, router, setRandomQuestion]);

  // Custom event handling
  useEffect(() => {
    if (!call) return;

    const unsubscribe = call.on('custom', (event: CustomVideoEvent) => {
      console.log("Received event:", event);
      if (event.custom.type === 'setCard') {
        setCard(event.custom.id);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [call]);

  // Focus effect for cleanup
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

  // Rendering
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!call) {
    return null;
  }

  return (
    <StreamCall call={call}>
      {otherUser && (
        <Text className={'text-lg text-center p-4 font-bold pt-16'}>
          {otherUser?.name} Learning {otherUser?.learning}, speaking {otherUser?.speaking}
        </Text>
      )}
      <ConversationCard
        onChangeCard={onChangeCard}
        card={card}
        setRandomQuestion={setRandomQuestion}
      />
      <CallContent
        onHangupCallHandler={() => router.back()}
        CallControls={CustomCallControls}
      />
    </StreamCall>
  );
};

export default PracticeScreen;
