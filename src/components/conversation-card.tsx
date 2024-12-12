//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const ConversationCard = ({onChangeCard, card, setRandomQuestion}: {onChangeCard: any, card: string, setRandomQuestion: any}) => {
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
