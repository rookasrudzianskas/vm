import { Redirect, Slot } from 'expo-router';
import { useAuth } from "~/src/contexts/AuthProvider";
import ChatClient from "~/src/components/chat-client";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  // Here the user is authenticated

  return (
    <ChatClient>
      <Slot />
    </ChatClient>
  )
}
