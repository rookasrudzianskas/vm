import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '~/src/lib/supabase';

const SettingsScreen = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const SettingsItem = ({
    icon,
    title,
    onPress,
    value,
    isSwitch,
    showBorder = true
  }: {
    icon: string;
    title: string;
    onPress: () => void;
    value?: boolean;
    isSwitch?: boolean;
    showBorder?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between px-6 py-4 
      ${showBorder ? 'border-b border-gray-200' : ''}`}>
      <View className="flex-row items-center">
        <FontAwesome name={icon} size={20} color="#3B82F6" />
        <Text className="ml-4 text-base text-gray-700">{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
          thumbColor={value ? '#3B82F6' : '#F3F4F6'}
        />
      ) : (
        <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-gray-50 pt-16">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="px-6 py-10">
        <Text className="mb-2 text-3xl font-bold text-gray-900">Settings</Text>
        <Text className="text-base text-gray-600">
          Manage your app preferences and account
        </Text>
      </View>

      <View className="mx-4 rounded-xl bg-white shadow-xs">
        <View className="mb-6">
          <Text className="px-6 py-3 text-sm font-medium text-gray-500">
            Account Settings
          </Text>
          <SettingsItem
            icon="american-sign-language-interpreting"
            title="Learning"
            onPress={() => router.push('/profile/select-learning-language')}
          />
          <SettingsItem
            icon="sign-language"
            title="Speaking"
            onPress={() => router.push('/profile/select-speaking-language')}
          />
          <SettingsItem
            icon="bell"
            title="Notifications"
            isSwitch
            value={notificationsEnabled}
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <SettingsItem
            icon="moon-o"
            title="Dark Mode"
            isSwitch
            value={darkMode}
            onPress={() => setDarkMode(!darkMode)}
            showBorder={false}
          />
        </View>
      </View>

      <View className="mx-4 mt-6 rounded-xl bg-white shadow-xs">
        <View className="mb-6">
          <Text className="px-6 py-3 text-sm font-medium text-gray-500">
            Support
          </Text>
          <SettingsItem
            icon="question-circle"
            title="Help Center"
            onPress={() => console.log('Help Center')}
          />
          <SettingsItem
            icon="file-text-o"
            title="Terms of Service"
            onPress={() => console.log('Terms of Service')}
          />
          <SettingsItem
            icon="lock"
            title="Privacy Policy"
            onPress={() => console.log('Privacy Policy')}
            showBorder={false}
          />
        </View>
      </View>

      <TouchableOpacity
        className="mx-4 mt-6 rounded-xl bg-white py-4 shadow-xs"
        onPress={handleSignOut}>
        <Text className="text-center text-base font-semibold text-red-500">
          Sign Out
        </Text>
      </TouchableOpacity>

      <Text className="mt-8 mb-4 text-center text-sm text-gray-500">
        Version 1.0.0
      </Text>
    </ScrollView>
  );
};

export default SettingsScreen;
