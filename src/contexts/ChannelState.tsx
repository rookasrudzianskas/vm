import { createContext, useContext, useState } from "react";

const ChannelContext = createContext<any>(undefined);

export function ChannelStateProvider({ children }: { children: React.ReactNode }) {
  const [channel, setChannel] = useState<any>(undefined);

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
