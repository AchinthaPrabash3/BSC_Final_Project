import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileStats = ({ gigData, eventData, baughtGigs, tickets }) => {
  return (
    <View className="items-center w-full justify-center flex-row gap-4 my-3 py-4 rounded-lg">
      <View className="items-center  px-1 py-2 rounded-lg ">
        <Text className="text-lg font-bold">{gigData.length}</Text>
        <Text className="text-xs font-light">Live Giigs</Text>
      </View>
      <View className="items-center  px-1 py-2 rounded-lg ">
        <Text className="text-lg font-bold">{eventData.length}</Text>
        <Text className="text-xs font-light">Live Events</Text>
      </View>
      <View className="items-center  px-1 py-2 rounded-lg ">
        <Text className="text-lg font-bold">{baughtGigs.length}</Text>
        <Text className="text-xs font-light">baught services</Text>
      </View>
      <View className="items-center  px-1 py-2 rounded-lg ">
        <Text className="text-lg font-bold">{tickets.length}</Text>
        <Text className="text-xs font-light">baught tickets</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileStats;
