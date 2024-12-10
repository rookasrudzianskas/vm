import '../../global.css';

import { StreamCall, StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import { AuthProvider } from "~/src/contexts/AuthProvider";

const apiKey = 'fbev6wznrvfv';
const userId = 'jlahey';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.d1VhCm2Rs_Z0jRHdzUw5FBM633GQXstFklxqVwM_pl0';
const callId = 'default_b0585e19-9d05-407f-b597-f8bcd74644d6';
//
// const user: User = {
//   id: userId,
//   name: 'Jim Lahey',
//   image: 'https://i.imgur.com/fR9Jz14.png',
// };
//
// const videoClient = new StreamVideoClient({ apiKey, user, token });
// const call = videoClient.call("default", callId);
// call.join({ create: true });

export default function Layout() {

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
            {/*<StreamVideo client={videoClient}>*/}
              {/*<StreamCall call={call}>*/}
              {/*  <MyVideoUI />*/}
              {/*</StreamCall>*/}
              <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
            {/*</StreamVideo>*/}
        </OverlayProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
