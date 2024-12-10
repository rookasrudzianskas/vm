import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "~/src/contexts/AuthProvider";
import ChatClient from "~/src/components/stream/chat-client";
import VideoClient from "~/src/components/stream/video-client";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return (
    <ChatClient>
      <VideoClient>
        <Stack screenOptions={{ headerShown: false }} />
      </VideoClient>
    </ChatClient>
  )
}
