import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

const Home = () => {
  return (
    <View className="items-center justify-center h-screen">
      <Text>home</Text>
      <TouchableOpacity
        onPress={() => {
          router.replace("/index");
          signOut();
        }}
      >
        <Text>sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
