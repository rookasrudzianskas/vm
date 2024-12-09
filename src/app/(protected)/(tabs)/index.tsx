import { Stack, Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { TouchableOpacity, Text, SafeAreaView, View } from 'react-native';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';
import { useAuth } from "~/src/contexts/AuthProvider";
import { supabase } from "~/src/lib/supabase";

export default function Home() {
  const [channel, setChannel] = useState<ChannelType>();
  const router = useRouter();
    const { user } = useAuth();

  const handleStartPracticeLesson = async () => {
    const { error, data } = await supabase.from('practice_queue').upsert({
      id: user?.id,
    });
    console.log('Practice Queue Added');
    if(error) {
      console.error('Failed to add practice queue:', error);
      return;
    }
    router.push('/practice/searching')
  };

  return (
    <View className="flex-1 bg-white pt-16 px-4">
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () =>
            channel && <TouchableOpacity onPress={() => setChannel(undefined)}>
              <Text className="text-blue-500">Back</Text>
            </TouchableOpacity>,
        }}
      />

      <View className="flex-1 justify-center items-center space-y-6">
        <View className="px-4">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
            Practice Your Skills
          </Text>
          <Text className="text-center text-gray-600 mb-6">
            Connect with a language partner for a real-time conversation practice.
            Improve your speaking skills in a supportive, interactive environment.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleStartPracticeLesson}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Start Practice Lesson
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
