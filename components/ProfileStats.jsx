import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileStats = ({ gigData, eventData, baughtGigs, tickets }) => {
  return (
    <View className="items-center w-auto mx-auto px-4 justify-center flex-row gap-4 py-2 rounded-lg self-start bg-lime-400">
      <View className="items-center px-1 py-2 rounded-lg bg-white">
        <Text className="text-lg font-bold">{baughtGigs.length}</Text>
        <Text className="text-xs font-light">baught services</Text>
      </View>
      <View className="items-center  px-1 py-2 rounded-lg bg-white">
        <Text className="text-lg font-bold">{tickets.length}</Text>
        <Text className="text-xs font-light">baught tickets</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileStats;
