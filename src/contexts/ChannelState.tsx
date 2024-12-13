import { createContext, useState } from "react";

const ChannelContext = createContext<any>(undefined);

export function ChannelStateProvider({ children }: { children: React.ReactNode }) {
  const [channel, setChannel] = useState<any>(undefined);

  return (
    <ChannelContext.Provider value={{ channel, setChannel }}>
      {children}
    </ChannelContext.Provider>
  )
}
