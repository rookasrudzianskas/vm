import { useChannelSState } from "~/src/contexts/ChannelState";
import { AITypingIndicatorView, MessageInput, MessageList, Channel } from "stream-chat-expo";
import ControlAIButton from "~/src/components/control-ai-button";
import { View } from "react-native";
import React from "react";

export default function Channel() {
  const { channel } = useChannelSState();
  return (
    <Channel channel={channel}>
      <MessageList />
      <ControlAIButton channel={channel} />
      <AITypingIndicatorView />
      <View className={'mb-0'}>
        <MessageInput />
      </View>
    </Channel>
  )
}
