import { Stack, Link, useRouter } from "expo-router";
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
  const router = useRouter();

  const filters = {
    members: { $in: [user?.id] },
  }

  useEffect(() => {
    if (!user) return;
    const defaultChannels = [
      {
        id: 'onboarding',
        title: 'Onboarding',
      },
      {
        id: 'Words',
        title: 'Words',
      },
      {
        id: 'Shop',
        title: 'At the shop'
      }
    ];

    defaultChannels.forEach((channel) => {
      client.channel("messaging", `${user?.id}-${channel?.id}`, {
        name: channel?.title,
        members: [user?.id],
      }).watch();
    });
  }, [user]);

  return (
    <View className="flex-1 bg-white pt-16">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ChannelList onSelect={(channel) => {
        setChannel(channel)
        router.push('/channels')
      }} filters={filters} />
    </View>
  );
}
