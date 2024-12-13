import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useChatContext } from "stream-chat-expo";

const ChannelContext = createContext<any>(undefined);

export function ChannelStateProvider({ children }: { children: React.ReactNode }) {
  const [channel, setChannel] = useState<any>(undefined);
  const { user } = useAuth();
  const { client } = useChatContext();

  useEffect(() => {
    const joinDefaultChannel = async () => {
      const defaultChannel = client.channel("messaging", `${user?.id}-default`, {
        name: channel?.title,
        members: [user?.id],
      })
        .watch();
      await channel.watch();
      setChannel(defaultChannel);
    }
    joinDefaultChannel().then(r => {
      console.log("Joined default channel");
    });
  }, [user]);

  return (
    <ChannelContext.Provider value={{ channel, setChannel }}>
      {children}
    </ChannelContext.Provider>
  )
}

export const useChannelSState = () => {
  const context = useContext(ChannelContext);
  if(context === undefined) {
    throw new Error('useChannelState must be used within a ChannelStateProvider');
  }
  return context;
}
