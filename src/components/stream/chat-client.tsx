import { Chat, useCreateChatClient } from "stream-chat-expo";
import { useAuth } from "~/src/contexts/AuthProvider";
import { supabase } from "~/src/lib/supabase";
import { Text, View } from "react-native";
import { streamTokenProvider } from "~/src/utils/stream";

export default function ChatClient({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const client = useCreateChatClient({
    apiKey: "fbev6wznrvfv",
    tokenOrProvider: streamTokenProvider,
    userData: {
      id: user?.id || "",
    },
  });

  if (!client) {
    return (
      <View className={'flex-1 items-center justify-center'}>
        <Text>Initializing the chat client...</Text>
      </View>
    )
  }

  return (
    <Chat client={client}>
      {children}
    </Chat>
  )
}
