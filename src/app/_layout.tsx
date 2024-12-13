import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import { AuthProvider } from "~/src/contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import OnboardingScreen from "~/src/app/onboarding";

const queryClient = new QueryClient();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function Layout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');

        if (hasLaunched === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <OverlayProvider>
            {isFirstLaunch ? (
              <OnboardingScreen />
            ) : (
              <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
            )}
          </OverlayProvider>
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

// hello.rokastech@gmail.com rokas2020
// hello.rokastec1h@gmail.com rokas2020
