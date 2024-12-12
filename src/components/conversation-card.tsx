//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const ConversationCard = ({onChangeCard}: {onChangeCard: any}) => {
  const LIST_OF_QUESTIONS = [
    "What is your favorite food?",
    "What is your favorite color?",
    "What is your favorite animal?",
    "What is your favorite book?",
    "What is your favorite movie?",
    "What is your favorite song?",
  ]

  const [card, setCard] = useState();
  const setRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * LIST_OF_QUESTIONS.length);
    setCard(LIST_OF_QUESTIONS[randomIndex]);
  }

  useEffect(() => {
    setRandomQuestion();
  }, []);

  if(!card) {
    return null;
  }

  return (
    <View className={'items-center justify-center'}>
      <Text className={'text-center text-lg font-bold'}>
        {card}
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
