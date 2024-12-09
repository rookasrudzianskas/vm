import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';

export default function Home() {
  const [channel, setChannel] = useState<ChannelType>();

  return (
    <View className="pt-16 flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      {channel ? (
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      ) : (
        <ChannelList onSelect={setChannel} />
      )}
    </View>
  );
}
