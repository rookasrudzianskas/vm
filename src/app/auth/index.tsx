import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AppState,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '~/src/lib/supabase';
import { useRouter } from "expo-router";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  // hello.rokastech@gmail.com rokas2020
  const handleAppleSignIn = async () => {
    // try {
    //   const credential = await AppleAuthentication.signInAsync({
    //     requestedScopes: [
    //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
    //     ],
    //   });
    //
    //   if (credential.identityToken) {
    //     const {
    //       error,
    //       data: { user },
    //     } = await supabase.auth.signInWithIdToken({
    //       provider: 'apple',
    //       token: credential.identityToken,
    //     });
    //
    //     if (error) {
    //       Alert.alert('Error', error.message);
    //     }
    //   } else {
    //     throw new Error('No identityToken.');
    //   }
    // } catch (e) {
    //   if (e.code === 'ERR_REQUEST_CANCELED') {
    //     // User canceled the sign-in flow
    //     console.log('Sign-in was canceled');
    //   } else {
    //     Alert.alert('Error', e.message);
    //   }
    // }
  };

  const InputField = ({
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
  }: {
    icon: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
  }) => (
    <View className="relative w-full">
      <View className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
        <FontAwesome name={icon} size={20} color="#3B82F6" />
      </View>
      <TextInput
        className="w-full rounded-xl border-2 border-gray-200 bg-white px-12 py-4 text-gray-700 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  // const renderAppleButton = () => {
  //   if (Platform.OS === 'ios') {
  //     return (
  //       <AppleAuthentication.AppleAuthenticationButton
  //         buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
  //         buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
  //         cornerRadius={12}
  //         className="mt-4 h-14 w-full"
  //         onPress={handleAppleSignIn}
  //       />
  //     );
  //   }
  //   return null;
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 items-center justify-center px-6 py-10">
            <View className="w-full max-w-sm">
              <Text className="mb-2 text-center text-4xl font-bold text-gray-900">
                Welcome Back
              </Text>
              <Text className="mb-12 text-center text-base text-gray-600">
                Sign in to continue to your account
              </Text>

              <View className="gap-5 space-y-6">
                <InputField
                  icon="envelope"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                />

                <InputField
                  icon="lock"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                <TouchableOpacity
                  className={`w-full rounded-xl bg-blue-500 py-4 shadow-sm
                    ${loading ? 'opacity-50' : 'active:bg-blue-600'}`}
                  onPress={signInWithEmail}
                  disabled={loading}>
                  <Text className="text-center text-base font-semibold text-white">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>

                <View className="flex-row items-center">
                  <View className="h-px flex-1 bg-gray-300" />
                  <Text className="mx-4 text-base text-gray-500">or</Text>
                  <View className="h-px flex-1 bg-gray-300" />
                </View>

                <TouchableOpacity
                  className={`w-full rounded-xl border-2 border-blue-500 bg-white py-4
                    ${loading ? 'opacity-50' : 'active:bg-blue-50'}`}
                  onPress={signUpWithEmail}
                  disabled={loading}>
                  <Text className="text-center text-base font-semibold text-blue-500">
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>

                {/*{renderAppleButton()}*/}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
