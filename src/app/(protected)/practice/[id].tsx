//@ts-nocheck
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const PracticeScreen = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  return (
    <View className={'flex-1 items-center justify-center'}>
      <Text>
        byrookas 🚀 {id}
      </Text>
    </View>
  );
};

export default PracticeScreen;
