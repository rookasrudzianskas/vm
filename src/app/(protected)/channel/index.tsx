// @ts-nocheck
import { useChannelSState } from "~/src/contexts/ChannelState";
import { AITypingIndicatorView, MessageInput, MessageList, Channel } from "stream-chat-expo";
import ControlAIButton from "~/src/components/control-ai-button";
import { SafeAreaView, View } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Stack } from "expo-router";
import { useWatchers } from "~/src/utils/useWatchers";
import { startAI, stopAI } from "~/src/http/requests";

export default function ChannelScreen() {
  const { channel } = useChannelSState();
  const [isAIOn, setIsAIOn] = useState(false);
  const { watchers, loading } = useWatchers({ channel });

  useLayoutEffect(() => {
    useCallback(() => {
      if(loading || !watchers) {
        return;
      }
      const isAIOn = watchers.some((watcher) => watcher.startsWith('ai-bot'));
      if(!isAIOn) {
        startAI(channel.id);
      }
    }, [])
  }, [channel, loading]);

  useEffect(() => {
    if (watchers) {
      setIsAIOn(watchers.some((watcher) => watcher.startsWith('ai-bot')));
    }
  }, [watchers]);

  const onPress = async () => {
    if (!channel) {
      return;
    }

    const handler = () => (isAIOn ? stopAI(channel.id) : startAI(channel.id));
    await handler();
  }

  return (
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
