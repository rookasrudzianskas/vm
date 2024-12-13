import { Tabs } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name={'index'} options={{
        headerShown: false,
        tabBarIcon: ({color, size}) =>
          <Ionicons name="home" size={size} color={color} />,
        tabBarLabel: '',
      }} />
      <Tabs.Screen name="profile" options={{ headerShown: false,
        tabBarIcon: ({color, size}) =>
          <Ionicons name="person" size={size} color={color} />,
        tabBarLabel: '',
      }} />
    </Tabs>
  );
}
