import '../../global.css';

import { StreamCall, StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import { AuthProvider } from "~/src/contexts/AuthProvider";

export default function Layout() {

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </OverlayProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
