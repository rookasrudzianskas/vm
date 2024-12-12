//@ts-nocheck
import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const ConversationCard = () => {
  export const LIST_OF_QUESTIONS = [
    "What is your favorite food?",
    "What is your favorite color?",
    "What is your favorite animal?",
    "What is your favorite book?",
    "What is your favorite movie?",
    "What is your favorite song?",
  ]

  const setRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * LIST_OF_QUESTIONS.length);
    return LIST_OF_QUESTIONS[randomIndex];
  }

  return (
    <View className={'items-center justify-center p-10'}>
      <Text className={'text-center text-lg font-bold'}>
        {setRandomQuestion()}
      </Text>
      <Button
        title="Next"
        onPress={() => {
          console.log("Answer in English");
          // router.push('/practice/searching');
        }} />
    </View>
  );
};

export default ConversationCard;
