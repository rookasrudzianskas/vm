import '../../global.css';

import { StreamCall, StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import MyVideoUI from "~/src/components/my-video-ui";

const apiKey = 'fbev6wznrvfv';
const chatClient = StreamChat.getInstance(apiKey);
const userId = 'jlahey';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.d1VhCm2Rs_Z0jRHdzUw5FBM633GQXstFklxqVwM_pl0';
const callId = 'default_b0585e19-9d05-407f-b597-f8bcd74644d6';

const user: User = {
  id: userId,
  name: 'Jim Lahey',
  image: 'https://i.imgur.com/fR9Jz14.png',
};

const videoClient = new StreamVideoClient({ apiKey, user, token });
const call = videoClient.call("default", callId);
call.join({ create: true });

export default function Layout() {
  useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(
        {
          id: userId,
          name: 'Jim Lahey',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        chatClient.devToken('jlahey')
      );

      const channel = chatClient.channel('messaging', 'the_park', {
        name: 'The Park',
      });
      await channel.watch();
    };
    setupClient();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={chatClient}>
          <StreamVideo client={videoClient}>
            {/*<StreamCall call={call}>*/}
            {/*  <MyVideoUI />*/}
            {/*</StreamCall>*/}
            <Stack screenOptions={{ headerShown: false }} />
          </StreamVideo>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}
