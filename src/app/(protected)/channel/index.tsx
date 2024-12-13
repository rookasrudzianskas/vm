import { useChannelSState } from "~/src/contexts/ChannelState";
import { AITypingIndicatorView, MessageInput, MessageList, Channel } from "stream-chat-expo";
import ControlAIButton from "~/src/components/control-ai-button";
import { SafeAreaView, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ChannelScreen() {
  const { channel } = useChannelSState();
  return (
    // @ts-ignore
    <SafeAreaView edges={['bottom']} className={'bg-white'}>
      <Stack.Screen options={{

      }} />
      <Channel channel={channel}>
        <MessageList />
        <ControlAIButton channel={channel} />
        <AITypingIndicatorView />
        <View className={'mb-0'}>
          <MessageInput />
        </View>
      </Channel>
    </SafeAreaView>
  )
}
