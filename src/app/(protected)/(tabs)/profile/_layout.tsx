import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
      <Stack.Screen name={'select-learning-language'} options={{ presentation: 'modal', title: 'Select Language' }} />
      <Stack.Screen name={'select-speaking-language'} options={{ presentation: 'modal', title: 'Select Language' }} />
    </Stack>
  )
}
