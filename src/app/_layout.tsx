import '../../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import { AuthProvider } from "~/src/contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

const queryClient = new QueryClient();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function Layout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <OverlayProvider>
             <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
            </OverlayProvider>
         </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

// hello.rokastech@gmail.com rokas2020
// hello.rokastec1h@gmail.com rokas2020
