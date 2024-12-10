import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import { streamTokenProvider } from "~/src/utils/stream";
import { useAuth } from "~/src/contexts/AuthProvider";

export default function VideoClient({ children }: { children: React.ReactNode }) {
  const apiKey = 'fbev6wznrvfv';
  const { user } = useAuth();

  const client = StreamVideoClient.getOrCreateInstance({
    apiKey: apiKey,
    user: {
      id: user?.id || "",
    },
    tokenProvider: streamTokenProvider
  });

  return (
    <StreamVideo client={client}>
      {children}
    </StreamVideo>
  )
}
