import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "~/src/contexts/AuthProvider";
import ChatClient from "~/src/components/stream/chat-client";
import VideoClient from "~/src/components/stream/video-client";
import { ChannelStateProvider } from "~/src/contexts/ChannelState";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return (
    <ChatClient>
      <ChannelStateProvider>
        <VideoClient>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
          </Stack>
        </VideoClient>
      </ChannelStateProvider>
    </ChatClient>
  )
}
