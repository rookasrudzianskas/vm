import { Stack, Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';

export default function Home() {
  const [channel, setChannel] = useState<ChannelType>();

  return (
    <View className="flex-1 bg-white pt-16">
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () =>
            channel && <Button title="Back" onPress={() => setChannel(undefined)} />,
        }}
      />
      {channel ? (
        <Channel channel={channel}>
          <MessageList />
          <View className={'mb-8'}>
            <MessageInput />
          </View>
        </Channel>
      ) : (
        <ChannelList onSelect={setChannel} />
      )}
    </View>
  );
}
