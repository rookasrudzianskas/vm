import { Redirect, Slot } from 'expo-router';
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
        <Slot />
      </VideoClient>
    </ChatClient>
  )
}
