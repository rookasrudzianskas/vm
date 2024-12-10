//@ts-nocheck
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

const Home = () => {
  return (
    <Redirect href="/auth" />
  );
};

export default Home;
