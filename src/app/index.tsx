//@ts-nocheck
import React from "react";
import { Redirect } from "expo-router";

const Home = () => {
  return (
    <Redirect href="/(protected)" />
  );
};

export default Home;
