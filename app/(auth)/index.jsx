import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View className="items-center justify-center h-screen bg-slate-900">
      <Text>sign in</Text>
      <Link href={"/home"}>sign up</Link>
    </View>
  );
};

const styles = StyleSheet.create({});

export default index;
