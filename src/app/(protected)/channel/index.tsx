import { useChannelSState } from "~/src/contexts/ChannelState";
import { AITypingIndicatorView, MessageInput, MessageList, Channel } from "stream-chat-expo";
import ControlAIButton from "~/src/components/control-ai-button";
import { SafeAreaView, View } from "react-native";
import React from "react";

export default function ChannelScreen() {
  const { channel } = useChannelSState();
  return (
    <SafeAreaView edges={['bottom']} className={'bg-white'}>
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
