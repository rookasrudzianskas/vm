import { Stack, Link } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, View } from 'react-native';
import { Channel as ChannelType } from 'stream-chat';
import {
  AITypingIndicatorView,
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  useChatContext
} from "stream-chat-expo";
import { useAuth } from "~/src/contexts/AuthProvider";
import ControlAIButton from "~/src/components/control-ai-button";
import { useChannelSState } from "~/src/contexts/ChannelState";

export default function Home() {
  const { client } = useChatContext();
  const { user } = useAuth();
  const { channel, setChannel} = useChannelSState();

  const filters = {
    members: { $in: [user?.id] },
  }

  useEffect(() => {
    const channel = client.channel("messaging", "hello2312", {
      name: "The Park",
      members: [user?.id],
    });
    channel.watch();
  }, []);

  return (
    <View className="flex-1 bg-white pt-16">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ChannelList onSelect={setChannel} filters={filters} />
    </View>
  );
}
